import styled, { useTheme } from 'styled-components';
import './Titlebar.css';

interface TitlebarProps {
  title?: string;
  onMinimize: () => void;
  onRestore: () => void;
  onClose: () => void;
  active: boolean;
}

const StyledTitlebar = styled.div<{ active: boolean }>`
  /*  background-color: ${({ active, theme }) =>
    active ? '#333333' : '#5a5a5a'}; */
  background-color: ${({ active, theme }) =>
    active
      ? theme.titleBarActiveBackgroundColor
      : theme.titleBarBackgroundColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;

  border-top-left-radius: 10px;
  -webkit-app-region: drag;
  width: 100%;
  border-top-right-radius: 10px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const Title = styled.div`
  flex-grow: 1;
  text-align: center;
  font-size: 14px;
  color: #333;
  user-select: none;
  -webkit-app-region: no-drag;
`;

const Button = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  &::before {
    display: block;
    position: absolute;
  }

  &.close {
    background-color: #ff5f57;

    &::before {
      content: 'x';

      height: 11px;
      font-size: 11px;
      top: -3px;
      left: 3px;
      display: none;
    }

    &:hover::before {
      display: block;
    }
  }

  &.minimize {
    background-color: #ffbd2e;

    &::before {
      content: '-';

      height: 12px;
      font-size: 13px;
      top: -4px;
      left: 3px;
      display: none;
    }

    &:hover::before {
      display: block;
    }
  }

  &.maximize {
    background-color: #28c940;

    &::before {
      content: '+';

      height: 12px;
      font-size: 14px;
      top: -5.2px;
      left: 1.5px;
      display: none;
    }

    &:hover::before {
      display: block;
    }
  }
`;

const Titlebar = ({
  title,
  onMinimize,
  onRestore,
  onClose,
  active,
}: TitlebarProps) => {
  const theme = useTheme();

  return (
    <StyledTitlebar
      className="titlebar"
      onDoubleClick={onRestore}
      active={active}
    >
      <ButtonsContainer>
        <Button className="close" onClick={onClose}></Button>
        <Button className="minimize" onClick={onMinimize}></Button>
        <Button className="maximize" onClick={onRestore}></Button>
      </ButtonsContainer>
      <Title>{title}</Title>
    </StyledTitlebar>
  );
};

export default Titlebar;
