/* eslint-disable import/no-anonymous-default-export */
import api from '../../../services/api';

const getGroups = async (): Promise<any> => {
  const res = await api.get('/group');
  return res.data.data;
};

const getGroupById = async (idGroup: string): Promise<any> => {
  const res = await api.get(`/group/${idGroup}`);
  return res.data.data;
};

const postGroups = async (name: any): Promise<any> => {
  const res = await api.post('/group', name);
  return res;
};

const deleteGroup = async (idGroup: string): Promise<any> => {
  const res = await api.delete(`/group/${idGroup}`);
  console.log(res)
  return res;
};

const putGroup = async (idGroup: string, name: any): Promise<any> => {
  const res = await api.put(`/group/${idGroup}`, name);
  console.log(res)
  return res;
};

export default {
    getGroups,
    postGroups,
    deleteGroup,
    getGroupById,
    putGroup
};
