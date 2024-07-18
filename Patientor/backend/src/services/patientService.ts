import patients from '../../data/patients';
import { NonSensitivePatient, Patient } from '../types/types';

const getPatients = (): Patient[] => {
    return patients;
    }


const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

export default {
  getPatients,
  getNonSensitivePatients

};


