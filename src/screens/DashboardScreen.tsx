import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';
import { Employee, Attendance } from '../types';
import { COLORS, SPACING } from '../constants';

const { width } = Dimensions.get('window');

interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
  pendingLeaves: number;
}

const DashboardScreen: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalEmployees: 0,
    presentToday: 0,
    lateToday: 0,
    absentToday: 0,
    pendingLeaves: 0,
  });
  const [recentAttendance, setRecentAttendance] = useState<Attendance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // 병렬로 데이터 로드
      const [employees, todayAttendance, leaves] = await Promise.all([
        apiService.getEmployees(),
        apiService.getAttendance(undefined, new Date()),
        apiService.getLeaves(),
      ]);

      // 통계 계산
      const totalEmployees = employees.length;
      const presentToday = todayAttendance.filter(a => a.status === 'present').length;
      const lateToday = todayAttendance.filter(a => a.status === 'late').length;
      const absentToday = totalEmployees - presentToday - lateToday;
      const pendingLeaves = leaves.filter(l => l.status === 'pending').length;

      setStats({
        totalEmployees,
        presentToday,
        lateToday,
        absentToday,
        pendingLeaves,
      });

      setRecentAttendance(todayAttendance.slice(0, 10));
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    color: string;
    subtitle?: string;
  }> = ({ title, value, color, subtitle }) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <Text style={styles.statTitle}>{title}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>안녕하세요, {user?.name}님!</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>오늘의 현황</Text>

        <View style={styles.statsGrid}>
          <StatCard
            title="전체 직원"
            value={stats.totalEmployees}
            color={COLORS.primary}
          />
          <StatCard
            title="출근"
            value={stats.presentToday}
            color={COLORS.success}
          />
          <StatCard
            title="지각"
            value={stats.lateToday}
            color={COLORS.warning}
          />
          <StatCard
            title="결근"
            value={stats.absentToday}
            color={COLORS.error}
          />
        </View>

        <StatCard
          title="승인 대기 휴가"
          value={stats.pendingLeaves}
          color={COLORS.secondary}
          subtitle="승인이 필요한 휴가 신청"
        />
      </View>

      <View style={styles.recentContainer}>
        <Text style={styles.sectionTitle}>오늘의 출근 현황</Text>

        {recentAttendance.length > 0 ? (
          recentAttendance.map((attendance) => (
            <View key={attendance.id} style={styles.attendanceItem}>
              <View style={styles.attendanceInfo}>
                <Text style={styles.employeeName}>
                  직원 ID: {attendance.employeeId}
                </Text>
                <Text style={styles.attendanceTime}>
                  출근: {attendance.checkIn ?
                    new Date(attendance.checkIn).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    }) :
                    '-'
                  }
                </Text>
                {attendance.checkOut && (
                  <Text style={styles.attendanceTime}>
                    퇴근: {new Date(attendance.checkOut).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                )}
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(attendance.status) }
              ]}>
                <Text style={styles.statusText}>
                  {getStatusText(attendance.status)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>오늘 출근 기록이 없습니다.</Text>
        )}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>빠른 작업</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>직원 추가</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>출근 처리</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>휴가 승인</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>리포트 생성</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'present': return COLORS.success;
    case 'late': return COLORS.warning;
    case 'absent': return COLORS.error;
    default: return COLORS.textSecondary;
  }
};

const getStatusText = (status: string): string => {
  switch (status) {
    case 'present': return '출근';
    case 'late': return '지각';
    case 'absent': return '결근';
    default: return status;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  date: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statsContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  statCard: {
    width: (width - SPACING.lg * 3) / 2,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    borderLeftWidth: 4,
    marginBottom: SPACING.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statTitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  statSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  recentContainer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  attendanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  attendanceInfo: {
    flex: 1,
  },
  employeeName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  attendanceTime: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: COLORS.surface,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    paddingVertical: SPACING.lg,
  },
  quickActions: {
    padding: SPACING.lg,
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - SPACING.lg * 3) / 2,
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  actionButtonText: {
    color: COLORS.surface,
    fontWeight: '500',
  },
});

export default DashboardScreen;