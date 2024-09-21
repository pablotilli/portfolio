import React, { useMemo, useRef, useEffect } from 'react';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
// @ts-ignore
import { Text } from '@react-three/drei';

import TWEEN from '@tweenjs/tween.js';

import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

import { useAppSelector } from '../../hooks/reduxHooks';
import { selectAnimateIntro } from '../../redux/features/global/globalSelectors';

const colorSides = [
  [0, 1, 'darkorange'],
  [0, -1, 'red'],
  [1, 1, 'white'],
  [1, -1, 'yellow'],
  [2, 1, 'green'],
  [2, -1, 'blue'],
];

function Cube() {
  interface Move {
    axis: 'x' | 'y' | 'z';
    limit: number;
    multiplier: number;
  }

  const cubeGroupRef = useRef(new THREE.Group());
  const rotationGroupRef = useRef(new THREE.Group());
  const movesRef = useRef<Move[]>([]);

  const roundedBoxGeometry = useMemo(() => {
    return new RoundedBoxGeometry(1, 1, 1, 3, 0.1);
  }, []);

  useFrame(() => {
    TWEEN.update();
  });

  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const animateIntro = useAppSelector(selectAnimateIntro);

  useEffect(() => {
    if (animateIntro) {
      const randomRotate = async () => {
        return new Promise<void>((resolve) => {
          const axes: ['x', 'y', 'z'] = ['x', 'y', 'z'];
          const axis = axes[Math.floor(Math.random() * axes.length)];
          const limit = Math.random() > 0.5 ? 0.5 : -0.5;
          const multiplier = Math.random() > 0.5 ? 1 : -1;

          rotate(
            cubeGroupRef.current,
            rotationGroupRef.current,
            axis,
            limit,
            multiplier
          );
          movesRef.current.push({ axis, limit, multiplier });

          requestAnimationFrame(() => {
            setTimeout(resolve, 800);
          });
        });
      };

      const reverseMoves = async () => {
        for (let i = movesRef.current.length - 1; i >= 0; i--) {
          const { axis, limit, multiplier } = movesRef.current[i];
          await new Promise<void>((resolve) => {
            rotate(
              cubeGroupRef.current,
              rotationGroupRef.current,
              axis,
              limit,
              -multiplier
            );

            requestAnimationFrame(() => {
              setTimeout(resolve, 800);
            });
          });
        }
      };

      const executeMoves = async () => {
        for (let i = 0; i < 12; i++) {
          await randomRotate();
        }
        await reverseMoves();
      };

      executeMoves();

      return () => {
        timeoutIdsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
      };
    }
  }, []);

  return (
    <>
      <group ref={cubeGroupRef}>
        {Array.from(Array(3).keys()).map((x) =>
          Array.from(Array(3).keys()).map((y) =>
            Array.from(Array(3).keys()).map((z) => (
              <Cubelet
                key={x + y * 3 + z * 9}
                position={[x - 1, y - 1, z - 1]}
                geometry={roundedBoxGeometry}
              />
            ))
          )
        )}
      </group>
      <group ref={rotationGroupRef} />
    </>
  );
}

