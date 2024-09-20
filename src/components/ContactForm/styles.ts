import styled from 'styled-components';
import { Theme } from '../../themes/themes';

export const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 20px 30px 5px 30px;

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
  margin-bottom: 10px;
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.titleBarTextColor};
  margin-top: 5px;
  font-size: 0.8rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.mainTextColor};
`;

export const FormFooter = styled.div`
  display: flex;
`;

export const SendMessageAlert = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 5px 8px;
  border: 1px solid ${({ theme }) => theme.titleBarBackgroundColor};
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 100;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
  background-color: ${({ theme }) => theme.mainBackgroundColor};
  color: ${({ theme }) => theme.mainTextColor};

  &:focus {
    border-color: ${({ theme }) => theme.titleBarActiveBackgroundColor};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.titleBarBackgroundColor};
    color: ${({ theme }) => theme.titleBarTextColor};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;

  padding: 12px;
  border: 1px solid ${({ theme }) => theme.titleBarBackgroundColor};
  border-radius: 4px;

  font-size: 0.9rem;
  font-weight: 100;

  box-sizing: border-box;
  outline: none;
  transition: border-color 0.3s;
  resize: vertical;
  background-color: ${({ theme }) => theme.mainBackgroundColor};
  color: ${({ theme }) => theme.mainTextColor};

  &:focus {
    border-color: ${({ theme }) => theme.titleBarActiveBackgroundColor};
  }
`;

export const Button = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  color: ${({ theme }) => theme.mainTextColor};
  background-color: ${({ theme }) => theme.mainBackgroundColor};
  border: 1px solid ${({ theme }) => theme.titleBarBackgroundColor};
  border-radius: 4px;
  margin-top: 5px;
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

  &:not(:disabled):hover {
    opacity: 0.8;
    border: 1px solid ${({ theme }) => theme.titleBarActiveBackgroundColor};
  }

  &:disabled:hover {
    cursor: default;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.titleBarBackgroundColor};
    color: ${({ theme }) => theme.titleBarTextColor};

    svg {
      color: ${({ theme }) => theme.titleBarTextColor};
    }
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
    height: 120px;
    scale: 1 / 1;
    opacity: 0.6;
  }

  @media screen and (max-width: 600px) {
    img {
      height: 90px;
    }
  }
`;
