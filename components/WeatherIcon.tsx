import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  Cloudy,
  CloudDrizzle,
} from 'lucide-react-native';
import { COLORS } from '@/styles/theme';

interface WeatherIconProps {
  condition: string;
  size?: number;
  color?: string;
}

export function WeatherIcon({ condition, size = 48, color = '#ffffff' }: WeatherIconProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);
  
  // Convert condition to lowercase for case-insensitive matching
  const lowerCondition = condition.toLowerCase();
  
  useEffect(() => {
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
      // Sun rotation animation
      rotation.value = withRepeat(
        withTiming(360, { duration: 10000, easing: Easing.linear }),
        -1, // repeat infinitely
        false
      );
    } else if (
      lowerCondition.includes('rain') || 
      lowerCondition.includes('drizzle') ||
      lowerCondition.includes('shower')
    ) {
      // Rain bounce animation
      translateY.value = withRepeat(
        withTiming(5, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else if (
      lowerCondition.includes('cloud') || 
      lowerCondition.includes('overcast') ||
      lowerCondition.includes('fog')
    ) {
      // Cloud float animation
      translateY.value = withRepeat(
        withTiming(3, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('lightning')) {
      // Lightning pulse animation
      scale.value = withRepeat(
        withDelay(
          1000,
          withTiming(1.2, { duration: 300, easing: Easing.elastic(1) })
        ),
        -1,
        true
      );
    }
  }, [condition]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });
  
  const renderIcon = () => {
    if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) {
      return <Sun size={size} color={COLORS.accent} />;
    } else if (lowerCondition.includes('rain')) {
      return <CloudRain size={size} color={color} />;
    } else if (lowerCondition.includes('drizzle')) {
      return <CloudDrizzle size={size} color={color} />;
    } else if (lowerCondition.includes('snow')) {
      return <CloudSnow size={size} color={color} />;
    } else if (lowerCondition.includes('fog') || lowerCondition.includes('mist')) {
      return <CloudFog size={size} color={color} />;
    } else if (lowerCondition.includes('thunder') || lowerCondition.includes('lightning')) {
      return <CloudLightning size={size} color={color} />;
    } else if (lowerCondition.includes('overcast')) {
      return <Cloudy size={size} color={color} />;
    } else if (lowerCondition.includes('cloud')) {
      return <Cloud size={size} color={color} />;
    } else {
      // Default fallback
      return <Cloudy size={size} color={color} />;
    }
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {renderIcon()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});