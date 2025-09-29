import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../types';
import { COLORS, THEME } from '../constants';
import { useAuthStore } from '../stores';

type IntroScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Intro'>;

const IntroScreen: React.FC = () => {
  const navigation = useNavigation<IntroScreenNavigationProp>();
  const { completeIntro } = useAuthStore();

  const handleGetStarted = () => {
    completeIntro();
    navigation.navigate('Login');
  };

  const handleSignUp = () => {
    completeIntro();
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>Techmeet</Text>
            <Text style={styles.subLogoText}>HR Manager</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>팀 프로젝트 관리의{'\n'}새로운 시작</Text>
          <Text style={styles.subtitle}>
            효율적인 일정 관리와 팀 협업으로{'\n'}
            더 나은 프로젝트 성과를 만들어보세요
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleGetStarted}
            hitSlop={THEME.hitSlop.medium}
          >
            <Text style={styles.primaryButtonText}>시작하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleSignUp}
            hitSlop={THEME.hitSlop.medium}
          >
            <Text style={styles.secondaryButtonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: THEME.spacing.xl * 2,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  subLogoText: {
    fontSize: 12,
    color: COLORS.background,
    opacity: 0.9,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.md,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: THEME.spacing.md,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: THEME.spacing.md,
    marginBottom: THEME.spacing.lg,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    alignItems: 'center',
    minHeight: 48,
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default IntroScreen;