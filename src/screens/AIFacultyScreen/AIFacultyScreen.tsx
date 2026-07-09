/**
 * AIFacultyScreen — Pixel-perfect replica of the AI Faculty chat screen.
 * Dark Mode compatible.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
} from 'react-native';
import { DrawerActions, useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../store/ThemeContext';
import { moderateScale, scale, verticalScale } from '../../utils';

const AIFacultyScreen: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors, isDarkMode);
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  const [message, setMessage] = useState('');

  const {
    subject = 'MATHEMATICS',
    chapter = 'Permutations and Combinations',
  } = (route.params as any) || {};

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* ─── Header Bar ─── */}
      <View style={styles.headerBar}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <Icon name="dock-left" size={moderateScale(16)} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="pencil-outline" size={moderateScale(16)} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="clock-outline" size={moderateScale(16)} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle} numberOfLines={1}>
          Learning: {subject} — Pe{chapter.substring(0, 4)}...
        </Text>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="web" size={moderateScale(16)} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="image-outline" size={moderateScale(16)} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Icon name="chart-bar" size={moderateScale(16)} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ─── Main Content ─── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarWrap}>
          <View style={styles.avatarCircle}>
            <Icon name="emoticon-happy-outline" size={moderateScale(38)} color="#8D6E63" />
            <View style={styles.sparkBadge}>
              <Icon name="star-four-points" size={moderateScale(10)} color="#FFF" />
            </View>
          </View>
        </View>

        {/* Welcome Text */}
        <Text style={styles.heroTitle}>
          Hey there! How can I help you today?
        </Text>
        <Text style={styles.heroSub}>
          I'm your AI faculty — ask me anything{'\n'}about your subjects, clear doubts, or{'\n'}explore new topics together!
        </Text>
      </ScrollView>

      {/* ─── Bottom Area ─── */}
      <View style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 4) }]}>

        {/* Context Banner */}
        <View style={styles.contextBanner}>
          <Icon
            name="information-outline"
            size={moderateScale(14)}
            color={colors.warning}
            style={{ marginRight: scale(6), marginTop: 2 }}
          />
          <Text style={styles.contextText}>
            <Text style={styles.contextBold}>
              Subject: {subject} › {chapter}
            </Text>
            {' — bot answers only within this scope'}
          </Text>
        </View>

        {/* Input Bar */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.plusBtn}>
            <Icon name="plus" size={moderateScale(22)} color={colors.textMuted} />
          </TouchableOpacity>

          <TextInput
            style={styles.inputField}
            value={message}
            onChangeText={setMessage}
            placeholder="Ask about your course materials..."
            placeholderTextColor={colors.textMuted}
          />

          <TouchableOpacity style={styles.micBtn}>
            <Icon name="microphone-outline" size={moderateScale(18)} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sendBtn, message.length > 0 && styles.sendBtnActive]}
          >
            <Icon name="send" size={moderateScale(16)} color={isDarkMode ? colors.backgroundDark : '#FFF'} />
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Powered by{' '}
            <Text style={styles.footerLink} onPress={() => Linking.openURL('https://aifaculty.ai')}>
              AIFaculty.ai
            </Text>
            {'  |  For experimental features please click '}
            <Text style={styles.footerLink}>here</Text>
            {'🔬'}
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

/* ─── Styles ──────────────────────────────────────────────────────────── */

const getStyles = (colors: any, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },

  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(6),
    backgroundColor: colors.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(2),
  },
  headerTitle: {
    flex: 1,
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginHorizontal: scale(4),
  },

  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(32),
    paddingBottom: verticalScale(60),
  },
  avatarWrap: {
    marginBottom: verticalScale(20),
    alignItems: 'center',
  },
  avatarCircle: {
    width: moderateScale(72),
    height: moderateScale(72),
    backgroundColor: isDarkMode ? '#4A3B37' : '#FADDD6',
    borderRadius: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.subjectMath,
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.backgroundWhite,
  },
  heroTitle: {
    fontSize: moderateScale(22),
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: moderateScale(30),
    marginBottom: verticalScale(12),
  },
  heroSub: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: moderateScale(22),
  },

  bottom: {
    paddingHorizontal: scale(12),
    backgroundColor: colors.backgroundLight,
  },
  
  contextBanner: {
    backgroundColor: isDarkMode ? '#432C10' : '#FFF7ED',
    borderWidth: 1,
    borderColor: isDarkMode ? '#92400E' : '#FDE68A',
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(10),
    paddingTop: verticalScale(14),
    flexDirection: 'row',
    marginBottom: verticalScale(10),
  },
  contextText: {
    flex: 1,
    fontSize: moderateScale(12),
    color: isDarkMode ? '#FDBA74' : '#EA580C',
    lineHeight: moderateScale(18),
  },
  contextBold: {
    fontWeight: '700',
    color: isDarkMode ? '#FDBA74' : '#EA580C',
  },

  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: moderateScale(28),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(5),
    elevation: isDarkMode ? 0 : 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    marginBottom: verticalScale(6),
  },
  plusBtn: {
    width: moderateScale(36),
    height: moderateScale(36),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    flex: 1,
    fontSize: moderateScale(13),
    color: colors.textPrimary,
    paddingVertical: 0,
    paddingHorizontal: scale(4),
    minHeight: moderateScale(36),
  },
  micBtn: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(6),
  },
  sendBtn: {
    backgroundColor: isDarkMode ? colors.borderMedium : '#B8DCE9',
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendBtnActive: {
    backgroundColor: colors.subjectMath,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: verticalScale(6),
  },
  footerText: {
    fontSize: moderateScale(11),
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: moderateScale(16),
  },
  footerLink: {
    textDecorationLine: 'underline',
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

export default AIFacultyScreen;
