import styled from 'styled-components';

export const StyledTitlebar = styled.div<{ active: boolean }>`
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

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const Title = styled.div<{ active: boolean }>`
  flex-grow: 1;
  text-align: center;
  font-size: 14px;
  color: ${({ active, theme }) =>
    active ? theme.titleBarActiveTextColor : theme.titleBarTextColor};
  user-select: none;
  -webkit-app-region: no-drag;
`;

export const Button = styled.div`
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
