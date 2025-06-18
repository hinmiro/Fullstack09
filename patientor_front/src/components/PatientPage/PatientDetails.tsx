import { useEffect, useState } from 'react';
import { Diagnose, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import EntryDetails from './EntryDetails';

interface Props {
  diagnoses: Diagnose[];
}

const PatientDetails = (props: Props) => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [diagnoses, setDiagnoses] = useState<Diagnose[] | []>([]);
  const { id } = useParams<{ id: string }>();
  const style = { fontSize: 25, fontFamily: 'monospace', marginLeft: '1rem' };

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const data = await patientService.getById(id);
      setPatient(data);
    };
    fetchPatient();
    setDiagnoses(props.diagnoses);
  }, [id, props.diagnoses]);

  if (!patient) return <div>Patient not found</div>;

  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '5rem',
          }}
        >
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            {patient.name}{' '}
            {patient.gender === 'male' ? (
              <p style={style}>♂</p>
            ) : (
              <p style={style}>♀</p>
            )}
          </h2>
        </div>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <div>
        <h2>Entries</h2>
        {patient.entries.length === 0 ? (
          <p>Patient has no entries yet...</p>
        ) : (
          <div>
            {patient.entries.map((e) => (
              <div key={e.id}>
                <EntryDetails entry={e} diagnoses={diagnoses} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PatientDetails;
