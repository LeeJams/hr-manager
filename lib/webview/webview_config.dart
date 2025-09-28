class WebViewConfig {
  // 개발/운영 환경별 URL 설정
  static const String _devBaseUrl = 'http://localhost:3000';
  static const String _prodBaseUrl = 'https://your-domain.com';

  // 현재 환경 설정 (개발용)
  static const bool _isDevelopment = true;

  static String getBaseUrl() {
    return _isDevelopment ? _devBaseUrl : _prodBaseUrl;
  }

  // 특정 페이지 URL 생성
  static String getLoginUrl() => '${getBaseUrl()}/auth/login';
  static String getSignupUrl() => '${getBaseUrl()}/auth/signup';
  static String getDashboardUrl() => '${getBaseUrl()}/dashboard';
  static String getProfileUrl() => '${getBaseUrl()}/profile';

  // API 엔드포인트
  static String getApiUrl() => '${getBaseUrl()}/api';
  static String getAuthApiUrl() => '${getApiUrl()}/auth';

  // 허용된 도메인 목록
  static const List<String> allowedDomains = [
    'localhost',
    'your-domain.com',
    'techmeet.com',
  ];

  // 웹뷰에서 처리할 URL 패턴
  static const List<String> internalUrlPatterns = [
    '/auth/',
    '/dashboard',
    '/profile',
    '/hr/',
    '/employee/',
    '/report/',
  ];

  // 외부 브라우저에서 열어야 할 URL 패턴
  static const List<String> externalUrlPatterns = [
    'tel:',
    'mailto:',
    'sms:',
    'market://',
    'intent://',
  ];

  static bool shouldHandleInternally(String url) {
    final uri = Uri.parse(url);

    // 허용된 도메인 확인
    if (!allowedDomains.contains(uri.host)) {
      return false;
    }

    // 내부 처리할 패턴 확인
    for (String pattern in internalUrlPatterns) {
      if (uri.path.startsWith(pattern)) {
        return true;
      }
    }

    return false;
  }

  static bool shouldOpenExternally(String url) {
    for (String pattern in externalUrlPatterns) {
      if (url.startsWith(pattern)) {
        return true;
      }
    }
    return false;
  }
}