import React, { useState, SyntheticEvent } from 'react';
import { Dayjs } from 'dayjs';
import { EntryType, Patient } from '../../types';
import patientService from '../../services/patients';
import axios from 'axios';

// Mui imports
import { DatePicker } from '@mui/x-date-pickers';
import { SelectChangeEvent } from '@mui/material/Select';
import {
    FormControl,
    List,
    FormControlLabel,
    ListItem,
    Checkbox,
    Button,
    TextField,
    Box,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

// Type imports
import { Diagnose } from '../../types';

interface Props {
    id: string;
    diagnoses: Diagnose[];
    setErrorText: React.Dispatch<React.SetStateAction<string>>;
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

const BaseForm = ({ id, diagnoses, setErrorText, setPatient }: Props) => {
    const [date, setDate] = useState<Dayjs | null>(null);
    const [specialist, setSpecialist] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
    const [showDiagnoses, setShowDiagnoses] = useState(false);
    const [entryType, setEntryType] = useState<EntryType | ''>('');

    // Additional state for different entry types
    const [healthCheckRating, setHealthCheckRating] = useState(0);
    const [employerName, setEmployerName] = useState('');
    const [sickLeaveStart, setSickLeaveStart] = useState<Dayjs | null>(null);
    const [sickLeaveEnd, setSickLeaveEnd] = useState<Dayjs | null>(null);
    const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
    const [dischargeCriteria, setDischargeCriteria] = useState('');

    const handleCodeState = (event: SyntheticEvent) => {
        event.preventDefault();
        setShowDiagnoses((prev) => !prev);
    };

    const addNewEntry = async (event: SyntheticEvent) => {
        event.preventDefault();
        const newEntry = {
            type: entryType,
            date: date ? date.format('YYYY-MM-DD') : '',
            specialist: specialist,
            description: description,
            diagnosisCodes: selectedCodes,
            ...(entryType === EntryType.HealthCheck && {
                healthCheckRating: healthCheckRating,
            }),
            ...(entryType === EntryType.HealthCare && {
                employerName: employerName,
                sickLeave: {
                    startDate: sickLeaveStart
                        ? sickLeaveStart.format('YYYY-MM-DD')
                        : '',
                    endDate: sickLeaveEnd
                        ? sickLeaveEnd.format('YYYY-MM-DD')
                        : '',
                },
            }),
            ...(entryType === EntryType.HospitalEntry && {
                discharge: {
                    date: dischargeDate
                        ? dischargeDate.format('YYYY-MM-DD')
                        : '',
                    criteria: dischargeCriteria,
                },
            }),
        };
        console.log('Send new entry: ', newEntry);
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

    const clearForm = () => {
        setDate(null);
        setDescription('');
        setSpecialist('');
        setSelectedCodes([]);
        setEntryType('');
        setHealthCheckRating(0);
        setEmployerName('');
        setSickLeaveStart(null);
        setSickLeaveEnd(null);
        setDischargeDate(null);
        setDischargeCriteria('');
        setShowDiagnoses(false);
    };

    const handleEntryTypeChange = (event: SelectChangeEvent<EntryType>) => {
        const value = event.target.value as EntryType;
        console.log(value);
        setEntryType(value);
    };

    const handleRatingPick = (event: SelectChangeEvent<number>) => {
        const value = Number(event.target.value);
        setHealthCheckRating(value);
    };

    const renderCommonFields = () => (
        <>
            <TextField
                label="Description"
                variant="standard"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ marginTop: '1rem' }}
            />
            <DatePicker
                sx={{ width: '15rem', marginTop: '1rem' }}
                label="Date"
                value={date}
                onChange={setDate}
            />
            <TextField
                label="Specialist"
                variant="standard"
                sx={{ marginTop: '1rem' }}
                value={specialist}
                onChange={(e) => setSpecialist(e.target.value)}
            />
        </>
    );

    const renderTypeSpecificFields = () => {
        switch (entryType) {
            case EntryType.HealthCheck:
                return (
                    <FormControl sx={{ marginTop: '1rem', width: '15rem' }}>
                        <InputLabel id="healthRating">Health Rating</InputLabel>
                        <Select
                            labelId="healthRating"
                            value={healthCheckRating}
                            label="Health Rating"
                            onChange={handleRatingPick}
                        >
                            <MenuItem value={0}>0 - Healthy</MenuItem>
                            <MenuItem value={1}>1 - Low Risk</MenuItem>
                            <MenuItem value={2}>2 - High Risk</MenuItem>
                            <MenuItem value={3}>3 - Critical Risk</MenuItem>
                        </Select>
                    </FormControl>
                );

            case EntryType.HealthCare:
                return (
                    <>
                        <TextField
                            label="Employer Name"
                            variant="standard"
                            sx={{ marginTop: '1rem' }}
                            value={employerName}
                            onChange={(e) => setEmployerName(e.target.value)}
                        />
                        <DatePicker
                            sx={{ width: '15rem', marginTop: '1rem' }}
                            label="Sick Leave Start"
                            value={sickLeaveStart}
                            onChange={setSickLeaveStart}
                        />
                        <DatePicker
                            sx={{ width: '15rem', marginTop: '1rem' }}
                            label="Sick Leave End"
                            value={sickLeaveEnd}
                            onChange={setSickLeaveEnd}
                        />
                    </>
                );

            case EntryType.HospitalEntry:
                return (
                    <>
                        <DatePicker
                            sx={{ width: '15rem', marginTop: '1rem' }}
                            label="Discharge Date"
                            value={dischargeDate}
                            onChange={setDischargeDate}
                        />
                        <TextField
                            label="Discharge Criteria"
                            variant="standard"
                            sx={{ marginTop: '1rem' }}
                            value={dischargeCriteria}
                            onChange={(e) =>
                                setDischargeCriteria(e.target.value)
                            }
                        />
                    </>
                );

            default:
                return null;
        }
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
                    {entryType && (
                        <>
                            {renderCommonFields()}
                            {renderTypeSpecificFields()}
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
                                            const checked =
                                                selectedCodes.includes(
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
                                                                code !==
                                                                diagnose.code,
                                                        ),
                                                    );
                                                }
                                            };

                                            return (
                                                <ListItem key={diagnose.code}>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={
                                                                    checked
                                                                }
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
                        </>
                    )}
                </form>
            </Box>
        </>
    );
};

export default BaseForm;
