import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { COLORS, SPACING } from '@/styles/theme';
import { Weather } from '@/types';
import { getDialectSummary } from '@/utils/dialectUtils';
import { getOutfitSuggestion } from '@/utils/outfitUtils';
import { useSavedOutfits } from '@/hooks/useSavedOutfits';
import { Bookmark, BookmarkCheck } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface FashionSuggestionProps {
  weather: Weather;
  location: string;
}

export default function FashionSuggestion({ weather, location }: FashionSuggestionProps) {
  const { theme } = useTheme();
  const [saved, setSaved] = useState(false);
  const { saveOutfit, isSaved, removeSavedOutfit } = useSavedOutfits();
  
  const scale = useSharedValue(1);
  
  const backgroundColor = theme === 'dark' ? '#1e1e1e' : '#ffffff';
  const textColor = theme === 'dark' ? COLORS.text : '#333333';
  
  const dialectSummary = getDialectSummary(weather, location);
  const outfitSuggestion = getOutfitSuggestion(weather);
  
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handleSave = () => {
    if (isSaved(location, weather.condition)) {
      // Remove from saved
      removeSavedOutfit(location + weather.condition);
      setSaved(false);
    } else {
      // Save outfit
      const outfitId = location + weather.condition;
      saveOutfit({
        id: outfitId,
        location,
        weatherSummary: dialectSummary,
        weatherType: getWeatherType(weather.condition),
        baseLayers: outfitSuggestion.baseLayers,
        midLayers: outfitSuggestion.midLayers,
        outerLayers: outfitSuggestion.outerLayers,
        wildcard: outfitSuggestion.wildcard,
        temperature: weather.temperature,
      });
      setSaved(true);
      
      // Animate scale
      scale.value = withTiming(1.05, { duration: 200 }, () => {
        scale.value = withTiming(1, { duration: 200 });
      });
    }
  };
  
  const getWeatherType = (condition: string): string => {
    condition = condition.toLowerCase();
    if (condition.includes('rain') || condition.includes('drizzle')) return 'rainy';
    if (condition.includes('clear') || condition.includes('sunny')) return 'sunny';
    if (weather.temperature < 10) return 'cold';
    if (weather.temperature > 20) return 'warm';
    if (weather.windSpeed > 20) return 'windy';
    return 'other';
  };

  return (
    <Animated.View 
      style={[
        styles.container, 
        { backgroundColor }, 
        cardAnimatedStyle
      ]}
      entering={FadeInDown.delay(300).duration(800)}
    >
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: textColor }]}>
            Philippa's Advice
          </Text>
          <Text style={[styles.location, { color: textColor }]}>
            {location}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          {saved || isSaved(location, weather.condition) ? (
            <BookmarkCheck size={24} color={COLORS.primary} />
          ) : (
            <Bookmark size={24} color={COLORS.secondary} />
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.summaryContainer}>
        <Text style={[styles.summary, { color: textColor }]}>
          {dialectSummary}
        </Text>
      </View>
      
      <View style={styles.outfitContainer}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Today's Ensemble
        </Text>
        
        <View style={styles.outfitSection}>
          <Text style={[styles.layerTitle, { color: textColor }]}>Base Layers</Text>
          <Text style={[styles.layerText, { color: textColor }]}>{outfitSuggestion.baseLayers}</Text>
        </View>
        
        <View style={styles.outfitSection}>
          <Text style={[styles.layerTitle, { color: textColor }]}>Mid Layers</Text>
          <Text style={[styles.layerText, { color: textColor }]}>{outfitSuggestion.midLayers}</Text>
        </View>
        
        <View style={styles.outfitSection}>
          <Text style={[styles.layerTitle, { color: textColor }]}>Outer Layers</Text>
          <Text style={[styles.layerText, { color: textColor }]}>{outfitSuggestion.outerLayers}</Text>
        </View>
        
        <View style={styles.outfitSection}>
          <Text style={[styles.layerTitle, { color: textColor }]}>Wildcard</Text>
          <Text style={[styles.layerText, { color: textColor }]}>{outfitSuggestion.wildcard}</Text>
        </View>
      </View>
      
      <View style={styles.flourishContainer}>
        <Text style={[styles.flourish, { color: COLORS.secondary }]}>
          {outfitSuggestion.flourish}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - SPACING.lg * 2,
    borderRadius: 20,
    marginHorizontal: SPACING.lg,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 22,
    marginBottom: 4,
  },
  location: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
    opacity: 0.8,
  },
  saveButton: {
    padding: 4,
  },
  summaryContainer: {
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
  },
  summary: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  outfitContainer: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    marginBottom: SPACING.sm,
  },
  outfitSection: {
    marginBottom: SPACING.sm,
  },
  layerTitle: {
    fontFamily: 'SourceSerifPro-SemiBold',
    fontSize: 16,
    marginBottom: 4,
  },
  layerText: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  flourishContainer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(150, 150, 150, 0.2)',
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
  },
  flourish: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});