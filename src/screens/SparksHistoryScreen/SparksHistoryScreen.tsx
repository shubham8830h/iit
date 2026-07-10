import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../store/ThemeContext';
import { moderateScale, scale, verticalScale } from '../../utils';

const HISTORY_DATA = [
  { id: '1', title: 'Daily login bonus', date: 'Jul 9, 2026', sparks: '+10' },
  { id: '2', title: 'Daily login bonus', date: 'Jul 8, 2026', sparks: '+10' },
  { id: '3', title: 'Daily login bonus', date: 'Jul 7, 2026', sparks: '+10' },
  { id: '4', title: 'Daily login bonus', date: 'Jul 1, 2026', sparks: '+10' },
  { id: '5', title: 'Quiz score 40% (attempt 1)', date: 'Jun 30, 2026', sparks: '+20' },
  { id: '6', title: 'AI chat message', date: 'Jun 30, 2026', sparks: '+5' },
  { id: '7', title: 'AI chat message', date: 'Jun 29, 2026', sparks: '+5' },
  { id: '8', title: 'AI chat message', date: 'Jun 29, 2026', sparks: '+5' },
  { id: '9', title: 'AI chat message', date: 'Jun 29, 2026', sparks: '+5' },
  { id: '10', title: 'Daily login bonus', date: 'Jun 29, 2026', sparks: '+10' },
  { id: '11', title: 'Daily login bonus', date: 'Jun 28, 2026', sparks: '+10' },
  { id: '12', title: 'Quiz streak = 5!', date: 'Jun 25, 2026', sparks: '+25' },
];

const SparksHistoryScreen: React.FC = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = getStyles(colors, isDarkMode);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top }]}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <Icon name="lightning-bolt" size={moderateScale(18)} color="#63B1D5" style={{ marginRight: 6 }} />
            <Text style={styles.headerTitle}>Sparks History</Text>
          </View>
          <TouchableOpacity 
            style={styles.closeBtn} 
            onPress={() => navigation.goBack()}
          >
            <Icon name="close" size={moderateScale(24)} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* List */}
        <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
          {HISTORY_DATA.map((item, idx) => (
            <View key={item.id}>
              {idx > 0 && <View style={styles.divider} />}
              <View style={styles.historyRow}>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyTitle}>{item.title}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <View style={styles.sparksPill}>
                  <Icon name="star-four-points" size={12} color="#1ABC9C" />
                  <Text style={styles.sparksValue}>{item.sparks}</Text>
                </View>
              </View>
            </View>
          ))}
          
          <Text style={styles.footerText}>Showing recent 50 records</Text>
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
    backgroundColor: '#F9FCFD',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FCFD',
  },
  
  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    backgroundColor: '#F9FCFD',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: moderateScale(15),
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    padding: scale(4),
  },

  /* List */
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: scale(16),
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(12),
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: moderateScale(11),
    color: colors.textMuted,
  },
  sparksPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sparksValue: {
    fontSize: moderateScale(13),
    fontWeight: '700',
    color: '#1ABC9C',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
  },
  footerText: {
    textAlign: 'center',
    fontSize: moderateScale(11),
    color: colors.textMuted,
    marginTop: verticalScale(24),
    marginBottom: verticalScale(16),
  },
});

export default SparksHistoryScreen;
