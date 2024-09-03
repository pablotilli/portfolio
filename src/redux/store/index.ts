import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../features/global/globalSlice';
import themeReducer from '../features/theme/themeSlice';

const store = configureStore({
  reducer: {
    global: globalReducer,
    theme: themeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
