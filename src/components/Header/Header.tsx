/**
 * Header — App header with hamburger menu, title, optional subtitle, and avatar.
 * Matches the IITPK web app dashboard header layout.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSize, FontWeight, Spacing, BorderRadius } from '../../constants';
import { useTheme } from '../../store/ThemeContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuPress: () => void;
  avatarInitials?: string;
  rightIcon?: string;
  onRightPress?: () => void;
  rightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onMenuPress,
  avatarInitials,
  rightIcon,
  onRightPress,
  rightComponent,
}) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const renderRight = () => {
    if (rightComponent) return rightComponent;
    if (avatarInitials) {
      return (
        <TouchableOpacity style={styles.avatarButton} onPress={onRightPress} activeOpacity={0.8}>
          <Text style={styles.avatarText}>{avatarInitials}</Text>
        </TouchableOpacity>
      );
    }
    if (rightIcon) {
      return (
        <TouchableOpacity
          onPress={onRightPress}
          style={styles.rightButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Icon name={rightIcon} size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      );
    }
    return <View style={styles.placeholder} />;
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onMenuPress}
          style={styles.menuButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Icon name="dock-left" size={24} color="#64748B" />
        </TouchableOpacity>

        <View style={styles.titleBlock}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {renderRight()}
      </View>
    </View>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  wrapper: {
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.backgroundWhite,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: colors.backgroundWhite,
  },
  titleBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
  avatarButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#63B1D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  rightButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundLight,
  },
  placeholder: {
    width: 44,
  },
});

export default Header;
