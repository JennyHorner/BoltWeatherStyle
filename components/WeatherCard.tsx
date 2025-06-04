import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeIn, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { COLORS, SPACING } from '@/styles/theme';
import { WeatherIcon } from './WeatherIcon';
import { Weather } from '@/types';

const { width } = Dimensions.get('window');

interface WeatherCardProps {
  weather: Weather;
}

export default function WeatherCard({ weather }: WeatherCardProps) {
  const { theme } = useTheme();
  
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(0, {
            damping: 15,
            stiffness: 100,
          }),
        },
      ],
    };
  });
  
  const getGradientColors = () => {
    const condition = weather.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      return theme === 'dark' 
        ? ['#283048', '#405070'] 
        : ['#5c728d', '#8ea1c2'];
    } else if (condition.includes('clear') || condition.includes('sunny')) {
      return theme === 'dark'
        ? ['#FF416C', '#FF4B2B']
        : ['#FDBB2D', '#FF9800'];
    } else if (condition.includes('cloud')) {
      return theme === 'dark'
        ? ['#2c3e50', '#4b6a8a']
        : ['#5D8CAE', '#79A7C9'];
    } else if (condition.includes('snow')) {
      return theme === 'dark'
        ? ['#274060', '#556F99']
        : ['#7F9DB9', '#A4C2E0'];
    } else {
      return theme === 'dark'
        ? ['#1E293B', '#334155']
        : ['#E0E0E0', '#F0F0F0'];
    }
  };

  return (
    <Animated.View 
      style={[styles.container, cardAnimatedStyle]}
      entering={FadeIn.duration(800)}
    >
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.weatherContainer}>
          <View style={styles.weatherIcon}>
            <WeatherIcon condition={weather.condition} size={80} />
          </View>
          
          <View style={styles.weatherInfo}>
            <Text style={styles.temperature}>
              {Math.round(weather.temperature)}°C
            </Text>
            <Text style={styles.condition}>
              {weather.condition}
            </Text>
            <Text style={styles.feelsLike}>
              Feels like {Math.round(weather.feelsLike)}°C
            </Text>
          </View>
        </View>
        
        <View style={styles.weatherDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{weather.humidity}%</Text>
            <Text style={styles.detailLabel}>Humidity</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{weather.windSpeed} km/h</Text>
            <Text style={styles.detailLabel}>Wind</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailValue}>{weather.precipitation}%</Text>
            <Text style={styles.detailLabel}>Rain</Text>
          </View>
        </View>

        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>5-Day Forecast</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.forecastScroll}
          >
            {weather.forecast.map((day, index) => (
              <View key={index} style={styles.forecastDay}>
                <Text style={styles.forecastDayName}>{day.day}</Text>
                <WeatherIcon condition={day.condition} size={32} />
                <Text style={styles.forecastTemp}>{day.temperature}°C</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - SPACING.lg * 2,
    borderRadius: 20,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    borderRadius: 20,
    padding: SPACING.md,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  weatherIcon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  temperature: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 42,
    color: COLORS.text,
    marginBottom: 4,
  },
  condition: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: 4,
  },
  feelsLike: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 14,
    color: COLORS.text,
    opacity: 0.9,
  },
  weatherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: SPACING.md,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailValue: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 2,
  },
  detailLabel: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 12,
    color: COLORS.text,
    opacity: 0.8,
  },
  forecastContainer: {
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
    paddingTop: SPACING.md,
  },
  forecastTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  forecastScroll: {
    paddingBottom: SPACING.xs,
  },
  forecastDay: {
    alignItems: 'center',
    marginRight: SPACING.md,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: SPACING.sm,
    minWidth: 80,
  },
  forecastDayName: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 14,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  forecastTemp: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 16,
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
});