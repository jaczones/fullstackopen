/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from '../../data/patients';
import { Patient, PatientNoSSN, newPatient } from '../types';
import {v1 as uuid} from 'uuid';
const id = uuid();

const getPatients = (): Patient[] => {
    return patients;
  };


  const getPatientsNoSSN = (): PatientNoSSN [] => {
    return patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
      id,
      name,
      occupation,
      gender,
      dateOfBirth
    }));
  };

  const addPatient = ( entry: newPatient): Patient => {
      const newPatient = {
        id: id,
        ...entry
      };
      patients.push(newPatient);
      return newPatient;
    };



export default {
  getPatients,
  getPatientsNoSSN,
  addPatient
};