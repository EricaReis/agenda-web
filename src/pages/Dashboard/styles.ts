import styled from 'styled-components';
import { shade } from 'polished';

interface CardProps {
  group?: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 32px;
  margin-top: -150px;

  button {
    border: none;
  }
`;

export const Card = styled.div`
  background: ${({ group }: CardProps): string =>
    group ? '#4169E1' : '#FFFAFA'};
  padding: 22px 32px;
  border: 1px solid #4169E1;
  border-radius: 5px;
  color: ${({ group }: CardProps): string => (group ? '#F1E9DA' : '#000000')};
  transition: 0.5s;

  :hover {
    background: ${({ group }: CardProps): string => (group ? shade(0.2, '#4169E1') : shade(0.2, '#FFFAFA'))};
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 16px;
    }
  }

  h1 {
    margin-top: 14px;
    font-size: 36px;
    font-weight: normal;
    line-height: 54px;
  }
`;
