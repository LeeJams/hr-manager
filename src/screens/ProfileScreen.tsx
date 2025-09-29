import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import { COLORS, SPACING } from '../constants';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '정말 로그아웃하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '로그아웃',
          style: 'destructive',
          onPress: async () => {
            try {
              await authService.logout();
              await logout();
            } catch (error) {
              console.error('Logout failed:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0) || 'U'}
            </Text>
          </View>
        </View>

        <Text style={styles.userName}>{user?.name}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
        <Text style={styles.userProvider}>
          {user?.provider === 'kakao' ? '카카오 로그인' :
           user?.provider === 'apple' ? 'Apple 로그인' :
           '이메일 로그인'}
        </Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>프로필 편집</Text>
          <Text style={styles.menuArrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>알림 설정</Text>
          <Text style={styles.menuArrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>개인정보 처리방침</Text>
          <Text style={styles.menuArrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>서비스 약관</Text>
          <Text style={styles.menuArrow}>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>앱 정보</Text>
          <Text style={styles.menuArrow}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  profileContainer: {
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    padding: SPACING.xl,
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.surface,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  userProvider: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
  menuContainer: {
    backgroundColor: COLORS.surface,
    marginBottom: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.text,
  },
  menuArrow: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  logoutButton: {
    backgroundColor: COLORS.error,
    margin: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;