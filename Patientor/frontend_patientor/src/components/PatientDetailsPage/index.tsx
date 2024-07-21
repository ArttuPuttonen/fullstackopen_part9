import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Patient } from '../../types';
import { getPatient }  from '../../services/patients';
import { Typography, Button, Container } from '@mui/material';
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
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
      </Container>
    );
  };
  
  export default PatientDetailsPage;