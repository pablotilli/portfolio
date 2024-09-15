export interface Theme {
  titleBarBackgroundColor: string;
  titleBarActiveBackgroundColor: string;
  titleBarTextColor: string;
  titleBarActiveTextColor: string;
  mainBackgroundColor: string;
  secondaryBackgroundColor: string;
  mainTextColor: string;
  secondaryTextColor: string;
}

export const light: Theme = {
  titleBarBackgroundColor: '#C3D0DE',
  titleBarActiveBackgroundColor: '#d3e3fdff',
  titleBarTextColor: '#7e7e7e',
  titleBarActiveTextColor: 'black',
  mainBackgroundColor: 'white',
  secondaryBackgroundColor: 'white',
  mainTextColor: 'black',
  secondaryTextColor: 'gray',
};

export const dark: Theme = {
  titleBarBackgroundColor: '#1a202bff',
  titleBarActiveBackgroundColor: '#000b1d',
  titleBarTextColor: '#b5b5b3',
  titleBarActiveTextColor: 'white',
  mainBackgroundColor: '#2a3453',
  secondaryBackgroundColor: '#222222',
  mainTextColor: 'white',
  secondaryTextColor: 'gray',
};

export const blue: Theme = {
  titleBarBackgroundColor: '#525252ff',
  titleBarActiveBackgroundColor: '#0f070cff',
  titleBarTextColor: '#acabab',
  titleBarActiveTextColor: 'white',
  mainBackgroundColor: '#0d0d0dff',
  secondaryBackgroundColor: '#161616ff',
  mainTextColor: 'white',
  secondaryTextColor: 'gray',
};

export const red: Theme = {
  titleBarBackgroundColor: '#342737ff',
  titleBarActiveBackgroundColor: '#d0000cff',
  titleBarTextColor: '#cbadae',
  titleBarActiveTextColor: 'white',
  mainBackgroundColor: '#DE6A54',
  secondaryBackgroundColor: '#DE8254',
  mainTextColor: 'white',
  secondaryTextColor: 'gray',
};
