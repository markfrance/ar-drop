import * as React from 'react';
import { Animated, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  scrollAmount: Animated.Value;
}

export const BezierCurve = ({ scrollAmount }: Props) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: -790,
        left: 0,
        opacity: 0.8,
        zIndex: -1,
        transform: [
          {
            translateY: scrollAmount,
          },
        ],
      }}
    >
      <Svg
        width={Dimensions.get('window').width}
        height={1308}
        viewBox="0 0 825 1308"
      >
        <Path
          d="M0 181.615c3.252.4 6.48.974 9.67 1.72 43.07 12.29 86 25.23 129.2 36.86 30.4 8.17 61.16 15.17 92 21.59 21.54 4.49 43.4 7.75 65.25 10.36a546.99 546.99 0 0 0 57 3.92c26.83.36 50.57-8 70.64-26.92 16.1-15.19 29.17-32.62 41.72-50.54 17.91-25.56 34.87-51.8 53.31-77 13.39-18.28 27-36.49 44.42-51.53 25.67-22.08 54.66-37.19 87.67-44.89a195.85 195.85 0 0 1 58.39-4.71c35 2.44 67.68 12.82 97 32.56 6.17 4.15 11.84 9 17.74 13.58v262H0v-127z"
          fill="#f8cfa0"
        />
        <Path d="M0 308h824v1200H0V308z" fill="#f8cfa0" />
      </Svg>
    </Animated.View>
  );
};