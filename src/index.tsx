import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Main from './Main';

import { Provider } from 'react-redux';
import store from './redux/store';

import './i18n';

import './styles.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <Main />
      </Provider>
    </StrictMode>
  );
}
