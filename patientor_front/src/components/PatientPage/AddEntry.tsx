import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { SyntheticEvent, useState } from 'react';

const AddEntry = () => {
    const [entryType, setEntryType] = useState(undefined);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    });
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] = useState(1);
    const [diagnosisCodes, setDiagnosisCodes] = useState(undefined);

    const addNewEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        console.log(event.target);
    };

    return (
        <>
            <Box sx={{ borderStyle: 'dotted', borderRadius: '10px' }}>
                <form onSubmit={addNewEntry} style={{ padding: '1rem' }}>
                    <h3>New Entry</h3>

                    <TextField
                        id="standard-basic"
                        label="Description"
                        variant="standard"
                    />
                </form>
            </Box>
        </>
    );
};

export default AddEntry;
