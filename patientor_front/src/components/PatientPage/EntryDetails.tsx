import Box from '@mui/material/Box';
import MedicalInformationTwoToneIcon from '@mui/icons-material/MedicalInformationTwoTone';
import LocalHospitalTwoToneIcon from '@mui/icons-material/LocalHospitalTwoTone';
import FactCheckTwoToneIcon from '@mui/icons-material/FactCheckTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';

import { Diagnose, Entry } from '../../types';

type Props = {
  entry: Entry;
  diagnoses?: Diagnose[];
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  return (
    <>
      <Box
        component="section"
        sx={{
          p: 2,
          border: '2px solid blue',
          borderRadius: '15px',
          bgcolor: 'lightcyan',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <p>{entry.date}</p>
          {(() => {
            switch (entry.type) {
              case 'Hospital':
                return <LocalHospitalTwoToneIcon sx={{ color: 'red' }} />;
              case 'OccupationalHealthcare':
                return <MedicalInformationTwoToneIcon sx={{ color: 'blue' }} />;
              case 'HealthCheck':
                return <FactCheckTwoToneIcon sx={{ color: 'lightgreen' }} />;
              default:
                return null;
            }
          })()}
          {entry.type === 'OccupationalHealthcare' && <p style={{fontWeight: 'bold', marginLeft: '1rem'}}>{entry.employerName}</p>}
        </div>
        <p>{entry.description}</p>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <ul>
            {entry.diagnosisCodes?.map((code) => {
              const diagnosis = diagnoses?.find((d) => d.code === code);
              return (
                <li key={code}>
                  {code}: {diagnosis?.name}
                </li>
              );
            })}
          </ul>
        )}
        {entry.type === 'HealthCheck' && (
          <>
            {entry.healthCheckRating === 0 && (
              <FavoriteTwoToneIcon sx={{ color: 'lightgreen' }} />
            )}
            {entry.healthCheckRating === 1 && (
              <FavoriteTwoToneIcon sx={{ color: 'orange' }} />
            )}
            {entry.healthCheckRating === 2 && (
              <FavoriteTwoToneIcon sx={{ color: 'red' }} />
            )}
            {entry.healthCheckRating === 3 && (
              <FavoriteTwoToneIcon sx={{ color: 'darkred' }} />
            )}
          </>
        )}
        <p>diagnose by {entry.specialist}</p>
      </Box>
    </>
  );
};

export default EntryDetails;
