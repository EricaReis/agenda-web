import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


import Header from "../../../components/Header";
import {
  MdGroupAdd, 
  MdModeEditOutline,
  MdDelete,
} from "react-icons/md";

import { IGroup } from '../models';

import api from '../services';

import { Container, TableContainer, FabButton } from "./styles";

const Group: React.FC = () => {
  const navigate = useNavigate();
  const [ groups, setGroups ] = useState<IGroup[]>();

  const getGroupsInfo = async () => {
    const groupsInfo = await api.getGroups();
    setGroups(groupsInfo);
  };

  const handleDeleteGroup = (index: any) => {
    console.log(index);
    try {
      if ( groups ) {
        console.log(groups[index]._id)
        api.deleteGroup(groups[index]._id);

        toast('Grupo excluído com sucesso!', { type: "success"});
      }

      getGroupsInfo();
    } catch (error) {
      console.log(error);
      toast('Erro ao excluir o grupo.', { type: "error"});
    }
    return index;
  };

  const handleEditGroup = (index: any): void => {
     if ( groups ) {
      navigate(`/group/form/${groups[index]._id}`);
     }
  };

  useEffect(() => {
    getGroupsInfo();
  }, []);

  return (
      <Container>
      <Header size="small" />
        <h1>Grupos</h1>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Grupo</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {groups && groups.map((group, i) => (
                <tr key={group.name}>
                  <td className="title">{group.name}</td>
                  <div className="buttons">
                    <button type="button" onClick={() => handleEditGroup(i)}>
                      <MdModeEditOutline size={28} />
                    </button>
                    <button type="button" onClick={() => handleDeleteGroup(i)}>
                      <MdDelete size={28} />
                    </button>
                  </div>
                </tr>
              ))} 
            </tbody>
          </table>
        </TableContainer>
        <FabButton onClick={() => navigate('/group/form')}>
          <MdGroupAdd size={28} />
        </FabButton>
      </Container>
  );
};

export default Group;
