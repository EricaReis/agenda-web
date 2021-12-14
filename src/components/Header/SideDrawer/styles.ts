import styled from "styled-components";
import { Button } from "react-bootstrap";

export const Container = styled.div`
  position: absolute;
  position: fixed;
  top: 0px;
  box-shadow: 5px 10px 20px rgba(0, 0, 0, 1);
  right: 0;
  height: 100%;
  width: 60%;
  z-index: 1;
  background: #4169E1;
  z-index: 999;

      .logout-button {
        margin-left: 32px;
        margin-top: 32px;
        padding: 16px;
        font-size: 16px;
        color: #000;
        background: #fff;
        border: none;
        border-radius: 8px;
      }
`;

export const ContainerLinks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  a {
    font-size: 1.5rem;
    font-weight: 700;
  }

  hr {
    color: white;
  }
`;

export const StyledButton = styled(Button)`
    border: none;
    background: transparent;
`;