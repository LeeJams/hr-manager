import UIKit
import Flutter
import KakaoSDKCommon
import KakaoSDKAuth

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
  override func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
  ) -> Bool {

    // 카카오 SDK 초기화
    // 실제 카카오 앱 키로 변경 필요
    KakaoSDK.initSDK(appKey: "YOUR_KAKAO_NATIVE_APP_KEY")

    GeneratedPluginRegistrant.register(with: self)

    // 네이티브 브리지 설정
    setupMethodChannel()

    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }

  override func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    // 카카오 URL 스킴 처리
    if (AuthApi.isKakaoTalkLoginUrl(url)) {
      return AuthController.handleOpenUrl(url: url)
    }

    return super.application(app, open: url, options: options)
  }

  private func setupMethodChannel() {
    guard let controller = window?.rootViewController as? FlutterViewController else {
      return
    }

    let methodChannel = FlutterMethodChannel(
      name: "com.techmeet.hr_manager/native",
      binaryMessenger: controller.binaryMessenger
    )

    methodChannel.setMethodCallHandler { call, result in
      switch call.method {
      case "getDeviceInfo":
        let deviceInfo: [String: Any] = [
          "platform": "ios",
          "version": UIDevice.current.systemVersion,
          "model": UIDevice.current.model,
          "name": UIDevice.current.name
        ]
        result(deviceInfo)

      case "showAlert":
        if let message = call.arguments as? String {
          self.showAlert(message: message, result: result)
        } else {
          result(FlutterError(code: "INVALID_ARGUMENT", message: "Message is required", details: nil))
        }

      case "openSettings":
        if let settingsUrl = URL(string: UIApplication.openSettingsURLString) {
          UIApplication.shared.open(settingsUrl)
          result(true)
        } else {
          result(false)
        }

      default:
        result(FlutterMethodNotImplemented)
      }
    }
  }

  private func showAlert(message: String, result: @escaping FlutterResult) {
    DispatchQueue.main.async {
      let alert = UIAlertController(
        title: "Techmeet",
        message: message,
        preferredStyle: .alert
      )

      alert.addAction(UIAlertAction(title: "확인", style: .default) { _ in
        result(true)
      })

      if let controller = self.window?.rootViewController {
        controller.present(alert, animated: true)
      }
    }
  }
}