import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../types';
import { COLORS, THEME } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

type ProjectDetailRouteProp = RouteProp<HomeStackParamList, 'ProjectDetail'>;

const ProjectDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProjectDetailRouteProp>();
  const { projectId } = route.params;

  // Mock project data - in real app, this would come from store/API
  const project = {
    id: projectId,
    title: '모바일 HR 관리 앱 개발',
    description: '직원 관리를 위한 종합적인 모바일 애플리케이션 개발 프로젝트',
    status: 'active' as const,
    priority: 'high' as const,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-06-30'),
    progress: 65,
    teamMembers: [
      { id: '1', name: '김개발', role: 'leader', position: '프로젝트 매니저' },
      { id: '2', name: '이디자인', role: 'member', position: 'UI/UX 디자이너' },
      { id: '3', name: '박프론트', role: 'member', position: '프론트엔드 개발자' },
      { id: '4', name: '최백엔드', role: 'member', position: '백엔드 개발자' },
    ],
    tasks: [
      { id: '1', title: '요구사항 분석', status: 'completed', assignee: '김개발' },
      { id: '2', title: 'UI/UX 디자인', status: 'completed', assignee: '이디자인' },
      { id: '3', title: '프론트엔드 개발', status: 'in_progress', assignee: '박프론트' },
      { id: '4', title: '백엔드 API 개발', status: 'in_progress', assignee: '최백엔드' },
      { id: '5', title: '테스트 및 배포', status: 'pending', assignee: '김개발' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return COLORS.success;
      case 'in_progress': return COLORS.warning;
      case 'pending': return COLORS.textSecondary;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return '완료';
      case 'in_progress': return '진행중';
      case 'pending': return '대기중';
      default: return '기타';
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

  const handleShareProject = () => {
    Alert.alert('프로젝트 공유', '프로젝트 공유 기능은 준비 중입니다.');
  };

  const handleEditProject = () => {
    Alert.alert('프로젝트 수정', '프로젝트 수정 기능은 준비 중입니다.');
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
        <Text style={styles.headerTitle}>프로젝트 상세</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={handleShareProject}
            style={styles.headerButton}
            hitSlop={THEME.hitSlop.medium}
          >
            <Icon name="share-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleEditProject}
            style={styles.headerButton}
            hitSlop={THEME.hitSlop.medium}
          >
            <Icon name="pencil-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.projectInfo}>
          <View style={styles.titleSection}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <View style={styles.statusBadge}>
              <View style={[styles.statusIndicator, { backgroundColor: getPriorityColor(project.priority) }]} />
              <Text style={styles.statusText}>우선순위: 높음</Text>
            </View>
          </View>

          <Text style={styles.projectDescription}>{project.description}</Text>

          <View style={styles.projectMeta}>
            <View style={styles.metaItem}>
              <Icon name="calendar-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.metaText}>
                {project.startDate.toLocaleDateString('ko-KR')} - {project.endDate.toLocaleDateString('ko-KR')}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="trending-up-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.metaText}>진행률: {project.progress}%</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${project.progress}%` }]} />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>팀 멤버</Text>
          <View style={styles.teamList}>
            {project.teamMembers.map((member) => (
              <View key={member.id} style={styles.memberItem}>
                <View style={styles.memberAvatar}>
                  <Text style={styles.memberInitial}>{member.name.charAt(0)}</Text>
                </View>
                <View style={styles.memberInfo}>
                  <View style={styles.memberHeader}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    {member.role === 'leader' && (
                      <View style={styles.leaderBadge}>
                        <Icon name="star" size={10} color={COLORS.warning} />
                        <Text style={styles.leaderText}>리더</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.memberPosition}>{member.position}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>작업 목록</Text>
          <View style={styles.taskList}>
            {project.tasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <View style={styles.taskLeft}>
                  <View style={[styles.taskStatus, { backgroundColor: getStatusColor(task.status) }]} />
                  <View style={styles.taskInfo}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <Text style={styles.taskAssignee}>담당자: {task.assignee}</Text>
                  </View>
                </View>
                <View style={[styles.taskStatusBadge, { backgroundColor: `${getStatusColor(task.status)}20` }]}>
                  <Text style={[styles.taskStatusText, { color: getStatusColor(task.status) }]}>
                    {getStatusText(task.status)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
  },
  backButton: {
    marginRight: THEME.spacing.md,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerActions: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
  },
  headerButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  projectInfo: {
    backgroundColor: COLORS.surface,
    margin: THEME.spacing.lg,
    padding: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.md,
  },
  projectTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: THEME.spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    color: COLORS.textSecondary,
  },
  projectDescription: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: THEME.spacing.md,
  },
  projectMeta: {
    gap: THEME.spacing.sm,
    marginBottom: THEME.spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  progressSection: {
    marginTop: THEME.spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  section: {
    marginHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: THEME.spacing.md,
  },
  teamList: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    gap: THEME.spacing.md,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.md,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  memberInfo: {
    flex: 1,
  },
  memberHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
    marginBottom: 2,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  leaderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.warning}20`,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: THEME.borderRadius.sm,
    gap: 2,
  },
  leaderText: {
    fontSize: 8,
    color: COLORS.warning,
    fontWeight: '500',
  },
  memberPosition: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  taskList: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    gap: THEME.spacing.md,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: THEME.spacing.sm,
  },
  taskStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  taskAssignee: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  taskStatusBadge: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.sm,
  },
  taskStatusText: {
    fontSize: 10,
    fontWeight: '500',
  },
});

export default ProjectDetailScreen;