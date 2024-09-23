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
    position: absolute;
    display: none;
  }

  &:hover::before {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  &.close {
    background-color: #ff5f57;

    &::before {
      content: 'x';

      height: 11px;
      font-size: 11px;
      top: -3px;
      left: 3.5px;
      display: none;
    }
  }

  &.minimize {
    background-color: #ffbd2e;

    &::before {
      content: '-';

      height: 12px;
      font-size: 13px;
      top: -3.5px;
      left: 3.3px;
      display: none;
    }
  }

  &.maximize {
    background-color: #28c940;

    &::before {
      content: '+';

      height: 12px;
      font-size: 14px;
      top: -5.3px;
      left: 1.3px;
      display: none;
    }
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;

  &:hover ${Button}::before {
    display: block;
  }
`;
