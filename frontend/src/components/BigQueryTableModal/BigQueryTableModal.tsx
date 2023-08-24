import { useDisclosure } from '@mantine/hooks';
import { Button, Group, Modal, useMantineTheme, Title, SegmentedControl, Switch, TextInput, Space, Radio, Checkbox } from '@mantine/core';
import React, { useState } from 'react';
import { betweenDatesFieldsForGlobalFilter, betweenValuesFieldsForGlobalFilter, matchFieldsForGlobalFilter } from '../../utils/utils';
import "./BigQueryTableModal.css"
import { IconWorld } from '@tabler/icons-react';
import { DateTimePicker } from '@mantine/dates';

type TableTileModalProps = {
    setQueryParams: React.Dispatch<React.SetStateAction<BigQueryQueryParams>>
}

const invalidDateRange = (startDateTime: Date, endDateTime: Date): boolean => {
    return ((startDateTime !== null && endDateTime !== null) &&
        (startDateTime > endDateTime))
}

const BigQueryTableModal = ({ setQueryParams }: TableTileModalProps) => {
    // FORMATTING
    const [opened, { open, close }] = useDisclosure(false);
    const theme = useMantineTheme();

    // dates filter
    const [currMinCreationTime, setCurrMinCreationTime] = useState<Date>(null);
    const [currMaxCreationTime, setCurrMaxCreationTime] = useState<Date>(null);

    const [parentJobId, setParentJobId] = useState<string>("");
    const [allUsers, setAllUsers] = useState<boolean>(false);
    const [stateFilters, setStateFilters] = useState<string[]>(["DONE","PENDING","RUNNING"]);



    const submitFilter = () => {
        let minCreateTemp : string =""
        let maxCreateTemp : string =""
        if (currMinCreationTime!==null) {
            minCreateTemp=JSON.stringify(currMinCreationTime.getTime())
        }
        if (currMaxCreationTime!==null) {
            maxCreateTemp=JSON.stringify(currMaxCreationTime.getTime())
        }
        setQueryParams({
            allUsers: allUsers,
            minCreationTime: minCreateTemp,
            maxCreationTime: maxCreateTemp,
            stateFilters: stateFilters,
            parentJobId: parentJobId
        })
        close() // closes modal
    }

    const clearFilter = () => {
        setCurrMinCreationTime(null)
        setCurrMaxCreationTime(null)
        setParentJobId("")
        setAllUsers(false)
        setStateFilters([])
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
                                onClick={() => submitFilter()}
                                disabled={invalidDateRange(currMinCreationTime, currMaxCreationTime)}
                            >Submit New Filter</Button>
                            <Button color="red"
                                onClick={() => clearFilter()}>Clear New Filter</Button>
                            <Modal.CloseButton />
                        </Group>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='global-filter-modal'>
                            <Space h="xl" />
                            <Space h="xl" />
                            <Space h="xl" />
                            <Space h="xl" />
                            <Space h="xl" />
                            <Switch
                                checked={allUsers}
                                onChange={(event) => setAllUsers(event.currentTarget.checked)}
                                label="All Users"
                                description="Whether to display jobs owned by all users in the project."
                            />
                            <TextInput
                                label="Parent Job Id"
                                value={parentJobId}
                                onChange={(event) => setParentJobId(event.currentTarget.value)}
                            />

                            <Checkbox.Group
                                value={stateFilters}
                                onChange={setStateFilters}
                                label="Filter by Job State">
                                <Group>
                                    <Checkbox value="DONE" label="Done" />
                                    <Checkbox value="PENDING" label="Pending" />
                                    <Checkbox value="RUNNING" label="Running" />
                                </Group>
                            </Checkbox.Group>
                            <Group position="left">
                                <DateTimePicker
                                    label="Min Creation Time"
                                    valueFormat="DD MMM YYYY hh:mm A"
                                    placeholder="Pick date and time"
                                    maxDate={new Date()}
                                    clearable
                                    value={currMinCreationTime}
                                    onChange={(event) => setCurrMinCreationTime(event)}
                                />
                                <DateTimePicker
                                    label="Max Creation Time"
                                    placeholder="Pick date and time"
                                    maxDate={new Date()}
                                    clearable
                                    value={currMaxCreationTime}
                                    onChange={(event) => setCurrMaxCreationTime(event)}
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