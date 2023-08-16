import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal, useMantineTheme, Title, Autocomplete, Select, Radio, Text, TextInput, ActionIcon, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { matchFieldsForGlobalFilter } from '../utils/utils';
import "./TableTileModal.css"
import { IconPlus, IconTrash } from '@tabler/icons-react';



type TableTileModalMatchProps = {
    matches: Match[]
    setMatches: React.Dispatch<React.SetStateAction<Match[]>>
    currMatchOptions:string[]
    setCurrMatchOptions:React.Dispatch<React.SetStateAction<string[]>>
}

const TableTileModalMatch = ({ matches,setMatches,currMatchOptions,setCurrMatchOptions }: TableTileModalMatchProps) => {
    // MATCHES
    // const [currMatchOptions, setCurrMatchOptions] = useState<string[]>(matchFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
    const [currMatchOperator, setCurrMatchOperator] = useState<string>("=");
    const [currMatchValue, setCurrMatchValue] = useState<string>("");
    const [currMatchField, setCurrMatchField] = useState<string>("");


    const addCurrMatchInputToList = () => {
        setMatches(matches.concat({
            field: currMatchField,
            value: currMatchValue,
            operator: currMatchOperator
        }))
        setCurrMatchOptions(currMatchOptions.filter(item => item !== currMatchField))
        setCurrMatchField("")
        setCurrMatchValue("")
    }
    const removeFieldFromMatches = (field:string) => {
        setMatches(matches.filter(item=>item.field!==field))
        setCurrMatchOptions(currMatchOptions.concat(field).sort((a,b)=> a.localeCompare(b)))
    }

    const rows: React.ReactElement[] = matches.map((match) => (
        <tr key={match.field}>
            <td>{match.field}</td>
            <td>{match.operator}</td>
            <td>{match.value}</td>
            <td>
                <ActionIcon color="red">
                    <IconTrash size="1.125rem" onClick={()=>removeFieldFromMatches(match.field)}/>
                </ActionIcon>
            </td>
        </tr>
    ));

    return (
        <>

            <Title order={3}>Match Filters</Title>
            <Group >
                <Select
                    value={currMatchField}
                    onChange={setCurrMatchField}
                    label="Select field to match"
                    placeholder="Pick one"
                    data={currMatchOptions}
                    withAsterisk
                />
                <TextInput
                    withAsterisk
                    label="Type text to match"
                    value={currMatchValue}
                    onChange={(event) => setCurrMatchValue(event.currentTarget.value)}
                />
                <Radio.Group
                    value={currMatchOperator}
                    onChange={setCurrMatchOperator}
                // label="Select preferred match type."
                >
                    <Group>
                        <Radio value="=" label="Exact Match" />
                        <Radio value="LIKE" label="Partial Match" />
                    </Group>
                </Radio.Group>
                <ActionIcon variant="filled"
                    color="blue"
                    onClick={() => addCurrMatchInputToList()}
                    disabled={currMatchValue === "" || currMatchField === ""}><IconPlus size="1rem" /></ActionIcon>
            </Group>
            <Table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Operator</th>
                        <th>Value</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            {/* <TableTileModalMatchTable matches={matches} setMatches={setMatches} currMatchOptions={currMatchOptions} setCurrMatchOptions={setCurrMatchOptions} /> */}
        </>
    );
}

export default TableTileModalMatch;