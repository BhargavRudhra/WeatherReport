import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.WeatherReport.app',
  appName: 'WeatherReport',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins:{
    SplashScreen:{
      lanuchShowDuration : 2000
    },
    GoogleAuth: {
      scopes: ["profile","email"],
      serverClientId: "1099229935992-0ttr174ttf6vj3c7pr2i05dji8in2g0i.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
