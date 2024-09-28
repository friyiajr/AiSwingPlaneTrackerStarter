import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useXContext } from './context';

import {
  Canvas,
  fitbox,
  Image,
  LinearGradient,
  Path,
  rect,
  Skia,
  useVideo,
  vec,
} from '@shopify/react-native-skia';
import { useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('screen');

const ADJUST_Y = -5;
const ADJUST_X = 15;

interface Point {
  x: number;
  y: number;
}

export const distance = (p1: Point, p2: Point) => {
  'worklet';
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
};

export default function Details() {
  const { videoFile, observations } = useXContext();

  const paused = useSharedValue(true);
  const seek = useSharedValue(1);
  const looping = useSharedValue(false);
  const volume = useSharedValue(0);

  const { currentFrame, rotation, size, currentTime } = useVideo(videoFile, {
    paused,
    seek,
    looping,
    volume,
  });

  useEffect(() => {
    paused.value = false;
    setTimeout(() => {
      paused.value = true;
    }, 250);
  }, []);

  const onRestartPressed = () => {
    paused.value = true;
    seek.value = 1;

    setTimeout(() => {
      paused.value = false;
    }, 300);
  };

  const path = useDerivedValue(() => {
    const path = Skia.Path.Make();

    const firstPoint = {
      x: observations[0].x - ADJUST_X,
      y: observations[0].y - ADJUST_Y,
    };
    path.moveTo(firstPoint.x, firstPoint.y);

    for (const obs of observations) {
      const frameTime = Number(obs.frameTime) + 0.1;

      const d = distance(
        {
          x: obs.x - ADJUST_X,
          y: obs.y - ADJUST_Y,
        },
        firstPoint
      );

      if (Number(frameTime) * 1000 <= currentTime.value) {
        path.lineTo(obs.x - ADJUST_X, obs.y - ADJUST_Y);
        if (d < 50 && Number(frameTime) * 1000 > 1000) {
          return path;
        }
      }
    }

    return path;
  }, [currentTime]);

  const src = rect(0, 0, size.width, size.height);
  const dst = rect(0, 0, width, height);
  const transform = fitbox('fill', src, dst, rotation);

  return (
    <>
      <Canvas style={StyleSheet.absoluteFill}>
        <Image
          image={currentFrame}
          x={0}
          y={0}
          width={size.height + height}
          height={width * 3}
          fit="cover"
          transform={transform}
        />
        <Path strokeCap="round" path={path} color="red" style="stroke" strokeWidth={8}>
          <LinearGradient start={vec(0, 100)} end={vec(600, 500)} colors={['#D60000', '#FFFDD0']} />
        </Path>
      </Canvas>
      <TouchableOpacity style={styles.button} onPress={onRestartPressed}>
        <Text style={styles.buttonText}>Start Video</Text>
      </TouchableOpacity>
    </>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '700',
  },
  button: {
    backgroundColor: 'purple',
    height: 60,
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
