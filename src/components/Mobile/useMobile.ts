import { useEffect, useRef, useState, Ref } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  selectImageViewer,
  selectIsLogged,
  selectLightOn,
} from '../../redux/features/global/globalSelectors';
import {
  selectWallpaper,
  selectWidgets,
} from '../../redux/features/theme/themeSelectors';

import { Responsive, WidthProvider } from 'react-grid-layout';

import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

export default function useMobile() {
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

  function getIsTouchDevice() {
    return window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
  }

  const [isTouchDevice, setIsTouchDevice] = useState(getIsTouchDevice());

  window.addEventListener('resize', () => setIsTouchDevice(getIsTouchDevice()));

  const [formattedTime, setFormattedTime] = useState('');

  function getCurrentTime() {
    const currentDate = new Date();

    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  }

  const updateTime = () => {
    const currentTime = getCurrentTime();

    setFormattedTime(currentTime);
  };

  useEffect(() => {
    updateTime();

    setInterval(updateTime, 1000);
  }, []);

  return {
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
  };
}
