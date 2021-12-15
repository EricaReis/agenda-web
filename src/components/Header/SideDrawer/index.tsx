/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useNavigate } from "react-router-dom";

import SidebarLink from "./SidebarLink";
import { FiArrowLeft } from 'react-icons/fi';
import { AuthService } from "../../../pages/Group/services/authService";


import { Container, ContainerLinks, StyledButton } from "./styles";

interface Props {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const sideDrawer: React.FC<Props> = ({  setIsMenuOpen }) => {
  const authService = new AuthService();
  const navigate = useNavigate();

  const signOutUser = async () => {
    await authService.signOut();

    navigate('/');
  };
  return (
    <Container>
      <StyledButton onClick={() => setIsMenuOpen(false)}>
        <FiArrowLeft color="#ffffff" size="30"/>
      </StyledButton>
      <ContainerLinks>
        <SidebarLink title="Contatos" route="/contact" />
        <SidebarLink title="Grupos" route="/group" />
      </ContainerLinks>
      <button className="logout-button" onClick={signOutUser} type="button">
            Sair
      </button>
    </Container>
  );
};
export default sideDrawer;
