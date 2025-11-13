# 📱 AegeanSwim Mobile App - Quick Setup Guide

Complete guide to build iOS & Android apps from scratch.

## 🎯 What You're Building

A native mobile app (iOS + Android) with:
- Island selection with 30+ islands
- Real-time beach recommendations
- Weather-based swim scoring
- PayPal donation integration
- Native performance & UX

**Timeline**: 2-3 days to first working build

---

## 📋 Prerequisites Setup

### For iOS Development (macOS only)

**1. Install Xcode** (2-3 hours download)
```bash
# Download from App Store (free)
# Or command line:
xcode-select --install
```

**2. Install CocoaPods**
```bash
sudo gem install cocoapods
```

**3. Install Node.js** (if not already)
```bash
# Using Homebrew
brew install node

# Verify
node --version  # Should be >= 16
npm --version
```

### For Android Development (Windows/macOS/Linux)

**1. Install Android Studio** ([Download](https://developer.android.com/studio))
   - Include Android SDK
   - Android SDK Platform 33
   - Android Virtual Device (emulator)

**2. Set environment variables**

Add to `~/.bash_profile` or `~/.zshrc`:
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Reload:
```bash
source ~/.zshrc
```

**3. Install JDK 11**
```bash
# macOS
brew install --cask adoptopenjdk11

# Verify
java -version
```

---

## 🚀 Build Your First App (30 minutes)

### Step 1: Setup React Native Environment

**Option A: Using React Native CLI (Recommended)**

```bash
# Install React Native CLI globally
npm install -g react-native-cli

# Verify installation
react-native --version
```

**Option B: Using Expo (Easier, but limited)**

```bash
# If you want easier development
npm install -g expo-cli

# Note: Our app uses React Native CLI for more control
```

### Step 2: Install Mobile App Dependencies

```bash
cd /home/user/aegeanswim/mobile

# Install Node modules
npm install

# For iOS: Install CocoaPods dependencies
cd ios
pod install
cd ..
```

### Step 3: Update API Configuration

```bash
# Edit src/config/api.js
nano src/config/api.js
```

Change production API URL:
```javascript
production: {
  baseURL: 'https://your-api.vercel.app/api',  // Your actual API URL!
}
```

### Step 4: Run on iOS (macOS only)

```bash
# Start Metro bundler
npm start

# In a new terminal
npm run ios

# Or run specific simulator
npm run ios -- --simulator="iPhone 14 Pro"
```

**First time may take 10-15 minutes to build!**

### Step 5: Run on Android

```bash
# Start Android emulator first
# Open Android Studio → AVD Manager → Play button

# Or via command line
emulator -avd Pixel_5_API_33

# In project directory
npm run android
```

**First time may take 10-15 minutes to build!**

---

## 🐛 Troubleshooting First Build

### iOS Issues

**"Command not found: react-native"**
```bash
npx react-native run-ios
```

**"xcrun: error: SDK cannot be located"**
```bash
sudo xcode-select --switch /Applications/Xcode.app
```

**"No bundle URL present"**
```bash
# Start Metro manually
npm start -- --reset-cache
```

**Pod install fails**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Android Issues

**"SDK location not found"**

Create `android/local.properties`:
```
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

**"Execution failed for task ':app:installDebug'"**
```bash
# Check if emulator is running
adb devices

# If no devices, start emulator from Android Studio
```

**"Could not compile settings file"**
```bash
cd android
./gradlew clean
cd ..
```

---

## 📦 Building for Production

### Android APK (Ready to Install)

**Step 1: Generate Signing Key** (First time only)

```bash
cd android/app

keytool -genkeypair -v -keystore aegeanswim-release.keystore \
  -alias aegeanswim \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Enter password when prompted (remember it!)
# Enter your name, organization, etc.
```

**Step 2: Configure Signing**

Edit `android/gradle.properties`:
```properties
MYAPP_RELEASE_STORE_FILE=aegeanswim-release.keystore
MYAPP_RELEASE_KEY_ALIAS=aegeanswim
MYAPP_RELEASE_STORE_PASSWORD=YOUR_PASSWORD
MYAPP_RELEASE_KEY_PASSWORD=YOUR_PASSWORD
```

**Step 3: Build Release APK**

```bash
cd android
./gradlew assembleRelease
cd ..

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

**Step 4: Test APK**

```bash
# Install on connected device or emulator
adb install android/app/build/outputs/apk/release/app-release.apk
```

### iOS Archive (For App Store)

**Step 1: Open in Xcode**

```bash
open ios/AegeanSwim.xcworkspace
```

**Step 2: Configure Signing**
- Select project in left sidebar
- Select "AegeanSwim" target
- Signing & Capabilities tab
- Team: Select your Apple Developer account
- Bundle Identifier: `com.aegeanswim.app` (must be unique)

**Step 3: Archive**
- Product → Scheme → Edit Scheme
- Run → Build Configuration → Release
- Product → Archive
- Wait 5-10 minutes...

**Step 4: Upload to App Store Connect**
- Window → Organizer
- Select your archive
- Distribute App → App Store Connect
- Upload
- Submit for review

---

## 📱 Publishing to Stores

### Google Play Store

**Requirements:**
- ✅ Google Play Developer account ($25 one-time)
- ✅ Signed APK or AAB file
- ✅ App icon (512x512 px)
- ✅ Screenshots (2-8 per device)
- ✅ Feature graphic (1024x500 px)
- ✅ Privacy policy URL

**Steps:**
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app
3. Fill in store listing
4. Upload AAB/APK
5. Submit for review (24-72 hours)

### Apple App Store

**Requirements:**
- ✅ Apple Developer account ($99/year)
- ✅ Xcode archive
- ✅ App icon (all sizes)
- ✅ Screenshots for all devices
- ✅ Privacy policy URL

**Steps:**
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app
3. Fill in app information
4. Upload build from Xcode
5. Submit for review (24-48 hours)

---

## 🎨 Customization Quick Wins

### 1. Change App Name

```json
// mobile/app.json
{
  "displayName": "Your App Name"
}
```

### 2. Change App Icon

Use [App Icon Generator](https://appicon.co/):
1. Upload 1024x1024 icon
2. Download all sizes
3. Replace in `android/app/src/main/res/mipmap-*/`
4. Replace in `ios/AegeanSwim/Images.xcassets/AppIcon.appiconset/`

### 3. Change Primary Color

```javascript
// Search and replace in all screen files
backgroundColor: '#0891b2'  // Change to your brand color
```

### 4. Add App Splash Screen

```bash
# Install splash screen package
npm install react-native-splash-screen
```

---

## 📊 Testing Checklist

Before publishing:

**Functionality:**
- [ ] App launches successfully
- [ ] Island list loads
- [ ] Beach recommendations work
- [ ] PayPal donation opens
- [ ] Navigation works smoothly
- [ ] Back button works correctly

**Performance:**
- [ ] No crashes on launch
- [ ] Smooth scrolling
- [ ] Fast API responses
- [ ] Works offline (graceful errors)

**Devices:**
- [ ] Test on iOS iPhone
- [ ] Test on iOS iPad
- [ ] Test on Android phone
- [ ] Test on Android tablet
- [ ] Test on slow internet

**Store Requirements:**
- [ ] Screenshots prepared
- [ ] App icon ready
- [ ] Description written
- [ ] Privacy policy URL
- [ ] Age rating appropriate

---

## 💰 Cost Breakdown

| Item | Cost | Frequency |
|------|------|-----------|
| Apple Developer | $99 | Annual |
| Google Play Developer | $25 | One-time |
| App Icon Design | $0-50 | One-time |
| Screenshots/Graphics | $0-100 | One-time |
| **Total First Year** | **$124-274** | - |
| **Subsequent Years** | **$99** | Annual (iOS only) |

**Note**: Backend hosting costs separate (see main README)

---

## 🚀 Launch Timeline

**Day 1-2: Setup & Development**
- ✅ Install prerequisites
- ✅ Build first working app
- ✅ Test locally
- ✅ Customize branding

**Day 3-4: Testing**
- Test on real devices
- Fix bugs
- Performance optimization
- Get beta testers feedback

**Day 5-6: Store Preparation**
- Create developer accounts
- Prepare store listings
- Create screenshots
- Write descriptions

**Day 7: Submission**
- Build release versions
- Upload to stores
- Submit for review

**Day 8-14: Review Process**
- Wait for approval
- Fix any issues
- Resubmit if needed

**Day 15+: Launch!** 🎉
- Announce on social media
- Share with users
- Monitor reviews
- Plan updates

---

## 📞 Next Steps

1. **Start with iOS** (easier if you have macOS)
   ```bash
   cd mobile
   npm install
   cd ios && pod install && cd ..
   npm run ios
   ```

2. **Then do Android**
   ```bash
   npm run android
   ```

3. **Join Communities**
   - [React Native Discord](https://discord.gg/reactnative)
   - [Stack Overflow - React Native](https://stackoverflow.com/questions/tagged/react-native)

4. **Read Documentation**
   - [React Native Docs](https://reactnative.dev/)
   - [React Navigation](https://reactnavigation.org/)

---

## 🆘 Getting Help

**Common Questions:**
- Check `mobile/README.md` for detailed docs
- Search GitHub Issues
- Ask in React Native Discord

**Still stuck?**
- Email: support@aegeanswim.com
- Create GitHub Issue with:
  - Error message
  - Steps to reproduce
  - Your environment (OS, Node version, etc.)

---

**Ready to build your mobile apps? Start with Step 1!** 🚀

