import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import { COLORS, THEME } from '../constants';
import { useAuthStore, useProjectStore, useNotificationStore, useScheduleStore } from '../stores';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeScreenNavigationProp = StackNavigationProp<HomeStackParamList, 'HomeScreen'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuthStore();
  const { projects, projectRequests, isLoading: projectLoading } = useProjectStore();
  const { notifications, unreadCount } = useNotificationStore();
  const { schedules, getSchedulesForDate } = useScheduleStore();

  const [refreshing, setRefreshing] = React.useState(false);

  const todaySchedules = getSchedulesForDate(new Date());
  const pendingRequests = projectRequests.filter(req => req.status === 'pending');
  const activeProjects = projects.filter(project => project.status === 'active');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // TODO: Implement refresh logic
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderScheduleSummary = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>내 일정 요약</Text>
        <TouchableOpacity hitSlop={THEME.hitSlop.small}>
          <Icon name="calendar-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <Text style={styles.scheduleDate}>오늘 ({new Date().toLocaleDateString('ko-KR')})</Text>

        {todaySchedules.length > 0 ? (
          todaySchedules.slice(0, 3).map((schedule, index) => (
            <View key={schedule.id} style={styles.scheduleItem}>
              <View style={[styles.scheduleIndicator, { backgroundColor: getScheduleColor(schedule.type) }]} />
              <View style={styles.scheduleInfo}>
                <Text style={styles.scheduleTitle}>{schedule.title}</Text>
                <Text style={styles.scheduleTime}>
                  {schedule.startTime} - {schedule.endTime}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>오늘 일정이 없습니다</Text>
        )}

        {todaySchedules.length > 3 && (
          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreButtonText}>+{todaySchedules.length - 3}개 더 보기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderRequestsSummary = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>받은 요청</Text>
        {pendingRequests.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{pendingRequests.length}</Text>
          </View>
        )}
      </View>

      <View style={styles.cardContent}>
        {pendingRequests.length > 0 ? (
          pendingRequests.slice(0, 3).map((request) => (
            <TouchableOpacity key={request.id} style={styles.requestItem}>
              <View style={styles.requestIcon}>
                <Icon
                  name={request.type === 'invite' ? 'people-outline' : 'calendar-outline'}
                  size={16}
                  color={COLORS.primary}
                />
              </View>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>
                  {request.type === 'invite' ? '프로젝트 초대' : '일정 요청'}
                </Text>
                <Text style={styles.requestMessage}>{request.message || '새로운 요청이 있습니다'}</Text>
              </View>
              <Icon name="chevron-forward" size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>새로운 요청이 없습니다</Text>
        )}
      </View>
    </View>
  );

  const renderProjectsSummary = () => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>프로젝트 현황</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('TeamManagement')}
          hitSlop={THEME.hitSlop.small}
        >
          <Icon name="settings-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.projectStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{activeProjects.length}</Text>
            <Text style={styles.statLabel}>진행 중</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{projects.filter(p => p.status === 'completed').length}</Text>
            <Text style={styles.statLabel}>완료</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{projects.filter(p => p.status === 'planning').length}</Text>
            <Text style={styles.statLabel}>기획 중</Text>
          </View>
        </View>

        {activeProjects.length > 0 && (
          <View style={styles.recentProjects}>
            <Text style={styles.sectionTitle}>최근 프로젝트</Text>
            {activeProjects.slice(0, 2).map((project) => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectItem}
                onPress={() => navigation.navigate('ProjectDetail', { projectId: project.id })}
              >
                <View style={styles.projectInfo}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                </View>
                <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(project.priority) }]} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );

  const getScheduleColor = (type: string) => {
    switch (type) {
      case 'project': return COLORS.primary;
      case 'meeting': return COLORS.warning;
      case 'personal': return COLORS.success;
      case 'vacation': return COLORS.secondary;
      default: return COLORS.textSecondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return COLORS.error;
      case 'medium': return COLORS.warning;
      case 'low': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>안녕하세요,</Text>
            <Text style={styles.userName}>{user?.name || '사용자'}님!</Text>
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity style={styles.notificationButton}>
              <Icon name="notifications-outline" size={24} color={COLORS.text} />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationBadgeText}>{unreadCount}</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          {renderScheduleSummary()}
          {renderRequestsSummary()}
          {renderProjectsSummary()}
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    backgroundColor: COLORS.background,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 2,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: COLORS.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: THEME.spacing.lg,
    gap: THEME.spacing.lg,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  badge: {
    backgroundColor: COLORS.error,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: COLORS.background,
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardContent: {
    gap: THEME.spacing.sm,
  },
  scheduleDate: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: THEME.spacing.sm,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.sm,
  },
  scheduleIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: THEME.spacing.sm,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  scheduleTime: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: THEME.spacing.md,
  },
  moreButton: {
    alignItems: 'center',
    paddingVertical: THEME.spacing.sm,
  },
  moreButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.sm,
    gap: THEME.spacing.sm,
  },
  requestIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  requestMessage: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  projectStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: THEME.spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  recentProjects: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: THEME.spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: THEME.spacing.sm,
  },
  projectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.sm,
    gap: THEME.spacing.sm,
  },
  projectInfo: {
    flex: 1,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  projectDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  priorityIndicator: {
    width: 8,
    height: 20,
    borderRadius: 4,
  },
});

export default HomeScreen;