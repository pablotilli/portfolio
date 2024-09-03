import styled from 'styled-components';

const usFlag = require('../../../../../assets/images/flags/us.png');
const esFlag = require('../../../../../assets/images/flags/es.png');
const itFlag = require('../../../../../assets/images/flags/it.png');
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'es' | 'it';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onChange: (language: Language) => void;
}

interface RadioLabelProps {
  isChecked: boolean;
}

const RadioContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const RadioInput = styled.input.attrs({ type: 'radio' })`
  display: none;
`;

const RadioLabel = styled.label<RadioLabelProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  /*  justify-content: center; */
  cursor: pointer;
  position: relative;
  padding: 5px;
  border: 3px solid
    ${({ isChecked, theme }) =>
      isChecked ? theme.titleBarBackgroundColor : 'transparent'};
  border-radius: 8px;
  transition: background-color 0.3s, border-color 0.3s;

  img {
    width: 60px;
    height: 36px;
    border-radius: 5px;
    padding: 3px;
  }

  span {
    padding-top: 6px;
    color: ${({ theme }) => theme.mainTextColor};
  }
`;

const flags: Record<Language, string> = {
  en: usFlag,
  es: esFlag,
  it: itFlag,
};

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onChange,
}) => {
  const { t } = useTranslation();

  const languages: Language[] = ['en', 'es', 'it'];

  return (
    <RadioContainer>
      {languages.map((language) => (
        <div key={language}>
          <RadioInput
            id={language}
            name="language"
            value={language}
            checked={selectedLanguage === language}
            onChange={() => onChange(language)}
          />
          <RadioLabel
            htmlFor={language}
            isChecked={selectedLanguage === language}
          >
            <img src={flags[language]} alt={`${language} flag`} />
            <span>{t(`${language}_language`)}</span>
          </RadioLabel>
        </div>
      ))}
    </RadioContainer>
  );
};

export default LanguageSelector;
