import React, { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import { ImUser, ImPhone, ImMail4 } from "react-icons/im";

import { useToast } from "../../../hooks/toast";
import getValidationsErros from "../../../utils/getValidationErrors";

import Input from "../../../components/Input";
import Header from "../../../components/Header";

import { Container, StyledButton } from "./styles";
import { Button, Modal } from "react-bootstrap";

interface ContactFormData {
  title: string;
  category: string;
  type: "income" | "outcome";
  value: number;
}

const ContactForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [showAdressModal, setShowAdressModal] = useState(false);

  const handleShowAdressModal = () => setShowAdressModal(true);
  const handleClose = () => setShowAdressModal(false);

  const handleSubmit = useCallback(
    async ({ category, title, type, value }: ContactFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          category: Yup.string().required(
            "A categoria da transação é obrigatória"
          ),
          title: Yup.string().required("O titulo da transação é obrigatório"),
          type: Yup.string().required("O tipo da transação é obrigatório"),
          value: Yup.number()
            .positive()
            .required("O valor da transação é obrigatório"),
        });

        await schema.validate(
          { category, title, type, value },
          {
            abortEarly: false,
          }
        );

        // api.post("/contact", { category, title, type, value });

        addToast({
          type: "success",
          title: "Transação incluida com sucesso!",
        });
      } catch (err) {
        if (err instanceof Error) {
          addToast({
            type: "error",
            title: "Erro na transação",
            description: "Confira seu saldo e tente novamente!",
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
          <h1>Novo Contato</h1>
          <Input
            icon={ImUser}
            name="name"
            placeholder="Nome"
          />
          <Input
            icon={ImPhone}
            name="telephone"
            placeholder="Telefone"
          />
          <Input
            icon={ImMail4}
            name="email"
            placeholder="E-mail"
          />
          <button type="button" onClick={() => handleShowAdressModal()}>Adicionar Endereço</button>
          <StyledButton type="submit">Adicionar Contato</StyledButton>
          <StyledButton backButton type="button" onClick={() => navigate('/contact')}>Voltar</StyledButton>
        </Form> 

          <Modal show={showAdressModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <input
            placeholder="Endereço"
          />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Salvar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default ContactForm;