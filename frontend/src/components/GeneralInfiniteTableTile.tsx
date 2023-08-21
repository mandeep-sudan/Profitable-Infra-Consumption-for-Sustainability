import React, {
  type UIEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  ReactNode,
} from 'react';
import {
  MantineReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_SortingState,
  type MRT_Virtualizer,
} from 'mantine-react-table';
import { Group, Text, Title } from '@mantine/core';
import "./Tiles.css"
import { AxiosResponse } from 'axios';

type InfiniteTableTileProps<T,U> = {
  title: string
  columns: MRT_ColumnDef<T>[] // TO DO: make the class not any
  apiCall: (currPageNum: string, queryParams: U)=>Promise<AxiosResponse<IInfTablePage<T>, any>>
  queryParams:U
  modal:ReactNode
}

const GeneralInfiniteTableTile = <T,U,>({ title, columns, apiCall, queryParams, modal}: InfiniteTableTileProps<T,U>) => {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [noFilters, setNoFilters] = useState<boolean>(true);
  const [fetchesLeft, setFetchesLeft] = useState<boolean>(true);
  const [nextPageInfo, setNextPageInfo] = useState<string>("");
  // const [queryParams, setQueryParams] = useState<QueryParams>({matches:[],betweenDates:[],betweenValues:[],sortings:[{field:"usage_start_time",ascending:false}]});
  
  const [data, setData] = useState<T[]>([]);

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    [],
  );
  const shouldWait = useRef<boolean>(false);
  const throttle = useCallback((callback: Function, delay = 1000, ...args: any[]) => {
    if (shouldWait.current) return;

    callback(...args);
    shouldWait.current = true;

    setTimeout(() => {
      shouldWait.current = false;
    }, delay);
}, []);

  const [globalFilter, setGlobalFilter] = useState<string>();
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

  const renderTopToolbarCustomActions = ({ }) => (
    <Group>
      <Title order={2} style={{ padding: "10px" }}>{title}</Title>
      {modal}
    </Group>
  )

  const tableContainerRef = useRef<HTMLDivElement>(null); //we can get access to the underlying TableContainer element and react to its scroll events
  const rowVirtualizerInstanceRef =
    useRef<MRT_Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method

  const fetchNextPage = () => {
    
    setIsError(false)
    setIsFetching(true)
    try { //to initiate loading
      // let temp : IInfTablePage<T>
      apiCall(nextPageInfo,queryParams).then(response => {
        setData(oldData => [ ...oldData,...response.data.rowList]);
        setNextPageInfo(response.data.nextPageInfo)
        setIsFetching(false)
        if (response.data.rowList.length===0) {
          setFetchesLeft(false)
        }
      })
      // .catch(response => {
      //   console.log("uh oh")
      // }
      // )
    }
    catch (err) {
      setIsError(true)
      console.log("ay de mi")
      console.log("err",err)
    }
  }

  //  TO DO: get the total number of rows in the database total (meta data somehow)
  // const totalDBRowCount = data?.pages?.[0]?.meta?.totalRowCount ?? 0;
  const totalFetched = data.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        let noFiltersTemp : boolean = JSON.stringify(columnFilters)==="[]" && JSON.stringify(sorting)==="[]" && globalFilter===undefined
        setNoFilters(noFiltersTemp)
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching && noFiltersTemp && fetchesLeft
          // totalFetched < totalDBRowCount
          // TO DO: FIX THIS RIGHT HERE
        ) {
          throttle(fetchNextPage);
          // TO DO: doesn't really actually do anything
        }
      }
    },
    [fetchNextPage, totalFetched], // TO DO: add totalDBRowCount,totalFetched,isFetching, back here
  );

  //scroll to top of table when sorting or filters change
  useEffect(() => {
    
    if (rowVirtualizerInstanceRef.current) {
      try {
        rowVirtualizerInstanceRef.current.scrollToIndex(0);
      } catch (e) {
        console.error(e);
      }
    }
  }, [sorting, columnFilters, globalFilter]);

  //a check on mount to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  useEffect(() => {
    setFetchesLeft(true)
    setData([])
     setNextPageInfo("")

  }, [queryParams]);

  return <div className={"tile full-tile"}>
    <MantineReactTable 
      // MY OWN ATTRIBUTES
      columns={columns}
      data={data}
      initialState={{
        density: 'xs'
      }}
      layoutMode={'grid'}
      enableColumnResizing={true}
      renderTopToolbarCustomActions={renderTopToolbarCustomActions}

      positionToolbarAlertBanner={'bottom'}
      // ATTRIBUTES FROM: https://www.mantine-react-table.com/docs/examples/infinite-scrolling
      enablePagination={false}
      enableRowNumbers={true}
      enableRowVirtualization={true} //optional, but recommended if it is likely going to be more than 100 rows
      // manualFiltering={true}
      // manualSorting={true}

      mantineTableContainerProps={{
        ref: tableContainerRef, //get access to the table container element
        sx: { maxHeight: '600px' }, //give the table a max height
        onScroll: (
          event: UIEvent<HTMLDivElement>, //add an event listener to the table container element
        ) => fetchMoreOnBottomReached(event.target as HTMLDivElement),
      }}
      mantineToolbarAlertBannerProps={{
        color: !noFilters ? 'blue': 'red',
        children: !noFilters ? 'Deselect filters to load more results' : 'Error loading data',
      }}
      onColumnFiltersChange={setColumnFilters}
      onGlobalFilterChange={setGlobalFilter}
      onSortingChange={setSorting}
      
      renderBottomToolbarCustomActions={() => (
        <Text>
          Fetched {totalFetched} rows.
        </Text>
      )} // {totalFetched} of {totalDBRowCount} total rows.

      state={{
        columnFilters,
        globalFilter,
        // isLoading,
        showAlertBanner: isError||!noFilters,
        showProgressBars: isFetching,
        sorting,
      }}
      rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //get access to the virtualizer instance
      rowVirtualizerProps={{ overscan: 10 }}
    />
    {/* <Text>{JSON.stringify(queryParams)}</Text> */}
  </div>;
};

export default GeneralInfiniteTableTile;