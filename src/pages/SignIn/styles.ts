import styled, { keyframes } from "styled-components";
import { shade } from "polished";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 700px;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: transalateX(-50px);
  }
  to {
    opacity: 1;
    transform: transalateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      color: #41287b;
    }
  }

  > a {
    color: #41287b;
    display: block;
    margin-top: 24px;
    text-decoration: none;

    display: flex;
    align-items: center;

    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, "#41287b")};
    }

    svg {
      margin-right: 16px;
    }
  }
`;
