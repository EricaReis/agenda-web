import api from '../../../services/api';

const getGroups = async (): Promise<any> => {
  const res = await api.get('/group');
  const { data } = res.data;
  return data;
};

export default {
    getGroups,
};
