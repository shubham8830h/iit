/**
 * Header — App header with hamburger menu, title, optional subtitle, and avatar.
 * Matches the IITPK web app dashboard header layout.
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../constants';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onMenuPress: () => void;
  avatarInitials?: string;
  rightIcon?: string;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onMenuPress,
  avatarInitials,
  rightIcon,
  onRightPress,
}) => {
  const renderRight = () => {
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
          <Icon name={rightIcon} size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      );
    }
    return <View style={styles.placeholder} />;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onMenuPress}
        style={styles.menuButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Icon name="menu" size={26} color={Colors.textPrimary} />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
    elevation: 2,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  menuButton: {
    padding: Spacing.xs,
    marginRight: Spacing.sm,
  },
  titleBlock: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: 26,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 1,
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textWhite,
    letterSpacing: 0.5,
  },
  rightButton: {
    padding: Spacing.xs,
  },
  placeholder: {
    width: 38,
  },
});

export default Header;
