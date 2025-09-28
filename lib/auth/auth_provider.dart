import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:kakao_flutter_sdk/kakao_flutter_sdk.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';

class AuthProvider extends ChangeNotifier {
  static const String _keyIsLoggedIn = 'is_logged_in';
  static const String _keyAccessToken = 'access_token';
  static const String _keyRefreshToken = 'refresh_token';
  static const String _keyUserInfo = 'user_info';

  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  bool _isLoggedIn = false;
  String? _accessToken;
  String? _refreshToken;
  Map<String, dynamic>? _userInfo;

  bool get isLoggedIn => _isLoggedIn;
  String? get accessToken => _accessToken;
  Map<String, dynamic>? get userInfo => _userInfo;

  /// 앱 시작 시 인증 상태 확인
  Future<void> checkAuthStatus() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      _isLoggedIn = prefs.getBool(_keyIsLoggedIn) ?? false;

      if (_isLoggedIn) {
        _accessToken = await _secureStorage.read(key: _keyAccessToken);
        _refreshToken = await _secureStorage.read(key: _keyRefreshToken);

        final userInfoString = await _secureStorage.read(key: _keyUserInfo);
        if (userInfoString != null) {
          // JSON 파싱 로직 추가 필요
        }
      }
    } catch (e) {
      debugPrint('인증 상태 확인 오류: $e');
      await logout();
    }
    notifyListeners();
  }

  /// 카카오톡 로그인
  Future<bool> loginWithKakao() async {
    try {
      bool isInstalled = await isKakaoTalkInstalled();

      OAuthToken token;
      if (isInstalled) {
        token = await UserApi.instance.loginWithKakaoTalk();
      } else {
        token = await UserApi.instance.loginWithKakaoAccount();
      }

      // 사용자 정보 가져오기
      User user = await UserApi.instance.me();

      await _saveTokens(
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        userInfo: {
          'id': user.id.toString(),
          'nickname': user.kakaoAccount?.profile?.nickname,
          'email': user.kakaoAccount?.email,
          'provider': 'kakao',
        },
      );

      return true;
    } catch (e) {
      debugPrint('카카오 로그인 오류: $e');
      return false;
    }
  }

  /// Apple 로그인
  Future<bool> loginWithApple() async {
    try {
      final credential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
      );

      await _saveTokens(
        accessToken: credential.identityToken ?? '',
        refreshToken: '',
        userInfo: {
          'id': credential.userIdentifier,
          'email': credential.email,
          'name': '${credential.givenName ?? ''} ${credential.familyName ?? ''}',
          'provider': 'apple',
        },
      );

      return true;
    } catch (e) {
      debugPrint('Apple 로그인 오류: $e');
      return false;
    }
  }

  /// 토큰 및 사용자 정보 저장
  Future<void> _saveTokens({
    required String accessToken,
    required String refreshToken,
    required Map<String, dynamic> userInfo,
  }) async {
    final prefs = await SharedPreferences.getInstance();

    _isLoggedIn = true;
    _accessToken = accessToken;
    _refreshToken = refreshToken;
    _userInfo = userInfo;

    await prefs.setBool(_keyIsLoggedIn, true);
    await _secureStorage.write(key: _keyAccessToken, value: accessToken);
    await _secureStorage.write(key: _keyRefreshToken, value: refreshToken);
    await _secureStorage.write(key: _keyUserInfo, value: userInfo.toString());

    notifyListeners();
  }

  /// 로그아웃
  Future<void> logout() async {
    try {
      // 카카오 로그아웃
      if (_userInfo?['provider'] == 'kakao') {
        await UserApi.instance.logout();
      }

      final prefs = await SharedPreferences.getInstance();
      await prefs.clear();
      await _secureStorage.deleteAll();

      _isLoggedIn = false;
      _accessToken = null;
      _refreshToken = null;
      _userInfo = null;

      notifyListeners();
    } catch (e) {
      debugPrint('로그아웃 오류: $e');
    }
  }

  /// 회원탈퇴
  Future<void> deleteAccount() async {
    try {
      if (_userInfo?['provider'] == 'kakao') {
        await UserApi.instance.unlink();
      }

      await logout();
    } catch (e) {
      debugPrint('회원탈퇴 오류: $e');
    }
  }
}