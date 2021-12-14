import React, { useState } from "react";

import { Link } from "react-router-dom";

import logoImg from "../../assets/logo.svg";

import { useAuth } from "../../hooks/auth";
import { FiMenu } from 'react-icons/fi';

import { Container, StyledButton } from "./styles";
import SideDrawer from "./SideDrawer";

interface HeaderProps {
  size?: "small" | "large";
}

const Header: React.FC<HeaderProps> = ({ size = "large" }: HeaderProps) => {
  const { signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container size={size}>
      <header>
        <img src={logoImg} alt="VexContacts" />
        <div className="d-md-none">
          <StyledButton type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FiMenu color="#4169E1" size="30"/>
          </StyledButton>
        </div>
        <div className="d-none d-md-block">
          <nav>
            <Link to="/contact">Contatos</Link>
            <Link to="/group">Grupos</Link>
        <button className="logout-button" onClick={signOut} type="button">
            Sair
        </button>
          </nav>
        </div>
      </header>
        {isMenuOpen && (
          <SideDrawer setIsMenuOpen={setIsMenuOpen} />
        )}
    </Container>
  );
};

export default Header;
