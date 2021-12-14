import styled from 'styled-components';
import { Button } from "react-bootstrap";
import { shade } from 'polished';

interface ButtonProps {
  backButton?: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;

  h1 {
    color: #4169E1;
    font-size: 2rem;
  }

  form {
    width: 80%;
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