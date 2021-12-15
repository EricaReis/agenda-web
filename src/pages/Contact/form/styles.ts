import styled from 'styled-components';
import { Button } from "react-bootstrap";
import { shade } from 'polished';
import { Form } from 'react-bootstrap';

interface ButtonProps {
  backButton?: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-bottom: 1rem;

  h1 {
    color: #4169E1;
    font-size: 2rem;
  }

  form {
    width: 80%;
  }

  h3 {
    padding-top: 1rem;
    color: #4169E1;
    font-size: 1.5rem;
  }
`;

export const StyledButton = styled(Button)`
  background: #4169E1;
  background: ${({ backButton }: ButtonProps): string =>
    backButton ? '#c2c2c2' : '#4169E1'};
  color: #fdfffc;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${shade(0.2, '#4169E1')};
  }
`;

export const TableContainer = styled.section`
  display: flex;
  width: 100%;
  overflow-x: auto;
  align-self: center;

  table {
    width: 100%;
    align-self: center;
    border-spacing: 0 8px;

    th {
      color: #f1e9da;
      font-weight: 700;
      text-align: center;
      font-size: 16px;
      line-height: 24px;
      color: #4169E1;
    }

    tbody {
      background: #e9e7e7;
    }

    td {
      padding: 15px 15px;
      border: 0;
      font-size: 16px;
      font-weight: normal;
      text-align: center;
      color: #000;

      &.title {
        color: #000;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }
   

    .buttons {
      display: flex;
      justify-content: space-around;
    }

    button {
      border: none;
      margin-top: 15px;
      padding: 5px 5px;
      background: transparent;
      color: #4169E1;
      border-radius: 50%;
      transition: 0.5s;
      
    }
    button:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModalButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  flex-direction: column;
  background: #4169E1;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s;
  color: white;

  &:hover {
    background: ${shade(0.2, '#4169E1')};
  }
`
export const Select = styled(Form.Select) `
  background: #efeff4;
  border-radius: 10px;
  border: 2px solid #efeff4;
  padding: 16px;
  width: 100%;
  color: #666360;
`;