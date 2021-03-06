import React, { useEffect } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from "react-icons/fi";

import { useToast, ToastMessage } from "../../../hooks/toast";

import { Container } from "./styles";

interface ToastProps {
  message: ToastMessage;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      type={message.type}
      hasdescription={Number(!!message.description)}
    >
      {icons[message.type || "info"]}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}

        <button type="button" onClick={() => removeToast(message.id)}>
          <FiXCircle size={20} />
        </button>
      </div>
    </Container>
  );
};

export default Toast;
