import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Header from "../../../components/Header";
import {
  MdGroupAdd, 
  MdModeEditOutline,
  MdDelete,
} from "react-icons/md";

import api from '../services';

import { Container, TableContainer, FabButton } from "./styles";

const groups = 
[
  {
    name: 'Emergência',
  },
  {
    name: 'Família',
  },
  {
    name: 'Amigos',
  }
];

const Group: React.FC = () => {
  const navigate = useNavigate();

  const getGroupsInfo = async () => {
    await api.getGroups();
  }

  useEffect(() => {
    getGroupsInfo()
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
              {groups.map((group) => (
                <tr key={group.name}>
                  <td className="title">{group.name}</td>
                  <div className="buttons">
                    <button>
                      <MdModeEditOutline size={28} />
                    </button>
                    <button>
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
