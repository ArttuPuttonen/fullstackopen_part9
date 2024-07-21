import patients from '../../data/patients';
import { NonSensitivePatient, Patient, NewPatient } from '../types/types';
import { v1 as uuid } from 'uuid';


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

const addPatient = ( entry: NewPatient ): Patient => {
    const id = uuid();
    const newPatient = {
        id,
        ...entry
    };

    patients.push(newPatient);
    return newPatient;
};

const findById = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  findById
};


