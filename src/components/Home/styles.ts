import styled from 'styled-components';

export const HomeContainer = styled.div`
  color: #d4d4d4;
  padding: 20px;

  display: flex;

  height: 100%;

  position: absolute;
  z-index: 1;

  width: calc(100% - 300px);
  left: 100px;

  @media screen and (max-width: 900px) {
    flex-direction: column;

    width: 100%;
    position: unset;

    padding: 0;
  }
`;

export const TextContainer = styled.div`
  flex-basis: 900px;

  font-size: 1.5rem;
  text-align: left;

  margin-top: 60px;
  padding-right: 40px;

  position: relative;

  height: 350px;
  min-height: 350px;

  .turn-on-light-text {
    animation: change-text-color 5s forwards;
  }

  @keyframes change-text-color {
    0% {
      color: white;
    }
    100% {
      color: yellow;
    }
  }

  @media screen and (max-width: 900px) {
    position: initial;
    font-size: 1rem;
    word-wrap: break-word;
    width: 100%;
    margin-top: 5px;
    line-height: 1.2rem;
    padding: 15px;

    display: flex;
    flex-direction: column;
    text-align: center;
  }
`;

export const MobileLoader = styled.div`
  position: absolute;
  bottom: 80px;
  width: 100%;

  left: 0;
`;

export const LampIndicator = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 2px;

  top: calc(100vh / 2 - 50px);
  right: 0;

  opacity: 0;
  transition: all 2s;

  animation-delay: 5s;
  animation: infinite 1s animacion-lamp-indicator alternate ease-in-out;

  & img {
    width: 80px;
    height: 80px;
  }

  &.lamp-indicator-show {
    opacity: 1;
  }

  @keyframes animacion-lamp-indicator {
    0% {
      right: -35px;
    }
    100% {
      right: -55px;
    }
  }
`;

export const ContinueTextContainer = styled.div`
  .fadein-1 {
    opacity: 0;
    animation: fade-in 4s forwards;
  }

  .fadein-2 {
    opacity: 0;
    animation: fade-in 6s forwards;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
