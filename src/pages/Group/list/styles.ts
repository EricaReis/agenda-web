import styled from 'styled-components';
import { Button } from "react-bootstrap";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TableContainer = styled.section`
  display: flex;
  width: 100%;
  margin-top: 64px;
  overflow-x: auto;
  justify-content: center;

  table {
    width: 90%;
    border-spacing: 0 8px;

    th {
      color: #f1e9da;
      font-weight: 700;
      padding: 20px 32px;
      text-align: center;
      font-size: 16px;
      line-height: 24px;
      color: #4169E1;
    }

    tbody {
      background: #e9e7e7;
    }

    td {
      padding: 20px 32px;
      border: 0;
      font-size: 16px;
      font-weight: normal;
      text-align: center;
      color: #f1e9da;

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

export const FabButton = styled(Button)`
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background: #4169E1;
`;