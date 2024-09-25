import styled from 'styled-components';

/* export const MainContainer = styled.div`
  height: 100svh;
  display: flex;
  justify-content: center;
  background: black;
  align-items: center;
  border: 10px solid gb(51 51 48);
  border-radius: 40px;
  margin: 0 auto;
  aspect-ratio: 9/7;
  max-width: 100svw;
`; */

export const TopBar = styled.div`
  height: 50px;
  line-height: 50px;

  & span {
    color: ${({ theme }) => theme.mainTextColor};
    margin-top: 5px;
    margin-left: 23px;
    font-size: 2rem;
  }
`;