function Cubelet({
  position,
  geometry,
}: {
  position: any;
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes> | undefined;
}) {
  interface TextMap {
    [key: string]: {
      [key: string]: string;
    };
  }

  const texts: TextMap = {
    blue: {
      '1,1,-1': '',
      '0,1,-1': '',
      '-1,1,-1': '',
      '1,0,-1': '',
      '0,0,-1': '',
      '-1,0,-1': '',
      '1,-1,-1': '',
      '0,-1,-1': '',
      '-1,-1,-1': '',
    },
    green: {
      '-1,1,1': 'P',
      '0,1,1': 'A',
      '1,1,1': 'B',
      '-1,0,1': 'L',
      '0,0,1': 'O',
      '1,0,1': '',
      '-1,-1,1': '',
      '0,-1,1': '',
      '1,-1,1': '',
    },
    darkorange: {
      '1,1,1': 'T',
      '1,1,0': 'I',
      '1,1,-1': 'L',
      '1,0,1': 'L',
      '1,0,0': 'I',
      '1,0,-1': '',
      '1,-1,1': '',
      '1,-1,0': '',
      '1,-1,-1': '',
    },
    white: {
      '-1,1,-1': 'P',
      '0,1,-1': 'O',
      '1,1,-1': 'R',
      '-1,1,0': 'T',
      '0,1,0': 'F',
      '1,1,0': 'O',
      '-1,1,1': 'L',
      '0,1,1': 'I',
      '1,1,1': 'O',
    },
    red: {
      '-1,1,-1': '',
      '-1,1,0': '',
      '-1,1,1': '',

      '-1,0,-1': '',
      '-1,0,0': '',
      '-1,0,1': '',

      '-1,-1,-1': '',
      '-1,-1,0': '',
      '-1,-1,1': '',
    },
    yellow: {
      '-1,-1,1': '',
      '0,-1,1': '',
      '1,-1,1': '',
      '-1,-1,0': '',
      '0,-1,0': '',
      '1,-1,0': '',
      '-1,-1,-1': '',
      '0,-1,-1': '',
      '1,-1,-1': '',
    },
  };

  return (
    <mesh position={position} geometry={geometry}>
      {Array.from(Array(6).keys()).map((i) => {
        const color =
          position[colorSides[i][0]] === colorSides[i][1]
            ? colorSides[i][2]
            : `black`;

        return (
          <React.Fragment key={i}>
            <meshStandardMaterial attach={`material-${i}`} color={color} />
            {color === 'green' && (
              <Text
                position={[0, 0, 0.53]}
                rotation={[0, 0, 0]}
                fontSize={0.2}
                color="black"
              >
                {texts.green[position.join()]}
              </Text>
            )}
            {color === 'blue' && (
              <Text
                position={[0, 0, -0.53]}
                rotation={[0, Math.PI, 0]}
                fontSize={0.2}
                color="black"
              >
                {texts.blue[position.join()]}
              </Text>
            )}
            {color === 'darkorange' && (
              <Text
                position={[0.53, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
                fontSize={0.2}
                color="black"
              >
                {texts.darkorange[position.join()]}
              </Text>
            )}
            {color === 'red' && (
              <Text
                position={[-0.53, 0, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                fontSize={0.2}
                color="black"
              >
                {texts.red[position.join()]}
              </Text>
            )}
            {color === 'white' && (
              <Text
                position={[0, 0.53, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.2}
                color="black"
              >
                {texts.white[position.join()]}
              </Text>
            )}
            {color === 'yellow' && (
              <Text
                position={[0, -0.53, 0]}
                rotation={[Math.PI / 2, 0, 0]}
                fontSize={0.2}
                color="black"
              >
                {texts.yellow[position.join()]}
              </Text>
            )}
          </React.Fragment>
        );
      })}
    </mesh>
  );
}

function resetCubeGroup(
  cubeGroup: THREE.Group<THREE.Object3DEventMap>,
  rotationGroup: THREE.Group<THREE.Object3DEventMap>
) {
  if (rotationGroup) {
    rotationGroup.children
      .slice()
      .reverse()
      .forEach(function (c) {
        cubeGroup.attach(c);
      });
    rotationGroup.quaternion.set(0, 0, 0, 1);
  }
}

function attachToRotationGroup(
  cubeGroup: THREE.Group<THREE.Object3DEventMap>,
  rotationGroup: THREE.Group<THREE.Object3DEventMap>,
  axis: 'x' | 'y' | 'z',
  limit: number
) {
  if (cubeGroup) {
    cubeGroup.children
      .slice()
      .reverse()
      .filter(function (c) {
        return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit;
      })
      .forEach(function (c) {
        rotationGroup.attach(c);
      });
  }
}

function animateRotationGroup(
  rotationGroup: THREE.Group<THREE.Object3DEventMap>,
  axis: 'x' | 'y' | 'z',
  multiplier: number
) {
  if (rotationGroup) {
    new TWEEN.Tween(rotationGroup.rotation)
      .to(
        {
          [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier,
        },
        250
      )
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();
  }
}

function rotate(
  cubeGroup: THREE.Group<THREE.Object3DEventMap>,
  rotationGroup: THREE.Group<THREE.Object3DEventMap>,
  axis: 'x' | 'y' | 'z',
  limit: number,
  multiplier: number
) {
  if (!TWEEN.getAll().length) {
    resetCubeGroup(cubeGroup, rotationGroup);
    attachToRotationGroup(cubeGroup, rotationGroup, axis, limit);
    animateRotationGroup(rotationGroup, axis, multiplier);
  }
}

export function CameraAnimation() {
  const targetPositions = [
    { position: [6, 0, 0], lookAt: [0, 1, 0] }, // White
    { position: [0, 6, 0], lookAt: [0, 0, 1] }, // Green
    { position: [0, 0, 6], lookAt: [1, 0, 0] }, // Orange
  ];
  const targetIndex = useRef(0);
  const changeTime = 5000;
  const startTime = useRef(Date.now());

  useFrame((state) => {
    const elapsedTime = Date.now() - startTime.current;
    const nextIndex = (targetIndex.current + 1) % targetPositions.length;

    if (elapsedTime > changeTime) {
      targetIndex.current = nextIndex;
      startTime.current = Date.now();
    }

    const t = (elapsedTime % changeTime) / changeTime;
    const current = targetPositions[targetIndex.current];
    const next = targetPositions[nextIndex];

    state.camera.position.lerpVectors(
      new THREE.Vector3().fromArray(current.position),
      new THREE.Vector3().fromArray(next.position),
      t
    );
    state.camera.lookAt(
      new THREE.Vector3().lerpVectors(
        new THREE.Vector3().fromArray(current.lookAt),
        new THREE.Vector3().fromArray(next.lookAt),
        t
      )
    );
  });

  return null;
}

export default Cube;
