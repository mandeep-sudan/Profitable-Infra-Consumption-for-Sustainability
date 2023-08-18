import {  Group,  Title, Select, ActionIcon, Table, NumberInput } from '@mantine/core';
import React, { useState } from 'react';
import "./TableTileModal.css"
import { IconPlus, IconTrash } from '@tabler/icons-react';


type TableTileModalBetweenValuesProps = {
    betweenValues: BetweenValues[]
    setBetweenValues: React.Dispatch<React.SetStateAction<BetweenValues[]>>
    currBetweenValuesOptions: string[]
    setCurrBetweenValuesOptions: React.Dispatch<React.SetStateAction<string[]>>
}

const invalidValueRange = (lowValue: number|'', highValue: number|''): boolean => {
    return (lowValue === '' && highValue === '') ||
        ((lowValue !== '' && highValue !== '') &&
            (lowValue > highValue))
}

const convertOrTypeToNumber = (num:number|'') : number=> {
    if (typeof num === "number") {
        return num
    } 
    return null
}

const TableTileModalBetweenValues = ({ betweenValues, setBetweenValues, currBetweenValuesOptions, setCurrBetweenValuesOptions }: TableTileModalBetweenValuesProps) => {
    // BETWEEN Values
    const [currBetweenValuesField, setCurrBetweenValuesField] = useState<string>("");
    const [currBetweenValuesLowNumber, setCurrBetweenValuesLowNumber] = useState<number | ''>('');
    const [currBetweenValuesHighNumber, setCurrBetweenValuesHighNumber] = useState<number | ''>('');
    // const [isValidDateRange,setIsValidDateRange] = useState<boolean>(false)

    const addCurrBetweenValuesInputToList = () => {
        
        setBetweenValues(betweenValues.concat({
            field: currBetweenValuesField,
            lowNumber: convertOrTypeToNumber(currBetweenValuesLowNumber),
            highNumber: convertOrTypeToNumber(currBetweenValuesHighNumber),
        }))
        setCurrBetweenValuesOptions(currBetweenValuesOptions.filter(item => item !== currBetweenValuesField))
        setCurrBetweenValuesField("")
        setCurrBetweenValuesLowNumber('')
        setCurrBetweenValuesHighNumber('')
    }

    const removeFieldFromValues = (field: string) => {
        setBetweenValues(betweenValues.filter(item => item.field !== field))
        setCurrBetweenValuesOptions(currBetweenValuesOptions.concat(field).sort((a, b) => a.localeCompare(b)))
    }

    const rows: React.ReactElement[] = betweenValues.map((betweenValue) => (
        <tr key={betweenValue.field}>
            <td>{betweenValue.field}</td>
            <td>{betweenValue.lowNumber}</td>
            <td>{betweenValue.highNumber}</td>
            <td>
                <ActionIcon color="red">
                    <IconTrash size="1.125rem" onClick={() => removeFieldFromValues(betweenValue.field)} />
                </ActionIcon>
            </td>
        </tr>
    ));

    // useEffect(() => {
    //     setIsValidDateRange(validDateRange(currBetweenValuesStartDateTime,currBetweenValuesEndDateTime))
    //   }, [currBetweenValuesEndDateTime,currBetweenValuesEndDateTime]);

    return (
        <>

            <Title order={3}>Between Values Filters</Title>
            <Group >
                <Select
                    value={currBetweenValuesField}
                    onChange={setCurrBetweenValuesField}
                    label="Select field to filter by value"
                    placeholder="Pick one"
                    data={currBetweenValuesOptions}
                    withAsterisk
                />

                <Group>
                    <NumberInput
                        hideControls
                        label="Low Value"
                        precision={4}
                        value={currBetweenValuesLowNumber}
                        onChange={setCurrBetweenValuesLowNumber}
                    />
                    <NumberInput
                        hideControls
                        label="High Value"
                        precision={4}
                        value={currBetweenValuesHighNumber}
                        onChange={setCurrBetweenValuesHighNumber}
                    />
                </Group>


                <ActionIcon variant="filled"
                    color="blue"
                    onClick={() => addCurrBetweenValuesInputToList()}
                    disabled={currBetweenValuesField === "" || invalidValueRange(currBetweenValuesLowNumber, currBetweenValuesHighNumber)}><IconPlus size="1rem" /></ActionIcon>
            </Group>
            <Table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Low</th>
                        <th>High</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}

export default TableTileModalBetweenValues;