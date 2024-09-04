import './styles.css';

import React, { CSSProperties, useEffect, useRef, useState } from 'react';

import Dock from '../Dock';
import Lamp from '../Lamp';
import CvWindow from '../Windows/CV';
import ContactWindow from '../Windows/Contact';
import Login from '../Login';
import Home from '../../pages/Home';
import DesktopIcon from '../DesktopIcon';
import DesktopIconsContainer from '../DesktopIconsContainer';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

import {
  handleLogin,
  handleLogout,
  handleLight,
} from '../../redux/features/global/globalSlice';

import {
  selectIsLogged,
  selectLightOn,
  selectImageViewer,
} from '../../redux/features/global/globalSelectors';
import WeatherWidget from '../WeatherWidget';
import ConfigurationWindow from '../Windows/Configuration';
import FileExplorerWindow from '../Windows/FileExplorer';
import AboutPorfolio from '../Windows/AboutPortfolio';
import { useTranslation } from 'react-i18next';
import {
  selectWallpaper,
  selectWidgets,
} from '../../redux/features/theme/themeSelectors';
import ImageViewerWindow from '../ImageViewer';

import { motion } from 'framer-motion';

function Desktop() {
  const { t } = useTranslation();

  enum windowStates {
    CLOSED = 'CLOSED',
    RESTORED = 'RESTORED',
    RESTORING = 'RESTORING',
    MAXIMIZED = 'MAXIMIZED',
    MINIMIZED = 'MINIMIZED',
    RESTORING_FROM_MINIMIZED = 'RESTORING_FROM_MINIMIZED',
  }

  interface WindowCoords {
    width: number;
    height: number;
    x: number;
    y: number;
  }

  interface Size {
    width: number;
    height: number;
  }

  interface Position {
    x: number;
    y: number;
  }

  interface WindowData {
    name: string;
    target: string;
    state: windowStates;
    lastWindowState: windowStates;
    lastWindowCoords: WindowCoords;
    size: Size;
    position: Position;
  }

  const lightOn = useAppSelector(selectLightOn);
  const isLogged = useAppSelector(selectIsLogged);
  const imageViewer = useAppSelector(selectImageViewer);

  const dispatch = useAppDispatch();

  const [apps, setApps] = useState([
    {
      name: 'CV',
      target: 'CV',
      icon: {
        image: '/images/cv_icon.png',
        dockRef: useRef<HTMLLIElement>(null),
        defaultPosition: {
          desktop: { x: 20, y: 20, width: 'auto', height: 'auto' },
          mobile: { x: 20, y: 20, width: 'auto', height: 'auto' },
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
          mobile: { x: 20, y: 140, width: 'auto', height: 'auto' },
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
          mobile: { x: 20, y: 260, width: 'auto', height: 'auto' },
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
          mobile: { x: 130, y: 20, width: 'auto', height: 'auto' },
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
          mobile: { x: 130, y: 140, width: 'auto', height: 'auto' },
        },
      },
      isOpen: false,
    },
  ]);

  const WINDOWS_DEFAULT = {
    CV: {
      name: 'CV',
      target: 'CV',
      state: windowStates.CLOSED,
      lastWindowState: windowStates.RESTORED,
      lastWindowCoords: {
        width: 980,
        height: 460,
        x: 30,
        y: 10,
      },
      size: { width: 980, height: 460 },
      position: { x: 30, y: 10 },
    },
    Contact: {
      name: 'Contact',
      target: 'Contact',
      state: windowStates.CLOSED,
      lastWindowState: windowStates.RESTORED,
      lastWindowCoords: {
        width: 480,
        height: 460,
        x: 30,
        y: 10,
      },
      size: { width: 480, height: 460 },
      position: { x: 30, y: 10 },
    },
    Configuration: {
      name: 'Configuration',
      target: 'Configuration',
      state: windowStates.CLOSED,
      lastWindowState: windowStates.RESTORED,
      lastWindowCoords: {
        width: 680,
        height: 460,
        x: 30,
        y: 10,
      },
      size: { width: 680, height: 460 },
      position: { x: 30, y: 10 },
    },
    FileExplorerPhotos: {
      name: 'File Explorer - Photos',
      target: 'FileExplorerPhotos',
      state: windowStates.CLOSED,
      lastWindowState: windowStates.RESTORED,
      lastWindowCoords: {
        width: 750,
        height: 480,
        x: 470,
        y: 50,
      },
      size: { width: 750, height: 480 },
      position: { x: 470, y: 50 },
    },
    FileExplorerDocuments: {
      name: 'File Explorer - Documents',
      target: 'FileExplorerDocuments',
      state: windowStates.CLOSED,
      lastWindowState: windowStates.RESTORED,
      lastWindowCoords: {
        width: 750,
        height: 480,
        x: 470,
        y: 50,
      },
      size: { width: 750, height: 480 },
      position: { x: 470, y: 50 },
    },
    AboutPorfolio: {
      name: 'AboutPorfolio',
      target: 'AboutPorfolio',
      state: windowStates.CLOSED,
      lastWindowState: windowStates.RESTORED,
      lastWindowCoords: {
        width: 980,
        height: 460,
        x: 30,
        y: 10,
      },
      size: { width: 980, height: 460 },
      position: { x: 30, y: 10 },
    },
  };

  const [windows, setWindows] = useState<{ [key: string]: WindowData }>(
    WINDOWS_DEFAULT
  );

  const [activeWindow, setActiveWindow] = useState<WindowData | null>(null);

  const handleWindow = (event: string, windowName: string, data: any) => {
    const newWindows = {
      ...windows,
    };
    const newWindow = { ...windows[windowName] };

    switch (event) {
      case 'state':
        newWindow.state = data;
        newWindows[windowName] = newWindow;

        setWindows(newWindows);

        break;
      case 'lastWindowState':
        newWindow.lastWindowState = data;
        newWindows[windowName] = newWindow;

        setWindows(newWindows);

        break;
      case 'lastWindowCoords':
        newWindow.lastWindowCoords = data;
        newWindows[windowName] = newWindow;

        setWindows(newWindows);

        break;
      case 'size':
        newWindow.size = data;
        newWindows[windowName] = newWindow;

        setWindows(newWindows);

        break;
      case 'position':
        newWindow.position = data;
        newWindows[windowName] = newWindow;

        setWindows(newWindows);

        break;
    }
  };
  const handleWindowNEW = (info: Array<any>) => {
    const newWindows = {
      ...windows,
    };
    const newWindow = { ...windows[info[0].windowName] };

    info.forEach(({ event, windowName, data }) => {
      switch (event) {
        case 'state':
          newWindow.state = data;
          newWindows[windowName] = newWindow;

          if (newWindow.state === windowStates.CLOSED) {
            const newApps = [...apps];

            const appClicked = newApps.find((app) => app.target === windowName);

            if (appClicked) {
              appClicked.isOpen = false;

              setApps(newApps);
            }
          }

          setActiveWindow(null);

          break;
        case 'lastWindowState':
          newWindow.lastWindowState = data;
          newWindows[windowName] = newWindow;

          break;
        case 'lastWindowCoords':
          newWindow.lastWindowCoords = data;
          newWindows[windowName] = newWindow;

          break;
        case 'size':
          newWindow.size = data;
          newWindows[windowName] = newWindow;

          break;
        case 'position':
          newWindow.position = data;
          newWindows[windowName] = newWindow;

          break;
      }
    });

    setWindows(newWindows);
  };

  const [activeDockIconPosition, setActiveDockIconPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const handleDesktopIconClick = (data: {
    name: string;
    target: string;
    icon: { image: string; dockRef: React.RefObject<HTMLLIElement> };
  }) => {
    const newApps = [...apps];

    const appClicked = newApps.find((app) => app.target === data.target);

    if (appClicked) {
      appClicked.isOpen = true;

      setApps(newApps);

      handleDockIconClick({
        name: data.target,
        target: data.target,
        iconRef: data.icon.dockRef.current,
        isOpen: true,
      });
    }
  };

  const handleDockIconClick = (data: any) => {
    if (data.name === 'logout') {
      dispatch(handleLogout());
      setWindows(WINDOWS_DEFAULT);
      setActiveWindow(null);
    } else {
      setTimeout(() => {
        const { x, y } = data.iconRef.getBoundingClientRect();
        setActiveDockIconPosition({ x, y });

        const windowName = data.target ? data.target : data.name;

        if (
          windows[windowName].state === windowStates.MINIMIZED ||
          windows[windowName].state === windowStates.CLOSED
        ) {
          handleWindowNEW([
            {
              event: 'state',
              windowName: windowName,
              data: windowStates.RESTORING_FROM_MINIMIZED,
            },
          ]);
          setActiveWindow(windows[windowName]);
        } else {
          if (windows[windowName].name !== activeWindow?.name) {
            //Focus windows
            setActiveWindow(windows[windowName]);
          } else {
            handleWindowNEW([
              {
                event: 'lastWindowCoords',
                windowName: windowName,
                data: {
                  width: parseFloat(`${windows[windowName].size.width}`),
                  height: parseFloat(`${windows[windowName].size.height}`),
                  ...windows[windowName].position,
                },
              },
              {
                event: 'lastWindowState',
                windowName: windowName,
                data: windows[windowName].state,
              },
              {
                event: 'state',
                windowName: windowName,
                data: windowStates.MINIMIZED,
              },
            ]);

            setActiveWindow(null);
          }
        }
      }, 1);

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    }
  };

  useEffect(() => {
    if (activeWindow) {
      if (activeWindow.state === windowStates.MAXIMIZED) {
        handleWindow('position', activeWindow.target, { x: 0, y: 0 });
      }

      if (activeWindow.state === windowStates.RESTORING) {
        setTimeout(() => {
          handleWindow('state', activeWindow.target, windowStates.RESTORED);
        }, 400);
      }
    }
  }, [activeWindow]);

  const handleLightChange = (state: boolean) => {
    dispatch(handleLight(state));
  };

  const handleActiveWindow = (activeWindowName: string) => {
    setActiveWindow(windows[activeWindowName]);
  };

  const spansData = [1, 3, 16, 5, 13, 6, 7, 10, 8, 17, 11, 14, 2, 9];

  const wallpaper = useAppSelector(selectWallpaper);

  const widgets = useAppSelector(selectWidgets);

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(true);

    setTimeout(() => setShowOverlay(false), 500);
  }, [wallpaper]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 5 }}
    >
      <>
        {!lightOn && <Home />}
        <div
          className={`main-scene-container ${
            !lightOn ? 'light-off' : 'light-on'
          }`}
        >
          <div className="cup-with-steam">
            <img src="/images/coffee_cup.png" alt="" />

            <div className="steam">
              {spansData.map((i, index) => (
                <span key={index} style={{ '--i': i } as CSSProperties}></span>
              ))}
            </div>
          </div>
          <div className="computer-container">
            <div id="routes-container">
              <div className="web-camera">O</div>

              <>
                <div
                  className={`overlay ${showOverlay ? 'show-overlay' : ''}`}
                />

                {imageViewer.visible ? <ImageViewerWindow /> : <></>}

                <div
                  className="main-container"
                  style={{
                    backgroundImage: `url(/images/${wallpaper})`,
                  }}
                >
                  {!isLogged ? (
                    <>
                      <Login handleLogin={() => dispatch(handleLogin())} />
                    </>
                  ) : (
                    <>
                      <DesktopIconsContainer>
                        <>
                          {apps.map((app) => (
                            <DesktopIcon
                              onClick={handleDesktopIconClick}
                              appData={app}
                              size="desktop"
                            />
                          ))}
                        </>
                        {widgets.find(({ name }) => name === 'weather')
                          ?.visible && <WeatherWidget />}
                      </DesktopIconsContainer>

                      <CvWindow
                        handleWindow={handleWindow}
                        window={windows.CV}
                        handleWindowNEW={handleWindowNEW}
                        windowName="CV"
                        activeDockIconPosition={activeDockIconPosition}
                        handleActiveWindow={handleActiveWindow}
                        isActiveWindow={
                          activeWindow ? activeWindow.target === 'CV' : false
                        }
                        visible={windows.CV.state !== windowStates.CLOSED}
                      />

                      <ContactWindow
                        handleWindow={handleWindow}
                        window={windows.Contact}
                        handleWindowNEW={handleWindowNEW}
                        windowName="Contact"
                        activeDockIconPosition={activeDockIconPosition}
                        handleActiveWindow={handleActiveWindow}
                        isActiveWindow={
                          activeWindow
                            ? activeWindow.target === 'Contact'
                            : false
                        }
                        visible={windows.Contact.state !== windowStates.CLOSED}
                      />

                      <ConfigurationWindow
                        handleWindow={handleWindow}
                        window={windows.Configuration}
                        handleWindowNEW={handleWindowNEW}
                        windowName="Configuration"
                        activeDockIconPosition={activeDockIconPosition}
                        handleActiveWindow={handleActiveWindow}
                        isActiveWindow={
                          activeWindow
                            ? activeWindow.target === 'Configuration'
                            : false
                        }
                        visible={
                          windows.Configuration.state !== windowStates.CLOSED
                        }
                      />

                      <FileExplorerWindow
                        handleWindow={handleWindow}
                        window={windows.FileExplorerPhotos}
                        handleWindowNEW={handleWindowNEW}
                        windowName="FileExplorerPhotos"
                        activeDockIconPosition={activeDockIconPosition}
                        handleActiveWindow={handleActiveWindow}
                        isActiveWindow={
                          activeWindow
                            ? activeWindow.target === 'FileExplorerPhotos'
                            : false
                        }
                        visible={
                          windows.FileExplorerPhotos.state !==
                          windowStates.CLOSED
                        }
                        section="Photos"
                      />

                      <FileExplorerWindow
                        handleWindow={handleWindow}
                        window={windows.FileExplorerDocuments}
                        handleWindowNEW={handleWindowNEW}
                        windowName="FileExplorerDocuments"
                        activeDockIconPosition={activeDockIconPosition}
                        handleActiveWindow={handleActiveWindow}
                        isActiveWindow={
                          activeWindow
                            ? activeWindow.target === 'FileExplorerDocuments'
                            : false
                        }
                        visible={
                          windows.FileExplorerDocuments.state !==
                          windowStates.CLOSED
                        }
                        section="Documents"
                      />

                      <AboutPorfolio
                        handleWindow={handleWindow}
                        window={windows.AboutPorfolio}
                        handleWindowNEW={handleWindowNEW}
                        windowName="AboutPorfolio"
                        activeDockIconPosition={activeDockIconPosition}
                        handleActiveWindow={handleActiveWindow}
                        isActiveWindow={
                          activeWindow
                            ? activeWindow.target === 'AboutPorfolio'
                            : false
                        }
                        visible={
                          windows.AboutPorfolio.state !== windowStates.CLOSED
                        }
                      />

                      <Dock
                        apps={apps}
                        onIconClick={handleDockIconClick}
                        activeWindowName={activeWindow?.name}
                        activeWindowTarget={activeWindow?.target}
                      />
                    </>
                  )}
                </div>
              </>
            </div>
            <div className="monitor-base">
              <img src="/images/display-base.png" />
            </div>
          </div>
          <Lamp onChange={handleLightChange} blink={!isLogged && !lightOn} />
          <div className="desktop"></div>
        </div>
      </>
    </motion.div>
  );
}

export default Desktop;
