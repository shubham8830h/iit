/**
 * RemedialLearningScreen — Pixel-perfect replica of the Remedial Hub page.
 * Dark Mode compatible.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../store/ThemeContext';
import { moderateScale, scale, verticalScale } from '../../utils';

/* ─── Mock Data ──────────────────────────────────────────────────────── */

const GAPS_DATA = [
  { id: 'g1', title: 'Nature of roots', subtitle: 'Identified from your quiz performance', tag: 'QUIZ' },
  { id: 'g2', title: 'Nature of roots when discriminant is zero', subtitle: 'Identified from your quiz performance', tag: 'QUIZ' },
  { id: 'g3', title: 'Complex roots condition for quadratic equations', subtitle: 'Identified from your quiz performance', tag: 'QUIZ' },
  { id: 'g4', title: 'Conditions for real and unequal roots', subtitle: 'Identified from your quiz performance', tag: 'QUIZ' },
  { id: 'g5', title: 'scientific nomenclature', subtitle: 'Identified from your quiz performance', tag: 'QUIZ' },
];

const COURSES_DATA = [
  { id: 'c1', title: 'Tuberous Adventitious Roots: Structure, Function, and...', subtitle: '0 Attempts    Jul 1, 2026', tag: 'NEW', score: '-/-', scoreLabel: 'BEST SCORE' },
  { id: 'c2', title: 'Reproductive Roots in Plants: Structure, Function, and...', subtitle: '0 Attempts    Jul 1, 2026', tag: 'NEW', score: '-/-', scoreLabel: 'BEST SCORE' },
  { id: 'c3', title: 'Topic Not Available', subtitle: '0 Attempts    Jun 30, 2026', tag: 'NEW', score: '-/-', scoreLabel: 'BEST SCORE' },
  { id: 'c4', title: 'Topic Not Available', subtitle: '0 Attempts    Jan 20, 2005', tag: 'NEW', score: '-/-', scoreLabel: 'BEST SCORE' },
];

/* ─── Component ───────────────────────────────────────────────────────── */

