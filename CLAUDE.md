# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Android application project called "techmeet-hr-manager" built with Kotlin and Android Gradle Plugin. The project uses modern Android development practices with:

- **Package**: `com.example.techmeet_hr_manager`
- **Target SDK**: 36 (latest)
- **Min SDK**: 24 (Android 7.0+)
- **Kotlin**: 2.0.21
- **AGP**: 8.13.0

## Build Commands

### Building the project
```bash
./gradlew build
```

### Running tests
```bash
# Unit tests
./gradlew test

# Instrumented tests (requires emulator/device)
./gradlew connectedAndroidTest
```

### Installing on device/emulator
```bash
# Debug build
./gradlew installDebug

# Release build
./gradlew installRelease
```

### Cleaning the project
```bash
./gradlew clean
```

### Lint checking
```bash
./gradlew lint
```

## Project Structure

- **Main source**: `app/src/main/java/com/example/techmeet_hr_manager/`
- **Unit tests**: `app/src/test/java/com/example/techmeet_hr_manager/`
- **Instrumented tests**: `app/src/androidTest/java/com/example/techmeet_hr_manager/`
- **Resources**: `app/src/main/res/`
- **Build configs**: `app/build.gradle.kts` (app-level), `build.gradle.kts` (project-level)
- **Dependencies**: `gradle/libs.versions.toml` (version catalog)

## Dependencies

The project uses version catalogs (`gradle/libs.versions.toml`) for dependency management. Key dependencies include:
- AndroidX Core KTX
- AppCompat
- Material Design Components
- ConstraintLayout
- JUnit for testing
- Espresso for UI testing

## Development Notes

- Uses Kotlin with JVM target 11
- Follows standard Android project structure
- Edge-to-edge UI support enabled in MainActivity
- Material Design theme applied
- Currently minimal with single MainActivity as entry point