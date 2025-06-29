import React, {useState} from 'react';

// Mui imports
import { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, MenuItem, InputLabel, Select } from '@mui/material';

const HealthCheckForm = () => {
    const [healthCheckRating, setHealthCheckRating] = useState(0);

    const handleRatingPick = (event: SelectChangeEvent<number>) => {
        const value = Number(event.target.value);
        setHealthCheckRating(value);
    };

    return (
        <>
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
        </>
    );
};

export default HealthCheckForm;
