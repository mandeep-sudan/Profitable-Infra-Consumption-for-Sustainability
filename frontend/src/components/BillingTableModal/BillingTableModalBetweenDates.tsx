import {  Group,  Title, Select, ActionIcon, Table, SegmentedControl, Badge } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates'
import React, {  useState } from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { format } from 'date-fns';


type TableTileModalBetweenDatesProps = {
    betweenDates: BillingBetweenDates[]
    setBetweenDates: React.Dispatch<React.SetStateAction<BillingBetweenDates[]>>
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

const BillingTableModalBetweenDates = ({ betweenDates, setBetweenDates, currBetweenDatesOptions, setCurrBetweenDatesOptions }: TableTileModalBetweenDatesProps) => {
    // BETWEEN DATES
    const [currBetweenDatesField, setCurrBetweenDatesField] = useState<string>("");
    const [currBetweenDatesStartDateTime, setCurrBetweenDatesStartDateTime] = useState<Date>(null);
    const [currBetweenDatesEndDateTime, setCurrBetweenDatesEndDateTime] = useState<Date>(null);
    const [currBetweenDatesInclusive,setCurrBetweenDatesInclusive] = useState<string>('true');
    // const [isValidDateRange,setIsValidDateRange] = useState<boolean>(false)

    const addCurrBetweenDatesInputToList = () => {
        let startDateTime = currBetweenDatesStartDateTime
        let endDateTime = currBetweenDatesEndDateTime
        
        startDateTime.setSeconds(0,0)
        endDateTime.setSeconds(0,0)

        setBetweenDates(betweenDates.concat({
            field: currBetweenDatesField,
            startDateTime: startDateTime,
            endDateTime: endDateTime,
            inclusive: currBetweenDatesInclusive === 'true'
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
            <td><Badge color={!betweenDate.inclusive ? "orange" : "blue"}>{betweenDate.inclusive ? "inclusive" : "exclusive"}</Badge></td>
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

            <Title order={3}>Between Dates</Title>
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
                        valueFormat="DD MMM YYYY hh:mm A"
                        placeholder="Pick date and time"
                        maxDate={new Date()}
                        clearable
                        value={currBetweenDatesStartDateTime}
                        onChange={(event) => setCurrBetweenDatesStartDateTime(event)}
                        mx="auto"
                    />
                    <DateTimePicker
                        label="End datetime"
                        valueFormat="DD MMM YYYY hh:mm A"
                        placeholder="Pick date and time"
                        maxDate={new Date()}
                        clearable
                        value={currBetweenDatesEndDateTime}
                        onChange={(event) => setCurrBetweenDatesEndDateTime(event)}
                        mx="auto"
                    />
                </Group>

                <SegmentedControl
                        color="blue"
                        value={currBetweenDatesInclusive}
                        onChange={setCurrBetweenDatesInclusive}
                        data={[
                            { label: "Inclusive range", value: 'true' },
                            { label: "Exclusive range", value: 'false' }
                        ]}
                    /> 


                <ActionIcon variant="filled"
                    color="blue"
                    onClick={() => addCurrBetweenDatesInputToList()}
                    disabled={currBetweenDatesField === "" || invalidDateRange(currBetweenDatesStartDateTime, currBetweenDatesEndDateTime)}><IconPlus size="1rem" /></ActionIcon>
            </Group>
            <Table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Inclusive/Exclusive</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}

export default BillingTableModalBetweenDates;