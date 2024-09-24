import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

import { setIsMobile } from './redux/features/global/globalSlice';
import { selectTheme } from './redux/features/theme/themeSelectors';

import { useAppDispatch } from './hooks/reduxHooks';

import { ThemeProvider } from 'styled-components';
import { light, dark, blue, red } from './themes/themes';

import { useMediaQuery } from 'react-responsive';

import { BrowserRouter as Router } from 'react-router-dom';

import Mobile from './components/Mobile';
import Desktop from './components/Desktop';

const themeMap = { light, dark, blue, red };

export default function Main() {
  const dispatch = useAppDispatch();

  const isMobileQuery = useMediaQuery({ query: '(max-width: 900px)' });

  const theme = useSelector((state: RootState) => selectTheme(state));
  const currentTheme = themeMap[theme];

  useEffect(() => {
    dispatch(setIsMobile(isMobileQuery));
  }, [isMobileQuery, dispatch]);

  return (
    <ThemeProvider theme={currentTheme}>
      <Router>{isMobileQuery ? <Mobile /> : <Desktop />}</Router>
    </ThemeProvider>
  );
}
