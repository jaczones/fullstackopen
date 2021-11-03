import patients from '../../data/patients';
import { Patient, PatientNoSSN } from '../types';


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


export default {
  getPatients,
  getPatientsNoSSN
};