import './styles.css';
import Home from '../Home';

import Login from '../Login';

import CropSquareRoundedIcon from '@material-ui/icons/CropSquareRounded';
import RadioButtonCheckedOutlinedIcon from '@material-ui/icons/RadioButtonCheckedOutlined';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { Route, Routes } from 'react-router-dom';

import {
  handleLogin,
  handleLogout,
} from '../../redux/features/global/globalSlice';

import MobileIconsContainer from '../MobileIconsContainer';

import 'react-grid-layout/css/styles.css';
import MobileIcon from '../MobileIcon';

import WeatherWidget from '../WeatherWidget';

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
import {
  ActiveScreenContainer,
  DisplayContent,
  MobileContentContainer,
  MobileStatusBarContainer,
  SystemNavigationbar,
  TopBar,
} from './styles';
import useMobile from './useMobile';

export default function Mobile() {
  const {
    lightOn,
    hasOpenedScreen,
    formattedTime,
    wallpaper,
    isLogged,
    imageViewer,
    dispatch,
    navigate,
    handleDragStart,
    isTouchDevice,
    ResponsiveGridLayout,
    handleTouchStart,
    handleTouchEnd,
    showScreen,
    apps,
    widgets,
    handleScreenManagerAppClick,
    handleScreenManagerAppClose,
    handleGoHome,
    handleBack,
    handleShowScreenManager,
  } = useMobile();

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
      <DisplayContent
        style={{
          backgroundImage:
            lightOn &&
            (location.pathname == '/ScreenManager' || !hasOpenedScreen())
              ? `url(/images/${wallpaper}) `
              : 'none',
        }}
      >
        <MobileStatusBarContainer
          transparent={
            !(hasOpenedScreen() && location.pathname !== '/ScreenManager')
          }
        >
          <div className="left-status-bar">{formattedTime}</div>
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
          className={`mobile-content ${isLogged ? 'with-border-radius' : ''}`}
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
                      <TopBar>
                        <span
                          onClick={() => {
                            navigate(-1);
                          }}
                        >
                          <ArrowBackIosIcon />
                        </span>
                      </TopBar>
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
                            >
                              {widgets.find(({ name }) => name === 'weather')
                                ?.visible && <WeatherWidget version="mobile" />}
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
      </DisplayContent>
    </div>
  );
}
