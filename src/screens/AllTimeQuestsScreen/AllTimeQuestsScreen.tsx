/**
 * AllTimeQuestsScreen - Displays all quests based on the provided screenshot.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../store/ThemeContext';
import { moderateScale, scale, verticalScale } from '../../utils';

const TABS = ['All', 'Academic', 'Engage', 'Streak', 'Special'];

const EARNED_QUESTS = [
  {
    id: 'e1',
    title: 'First Steps',
    description: 'Earn your first 100 XP — the journey begins!',
    sparks: '+10 Sparks earned',
  },
  {
    id: 'e2',
    title: 'Getting Started',
    description: 'Maintain a 3-day learning streak.',
    sparks: '+15 Sparks earned',
  },
  {
    id: 'e3',
    title: 'Explorer',
    description: 'Earn your first XP — welcome to the journey!',
    sparks: '+25 Sparks earned',
  },
];

const IN_PROGRESS_QUESTS = [
  {
    id: 'p1',
    title: 'Week Warrior',
    description: 'Maintain a 7-day learning streak.',
    sparks: '50 Sparks',
    progress: 57.1,
  },
  {
    id: 'p2',
    title: 'Monthly Master',
    description: 'Maintain a 30-day learning streak.',
    sparks: '250 Sparks',
    progress: 13.3,
  },
  {
    id: 'p3',
    title: 'Century Scholar',
    description: 'Maintain a 100-day learning streak.',
    sparks: '1000 Sparks',
    progress: 4,
  },
  {
    id: 'p4',
    title: 'Quiz Master',
    description: 'Complete 10 quizzes in a row.',
    sparks: '75 Sparks',
    progress: 60,
  },
  {
    id: 'p5',
    title: 'Conversationalist',
    description: 'Send 50 messages to the AI Faculty.',
    sparks: '30 Sparks',
    progress: 46,
  },
  {
    id: 'p6',
    title: 'Deep Thinker',
    description: 'Send 100 messages to the AI Faculty.',
    sparks: '75 Sparks',
    progress: 23,
  },
  {
    id: 'p7',
    title: 'Scholar',
    description: 'Reach Level 5.',
    sparks: '50 Sparks',
    progress: 40,
  },
];

const NOT_STARTED_QUESTS = [
  {
    id: 'n1',
    title: 'Perfect Score',
    description: 'Achieve a perfect score on a quiz.',
    sparks: '25 Sparks',
  },
  {
    id: 'n2',
    title: 'Doubt Buster',
    description: 'Get 10 doubt tickets resolved.',
    sparks: '50 Sparks',
  },
  {
    id: 'n3',
    title: 'Exam Ace',
    description: 'Attempt 5 exams in a row.',
    sparks: '75 Sparks',
  },
  {
    id: 'n4',
    title: 'Assignment Hero',
    description: 'Submit 10 assignments in a row.',
    sparks: '75 Sparks',
  },
  {
    id: 'n5',
    title: 'Course Champion',
    description: 'Complete 50 chapters.',
    sparks: '500 Sparks',
  },
];

const AllTimeQuestsScreen: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors, isDarkMode);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('All');

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <View style={styles.trophyIconBox}>
              <Icon name="trophy-outline" size={moderateScale(18)} color="#3B82F6" />
            </View>
            <Text style={styles.headerTitle}>All-time Quests</Text>
          </View>
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" size={moderateScale(24)} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Global Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLeft}>3 of 15 complete</Text>
            <Text style={styles.progressRight}>20%</Text>
          </View>
          <View style={styles.progressTrackGlobal}>
            <View style={[styles.progressFillGlobal, { width: '20%' }]} />
          </View>
          <Text style={styles.progressSub}>12 quests await — let's go!</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Quests List */}
        <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
          
          {/* EARNED */}
          <Text style={styles.sectionHeader}>EARNED · {EARNED_QUESTS.length}</Text>
          {EARNED_QUESTS.map((quest) => (
            <View key={quest.id} style={styles.earnedCard}>
              <View style={styles.cardRow}>
                <View style={styles.earnedIconBox}>
                  <Icon name="trophy-outline" size={20} color="#3B82F6" />
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.cardTopRow}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <Icon name="check-circle-outline" size={18} color="#27AE60" />
                  </View>
                  <Text style={styles.questDescription}>{quest.description}</Text>
                  <Text style={styles.sparksEarned}>✨ {quest.sparks}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* IN PROGRESS */}
          <Text style={[styles.sectionHeader, { marginTop: verticalScale(16) }]}>
            IN PROGRESS · {IN_PROGRESS_QUESTS.length}
          </Text>
          {IN_PROGRESS_QUESTS.map((quest) => (
            <View key={quest.id} style={styles.standardCard}>
              <View style={styles.cardRow}>
                <View style={styles.lockedIconBox}>
                  <Icon name="lock-outline" size={20} color={colors.textMuted} />
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.cardTopRow}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <View style={styles.sparksPill}>
                      <Text style={styles.sparksPillText}>✨ {quest.sparks}</Text>
                    </View>
                  </View>
                  <Text style={styles.questDescription}>{quest.description}</Text>
                  
                  {/* Progress bar inside card */}
                  <View style={styles.cardProgressTrack}>
                    <View style={[styles.cardProgressFill, { width: `${quest.progress}%` }]} />
                  </View>
                  <Text style={styles.cardProgressText}>{quest.progress}%</Text>
                </View>
              </View>
            </View>
          ))}

          {/* NOT STARTED */}
          <Text style={[styles.sectionHeader, { marginTop: verticalScale(16) }]}>
            NOT STARTED · {NOT_STARTED_QUESTS.length}
          </Text>
          {NOT_STARTED_QUESTS.map((quest) => (
            <View key={quest.id} style={styles.standardCard}>
              <View style={styles.cardRow}>
                <View style={styles.lockedIconBox}>
                  <Icon name="lock-outline" size={20} color={colors.textMuted} />
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.cardTopRow}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <View style={styles.sparksPill}>
                      <Text style={styles.sparksPillText}>✨ {quest.sparks}</Text>
                    </View>
                  </View>
                  <Text style={styles.questDescription}>{quest.description}</Text>
                </View>
              </View>
            </View>
          ))}
          
          <View style={{ height: verticalScale(40) }} />
        </ScrollView>
      </View>
    </View>
  );
};

