import { useRef, MouseEvent } from 'react';
import './styles.css';
import { useTranslation } from 'react-i18next';

interface DockProps {
  onIconClick: (data: { name: string; iconRef: HTMLLIElement | null }) => void;
  activeWindowName: string | undefined;
  activeWindowTarget: string | undefined;
  apps: {
    name: string;
    icon: { image: string; dockRef: React.RefObject<HTMLLIElement> };
  }[];
}

const Dock = ({
  onIconClick,
  activeWindowName,
  apps,
  activeWindowTarget,
}: DockProps) => {
  const scaleValue = (
    value: number,
    from: [number, number],
    to: [number, number]
  ) => {
    const scale = (to[1] - to[0]) / (from[1] - from[0]);
    const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return Math.floor(capped * scale + to[0]);
  };

  const { t } = useTranslation();

  const maxAdditionalSize = 5;

  const dockRef = useRef<HTMLInputElement>(null);

  const handleAppHover = (ev: MouseEvent) => {
    if (!dockRef.current) return;

    const mousePosition = ev.clientX;

    const targetElement = ev.currentTarget;

    const iconPositionLeft = targetElement.getBoundingClientRect().left;
    const iconWidth = targetElement.getBoundingClientRect().width;

    const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
    const offsetPixels = scaleValue(
      cursorDistance,
      [0, 1],
      [maxAdditionalSize * -1, maxAdditionalSize]
    );

    dockRef.current.style.setProperty(
      '--dock-offset-left',
      `${offsetPixels * -1}px`
    );

    dockRef.current.style.setProperty(
      '--dock-offset-right',
      `${offsetPixels}px`
    );
  };

  const handleIconClick = (data: {
    name: string;
    iconRef: HTMLLIElement | null;
    target: string;
  }) => {
    onIconClick(data);
  };

  //const iconsRef = [useRef(null), useRef(null), useRef(null)];
  const logoutIconRef = useRef(null);

  return (
    <nav ref={dockRef} className="dock">
      <ul>
        {apps.map(({ name, icon, isOpen, target }: any) => {
          return (
            <li
              style={{ display: isOpen ? 'block' : 'none' }}
              className="app"
              onMouseMove={handleAppHover}
              onClick={() => {
                //handleIconClick({ name, iconRef: iconsRef[0].current });
                handleIconClick({
                  name,
                  target,
                  iconRef: icon.dockRef && icon.dockRef.current,
                });
              }}
              ref={icon.dockRef}
            >
              <img src={icon.image} />
              <span className="tooltip">{t(name)}</span>

              {activeWindowTarget === target &&
              activeWindowName != 'Configuration' ? (
                <div className="dock-app-is-active-icon" />
              ) : (
                <div className="dock-app-is-open-icon" />
              )}
            </li>
          );
        })}

        <li
          className="app"
          onMouseMove={handleAppHover}
          onClick={() => {
            handleIconClick({
              name: 'Configuration',
              target: 'Configuration',
              iconRef: logoutIconRef.current,
            });
          }}
          ref={logoutIconRef}
        >
          <img src="/images/config_icon.png" />
          <span className="tooltip">{t('preferences')}</span>
          {activeWindowTarget === 'Configuration' && (
            <div className="dock-app-is-active-icon" />
          )}
        </li>
        <li
          className="app"
          onMouseMove={handleAppHover}
          onClick={() => {
            handleIconClick({
              name: 'logout',
              target: 'logout',
              iconRef: logoutIconRef.current,
            });
          }}
          ref={logoutIconRef}
        >
          <img src="/images/logout_dock_icon.png" />
          <span className="tooltip">{t('logout')}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Dock;
