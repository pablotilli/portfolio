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

export const SystemNavigationbar = styled.div`
  width: 100%;
  height: 6svh;
  position: absolute;

  bottom: 0;
  padding: 0 10px;

  display: flex;
  align-items: center;

  div {
    flex: 1;
    display: flex;
    justify-content: center;
  }
`;

export const ActiveScreenContainer = styled.div<{
  theme: any;
  transparent: boolean;
}>`
  height: calc(89svh - 72px);
  overflow-y: auto;
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.mainBackgroundColor};
`;

export const MobileStatusBarContainer = styled.div<{
  theme: any;
  transparent: boolean;
}>`
  display: flex;
  padding: 10px 0;

  height: 5svh;

  div {
    flex: 1;
  }
`;

export const MobileContentContainer = styled.div<{
  theme: any;
  transparent: boolean;
}>`
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.mainBackgroundColor};
`;

export const DisplayContent = styled.div`
  height: 100%;
  width: 100%;

  background-repeat: none;
  border: 2px solid gray;
  border-radius: 26px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  background-size: cover;
  background-position: center;
`;

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
