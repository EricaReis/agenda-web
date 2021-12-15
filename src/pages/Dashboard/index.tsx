import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ImUser,
  ImUsers
} from "react-icons/im";

import Header from "../../components/Header";
import { Container, CardContainer, Card } from "./styles";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <button type="button" onClick={() => navigate('/contact')}>
            <Card>
              <header>
                <p>Contatos</p>
                <ImUser size={28} />
              </header>
            </Card>
          </button>
          <button type="button" onClick={() => navigate('/group')}>
            <Card group>
              <header>
                <p>Grupos</p>
                <ImUsers size={28} />
              </header>
            </Card>
          </button>
        </CardContainer>
      </Container>
    </>
  );
};

export default Dashboard;
