import React from 'react';
import { setTheme } from '../../../../redux/features/theme/themeSlice';
import { useAppDispatch } from '../../../../hooks/reduxHooks';
import styled from 'styled-components';
import ThemeSelector from './ThemeSelector';

import * as themes from './../../../../themes/themes';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  width: 100%;

  h1 {
    font-size: 1rem;
    font-weight: normal;
    margin-bottom: 15px;
    margin-left: 10px;

    color: ${({ theme }) => theme.mainTextColor};
  }
`;

const ThemesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  width: 100%;
  grid-gap: 15px;
  padding: 15px;

  overflow-y: auto;
`;

export default function AppearencePreferences() {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const changeTheme = (themeName: string) => {
    dispatch(setTheme(themeName as 'light' | 'dark' | 'blue' | 'red')); //REFACTOR!!
  };

  type ThemeName = keyof typeof themes;

  return (
    <Container>
      <h1>{t('appearence')}</h1>
      <ThemesContainer>
        {Object.keys(themes).map((themeName) => (
          <ThemeSelector
            onClick={() => {
              changeTheme(themeName);
            }}
            tema={themes[themeName as ThemeName]}
          />
        ))}
      </ThemesContainer>
    </Container>
  );
}
