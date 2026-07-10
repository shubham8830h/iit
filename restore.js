import fs from 'fs';

const filePath = 'e:\\\\React-native\\\\iitpk\\\\src\\\\screens\\\\DashboardScreen\\\\DashboardScreen.tsx';
let content = fs.readFileSync(filePath, 'utf-8');

const streakCalendarCode = `
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

`;

content = content.replace(
  "const QuestsCard = () => {",
  streakCalendarCode + "const QuestsCard = () => {"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log("Restored StreakCalendar");
