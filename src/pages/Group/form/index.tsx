/* eslint-disable no-restricted-globals */
import React, { useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { ImUsers } from "react-icons/im";

import { useToast } from "../../../hooks/toast";
import getValidationsErros from "../../../utils/getValidationErrors";

import Input from "../../../components/Input";
import Header from "../../../components/Header";

import { Container, StyledButton } from "./styles";

interface ContactFormData {
  name: string;
}

const ContactForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { addToast } = useToast();


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

        // api.post("/group", { name });

        addToast({
          type: "success",
          title: "Grupo adicionado com sucesso!",
        });
      } catch (err) {
        if (err instanceof Error) {
          addToast({
            type: "error",
            title: "Erro na criação do grupo",
          });
        }

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [addToast]
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Grupo</h1>
          <Input
            icon={ImUsers}
            name="name"
            placeholder="Nome do grupo"
          />
          <StyledButton type="submit">Adicionar Grupo</StyledButton>
          <StyledButton backButton type="button" onClick={() => navigate('/group')}>Voltar</StyledButton>
        </Form>
      </Container>
    </>
  );
};

export default ContactForm;