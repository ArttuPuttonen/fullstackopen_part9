import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis } from '../../types';
import { getPatient } from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import { Typography, Container, Box } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryDetails from '../EntryDetails';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const fetchedPatient = await getPatient(id);
        setPatient(fetchedPatient);
      };

      fetchPatient();
    }
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

  if (!patient) {
    return <div>Loading...</div>;
  }

  const findDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  return (
    <Container>
      <Typography variant="h4">{patient.name}</Typography>
      {patient.gender === 'male' && <MaleIcon />}
      {patient.gender === 'female' && <FemaleIcon />}
      {patient.gender === 'other' && <TransgenderIcon />}
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Box mt={4}>
        <Typography variant="h6">Entries</Typography>
        {patient.entries.map(entry => (
          <Box key={entry.id} mt={2} p={2} border={1}>
            <EntryDetails entry={entry} />
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>
                    {code} {findDiagnosisName(code)}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default PatientDetailsPage;
