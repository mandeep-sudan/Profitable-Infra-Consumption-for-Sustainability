import { Group, Title, Select, TextInput, ActionIcon, Table, SegmentedControl, Switch, ThemeIcon, Badge } from '@mantine/core';
import React, { useState } from 'react';
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';



type TableTileModalMatchProps = {
    matches: Match[]
    setMatches: React.Dispatch<React.SetStateAction<Match[]>>
    currMatchOptions: string[]
    setCurrMatchOptions: React.Dispatch<React.SetStateAction<string[]>>
}

const BillingTableModalMatch = ({ matches, setMatches, currMatchOptions, setCurrMatchOptions }: TableTileModalMatchProps) => {
    // MATCHES
    // const [currMatchOptions, setCurrMatchOptions] = useState<string[]>(matchFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
    const [currMatchOperator, setCurrMatchOperator] = useState<string>("=");
    const [currMatchValue, setCurrMatchValue] = useState<string>("");
    const [currMatchField, setCurrMatchField] = useState<string>("");
    const [currMatchNot, setCurrMatchNot] = useState<boolean>(false);


    const addCurrMatchInputToList = () => {
        setMatches(matches.concat({
            field: currMatchField,
            value: currMatchValue,
            operator: currMatchOperator,
            not: currMatchNot
        }))
        setCurrMatchOptions(currMatchOptions.filter(item => item !== currMatchField))
        setCurrMatchField("")
        setCurrMatchValue("")
    }
    const removeFieldFromMatches = (field: string) => {
        setMatches(matches.filter(item => item.field !== field))
        setCurrMatchOptions(currMatchOptions.concat(field).sort((a, b) => a.localeCompare(b)))
    }

    const rows: React.ReactElement[] = matches.map((match) => (
        <tr key={match.field}>
            <td>{match.field}</td>
            <td>{match.value}</td>
            <td>{match.not ?
                <ThemeIcon color="green" variant="light">
                    <IconCheck />
                </ThemeIcon> :
                <></>}</td>
            <td><Badge color={(match.operator) === "LIKE" ? "orange" : "blue"}>{(match.operator) === "LIKE" ? "partial" : "exact"}</Badge></td>
            

            <td>
                <ActionIcon color="red">
                    <IconTrash size="1.125rem" onClick={() => removeFieldFromMatches(match.field)} />
                </ActionIcon>
            </td>
        </tr>
    ));

    return (
        <>

            <Title order={3}>Matches</Title>
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
                <Switch
                    checked={currMatchNot}
                    onChange={(event) => setCurrMatchNot(event.currentTarget.checked)}
                    label="NOT"
                    style={{ marginBottom: "10px" }}
                />
                <SegmentedControl
                    color="blue"
                    value={currMatchOperator}
                    onChange={setCurrMatchOperator}
                    data={[
                        { label: "Exact match", value: "=" },
                        { label: "Partial match", value: "LIKE" }
                    ]}
                />



                <ActionIcon variant="filled"
                    color="blue"
                    onClick={() => addCurrMatchInputToList()}
                    disabled={currMatchValue === "" || currMatchField === ""}><IconPlus size="1rem" /></ActionIcon>
            </Group>
            <Table>
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                        <th>Not</th>
                        <th>Operator</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            {/* <TableTileModalMatchTable matches={matches} setMatches={setMatches} currMatchOptions={currMatchOptions} setCurrMatchOptions={setCurrMatchOptions} /> */}
        </>
    );
}

export default BillingTableModalMatch;