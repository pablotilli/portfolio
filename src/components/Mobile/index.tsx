import React, { Ref, useEffect, useRef, useState } from 'react';

import './styles.css';
import Home from '../../pages/Home';

import Login from '../Login';

import CropSquareRoundedIcon from '@material-ui/icons/CropSquareRounded';
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import {
  handleLogin,
  handleLogout,
} from '../../redux/features/global/globalSlice';

import {
  selectImagesFiles,
  selectImageViewer,
  selectIsLogged,
  selectIsMobile,
  selectLightOn,
} from '../../redux/features/global/globalSelectors';
import {
  selectWallpaper,
  selectWidgets,
} from '../../redux/features/theme/themeSelectors';

import MobileIconsContainer from '../MobileIconsContainer';

import { Responsive, WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import MobileIcon from '../MobileIcon';

import { useNavigate } from 'react-router-dom';
import ConfigurationSidebar from '../ConfigurationSidebar';
import WallpaperPerferences from '../Windows/Configuration/WallpaperPreferences';
import AppearencePreferences from '../Windows/Configuration/AppearencePreferences';
import LanguagePreferences from '../Windows/Configuration/LanguagePreferences';
import WidgetsPreferences from '../Windows/Configuration/WidgetsPreferences';
import WeatherWidget from '../WeatherWidget';
import ContactForm from '../ContactForm';
import FilesList from '../FilesList';
import ImageViewerWindow from '../ImageViewer';
import styled from 'styled-components';
import MobileScreenManager from '../MobileScreenManager';
import CVMobileScreen from '../MobileScreen/CV';
import ConfgurationMobileScreen from '../MobileScreen/Configuration';
import WallpaperPerferencesScreen from '../MobileScreen/WallpaperPerferencesScreen';
import LanguagePreferencesScreen from '../MobileScreen/LanguagePreferencesScreen';
import WidgetsPreferencesScreen from '../MobileScreen/WidgetsPreferencesScreen';
import FileExplorerPhotosScreen from '../MobileScreen/FileExplorerPhotosScreen';
import ContactFormScreen from '../MobileScreen/ContactFormScreen';
import AppearencePreferencesScreen from '../MobileScreen/AppearencePreferencesScreen';
import AboutPortfolioScreen from '../MobileScreen/AboutPortfolioScreen';
import FileExplorerDocumentsScreen from '../MobileScreen/FileExplorerDocumentsScreen';

const SystemNavigationbar = styled.div`
  /*     background-color: red; */
  width: 100%;
  height: 6svh;
  position: absolute;

  bottom: 0;
  padding: 0 10px;

  display: flex;
  align-items: center;

  div {
    flex: 1;
    display: flex;
    justify-content: center;
  }
`;

const ActiveScreenContainer = styled.div<{
  theme: any;
  transparent: boolean;
}>`
  height: calc(89svh - 72px);
  overflow-y: auto;
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.mainBackgroundColor};
`;

const MobileStatusBarContainer = styled.div<{
  theme: any;
  transparent: boolean;
}>`
  display: flex;
  padding: 10px 0;

  height: 5svh;

  div {
    flex: 1;
  }
`;

const MobileContentContainer = styled.div<{
  theme: any;
  transparent: boolean;
}>`
  background-color: ${({ transparent, theme }) =>
    transparent ? 'transparent' : theme.mainBackgroundColor};
`;

export default function Mobile() {
  const dispatch = useAppDispatch();

  const showScreen = (screenName: string | null) => {
    const newApps = [...apps];

    const appToShow = newApps.find((app) => app.target === screenName);

    if (appToShow) {
      navigate(screenName || '/');

      appToShow.isOpen = true;
    }
  };

  const lightOn = useAppSelector(selectLightOn);
  const isLogged = useAppSelector(selectIsLogged);
  const wallpaper = useAppSelector(selectWallpaper);

  interface App {
    name: string;
    target: string;
    icon: {
      image: string;
      dockRef: Ref<HTMLLIElement>;
      defaultPosition: {
        desktop: { x: number; y: number; width: string; height: string };
        mobile: { x: number; y: number; width: string; height: string };
      };
    };
    isOpen: boolean;
  }

  const handleScreenManagerAppClick = (app: App) => {
    navigate(app.target, {
      replace: true,
    });
  };

  const handleScreenManagerAppClose = (app: App) => {
    const newApps = [...apps];

    const screenName = app.target;

    const appToShow = newApps.find((app) => app.target === screenName);

    if (appToShow) {
      appToShow.isOpen = false;
    }

    setApps(newApps);
  };

  const [apps, setApps] = useState<App[]>([
    {
      name: 'CV',
      target: 'CV',
      icon: {
        image: '/images/cv_icon.png',
        dockRef: useRef<HTMLLIElement>(null),
        defaultPosition: {
          desktop: { x: 20, y: 20, width: 'auto', height: 'auto' },
          mobile: { x: 0, y: 1, width: 'auto', height: 'auto' },
        },
      },
      isOpen: false,
    },
    {
      name: 'contact',
      target: 'Contact',
      icon: {
        image: '/images/contact_icon.png',
        dockRef: useRef<HTMLLIElement>(null),
        defaultPosition: {
          desktop: { x: 20, y: 140, width: 'auto', height: 'auto' },
          mobile: { x: 2, y: 1, width: 'auto', height: 'auto' },
        },
      },
      isOpen: false,
    },
    {
      name: 'about_this_proyect',
      target: 'AboutPorfolio',
      icon: {
        image: '/images/about_proyect_icon.png',
        dockRef: useRef<HTMLLIElement>(null),
        defaultPosition: {
          desktop: { x: 20, y: 260, width: 'auto', height: 'auto' },
          mobile: { x: 1, y: 1, width: 'auto', height: 'auto' },
        },
      },
      isOpen: false,
    },

    {
      name: 'documents',
      target: 'FileExplorerDocuments',
      icon: {
        image: '/images/docs_folder_icon.png',
        dockRef: useRef<HTMLLIElement>(null),
        defaultPosition: {
          desktop: { x: 130, y: 20, width: 'auto', height: 'auto' },
          mobile: { x: 0, y: 2, width: 'auto', height: 'auto' },
        },
      },
      isOpen: false,
    },

    {
      name: 'images',
      target: 'FileExplorerPhotos',
      icon: {
        image: '/images/photos_folder_icon.png',
        dockRef: useRef<HTMLLIElement>(null),
        defaultPosition: {
          desktop: { x: 130, y: 140, width: 'auto', height: 'auto' },
          mobile: { x: 1, y: 1, width: 'auto', height: 'auto' },
        },
      },
      isOpen: false,
    },

    {
      name: 'Configuration',
      target: 'Configuration',
      icon: {
        image: '/images/config_icon.png',
        dockRef: useRef<HTMLLIElement>(null),
        defaultPosition: {
          desktop: { x: 130, y: 140, width: 'auto', height: 'auto' },
          mobile: { x: 2, y: 1, width: 'auto', height: 'auto' },
        },
      },
      isOpen: false,
    },
  ]);

  const widgets = useAppSelector(selectWidgets);

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const isDraggingRef = useRef(false);

  const handleTouchStart = () => {
    setTimeout(() => (isDraggingRef.current = false), 1);
  };

  const handleDragStart = () => {
    isDraggingRef.current = true;
  };

  const handleTouchEnd = (data: App) => {
    if (!isDraggingRef.current) {
      showScreen(data.target);
    }
  };

  const navigate = useNavigate();

  const location = useLocation();

  const hasOpenedScreen = () => location.pathname !== '/';

  const imageViewer = useAppSelector(selectImageViewer);

  const handleBack = () => {
    if (location.pathname !== '/') {
      navigate(-1);
    }
  };

  const handleGoHome = () => {
    console.log('Path', location.pathname);
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleShowScreenManager = () => {
    navigate('/ScreenManager');
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, transition: { duration: 0.2 }, scale: 1 },
    exit: { opacity: 0, transition: { duration: 0.1 }, scale: 0 },
  };

  function getIsTouchDevice() {
    return window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  }

  const [isTouchDevice, setIsTouchDevice] = useState(getIsTouchDevice());

  window.addEventListener('resize', () => setIsTouchDevice(getIsTouchDevice()));

  return (
    <div
      style={{
        height: '100svh',
        display: 'flex',
        justifyContent: 'center',
        background: 'black',
        alignItems: 'center',
        border: '10px solid rgb(51 51 48)',
        borderRadius: '40px',
        margin: '0 auto',
        aspectRatio: '9/17',
        maxWidth: '100svw',
      }}
    >
      <div
        className="display-content"
        style={{
          backgroundImage:
            lightOn &&
            (location.pathname == '/ScreenManager' || !hasOpenedScreen())
              ? `url(/images/${wallpaper}) `
              : 'none',
        }}
      >
        {/*           <div
            className="glass"
            style={{
              background: 'url(/images/mobile_glass.png) no-repeat',
            }}
          ></div> */}

        <MobileStatusBarContainer
          transparent={
            !(hasOpenedScreen() && location.pathname !== '/ScreenManager')
          }
        >
          <div className="left-status-bar">22:38</div>
          <div className="notch">
            <div
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#252525',
                borderRadius: '50px',
              }}
            />
          </div>
          <div className="right-status-bar">
            <img src="/images/mobile_signal_indicator.png" />
            <img src="/images/wifi.png" />
            <img src="/images/battery.png" />
          </div>
        </MobileStatusBarContainer>

        <MobileContentContainer
          transparent={
            !(hasOpenedScreen() && location.pathname !== '/ScreenManager')
          }
          className={`mobile-content ${!isLogged ? 'with-border-radius' : ''}`}
        >
          {!isLogged && !lightOn ? (
            <Home />
          ) : !isLogged ? (
            <Login handleLogin={() => dispatch(handleLogin())} />
          ) : (
            <>
              {imageViewer.visible ? (
                <ImageViewerWindow />
              ) : (
                <>
                  {hasOpenedScreen() &&
                    location.pathname !== '/ScreenManager' && (
                      <div
                        style={{
                          height: '50px',
                          /*  background: 'green', */
                          lineHeight: '50px',
                        }}
                      >
                        <span
                          style={{
                            color: 'white',
                            marginTop: '5px',
                            marginLeft: '23px',
                            fontSize: '2rem',
                          }}
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          <ArrowBackIosIcon />
                        </span>
                      </div>
                    )}
                </>
              )}
              <ActiveScreenContainer
                transparent={
                  !(hasOpenedScreen() && location.pathname !== '/ScreenManager')
                }
              >
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <MobileIconsContainer>
                          <ResponsiveGridLayout
                            className="layout"
                            breakpoints={{
                              lg: 800,
                              md: 500,
                              sm: 300,
                              xs: 150,
                              xxs: 0,
                            }}
                            isResizable={false}
                            isDraggable={isTouchDevice}
                            rowHeight={100}
                            cols={{ lg: 3, md: 3, sm: 3, xs: 2, xxs: 1 }}
                            onDrag={handleDragStart}
                            compactType={null}
                            maxRows={4}
                          >
                            <div
                              key={'weather-widget'}
                              data-grid={{
                                x: 0,
                                y: 0,
                                w: 2,
                                h: 1,
                                isBounded: true,
                              }}
                              /*  onTouchStart={handleTouchStart}
                              onTouchEndCapture={() => handleTouchEnd(app)} */
                            >
                              <WeatherWidget version="mobile" />
                            </div>

                            {apps.map((app, index) => (
                              <div
                                key={index}
                                data-grid={{
                                  x: app.icon.defaultPosition.mobile.x,
                                  y: app.icon.defaultPosition.mobile.y,
                                  w: 1,
                                  h: 1,
                                  isBounded: true,
                                }}
                                onTouchStart={handleTouchStart}
                                onTouchEndCapture={() => handleTouchEnd(app)}
                                onClick={() => showScreen(app.target)}
                              >
                                <MobileIcon
                                  text={app.name}
                                  image={app.icon.image}
                                />
                              </div>
                            ))}
                          </ResponsiveGridLayout>
                        </MobileIconsContainer>

                        <div className="mobile-dock-container">
                          <div className="mobile-dock">
                            {/*                         <div
                              className="mobile-dock-icon"
                              onClick={() => showScreen(null)}
                            >
                              <img src="/images/home_dock_icon.png" />
                            </div> */}

                            <div
                              className="mobile-dock-icon"
                              onClick={() => showScreen('Configuration')}
                            >
                              <img src="/images/config_icon.png" />
                            </div>

                            <div
                              className="mobile-dock-icon"
                              onClick={() => dispatch(handleLogout())}
                            >
                              <img src="/images/logout_dock_icon.png" />
                            </div>
                          </div>
                        </div>
                      </>
                    }
                  />

                  <Route path="/CV" element={<CVMobileScreen />} />
                  <Route
                    path="/AboutPorfolio"
                    element={<AboutPortfolioScreen />}
                  />
                  <Route
                    path="/Configuration"
                    element={<ConfgurationMobileScreen />}
                  />
                  <Route
                    path="/wallpaper"
                    element={<WallpaperPerferencesScreen />}
                  />
                  <Route
                    path="/appearence"
                    element={<AppearencePreferencesScreen />}
                  />
                  <Route
                    path="/language"
                    element={<LanguagePreferencesScreen />}
                  />
                  <Route
                    path="/widgets"
                    element={<WidgetsPreferencesScreen />}
                  />
                  <Route path="/contact" element={<ContactFormScreen />} />
                  <Route
                    path="/FileExplorerPhotos"
                    element={<FileExplorerPhotosScreen />}
                  />
                  <Route
                    path="/FileExplorerDocuments"
                    element={<FileExplorerDocumentsScreen />}
                  />
                  <Route
                    path="/screenManager"
                    element={
                      <MobileScreenManager
                        openedApps={apps.filter(({ isOpen }) => isOpen)}
                        onAppClick={handleScreenManagerAppClick}
                        onAppClose={handleScreenManagerAppClose}
                      />
                    }
                  />
                </Routes>

                <SystemNavigationbar>
                  <div onClick={handleShowScreenManager}>
                    <CropSquareRoundedIcon />
                  </div>
                  <div onClick={handleGoHome}>
                    <RadioButtonCheckedOutlinedIcon />
                  </div>
                  <div onClick={handleBack}>
                    <ArrowLeftIcon fontSize="large" />
                  </div>
                </SystemNavigationbar>
              </ActiveScreenContainer>
            </>
          )}
        </MobileContentContainer>
      </div>
    </div>
  );
}
