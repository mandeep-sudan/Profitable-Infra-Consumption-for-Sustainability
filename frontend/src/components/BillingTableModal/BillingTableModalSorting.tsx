import { Button, Title, ActionIcon, Table, MultiSelect } from '@mantine/core';
import React, { useEffect } from 'react';
import { sortingFieldsForGlobalFilter } from '../../utils/utils';
import { IconArrowNarrowDown, IconArrowNarrowUp, IconArrowBigUp, IconTrash } from '@tabler/icons-react';



type TableTileModalSortingProps = {
    sortings: BillingSorting[]
    setSortings: React.Dispatch<React.SetStateAction<BillingSorting[]>>
    currSortingFields: string[]
    setCurrSortingFields: React.Dispatch<React.SetStateAction<string[]>>
    fieldToBoolDict: Record<string,boolean>
    setFieldToBoolDict: React.Dispatch<React.SetStateAction<Record<string,boolean>>>
}

const BillingTableModalSorting = ({ sortings, setSortings,currSortingFields,setCurrSortingFields,fieldToBoolDict,setFieldToBoolDict }: TableTileModalSortingProps) => {
    // MATCHES
    
    const currSortingOptions2 : string[] = (sortingFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
    // const [currSortingFields, setCurrSortingFields] = useState<string[]>([]);
    // const [fieldToBoolDict, setFieldToBoolDict] = useState<Record<string,boolean>>({});

    // useEffect(() => {
    //     let currSortingFieldsSorted : string[] = [...currSortingFields].sort((a,b)=>a.localeCompare(b))
    //     let sortingsSorted : Sorting[] = [...sortings].sort((a,b)=>a.field.localeCompare(b.field))
        
    //     if (currSortingFields.length>sortings.length) {
    //         // new field added
    //         let newField : string = currSortingFieldsSorted[currSortingFields.length-1]
    //         for (let i:number=0;i<currSortingFieldsSorted.length-1;i++) {
    //             if (currSortingFieldsSorted[i]!==sortingsSorted[i].field) {
    //                 newField = currSortingFieldsSorted[i]
    //             }
    //         }
    //         setSortings([...sortings, {field:newField,ascending:true}])
    //     } else if (currSortingFields.length<sortings.length) {
    //         // field removed
    //         let oldField : string = sortingsSorted[sortingsSorted.length-1].field
    //         for (let i:number=0;i<currSortingFieldsSorted.length-1;i++) {
    //             if (currSortingFieldsSorted[i]===sortingsSorted[i].field) {
    //                 oldField = currSortingFieldsSorted[i]
    //             }
    //         }
    //         setSortings(sortings.filter(item => item.field !== oldField))
    //     } else {
    //         // shouldn't happen
    //         console.log("neither added nor removed")
    //     }
    // }, [currSortingFields]);

    useEffect(() => {
        setSortings(currSortingFields.map((field) => {
            let ascending:boolean = true
            if (field in fieldToBoolDict) {
                ascending = fieldToBoolDict[field]
            }
            return { field: field, ascending: ascending } }))
    }, [currSortingFields]);


    // const addCurrMatchInputToList = () => {
    //     setMatches(matches.concat({
    //         field: currMatchField,
    //         value: currMatchValue,
    //         operator: currMatchOperator
    //     }))
    //     setCurrMatchOptions(currMatchOptions.filter(item => item !== currMatchField))
    //     setCurrMatchField("")
    //     setCurrMatchValue("")
    // }



    const removeFieldFromSortings = (field: string) => {
        setCurrSortingFields(currSortingFields.filter(item => item !== field))
        setSortings(sortings.filter(item => item.field !== field))
    }

    const reverseSortingDirection = (field: string) => {
        setSortings(sortings.map((item) => {
            if (item.field === field) {
                setFieldToBoolDict({...fieldToBoolDict, [item.field]:!item.ascending})
                return { field: field, ascending: !item.ascending }
            }
            return item
        }))
    }

    // increases the priority of the given field by 1
    const increasePriority = (field: string) => {
        let myInt : number = 0

        for (let i=0;i<sortings.length;i++) {
            if (sortings[i].field===field) {
                myInt = i
            }
        }
        setCurrSortingFields(currSortingFields.slice(0,myInt-1).concat([currSortingFields[myInt],currSortingFields[myInt-1]]).concat(currSortingFields.slice(myInt+1)))
        setSortings(sortings.slice(0,myInt-1).concat([sortings[myInt],sortings[myInt-1]]).concat(sortings.slice(myInt+1)))
    }

    const sortingToVisual = (sorting: BillingSorting) => {

        return <Button variant="subtle"
            onClick={() => reverseSortingDirection(sorting.field)}
            color={sorting.ascending ? "green" : "red"}
            leftIcon={sorting.ascending ? <IconArrowNarrowUp /> : <IconArrowNarrowDown />}>
            {sorting.ascending ? "Ascending (A->Z)" : "Descending (Z->A)"}</Button>
    }

    const rows: React.ReactElement[] = sortings.map((sorting) => (
        <tr key={sorting.field}>
            <td>{sorting.field}</td>
            <td>
                {sortingToVisual(sorting)}
            </td>
            <td>
                <ActionIcon color="gray" variant="light" disabled={sorting.field===sortings[0].field}>
                    <IconArrowBigUp  onClick={() => increasePriority(sorting.field)} />
                </ActionIcon>
            </td>
            <td>
                <ActionIcon color="red">
                    <IconTrash size="1.125rem" onClick={() => removeFieldFromSortings(sorting.field)} />
                </ActionIcon>
            </td>
        </tr>
    ));

    return (
        <>

            <Title order={3}>Sorting</Title>
            <MultiSelect
                value={currSortingFields}
                onChange={setCurrSortingFields}
                label="Select fields to sort"
                description="Select highest priority sorting first"
                placeholder="Pick one"
                data={currSortingOptions2}
                withAsterisk
            />
            <Table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Direction</th>
                        <th>Increase Priority</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            {/* <TableTileModalMatchTable matches={matches} setMatches={setMatches} currMatchOptions={currMatchOptions} setCurrMatchOptions={setCurrMatchOptions} /> */}
        </>
    );
}

export default BillingTableModalSorting;