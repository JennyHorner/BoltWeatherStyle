import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { COLORS, SPACING } from '@/styles/theme';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Cloud, CloudRain } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function LoadingScreen() {
  const { theme } = useTheme();
  const backgroundColor = theme === 'dark' ? '#121212' : '#f7f7f7';
  const textColor = theme === 'dark' ? COLORS.text : '#333333';
  
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  
  const translateY1 = useSharedValue(20);
  const translateY2 = useSharedValue(20);
  const translateY3 = useSharedValue(20);
  
  const rotation = useSharedValue(0);
  
  useEffect(() => {
    // First icon animation
    opacity1.value = withTiming(1, { duration: 800 });
    translateY1.value = withTiming(0, { duration: 800 });
    
    // Second icon animation (with delay)
    opacity2.value = withDelay(
      300,
      withTiming(1, { duration: 800 })
    );
    translateY2.value = withDelay(
      300,
      withTiming(0, { duration: 800 })
    );
    
    // Third icon animation (with more delay)
    opacity3.value = withDelay(
      600,
      withTiming(1, { duration: 800 })
    );
    translateY3.value = withDelay(
      600,
      withTiming(0, { duration: 800 })
    );
    
    // Rotation animation
    rotation.value = withRepeat(
      withTiming(360, { duration: 6000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);
  
  const iconStyle1 = useAnimatedStyle(() => {
    return {
      opacity: opacity1.value,
      transform: [{ translateY: translateY1.value }],
    };
  });
  
  const iconStyle2 = useAnimatedStyle(() => {
    return {
      opacity: opacity2.value,
      transform: [{ translateY: translateY2.value }],
    };
  });
  
  const iconStyle3 = useAnimatedStyle(() => {
    return {
      opacity: opacity3.value,
      transform: [{ translateY: translateY3.value }, { rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.iconContainer}>
        <Animated.View style={[styles.icon, iconStyle1]}>
          <CloudRain size={48} color={COLORS.secondary} />
        </Animated.View>
        
        <Animated.View style={[styles.icon, iconStyle2]}>
          <Cloud size={48} color={COLORS.primary} />
        </Animated.View>
        
        <Animated.View style={[styles.icon, iconStyle3]}>
          <Sun size={48} color={COLORS.accent} />
        </Animated.View>
      </View>
      
      <Text style={[styles.loadingText, { color: textColor }]}>
        Forecasting your fashion...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  icon: {
    marginHorizontal: SPACING.sm,
  },
  loadingText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 18,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
});