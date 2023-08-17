import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal, useMantineTheme, Title, Autocomplete, Select, Radio, Text, TextInput, ActionIcon } from '@mantine/core';
import React, { useState } from 'react';
import { betweenDatesFieldsForGlobalFilter, betweenValuesFieldsForGlobalFilter, matchFieldsForGlobalFilter, sortingFieldsForGlobalFilter } from '../utils/utils';
import "./TableTileModal.css"
import { IconPlus } from '@tabler/icons-react';
import TableTileModalMatch from './TableTileModalMatch';
import TableTileModalBetweenDates from './TableTileModalBetweenDates';
import TableTileModalBetweenValues from './TableTileModalBetweenValues';
import TableTileModalSorting from './TableTileModalSorting';


type TableTileModalProps = {
    setQueryParams: React.Dispatch<React.SetStateAction<QueryParams>>
}


const TableTileModal = ({ setQueryParams }: TableTileModalProps) => {
    // FORMATTING
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    // MATCHES
    const [currMatchOptions, setCurrMatchOptions] = useState<string[]>(matchFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
    const [matches, setMatches] = useState<Match[]>([]);

    // BETWEEN DATES
    const [currBetweenDatesOptions, setCurrBetweenDatesOptions] = useState<string[]>(betweenDatesFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
    const [betweenDates, setBetweenDates] = useState<BetweenDates[]>([]);

    // BETWEEN VALUES
    const [currBetweenValuesOptions, setCurrBetweenValuesOptions] = useState<string[]>(betweenValuesFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
    const [betweenValues, setBetweenValues] = useState<BetweenValues[]>([]);

    // SORTING
    const [currSortingFields, setCurrSortingFields] = useState<string[]>([]);
    const [fieldToBoolDict, setFieldToBoolDict] = useState<Record<string,boolean>>({});
    const [sortings, setSortings] = useState<Sorting[]>([]);

    const submitFilter = () => {
        setQueryParams({ matches: matches,betweenDates: betweenDates, betweenValues: betweenValues, sortings: sortings })
        close() // closes modal
    }

    const clearFilter = () => {
        setCurrMatchOptions(matchFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
        setMatches([])
        setCurrBetweenDatesOptions(betweenDatesFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
        setBetweenDates([])
        setCurrBetweenValuesOptions(betweenValuesFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
        setBetweenValues([])

    }

    return (
        <>

            <Modal.Root opened={opened}
                onClose={close}
                size={850}>
                <Modal.Overlay
                    color={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
                    opacity={0.55}
                    blur={3}
                />
                <Modal.Content>
                    <Modal.Header>
                        <Group position="apart">
                            <Title>Global Filtering</Title>
                        </Group>
                        <Group position="right">
                            <Button
                                onClick={() => submitFilter()}>Submit New Filter</Button>
                            <Button color="red"
                                onClick={() => clearFilter()}>Clear New Filter</Button>
                            <Modal.CloseButton />
                        </Group>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='global-filter-modal'>
                            <TableTileModalBetweenDates betweenDates={betweenDates}
                                setBetweenDates={setBetweenDates}
                                currBetweenDatesOptions={currBetweenDatesOptions}
                                setCurrBetweenDatesOptions={setCurrBetweenDatesOptions} />
                            <TableTileModalBetweenValues betweenValues={betweenValues}
                                setBetweenValues={setBetweenValues}
                                currBetweenValuesOptions={currBetweenValuesOptions}
                                setCurrBetweenValuesOptions={setCurrBetweenValuesOptions} />
                            <TableTileModalMatch matches={matches}
                                setMatches={setMatches}
                                currMatchOptions={currMatchOptions}
                                setCurrMatchOptions={setCurrMatchOptions} />
                            <TableTileModalSorting sortings={sortings}
                                setSortings={setSortings}
                                currSortingFields={currSortingFields}
                                setCurrSortingFields={setCurrSortingFields}
                                fieldToBoolDict={fieldToBoolDict}
                                setFieldToBoolDict={setFieldToBoolDict} 
                                />

                            {/* <div style={{ height: "500px" }}></div> */}
                        </div>
                    </Modal.Body>
                </Modal.Content>
            </Modal.Root>

            <Group position="center">
                <Button onClick={open}>Open modal</Button>
            </Group>
        </>
    );
}

export default TableTileModal;