import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

export const Title = styled.div`
  padding-right: 20%;
  text-align: left;
`;

export const SideLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding-left: 3rem;
  padding-top: 1rem;
  font-size: 14px;

  hr {
    color: #4169E1;
    width: 12rem;
    right: 0px;
    border-width: 0.5px;
  }
`;
