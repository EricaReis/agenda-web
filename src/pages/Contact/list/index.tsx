import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import {
  MdModeEditOutline,
  MdDelete,
  MdInfo,
} from "react-icons/md";
import {
  ImUserPlus
} from "react-icons/im";

import Header from "../../../components/Header";
import { IContact } from '../models';
import api from "../services";
import Loading from "../../../components/Loading";
import ModalContactInfo from "./components/ModalContactInfo";

import { Container, TableContainer, FabButton, SearchBarContainer } from "./styles";
import SearchBar from "./components/SearchBar";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [contactInfo, setContactInfo] = useState<any>()
  const [showContactInfoModal, setShowContactInfoModal] = useState<boolean>(false);

  const getContactInfo = async () => {
    setIsLoading(true);
    try {
      const contactInfo = await api.getContacts();

      setContacts(contactInfo);
    } catch (error) {
      toast("Erro ao buscar os dados!", { type: "error" });
    }
    setIsLoading(false);
  };

  const handleDeleteContact = async (index: any) => {
    try {
      if (contacts) {
        await api.deleteContact(contacts[index]._id);

        toast('Contato excluído com sucesso!', { type: "success"});
        const editableContacts = contacts;
        editableContacts.splice(index, 1);
        setContacts([...editableContacts]);
      }
      getContactInfo();
    } catch (error) {
      console.log(error);
      toast('Erro ao excluir o contato.', { type: "error"});
    }
  };

  const handleEditContact = (index: any): void => {
    if ( contacts ) {
     navigate(`/contact/form/${contacts[index]._id}`);
    }
 };

 const handleOpenContactInfoModal = (index: any) => {
    if ( contacts ) {
      setContactInfo(contacts[index]);
      setShowContactInfoModal(true);
    }
 }

 const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    {props}
  </Tooltip>
);

  useEffect(() => {
    getContactInfo();
  }, [])

  return (
    <>
      <Header size="small" />
      {isLoading && <Loading /> }
      <Container>
            <SearchBarContainer>
              <SearchBar
                search={search}
                setSearch={setSearch}
                />
            </SearchBarContainer>
            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Grupo</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {contacts && contacts.filter((contact) => contact.name.toLowerCase().includes(search.toLowerCase())).map((contact, i) => (
                    <tr key={contact._id}>
                      <td>{contact.name}</td>
                      <td>{contact.group}</td>
                      <td>{contact.telephone}</td>
                      <td>{contact.email}</td>
                      <div className="buttons">
                          <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip('Informações')}
                          >
                            <button type="button" onClick={() => handleOpenContactInfoModal(i)}>
                              <MdInfo size={28} />
                            </button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip('Editar')}
                          >
                            <button type="button" onClick={() => handleEditContact(i)}>
                              <MdModeEditOutline size={28} />
                            </button>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip('Excluir')}
                          >
                            <button type="button" onClick={() => handleDeleteContact(i)}>
                              <MdDelete size={28} />
                            </button>
                          </OverlayTrigger>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableContainer>

              <ModalContactInfo
                  showContactInfoModal={showContactInfoModal}
                  setShowContactInfoModal={setShowContactInfoModal}
                  infos={contactInfo}
              />
        <FabButton onClick={() => navigate('/contact/form')}>
          <ImUserPlus size={28} />
        </FabButton>
      </Container>
    </>
  );
};

export default Contact;
