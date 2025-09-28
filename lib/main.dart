import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:kakao_flutter_sdk/kakao_flutter_sdk.dart';
import 'auth/auth_provider.dart';
import 'webview/webview_screen.dart';
import 'auth/login_screen.dart';

void main() {
  // 카카오 SDK 초기화 (실제 앱 키로 변경 필요)
  KakaoSdk.init(
    nativeAppKey: 'YOUR_KAKAO_NATIVE_APP_KEY',
    javaScriptAppKey: 'YOUR_KAKAO_JAVASCRIPT_APP_KEY',
  );

  runApp(const TechmeetApp());
}

class TechmeetApp extends StatelessWidget {
  const TechmeetApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AuthProvider()),
      ],
      child: MaterialApp(
        title: 'Techmeet HR Manager',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          fontFamily: 'NotoSans',
        ),
        home: const SplashScreen(),
        routes: {
          '/login': (context) => const LoginScreen(),
          '/webview': (context) => const WebViewScreen(),
        },
      ),
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    _checkAuthStatus();
  }

  Future<void> _checkAuthStatus() async {
    await Future.delayed(const Duration(seconds: 2));

    if (mounted) {
      final authProvider = Provider.of<AuthProvider>(context, listen: false);
      await authProvider.checkAuthStatus();

      if (authProvider.isLoggedIn) {
        Navigator.of(context).pushReplacementNamed('/webview');
      } else {
        Navigator.of(context).pushReplacementNamed('/login');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // 로고 이미지 (추후 추가)
            Container(
              width: 120,
              height: 120,
              decoration: BoxDecoration(
                color: Colors.blue.shade100,
                borderRadius: BorderRadius.circular(60),
              ),
              child: const Icon(
                Icons.business,
                size: 60,
                color: Colors.blue,
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Techmeet',
              style: TextStyle(
                fontSize: 28,
                fontWeight: FontWeight.bold,
                color: Colors.blue,
              ),
            ),
            const SizedBox(height: 8),
            const Text(
              'HR Manager',
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: 40),
            const CircularProgressIndicator(),
          ],
        ),
      ),
    );
  }
}