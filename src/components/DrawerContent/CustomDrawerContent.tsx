/**
 * CustomDrawerContent — Custom drawer matching the IITPK web app sidebar.
 * Shows IITPK-DEV header, menu items with icons, dark mode toggle, and logout.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontSize, FontWeight, Spacing, BorderRadius } from '../../constants';
import { useAuth } from '../../store/AuthContext';
import { useTheme } from '../../store/ThemeContext';
import type { DrawerMenuItem } from '../../types';

const menuItems: DrawerMenuItem[] = [
  { name: 'Dashboard', label: 'Dashboard', icon: 'view-dashboard-outline' },
  { name: 'Courses', label: 'Courses', icon: 'book-open-page-variant-outline' },
  { name: 'AIFaculty', label: 'AI Faculty', icon: 'robot-outline' },
  { name: 'RemedialLearning', label: 'Remedial Learning', icon: 'auto-fix' },
];

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { logout } = useAuth();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(colors);
  const insets = useSafeAreaInsets();

  const currentRoute = props.state.routes[props.state.index]?.name;

  const handleNavigation = (routeName: string) => {
    props.navigation.navigate(routeName);
  };

  const handleLogout = () => {
    props.navigation.closeDrawer();
    logout();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoText}>iiTPK</Text>
          </View>
          <Text style={styles.headerTitle}>IITPK-DEV</Text>
        </View>
        <TouchableOpacity style={styles.collapseButton}>
          <Icon name="dock-window" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const isActive = currentRoute === item.name;
            return (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.menuItem,
                  isActive && styles.menuItemActive,
                ]}
                onPress={() => handleNavigation(item.name)}
                activeOpacity={0.7}>
                <Icon
                  name={item.icon}
                  size={22}
                  color={isActive ? colors.activeBlue : colors.textSecondary}
                  style={styles.menuIcon}
                />
                <Text
                  style={[
                    styles.menuLabel,
                    isActive && styles.menuLabelActive,
                  ]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </DrawerContentScrollView>

      {/* Bottom Section */}
      <View style={[styles.bottomSection, { paddingBottom: insets.bottom + Spacing.base }]}>
        {/* Dark Mode Toggle */}
        <View style={styles.darkModeRow}>
          <Icon name={isDarkMode ? 'weather-sunny' : 'weather-night'} size={22} color={colors.textSecondary} />
          <Text style={styles.darkModeLabel}>Dark Mode</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleEmoji}>{isDarkMode ? '🌙' : '☀️'}</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: colors.toggleInactive, true: colors.activeBlue }}
              thumbColor={colors.backgroundWhite}
              style={styles.toggle}
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}>
          <Icon name="logout" size={22} color={colors.accent} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: colors.textWhite,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semiBold,
    color: colors.textPrimary,
    marginLeft: Spacing.md,
  },
  collapseButton: {
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: BorderRadius.sm,
  },
  scrollContent: {
    paddingTop: Spacing.md,
  },
  menuContainer: {
    paddingHorizontal: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
  },
  menuItemActive: {
    backgroundColor: colors.activeBlueBg,
  },
  menuIcon: {
    marginRight: Spacing.md,
  },
  menuLabel: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: colors.textSecondary,
  },
  menuLabelActive: {
    color: colors.activeBlue,
    fontWeight: FontWeight.semiBold,
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  darkModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  darkModeLabel: {
    fontSize: FontSize.base,
    color: colors.textSecondary,
    fontWeight: FontWeight.medium,
    marginLeft: Spacing.md,
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleEmoji: {
    fontSize: 16,
    marginRight: Spacing.xs,
  },
  toggle: {
    transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  logoutText: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.medium,
    color: colors.accent,
    marginLeft: Spacing.md,
  },
});

export default CustomDrawerContent;
