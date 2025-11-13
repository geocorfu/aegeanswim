# 📱 AegeanSwim Mobile App

> React Native mobile app for iOS and Android - Find perfect swimming beaches in the Aegean Sea

## 🎯 Features

- **Real-time beach recommendations** based on weather conditions
- **30+ Aegean islands** with 100+ beaches
- **Smart swim scoring** algorithm
- **Wind protection analysis**
- **In-app donations** via PayPal
- **Native iOS & Android** performance
- **Offline island data** (coming soon)
- **Push notifications** for weather alerts (coming soon)

## 🏗️ Tech Stack

- **React Native** 0.72.6
- **React Navigation** for routing
- **Axios** for API calls
- **React Native Vector Icons**
- **Async Storage** for local data

## 📋 Prerequisites

### macOS (for iOS development)

- **Node.js** >= 16
- **Xcode** 14+ (from App Store)
- **CocoaPods** (`sudo gem install cocoapods`)
- **iOS Simulator** (included with Xcode)

### Windows/Linux (for Android development)

- **Node.js** >= 16
- **Android Studio** with Android SDK
- **JDK** 11 or newer
- **Android Emulator** or physical device

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd mobile
npm install

# For iOS only (macOS)
cd ios && pod install && cd ..
```

### 2. Configure API URL

Edit `src/config/api.js`:

```javascript
const API_CONFIG = {
  production: {
    baseURL: 'https://your-api.vercel.app/api',  // Change this!
  },
};
```

### 3. Run the App

**iOS** (macOS only):
```bash
npm run ios
```

**Android**:
```bash
npm run android
```

**Start Metro Bundler** (if not auto-started):
```bash
npm start
```

## 📱 Development

### Project Structure

```
mobile/
├── src/
│   ├── screens/          # App screens
│   │   ├── HomeScreen.js          # Island selection & search
│   │   ├── RecommendationsScreen.js  # Beach results
│   │   └── DonateScreen.js        # Support page
│   ├── navigation/       # Navigation setup
│   │   └── AppNavigator.js
│   ├── services/         # API services
│   │   └── BeachService.js
│   ├── config/          # Configuration
│   │   └── api.js
│   ├── components/      # Reusable components
│   ├── utils/           # Utility functions
│   └── assets/          # Images, fonts, etc.
├── android/             # Android native code
├── ios/                 # iOS native code
├── App.js               # Main app component
├── index.js             # Entry point
└── package.json
```

### Available Scripts

```bash
npm run android      # Run on Android
npm run ios          # Run on iOS
npm start            # Start Metro bundler
npm run build:android  # Build Android APK
npm run build:ios    # Build iOS for App Store
npm test             # Run tests
npm run lint         # Lint code
```

### API Integration

The app connects to your backend API:

```javascript
// src/services/BeachService.js
import { API_BASE_URL } from '../config/api';

// Endpoints used:
GET /api/beaches/islands/list     # Get all islands
GET /api/beaches/:island           # Get beaches for island
GET /api/weather/recommendations   # Get beach recommendations
```

## 🔨 Building for Production

### Android APK

```bash
# 1. Generate release keystore (first time only)
cd android/app
keytool -genkeypair -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# 2. Configure signing in android/gradle.properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****

# 3. Build APK
cd ../..
npm run build:android

# APK location: android/app/build/outputs/apk/release/app-release.apk
```

### iOS App Store Build

```bash
# 1. Open Xcode
open ios/AegeanSwim.xcworkspace

