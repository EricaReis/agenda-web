import styled from 'styled-components';
import { Button } from "react-bootstrap";

export const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
`;

export const TableContainer = styled.section`
  margin-top: 64px;
  overflow-x: auto;

  table {
    width: 100%;
    border-spacing: 0 8px;

    th {
      color: #f1e9da;
      font-weight: normal;
      padding: 20px 32px;
      text-align: center;
      font-size: 16px;
      line-height: 24px;
      color: #000000;
    }

    td {
      padding: 20px 32px;
      border: 0;
      background: #020100;
      font-size: 16px;
      font-weight: normal;
      text-align: center;
      color: #f1e9da;

      &.title {
        color: #41287b;
      }

      &.income {
        color: #12a454;
      }

      &.outcome {
        color: #e83f5b;
      }
    }
    td:first-child {
      border-radius: 8px 0 0 8px;
    }
    td:last-child {
      border-radius: 0 8px 8px 0;
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
`;