import { useEffect, useState } from 'react';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const { id } = useParams<{ id: string }>();
  const style = { fontSize: 25, fontFamily: 'monospace', marginLeft: '1rem' };

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;
      const data = await patientService.getById(id);
      setPatient(data);
    };
    fetchPatient();
  }, [id]);

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
    </>
  );
};

export default PatientDetails;
