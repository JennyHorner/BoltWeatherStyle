import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  FadeIn, 
  FadeOut, 
  Layout 
} from 'react-native-reanimated';
import { useTheme } from '@/context/ThemeContext';
import { COLORS, SPACING } from '@/styles/theme';
import { Bookmark, Trash2, Plus } from 'lucide-react-native';
import { useSavedOutfits } from '@/hooks/useSavedOutfits';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CATEGORIES = [
  'All',
  'Rainy',
  'Sunny',
  'Cold',
  'Warm',
  'Windy',
];

export default function WardrobeScreen() {
  const { theme } = useTheme();
  const { savedOutfits, removeSavedOutfit } = useSavedOutfits();
  const [activeCategory, setActiveCategory] = useState('All');
  
  const backgroundColor = theme === 'dark' ? '#121212' : '#f7f7f7';
  const cardBgColor = theme === 'dark' ? '#1e1e1e' : '#ffffff';
  const textColor = theme === 'dark' ? COLORS.text : '#333333';
  
  const filteredOutfits = activeCategory === 'All' 
    ? savedOutfits 
    : savedOutfits.filter(outfit => outfit.weatherType === activeCategory.toLowerCase());

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Saved Outfits</Text>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryItem,
              activeCategory === category && {
                backgroundColor: COLORS.primary,
                borderColor: COLORS.primary,
              },
            ]}
            onPress={() => setActiveCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && { color: '#fff' },
                { color: activeCategory !== category ? textColor : '#fff' }
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.outfitsContainer}
        contentContainerStyle={styles.outfitsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredOutfits.length === 0 ? (
          <View style={styles.emptyState}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/5816615/pexels-photo-5816615.jpeg' }}
              style={styles.emptyStateImage}
              resizeMode="contain"
            />
            <Text style={[styles.emptyStateText, { color: textColor }]}>
              No saved outfits for {activeCategory.toLowerCase()} weather
            </Text>
            <TouchableOpacity 
              style={[styles.addButton, { backgroundColor: COLORS.primary }]}
              onPress={() => {/* Navigate to home */}}
            >
              <Plus size={20} color="#fff" />
              <Text style={styles.addButtonText}>Add Your First Outfit</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredOutfits.map((outfit, index) => (
            <AnimatedTouchableOpacity
              key={outfit.id}
              style={[styles.outfitCard, { backgroundColor: cardBgColor }]}
              entering={FadeIn.delay(index * 100)}
              exiting={FadeOut}
              layout={Layout.springify()}
            >
              <View style={styles.outfitHeader}>
                <View>
                  <Text style={[styles.outfitLocation, { color: textColor }]}>
                    {outfit.location}
                  </Text>
                  <Text style={[styles.outfitWeather, { color: textColor, opacity: 0.7 }]}>
                    {outfit.weatherSummary}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeSavedOutfit(outfit.id)}
                >
                  <Trash2 size={18} color={COLORS.secondary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.outfitDetails}>
                <Text style={[styles.outfitItem, { color: textColor }]}>
                  <Text style={styles.outfitLabel}>Base: </Text>
                  {outfit.baseLayers}
                </Text>
                <Text style={[styles.outfitItem, { color: textColor }]}>
                  <Text style={styles.outfitLabel}>Mid: </Text>
                  {outfit.midLayers}
                </Text>
                <Text style={[styles.outfitItem, { color: textColor }]}>
                  <Text style={styles.outfitLabel}>Outer: </Text>
                  {outfit.outerLayers}
                </Text>
                <Text style={[styles.outfitItem, { color: textColor }]}>
                  <Text style={styles.outfitLabel}>Wildcard: </Text>
                  {outfit.wildcard}
                </Text>
              </View>
            </AnimatedTouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  title: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 28,
    marginBottom: SPACING.sm,
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  categoryItem: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    marginRight: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  categoryText: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 14,
  },
  outfitsContainer: {
    flex: 1,
  },
  outfitsContent: {
    padding: SPACING.lg,
    paddingBottom: 100,
  },
  outfitCard: {
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  outfitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  outfitLocation: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    marginBottom: 4,
  },
  outfitWeather: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 14,
  },
  deleteButton: {
    padding: 4,
  },
  outfitDetails: {
    marginTop: SPACING.xs,
  },
  outfitItem: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 15,
    marginBottom: 6,
    lineHeight: 22,
  },
  outfitLabel: {
    fontFamily: 'SourceSerifPro-SemiBold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    padding: SPACING.lg,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginBottom: SPACING.md,
    borderRadius: 100,
  },
  emptyStateText: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
  },
  addButtonText: {
    fontFamily: 'SourceSerifPro-SemiBold',
    color: '#fff',
    marginLeft: 8,
  },
});