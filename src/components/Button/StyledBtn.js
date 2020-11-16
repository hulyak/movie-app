import styled from 'styled-components';

export const Wrapper = styled.button`
  display: block;
  background: var(--darkGrey);
  min-width: 200px;
  height: 60px;
  color: var(--white);
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 30px;
  border: 0;
  font-size: var(--fontBig);
  max-width: 1280px;
  margin: 20px auto;
  outline: none;

  :hover {
    opacity: 0.8;
  }
`;
