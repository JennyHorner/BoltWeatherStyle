import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  ScrollView,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { COLORS, SPACING } from '@/styles/theme';
import { 
  Sun, 
  Moon, 
  Settings, 
  Bell, 
  CloudRain,
  User,
  MessageSquare,
  Info,
  AlertCircle,
  Share2,
} from 'lucide-react-native';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dialectsEnabled, setDialectsEnabled] = useState(true);
  
  const backgroundColor = theme === 'dark' ? '#121212' : '#f7f7f7';
  const cardBgColor = theme === 'dark' ? '#1e1e1e' : '#ffffff';
  const textColor = theme === 'dark' ? COLORS.text : '#333333';
  
  const handleToggleTheme = () => {
    toggleTheme();
  };

  const openAbout = () => {
    // Navigate to about screen or show modal
  };

  const openFeedback = () => {
    Linking.openURL('mailto:feedback@philippagust.com');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>Settings</Text>
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.section, { backgroundColor: cardBgColor }]}>
          <View style={styles.sectionHeader}>
            <Settings size={20} color={COLORS.primary} />
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              Preferences
            </Text>
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              {theme === 'dark' ? (
                <Moon size={20} color={COLORS.primary} />
              ) : (
                <Sun size={20} color={COLORS.accent} />
              )}
              <Text style={[styles.settingText, { color: textColor }]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={theme === 'dark'}
              onValueChange={handleToggleTheme}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell size={20} color={COLORS.secondary} />
              <Text style={[styles.settingText, { color: textColor }]}>
                Weather Notifications
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <CloudRain size={20} color={COLORS.accent} />
              <Text style={[styles.settingText, { color: textColor }]}>
                Use Regional Dialects
              </Text>
            </View>
            <Switch
              value={dialectsEnabled}
              onValueChange={setDialectsEnabled}
              trackColor={{ false: '#767577', true: COLORS.primary }}
              thumbColor="#f4f3f4"
            />
          </View>
        </View>
        
        <View style={[styles.section, { backgroundColor: cardBgColor }]}>
          <View style={styles.sectionHeader}>
            <User size={20} color={COLORS.primary} />
            <Text style={[styles.sectionTitle, { color: textColor }]}>
              About Philippa
            </Text>
          </View>
          
          <TouchableOpacity style={styles.linkItem} onPress={openAbout}>
            <View style={styles.settingInfo}>
              <Info size={20} color={COLORS.primary} />
              <Text style={[styles.settingText, { color: textColor }]}>
                About This App
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem} onPress={openFeedback}>
            <View style={styles.settingInfo}>
              <MessageSquare size={20} color={COLORS.secondary} />
              <Text style={[styles.settingText, { color: textColor }]}>
                Send Feedback
              </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.linkItem}>
            <View style={styles.settingInfo}>
              <Share2 size={20} color={COLORS.accent} />
              <Text style={[styles.settingText, { color: textColor }]}>
                Share With Friends
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: textColor }]}>
            Philippa Gust v1.0.0
          </Text>
          <Text style={[styles.footerSubtext, { color: textColor, opacity: 0.7 }]}>
            Weather & Wardrobe Advisor
          </Text>
          <Text style={[styles.footerSubtext, { color: textColor, opacity: 0.7 }]}>
            © 2025 East Lothian Meteorological Fashion
          </Text>
        </View>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: 120,
  },
  section: {
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize: 18,
    marginLeft: SPACING.sm,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  linkItem: {
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.1)',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 16,
    marginLeft: SPACING.sm,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    fontFamily: 'PlayfairDisplay-Regular',
    fontSize: 16,
    marginBottom: 4,
  },
  footerSubtext: {
    fontFamily: 'SourceSerifPro-Regular',
    fontSize: 14,
    marginBottom: 4,
  },
});