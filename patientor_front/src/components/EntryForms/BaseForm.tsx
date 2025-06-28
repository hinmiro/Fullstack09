import React, { useState, SyntheticEvent } from 'react';
import { Dayjs } from 'dayjs';

// Mui imports
import { DatePicker } from '@mui/x-date-pickers';
import {
    FormControl,
    List,
    FormControlLabel,
    ListItem,
    Checkbox,
    Button,
    TextField,
    Box,
} from '@mui/material';

// Type imports
import { Diagnose } from '../../types';

interface Props {
    id: string;
    diagnoses: Diagnose[];
}

const BaseForm = ({ id, diagnoses }: Props) => {
    const [date, setDate] = useState<Dayjs | null>(null);
    const [specialist, setSpecialist] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
    const [showDiagnoses, setShowDiagnoses] = useState(false);

    const handleCodeState = (event: SyntheticEvent) => {
        event.preventDefault();
        setShowDiagnoses((prev) => !prev);
    };

    const addNewEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log('Send new entry');  
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
                    <TextField
                        id="standard-basic"
                        label="Description"
                        variant="standard"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
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
                </form>
            </Box>
        </>
    );
};

export default BaseForm;
