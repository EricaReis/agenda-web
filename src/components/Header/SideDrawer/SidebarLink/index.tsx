import React from "react";

import { SideLink, Container, Title } from "./styles";

interface Props {
  route: string;
  title: string;
}

const SidebarLink: React.FC<Props> = ({ route, title }) => {
  return (
    <Container>
      <SideLink to={route}>
        <Title>{title}</Title>
        <hr />
      </SideLink>
    </Container>
  );
};

export default SidebarLink;
