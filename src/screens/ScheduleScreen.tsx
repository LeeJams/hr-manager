import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { COLORS, THEME } from '../constants';
import { useScheduleStore, useProjectStore } from '../stores';
import { Schedule } from '../types';
import Icon from 'react-native-vector-icons/Ionicons';

const ScheduleScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { schedules, getSchedulesForDate, setSelectedDate: setStoreSelectedDate } = useScheduleStore();
  const { projects } = useProjectStore();

  const selectedSchedules = getSchedulesForDate(new Date(selectedDate));

  useEffect(() => {
    setStoreSelectedDate(new Date(selectedDate));
  }, [selectedDate, setStoreSelectedDate]);

  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};

    schedules.forEach((schedule) => {
      const dateKey = schedule.date.toISOString().split('T')[0];
      if (!marked[dateKey]) {
        marked[dateKey] = { dots: [] };
      }

      const color = getScheduleTypeColor(schedule.type);
      marked[dateKey].dots.push({ color });
    });

    // Mark selected date
    if (marked[selectedDate]) {
      marked[selectedDate].selected = true;
      marked[selectedDate].selectedColor = COLORS.primary;
    } else {
      marked[selectedDate] = {
        selected: true,
        selectedColor: COLORS.primary,
        dots: [],
      };
    }

    return marked;
  };

  const getScheduleTypeColor = (type: string) => {
    switch (type) {
      case 'project': return COLORS.primary;
      case 'meeting': return COLORS.warning;
      case 'personal': return COLORS.success;
      case 'vacation': return COLORS.secondary;
      default: return COLORS.textSecondary;
    }
  };

  const getScheduleTypeIcon = (type: string) => {
    switch (type) {
      case 'project': return 'briefcase-outline';
      case 'meeting': return 'people-outline';
      case 'personal': return 'person-outline';
      case 'vacation': return 'airplane-outline';
      default: return 'calendar-outline';
    }
  };

  const getScheduleTypeLabel = (type: string) => {
    switch (type) {
      case 'project': return '프로젝트';
      case 'meeting': return '회의';
      case 'personal': return '개인';
      case 'vacation': return '휴가';
      default: return '기타';
    }
  };

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  const handleSchedulePress = (schedule: Schedule) => {
    Alert.alert(
      schedule.title,
      `시간: ${schedule.startTime} - ${schedule.endTime}\n타입: ${getScheduleTypeLabel(schedule.type)}${schedule.projectId ? `\n프로젝트: ${projects.find(p => p.id === schedule.projectId)?.title || '알 수 없음'}` : ''}`,
      [{ text: '확인' }]
    );
  };

  const renderScheduleItem = ({ item }: { item: Schedule }) => (
    <TouchableOpacity
      style={styles.scheduleItem}
      onPress={() => handleSchedulePress(item)}
      hitSlop={THEME.hitSlop.small}
    >
      <View style={styles.scheduleLeftContent}>
        <View style={[styles.scheduleTypeIndicator, { backgroundColor: getScheduleTypeColor(item.type) }]}>
          <Icon
            name={getScheduleTypeIcon(item.type)}
            size={16}
            color={COLORS.background}
          />
        </View>
        <View style={styles.scheduleDetails}>
          <Text style={styles.scheduleTitle}>{item.title}</Text>
          <Text style={styles.scheduleTime}>
            {item.startTime} - {item.endTime}
          </Text>
          <Text style={styles.scheduleType}>{getScheduleTypeLabel(item.type)}</Text>
        </View>
      </View>
      <View style={styles.scheduleRightContent}>
        {item.isAvailable ? (
          <View style={styles.availabilityBadge}>
            <Icon name="checkmark-circle" size={16} color={COLORS.success} />
            <Text style={styles.availabilityText}>가능</Text>
          </View>
        ) : (
          <View style={[styles.availabilityBadge, styles.unavailableBadge]}>
            <Icon name="close-circle" size={16} color={COLORS.error} />
            <Text style={[styles.availabilityText, styles.unavailableText]}>불가능</Text>
          </View>
        )}
        <Icon name="chevron-forward" size={16} color={COLORS.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>일정 관리</Text>
      <Text style={styles.headerSubtitle}>프로젝트 일정을 확인하세요</Text>
    </View>
  );

  const renderSelectedDateHeader = () => (
    <View style={styles.selectedDateHeader}>
      <Text style={styles.selectedDateTitle}>
        {new Date(selectedDate).toLocaleDateString('ko-KR', {
          month: 'long',
          day: 'numeric',
          weekday: 'long'
        })}
      </Text>
      <Text style={styles.scheduleCount}>
        {selectedSchedules.length}개의 일정
      </Text>
    </View>
  );

  const renderEmptySchedule = () => (
    <View style={styles.emptyContainer}>
      <Icon name="calendar-outline" size={48} color={COLORS.textSecondary} />
      <Text style={styles.emptyTitle}>일정이 없습니다</Text>
      <Text style={styles.emptyDescription}>
        선택한 날짜에 등록된 일정이 없습니다
      </Text>
    </View>
  );

  const renderLegend = () => (
    <View style={styles.legend}>
      <Text style={styles.legendTitle}>일정 구분</Text>
      <View style={styles.legendItems}>
        {[
          { type: 'project', label: '프로젝트' },
          { type: 'meeting', label: '회의' },
          { type: 'personal', label: '개인' },
          { type: 'vacation', label: '휴가' },
        ].map((item) => (
          <View key={item.type} style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: getScheduleTypeColor(item.type) }
              ]}
            />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      <Calendar
        current={selectedDate}
        onDayPress={handleDateSelect}
        markedDates={getMarkedDates()}
        markingType="multi-dot"
        theme={{
          backgroundColor: COLORS.background,
          calendarBackground: COLORS.background,
          textSectionTitleColor: COLORS.text,
          selectedDayBackgroundColor: COLORS.primary,
          selectedDayTextColor: COLORS.background,
          todayTextColor: COLORS.primary,
          dayTextColor: COLORS.text,
          textDisabledColor: COLORS.textSecondary,
          dotColor: COLORS.primary,
          selectedDotColor: COLORS.background,
          arrowColor: COLORS.primary,
          monthTextColor: COLORS.text,
          textDayFontWeight: '500',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
        style={styles.calendar}
      />

      {renderLegend()}
      {renderSelectedDateHeader()}

      <FlatList
        data={selectedSchedules}
        renderItem={renderScheduleItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.scheduleList}
        ListEmptyComponent={renderEmptySchedule}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  calendar: {
    marginHorizontal: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  legend: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: THEME.spacing.sm,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  selectedDateHeader: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  selectedDateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  scheduleCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scheduleList: {
    padding: THEME.spacing.lg,
    paddingTop: THEME.spacing.md,
  },
  scheduleItem: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  scheduleLeftContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleTypeIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  scheduleDetails: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  scheduleTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  scheduleType: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  scheduleRightContent: {
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  availabilityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.success}20`,
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.sm,
    gap: 4,
  },
  unavailableBadge: {
    backgroundColor: `${COLORS.error}20`,
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.success,
  },
  unavailableText: {
    color: COLORS.error,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: THEME.spacing.xl * 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
  },
  emptyDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default ScheduleScreen;