import React from 'react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from '../../types';
import { Typography, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
    <Box>
        <Typography>{entry.date} <FavoriteIcon /> {entry.description}</Typography>
        <Typography>Health Rating: {HealthCheckRating[entry.healthCheckRating]}</Typography>
        <Typography>Diagnose by {entry.specialist}</Typography>
    </Box>
);

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
    <Box>
        <Typography>{entry.date} <LocalHospitalIcon /> {entry.description}</Typography>
        <Typography>Discharge: {entry.discharge.date} {entry.discharge.criteria}</Typography>
        <Typography>Diagnose by {entry.specialist}</Typography>
    </Box>
);

const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
    <Box>
        <Typography>{entry.date} <WorkIcon /> {entry.description}</Typography>
        <Typography>Employer: {entry.employerName}</Typography>
        {entry.sickLeave && <Typography>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>}
        <Typography>Diagnose by {entry.specialist}</Typography>
    </Box>
);

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryDetails entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryDetails entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;
