import React from 'react';
import styled from 'styled-components';

const NavBar = styled.nav`
  display: flex;
  align-items: center;
  background-color: #323639;
  padding: 0.5rem 1rem;
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: white;
  outline: none;
  font-size: 16px;
  color: #000;
  border-radius: 10px;
  padding: 7px 10px;

  &::placeholder {
    color: #888;
  }
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  margin-left: 12px;
  cursor: pointer;

  &:hover {
    color: #888;
  }
`;

const NavBarComponent: React.FC = () => {
  return (
    <NavBar>
      <NavButton>{'<'}</NavButton>
      <NavButton>{'>'}</NavButton>
      <SearchInput type="text" placeholder="localhost:3000" disabled />
      <NavIcons>
        <IconWrapper>⭐</IconWrapper>
      </NavIcons>
    </NavBar>
  );
};

export default NavBarComponent;
