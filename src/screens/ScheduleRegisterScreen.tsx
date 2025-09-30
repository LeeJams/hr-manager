import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Calendar, DateData } from 'react-native-calendars';
import { COLORS, THEME } from '../constants';
import { useScheduleStore } from '../stores';
import Icon from 'react-native-vector-icons/Ionicons';

interface ScheduleFormData {
  title: string;
  startTime: string;
  endTime: string;
  description: string;
}

const ScheduleRegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [scheduleType, setScheduleType] = useState<'personal' | 'available'>('available');
  const { addSchedule } = useScheduleStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormData>();

  const onSubmit = async (data: ScheduleFormData) => {
    try {
      const newSchedule = {
        id: Date.now().toString(),
        title: data.title,
        date: new Date(selectedDate),
        startTime: data.startTime,
        endTime: data.endTime,
        type: scheduleType === 'available' ? 'personal' : scheduleType,
        userId: 'current-user',
        isAvailable: scheduleType === 'available',
      };

      addSchedule(newSchedule);
      Alert.alert('성공', '일정이 등록되었습니다.', [
        { text: '확인', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('오류', '일정 등록에 실패했습니다.');
    }
  };

  const handleDateSelect = (day: DateData) => {
    setSelectedDate(day.dateString);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={THEME.hitSlop.medium}
        >
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>일정 등록</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>날짜 선택</Text>
        <Calendar
          current={selectedDate}
          onDayPress={handleDateSelect}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: COLORS.primary },
          }}
          theme={{
            backgroundColor: COLORS.background,
            calendarBackground: COLORS.surface,
            textSectionTitleColor: COLORS.text,
            selectedDayBackgroundColor: COLORS.primary,
            selectedDayTextColor: COLORS.background,
            todayTextColor: COLORS.primary,
            dayTextColor: COLORS.text,
            textDisabledColor: COLORS.textSecondary,
            arrowColor: COLORS.primary,
            monthTextColor: COLORS.text,
          }}
          style={styles.calendar}
        />

        <Text style={styles.sectionTitle}>일정 유형</Text>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, scheduleType === 'available' && styles.activeTypeButton]}
            onPress={() => setScheduleType('available')}
          >
            <Text style={[styles.typeButtonText, scheduleType === 'available' && styles.activeTypeButtonText]}>
              가능한 시간
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, scheduleType === 'personal' && styles.activeTypeButton]}
            onPress={() => setScheduleType('personal')}
          >
            <Text style={[styles.typeButtonText, scheduleType === 'personal' && styles.activeTypeButtonText]}>
              개인 일정
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>일정 정보</Text>
        <View style={styles.form}>
          <Controller
            control={control}
            name="title"
            rules={{ required: '제목을 입력해주세요' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <TextInput
                  placeholder="일정 제목"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
                {errors.title && <Text style={styles.errorText}>{errors.title.message}</Text>}
              </>
            )}
          />

          <View style={styles.timeContainer}>
            <Controller
              control={control}
              name="startTime"
              rules={{ required: '시작 시간을 입력해주세요' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.timeInput}>
                  <Text style={styles.timeLabel}>시작 시간</Text>
                  <TextInput
                    placeholder="09:00"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                  {errors.startTime && <Text style={styles.errorText}>{errors.startTime.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="endTime"
              rules={{ required: '종료 시간을 입력해주세요' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.timeInput}>
                  <Text style={styles.timeLabel}>종료 시간</Text>
                  <TextInput
                    placeholder="18:00"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                  {errors.endTime && <Text style={styles.errorText}>{errors.endTime.message}</Text>}
                </View>
              )}
            />
          </View>

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="일정 설명 (선택사항)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                multiline
                numberOfLines={3}
                style={[styles.input, styles.multilineInput]}
              />
            )}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="등록하기"
            onPress={handleSubmit(onSubmit)}
            buttonStyle={styles.submitButton}
            titleStyle={styles.submitButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
  },
  backButton: {
    marginRight: THEME.spacing.md,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: THEME.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: THEME.spacing.md,
    marginTop: THEME.spacing.lg,
  },
  calendar: {
    borderRadius: THEME.borderRadius.lg,
    elevation: 2,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
    marginBottom: THEME.spacing.md,
  },
  typeButton: {
    flex: 1,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    backgroundColor: COLORS.surface,
  },
  activeTypeButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  activeTypeButtonText: {
    color: COLORS.background,
  },
  form: {
    gap: THEME.spacing.md,
  },
  inputContainer: {
    marginBottom: 0,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: THEME.spacing.md,
  },
  timeInput: {
    flex: 1,
    marginHorizontal: THEME.spacing.sm,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: THEME.spacing.sm,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: THEME.spacing.xl,
    marginBottom: THEME.spacing.xl,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.md,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    fontSize: 16,
    color: COLORS.text,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginBottom: THEME.spacing.md,
  },
});

export default ScheduleRegisterScreen;