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
      icon: 'check-circle',
      name: 'First Steps',
      status: 'Complete',
      progress: 1,
      detail: '',
    },
    {
      id: '2',
      icon: 'calendar-week',
      name: 'Week Warrior',
      status: 'In Progress',
      progress: 0.375,
      detail: '37.5%',
    },
    {
      id: '3',
      icon: 'star-shooting-outline',
      name: 'Perfectionist',
      status: 'Not Started',
      progress: 0,
      detail: '0 / 28',
    },
  ],
};

const STATS_DATA = [
  {
    id: 'ai_messages',
    label: 'AI MESSAGES',
    value: '22',
    subtitle: '3 this week',
    icon: 'message-text-outline',
    bgColor: '#EBF5FB',
    iconColor: '#2196F3',
  },
  {
    id: 'quizzes',
    label: 'QUIZZES TAKEN',
    value: '5',
    subtitle: '0 this week',
    icon: 'clipboard-text-outline',
    bgColor: '#E8F8F5',
    iconColor: '#1ABC9C',
  },
  {
    id: 'gaps',
    label: 'LEARNING GAPS',
    value: '12',
    subtitle: 'topics to review',
    icon: 'auto-fix',
    bgColor: '#F5EEF8',
    iconColor: '#8E44AD',
  },
  {
    id: 'rank',
    label: 'AI USAGE RANK',
    value: '#1',
    subtitle: 'of 2 active users',
    icon: 'trophy-outline',
    bgColor: '#FEFCBF',
    iconColor: '#D4AC0D',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Section 1: Level card */
const LevelCard = () => {
  const { colors } = useTheme();
  const levelStyles = getLevelStyles(colors);
  return (
  <View style={levelStyles.card}>
    <View style={levelStyles.circle}>
      <Text style={levelStyles.circleNumber}>{LEVEL_DATA.current}</Text>
    </View>
    <View style={levelStyles.info}>
      <Text style={levelStyles.levelLabel}>LEVEL</Text>
      <Text style={levelStyles.levelValue}>{LEVEL_DATA.label}</Text>
      <Text style={levelStyles.sparksToNext}>{LEVEL_DATA.sparksToNext} Sparks to next</Text>
    </View>
  </View>
  );
};

const getLevelStyles = (colors: any) => StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF6FF',
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  circle: {
    width: 52,
    height: 52,
    borderRadius: BorderRadius.full,
    borderWidth: 3,
    borderColor: colors.activeBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.base,
    backgroundColor: colors.backgroundWhite,
  },
  circleNumber: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: colors.activeBlue,
  },
  info: {
    flex: 1,
  },
  levelLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    color: colors.textMuted,
    letterSpacing: 1,
  },
  levelValue: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: colors.textPrimary,
    marginTop: 1,
  },
  sparksToNext: {
    fontSize: FontSize.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
});

/** Section 2: Sparks This Week + Streak */
const SparksStreakCard = () => {
  const { colors } = useTheme();
  const sparksStyles = getSparksStyles(colors);
  return (
  <View style={sparksStyles.card}>
    <View style={sparksStyles.headerRow}>
      <View style={sparksStyles.labelBadge}>
        <Text style={sparksStyles.labelIcon}>⚡</Text>
        <Text style={sparksStyles.labelText}>SPARKS THIS WEEK</Text>
      </View>
      <TouchableOpacity>
        <Text style={sparksStyles.historyLink}>🕓 History</Text>
      </TouchableOpacity>
    </View>

    <Text style={sparksStyles.sparksValue}>{SPARKS_DATA.thisWeek}</Text>

    <View style={sparksStyles.progressTrack}>
      <View
        style={[
          sparksStyles.progressFill,
          { width: `${SPARKS_DATA.progressPercent}%` },
        ]}
      />
    </View>
    <Text style={sparksStyles.progressLabel}>{SPARKS_DATA.progressLabel}</Text>

    <View style={sparksStyles.separator} />

    <View style={sparksStyles.streakRow}>
      <View style={sparksStyles.streakLeft}>
        <Text style={sparksStyles.streakIcon}>🔥</Text>
        <Text style={sparksStyles.streakLabel}>STREAK</Text>
      </View>
      <View style={sparksStyles.streakRight}>
        <Text style={sparksStyles.streakValue}>{SPARKS_DATA.streak}</Text>
        {SPARKS_DATA.activeToday && (
          <Text style={sparksStyles.activeToday}>active today ✓</Text>
        )}
      </View>
    </View>
  </View>
  );
};

