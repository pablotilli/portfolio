import styled from 'styled-components';

export const MainContainer = styled.div`
  display: grid;

  grid-template-rows: 20vh auto;

  width: 100%;
  height: 100%;

  @media (min-width: 900px) {
    grid-template-rows: 40px 35vh auto;
  }
`;

export const DateWidget = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  .date {
    font-size: 1rem;

    @media (min-width: 900px) {
      font-size: 2rem;
    }
  }

  .time {
    font-size: 3rem;

    @media (min-width: 900px) {
      font-size: 6rem;
    }
  }
`;

export const AvatarWidget = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AvatarImage = styled.div`
  background: url(/images/login_avatar.png) no-repeat;
  background-size: cover;

  width: 35%;
  aspect-ratio: 1 / 1;

  margin-bottom: 80px;

  border: 3px solid #989898;

  @media (min-width: 900px) {
    width: 8vw;

    margin-bottom: 0;
  }

  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoginButton = styled.button`
  background-color: #cbcbcb29;
  border: 1px solid gray;
  margin-top: 30px;
  padding: 10px;
  border-radius: 5px;
  color: #ffffffbd;
  font-size: 0.9rem;

  &:hover {
    background-color: #cbcbcb40;
  }
`;

export const IndicatorsBar = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 15px;

  img {
    width: 20px;
    object-fit: contain;
    margin: 0 5px;
  }

  & .battery-indicator {
    width: auto;
    height: 12px;
  }
`;

export const FingerprintCcontainer = styled.div`
  border-radius: 50%;
  width: 23%;

  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #0000009c;
`;

export const Fingerprint = styled.img`
  height: 8svh;

  margin: 10px;

  /*  opacity: 0; */
  transition: all 3s;
  width: 8svh;

  /* .fingerprint-visible { */
  /*  opacity: 0.7; */
  animation: pulse 5s infinite;
  animation-delay: 2s;
  z-index: 2;
  /*  } */

  @keyframes pulse {
    0% {
      transform: scale(0.9);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.7;
    }
    100% {
      transform: scale(0.9);
      opacity: 1;
    }
  }
`;
