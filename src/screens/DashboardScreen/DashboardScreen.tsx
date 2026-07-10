/**
 * DashboardScreen — Full pixel-faithful replica of the IITPK AI Faculty web dashboard.
 *
 * Sections:
 *  1. Level Card — circular badge + sparks info
 *  2. Sparks This Week + Streak — progress bar, fire emoji, count
 *  3. Streak Calendar — June 2026 month grid with active day badges
 *  4. All-Time Quests — progress bars per quest
 *  5. Stats Grid — 2×2 color-coded stat cards
 */

import React, { useCallback, useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FontSize,
  FontWeight,
  Spacing,
  BorderRadius,
} from '../../constants';
import { Header } from '../../components';
import { useAuth } from '../../store/AuthContext';
import { useTheme } from '../../store/ThemeContext';

// ─── Mock data (replace with API later) ──────────────────────────────────────

const LEVEL_DATA = {
  current: 1,
  label: 'Level 1',
  sparksToNext: 5,
};

const SPARKS_DATA = {
  thisWeek: 25,
  progressPercent: 97,
  progressLabel: '97% toward Level 2',
  streak: 2,
  activeToday: true,
};

// June 2026 starts on Monday. 14 active days this month.
const CALENDAR_DATA = {
  month: 'JUNE',
  year: 2026,
  activeDays: [1, 5, 8, 9, 13, 15, 16, 17, 19, 22, 24, 28, 29, 30],
  todayDay: 29,
  bestStreak: 3,
  activeThisMonth: 14,
  startOffset: 0,   // June 1 = Monday
  daysInMonth: 30,
};

const QUESTS_DATA = {
  total: 15,
  completed: 3,
  items: [
    {
      id: '1',
      icon: 'trophy-outline',
      name: 'First Steps',
      status: 'Completed',
      progress: 1,
      detail: '',
      sparks: 0,
      iconColor: '#3B82F6',
      iconBg: '#EAF6FF',
    },
    {
      id: '2',
      icon: 'lightning-bolt',
      name: 'Quiz Master',
      status: 'In Progress',
      progress: 0.6,
      detail: '60%',
      sparks: 75,
      iconColor: '#63B1D5',
      iconBg: '#EAF3F7',
    },
    {
      id: '3',
      icon: 'lock-outline',
      name: 'Perfect Score',
      status: 'Not Started',
      progress: 0,
      detail: '',
      sparks: 25,
      iconColor: '#A0AEC0',
      iconBg: '#F7F7F7',
    },
  ],
};

const STATS_DATA = [
  {
    id: 'ai_messages',
    label: 'AI MESSAGES',
    value: '23',
    subtitle: '0 this week',
    icon: 'message-outline',
    bgColor: '#EAF3F7',
    iconColor: '#63B1D5',
    valueColor: '#63B1D5',
  },
  {
    id: 'quizzes',
    label: 'QUIZZES TAKEN',
    value: '6',
    subtitle: '0 this week',
    icon: 'file-question-outline', // Or file-document-outline if not found
    bgColor: '#EAF8ED',
    iconColor: '#0E9D5D',
    valueColor: '#0E9D5D',
  },
  {
    id: 'gaps',
    label: 'LEARNING GAPS',
    value: '10',
    subtitle: 'topics to review',
    icon: 'brain',
    bgColor: '#F5F1FA',
    iconColor: '#752CE8',
    valueColor: '#752CE8',
    hasPill: true,
  },
  {
    id: 'rank',
    label: 'AI USAGE RANK',
    value: '#1',
    subtitle: 'of 2 active users',
    icon: 'trophy-outline',
    bgColor: '#FCF8E8',
    iconColor: '#DD7619',
    valueColor: '#DD7619',
  },
];