const RemedialLearningScreen: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors, isDarkMode);
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  
  const [activeTab, setActiveTab] = useState<'gaps' | 'courses'>('gaps');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle Tab Switch
  const isGaps = activeTab === 'gaps';
  const displayData = isGaps ? GAPS_DATA : COURSES_DATA;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ─── Header & Sidebar Toggle ─── */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.sidebarToggle}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            activeOpacity={0.7}
          >
            <Icon name="dock-left" size={moderateScale(18)} color={colors.textSecondary} />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.headerTitle}>Remedial Hub</Text>
            <Text style={styles.headerSubtitle}>
              {isGaps 
                ? 'AI has identified 10 areas needing reinforcement'
                : '9 curated micro-courses available'}
            </Text>
          </View>
        </View>

        {/* ─── Tabs ─── */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tabBtn, isGaps && styles.tabBtnActive]}
            onPress={() => setActiveTab('gaps')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, isGaps && styles.tabTextActive]}>
              Gaps <Text style={[styles.tabBadge, isGaps && styles.tabBadgeActive]}>10</Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, !isGaps && styles.tabBtnActive]}
            onPress={() => setActiveTab('courses')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, !isGaps && styles.tabTextActive]}>
              Courses <Text style={[styles.tabBadge, !isGaps && styles.tabBadgeActive]}>9</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── Search Bar ─── */}
        <View style={styles.searchContainer}>
          <Icon name="magnify" size={moderateScale(20)} color={colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search topics..."
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* ─── List Header ─── */}
        <View style={styles.listHeader}>
          {isGaps ? (
            <Text style={styles.listHeaderText}>
              <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>10</Text> knowledge gaps identified
            </Text>
          ) : (
            <View>
              <Text style={styles.listHeaderTitle}>CURATED KNOWLEDGE</Text>
              <Text style={styles.listHeaderText}>9 micro-courses</Text>
            </View>
          )}
        </View>

        {/* ─── List Items ─── */}
        {isGaps ? (
          <View style={styles.listContainer}>
            {GAPS_DATA.map((gap, index) => (
              <View key={gap.id} style={styles.card}>
                <View style={styles.cardTopRow}>
                  <View style={styles.tagBadge}>
                    <Text style={styles.tagText}>{gap.tag}</Text>
                  </View>
                  <Icon name="message-outline" size={moderateScale(16)} color={colors.textMuted} />
                </View>
                <Text style={styles.cardTitle}>{gap.title}</Text>
                <Text style={styles.cardSubtitle}>{gap.subtitle}</Text>
                <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.8}>
                  <Icon name="creation" size={moderateScale(16)} color="#FFF" style={{ marginRight: 6 }} />
                  <Text style={styles.primaryBtnText}>Generate Course</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {COURSES_DATA.map((course, index) => (
              <View key={course.id} style={styles.card}>
                <View style={styles.cardTopRow}>
                  <View style={styles.tagBadgeLight}>
                    <Text style={styles.tagTextLight}>{course.tag}</Text>
                  </View>
                  <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{course.score}</Text>
                    <Text style={styles.scoreLabel}>{course.scoreLabel}</Text>
                  </View>
                </View>
                <Text style={styles.cardTitle}>{course.title}</Text>
                <View style={styles.statsRow}>
                  <Icon name="refresh" size={moderateScale(12)} color={colors.textMuted} />
                  <Text style={styles.cardSubtitle}>
                    {course.subtitle}
                  </Text>
                </View>
                <TouchableOpacity style={styles.secondaryBtn} activeOpacity={0.8}>
                  <Text style={styles.secondaryBtnText}>Start learning</Text>
                  <Icon name="arrow-right" size={moderateScale(14)} color={colors.subjectMath} style={{ marginLeft: 6 }} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* ─── Pagination ─── */}
        <View style={styles.paginationRow}>
          <Text style={styles.paginationText}>
            Showing <Text style={{ fontWeight: 'bold', color: colors.textPrimary }}>1-9</Text> of 9
          </Text>
          <View style={styles.paginationControls}>
            <View style={styles.pagePill}><Text style={styles.pagePillText}>10</Text></View>
            <View style={[styles.pagePill, styles.pagePillActive]}><Text style={styles.pagePillTextActive}>20</Text></View>
          </View>
        </View>

        {/* ─── Footer ─── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Powered by{' '}
            <Text style={styles.footerLink} onPress={() => Linking.openURL('https://aifaculty.ai')}>
              AIFaculty.ai
            </Text>
            {' | For experimental features\nplease click '}
            <Text style={styles.footerLink}>here</Text>
            {'🔬'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

/* ─── Styles ──────────────────────────────────────────────────────────── */

const getStyles = (colors: any, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollContent: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(30),
  },
  
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  sidebarToggle: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
    elevation: isDarkMode ? 0 : 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  headerTitleBox: {
    flex: 1,
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: '800',
    color: colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: moderateScale(11),
    color: colors.textSecondary,
    marginTop: 2,
  },

  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundGray,
    borderRadius: moderateScale(24),
    padding: scale(4),
    marginBottom: verticalScale(16),
    alignSelf: 'flex-start',
  },
  tabBtn: {
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(20),
  },
  tabBtnActive: {
    backgroundColor: colors.backgroundWhite,
    elevation: isDarkMode ? 0 : 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  tabBadge: {
    color: colors.textMuted,
    fontSize: moderateScale(11),
    marginLeft: 4,
  },
  tabBadgeActive: {
    color: colors.subjectMath,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: moderateScale(24),
    paddingHorizontal: scale(14),
    height: verticalScale(44),
    marginBottom: verticalScale(20),
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(13),
    color: colors.textPrimary,
    padding: 0,
  },

  listHeader: {
    marginBottom: verticalScale(16),
    paddingHorizontal: scale(4),
  },
  listHeaderTitle: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: colors.subjectMath,
    letterSpacing: 1,
    marginBottom: 2,
  },
  listHeaderText: {
    fontSize: moderateScale(12),
    color: colors.textSecondary,
  },

  listContainer: {
    marginBottom: verticalScale(10),
  },

  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: moderateScale(16),
    padding: scale(16),
    marginBottom: verticalScale(12),
    borderWidth: 1,
    borderColor: colors.borderLight,
    elevation: isDarkMode ? 0 : 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  tagBadge: {
    backgroundColor: colors.backgroundGray,
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(4),
  },
  tagText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: colors.textSecondary,
  },
  tagBadgeLight: {
    backgroundColor: isDarkMode ? '#1E3A5F' : '#EDF5FC',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(10),
  },
  tagTextLight: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: colors.subjectMath,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: colors.textMuted,
  },
  scoreLabel: {
    fontSize: moderateScale(8),
    color: colors.textMuted,
    fontWeight: '700',
    marginTop: 2,
  },
  cardTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: verticalScale(6),
    lineHeight: moderateScale(22),
  },
  cardSubtitle: {
    fontSize: moderateScale(11),
    color: colors.textMuted,
    marginBottom: verticalScale(16),
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(14),
    marginTop: verticalScale(2),
  },
  
  primaryBtn: {
    backgroundColor: colors.subjectMath,
    borderRadius: moderateScale(20),
    height: verticalScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    color: '#FFF',
    fontSize: moderateScale(13),
    fontWeight: '700',
  },
  secondaryBtn: {
    backgroundColor: isDarkMode ? colors.backgroundLight : '#F0F8FB',
    borderRadius: moderateScale(20),
    borderWidth: 1,
    borderColor: isDarkMode ? colors.borderLight : '#D4EEF9',
    height: verticalScale(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    color: colors.subjectMath,
    fontSize: moderateScale(13),
    fontWeight: '700',
  },

  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(10),
  },
  paginationText: {
    fontSize: moderateScale(11),
    color: colors.textSecondary,
  },
  paginationControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pagePill: {
    backgroundColor: colors.backgroundGray,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(4),
    marginLeft: scale(6),
  },
  pagePillActive: {
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  pagePillText: {
    fontSize: moderateScale(11),
    color: colors.textSecondary,
    fontWeight: '600',
  },
  pagePillTextActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },

  footer: {
    alignItems: 'center',
    marginTop: verticalScale(30),
  },
  footerText: {
    fontSize: moderateScale(10),
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

export default RemedialLearningScreen;
