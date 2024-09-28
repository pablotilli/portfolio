import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  isLogged: boolean;
  isMobile: boolean | null;
  lightOn: boolean;
  animateIntro: boolean;
  imageViewer: {
    visible: boolean;
    fileIndex: number;
    viewerType?: 'pdf' | 'image';
  };
  imagesFiles: { path: string; type: string; size: string }[];
  documentsFiles: { path: string; type: string; size: string }[];
}

const initialState: GlobalState = {
  isLogged: false,
  isMobile: null,
  lightOn: false,
  animateIntro: true,
  imageViewer: { visible: false, fileIndex: 0, viewerType: 'pdf' },
  imagesFiles: [
    {
      path: '/images/pictures/react.jpg',
      type: 'JPG File',
      size: '39 KB',
    },
    {
      path: '/images/pictures/js.png',
      type: 'PNG File',
      size: '35 KB',
    },
    {
      path: '/images/pictures/node-js.jpg',
      type: 'JPG File',
      size: '305 KB',
    },
    {
      path: '/images/pictures/next-js.png',
      type: 'PNG File',
      size: '39 KB',
    },
    {
      path: '/images/pictures/react-native.jpg',
      type: 'JPG File',
      size: '833 KB',
    },
    {
      path: '/images/pictures/react-three-fiber.jpg',
      type: 'PNG File',
      size: '544 KB',
    },
    {
      path: '/images/pictures/sql.avif',
      type: 'AVIF File',
      size: '28 KB',
    },
    {
      path: '/images/pictures/styled-components.jpg',
      type: 'PNG File',
      size: '511 KB',
    },
    {
      path: '/images/pictures/tailwindcss.jpg',
      type: 'JPG File',
      size: '32 KB',
    },
    {
      path: '/images/pictures/typescript.jpg',
      type: 'JPG File',
      size: '35 KB',
    },
  ],
  documentsFiles: [
    {
      path: '/documents/cv_pablo_tilli.pdf',
      type: 'PDF File',
      size: '74 KB',
    },
  ],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    handleLogin: (state) => {
      state.isLogged = true;
    },
    handleLogout: (state) => {
      state.isLogged = false;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    handleLight: (state, action: PayloadAction<boolean>) => {
      state.lightOn = action.payload;

      if (action.payload) {
        state.animateIntro = false;
      }
    },
    handleAnimateIntro: (state, action: PayloadAction<boolean>) => {
      state.animateIntro = action.payload;
    },
    handleImageViewer: (
      state,
      action: PayloadAction<{
        visible: boolean;
        fileIndex: number;
        viewerType?: 'pdf' | 'image';
      }>
    ) => {
      state.imageViewer = action.payload;
    },
  },
});

export const {
  handleLogin,
  handleLogout,
  setIsMobile,
  handleLight,
  handleAnimateIntro,
  handleImageViewer,
} = globalSlice.actions;

export default globalSlice.reducer;
