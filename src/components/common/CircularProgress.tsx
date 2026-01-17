// components/CircularProgress.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { scale } from '../scale';
import { fonts } from '../../assets/localImage';

type CircularProgressProps = {
  size?: number;
  strokeWidth?: number;
  completion: number; // percentage (0-100)
};

const getCompletionColor = (percent: number): string => {
  if (percent >= 80) return '#4caf50'; // Green
  if (percent >= 50) return '#ff9800'; // Orange
  return '#f44336';                    // Red
};

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 50,
  strokeWidth = 5,
  completion,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * completion) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke="#e6e6e6"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <Circle
          stroke={getCompletionColor(completion)}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {/* Percentage Text in Center */}
      <View style={styles.centeredText}>
        <Text style={[styles.completionText, { color: getCompletionColor(completion) }]}>
          {completion}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionText: {
    fontSize: scale(12),
    fontWeight: '400',
    fontFamily:fonts.REGULAR
  },
});

export default CircularProgress;
