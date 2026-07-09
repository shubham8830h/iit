/**
 * CoursesScreen — Pixel-perfect replica of the IITPK Curriculum page.
 * Dark Mode compatible.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { NewConversationModal } from '../../components';
import { useTheme } from '../../store/ThemeContext';
import { moderateScale, scale, verticalScale } from '../../utils';

const { width: SCREEN_W } = Dimensions.get('window');

/* ─── Data ────────────────────────────────────────────────────────────── */

interface Topic {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  topics: Topic[];
}

const SUBJECTS: Subject[] = [
  {
    id: 'math',
    title: 'MATHEMATICS',
    subtitle: 'Mathematics Subjects',
    color: '#5CBCE8',
    topics: [
      { id: 'm1', name: 'Permutations and Combinations' },
      { id: 'm2', name: 'Quadratic Equations' },
    ],
  },
  {
    id: 'physics',
    title: 'PHYSICS',
    subtitle: 'PHYSICS Subject',
    color: '#F8457A',
    topics: [
      { id: 'p1', name: 'NLM' },
      { id: 'p2', name: 'Ray-Optics' },
    ],
  },
  {
    id: 'chemistry',
    title: 'CHEMISTRY',
    subtitle: 'CHEMISTRY Subject',
    color: '#12B7C1',
    topics: [
      { id: 'c1', name: 'Hydrocarbons' },
      { id: 'c2', name: 'P-BLOCK' },
    ],
  },
  {
    id: 'biology',
    title: 'BIOLOGY',
    subtitle: 'BIOLOGY Subject',
    color: '#7C3AED',
    topics: [
      { id: 'b1', name: 'Anatomy of Flowering Plants' },
      { id: 'b2', name: 'Morphology of Flowering Plants' },
      { id: 'b3', name: 'Photosynthesis in Higher Plants' },
    ],
  },
];

/* ─── Component ───────────────────────────────────────────────────────── */

const CoursesScreen: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors, isDarkMode);
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(['math', 'physics', 'chemistry', 'biology']),
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openChat = (subjectTitle: string, topicName: string) => {
    setSelectedSubject(subjectTitle);
    setSelectedChapter(topicName);
    setModalVisible(true);
  };

  const handleStartChat = (title: string, subject: string, chapter: string) => {
    setModalVisible(false);
    navigation.navigate('AIFaculty', { title, subject, chapter });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header Pill ── */}
        <TouchableOpacity
          style={styles.headerPill}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          activeOpacity={0.8}
        >
          <View style={styles.headerBookBox}>
            <Icon name="book-outline" size={moderateScale(18)} color={colors.textSecondary} />
          </View>
          <View style={styles.headerTextBlock}>
            <Text style={styles.headerTitle}>Curriculum</Text>
            <Text style={styles.headerSub} numberOfLines={1}>
              Browse your enrolled courses and track progress
            </Text>
          </View>
          <View style={styles.rrBadge}>
            <Text style={styles.rrText}>RR</Text>
          </View>
        </TouchableOpacity>

        {/* ── Welcome ── */}
        <Text style={styles.welcome}>
          Welcome, <Text style={styles.welcomeName}>Rajeevan</Text>
        </Text>
        <Text style={styles.welcomeSub}>
          What would you like to learn today? Select a chapter to get started!
        </Text>
        <Text style={styles.batch}>IITPK-2026</Text>

        {/* ── Subject Cards ── */}
        {SUBJECTS.map(subj => {
          const isOpen = expanded.has(subj.id);
          return (
            <View
              key={subj.id}
              style={[styles.card, { borderTopColor: subj.color }]}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={[styles.iconCircle, { backgroundColor: subj.color }]}>
                  <Icon name="book-open-page-variant" size={moderateScale(20)} color="#FFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.cardTitle}>{subj.title}</Text>
                  <Text style={styles.cardSub}>{subj.subtitle}</Text>
                </View>

              </View>

              {/* TOPICS divider */}
              <View style={styles.topicsDivider}>
                <View style={styles.dividerLine} />
                <Text style={styles.topicsLabel}>TOPICS</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Topics list */}
              {isOpen ? (
                <View>
                  {subj.topics.map(topic => (
                    <View key={topic.id} style={styles.topicPill}>
                      <Text style={styles.topicName}>{topic.name}</Text>
                      <TouchableOpacity
                        style={[styles.chatBtn, { backgroundColor: subj.color }]}
                        onPress={() => openChat(subj.title, topic.name)}
                        activeOpacity={0.7}
                      >
                        <Icon name="robot-outline" size={moderateScale(14)} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  ))}
                  <TouchableOpacity
                    style={[styles.toggleBtn, { borderColor: subj.color + '40' }]}
                    onPress={() => toggle(subj.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.toggleText, { color: subj.color }]}>
                      Hide Units
                    </Text>
                    <Icon name="chevron-up" size={moderateScale(18)} color={subj.color} />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.toggleBtn, { borderColor: subj.color + '40' }]}
                  onPress={() => toggle(subj.id)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.toggleText, { color: subj.color }]}>
                    View Units ({subj.topics.length})
                  </Text>
                  <Icon name="chevron-down" size={moderateScale(18)} color={subj.color} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}

        {/* ── Footer ── */}
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
      </ScrollView>

      <NewConversationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onStartChat={handleStartChat}
      />
    </View>
  );
};

