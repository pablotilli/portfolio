import { RootState } from '../../store';

export const selectIsLogged = (state: RootState) => state.global.isLogged;
export const selectIsMobile = (state: RootState) => state.global.isMobile;
export const selectLightOn = (state: RootState) => state.global.lightOn;
export const selectAnimateIntro = (state: RootState) =>
  state.global.animateIntro;
export const selectImageViewer = (state: RootState) => state.global.imageViewer;
export const selectImagesFiles = (state: RootState) => state.global.imagesFiles;
export const selectDocumentsFiles = (state: RootState) =>
  state.global.documentsFiles;
