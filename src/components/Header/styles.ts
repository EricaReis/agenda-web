import styled from 'styled-components';
import { Button } from "react-bootstrap";

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  padding: 30px 0;

  .logo-button {
    border: none;
    background: transparent;
  }

  header {
    width: 100%;
    max-width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 200px;
    }

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      nav {
        a {
          color: 	#000000;
          text-decoration: none;
          font-size: 16px;
          transition: opacity 0.2s;

          & + a {
            margin-left: 32px;
          }

          &:hover {
            opacity: 0.9;
            border-bottom: 2px solid #41287b;
            padding-bottom: 10px;
          }
        }
      }

      .logout-button {
        margin-left: 32px;
        padding: 16px;
        font-size: 16px;
        color: #fff;
        background: #4169E1;
        border: none;
        border-radius: 8px;
      }
    }
  }
`;

export const StyledButton = styled(Button)`
    border: none;
    background: transparent;

    :hover {
      background: #D3D3D3;
    }
`;