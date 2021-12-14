/* eslint-disable no-restricted-globals */
import React, { useRef, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from 'react-toastify';

import { ImUsers } from "react-icons/im";

import getValidationsErros from "../../../utils/getValidationErrors";

import Input from "../../../components/Input";
import Header from "../../../components/Header";
import { IGroup } from '../models';
import { Container, StyledButton } from "./styles";

import api from '../services/index';

interface ContactFormData {
  name: string;
}

const ContactForm: React.FC = () => {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [ groupId, setGroupId] = useState<string>();
  const [ name, setName] = useState<string>();

  const handleSubmit = useCallback(
    async ({ name }: ContactFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required(
            "O nome do grupo é obrigatório"
          ),
        });

        await schema.validate(
          { name },
          {
            abortEarly: false,
          }
        );

        const groupData = {
          name: name
        }

        console.log('id do grupo', id);

        if (id) {
          try {
            await api.putGroup(id, groupData);
            toast('Grupo editado com sucesso!', { type: "success"});
          } catch (error) {
            toast('Houve um erro ao editar o grupo.', { type: "error"});
          }
        } else {
          try {
            await api.postGroups(groupData);
            toast('Grupo adicionado com sucesso!', { type: "success"});
          } catch (error) {
            toast('Houve um erro ao criar o grupo.', { type: "error"});
          }
        }

        navigate('/group');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    []
  );

  const getGroupInfo = async (id: string) => {
    if (id && id !== 'form') {
      try {
          const info = await api.getGroupById(id);
          setName(info.name);
          setGroupId(id);
      } catch (error) {
        toast('Erro ao buscar os dados do grupo.', { type: "error"});
      }
    }
  }

  const getGroup = () => {
    const urlParams = window.location.pathname;
    const groupIdParam = urlParams.substring(urlParams.lastIndexOf('/') + 1);
    setGroupId(groupIdParam);
    getGroupInfo(groupIdParam);
  };

  useEffect(() => {
    console.log(id);
    getGroup();
  }, []);
  
  return (
    <>
      <Header size="small" />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          {id ? (<h1>Novo Grupo</h1>) : (<h1>Editar Grupo</h1>) }
          <Input
            icon={ImUsers}
            name="name"
            placeholder="Nome do grupo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <StyledButton type="submit">Salvar Grupo</StyledButton>
          <StyledButton backButton type="button" onClick={() => navigate('/group')}>Voltar</StyledButton>
        </Form>
      </Container>
    </>
  );
};

export default ContactForm;