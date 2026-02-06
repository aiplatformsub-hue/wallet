import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.wallet.cardstore",
  appName: "Wallet",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  ios: {
    contentInset: "automatic",
    preferredContentMode: "mobile",
    scheme: "Wallet",
  },
  plugins: {
    StatusBar: {
      style: "LIGHT",
      backgroundColor: "#667eea",
    },
    SplashScreen: {
      launchAutoHide: true,
      androidSplashResourceName: "splash",
      splashFullScreen: false,
      splashImmersive: false,
    },
  },
};

export default config;
