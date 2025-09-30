/**
 * Environment Configuration and Validation
 * Validates required environment variables at runtime
 */

interface EnvConfig {
  APP_ENV: 'development' | 'production';
  API_BASE_URL: string;
  KAKAO_REDIRECT_URI: string;
  KAKAO_REST_API_KEY: string;
  GOOGLE_CLIENT_ID: string;
  APPLE_CLIENT_ID: string;
}

class EnvironmentValidator {
  private static instance: EnvironmentValidator;
  private config: EnvConfig | null = null;

  private constructor() {}

  static getInstance(): EnvironmentValidator {
    if (!EnvironmentValidator.instance) {
      EnvironmentValidator.instance = new EnvironmentValidator();
    }
    return EnvironmentValidator.instance;
  }

  /**
   * Validate and return environment configuration
   */
  validate(): EnvConfig {
    if (this.config) {
      return this.config;
    }

    const requiredEnvVars = [
      'NEXT_PUBLIC_APP_ENV',
      'NEXT_PUBLIC_API_BASE_URL',
      'NEXT_PUBLIC_KAKAO_REDIRECT_URI',
      'NEXT_PUBLIC_KAKAO_REST_API_KEY',
      'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
      'NEXT_PUBLIC_APPLE_CLIENT_ID',
    ];

    const missingVars: string[] = [];

    for (const varName of requiredEnvVars) {
      if (!process.env[varName]) {
        missingVars.push(varName);
      }
    }

    if (missingVars.length > 0) {
      const errorMessage = `Missing required environment variables:\n${missingVars.join('\n')}`;

      if (typeof window === 'undefined') {
        // Server-side: throw error to prevent build
        throw new Error(errorMessage);
      } else {
        // Client-side: log warning
        console.error(errorMessage);
      }
    }

    this.config = {
      APP_ENV: (process.env.NEXT_PUBLIC_APP_ENV as 'development' | 'production') || 'development',
      API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
      KAKAO_REDIRECT_URI: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '',
      KAKAO_REST_API_KEY: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || '',
      GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      APPLE_CLIENT_ID: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || '',
    };

    return this.config;
  }

  /**
   * Check if running in production
   */
  isProduction(): boolean {
    return this.validate().APP_ENV === 'production';
  }

  /**
   * Check if running in development
   */
  isDevelopment(): boolean {
    return this.validate().APP_ENV === 'development';
  }

  /**
   * Get API base URL
   */
  getApiBaseUrl(): string {
    return this.validate().API_BASE_URL;
  }

  /**
   * Get OAuth configuration
   */
  getOAuthConfig() {
    const config = this.validate();
    return {
      kakao: {
        redirectUri: config.KAKAO_REDIRECT_URI,
        restApiKey: config.KAKAO_REST_API_KEY,
      },
      google: {
        clientId: config.GOOGLE_CLIENT_ID,
      },
      apple: {
        clientId: config.APPLE_CLIENT_ID,
      },
    };
  }
}

// Export singleton instance
export const env = EnvironmentValidator.getInstance();

// Export config for direct access
export const getEnvConfig = () => env.validate();