import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";

import {toast } from 'react-toastify';
import getValidationsErros from "../../utils/getValidationErrors";

import logoImg from "../../assets/logo.svg";

import Button from "../../components/Button";
import Input from "../../components/Input";
import Loading from '../../components/Loading';

import { Container, AnimationContainer, Content } from "./styles";
import { AuthService } from "../Group/services/authService";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const authService = new AuthService()
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required("Email obrigatório")
            .email("Digite um email válido"),
          password: Yup.string().min(6, "No minimo 6 digitos"),
        });

        await schema.validate(
          { email, password },
          {
            abortEarly: false,
          }
        );
        
        setIsLoading(true);

        await authService.login(email, password)

        toast('Bem vindo(a) ao VexContacts!', { type: "success"})

        navigate('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErros(err);

          formRef.current?.setErrors(errors);

          return;
        }
        setIsLoading(false);
      }
    },
    []
  );

  return (
    <Container>
      {isLoading && <Loading />}
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="VexContacts" width={250} />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Insira seu Login</h1>
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

            <Button type="submit">Entrar</Button>
          </Form>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignIn;