# 2. Select "Any iOS Device" as target
# 3. Product → Archive
# 4. Upload to App Store Connect
# 5. Submit for review
```

## 📦 Publishing

### Google Play Store

1. **Create Google Play Developer Account** ($25 one-time fee)
2. **Prepare store listing:**
   - App title: "AegeanSwim - Beach Weather"
   - Description: (see below)
   - Screenshots: 2-8 screenshots per device type
   - Feature graphic: 1024 x 500 px
   - App icon: 512 x 512 px

3. **Upload APK/AAB:**
   ```bash
   cd android
   ./gradlew bundleRelease
   # Upload: android/app/build/outputs/bundle/release/app-release.aab
   ```

4. **Submit for review** (usually 24-72 hours)

### Apple App Store

1. **Apple Developer Program** ($99/year)
2. **App Store Connect setup:**
   - Create new app
   - Bundle ID: `com.aegeanswim.app`
   - App name, subtitle, description
   - Screenshots for all device sizes

3. **Upload build** via Xcode or Transporter
4. **Submit for review** (usually 24-48 hours)

## 🎨 Customization

### Change App Name

```json
// app.json
{
  "name": "YourAppName",
  "displayName": "Your App"
}
```

### Change App Icon

Replace files in:
- `android/app/src/main/res/mipmap-*/ic_launcher.png`
- `ios/AegeanSwim/Images.xcassets/AppIcon.appiconset/`

Or use: [App Icon Generator](https://appicon.co/)

### Change Colors

Edit screens in `src/screens/` to change color scheme:
```javascript
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0891b2',  // Change this!
  }
});
```

## 🐛 Troubleshooting

### Common Issues

**Metro bundler won't start:**
```bash
npm start -- --reset-cache
```

**iOS build fails:**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

**Android build fails:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

**"Unable to connect to server":**
- Check API_BASE_URL in `src/config/api.js`
- Ensure backend is running
- For Android emulator, use `10.0.2.2` instead of `localhost`

**Icons not showing:**
```bash
# iOS
cd ios && pod install && cd ..

# Android
react-native link react-native-vector-icons
```

## 📊 App Store Listing Content

### Title
**AegeanSwim - Beach Weather**

### Short Description
Find perfect swimming beaches in the Aegean Sea based on real-time wind conditions.

### Full Description
```
Never get caught in rough waters again! AegeanSwim analyzes real-time wind conditions and geographical protection to recommend the best beaches for swimming in the Aegean Sea.

🌬️ REAL-TIME WIND ANALYSIS
Live weather data analyzing wind patterns, Meltemi conditions, and swimming safety

🗺️ 30+ ISLANDS COVERED
Comprehensive database of 100+ beaches across Cyclades, Dodecanese, and North Aegean islands

🛡️ GEOGRAPHICAL PROTECTION
Smart algorithms calculate wind shelter from cliffs, bays, and natural formations

🎯 SMART RECOMMENDATIONS
AI-powered ranking system finds the best swimming conditions for your specific time

📱 MOBILE OPTIMIZED
Perfect for checking conditions on-the-go at the beach

💝 FREE & COMMUNITY SUPPORTED
Free service funded by beach lovers who believe in ocean safety

FEATURED ISLANDS:
Mykonos, Santorini, Paros, Naxos, Ios, Milos, Rhodes, Kos, Crete, and 20+ more!

Plan your perfect beach day with confidence. Download AegeanSwim today!
```

### Keywords (for App Store Optimization)
```
beach, weather, swimming, greece, aegean, cyclades, mykonos, santorini, wind, meltemi, travel, vacation, ocean, sea, safety
```

### Category
- Primary: Travel
- Secondary: Weather

## 🔄 Updates & Maintenance

### Updating the App

1. Make code changes
2. Test thoroughly
3. Increment version in `app.json` and `package.json`
4. Build new release
5. Upload to stores
6. Submit update for review

### Minimum Requirements

- **iOS**: 12.0+
- **Android**: 6.0 (API level 23)+

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/geocorfu/aegeanswim/issues)
- **Email**: support@aegeanswim.com
- **API Docs**: [Backend README](../backend/README.md)

## 📝 License

MIT License - See main repository for details

## 🙏 Acknowledgments

- Weather data: [Open-Meteo API](https://open-meteo.com/)
- Icons: React Native Vector Icons
- Navigation: React Navigation

---

**Made with 🌊 for beach lovers**
