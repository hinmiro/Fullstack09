import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

import axios from 'axios';
import patientService from '../../services/patients';
import React, { SyntheticEvent, useState } from 'react';
import { Diagnose, NewEntry, Patient, EntryType } from '../../types';

interface Props {
    id: string;
    diagnoses: Diagnose[];
    setErrorText: React.Dispatch<React.SetStateAction<string>>;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const AddEntry = ({ id, diagnoses, setErrorText, setPatient }: Props) => {
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
    const [showDiagnoses, setShowDiagnoses] = useState(false);
    const [entryType, setEntryType] = useState<EntryType | ''>('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState<Dayjs | null>(null);
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(0);

    const clearForm = () => {
        setDate(null);
        setDescription('');
        setSpecialist('');
        setHealthCheckRating(0);
        setSelectedCodes([]);
    };

    const addNewEntry = async (event: SyntheticEvent) => {
        event.preventDefault();

        const newEntry: NewEntry = {
            type: 'HealthCheck',
            date: date ? date.format('YYYY-MM-DD') : '',
            specialist: specialist,
            description: description,
            healthCheckRating: healthCheckRating,
            diagnosisCodes: selectedCodes,
        };

        try {
            const result = await patientService.addEntry(id, newEntry);
            setPatient(result);
            clearForm();
        } catch (error: unknown) {
            console.log('error: ', error);
            if (axios.isAxiosError(error)) {
                const message =
                    typeof error.response?.data === 'string'
                        ? error.response.data
                        : error.message;
                setErrorText(message || 'Unknown Axios error');
            } else if (error instanceof Error) {
                setErrorText(error.message);
            } else {
                setErrorText('Unknown error');
            }

            setTimeout(() => {
                setErrorText('');
            }, 3000);
        }
    };
    const handleRatingPick = (event: SelectChangeEvent<number>) => {
        const value = Number(event.target.value);
        setHealthCheckRating(value);
    };

    const handleCodeState = (event: SyntheticEvent) => {
        event.preventDefault();
        setShowDiagnoses((prev) => !prev);
    };

    const handleEntryTypeChange = (event: SelectChangeEvent<EntryType>) => {
        const value = event.target.value as EntryType;
        console.log(value);
        setEntryType(value);
    };

    return (
        <>
            <Box sx={{ borderStyle: 'dotted', borderRadius: '10px' }}>
                <form
                    onSubmit={addNewEntry}
                    style={{
                        padding: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <h3>New Entry</h3>
                    <FormControl>
                        <InputLabel id="type_select_label">Type</InputLabel>
                        <Select
                            labelId="type_select_label"
                            id="type_select"
                            value={entryType}
                            label="Entry type"
                            onChange={handleEntryTypeChange}
                        >
                            <MenuItem value={EntryType.HealthCare}>
                                Healthcare
                            </MenuItem>
                            <MenuItem value={EntryType.HealthCheck}>
                                Health check
                            </MenuItem>
                            <MenuItem value={EntryType.HospitalEntry}>
                                Hospital entry
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="standard-basic"
                        label="Description"
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <DatePicker
                        sx={{ width: '15rem', marginTop: '2rem' }}
                        label="Date"
                        value={date}
                        onChange={setDate}
                    />
                    <TextField
                        id="standard-basic"
                        label="Specialist"
                        variant="standard"
                        sx={{ marginTop: '0.5rem' }}
                        value={specialist}
                        onChange={(e) => setSpecialist(e.target.value)}
                    />
                    <FormControl
                        sx={{ marginTop: '2rem', width: '15rem' }}
                        size="medium"
                    >
                        <InputLabel id="healthRating">Health Rating</InputLabel>
                        <Select
                            labelId="healthRating"
                            id="healthRatingPick"
                            value={healthCheckRating}
                            label="Health Rating"
                            onChange={handleRatingPick}
                        >
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="text"
                        sx={{ width: '15rem', marginTop: '2rem' }}
                        onClick={handleCodeState}
                    >
                        {!showDiagnoses
                            ? 'Show Diagnose Codes'
                            : 'Hide Diagnose Codes'}
                    </Button>
                    {showDiagnoses && (
                        <FormControl sx={{ marginTop: '1rem' }}>
                            <List>
                                {diagnoses.map((diagnose) => {
                                    const diagnoseLabel = `${diagnose.code}: ${diagnose.name}`;
                                    const checked = selectedCodes.includes(
                                        diagnose.code,
                                    );

                                    const handleCheckBoxChange = (
                                        event: React.ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        if (event.target.checked) {
                                            setSelectedCodes((prev) => [
                                                ...prev,
                                                diagnose.code,
                                            ]);
                                        } else {
                                            setSelectedCodes((prev) =>
                                                prev.filter(
                                                    (code) =>
                                                        code !== diagnose.code,
                                                ),
                                            );
                                        }
                                    };

                                    return (
                                        <ListItem key={diagnose.code}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={checked}
                                                        onChange={
                                                            handleCheckBoxChange
                                                        }
                                                    />
                                                }
                                                label={diagnoseLabel}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </FormControl>
                    )}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginTop: 2,
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: 'red',
                                '&:hover': { bgcolor: 'darkred' },
                            }}
                            onClick={() => clearForm()}
                        >
                            Clear
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ width: '5rem' }}
                        >
                            Submit
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};

export default AddEntry;
