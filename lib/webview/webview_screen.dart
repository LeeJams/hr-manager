import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import '../auth/auth_provider.dart';
import 'webview_config.dart';

class WebViewScreen extends StatefulWidget {
  const WebViewScreen({super.key});

  @override
  State<WebViewScreen> createState() => _WebViewScreenState();
}

class _WebViewScreenState extends State<WebViewScreen> {
  late InAppWebViewController _webViewController;
  bool _isLoading = true;
  String? _currentUrl;

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onWillPop,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Techmeet HR'),
          backgroundColor: Colors.blue,
          foregroundColor: Colors.white,
          elevation: 0,
          actions: [
            IconButton(
              icon: const Icon(Icons.refresh),
              onPressed: () => _webViewController.reload(),
            ),
            PopupMenuButton<String>(
              onSelected: _handleMenuAction,
              itemBuilder: (context) => [
                const PopupMenuItem(
                  value: 'home',
                  child: Row(
                    children: [
                      Icon(Icons.home, size: 20),
                      SizedBox(width: 8),
                      Text('홈으로'),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'external',
                  child: Row(
                    children: [
                      Icon(Icons.open_in_browser, size: 20),
                      SizedBox(width: 8),
                      Text('외부 브라우저에서 열기'),
                    ],
                  ),
                ),
                const PopupMenuItem(
                  value: 'logout',
                  child: Row(
                    children: [
                      Icon(Icons.logout, size: 20),
                      SizedBox(width: 8),
                      Text('로그아웃'),
                    ],
                  ),
                ),
              ],
            ),
          ],
        ),
        body: Stack(
          children: [
            InAppWebView(
              initialUrlRequest: URLRequest(
                url: WebUri(WebViewConfig.getBaseUrl()),
              ),
              initialSettings: InAppWebViewSettings(
                useShouldOverrideUrlLoading: true,
                useOnDownloadStart: true,
                javaScriptEnabled: true,
                domStorageEnabled: true,
                supportZoom: false,
                verticalScrollBarEnabled: false,
                horizontalScrollBarEnabled: false,
              ),
              onWebViewCreated: (controller) {
                _webViewController = controller;
                _injectAuthToken();
              },
              onLoadStart: (controller, url) {
                setState(() {
                  _isLoading = true;
                  _currentUrl = url.toString();
                });
              },
              onLoadStop: (controller, url) {
                setState(() {
                  _isLoading = false;
                  _currentUrl = url.toString();
                });
                _injectAuthToken();
              },
              onReceivedError: (controller, request, error) {
                _showErrorPage(error.description);
              },
              shouldOverrideUrlLoading: (controller, navigationAction) async {
                final url = navigationAction.request.url.toString();

                // 외부 링크 처리
                if (_shouldOpenExternally(url)) {
                  if (await canLaunchUrl(Uri.parse(url))) {
                    await launchUrl(Uri.parse(url));
                    return NavigationActionPolicy.CANCEL;
                  }
                }

                return NavigationActionPolicy.ALLOW;
              },
              onConsoleMessage: (controller, consoleMessage) {
                debugPrint('Console: ${consoleMessage.message}');
              },
            ),
            if (_isLoading)
              Container(
                color: Colors.white,
                child: const Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CircularProgressIndicator(),
                      SizedBox(height: 16),
                      Text('로딩 중...'),
                    ],
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }

  Future<bool> _onWillPop() async {
    if (await _webViewController.canGoBack()) {
      _webViewController.goBack();
      return false;
    }
    return true;
  }

  void _handleMenuAction(String action) async {
    switch (action) {
      case 'home':
        _webViewController.loadUrl(
          urlRequest: URLRequest(url: WebUri(WebViewConfig.getBaseUrl())),
        );
        break;

      case 'external':
        if (_currentUrl != null) {
          if (await canLaunchUrl(Uri.parse(_currentUrl!))) {
            await launchUrl(Uri.parse(_currentUrl!));
          }
        }
        break;

      case 'logout':
        _showLogoutDialog();
        break;
    }
  }

  void _showLogoutDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('로그아웃'),
        content: const Text('정말 로그아웃하시겠습니까?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('취소'),
          ),
          TextButton(
            onPressed: () async {
              Navigator.of(context).pop();
              final authProvider =
                  Provider.of<AuthProvider>(context, listen: false);
              await authProvider.logout();
              if (mounted) {
                Navigator.of(context).pushReplacementNamed('/login');
              }
            },
            child: const Text('로그아웃'),
          ),
        ],
      ),
    );
  }

  bool _shouldOpenExternally(String url) {
    return url.startsWith('tel:') ||
        url.startsWith('mailto:') ||
        url.startsWith('sms:') ||
        url.contains('play.google.com') ||
        url.contains('apps.apple.com');
  }

  void _injectAuthToken() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    if (authProvider.accessToken != null) {
      await _webViewController.evaluateJavascript(source: '''
        localStorage.setItem('access_token', '${authProvider.accessToken}');
        localStorage.setItem('user_info', '${authProvider.userInfo}');

        // 토큰이 설정되었음을 웹앱에 알림
        window.dispatchEvent(new CustomEvent('tokenUpdated', {
          detail: {
            accessToken: '${authProvider.accessToken}',
            userInfo: ${authProvider.userInfo}
          }
        }));
      ''');
    }
  }

  void _showErrorPage(String error) {
    setState(() => _isLoading = false);
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('연결 오류'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.error_outline, size: 48, color: Colors.red),
            const SizedBox(height: 16),
            Text('페이지를 불러올 수 없습니다.\n\n$error'),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              _webViewController.reload();
            },
            child: const Text('다시 시도'),
          ),
        ],
      ),
    );
  }
}