import { useEffect } from 'react';

import Mobile from './components/Mobile';
import Desktop from './components/Desktop';

import { useAppDispatch } from './hooks/reduxHooks';
import { setIsMobile } from './redux/features/global/globalSlice';

import { useMediaQuery } from 'react-responsive';

import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { selectTheme } from './redux/features/theme/themeSelectors';
import { light, dark, blue, red } from './themes/themes';
import { RootState } from './redux/store';

import { BrowserRouter as Router } from 'react-router-dom';

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
