import {  Group,  Title, Select, ActionIcon, Table, NumberInput, SegmentedControl, Stack, Text, Badge } from '@mantine/core';
import React, { useState } from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';


type TableTileModalBetweenValuesProps = {
    betweenValues: BillingBetweenValues[]
    setBetweenValues: React.Dispatch<React.SetStateAction<BillingBetweenValues[]>>
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

const BillingTableModalBetweenValues = ({ betweenValues, setBetweenValues, currBetweenValuesOptions, setCurrBetweenValuesOptions }: TableTileModalBetweenValuesProps) => {
    // BETWEEN Values
    const [currBetweenValuesField, setCurrBetweenValuesField] = useState<string>("");
    const [currBetweenValuesLowNumber, setCurrBetweenValuesLowNumber] = useState<number | ''>('');
    const [currBetweenValuesHighNumber, setCurrBetweenValuesHighNumber] = useState<number | ''>('');
    const [currBetweenValuesInclusive,setCurrBetweenValuesInclusive] = useState<string>('true');
    // const [isValidDateRange,setIsValidDateRange] = useState<boolean>(false)

    const addCurrBetweenValuesInputToList = () => {
        
        setBetweenValues(betweenValues.concat({
            field: currBetweenValuesField,
            lowNumber: convertOrTypeToNumber(currBetweenValuesLowNumber),
            highNumber: convertOrTypeToNumber(currBetweenValuesHighNumber),
            inclusive: currBetweenValuesInclusive === 'true'
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
            <td><Badge color={!betweenValue.inclusive ? "orange" : "blue"}>{!betweenValue.inclusive ? "inclusive" : "exclusive"}</Badge></td>
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

            <Title order={3}>Between Values</Title>
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
                        style={{width:"140px"}}
                        value={currBetweenValuesLowNumber}
                        onChange={setCurrBetweenValuesLowNumber}
                    />
                    <NumberInput
                        hideControls
                        label="High Value"
                        style={{width:"140px"}}
                        precision={4}
                        value={currBetweenValuesHighNumber}
                        onChange={setCurrBetweenValuesHighNumber}
                    />
                </Group>
                
                <SegmentedControl
                        color="blue"
                        value={currBetweenValuesInclusive}
                        onChange={setCurrBetweenValuesInclusive}
                        data={[
                            { label: "Inclusive range", value: 'true' },
                            { label: "Exclusive range", value: 'false' }
                        ]}
                    /> 
                
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
                        <th>Inclusive/Exclusive</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    );
}

export default BillingTableModalBetweenValues;