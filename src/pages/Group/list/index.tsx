import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import {
  MdGroupAdd, 
  MdModeEditOutline,
  MdDelete,
} from "react-icons/md";

import Header from "../../../components/Header";
import { IGroup } from '../models';
import { Container, TableContainer, FabButton } from "./styles";
import api from '../services';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Loading from "../../../components/Loading";

const Group: React.FC = () => {
  const navigate = useNavigate();
  const [ groups, setGroups ] = useState<IGroup[]>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const getGroupsInfo = async () => {
    try {
      setIsLoading(true);
      const groupsInfo = await api.getGroups();
      setGroups(groupsInfo);
      
    } catch (error) {
      toast('Erro ao carregar grupos!', { type: "error"});
    }
    setIsLoading(false);
  };

  const handleDeleteGroup = (index: any) => {
    try {
      if ( groups ) {
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

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {props}
    </Tooltip>
  );

  return (
      <Container>
      {isLoading && <Loading />}
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
                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip('Editar')}
                  >
                    <button type="button" onClick={() => handleEditGroup(i)}>
                      <MdModeEditOutline size={28} />
                    </button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip('Excluir')}
                  >
                    <button type="button" onClick={() => handleDeleteGroup(i)}>
                      <MdDelete size={28} />
                    </button>
                  </OverlayTrigger>
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
