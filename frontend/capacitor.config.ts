import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'frontend',
  webDir: 'dist/frontend/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
