export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  ssn?: string;
  dateOfBirth?: string;
}

export type PatientNoSSN = Omit<Patient, 'ssn'>;