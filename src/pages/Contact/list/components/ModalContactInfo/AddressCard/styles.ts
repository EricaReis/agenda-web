import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
`;

export const Card = styled.div`
  display: flex;
  width: 90%;
  padding: 1rem;
  flex-direction: column;
  margin-bottom: 1rem;
  align-self: center;
  background: #e9e7e7;
  border-radius: 5px;
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: row;

  span {
      margin-right: 10px;
  }
`;