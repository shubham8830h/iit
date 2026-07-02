/**
 * LoginScreen — Replicates the IITPK AI Faculty web login page.
 * Features: Branded teal gradient header, email/password inputs, login button,
 * forgot password link (right-aligned), terms & conditions, AI Faculty branding.
 */

import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../constants';
import { CustomButton, CustomInput } from '../../components';
import { useAuth } from '../../store/AuthContext';

const LoginScreen: React.FC = () => {
  const { login, state, clearError } = useAuth();
  const insets = useSafeAreaInsets();

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
    Alert.alert(
      'Forgot Password',
      'Password reset functionality will be available after API integration.',
      [{ text: 'OK' }],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top, paddingBottom: insets.bottom + Spacing.xl },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>

        {/* Theme toggle (top-right) */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.themeToggle}>
            <Text style={styles.themeIcon}>🌙</Text>
          </TouchableOpacity>
        </View>

        {/* Branded Header — teal gradient card */}
        <View style={styles.headerContainer}>
          <View style={styles.gradientCard}>
            <Text style={styles.brandTextII}>ii</Text>
            <Text style={styles.brandTextTPK}>TPK</Text>
          </View>
        </View>

        {/* Login Form */}
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
          />

          {/* Forgot Password — right-aligned as in web app */}
          <TouchableOpacity
            onPress={handleForgotPassword}
            style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
          </TouchableOpacity>

          {/* Browser recommendation hint */}
          <View style={styles.browserHint}>
            <View style={styles.browserHintIconBox}>
              <Text style={styles.browserHintIcon}>📋</Text>
            </View>
            <Text style={styles.browserHintText}>For best experience{'\n'}use</Text>
            <Text style={styles.browserHintBold}>Google{'\n'}Chrome</Text>
          </View>

          {/* API / Auth Error */}
          {state.error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{state.error}</Text>
            </View>
          )}

          {/* Login Button — teal, matching web app */}
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
              <Text style={styles.termsLink}>Terms &amp; Conditions</Text>
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* AI Faculty Branding */}
        <View style={styles.brandingContainer}>
          <View style={styles.brandingRow}>
            <View style={styles.aiFacultyLogo}>
              <Text style={styles.aiFacultyLogoText}>🤖</Text>
            </View>
            <Text style={styles.brandingText}>AI FACULTY</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            © 2026 Powered by{' '}
            <Text style={styles.footerLink}>AIFaculty.ai</Text>
            {'  |  '}
            For experimental features please click{' '}
            <Text style={styles.footerLink}>here</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: Colors.backgroundWhite,
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
    paddingVertical: Spacing.md,
  },
  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeIcon: {
    fontSize: 16,
  },
  headerContainer: {
    width: '100%',
    marginBottom: Spacing.xxl,
    borderRadius: BorderRadius.xxl,
    overflow: 'hidden',
  },
  gradientCard: {
    width: '100%',
    paddingVertical: Spacing.xxxl + Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadius.xxl,
    flexDirection: 'row',
    backgroundColor: '#1E4D5C',
  },
  brandTextII: {
    fontSize: 44,
    fontWeight: FontWeight.bold,
    color: '#FFA726',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  brandTextTPK: {
    fontSize: 44,
    fontWeight: FontWeight.extraBold,
    color: '#FF7043',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  formContainer: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: Spacing.xs,
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.xs,
  },
  forgotPasswordText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  browserHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  browserHintIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  browserHintIcon: {
    fontSize: 18,
  },
  browserHintText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    lineHeight: 18,
  },
  browserHintBold: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    marginBottom: Spacing.base,
  },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.error,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: Spacing.sm,
  },
  termsContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  termsText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.activeBlue,
    fontWeight: FontWeight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: Spacing.xl,
  },
  brandingContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  brandingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  aiFacultyLogo: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.backgroundLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiFacultyLogoText: {
    fontSize: 20,
  },
  brandingText: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    letterSpacing: 1.5,
  },
  footerContainer: {
    alignItems: 'center',
    paddingTop: Spacing.md,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerLink: {
    color: Colors.activeBlue,
  },
});

export default LoginScreen;
