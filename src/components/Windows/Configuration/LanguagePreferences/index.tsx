import { useTranslation } from 'react-i18next';
import LanguageSelector, { Language } from './LanguageSelector';
import styled from 'styled-components';

const Container = styled.div`
  padding: 15px;

  h1 {
    font-size: 1rem;
    font-weight: normal;
    margin-bottom: 15px;
    margin-left: 10px;

    color: ${({ theme }) => theme.mainTextColor};
  }
`;

export default function LanguagePreferences() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <Container>
      <h1>{t('select_language')}</h1>
      <LanguageSelector
        selectedLanguage={i18n.language as Language}
        onChange={changeLanguage}
      />
    </Container>
  );
}
