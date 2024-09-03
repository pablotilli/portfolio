import { useTranslation } from 'react-i18next';
import LanguageSelector, { Language } from './LanguageSelector';
import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;
`;

export default function LanguagePreferences() {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Container>
      <h1>Select your language</h1>
      <LanguageSelector
        selectedLanguage={i18n.language as Language}
        onChange={changeLanguage}
      />
    </Container>
  );
}
