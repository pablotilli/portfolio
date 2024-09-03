import { RootState } from '../../store';

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectWallpaper = (state: RootState) => state.theme.wallpaper;
export const selectWidgets = (state: RootState) => state.theme.widgets;
