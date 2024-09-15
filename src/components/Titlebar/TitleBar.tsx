import { ButtonsContainer, StyledTitlebar, Button, Title } from './styles';

interface TitlebarProps {
  title?: string;
  onMinimize: () => void;
  onRestore: () => void;
  onClose: () => void;
  active: boolean;
}

const Titlebar = ({
  title,
  onMinimize,
  onRestore,
  onClose,
  active,
}: TitlebarProps) => {
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
      <Title active={active}>{title}</Title>
    </StyledTitlebar>
  );
};

export default Titlebar;
