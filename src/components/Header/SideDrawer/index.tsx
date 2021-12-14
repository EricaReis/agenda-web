/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import SidebarLink from "./SidebarLink";
import { useAuth } from "../../../hooks/auth";
import { FiArrowLeft } from 'react-icons/fi';


import { Container, ContainerLinks, StyledButton } from "./styles";

interface Props {
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

const sideDrawer: React.FC<Props> = ({  setIsMenuOpen }) => {
  const { signOut } = useAuth();
  return (
    <Container>
      <StyledButton onClick={() => setIsMenuOpen(false)}>
        <FiArrowLeft color="#ffffff" size="30"/>
      </StyledButton>
      <ContainerLinks>
        <SidebarLink title="Contatos" route="/contact" />
        <SidebarLink title="Grupos" route="/group" />
      </ContainerLinks>
      <button className="logout-button" onClick={signOut} type="button">
            Sair
      </button>
    </Container>
  );
};
export default sideDrawer;
