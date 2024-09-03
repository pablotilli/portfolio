import styled from 'styled-components';
import { Theme } from '../../themes/themes';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 20px 30px 15px 30px;

  display: flex;
  flex-direction: column;

  border-bottom-right-radius: 15px;
  margin-bottom: 30px;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: red;
    border-radius: 10px;
  }

  /* Estilos para Firefox */
  scrollbar-width: thin;
  scrollbar-color: #3f3f3f #222222;

  form {
    height: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
  }
`;

export const FieldsWrapper = styled.div`
  @media screen and (min-width: 900px) {
    flex: 1;
  }
`;

export const FormField = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 1rem;
  color: ${({ theme }) => theme.mainTextColor};
`;

export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
  background-color: ${({ theme }) => theme.mainBackgroundColor};
  color: ${({ theme }) => theme.mainTextColor};

  &:focus {
    border-color: #007aff;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;

  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
  resize: vertical;
  background-color: ${({ theme }) => theme.mainBackgroundColor};
  color: ${({ theme }) => theme.mainTextColor};

  &:focus {
    border-color: #007aff;
  }
`;

export const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.mainTextColor};
  background-color: ${({ theme }) => theme.mainBackgroundColor};
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  width: fit-content;

  display: flex;
  align-items: center;

  svg {
    width: 30px;
    scale: 1 / 1;
    color: ${({ theme }) => theme.mainTextColor};
    margin-right: 7px;
  }

  &:hover {
    opacity: 0.8;
    border: 1px solid ${({ theme }) => theme.titleBarActiveBackgroundColor};
  }

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 900px) {
    margin-top: 20px;
  }
`;

export const TwoColumnsContainer = styled.div`
  display: flex;

  @media screen and (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

export const FieldsColumn = styled.div`
  flex: 1;
`;

export const ImageColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    height: 150px;
    scale: 1 / 1;
    opacity: 0.7;
  }

  @media screen and (max-width: 600px) {
    img {
      height: 90px;
    }
  }
`;
