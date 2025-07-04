import axios from 'axios';
import { NewEntry, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
    const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

    return data;
};

const create = async (object: PatientFormValues) => {
    const { data } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        object,
    );

    return data;
};

const getById = async (id: string) => {
    const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
    return data;
};

const addEntry = async (id: string, entry: NewEntry) => {
    console.log(entry);
    const { data } = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry,
    );
    console.log('data: ', data);
    return data;
};

export default {
    getAll,
    create,
    getById,
    addEntry,
};
