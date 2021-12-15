/* eslint-disable import/no-anonymous-default-export */
import api from '../../../services/api';

const getContacts = async (): Promise<any> => {
  const res = await api.get('/contact');
  return res.data.data;
};

const getContactById = async (idContact: string): Promise<any> => {
  const res = await api.get(`/contact/${idContact}`);
  return res.data.data;
};

const postContact = async (data: any): Promise<any> => {
  const res = await api.post('/contact', data);
  return res;
};

const deleteContact = async (idContact?: string): Promise<any> => {
  if (idContact){
    const res = await api.delete(`/contact/${idContact}`);
    console.log(res)
    return res;
  }
};

const putContact = async (idContact: string, data: any): Promise<any> => {
  const res = await api.put(`/contact/${idContact}`, data);
  console.log(res)
  return res;
};

const buscaCep = async (value: string): Promise<any | void> => {
  const validate = /^[0-9]{8}$/;
  if (value === '' || !validate.test(value)) return;

  const res = await fetch(`https://viacep.com.br/ws/${value}/json/`);
  return res.json();
}

export default {
    getContacts,
    postContact,
    deleteContact,
    getContactById,
    putContact,
    buscaCep
};
