import express from 'express';
import getDiagnoses from '../services/diagnoseService';


const router = express.Router();

router.get('/', (_req, res) => {
  res.send(getDiagnoses.getDiagnoses());
});


export default router;