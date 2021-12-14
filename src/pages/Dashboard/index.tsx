import React from "react";
import {
  ImUser,
  ImUsers
} from "react-icons/im";

import Header from "../../components/Header";

import { Container, CardContainer, Card, TableContainer } from "./styles";

const users = { 
  name: 'Erica',
  email: 'erica@gmail.com',
  telephone: ['999999934'],
  address: {
    zipcode: '14406525',
    street: 'José Comparini',
    district: 'Derminio',
    state: 'SP',
    city: 'Franca',
    complement: ''
  },
}

const Dashboard: React.FC = () => {

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Contatos</p>
              <ImUser size={28} />
            </header>
          </Card>
          <Card group>
            <header>
              <p>Grupos</p>
              <ImUsers size={28} />
            </header>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome do contato</th>
                <th>Grupo</th>
              </tr>
            </thead>

            <tbody>
              {/* {users.map((user) => (
                <tr key={user.email}>
                  <td className="name">{user.name}</td>
                  <td className={user.email} />
                </tr>
              ))} */}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
