import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Cloud, Home, User } from 'lucide-react-native';
import { useFonts } from 'expo-font';
import { 
  PlayfairDisplay_400Regular, 
  PlayfairDisplay_700Bold 
} from '@expo-google-fonts/playfair-display';
import { 
  SourceSerifPro_400Regular,
  SourceSerifPro_600SemiBold 
} from '@expo-google-fonts/source-serif-pro';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { COLORS } from '@/styles/theme';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'PlayfairDisplay-Regular': PlayfairDisplay_400Regular,
    'PlayfairDisplay-Bold': PlayfairDisplay_700Bold,
    'SourceSerifPro-Regular': SourceSerifPro_400Regular,
    'SourceSerifPro-SemiBold': SourceSerifPro_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Return null to keep splash screen visible while fonts load
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingBottom: Platform.OS === 'ios' ? 25 : 10,
        },
        tabBarLabelStyle: {
          fontFamily: 'SourceSerifPro-Regular',
          fontSize: 12,
          marginTop: -5,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="wardrobe"
        options={{
          title: 'Wardrobe',
          tabBarIcon: ({ color, size }) => (
            <Cloud size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={1.5} />
          ),
        }}
      />
    </Tabs>
  );
}