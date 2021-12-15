import React, { useRef, useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Form } from "@unform/web";
import * as Yup from "yup";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { ImUser, ImPhone, ImMail4, ImPlus } from "react-icons/im";
import getValidationsErros from "../../../utils/getValidationErrors";
import Input from "../../../components/Input";
import Header from "../../../components/Header";
import api from '../services';
import groupsApi from '../../Group/services';
import AddressForm from "./components/AddressForm";
import TelephoneForm from "./components/TelephoneForm";
import { IAddress, IContact } from "../models";
import { IGroup } from "../../Group/models";

import { Container, StyledButton, Select, ContainerButton, ModalButton } from "./styles";
import Loading from "../../../components/Loading";
import { TableContainer } from "../list/styles";
import { MdDelete, MdModeEditOutline } from "react-icons/md";

const ContactForm: React.FC = () => {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [showAddressModal, setShowAddressModal] = useState<boolean>(false);
  const [showTelephoneModal, setShowTelephoneModal] = useState<boolean>(false);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [group, setGroup] = useState<string>();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [telephones, setTelephones] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editingAddress, setEditingAddress] = useState<number>();
  const [editingTelephone, setEditingTelephone] = useState<number>();

  const handleSubmit = async (values: any) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(
          "O nome é obrigatório"
        ),
        email: Yup.string().required("Preencha o email"),
      });

      await schema.validate(
        values,
        {
          abortEarly: false,
        }
      );
      const data: IContact = {
        name: values.name,
        email: values.email,
        group,
        address: [
          {
            zipcode: values.zipcode,
            street: values.street,
            number: values.number,
            district: values.district,
            state: values.state,
            city: values.city,
          }
        ]
      }
      console.log(telephones)
      if (telephones.length < 1) {
        toast("Informe ao menos 1 número de telefone", { type: "warning" });
        return;
      }
      data.telephone = telephones.map((phone) => phone.replace(/\D/g, ''));
      data.address = addresses;
      if (values.complement && values.complement !== "") {
        data.address[0].complement = values.complement
      }

      setIsLoading(true);
      if (id) {
        await api.putContact(id, data);

        toast("Contato salvo com sucesso", { type: "success" })
        navigate("/contact");
      } else {
        await api.postContact(data);

        toast("Contato salvo com sucesso", { type: "success" })
        navigate("/contact");
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErros(err);

        formRef.current?.setErrors(errors);
      }
    }
    setIsLoading(false);
  }



const renderTooltip = (props: any) => (
  <Tooltip id="button-tooltip" {...props}>
    {props}
  </Tooltip>
);

const getContactInfo = async () => {
  if (id) {
    try {
      const info = await api.getContactById(id);
      setAddresses(info.address.map((address: any) => {
        delete address._id;
        return address;
      }));
      setTelephones(info.telephone);
      setGroup(info.group);
      formRef.current.setFieldValue('name', info.name);
      formRef.current.setFieldValue('email', info.email);
    } catch (error) {
      toast('Erro ao buscar os dados do contato.', { type: "error" });
    }
  };
};

const getGroups = async () => {
  try {
    const data = await groupsApi.getGroups();

    setGroups(data);
    setGroup(data[0]._id);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  getGroups();
  getContactInfo();
}, []);

const handleDeleteAddress = (index: number) => {
  const editableAddresses = addresses;
  editableAddresses.splice(index, 1);
  setAddresses([...editableAddresses]);
}

const handleEditAddress = (index: number) => {
  setEditingAddress(index);
  setShowAddressModal(true);
}

const handleDeletePhone = (index: number) => {
  const editableTelephones = telephones;
  editableTelephones.splice(index, 1);
  setTelephones([...editableTelephones]);
}

const handleEditPhone = (index: number) => {
  setEditingTelephone(index);
  setShowTelephoneModal(true);
}

return (
  <>
    <Header size="small" />
    {isLoading && <Loading />}
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Contato</h1>
        <Input
          icon={ImUser}
          name="name"
          placeholder="Nome"
        />
        <Input
          icon={ImMail4}
          name="email"
          placeholder="E-mail"
        />
        {telephones?.length > 0 && (
          <TableContainer>
            <table>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {telephones.map((telephone, i) => {
                  return (
                    <tr key={i}>
                      <td>{telephone}</td>
                      <div className="buttons">
                        <OverlayTrigger
                          placement="left"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip('Editar')}
                        >
                          <button type="button" onClick={() => handleEditPhone(i)}>
                            <MdModeEditOutline size={28} />
                          </button>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="left"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip('Excluir')}
                        >
                          <button type="button" onClick={() => handleDeletePhone(i)}>
                            <MdDelete size={28} />
                          </button>
                        </OverlayTrigger>
                      </div>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </TableContainer>
        )}
        <ContainerButton className="mt-3">
          <ModalButton
            type="button"
            onClick={() => setShowTelephoneModal(true)}
          >
            Adicionar Telephone
            <ImPlus size={28} />
          </ModalButton>
        </ContainerButton>
        <h3 className="text-dark mt-3">Grupo:</h3>
        <Select name="group" aria-label="Grupo" value={group} onChange={(e: any) => setGroup(e.target.value)}>
          {groups && groups.map((group) => <option value={group._id} key={group._id}>{group.name}</option>)}
        </Select>
        <h3 className="text-dark mt-3">Endereço:</h3>
        {addresses && addresses.length > 0 && <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Rua</th>
                <th>Número</th>
                <th>Bairro</th>
                <th>Cep</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th>Complemento</th>
                <th>Ações</th>
              </tr>
            </thead>
            {addresses.map((address, i) => {
              return (
                <tr key={i}>
                  <td>{address.street}</td>
                  <td>{address.number}</td>
                  <td>{address.district}</td>
                  <td>{address.zipcode}</td>
                  <td>{address.city}</td>
                  <td>{address.state}</td>
                  <td>{address.complement || "N/A"}</td>
                  <div className="buttons">
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip('Editar')}
                    >
                      <button type="button" onClick={() => handleEditAddress(i)}>
                        <MdModeEditOutline size={28} />
                      </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip('Excluir')}
                    >
                      <button type="button" onClick={() => handleDeleteAddress(i)}>
                        <MdDelete size={28} />
                      </button>
                    </OverlayTrigger>
                  </div>
                </tr>
              )
            })}
            <tbody>
            </tbody>
          </table>
        </TableContainer>}
        <ContainerButton>
          <ModalButton
            type="button"
            onClick={() => setShowAddressModal(true)}
          >
            Adicionar Endereço
            <ImPlus size={28} />
          </ModalButton>
        </ContainerButton>
        <StyledButton type="submit">Salvar</StyledButton>
        <StyledButton backButton type="button" onClick={() => navigate('/contact')}>Voltar</StyledButton>
      </Form>

      <TelephoneForm
        showTelephoneModal={showTelephoneModal}
        setShowTelephoneModal={setShowTelephoneModal}
        setTelephones={setTelephones}
        telephones={telephones}
        editingTelephone={editingTelephone}
        setEditingTelephone={setEditingTelephone}
      />

      <AddressForm
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        showAddressModal={showAddressModal}
        setShowAddressModal={setShowAddressModal}
        setAddresses={setAddresses}
        addresses={addresses}
        editingAddress={editingAddress}
        setEditingAddress={setEditingAddress}
      />
    </Container>
  </>
);
};

export default ContactForm;