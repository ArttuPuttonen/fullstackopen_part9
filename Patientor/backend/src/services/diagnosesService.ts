import diagnoseData from '../../data/diagnoses';
import { Diagnose } from '../types/types';

const getDiagnoses = (): Diagnose[] => {
    return diagnoseData;
};

export default {
    getDiagnoses
};