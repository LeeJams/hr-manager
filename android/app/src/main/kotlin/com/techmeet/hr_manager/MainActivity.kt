package com.techmeet.hr_manager

import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import com.kakao.sdk.common.KakaoSdk

class MainActivity: FlutterActivity() {
    private val CHANNEL = "com.techmeet.hr_manager/native"

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)

        // 카카오 SDK 초기화
        // 실제 앱 키로 변경 필요
        KakaoSdk.init(this, "YOUR_KAKAO_NATIVE_APP_KEY")

        // 네이티브 브리지 설정
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, CHANNEL).setMethodCallHandler { call, result ->
            when (call.method) {
                "getDeviceInfo" -> {
                    val deviceInfo = mapOf(
                        "platform" to "android",
                        "version" to android.os.Build.VERSION.RELEASE,
                        "model" to android.os.Build.MODEL,
                        "manufacturer" to android.os.Build.MANUFACTURER
                    )
                    result.success(deviceInfo)
                }
                "showToast" -> {
                    val message = call.argument<String>("message")
                    if (message != null) {
                        android.widget.Toast.makeText(this, message, android.widget.Toast.LENGTH_SHORT).show()
                        result.success(true)
                    } else {
                        result.error("INVALID_ARGUMENT", "Message is required", null)
                    }
                }
                else -> {
                    result.notImplemented()
                }
            }
        }
    }
}