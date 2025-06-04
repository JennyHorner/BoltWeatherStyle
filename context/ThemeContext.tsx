import React, { createContext, useState, useContext, useEffect } from 'react';
import { Platform, ColorSchemeName, useColorScheme as _useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the theme type
type ThemeType = 'light' | 'dark';

// Define the context type
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
}

// Create context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

// Hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Get platform-specific color scheme
const useColorScheme = (): ColorSchemeName => {
  return _useColorScheme() as ColorSchemeName;
};

// Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get system theme preference
  const colorScheme = useColorScheme();
  
  // Use dark theme as default
  const [theme, setTheme] = useState<ThemeType>('dark');
  
  // Load saved theme on initial render
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('userTheme');
        if (savedTheme) {
          setTheme(savedTheme as ThemeType);
        } else {
          // Use system preference if no saved theme
          setTheme(colorScheme === 'dark' ? 'dark' : 'light');
        }
      } catch (error) {
        console.log('Failed to load saved theme:', error);
      }
    };
    
    loadSavedTheme();
  }, [colorScheme]);
  
  // Toggle between light and dark themes
  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Save theme preference
    try {
      await AsyncStorage.setItem('userTheme', newTheme);
    } catch (error) {
      console.log('Failed to save theme preference:', error);
    }
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};