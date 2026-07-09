/**
 * ForgotPasswordScreen — Replicates the IITPK AI Faculty web forgot password page exactly.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../store/ThemeContext';
import { moderateScale, scale, verticalScale } from '../../utils';

const ForgotPasswordScreen: React.FC = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(colors, isDarkMode);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + verticalScale(20), paddingBottom: insets.bottom + verticalScale(30) },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Theme toggle (top-right) */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <Icon
              name={isDarkMode ? 'weather-sunny' : 'weather-night'}
              size={moderateScale(18)}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.centerWrap}>
          {/* Main Card */}
          <View style={styles.card}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>Get a reset OTP sent to your email.</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="rakesh@company.com"
                placeholderTextColor={colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity style={styles.btn} activeOpacity={0.8}>
              <Text style={styles.btnText}>Send OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Text style={styles.backBtnText}>{'<'} Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Powered by{' '}
            <Text style={styles.footerLink} onPress={() => Linking.openURL('https://aifaculty.ai')}>
              AIFaculty.ai
            </Text>
            {'  |  For experimental\nfeatures please click '}
            <Text style={styles.footerLink}>here</Text>
            {'🔬'}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

/* ─── Styles ──────────────────────────────────────────────────────────── */

const getStyles = (colors: any, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: scale(20),
  },
  
  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: verticalScale(20),
  },
  themeToggle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundWhite,
    elevation: isDarkMode ? 0 : 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  /* Center Wrap */
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  /* Card */
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(32),
    width: '100%',
    maxWidth: 400,
    elevation: isDarkMode ? 0 : 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    borderWidth: isDarkMode ? 1 : 0,
    borderColor: colors.borderLight,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: verticalScale(28),
  },

  /* Input */
  inputGroup: {
    marginBottom: verticalScale(24),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '400',
    color: colors.textPrimary,
    marginBottom: verticalScale(8),
  },
  input: {
    height: verticalScale(44),
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: moderateScale(6),
    paddingHorizontal: scale(12),
    fontSize: moderateScale(15),
    color: colors.textPrimary,
    backgroundColor: colors.backgroundWhite,
  },

  /* Buttons */
  btn: {
    backgroundColor: '#ADD8E6', // Exact light blue from screenshot
    height: verticalScale(44),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  btnText: {
    color: '#FFF',
    fontSize: moderateScale(15),
    fontWeight: '600',
  },
  backBtn: {
    alignItems: 'center',
  },
  backBtnText: {
    color: '#86C5E3', // Slightly darker light blue for text link
    fontSize: moderateScale(15),
    fontWeight: '400',
  },

  /* Footer */
  footer: {
    alignItems: 'center',
    marginTop: verticalScale(20),
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: verticalScale(16),
  },
  footerText: {
    fontSize: moderateScale(12),
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
  footerLink: {
    textDecorationLine: 'underline',
    color: colors.textPrimary,
  },
});

export default ForgotPasswordScreen;