/* ─── Styles ──────────────────────────────────────────────────────────── */

const getStyles = (colors: any, isDarkMode: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scroll: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(24),
  },

  /* Header Pill */
  headerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundWhite,
    borderRadius: moderateScale(28),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(12),
    marginBottom: verticalScale(20),
    elevation: isDarkMode ? 0 : 4,
    shadowColor: colors.subjectMath,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    borderWidth: isDarkMode ? 1 : 0,
    borderColor: colors.borderLight,
  },
  headerBookBox: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(10),
  },
  headerTextBlock: { flex: 1 },
  headerTitle: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: colors.textPrimary,
  },
  headerSub: {
    fontSize: moderateScale(11),
    color: colors.textMuted,
    marginTop: 1,
  },
  rrBadge: {
    backgroundColor: colors.subjectMath,
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(8),
  },
  rrText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: moderateScale(14),
  },

  /* Welcome */
  welcome: {
    fontSize: moderateScale(22),
    color: colors.textPrimary,
    marginBottom: verticalScale(4),
  },
  welcomeName: {
    fontWeight: '700',
    color: colors.subjectMath,
  },
  welcomeSub: {
    fontSize: moderateScale(14),
    color: colors.textSecondary,
    lineHeight: moderateScale(21),
    marginBottom: verticalScale(20),
  },
  batch: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 1.2,
    marginBottom: verticalScale(14),
  },

  /* Subject Card — TOP border */
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: moderateScale(16),
    padding: scale(16),
    marginBottom: verticalScale(16),
    borderTopWidth: 4,
    borderLeftWidth: isDarkMode ? 1 : 0,
    borderRightWidth: isDarkMode ? 1 : 0,
    borderBottomWidth: isDarkMode ? 1 : 0,
    borderColor: colors.borderLight,
    elevation: isDarkMode ? 0 : 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),
  },
  iconCircle: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: scale(12),
  },
  cardTitle: {
    fontSize: moderateScale(16),
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  cardSub: {
    fontSize: moderateScale(11),
    color: colors.textMuted,
    marginTop: 1,
  },

  /* TOPICS divider */
  topicsDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: isDarkMode ? colors.borderLight : '#F0F0F0',
  },
  topicsLabel: {
    fontSize: moderateScale(10),
    color: colors.textMuted,
    fontWeight: '700',
    letterSpacing: 2,
    paddingHorizontal: scale(12),
  },

  /* Topic pills */
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(16),
    backgroundColor: colors.backgroundGray,
    borderRadius: moderateScale(24),
    marginBottom: verticalScale(8),
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  topicName: {
    fontSize: moderateScale(13),
    color: colors.textPrimary,
    flex: 1,
  },
  chatBtn: {
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(8),
  },

  /* Toggle button */
  toggleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginTop: verticalScale(6),
  },
  toggleText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginRight: 4,
  },

  /* Footer */
  footer: {
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  footerText: {
    fontSize: moderateScale(11),
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: moderateScale(18),
  },
  footerLink: {
    textDecorationLine: 'underline',
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

export default CoursesScreen;
