export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
  }
  
  export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
  }
  
  export interface Entry {
    id: string;
    date: string;
    type: string;
    specialist: string;
    description: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
  }
  
  export interface Patient {
    id: string;
    name: string;
    occupation: string;
    gender: Gender;
    ssn?: string;
    dateOfBirth?: string;
    entries: Entry[];
  }

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;


