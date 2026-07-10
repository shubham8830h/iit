/**
 * LoginScreen — Replicates the IITPK AI Faculty web login page exactly.
 * Features: Unified white card with teal top block, blue-gray inputs,
 * vector icons for moon, browser, and flask.
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSize, FontWeight, Spacing, BorderRadius } from '../../constants';
import { CustomButton, CustomInput } from '../../components';
import { useAuth } from '../../store/AuthContext';
import { useTheme } from '../../store/ThemeContext';

const LoginScreen: React.FC = () => {
  const { login, state, clearError } = useAuth();
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = getStyles(colors);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = useCallback(async () => {
    clearError();
    if (!validateForm()) { return; }
    await login(email.trim(), password);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, login, clearError]);

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + Spacing.lg, paddingBottom: insets.bottom + Spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Theme toggle (top-right) */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
            <Icon name={isDarkMode ? 'weather-sunny' : 'weather-night'} size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Unified Card Container */}
        <View style={styles.cardContainer}>

          {/* Branded Header block inside the card */}
          <View style={styles.gradientCard}>
            <Text style={styles.brandTextII}>ii</Text>
            <Text style={styles.brandTextTPK}>TPK</Text>
          </View>

          {/* Login Form Content */}
          <View style={styles.formContainer}>
            <CustomInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (emailError) { setEmailError(''); }
              }}
              error={emailError}
              keyboardType="email-address"
              autoComplete="email"
              backgroundColor="#EEF2F6"
              borderColor="#EEF2F6"
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (passwordError) { setPasswordError(''); }
              }}
              error={passwordError}
              isPassword
              backgroundColor="#EEF2F6"
              borderColor="#EEF2F6"
            />

            {/* Forgot Password */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
            </TouchableOpacity>

            {/* Browser recommendation hint */}
            <View style={styles.browserHint}>
              <Icon name="monitor-cellphone" size={22} color={colors.textSecondary} />
              <Text style={styles.browserHintText}>
                For best experience use <Text style={styles.browserHintBold}>Google Chrome</Text>
              </Text>
            </View>

            {/* API / Auth Error */}
            {state.error ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{state.error}</Text>
              </View>
            ) : null}

            {/* Login Button */}
            <CustomButton
              title="Login"
              onPress={handleLogin}
              isLoading={state.isLoading}
              style={styles.loginButton}
            />

            {/* Terms & Conditions */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By continuing, you agree to our{' '}
                <Text
                  style={styles.termsLink}
                  onPress={() => navigation.navigate('TermsConditions')}
                >
                  Terms & Conditions
                </Text>
              </Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* AI Faculty Branding */}
            <View style={styles.brandingContainer}>
              <View style={styles.brandingRow}>
                {/* Placeholder for custom wing icon - using closest vector approx */}
                <Icon name="feather" size={24} color="#63B3ED" style={{ transform: [{ rotate: '45deg' }] }} />
                <Text style={styles.brandingText}>AI FACULTY</Text>
              </View>
            </View>

          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            © 2026 Powered by <Text style={styles.footerLink}>AIFaculty.ai</Text>
            {'  |  '}
            For experimental features please click{' '}
            <Text style={styles.footerLink}>here <Icon name="flask-outline" size={14} /></Text>
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: BorderRadius.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: Spacing.xxl,
  },
  gradientCard: {
    width: '100%',
    paddingVertical: Spacing.xxl + Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    flexDirection: 'row',
    backgroundColor: '#0d5b7a', // Exact teal from screenshot
  },
  brandTextII: {
    fontSize: 40,
    fontWeight: FontWeight.bold,
    color: '#FF6B00',
  },
  brandTextTPK: {
    fontSize: 40,
    fontWeight: FontWeight.extraBold,
    color: '#FF8A00',
  },
  formContainer: {
    padding: Spacing.xl,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.lg,
    marginTop: -Spacing.sm,
  },
  forgotPasswordText: {
    fontSize: FontSize.sm,
    color: colors.textSecondary,
  },
  browserHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  browserHintText: {
    fontSize: FontSize.sm,
    color: colors.textSecondary,
  },
  browserHintBold: {
    fontWeight: FontWeight.bold,
    color: colors.textPrimary,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.base,
  },
  errorText: {
    fontSize: FontSize.sm,
    color: colors.error,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: '#0d5b7a', // Match the top header
    marginTop: Spacing.xs,
  },
  termsContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  termsText: {
    fontSize: FontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  termsLink: {
    color: '#63B3ED', // Light blue from screenshot
    fontWeight: FontWeight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: Spacing.xl,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  brandingText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: Spacing.lg,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  footerLink: {
    color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
