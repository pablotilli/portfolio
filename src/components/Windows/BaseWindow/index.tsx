import React, { ReactNode, useEffect, useState } from 'react';

import styled, { useTheme } from 'styled-components';

import '../../Desktop/styles.css';
import Titlebar from '../../Titlebar/TitleBar';

import { Rnd } from 'react-rnd';

interface BaseWindowProps {
  handleWindow: (event: string, windowName: string, data: any) => void;
  window: any;
  handleWindowNEW: (info: Array<any>) => void;
  children: ReactNode;
  windowName: string;
  activeDockIconPosition: { x: number; y: number };
  backgroundColor?: string;
  handleActiveWindow: (activeWindowName: string) => void;
  isActiveWindow: boolean;
  visible: boolean;
  title: string;
}

export default function BaseWindow({
  handleWindow,
  window: targetWindow,
  handleWindowNEW,
  children,
  windowName,
  activeDockIconPosition,
  backgroundColor,
  handleActiveWindow,
  isActiveWindow = false,
  visible,
  title,
}: BaseWindowProps) {
  const windowStates = {
    MINIMIZED: 'MINIMIZED',
    RESTORED: 'RESTORED',
    RESTORING: 'RESTORING',
    MAXIMIZED: 'MAXIMIZED',
    RESTORING_FROM_MINIMIZED: 'RESTORING_FROM_MINIMIZED',
    CLOSED: 'CLOSED',
  };

  const theme = useTheme();

  const handleMinimize = () => {
    const events = [];

    if (targetWindow.state === windowStates.MAXIMIZED) {
      events.push({
        event: 'lastWindowCoords',
        windowName: windowName,
        data: {
          width: parseFloat(targetWindow.size.width),
          height: parseFloat(targetWindow.size.height),
          x: 0,
          y: 0,
        },
      });
    } else {
      events.push({
        event: 'lastWindowCoords',
        windowName: windowName,
        data: {
          width: parseFloat(targetWindow.size.width),
          height: parseFloat(targetWindow.size.height),
          ...targetWindow.position,
        },
      });
    }

    events.push({
      event: 'lastWindowState',
      windowName: windowName,
      data: targetWindow.state,
    });

    events.push({
      event: 'state',
      windowName: windowName,
      data: windowStates.MINIMIZED,
    });

    handleWindowNEW(events);
  };

  const handleRestore = () => {
    if (targetWindow.state === windowStates.RESTORED) {
      handleWindow('lastWindowCoords', windowName, {
        width: parseFloat(targetWindow.size.width),
        height: parseFloat(targetWindow.size.height),
        ...targetWindow.position,
      });
    }

    handleWindow(
      'state',
      windowName,
      targetWindow.state === windowStates.RESTORED
        ? windowStates.MAXIMIZED
        : windowStates.RESTORING
    );
  };

  const handleClose = () => {
    handleWindowNEW([
      {
        event: 'state',
        windowName: windowName,
        data: windowStates.CLOSED,
      },
      {
        event: 'lastWindowState',
        windowName: windowName,
        data: targetWindow.state,
      },
      {
        event: 'lastWindowCoords',
        windowName: windowName,
        data: {
          width: parseFloat(targetWindow.size.width),
          height: parseFloat(targetWindow.size.height),
          ...targetWindow.position,
        },
      },
    ]);
  };

  useEffect(() => {
    if (targetWindow.state === windowStates.MAXIMIZED) {
      handleWindow('position', windowName, { x: 0, y: 0 });
    }

    if (targetWindow.state === windowStates.RESTORING) {
      setTimeout(() => {
        handleWindow('state', windowName, windowStates.RESTORED);
      }, 400);
    }

    if (targetWindow.state === windowStates.RESTORING_FROM_MINIMIZED) {
      if (targetWindow.lastWindowState === windowStates.MAXIMIZED) {
        handleWindow('state', windowName, targetWindow.lastWindowState);
      } else {
        setTimeout(() => {
          handleWindow('state', windowName, targetWindow.lastWindowState);
        }, 300);
      }
    }

    window.dispatchEvent(new Event('resize'));
  }, [targetWindow.state]);

  return (
    <Rnd
      /*  default={{ x: 220, y: 50, width: 100, height: 950 }} */
      default={targetWindow.lastWindowCoords}
      dragHandleClassName="titlebar"
      size={{
        width: targetWindow.size.width,
        height: targetWindow.size.height,
      }}
      disableDragging={targetWindow.state !== windowStates.RESTORED}
      enableResizing={targetWindow.state === windowStates.RESTORED}
      onDragStop={(e, d) => {
        handleWindow('position', windowName, { x: d.x, y: d.y });
      }}
      bounds=".main-container"
      onResize={(e, direction, ref, delta, position) => {
        handleWindowNEW([
          {
            event: 'size',
            windowName: windowName,
            data: {
              width: ref.style.width,
              height: ref.style.height,
            },
          },
          {
            event: 'position',
            windowName: windowName,
            data: { x: position.x, y: position.y },
          },
        ]);

        window.dispatchEvent(new Event('resize'));
      }}
      className={`main-app ${
        targetWindow.state === windowStates.MAXIMIZED
          ? 'maximized'
          : targetWindow.state === windowStates.CLOSED
          ? 'closed'
          : targetWindow.state === windowStates.MINIMIZED
          ? 'minimized'
          : targetWindow.state === windowStates.RESTORING
          ? 'restoring'
          : targetWindow.state === windowStates.RESTORING_FROM_MINIMIZED
          ? 'restoringFromMinimized'
          : ''
      }`}
      style={
        {
          '--window-to-width': `${targetWindow.lastWindowCoords.width}px`,
          '--window-to-height': `${targetWindow.lastWindowCoords.height}px`,
          '--window-to-x': `${targetWindow.lastWindowCoords.x}px`,
          '--window-to-y': `${targetWindow.lastWindowCoords.y}px`,
          '--dock-active-icon-x': `${activeDockIconPosition.x - 350}px`,
          '--dock-active-icon-y': `${activeDockIconPosition.y - 150}px`,
          zIndex: isActiveWindow ? 1 : 0,
          opacity: visible ? 1 : 0,
        } as React.CSSProperties
      }
      minWidth={500}
      minHeight={380}
    >
      <div
        className={`main-app ${
          targetWindow.state === windowStates.MAXIMIZED ? 'maximized' : ''
        }`}
        style={{
          backgroundColor: backgroundColor
            ? backgroundColor
            : theme.secondaryBackgroundColor,
          borderRadius: '15px',
          boxShadow: 'rgb(0 0 0 / 69%) 0px 0px 12px 0px',
        }}
        onMouseDown={() => {
          handleActiveWindow(windowName);
        }}
      >
        <Titlebar
          onMinimize={handleMinimize}
          onRestore={handleRestore}
          onClose={handleClose}
          active={isActiveWindow}
          title={title}
        />
        {children}
      </div>
    </Rnd>
  );
}
