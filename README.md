# Bevvy - Cocktail Recipe App

A React Native iOS app showcasing recipes for 100 classic cocktails. Search by cocktail name or alcohol type to find your perfect drink.

## Features

- 🍹 100 classic cocktail recipes
- 🔍 Search by cocktail name
- 🥃 Filter by alcohol type (Whiskey, Vodka, Gin, Rum, Tequila, Brandy, etc.)
- 📱 Beautiful, modern iOS interface
- 📖 Detailed recipe instructions with ingredients and glassware

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Xcode** (required for iOS development - see installation instructions below)
- **CocoaPods** (`sudo gem install cocoapods`)

### Installing Xcode

**Xcode is required for iOS development with React Native.** It includes the iOS Simulator, iOS SDK, and build tools.

1. **Install Xcode from the Mac App Store:**
   - Open the Mac App Store
   - Search for "Xcode"
   - Click "Get" or "Install" (it's free but large - ~15GB, so it may take a while)
   - Wait for the download and installation to complete

2. **Open Xcode once to accept the license:**
   ```bash
   sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
   sudo xcodebuild -runFirstLaunch
   ```

3. **Install Command Line Tools:**
   ```bash
   xcode-select --install
   ```

4. **Install CocoaPods:**
   ```bash
   sudo gem install cocoapods
   ```

**Note:** Xcode installation can take 30-60 minutes depending on your internet connection. Make sure you have enough disk space (at least 20GB free).

📖 **For detailed Xcode installation instructions, see [INSTALL_XCODE.md](./INSTALL_XCODE.md)**

**Alternative:** If you don't want to install Xcode, you could:
- Use **Expo** (simpler setup, but still requires Xcode for iOS builds)
- Focus on **Android development** instead (requires Android Studio)
- Use a **cloud-based development environment**

## Installation

### Option 1: Initialize New React Native Project (Recommended)

If you're starting fresh, initialize a new React Native project and then copy the source files:

```bash
# Initialize a new React Native project
npx @react-native-community/cli@latest init BevvyApp

# Copy the source files from this project
# - Copy App.tsx
# - Copy src/ directory
# - Copy package.json dependencies if needed
```

### Option 2: Use Existing Project Structure

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize iOS project (if needed):**
   ```bash
   # If ios folder doesn't exist or is incomplete, you may need to:
   npx @react-native-community/cli@latest init . --skip-install
   ```

3. **Install iOS dependencies:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Running the App

### iOS Simulator

1. **Start Metro bundler:**
   ```bash
   npm start
   ```

2. **In a new terminal, run the iOS app:**
   ```bash
   npm run ios
   ```

   Or specify a simulator:
   ```bash
   npm run ios -- --simulator="iPhone 15 Pro"
   ```

### iOS Device

1. Open `ios/bevvy-app.xcworkspace` in Xcode
2. Select your device from the device dropdown
3. Click the Run button or press `Cmd + R`

## Project Structure

```
bevvy-app/
├── App.tsx                 # Main app component
├── src/
│   ├── data/
│   │   └── cocktails.ts   # Cocktail data (100 recipes)
│   └── components/
│       ├── CocktailCard.tsx    # Cocktail list item
│       └── CocktailDetail.tsx  # Cocktail detail view
├── ios/                    # iOS native code
└── package.json
```

## Search Features

- **Search by Name**: Type any part of a cocktail name to find it
- **Search by Alcohol Type**: Filter cocktails by the type of alcohol used
- **Quick Browse**: Tap alcohol type chips to quickly filter by that type

## Technologies Used

- React Native 0.73.0
- TypeScript
- React 18.2.0

## License

This project is for educational purposes.

