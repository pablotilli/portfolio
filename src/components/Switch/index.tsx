import React from 'react';
import styled from 'styled-components';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
}

const SwitchContainer = styled.div`
  display: inline-block;
  width: 60px;
  height: 30px;
  position: relative;
`;

const SwitchInput = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const Slider = styled.span<{ checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ checked, theme }) => (checked ? '#4a8d4d9b' : '#ccc')};
  transition: 0.4s;
  border-radius: 30px;

  &::before {
    position: absolute;
    content: '';
    height: 24px;
    width: 24px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${({ checked }) =>
      checked ? 'translateX(30px)' : 'translateX(0)'};
  }
`;

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
  console.log({ checked });
  return (
    <SwitchContainer>
      <SwitchInput checked={checked} onChange={onChange} />
      <Slider checked={checked} onClick={onChange} />
    </SwitchContainer>
  );
};

export default Switch;
