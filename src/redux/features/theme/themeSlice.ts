import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'light' | 'dark' | 'blue' | 'red';
  wallpaper: string;
  widgets: [{ name: string; visible: boolean }];
}

const initialState: ThemeState = {
  theme: 'dark',
  wallpaper: 'wallpaper.jpg',
  widgets: [{ name: 'weather', visible: true }],
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (
      state,
      action: PayloadAction<'light' | 'dark' | 'blue' | 'red'>
    ) => {
      state.theme = action.payload;
    },
    setWallpaper: (state, action: PayloadAction<string>) => {
      state.wallpaper = action.payload;
    },
    changeWidget: (
      state,
      action: PayloadAction<{ name: string; show: boolean }>
    ) => {
      const widget = state.widgets.find(
        ({ name }) => name === action.payload.name
      );

      console.log({ widget }, action.payload.show);

      if (widget) {
        widget.visible = action.payload.show;
      }
    },
  },
});

export const { setTheme, setWallpaper, changeWidget } = themeSlice.actions;
export default themeSlice.reducer;