/** Combined Section: Level + Sparks + Streak */
const CombinedProgressCard = () => {
  const { colors } = useTheme();
  const styles = getCombinedStyles(colors);
  const navigation = useNavigation<any>();

  return (
    <View style={styles.card}>
      {/* Level Section */}
      <View style={styles.levelSection}>
        <View style={styles.levelCircle}>
          <Text style={styles.levelCircleNumber}>{LEVEL_DATA.current}</Text>
        </View>
        <View style={styles.levelInfo}>
          <Text style={styles.levelLabel}>LEVEL</Text>
          <Text style={styles.levelValue}>{LEVEL_DATA.label}</Text>
          <Text style={styles.sparksToNext}>{LEVEL_DATA.sparksToNext} Sparks to next</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Sparks Section */}
      <View style={styles.sparksSection}>
        <View style={styles.headerRow}>
          <View style={styles.labelBadge}>
            <Icon name="lightning-bolt" size={16} color="#63B1D5" />
            <Text style={styles.labelText}>SPARKS THIS WEEK</Text>
          </View>
          <TouchableOpacity
            style={styles.historyBtn}
            onPress={() => navigation.navigate('SparksHistory')}
          >
            <Icon name="history" size={14} color={colors.textSecondary} />
            <Text style={styles.historyLink}>History</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sparksValue}>{SPARKS_DATA.thisWeek}</Text>

        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${SPARKS_DATA.progressPercent}%` },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>{SPARKS_DATA.progressLabel}</Text>
      </View>

      <View style={styles.divider} />

      {/* Streak Section */}
      <View style={styles.streakSection}>
        <View style={styles.streakIconBox}>
          <Icon name="fire" size={28} color="#FF9800" />
        </View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakLabel}>STREAK</Text>
          <Text style={styles.streakValue}>{SPARKS_DATA.streak}</Text>
          {SPARKS_DATA.activeToday && (
            <Text style={styles.activeToday}>active today ✓</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const getCombinedStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden', // so the level bg respects border radius
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  // Level Styles
  levelSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F9FA',
    padding: Spacing.md,
  },
  levelCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundWhite,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 4,
    borderColor: '#EAF6FF',
    borderTopColor: '#63B1D5',
    borderRightColor: '#63B1D5',
    transform: [{ rotate: '-45deg' }], // Simple trick to make it look like an arc
  },
  levelCircleNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#63B1D5',
    transform: [{ rotate: '45deg' }],
  },
  levelInfo: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  levelValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  sparksToNext: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  // Sparks Styles
  sparksSection: {
    padding: Spacing.md,
    backgroundColor: colors.backgroundWhite,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  labelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  historyLink: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  sparksValue: {
    fontSize: 36,
    fontWeight: '700',
    color: '#63B1D5',
    marginBottom: Spacing.sm,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#F3E8EE',
    borderRadius: 4,
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#63B1D5',
    borderRadius: 4,
  },
  progressLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  // Streak Styles
  streakSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: colors.backgroundWhite,
  },
  streakIconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#FFF8EA', // Very light orange/yellow background
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginRight: Spacing.lg,
  },
  streakInfo: {
    justifyContent: 'center',
  },
  streakLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  streakValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FF9800', // vibrant orange
    lineHeight: 32, // to keep it tight
  },
  activeToday: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});

// ─── Sub-components ───────────────────────────────────────────────────────────


/** Section 3: Streak Calendar */
const WEEK_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const StreakCalendar = () => {
  const { colors } = useTheme();
  const calStyles = getCalStyles(colors);

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [pickerMode, setPickerMode] = useState<'month' | 'year'>('month');

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const monthName = monthNames[currentMonth];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const startOffset = (firstDayOfMonth + 6) % 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const todayDate = new Date();
  const isCurrentMonth = todayDate.getFullYear() === currentYear && todayDate.getMonth() === currentMonth;
  const todayDay = isCurrentMonth ? todayDate.getDate() : null;

  const activeDays = useMemo(() => {
    if (currentYear === 2026 && currentMonth === 5) {
      return CALENDAR_DATA.activeDays;
    }
    const fakeDays = [];
    for (let i = 1; i <= daysInMonth; i++) {
      if ((i + currentMonth + currentYear) % 4 !== 0) {
        fakeDays.push(i);
      }
    }
    return fakeDays;
  }, [currentMonth, currentYear, daysInMonth]);

  const isActive = (day: number | null) => day !== null && activeDays.includes(day);
  const isToday = (day: number | null) => day === todayDay;

  const years = useMemo(() => {
    const y = [];
    for (let i = todayDate.getFullYear() - 5; i <= todayDate.getFullYear() + 5; i++) {
      y.push(i);
    }
    return y;
  }, [todayDate]);

  const selectMonth = (idx: number) => {
    setCurrentDate(new Date(currentYear, idx, 1));
    setPickerMode('year');
    setIsPickerVisible(false);
  };

  const selectYear = (y: number) => {
    setCurrentDate(new Date(y, currentMonth, 1));
    setIsPickerVisible(false);
  };

  return (
    <View style={calStyles.card}>
      <View style={calStyles.monthRow}>
        <TouchableOpacity style={calStyles.navBtn} onPress={handlePrevMonth}>
          <Icon name="chevron-left" size={20} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center' }}
          onPress={() => {
            setPickerMode('month');
            setIsPickerVisible(true);
          }}>
          <Text style={calStyles.monthTitle}>
            {monthName} {currentYear}
          </Text>
          <Icon name="menu-down" size={20} color={colors.textPrimary} style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        <TouchableOpacity style={calStyles.navBtn} onPress={handleNextMonth}>
          <Icon name="chevron-right" size={20} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      <View style={calStyles.weekRow}>
        {WEEK_DAYS.map((d, i) => (
          <View key={i} style={calStyles.dayCell}>
            <Text style={calStyles.weekDayText}>{d}</Text>
          </View>
        ))}
      </View>

      {weeks.map((week, wIdx) => (
        <View key={wIdx} style={calStyles.weekRow}>
          {week.map((day, dIdx) => {
            const active = isActive(day);
            const today = isToday(day);
            return (
              <View key={dIdx} style={calStyles.dayCell}>
                {day !== null ? (
                  <View
                    style={[
                      calStyles.dayCircle,
                      active && calStyles.dayCircleActive,
                      today && calStyles.dayCircleToday,
                    ]}>
                    <Text
                      style={[
                        calStyles.dayText,
                        active && calStyles.dayTextActive,
                        today && calStyles.dayTextToday,
                      ]}>
                      {day}
                    </Text>
                  </View>
                ) : (
                  <View style={calStyles.dayCircle} />
                )}
              </View>
            );
          })}
        </View>
      ))}

      <View style={calStyles.calFooter}>
        <Text style={calStyles.calFooterText}>
          🔥{' '}
          <Text style={calStyles.calFooterBold}>
            {CALENDAR_DATA.bestStreak} Day best
          </Text>
          {'   '}
          <Text style={calStyles.calFooterBold}>
            {activeDays.length} Active days
          </Text>{' '}
          this month
        </Text>
      </View>

      <Modal visible={isPickerVisible} transparent={true} animationType="fade">
        <View style={calStyles.modalOverlay}>
          <View style={calStyles.modalContent}>
            <View style={calStyles.modalHeader}>
              <TouchableOpacity onPress={() => setPickerMode('month')} style={calStyles.modalTab}>
                <Text style={[calStyles.modalTabText, pickerMode === 'month' && { color: colors.activeBlue, fontWeight: 'bold' }] as any}>Month</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPickerMode('year')} style={calStyles.modalTab}>
                <Text style={[calStyles.modalTabText, pickerMode === 'year' && { color: colors.activeBlue, fontWeight: 'bold' }] as any}>Year</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsPickerVisible(false)} style={calStyles.modalCloseBtn}>
                <Icon name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            {pickerMode === 'month' ? (
              <FlatList
                data={monthNames}
                keyExtractor={item => item}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[calStyles.pickerItem, index === currentMonth && { backgroundColor: colors.activeBlue }]}
                    onPress={() => selectMonth(index)}>
                    <Text style={[calStyles.pickerItemText, index === currentMonth && { color: colors.textWhite }]}>
                      {item.slice(0, 3)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <FlatList
                data={years}
                keyExtractor={item => item.toString()}
                numColumns={3}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[calStyles.pickerItem, item === currentYear && { backgroundColor: colors.activeBlue }]}
                    onPress={() => selectYear(item)}>
                    <Text style={[calStyles.pickerItemText, item === currentYear && { color: colors.textWhite }]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const getCalStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navBtn: {
    padding: 4,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 4,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleActive: {
    backgroundColor: colors.activeBlue,
  },
  dayCircleToday: {
    backgroundColor: '#E67E22',
  },
  dayText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  dayTextActive: {
    color: colors.textWhite,
    fontWeight: '700',
  },
  dayTextToday: {
    color: colors.textWhite,
    fontWeight: '700',
  },
  calFooter: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  calFooterText: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
  calFooterBold: {
    fontWeight: '700',
    color: colors.textSecondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: colors.backgroundWhite,
    borderRadius: 16,
    padding: 24,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: 8,
  },
  modalTab: {
    flex: 1,
    alignItems: 'center',
  },
  modalTabText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  modalCloseBtn: {
    position: 'absolute',
    right: 0,
    top: -5,
  },
  pickerItem: {
    flex: 1,
    margin: 4,
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: colors.backgroundLight,
  },
  pickerItemText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
});

const QuestsCard = () => {
  const { colors } = useTheme();
  const questStyles = getQuestStyles(colors);
  const navigation = useNavigation<any>();

  const questStatusColors: Record<string, string> = {
    Complete: '#27AE60',
    'In Progress': '#F39C12',
    'Not Started': colors.textMuted,
  };

  const questStatusBg: Record<string, string> = {
    Complete: '#EAFAF1',
    'In Progress': '#FEF9E7',
    'Not Started': colors.backgroundLight,
  };

  return (
    <View style={questStyles.card}>
      {/* Header */}
      <View style={questStyles.headerRow}>
        <Text style={questStyles.headerTitle}>ALL-TIME QUESTS</Text>
        <TouchableOpacity
          style={questStyles.headerRight}
          onPress={() => navigation.navigate('AllTimeQuests')}
        >
          <Icon name="trophy-outline" size={16} color="#63B1D5" />
          <Text style={questStyles.headerCount}>
            {QUESTS_DATA.completed}/{QUESTS_DATA.total}
          </Text>
          <Icon name="chevron-right" size={16} color="#63B1D5" />
        </TouchableOpacity>
      </View>

      {/* Global Progress Card */}
      <View style={questStyles.globalCard}>
        <View style={questStyles.globalProgressCircle}>
          <Text style={questStyles.globalProgressText}>20%</Text>
          <View style={questStyles.globalProgressArc} />
        </View>
        <View style={questStyles.globalInfo}>
          <Text style={questStyles.globalTitle}>3 of 15 complete</Text>
          <Text style={questStyles.globalSubtitle}>12 quests await — let's go!</Text>
        </View>
      </View>

      {/* Quest Items */}
      {QUESTS_DATA.items.map((quest) => {
        const isCompleted = quest.status === 'Completed';
        const isProgress = quest.status === 'In Progress';
        const isLocked = quest.status === 'Not Started';

        let statusTextColor = colors.textMuted;
        let statusBgColor = colors.backgroundLight;
        let borderStyle = questStyles.itemCardStandard;

        if (isCompleted) {
          statusTextColor = '#1ABC9C'; // Green
          statusBgColor = '#E8F8F5'; // Light green bg
          borderStyle = questStyles.itemCardCompleted;
        } else if (isProgress) {
          statusTextColor = '#63B1D5';
          statusBgColor = '#EAF6FF';
        }

        return (
          <View key={quest.id} style={[questStyles.itemCard, borderStyle]}>
            <View style={questStyles.questRow}>
              {/* Left Icon */}
              <View style={[questStyles.questIconBox, { backgroundColor: quest.iconBg }]}>
                <Icon name={quest.icon} size={20} color={quest.iconColor} />
              </View>

              {/* Center Content */}
              <View style={questStyles.questInfo}>
                <View style={questStyles.questTitleGroup}>
                  <Text style={questStyles.questName} numberOfLines={1}>
                    {quest.name}
                  </Text>
                  <View style={[questStyles.statusBadge, { backgroundColor: statusBgColor }]}>
                    <Text style={[questStyles.statusText, { color: statusTextColor }]}>
                      {quest.status}
                    </Text>
                  </View>
                </View>

                {isProgress && (
                  <View style={questStyles.progressSection}>
                    <View style={questStyles.progressTrack}>
                      <View
                        style={[
                          questStyles.progressFill,
                          { width: `${Math.round(quest.progress * 100)}%` },
                        ]}
                      />
                    </View>
                    <Text style={questStyles.progressText}>{quest.detail}</Text>
                  </View>
                )}
              </View>

              {/* Right Side Icons/Pills */}
              <View style={questStyles.rightSection}>
                {isCompleted && (
                  <Icon name="check-circle-outline" size={24} color="#1ABC9C" />
                )}
                {(isProgress || isLocked) && quest.sparks > 0 && (
                  <View style={questStyles.sparksPill}>
                    <Icon name="lightning-bolt" size={14} color="#63B1D5" />
                    <Text style={questStyles.sparksPillText}>{quest.sparks}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const getQuestStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  headerCount: {
    fontSize: FontSize.sm,
    color: '#63B1D5',
    fontWeight: '700',
    marginHorizontal: 2,
  },
  globalCard: {
    backgroundColor: '#F2FAFF',
    borderRadius: 16,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  globalProgressCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    borderWidth: 3,
    borderColor: '#E1F2FB',
  },
  globalProgressArc: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: '#63B1D5',
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }],
  },
  globalProgressText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#63B1D5',
  },
  globalInfo: {
    flex: 1,
  },
  globalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  globalSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  itemCard: {
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    backgroundColor: colors.backgroundWhite,
  },
  itemCardStandard: {
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  itemCardCompleted: {
    borderWidth: 1,
    borderColor: '#E1F2FB',
  },
  questRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  questInfo: {
    flex: 1,
  },
  questTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  questName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A5568',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  rightSection: {
    marginLeft: Spacing.sm,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sparksPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F8FA', // Very light soft blue
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 2,
  },
  sparksPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#63B1D5',
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#63B1D5',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#63B1D5',
    fontWeight: '700',
  },
});

/** Section 5: Stats Grid (2×2) */
const StatsGrid = () => {
  const { colors } = useTheme();
  const statsStyles = getStatsStyles(colors);
  return (
    <View style={statsStyles.outerContainer}>
      <View style={statsStyles.list}>
        {STATS_DATA.map((stat) => (
          <View
            key={stat.id}
            style={[statsStyles.card, { backgroundColor: stat.bgColor }]}>
            <View style={statsStyles.cardLeft}>
              <Text style={statsStyles.cardLabel}>{stat.label}</Text>
              <View style={statsStyles.valueRow}>
                <Text style={[statsStyles.cardValue, { color: stat.valueColor }]}>
                  {stat.value}
                </Text>
                {/* {stat.hasPill && (
                  <View style={statsStyles.timePill}>
                    <Icon name="clock-outline" size={14} color="#FFF" />
                    <Text style={statsStyles.timePillText}>11h 39m</Text>
                    <Icon name="chevron-up" size={16} color="#FFF" />
                  </View>
                )} */}
              </View>
              <Text style={statsStyles.cardSubtitle}>{stat.subtitle}</Text>
            </View>
            <View style={statsStyles.iconWrapper}>
              <Icon name={stat.icon} size={28} color={stat.iconColor} />
            </View>
          </View>
        ))}
      </View>
      <View style={statsStyles.divider} />
      <TouchableOpacity style={statsStyles.tipRow}>
        <Text style={statsStyles.tipText}>
          Use the platform more to improve your stats and rank
        </Text>
        <Icon name="arrow-right" size={16} color={colors.activeBlue} />
      </TouchableOpacity>
    </View>
  );
};

const getStatsStyles = (colors: any) => StyleSheet.create({
  outerContainer: {
    marginBottom: Spacing.xxl,
    backgroundColor: colors.backgroundWhite,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  list: {
    flexDirection: 'column',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 110,
  },
  cardLeft: {
    flex: 1,
  },
  cardLabel: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardValue: {
    fontSize: 40,
    fontWeight: '800',
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7FC3DF',
    borderRadius: BorderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  timePillText: {
    color: '#FFF',
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: FontSize.sm,
    color: colors.textSecondary,
    marginTop: 4,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: Spacing.md,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  tipText: {
    fontSize: FontSize.xs,
    color: colors.activeBlue,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

// ─── Main DashboardScreen ─────────────────────────────────────────────────────

const DashboardScreen: React.FC = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();
  const { state: authState } = useAuth();
  const insets = useSafeAreaInsets();

  const openDrawer = useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, [navigation]);

  const initials = (authState.user?.name ?? 'RR')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + Spacing.xxxl },
        ]}
        showsVerticalScrollIndicator={false}>
        <Header
          title="Dashboard"
          subtitle="Track your progress..."
          onMenuPress={openDrawer}
          avatarInitials={initials}
        />
        <CombinedProgressCard />
        <StreakCalendar />
        <QuestsCard />
        <StatsGrid />
      </ScrollView>
    </View>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Spacing.base,
  },
});

export default DashboardScreen;
