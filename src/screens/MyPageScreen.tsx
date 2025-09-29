import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MyPageStackParamList } from '../types';
import { COLORS, THEME } from '../constants';
import { useAuthStore } from '../stores';
import Icon from 'react-native-vector-icons/Ionicons';

type MyPageScreenNavigationProp = StackNavigationProp<MyPageStackParamList, 'MyPageScreen'>;

const MyPageScreen: React.FC = () => {
  const navigation = useNavigation<MyPageScreenNavigationProp>();
  const { user, clearAuth } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃 하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: () => {
            clearAuth();
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'profile',
      title: '내 정보',
      description: '개인정보 및 계정 설정',
      icon: 'person-outline',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      id: 'career',
      title: '내 경력',
      description: '경력사항 및 스킬 관리',
      icon: 'briefcase-outline',
      onPress: () => navigation.navigate('Career'),
    },
    {
      id: 'schedule',
      title: '일정 등록',
      description: '내 가능한 일정 등록',
      icon: 'calendar-outline',
      onPress: () => navigation.navigate('ScheduleRegister'),
    },
  ];

  const settingsItems = [
    {
      id: 'notifications',
      title: '알림 설정',
      description: '푸시 알림 및 이메일 설정',
      icon: 'notifications-outline',
      onPress: () => {
        // TODO: Navigate to notification settings
        console.log('Notification settings');
      },
    },
    {
      id: 'privacy',
      title: '개인정보처리방침',
      description: '개인정보 보호 정책',
      icon: 'shield-outline',
      onPress: () => {
        // TODO: Navigate to privacy policy
        console.log('Privacy policy');
      },
    },
    {
      id: 'terms',
      title: '이용약관',
      description: '서비스 이용약관',
      icon: 'document-text-outline',
      onPress: () => {
        // TODO: Navigate to terms of service
        console.log('Terms of service');
      },
    },
    {
      id: 'help',
      title: '도움말',
      description: '자주 묻는 질문 및 지원',
      icon: 'help-circle-outline',
      onPress: () => {
        // TODO: Navigate to help/FAQ
        console.log('Help & FAQ');
      },
    },
  ];

  const renderUserProfile = () => (
    <View style={styles.profileSection}>
      <View style={styles.profileImageContainer}>
        {user?.profileImage ? (
          <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Icon name="person" size={40} color={COLORS.textSecondary} />
          </View>
        )}
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.userName}>{user?.name || '사용자'}</Text>
        <Text style={styles.userEmail}>{user?.email || ''}</Text>
        <View style={styles.providerBadge}>
          <Icon
            name={getProviderIcon(user?.provider)}
            size={12}
            color={COLORS.primary}
          />
          <Text style={styles.providerText}>{getProviderText(user?.provider)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('Profile')}
        hitSlop={THEME.hitSlop.medium}
      >
        <Icon name="pencil-outline" size={20} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderMenuItem = (item: typeof menuItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={item.onPress}
      hitSlop={THEME.hitSlop.small}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>
          <Icon name={item.icon} size={20} color={COLORS.primary} />
        </View>
        <View style={styles.menuItemContent}>
          <Text style={styles.menuItemTitle}>{item.title}</Text>
          <Text style={styles.menuItemDescription}>{item.description}</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={16} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  const renderSettingsItem = (item: typeof settingsItems[0]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingsItem}
      onPress={item.onPress}
      hitSlop={THEME.hitSlop.small}
    >
      <View style={styles.settingsItemLeft}>
        <Icon name={item.icon} size={20} color={COLORS.textSecondary} />
        <View style={styles.settingsItemContent}>
          <Text style={styles.settingsItemTitle}>{item.title}</Text>
          <Text style={styles.settingsItemDescription}>{item.description}</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={14} color={COLORS.textSecondary} />
    </TouchableOpacity>
  );

  const getProviderIcon = (provider?: string) => {
    switch (provider) {
      case 'kakao': return 'chatbubble-outline';
      case 'apple': return 'logo-apple';
      case 'email': return 'mail-outline';
      default: return 'person-outline';
    }
  };

  const getProviderText = (provider?: string) => {
    switch (provider) {
      case 'kakao': return '카카오 로그인';
      case 'apple': return 'Apple 로그인';
      case 'email': return '이메일 로그인';
      default: return '일반 로그인';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderUserProfile()}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내 정보</Text>
          <View style={styles.menuList}>
            {menuItems.map(renderMenuItem)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>설정</Text>
          <View style={styles.settingsList}>
            {settingsItems.map(renderSettingsItem)}
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            hitSlop={THEME.hitSlop.medium}
          >
            <Icon name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={styles.logoutButtonText}>로그아웃</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>버전 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2024 Techmeet. All rights reserved.</Text>
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
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    backgroundColor: COLORS.background,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.lg,
    padding: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileImageContainer: {
    marginRight: THEME.spacing.md,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 6,
  },
  providerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}20`,
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 4,
    borderRadius: THEME.borderRadius.sm,
    alignSelf: 'flex-start',
    gap: 4,
  },
  providerText: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '500',
  },
  editButton: {
    padding: THEME.spacing.sm,
  },
  section: {
    marginBottom: THEME.spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginHorizontal: THEME.spacing.lg,
    marginBottom: THEME.spacing.md,
  },
  menuList: {
    backgroundColor: COLORS.surface,
    marginHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${COLORS.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: THEME.spacing.md,
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  settingsList: {
    backgroundColor: COLORS.surface,
    marginHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.lg,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsItemContent: {
    marginLeft: THEME.spacing.md,
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  settingsItemDescription: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    marginHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: COLORS.error,
    gap: THEME.spacing.sm,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.error,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: THEME.spacing.xl,
    marginTop: THEME.spacing.lg,
  },
  versionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
});

export default MyPageScreen;