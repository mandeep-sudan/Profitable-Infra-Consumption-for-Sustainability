import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal, useMantineTheme, Title, Autocomplete, Select, Radio, Text, TextInput, ActionIcon, Table } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates'
import React, { useEffect, useState } from 'react';
import { matchFieldsForGlobalFilter } from '../utils/utils';
import "./TableTileModal.css"
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { format } from 'date-fns';


type TableTileModalBetweenDatesProps = {
    betweenDates: BetweenDates[]
    setBetweenDates: React.Dispatch<React.SetStateAction<BetweenDates[]>>
    currBetweenDatesOptions: string[]
    setCurrBetweenDatesOptions: React.Dispatch<React.SetStateAction<string[]>>
}

const dateToReadable = (date: Date): string => {
    if (date !== null) {
        return format(date, "d LLL, yyy, h:mmaaa")
    } else {
        return null;
    }
}

const invalidDateRange = (startDateTime: Date, endDateTime: Date): boolean => {
    
    return (startDateTime === null && endDateTime === null) ||
        ((startDateTime !== null && endDateTime !== null) &&
            (startDateTime > endDateTime))
}

const TableTileModalBetweenDates = ({ betweenDates, setBetweenDates, currBetweenDatesOptions, setCurrBetweenDatesOptions }: TableTileModalBetweenDatesProps) => {
    // BETWEEN DATES
    const [currBetweenDatesField, setCurrBetweenDatesField] = useState<string>("");
    const [currBetweenDatesStartDateTime, setCurrBetweenDatesStartDateTime] = useState<Date>(null);
    const [currBetweenDatesEndDateTime, setCurrBetweenDatesEndDateTime] = useState<Date>(null);
    // const [isValidDateRange,setIsValidDateRange] = useState<boolean>(false)

    const addCurrBetweenDatesInputToList = () => {
        setBetweenDates(betweenDates.concat({
            field: currBetweenDatesField,
            startDateTime: currBetweenDatesStartDateTime,
            endDateTime: currBetweenDatesEndDateTime,
        }))
        setCurrBetweenDatesOptions(currBetweenDatesOptions.filter(item => item !== currBetweenDatesField))
        setCurrBetweenDatesField("")
        // setCurrBetweenDatesStartDateTime(null)
        // setCurrBetweenDatesEndDateTime(null)
    }

    const removeFieldFromMatches = (field: string) => {
        setBetweenDates(betweenDates.filter(item => item.field !== field))
        setCurrBetweenDatesOptions(currBetweenDatesOptions.concat(field).sort((a, b) => a.localeCompare(b)))
    }

    const rows: React.ReactElement[] = betweenDates.map((betweenDate) => (
        <tr key={betweenDate.field}>
            <td>{betweenDate.field}</td>
            <td>{dateToReadable(betweenDate.startDateTime)}</td>
            <td>{dateToReadable(betweenDate.endDateTime)}</td>
            <td>
                <ActionIcon color="red">
                    <IconTrash size="1.125rem" onClick={() => removeFieldFromMatches(betweenDate.field)} />
                </ActionIcon>
            </td>
        </tr>
    ));

    // useEffect(() => {
    //     setIsValidDateRange(validDateRange(currBetweenDatesStartDateTime,currBetweenDatesEndDateTime))
    //   }, [currBetweenDatesEndDateTime,currBetweenDatesEndDateTime]);

    return (
        <>

            <Title order={3}>Between Dates Filters</Title>
            <Group >
                <Select
                    value={currBetweenDatesField}
                    onChange={setCurrBetweenDatesField}
                    label="Select field to filter by datetime"
                    placeholder="Pick one"
                    data={currBetweenDatesOptions}
                    withAsterisk
                />

                <Group>
                    <DateTimePicker
                        label="Start datetime"
                        placeholder="Pick date and time"
                        clearable
                        value={currBetweenDatesStartDateTime}
                        onChange={(event) => setCurrBetweenDatesStartDateTime(event)}
                        mx="auto"
                    />
                    <DateTimePicker
                        label="End datetime"
                        placeholder="Pick date and time"
                        clearable
                        value={currBetweenDatesEndDateTime}
                        onChange={(event) => setCurrBetweenDatesEndDateTime(event)}
                        mx="auto"
                    />
                </Group>


                <ActionIcon variant="filled"
                    color="blue"
                    onClick={() => addCurrBetweenDatesInputToList()}
                    disabled={currBetweenDatesField === "" || invalidDateRange(currBetweenDatesStartDateTime, currBetweenDatesEndDateTime)}><IconPlus size="1rem" /></ActionIcon>
            </Group>
            <Table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Start DateTime</th>
                        <th>End DateTime</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}

export default TableTileModalBetweenDates;