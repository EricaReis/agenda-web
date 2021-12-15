import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../../assets/logo.svg";
import { FiMenu } from 'react-icons/fi';
import { AuthService } from "../../pages/Group/services/authService";
import { Container, StyledButton } from "./styles";
import SideDrawer from "./SideDrawer";

interface HeaderProps {
  size?: "small" | "large";
}

const Header: React.FC<HeaderProps> = ({ size = "large" }: HeaderProps) => {
  const authService = new AuthService();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const signOutUser = async () => {
    await authService.signOut();

    navigate('/');
  };

  return (
    <Container size={size}>
      <header>
        <button className="logo-button" type="button" onClick={() => navigate('/dashboard')}>
          <img src={logoImg} alt="VexContacts" />
        </button>
        <div className="d-md-none">
          <StyledButton type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FiMenu color="#4169E1" size="30"/>
          </StyledButton>
        </div>
        <div className="d-none d-md-block">
          <nav>
            <Link to="/contact">Contatos</Link>
            <Link to="/group">Grupos</Link>
        <button className="logout-button" onClick={signOutUser} type="button">
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
