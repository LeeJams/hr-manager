import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from 'react-native';
import { AuthStackParamList } from '../types';
import { COLORS, THEME, FEATURE_FLAGS } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons';

type SignupScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Signup'>;

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement signup logic
      console.log('Signup data:', data);
      Alert.alert('회원가입 완료', '로그인 화면으로 이동합니다.', [
        { text: '확인', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('오류', '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: 'kakao' | 'apple') => {
    // TODO: Implement social signup
    console.log(`${provider} signup`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              hitSlop={THEME.hitSlop.medium}
            >
              <Icon name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.title}>회원가입</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: '이름을 입력해주세요',
                minLength: { value: 2, message: '이름은 2글자 이상이어야 합니다' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapper}>
                  <View style={styles.inputContainer}>
                    <Icon name="person-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                    <TextInput
                      placeholder="이름"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      style={styles.input}
                    />
                  </View>
                  {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '올바른 이메일 형식을 입력해주세요',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapper}>
                  <View style={styles.inputContainer}>
                    <Icon name="mail-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                    <TextInput
                      placeholder="이메일"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      style={styles.input}
                    />
                  </View>
                  {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              rules={{
                required: '비밀번호를 입력해주세요',
                minLength: { value: 6, message: '비밀번호는 6글자 이상이어야 합니다' },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapper}>
                  <View style={styles.inputContainer}>
                    <Icon name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                    <TextInput
                      placeholder="비밀번호"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry
                      style={styles.input}
                    />
                  </View>
                  {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
                </View>
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: '비밀번호 확인을 입력해주세요',
                validate: (value) => value === password || '비밀번호가 일치하지 않습니다',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={styles.inputWrapper}>
                  <View style={styles.inputContainer}>
                    <Icon name="lock-closed-outline" size={20} color={COLORS.textSecondary} style={styles.inputIcon} />
                    <TextInput
                      placeholder="비밀번호 확인"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry
                      style={styles.input}
                    />
                  </View>
                  {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
                </View>
              )}
            />

            <TouchableOpacity
              style={[styles.signupButton, isLoading && styles.disabledButton]}
              onPress={handleSubmit(onSubmit)}
              disabled={isLoading}
              hitSlop={THEME.hitSlop.medium}
            >
              <Text style={styles.signupButtonText}>
                {isLoading ? '가입 중...' : '회원가입'}
              </Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>또는</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialButtons}>
              <TouchableOpacity
                style={[styles.socialButton, styles.kakaoButton]}
                onPress={() => handleSocialSignup('kakao')}
                hitSlop={THEME.hitSlop.medium}
              >
                <Text style={styles.kakaoButtonText}>카카오로 회원가입</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.socialButton, styles.appleButton]}
                onPress={() => handleSocialSignup('apple')}
                hitSlop={THEME.hitSlop.medium}
              >
                <Icon name="logo-apple" size={20} color={COLORS.background} />
                <Text style={styles.appleButtonText}>Apple로 회원가입</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>이미 계정이 있으신가요? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                hitSlop={THEME.hitSlop.small}
              >
                <Text style={styles.loginLink}>로그인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.lg,
    paddingTop: THEME.spacing.md,
    marginBottom: THEME.spacing.xl,
  },
  backButton: {
    marginRight: THEME.spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  form: {
    paddingHorizontal: THEME.spacing.lg,
    paddingBottom: THEME.spacing.xl,
  },
  inputWrapper: {
    marginBottom: THEME.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
  },
  inputIcon: {
    marginRight: THEME.spacing.sm,
  },
  input: {
    flex: 1,
    color: COLORS.text,
    fontSize: 16,
    paddingVertical: THEME.spacing.sm,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.error,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  signupButton: {
    backgroundColor: COLORS.primary,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.md,
    alignItems: 'center',
    marginTop: THEME.spacing.lg,
    minHeight: 48,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  signupButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: THEME.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    marginHorizontal: THEME.spacing.md,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  socialButtons: {
    gap: THEME.spacing.md,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.md,
    minHeight: 48,
    gap: THEME.spacing.sm,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
  },
  kakaoButtonText: {
    color: '#3C1E1E',
    fontSize: 16,
    fontWeight: '500',
  },
  appleButton: {
    backgroundColor: COLORS.text,
  },
  appleButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: THEME.spacing.lg,
  },
  loginText: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  loginLink: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SignupScreen;