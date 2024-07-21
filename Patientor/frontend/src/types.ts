export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export interface Diagnose {
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
  diagnosisCodes?: Array<Diagnose['code']>;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;