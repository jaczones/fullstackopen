import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';


const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses.map(({ code, name, latin}) => ({
    code,
    name,
    latin
  }));
};


export default {
  getDiagnoses
};