/* eslint-disable no-restricted-globals */
import React, { useRef, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { Form } from "@unform/web";
import * as Yup from "yup";
import { ImUsers } from "react-icons/im";

import Input from "../../../components/Input";
import getValidationsErros from "../../../utils/getValidationErrors";
import Header from "../../../components/Header";
import { Container, StyledButton } from "./styles";

import api from '../services/index';
import Loading from "../../../components/Loading";

interface ContactFormData {
  name: string;
}

const ContactForm: React.FC = () => {
  const formRef = useRef<any>(null);
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const [ name, setName] = useState<string>();
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

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

        setIsLoading(true);
        if (id) {
          await api.putGroup(id, groupData);
          toast('Grupo editado com sucesso!', { type: "success"});
        } else {
          await api.postGroups(groupData);
          toast('Grupo adicionado com sucesso!', { type: "success"});
        }

        navigate('/group');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);
        }
        toast("Erro ao salvar os dados!", { type: "error"});
      }
      setIsLoading(false);
    },
    []
  );


  const getGroupInfo = async () => {
    if (id) {
      try {
        setIsLoading(true)
        const info = await api.getGroupById(id);
        setName(info.name);
      } catch (error) {
        toast('Erro ao buscar os dados do grupo.', { type: "error"});
      }
      setIsLoading(false);
    };
  };

  useEffect(() => {
    getGroupInfo();
  }, []);
  
  return (
    <>
      <Header size="small" />
      {isLoading && <Loading />}
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