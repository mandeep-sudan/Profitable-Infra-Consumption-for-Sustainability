import { MRT_ColumnDef } from "mantine-react-table";
import React, { useMemo } from "react";
import { format } from "date-fns";
import { Button, Group, Title, Text, ScrollArea, CopyButton,ActionIcon, Tooltip } from '@mantine/core';
import { Prism } from "@mantine/prism";
import { useResizeObserver } from "@mantine/hooks";
import { IconCopy, IconCheck } from '@tabler/icons-react';

// ****************************************************************
// ******************** HELPER FUNCTION(S) ************************
// ****************************************************************

// takes a string of the form "2023-07-30T05:00:00Z" to the form "Thu, 01 Jan 1970 00:00:00 GMT"
const dateToReadable = (inputString: string) => {
  let date = new Date(inputString)
  return format(date, "d LLL, yyy, h:mmaaa")
}
const dateToReadableMs = (inputString: string) => {
  let date = new Date(inputString)
  return format(date, "d LLL, yyy, H:mm:ss.SSSS")
}

const numToCost = (inputNum: number) => {
  return "$" + inputNum.toFixed(2).toString();
}

const monthToReadable = (inputString: string) => {
  // console.log(inputString.substring(0,4))
  // console.log(inputString.substring(4,6))
  let date = new Date(parseInt(inputString.substring(0, 4)), parseInt(inputString.substring(4, 6)) - 1);
  return format(date, "LLL yyy")
}


export const camelCaseToReadable = (inputString: string) => {
  let words: string[] = inputString.match(/[A-Za-z][a-z]*/g) || [];

  return words.map((word) => { return word.charAt(0).toUpperCase() + word.substring(1) }).join(" ");
}



export const costByMonthColumns: MRT_ColumnDef<CostByMonth>[] = [
  {
    accessorKey: 'month', //access nested data with dot notation
    header: 'Month',
    size:100,
    Cell: ({ cell }) =>
      <Text>
        {monthToReadable(cell.getValue<string>())}
      </Text>
  },
  {
    accessorKey: 'totalCost',
    header: 'Cost',
    size:80,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  },
  {
    accessorKey: 'totalCredits', //normal accessorKey
    header: 'Credits',
    size:90,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  },
  {
    accessorKey: 'finalCost',
    header: 'Final Cost',
    size:120,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  }
]

export const costByProjectColumns: MRT_ColumnDef<CostByProject>[] = [
  {
    accessorKey: 'name', //access nested data with dot notation
    header: 'Project',
  },
  {
    accessorKey: 'totalCost',
    header: 'Cost',
    size:80,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  },
  {
    accessorKey: 'totalCredits', //normal accessorKey
    header: 'Credits',
    size:90,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  },
  {
    accessorKey: 'finalCost',
    header: 'Final Cost',
    size:120,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  }
]


export const costByServiceColumns: MRT_ColumnDef<CostByService>[] = [
  {
    accessorKey: 'description', //access nested data with dot notation
    header: 'Service',
    size: 100
  },
  {
    accessorKey: 'totalCost',
    header: 'Cost',
    size:80,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  },
  {
    accessorKey: 'totalCredits', //normal accessorKey
    header: 'Credits',
    size:90,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  },
  {
    accessorKey: 'finalCost',
    header: 'Final Cost',
    size:120,
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  }
]

export const allDataColumns: MRT_ColumnDef<AllData>[] = [
  {
    accessorKey: 'billingAccountId',
    header: 'Billing Account Id',
  },
  {
    accessorKey: 'service',
    header: 'Service',
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
  },
  {
    accessorKey: 'usageStartTime',
    header: 'Usage Start Time',
    Cell: ({ cell }) =>
      <Text>
        {dateToReadable(cell.getValue<string>())}
      </Text>
  },
  {
    accessorKey: 'usageEndTime',
    header: 'Usage End Time',
    Cell: ({ cell }) =>
      <Text>
        {dateToReadable(cell.getValue<string>())}
      </Text>
  },
  {
    accessorKey: 'usageDurationSeconds',
    header: 'Usage Duration Seconds',
  },
  {
    accessorKey: 'projectId',
    header: 'Project Id',
  },
  {
    accessorKey: 'projectName',
    header: 'Project Name',
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'resourceName',
    header: 'Resource Name',
  },
  {
    accessorKey: 'resourceGlobalName',
    header: 'Resource Global Name',
  },
  {
    accessorKey: 'exportTime',
    header: 'Export Time',
    Cell: ({ cell }) =>
      <Text>
        {dateToReadable(cell.getValue<string>())}
      </Text>
  },
  {
    accessorKey: 'cost',
    header: 'Cost',
    Cell: ({ cell }) =>
      <Text>
        {numToCost(cell.getValue<number>())}
      </Text>
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'usageAmount',
    header: 'Usage Amount',
  },
  {
    accessorKey: 'usageUnit',
    header: 'Usage Unit',
  },
  {
    accessorKey: 'credits.0.amount',
    header: 'Credits Amount', // TO DO: make credits nicer
  },
  {
    accessorKey: 'invoiceMonth',
    header: 'Invoice Month',
    Cell: ({ cell }) =>
      <Text>
        {monthToReadable(cell.getValue<string>())}
      </Text>
  }
]

export const bigQueryJobsListColumns: MRT_ColumnDef<BigQueryJob>[] = [
  {
    accessorKey: 'jobId', //access nested data with dot notation
    header: 'Job Id',
  },
  {
    accessorKey: 'projectId',
    header: 'Project Id',
  },
  {
    accessorKey: 'email', //normal accessorKey
    header: 'Email',

  },
  {
    accessorKey: 'status',
    header: 'Status',

  },
  {
    accessorKey: 'query', //access nested data with dot notation
    header: 'Query',
    Cell: ({ cell }) => (
      <>
        <ScrollArea h={30} w={1000}>
          <Prism language="sql" noCopy>
            {cell.getValue<string>()}
          </Prism>
        </ScrollArea>
        <CopyButton value={cell.getValue<string>()}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
              <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </>
      
    ),
  },
  {
    accessorKey: 'creationTime',
    header: 'Creation Time',
    Cell: ({ cell }) =>
      <Text>
        {dateToReadableMs(cell.getValue<string>())}
      </Text>
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    Cell: ({ cell }) =>
      <Text>
        {dateToReadableMs(cell.getValue<string>())}
      </Text>
  },
  {
    accessorKey: 'endTime',
    header: 'End Time',
    Cell: ({ cell }) =>
      <Text>
        {dateToReadableMs(cell.getValue<string>())}
      </Text>
  }
]