import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useXContext } from './context';

import {
  Canvas,
  Circle,
  fitbox,
  Image,
  LinearGradient,
  Path,
  rect,
  Skia,
  useVideo,
  vec,
} from '@shopify/react-native-skia';
import { useSharedValue } from 'react-native-reanimated';
import { useEffect } from 'react';

const { width, height } = Dimensions.get('screen');

export default function Details() {
  const { videoFile, observations } = useXContext();

  // const paused = useSharedValue(true);
  // const seek = useSharedValue(1);
  // const looping = useSharedValue(false);
  // const volume = useSharedValue(0);

  // const { currentFrame, rotation, size, currentTime } = useVideo(videoFile, {
  //   paused,
  //   seek,
  //   looping,
  //   volume,
  // });

  // useEffect(() => {
  //   paused.value = false;
  //   setTimeout(() => {
  //     paused.value = true;
  //   }, 250);
  // }, []);

  // const onRestartPressed = () => {
  //   paused.value = true;
  //   seek.value = 1;

  //   setTimeout(() => {
  //     paused.value = false;
  //   }, 300);
  // };

  // const src = rect(0, 0, size.width, size.height);
  // const dst = rect(0, 0, width, height);
  // const transform = fitbox('fill', src, dst, rotation);

  return (
    <>
      <Canvas style={StyleSheet.absoluteFill}>
        {observations.map((obs) => {
          return <Circle r={8} cx={obs.x} cy={obs.y} color={'red'} />;
        })}
        {/* <Image
          image={currentFrame}
          x={0}
          y={0}
          width={size.height + height}
          height={width * 3}
          fit="cover"
          transform={transform}
        /> */}
      </Canvas>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
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
