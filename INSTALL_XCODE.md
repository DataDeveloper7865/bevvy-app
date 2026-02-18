# Installing Xcode for iOS Development

Xcode is **required** to build and run iOS apps with React Native. This guide will help you install it.

## Why Xcode is Needed

- **iOS Simulator**: Test your app without a physical device
- **iOS SDK**: Required libraries and frameworks for iOS development
- **Build Tools**: Compile your React Native code into an iOS app
- **CocoaPods**: Dependency manager for iOS (requires Xcode)

## Installation Steps

### Step 1: Install Xcode from Mac App Store

1. Open the **Mac App Store** on your Mac
2. Search for **"Xcode"** (it's made by Apple)
3. Click **"Get"** or **"Install"** (it's free)
4. **Wait for download** - Xcode is large (~15GB) and may take 30-60 minutes depending on your internet speed
5. Make sure you have **at least 20GB of free disk space**

### Step 2: Open Xcode and Accept License

1. Open **Xcode** from Applications (or Launchpad)
2. If prompted, click **"Agree"** to accept the license agreement
3. Wait for Xcode to finish initial setup (it may install additional components)

### Step 3: Install Command Line Tools

Open Terminal and run:

```bash
xcode-select --install
```

If you see "command line tools are already installed", you're good to go!

### Step 4: Set Xcode Path (if needed)

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

### Step 5: Install CocoaPods

CocoaPods is the dependency manager for iOS projects:

```bash
sudo gem install cocoapods
```

### Step 6: Verify Installation

Check that everything is installed correctly:

```bash
# Check Xcode version
xcodebuild -version

# Check CocoaPods
pod --version

# Check Node.js (should already be installed)
node --version
```

## Troubleshooting

### "xcode-select: error: developer tools not found"

Run: `xcode-select --install` and follow the prompts.

### CocoaPods installation fails

Try installing with a different method:

```bash
# Using Homebrew (if you have it)
brew install cocoapods

# Or update Ruby first
sudo gem update --system
sudo gem install cocoapods
```

### Xcode takes too long to download

- Check your internet connection
- Pause and resume if needed (Mac App Store supports this)
- Make sure you have enough disk space
- Consider downloading overnight

### "Cannot find Xcode"

Make sure Xcode is in `/Applications/Xcode.app`. If you moved it, either:
- Move it back to Applications, or
- Update the path: `sudo xcode-select --switch /path/to/Xcode.app/Contents/Developer`

## After Installation

Once Xcode is installed, you can proceed with the React Native setup:

1. Follow the instructions in `QUICKSTART.md`
2. Initialize the React Native project
3. Install dependencies with `npm install`
4. Install iOS pods with `cd ios && pod install`
5. Run the app with `npm run ios`

## Alternatives (If You Can't Install Xcode)

If you cannot install Xcode (e.g., not on macOS, or insufficient disk space):

1. **Use Expo**: Simpler setup, but still requires Xcode for iOS builds
   ```bash
   npx create-expo-app@latest
   ```

2. **Focus on Android**: Requires Android Studio instead
   - Install Android Studio
   - Set up Android SDK
   - Run `npm run android`

3. **Cloud Development**: Use services like:
   - GitHub Codespaces
   - GitPod
   - CodeSandbox (limited React Native support)

4. **Physical iOS Device**: You still need Xcode to build, but you could use a friend's Mac or a cloud Mac service

## System Requirements

- **macOS**: 12.0 (Monterey) or later
- **Disk Space**: At least 20GB free
- **RAM**: 8GB minimum, 16GB recommended
- **Internet**: Stable connection for download

## Need Help?

- [Official Xcode Documentation](https://developer.apple.com/xcode/)
- [React Native Environment Setup](https://reactnative.dev/docs/environment-setup)
- [CocoaPods Installation Guide](https://guides.cocoapods.org/using/getting-started.html)

