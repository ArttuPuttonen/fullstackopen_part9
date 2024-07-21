import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Patient, Entry } from '../../types';
import { getPatient } from '../../services/patients';
import { Typography, Button, Container, Box } from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const fetchedPatient = await getPatient(id);
        setPatient(fetchedPatient);
      };

      fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

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
        {patient.entries.map((entry: Entry) => (
          <Box key={entry.id} mt={2} p={2} border={1}>
            <Typography variant="subtitle1">{entry.date}</Typography>
            <Typography variant="body1">{entry.description}</Typography>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>{code}</li>
                ))}
              </ul>
            )}
          </Box>
        ))}
      </Box>
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>
    </Container>
  );
};

export default PatientDetailsPage;
