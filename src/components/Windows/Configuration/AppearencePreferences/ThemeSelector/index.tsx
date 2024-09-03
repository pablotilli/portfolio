import { ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from '../../../../../themes/themes';

const Container = styled.div<{
  children: ReactNode;
  onClick: () => void;
  tema: Theme;
}>`
  height: 110px;
  background-color: ${({ tema }) => tema.secondaryBackgroundColor};
  border-radius: 7px;

  border: 1px solid gray;
`;

const TitleBarButtons = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 5px;
`;

const TitleBarButton = styled.div`
  background-color: ${({ color }) => color};
  width: 8px;
  height: 8px;
  margin: 0 2px;
  border-radius: 50%;
`;

export default function ThemeSelector({
  onClick,
  tema,
}: {
  onClick: () => void;
  tema: Theme;
}) {
  return (
    <Container onClick={onClick} tema={tema}>
      <div
        style={{
          backgroundColor: tema.titleBarBackgroundColor,
          height: '25px',
          width: '100%',
          position: 'relative',
          borderTopLeftRadius: '5px',
          border: '1px solid gray',
        }}
      >
        <TitleBarButtons>
          <TitleBarButton color="gray" />
          <TitleBarButton color="gray" />
          <TitleBarButton color="gray" />
        </TitleBarButtons>

        <div
          style={{
            backgroundColor: tema.secondaryBackgroundColor,
            height: '83px',
            width: '16%',
            position: 'absolute',
            top: '25px',
            left: 0,
            borderBottomLeftRadius: '5px',
          }}
        ></div>
        <div
          style={{
            backgroundColor: tema.mainBackgroundColor,
            height: '83px',
            width: '35%',
            position: 'absolute',
            top: '25px',
            left: '16%',
            border: '1px solid gray',
          }}
        ></div>
        <div
          style={{
            backgroundColor: tema.titleBarActiveBackgroundColor,
            height: '25px',
            width: '85%',
            position: 'absolute',
            top: '15px',
            right: 0,
            borderTopLeftRadius: '5px',
          }}
        >
          <TitleBarButtons>
            <TitleBarButton color="#FF5F57" />
            <TitleBarButton color="#FFBD2E" />
            <TitleBarButton color="#28C940" />
          </TitleBarButtons>
        </div>
      </div>
    </Container>
  );
}
