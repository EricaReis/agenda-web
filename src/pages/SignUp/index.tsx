import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import * as Yup from "yup";
import getValidationsErros from "../../utils/getValidationErrors";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";
import logoImg from "../../assets/logo.svg";

import { Container, AnimationContainer, Content } from "./styles";

import Button from "../../components/Button";
import Input from "../../components/Input";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async ({ name, email, password }: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
          password: Yup.string().min(6, "No minimo 6 digitos"),
        });

        await schema.validate(
          { name, email, password },
          {
            abortEarly: false,
          }
        );

        await api.post("/users", { name, email, password });

        addToast({
          type: "success",
          title: "Cadastro realizado com sucesso!",
          description: "Você já pode fazer o seu logon no VexContacts!",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: "error",
          title: "Erro na criação do usuário",
          description: "Ocorreu um erro, cheque seus dados!",
        });
      }
    },
    [addToast]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="VexContacts" width={250} />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome completo" />
            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="E-mail"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
