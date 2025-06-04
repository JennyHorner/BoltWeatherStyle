import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Platform, 
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import WeatherCard from '@/components/WeatherCard';
import FashionSuggestion from '@/components/FashionSuggestion';
import LocationSearch from '@/components/LocationSearch';
import { COLORS, SPACING } from '@/styles/theme';
import { useWeather } from '@/hooks/useWeather';
import LoadingScreen from '@/components/LoadingScreen';
import Animated, { 
  useSharedValue, 
  useAnimatedScrollHandler,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { theme } = useTheme();
  const scrollY = useSharedValue(0);
  const [refreshing, setRefreshing] = useState(false);
  
  const { 
    weather, 
    location, 
    loading, 
    fetchWeatherData, 
    setLocation 
  } = useWeather();

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWeatherData();
    setRefreshing(false);
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100],
      [0, 1],
      'clamp'
    );
    
    return {
      opacity,
      backgroundColor: `rgba(26, 26, 26, ${opacity})`,
    };
  });

  if (loading && !weather) {
    return <LoadingScreen />;
  }

  const backgroundColor = theme === 'dark' ? '#121212' : '#f7f7f7';
  const textColor = theme === 'dark' ? COLORS.text : '#333333';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.headerBackground, headerAnimatedStyle]} />
      
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>
          Philippa Gust
        </Text>
        <Text style={[styles.subtitle, { color: textColor }]}>
          Weather & Wardrobe Advisor
        </Text>
      </View>
      
      <LocationSearch 
        location={location} 
        onLocationChange={setLocation}
      />
      
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {weather && (
          <>
            <WeatherCard weather={weather} />
            <FashionSuggestion weather={weather} location={location} />
          </>
        )}
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === 'ios' ? 120 : 100,
    zIndex: 1,
  },
  header: {
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    zIndex: 2,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
    marginTop: SPACING.xs,
  },
  scrollContent: {
    paddingBottom: 100,
  },
});