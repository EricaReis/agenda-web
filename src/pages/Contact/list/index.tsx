import React from "react";

import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import {
  ImUserPlus
} from "react-icons/im";

import { Container, TableContainer, FabButton } from "./styles";

const Contact: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header size="small" />
      <Container>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome do contato</th>
                <th>Grupo</th>
              </tr>
            </thead>

            <tbody>
              {/* {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === "outcome"
                      ? ` - ${transaction.formattedValue}`
                      : transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </TableContainer>
        <FabButton onClick={() => navigate('/contact/form')}>
          <ImUserPlus size={28} />
        </FabButton>
      </Container>
    </>
  );
};

export default Contact;