const getSparksStyles = (colors: any) => StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  labelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FB',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    gap: 4,
  },
  labelIcon: {
    fontSize: 12,
  },
  labelText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: colors.activeBlue,
    letterSpacing: 0.5,
  },
  historyLink: {
    fontSize: FontSize.sm,
    color: colors.textMuted,
  },
  sparksValue: {
    fontSize: 44,
    fontWeight: FontWeight.bold,
    color: colors.textPrimary,
    lineHeight: 52,
  },
  progressTrack: {
    height: 8,
    backgroundColor: colors.borderLight,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.activeBlue,
    borderRadius: BorderRadius.full,
  },
  progressLabel: {
    fontSize: FontSize.xs,
    color: colors.textMuted,
    marginBottom: Spacing.base,
  },
  separator: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: Spacing.base,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  streakIcon: {
    fontSize: 20,
  },
  streakLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: colors.textMuted,
    letterSpacing: 1,
  },
  streakRight: {
    alignItems: 'flex-end',
  },
  streakValue: {
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: '#E67E22',
    lineHeight: 36,
  },
  activeToday: {
    fontSize: FontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
});

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
     for(let i=1; i<=daysInMonth; i++) {
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
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  navBtn: {
    padding: Spacing.xs,
  },
  monthTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semiBold,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.xs,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
    color: colors.textMuted,
    marginBottom: 4,
  },
  dayCircle: {
    width: 30,
    height: 30,
    borderRadius: BorderRadius.full,
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
    fontWeight: FontWeight.medium,
  },
  dayTextActive: {
    color: colors.textWhite,
    fontWeight: FontWeight.bold,
  },
  dayTextToday: {
    color: colors.textWhite,
    fontWeight: FontWeight.bold,
  },
  calFooter: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  calFooterText: {
    fontSize: FontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
  calFooterBold: {
    fontWeight: FontWeight.bold,
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
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingBottom: Spacing.sm,
  },
  modalTab: {
    flex: 1,
    alignItems: 'center',
  },
  modalTabText: {
    fontSize: FontSize.md,
    color: colors.textSecondary,
  },
  modalCloseBtn: {
    position: 'absolute',
    right: 0,
    top: -5,
  },
  pickerItem: {
    flex: 1,
    margin: Spacing.xs,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    backgroundColor: colors.backgroundLight,
  },
  pickerItemText: {
    fontSize: FontSize.sm,
    color: colors.textPrimary,
    fontWeight: FontWeight.semiBold,
  },
});

const QuestsCard = () => {
  const { colors } = useTheme();
  const questStyles = getQuestStyles(colors);
  
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
    <View style={questStyles.headerRow}>
      <Text style={questStyles.headerTitle}>ALL-TIME QUESTS</Text>
      <TouchableOpacity style={questStyles.headerRight}>
        <Text style={questStyles.headerCount}>
          ✅ {QUESTS_DATA.completed}/{QUESTS_DATA.total}
        </Text>
        <Icon name="chevron-right" size={16} color={colors.textMuted} />
      </TouchableOpacity>
    </View>

    {QUESTS_DATA.items.map((quest, idx) => {
      const statusColor = questStatusColors[quest.status] ?? colors.textMuted;
      const statusBg = questStatusBg[quest.status] ?? colors.backgroundLight;
      return (
        <View key={quest.id}>
          {idx > 0 && <View style={questStyles.divider} />}
          <View style={questStyles.questRow}>
            <View style={[questStyles.questIconBox, { backgroundColor: statusBg }]}>
              <Icon name={quest.icon} size={18} color={statusColor} />
            </View>
            <View style={questStyles.questInfo}>
              <View style={questStyles.questTopRow}>
                <Text style={questStyles.questName} numberOfLines={1}>
                  {quest.name}
                </Text>
                <View style={[questStyles.statusBadge, { backgroundColor: statusBg }]}>
                  <Text style={[questStyles.statusText, { color: statusColor }]}>
                    {quest.status}
                  </Text>
                </View>
              </View>
              <View style={questStyles.progressTrack}>
                <View
                  style={[
                    questStyles.progressFill,
                    {
                      width: `${Math.round(quest.progress * 100)}%`,
                      backgroundColor: statusColor,
                    },
                  ]}
                />
              </View>
              {quest.detail !== '' && (
                <Text style={questStyles.questDetail}>{quest.detail}</Text>
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
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
  },
  headerTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  headerCount: {
    fontSize: FontSize.sm,
    color: colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: Spacing.sm,
  },
  questRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: Spacing.xs,
  },
  questIconBox: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    flexShrink: 0,
  },
  questInfo: {
    flex: 1,
  },
  questTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  questName: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semiBold,
    color: colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  statusBadge: {
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  statusText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semiBold,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: BorderRadius.full,
  },
  questDetail: {
    fontSize: FontSize.xs,
    color: colors.textMuted,
    marginTop: 3,
  },
});

/** Section 5: Stats Grid (2×2) */
const StatsGrid = () => {
  const { colors } = useTheme();
  const statsStyles = getStatsStyles(colors);
  return (
  <View style={statsStyles.container}>
    <View style={statsStyles.grid}>
      {STATS_DATA.map((stat) => (
        <View
          key={stat.id}
          style={[statsStyles.card, { backgroundColor: stat.bgColor }]}>
          <View style={statsStyles.cardTop}>
            <Icon name={stat.icon} size={24} color={stat.iconColor} />
            <Text style={statsStyles.cardLabel}>{stat.label}</Text>
          </View>
          <Text style={[statsStyles.cardValue, { color: stat.iconColor }]}>
            {stat.value}
          </Text>
          <Text style={statsStyles.cardSubtitle}>{stat.subtitle}</Text>
        </View>
      ))}
    </View>
    <Text style={statsStyles.tipText}>
      Use the platform more to improve your stats and rank
    </Text>
  </View>
  );
};

const getStatsStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: Spacing.xxl,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  card: {
    width: '48%',
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    minHeight: 110,
    justifyContent: 'space-between',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  cardLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: colors.textSecondary,
    letterSpacing: 0.3,
    flexShrink: 1,
  },
  cardValue: {
    fontSize: 36,
    fontWeight: FontWeight.bold,
    lineHeight: 40,
  },
  cardSubtitle: {
    fontSize: FontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
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
      <Header
        title="Dashboard"
        subtitle="Track your progress..."
        onMenuPress={openDrawer}
        avatarInitials={initials}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + Spacing.xxxl },
        ]}
        showsVerticalScrollIndicator={false}>

        <LevelCard />
        <SparksStreakCard />
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