/* ─── Styles ──────────────────────────────────────────────────────────── */

const getStyles = (colors: any, isDarkMode: boolean) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Very light grey bg as per screenshot
  },
  
  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: colors.backgroundWhite,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyIconBox: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(8),
    backgroundColor: '#EAF3F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    padding: scale(4),
  },

  /* Global Progress Section */
  progressSection: {
    backgroundColor: colors.backgroundWhite,
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  progressLeft: {
    fontSize: moderateScale(12),
    color: colors.textSecondary,
    fontWeight: '500',
  },
  progressRight: {
    fontSize: moderateScale(12),
    color: '#3B82F6',
    fontWeight: '700',
  },
  progressTrackGlobal: {
    height: 6,
    backgroundColor: isDarkMode ? '#333' : '#F0F0F0',
    borderRadius: 3,
    marginBottom: verticalScale(8),
    overflow: 'hidden',
  },
  progressFillGlobal: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 3,
  },
  progressSub: {
    fontSize: moderateScale(12),
    color: colors.textMuted,
  },

  /* Tabs */
  tabsContainer: {
    backgroundColor: colors.backgroundWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingVertical: verticalScale(12),
  },
  tabsScroll: {
    paddingHorizontal: scale(16),
    gap: scale(12),
  },
  tabBtn: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(6),
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: '#56A8D2', // Muted blue from screenshot
  },
  tabText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: '#FFF',
  },

  /* List */
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: scale(16),
  },
  sectionHeader: {
    fontSize: moderateScale(11),
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1,
    marginBottom: verticalScale(12),
  },

  /* Cards */
  earnedCard: {
    backgroundColor: '#F2FAFF',
    borderWidth: 1,
    borderColor: '#E1F2FB',
    borderRadius: moderateScale(12),
    padding: scale(16),
    marginBottom: verticalScale(12),
  },
  standardCard: {
    backgroundColor: colors.backgroundWhite,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: moderateScale(12),
    padding: scale(16),
    marginBottom: verticalScale(12),
  },
  cardRow: {
    flexDirection: 'row',
  },
  earnedIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E1F2FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  lockedIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: isDarkMode ? '#333' : '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  cardInfo: {
    flex: 1,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(4),
  },
  questTitle: {
    fontSize: moderateScale(15),
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
    marginRight: scale(8),
  },
  questDescription: {
    fontSize: moderateScale(13),
    color: colors.textSecondary,
    marginBottom: verticalScale(8),
  },
  sparksEarned: {
    fontSize: moderateScale(12),
    color: '#63B1D5',
    fontWeight: '500',
  },
  sparksPill: {
    backgroundColor: '#EAF3F7',
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    borderRadius: 12,
  },
  sparksPillText: {
    fontSize: moderateScale(11),
    fontWeight: '600',
    color: '#63B1D5',
  },
  cardProgressTrack: {
    height: 4,
    backgroundColor: isDarkMode ? '#444' : '#EAEAEA',
    borderRadius: 2,
    marginTop: verticalScale(4),
    marginBottom: verticalScale(4),
    overflow: 'hidden',
  },
  cardProgressFill: {
    height: '100%',
    backgroundColor: '#56A8D2',
    borderRadius: 2,
  },
  cardProgressText: {
    fontSize: moderateScale(11),
    color: colors.textMuted,
    textAlign: 'right',
  },
});

export default AllTimeQuestsScreen;
