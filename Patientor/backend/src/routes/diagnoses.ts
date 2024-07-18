import express from "express";
import allDiagnoses from "../../data/diagnoses";
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(allDiagnoses);
});

router.post('/', (_req, res) => {
    res.send('Saving a diagnosis!');
});

export default router;