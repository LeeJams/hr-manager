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
import { COLORS, THEME } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

interface CareerItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
  isCurrent: boolean;
}

interface SkillItem {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

const CareerScreen: React.FC = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<'career' | 'skills'>('career');

  // Mock data - in real app, this would come from API/store
  const [careerHistory] = useState<CareerItem[]>([
    {
      id: '1',
      company: 'Techmeet Corporation',
      position: '시니어 개발자',
      startDate: '2022-01',
      description: 'React Native 기반 모바일 앱 개발 및 팀 리딩',
      skills: ['React Native', 'TypeScript', 'Node.js', 'MongoDB'],
      isCurrent: true,
    },
    {
      id: '2',
      company: 'StartupCo',
      position: '풀스택 개발자',
      startDate: '2020-03',
      endDate: '2021-12',
      description: '웹 서비스 개발 및 API 설계',
      skills: ['React', 'Express.js', 'PostgreSQL', 'AWS'],
      isCurrent: false,
    },
  ]);

  const [skills] = useState<SkillItem[]>([
    { id: '1', name: 'React Native', level: 'expert', category: 'Mobile' },
    { id: '2', name: 'TypeScript', level: 'advanced', category: 'Language' },
    { id: '3', name: 'Node.js', level: 'advanced', category: 'Backend' },
    { id: '4', name: 'React', level: 'expert', category: 'Frontend' },
    { id: '5', name: 'MongoDB', level: 'intermediate', category: 'Database' },
    { id: '6', name: 'AWS', level: 'intermediate', category: 'Cloud' },
  ]);

  const handleAddCareer = () => {
    Alert.alert('준비 중', '경력 추가 기능은 준비 중입니다.');
  };

  const handleAddSkill = () => {
    Alert.alert('준비 중', '스킬 추가 기능은 준비 중입니다.');
  };

  const handleEditCareer = (careerId: string) => {
    Alert.alert('준비 중', '경력 수정 기능은 준비 중입니다.');
  };

  const handleEditSkill = (skillId: string) => {
    Alert.alert('준비 중', '스킬 수정 기능은 준비 중입니다.');
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return COLORS.error;
      case 'advanced': return COLORS.warning;
      case 'intermediate': return COLORS.primary;
      case 'beginner': return COLORS.success;
      default: return COLORS.textSecondary;
    }
  };

  const getSkillLevelText = (level: string) => {
    switch (level) {
      case 'expert': return '전문가';
      case 'advanced': return '숙련';
      case 'intermediate': return '중급';
      case 'beginner': return '초급';
      default: return '기타';
    }
  };

  const renderCareerItem = (item: CareerItem) => (
    <View key={item.id} style={styles.careerItem}>
      <View style={styles.careerHeader}>
        <View style={styles.careerMainInfo}>
          <Text style={styles.careerCompany}>{item.company}</Text>
          <Text style={styles.careerPosition}>{item.position}</Text>
          <Text style={styles.careerPeriod}>
            {item.startDate} - {item.isCurrent ? '현재' : item.endDate}
            {item.isCurrent && <Text style={styles.currentBadge}> (재직중)</Text>}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleEditCareer(item.id)}
          style={styles.editButton}
          hitSlop={THEME.hitSlop.small}
        >
          <Icon name="pencil-outline" size={16} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.careerDescription}>{item.description}</Text>

      <View style={styles.skillsContainer}>
        <Text style={styles.skillsLabel}>사용 기술:</Text>
        <View style={styles.skillTags}>
          {item.skills.map((skill, index) => (
            <View key={index} style={styles.skillTag}>
              <Text style={styles.skillTagText}>{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderSkillItem = (item: SkillItem) => (
    <View key={item.id} style={styles.skillItem}>
      <View style={styles.skillMainInfo}>
        <View style={styles.skillHeader}>
          <Text style={styles.skillName}>{item.name}</Text>
          <View style={[styles.skillLevelBadge, { backgroundColor: `${getSkillLevelColor(item.level)}20` }]}>
            <Text style={[styles.skillLevelText, { color: getSkillLevelColor(item.level) }]}>
              {getSkillLevelText(item.level)}
            </Text>
          </View>
        </View>
        <Text style={styles.skillCategoryText}>{item.category}</Text>
      </View>
      <TouchableOpacity
        onPress={() => handleEditSkill(item.id)}
        style={styles.editButton}
        hitSlop={THEME.hitSlop.small}
      >
        <Icon name="pencil-outline" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderCareerTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabTitle}>경력사항</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCareer}
          hitSlop={THEME.hitSlop.medium}
        >
          <Icon name="add" size={20} color={COLORS.primary} />
          <Text style={styles.addButtonText}>추가</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {careerHistory.map(renderCareerItem)}
      </ScrollView>
    </View>
  );

  const renderSkillsTab = () => {
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, SkillItem[]>);

    return (
      <View style={styles.tabContent}>
        <View style={styles.tabHeader}>
          <Text style={styles.tabTitle}>보유 스킬</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddSkill}
            hitSlop={THEME.hitSlop.medium}
          >
            <Icon name="add" size={20} color={COLORS.primary} />
            <Text style={styles.addButtonText}>추가</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <View key={category} style={styles.skillCategoryContainer}>
              <Text style={styles.skillCategoryTitle}>{category}</Text>
              {categorySkills.map(renderSkillItem)}
            </View>
          ))}
        </ScrollView>
      </View>
    );
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
        <Text style={styles.headerTitle}>내 경력</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'career' && styles.activeTab]}
          onPress={() => setActiveTab('career')}
        >
          <Text style={[styles.tabText, activeTab === 'career' && styles.activeTabText]}>
            경력사항
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'skills' && styles.activeTab]}
          onPress={() => setActiveTab('skills')}
        >
          <Text style={[styles.tabText, activeTab === 'skills' && styles.activeTabText]}>
            보유 스킬
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'career' ? renderCareerTab() : renderSkillsTab()}
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    padding: 4,
    marginBottom: THEME.spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: THEME.spacing.sm,
    alignItems: 'center',
    borderRadius: THEME.borderRadius.md,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.background,
  },
  content: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: THEME.spacing.lg,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
    gap: 4,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.primary,
  },
  careerItem: {
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  careerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.sm,
  },
  careerMainInfo: {
    flex: 1,
  },
  careerCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  careerPosition: {
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  careerPeriod: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  currentBadge: {
    color: COLORS.success,
    fontWeight: '500',
  },
  editButton: {
    padding: 4,
  },
  careerDescription: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: THEME.spacing.md,
  },
  skillsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: THEME.spacing.sm,
  },
  skillsLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: THEME.spacing.sm,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: THEME.spacing.xs,
  },
  skillTag: {
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.sm,
  },
  skillTagText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '500',
  },
  skillCategoryContainer: {
    marginBottom: THEME.spacing.lg,
  },
  skillCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: THEME.spacing.sm,
    paddingHorizontal: 4,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.sm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  skillMainInfo: {
    flex: 1,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
    marginBottom: 4,
  },
  skillName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
  },
  skillLevelBadge: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 2,
    borderRadius: THEME.borderRadius.sm,
  },
  skillLevelText: {
    fontSize: 10,
    fontWeight: '500',
  },
  skillCategoryText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default CareerScreen;