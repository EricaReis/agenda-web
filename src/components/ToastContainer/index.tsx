import React from "react";
import Toast from "./Toast";

import { ToastMessage } from "../../hooks/toast";
import { Container } from "./styles";

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message, index, props) => (
        <Toast key={index} message={message} />
      ))}
    </Container>
  );
};

export default ToastContainer;
