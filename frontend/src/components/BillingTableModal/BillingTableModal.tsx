import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal, useMantineTheme, Title } from '@mantine/core';
import React, { useState } from 'react';
import { betweenDatesFieldsForGlobalFilter, betweenValuesFieldsForGlobalFilter, matchFieldsForGlobalFilter } from '../../utils/utils';
import "./BillingTableModal.css"
import {  IconWorld } from '@tabler/icons-react';
import BillingTableModalBetweenDates from './BillingTableModalBetweenDates';
import BillingTableModalBetweenValues from './BillingTableModalBetweenValues';
import BillingTableModalMatch from './BillingTableModalMatch';
import BillingTableModalSorting from './BillingTableModalSorting';


type TableTileModalProps = {
    setQueryParams: React.Dispatch<React.SetStateAction<BillingQueryParams>>
}


const BillingTableModal = ({ setQueryParams }: TableTileModalProps) => {
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
    const [currSortingFields, setCurrSortingFields] = useState<string[]>(["usage_start_time"]);
    const [fieldToBoolDict, setFieldToBoolDict] = useState<Record<string,boolean>>({usage_start_time:false});
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
        setSortings([])
        setCurrSortingFields([])

    }

    return (
        <>

            <Modal.Root opened={opened}
                onClose={close}
                size={905}>
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
                            <BillingTableModalBetweenDates betweenDates={betweenDates}
                                setBetweenDates={setBetweenDates}
                                currBetweenDatesOptions={currBetweenDatesOptions}
                                setCurrBetweenDatesOptions={setCurrBetweenDatesOptions} />
                            <BillingTableModalBetweenValues betweenValues={betweenValues}
                                setBetweenValues={setBetweenValues}
                                currBetweenValuesOptions={currBetweenValuesOptions}
                                setCurrBetweenValuesOptions={setCurrBetweenValuesOptions} />
                            <BillingTableModalMatch matches={matches}
                                setMatches={setMatches}
                                currMatchOptions={currMatchOptions}
                                setCurrMatchOptions={setCurrMatchOptions} />
                            <BillingTableModalSorting sortings={sortings}
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
                <Button
                    leftIcon={<IconWorld />}
                    onClick={open}>Global Filtering</Button>
            </Group>
        </>
    );
}

export default BillingTableModal;