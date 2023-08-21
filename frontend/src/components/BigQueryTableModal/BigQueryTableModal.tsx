import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal, useMantineTheme, Title } from '@mantine/core';
import React, { useState } from 'react';
import { betweenDatesFieldsForGlobalFilter, betweenValuesFieldsForGlobalFilter, matchFieldsForGlobalFilter } from '../../utils/utils';
import "./BillingTableModal.css"
import { IconWorld } from '@tabler/icons-react';
import { DateTimePicker } from '@mantine/dates';


type TableTileModalProps = {
    setQueryParams: React.Dispatch<React.SetStateAction<BillingQueryParams>>
}


const BigQueryTableModal = ({ setQueryParams }: TableTileModalProps) => {
    // FORMATTING
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    // dates filter
    const [currMinCreationTime, setCurrMinCreationTime] = useState<Date>(null);
    const [currMaxCreationTime, setCurrMaxCreationTime] = useState<Date>(null);



    const submitFilter = () => {
        // setQueryParams({ matches: matches,betweenDates: betweenDates, betweenValues: betweenValues, sortings: sortings })
        close() // closes modal
    }

    const clearFilter = () => {
        // setCurrMatchOptions(matchFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
        // setMatches([])
        // setCurrBetweenDatesOptions(betweenDatesFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
        // setBetweenDates([])
        // setCurrBetweenValuesOptions(betweenValuesFieldsForGlobalFilter.sort((a, b) => a.localeCompare(b)))
        // setBetweenValues([])
        // setSortings([])
        // setCurrSortingFields([])

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

                            <Group>
                                <DateTimePicker
                                    label="Start datetime"
                                    placeholder="Pick date and time"
                                    maxDate={new Date()}
                                    clearable
                                    value={currMinCreationTime}
                                    onChange={(event) => setCurrMinCreationTime(event)}
                                    mx="auto"
                                />
                                <DateTimePicker
                                    label="End datetime"
                                    placeholder="Pick date and time"
                                    maxDate={new Date()}
                                    clearable
                                    value={currMaxCreationTime}
                                    onChange={(event) => setCurrMaxCreationTime(event)}
                                    mx="auto"
                                />
                            </Group>
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

export default BigQueryTableModal;