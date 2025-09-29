import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, THEME } from '../constants';
import { useProjectStore } from '../stores';
import Icon from 'react-native-vector-icons/Ionicons';

interface TreeNode {
  id: string;
  name: string;
  role: string;
  level: number;
  parentId?: string;
  children: TreeNode[];
  isExpanded: boolean;
}

const TeamManagementScreen: React.FC = () => {
  const navigation = useNavigation();
  const { teams } = useProjectStore();

  // Mock team tree data
  const [teamTree, setTeamTree] = useState<TreeNode[]>([
    {
      id: '1',
      name: '김팀장',
      role: '프로젝트 매니저',
      level: 0,
      isExpanded: true,
      children: [
        {
          id: '2',
          name: '이개발',
          role: '시니어 개발자',
          level: 1,
          parentId: '1',
          isExpanded: true,
          children: [
            {
              id: '3',
              name: '박주니어',
              role: '주니어 개발자',
              level: 2,
              parentId: '2',
              isExpanded: false,
              children: [],
            },
          ],
        },
        {
          id: '4',
          name: '최디자인',
          role: 'UI/UX 디자이너',
          level: 1,
          parentId: '1',
          isExpanded: false,
          children: [],
        },
      ],
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleNodeExpansion = (nodeId: string) => {
    const updateTree = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return { ...node, isExpanded: !node.isExpanded };
        }
        if (node.children.length > 0) {
          return { ...node, children: updateTree(node.children) };
        }
        return node;
      });
    };

    setTeamTree(updateTree(teamTree));
  };

  const handleAddMember = (parentId?: string) => {
    Alert.alert('멤버 추가', '새로운 팀 멤버 추가 기능은 준비 중입니다.');
  };

  const handleEditMember = (nodeId: string) => {
    Alert.alert('멤버 수정', '팀 멤버 정보 수정 기능은 준비 중입니다.');
  };

  const handleDeleteMember = (nodeId: string) => {
    Alert.alert(
      '멤버 삭제',
      '정말 이 멤버를 팀에서 제거하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '삭제', style: 'destructive', onPress: () => {
          Alert.alert('준비 중', '멤버 삭제 기능은 준비 중입니다.');
        }},
      ]
    );
  };

  const flattenTree = (nodes: TreeNode[]): TreeNode[] => {
    const result: TreeNode[] = [];

    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        result.push(node);
        if (node.isExpanded && node.children.length > 0) {
          traverse(node.children);
        }
      });
    };

    traverse(nodes);
    return result;
  };

  const renderTreeNode = ({ item }: { item: TreeNode }) => {
    const hasChildren = item.children.length > 0;
    const isSelected = selectedNode === item.id;

    return (
      <View style={styles.nodeContainer}>
        <View style={[styles.nodeContent, { marginLeft: item.level * 24 }]}>
          <View style={styles.nodeLeft}>
            {hasChildren ? (
              <TouchableOpacity
                onPress={() => toggleNodeExpansion(item.id)}
                style={styles.expandButton}
                hitSlop={THEME.hitSlop.small}
              >
                <Icon
                  name={item.isExpanded ? 'chevron-down' : 'chevron-forward'}
                  size={16}
                  color={COLORS.textSecondary}
                />
              </TouchableOpacity>
            ) : (
              <View style={styles.expandButton} />
            )}

            <TouchableOpacity
              style={[styles.nodeInfo, isSelected && styles.selectedNode]}
              onPress={() => setSelectedNode(isSelected ? null : item.id)}
              onLongPress={() => handleEditMember(item.id)}
            >
              <View style={styles.nodeAvatar}>
                <Text style={styles.nodeAvatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View style={styles.nodeDetails}>
                <Text style={styles.nodeName}>{item.name}</Text>
                <Text style={styles.nodeRole}>{item.role}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.nodeActions}>
            <TouchableOpacity
              onPress={() => handleAddMember(item.id)}
              style={styles.actionButton}
              hitSlop={THEME.hitSlop.small}
            >
              <Icon name="person-add-outline" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleEditMember(item.id)}
              style={styles.actionButton}
              hitSlop={THEME.hitSlop.small}
            >
              <Icon name="pencil-outline" size={16} color={COLORS.textSecondary} />
            </TouchableOpacity>
            {item.level > 0 && (
              <TouchableOpacity
                onPress={() => handleDeleteMember(item.id)}
                style={styles.actionButton}
                hitSlop={THEME.hitSlop.small}
              >
                <Icon name="trash-outline" size={16} color={COLORS.error} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Connection lines */}
        {item.level > 0 && (
          <View style={[styles.connectionLine, { marginLeft: (item.level - 1) * 24 + 8 }]} />
        )}
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.headerSection}>
      <Text style={styles.headerTitle}>팀 구조</Text>
      <Text style={styles.headerSubtitle}>
        팀원을 추가하고 계층 구조를 관리하세요
      </Text>
    </View>
  );

  const renderStats = () => {
    const flatNodes = flattenTree(teamTree);
    const totalMembers = flatNodes.length;
    const levels = Math.max(...flatNodes.map(node => node.level)) + 1;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{totalMembers}</Text>
          <Text style={styles.statLabel}>총 멤버</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{levels}</Text>
          <Text style={styles.statLabel}>계층 레벨</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{teamTree.length}</Text>
          <Text style={styles.statLabel}>팀 리더</Text>
        </View>
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
        <Text style={styles.headerTitle}>팀 관리</Text>
        <TouchableOpacity
          onPress={() => handleAddMember()}
          style={styles.addButton}
          hitSlop={THEME.hitSlop.medium}
        >
          <Icon name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {renderHeader()}
        {renderStats()}

        <View style={styles.treeContainer}>
          <FlatList
            data={flattenTree(teamTree)}
            renderItem={renderTreeNode}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.actionGuide}>
          <Text style={styles.guideTitle}>조작 가이드</Text>
          <View style={styles.guideItems}>
            <View style={styles.guideItem}>
              <Icon name="touch-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.guideText}>탭: 멤버 선택</Text>
            </View>
            <View style={styles.guideItem}>
              <Icon name="finger-print-outline" size={16} color={COLORS.textSecondary} />
              <Text style={styles.guideText}>길게 눌러: 정보 수정</Text>
            </View>
            <View style={styles.guideItem}>
              <Icon name="chevron-forward" size={16} color={COLORS.textSecondary} />
              <Text style={styles.guideText}>화살표: 하위 팀 확장/축소</Text>
            </View>
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
  addButton: {
    backgroundColor: `${COLORS.primary}20`,
    borderRadius: 20,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
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
    marginHorizontal: THEME.spacing.md,
  },
  treeContainer: {
    backgroundColor: COLORS.surface,
    marginHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  nodeContainer: {
    position: 'relative',
  },
  nodeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: THEME.spacing.sm,
  },
  nodeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  expandButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.sm,
  },
  nodeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
  },
  selectedNode: {
    backgroundColor: `${COLORS.primary}20`,
  },
  nodeAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.sm,
  },
  nodeAvatarText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  nodeDetails: {
    flex: 1,
  },
  nodeName: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  nodeRole: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  nodeActions: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
  },
  actionButton: {
    padding: 4,
  },
  connectionLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: COLORS.border,
  },
  actionGuide: {
    backgroundColor: COLORS.surface,
    marginHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
  },
  guideTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: THEME.spacing.sm,
  },
  guideItems: {
    gap: THEME.spacing.sm,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.sm,
  },
  guideText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});

export default TeamManagementScreen;