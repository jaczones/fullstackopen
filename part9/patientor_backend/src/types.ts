export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export type PatientNoSSN = Omit<Patient, 'ssn'>;

export type newPatient = Omit<Patient, 'id'>;

export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}