import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:io';
import 'auth_provider.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _isLoading = false;

  Future<void> _handleKakaoLogin() async {
    setState(() => _isLoading = true);

    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final success = await authProvider.loginWithKakao();

      if (success && mounted) {
        Navigator.of(context).pushReplacementNamed('/webview');
      } else {
        _showErrorDialog('카카오 로그인에 실패했습니다.');
      }
    } catch (e) {
      _showErrorDialog('로그인 중 오류가 발생했습니다: $e');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  Future<void> _handleAppleLogin() async {
    setState(() => _isLoading = true);

    try {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      final success = await authProvider.loginWithApple();

      if (success && mounted) {
        Navigator.of(context).pushReplacementNamed('/webview');
      } else {
        _showErrorDialog('Apple 로그인에 실패했습니다.');
      }
    } catch (e) {
      _showErrorDialog('로그인 중 오류가 발생했습니다: $e');
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  void _showErrorDialog(String message) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('오류'),
        content: Text(message),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('확인'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            children: [
              const Spacer(flex: 2),

              // 로고 섹션
              Container(
                width: 150,
                height: 150,
                decoration: BoxDecoration(
                  color: Colors.blue.shade50,
                  borderRadius: BorderRadius.circular(75),
                ),
                child: const Icon(
                  Icons.business,
                  size: 80,
                  color: Colors.blue,
                ),
              ),

              const SizedBox(height: 32),

              const Text(
                'Techmeet',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),

              const SizedBox(height: 8),

              const Text(
                'HR Manager',
                style: TextStyle(
                  fontSize: 18,
                  color: Colors.grey,
                ),
              ),

              const SizedBox(height: 16),

              const Text(
                '간편하게 로그인하고\n인력관리를 시작하세요',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey,
                  height: 1.5,
                ),
              ),

              const Spacer(flex: 3),

              // 로그인 버튼들
              if (_isLoading)
                const Center(child: CircularProgressIndicator())
              else ...[
                // 카카오 로그인 버튼
                SizedBox(
                  width: double.infinity,
                  height: 56,
                  child: ElevatedButton.icon(
                    onPressed: _handleKakaoLogin,
                    icon: const Icon(Icons.chat_bubble, color: Colors.black),
                    label: const Text(
                      '카카오톡으로 로그인',
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFFFEE500),
                      foregroundColor: Colors.black,
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Apple 로그인 버튼 (iOS에서만 표시)
                if (Platform.isIOS)
                  SizedBox(
                    width: double.infinity,
                    height: 56,
                    child: ElevatedButton.icon(
                      onPressed: _handleAppleLogin,
                      icon: const Icon(Icons.apple, color: Colors.white),
                      label: const Text(
                        'Apple로 로그인',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.black,
                        foregroundColor: Colors.white,
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                      ),
                    ),
                  ),
              ],

              const SizedBox(height: 32),

              // 이용약관 등
              const Text(
                '로그인 시 이용약관 및 개인정보처리방침에\n동의한 것으로 간주됩니다.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 12,
                  color: Colors.grey,
                  height: 1.4,
                ),
              ),

              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }
}