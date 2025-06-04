import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { COLORS, SPACING } from '@/styles/theme';
import { Search, MapPin, X } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useFavoriteLocations } from '@/hooks/useFavoriteLocations';

const { width } = Dimensions.get('window');

interface LocationSearchProps {
  location: string;
  onLocationChange: (location: string) => void;
}

export default function LocationSearch({ location, onLocationChange }: LocationSearchProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavoriteLocations();
  
  const textColor = theme === 'dark' ? COLORS.text : '#333333';
  const backgroundColor = theme === 'dark' ? '#1e1e1e' : '#ffffff';
  const placeholderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
  
  // Mock search results - in a real app, this would come from an API
  const mockSearchResults = [
    'Edinburgh, UK',
    'London, UK',
    'Bristol, UK',
    'York, UK',
    'Glasgow, UK',
  ];
  
  const filteredResults = mockSearchResults.filter(result =>
    result.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationSelect = (selectedLocation: string) => {
    onLocationChange(selectedLocation);
    setSearchQuery('');
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.searchContainer, 
          { backgroundColor },
          isSearching && styles.searchContainerActive
        ]}
      >
        <Search size={20} color={COLORS.primary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Search location..."
          placeholderTextColor={placeholderColor}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={() => setIsSearching(true)}
          onBlur={() => setTimeout(() => setIsSearching(false), 150)}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <X size={16} color={textColor} />
          </TouchableOpacity>
        )}
      </View>

      {isSearching && searchQuery.length > 0 && (
        <View style={[styles.resultsContainer, { backgroundColor }]}>
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <TouchableOpacity
                key={index}
                style={styles.resultItem}
                onPress={() => handleLocationSelect(result)}
              >
                <MapPin size={16} color={COLORS.primary} style={styles.resultIcon} />
                <Text style={[styles.resultText, { color: textColor }]}>{result}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={[styles.noResults, { color: textColor }]}>
              No locations found
            </Text>
          )}
        </View>
      )}

      {!isSearching && favorites.length > 0 && (
        <View style={styles.favoritesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favoritesList}
          >
            {favorites.map((favorite, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.favoriteItem,
                  location === favorite && styles.activeFavorite,
                ]}
                onPress={() => handleLocationSelect(favorite)}
              >
                <MapPin
                  size={14}
                  color={location === favorite ? '#fff' : COLORS.primary}
                  style={styles.favoriteIcon}
                />
                <Text
                  style={[
                    styles.favoriteText,
                    { color: location === favorite ? '#fff' : textColor },
                  ]}
                  numberOfLines={1}
                >
                  {favorite.split(',')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

// Import ScrollView at the top of the file
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    zIndex: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: SPACING.sm,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainerActive: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  searchIcon: {
    marginRight: SPACING.xs,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
  },
  clearButton: {
    padding: 5,
  },
  resultsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    borderRadius: 12,
    padding: SPACING.sm,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    maxHeight: 200,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  resultIcon: {
    marginRight: SPACING.sm,
  },
  resultText: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
  },
  noResults: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
    padding: SPACING.sm,
    textAlign: 'center',
    opacity: 0.7,
  },
  favoritesContainer: {
    marginTop: SPACING.sm,
  },
  favoritesList: {
    paddingVertical: SPACING.xs,
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 20,
    marginRight: SPACING.sm,
  },
  activeFavorite: {
    backgroundColor: COLORS.primary,
  },
  favoriteIcon: {
    marginRight: 4,
  },
  favoriteText: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 14,
    maxWidth: 100,
  },
});