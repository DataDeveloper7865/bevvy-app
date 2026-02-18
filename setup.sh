#!/bin/bash

# Setup script for Bevvy React Native app
# This script helps set up the React Native project structure

set -e

echo "🍹 Setting up Bevvy Cocktail App..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check if iOS folder exists and has proper structure
if [ ! -d "ios" ] || [ ! -f "ios/bevvy-app.xcworkspace" ]; then
    echo ""
    echo "⚠️  iOS project structure not found."
    echo "   You need to initialize a React Native project first."
    echo ""
    echo "   Run this command in a temporary directory:"
    echo "   npx @react-native-community/cli@latest init BevvyTemp"
    echo ""
    echo "   Then copy the ios/ folder from BevvyTemp to this directory."
    echo "   Update ios/Podfile and project settings as needed."
    echo ""
    read -p "Press enter to continue or Ctrl+C to exit..."
else
    echo "✅ iOS project structure found"
    
    # Install CocoaPods dependencies
    if [ -d "ios" ]; then
        echo ""
        echo "📱 Installing iOS dependencies (CocoaPods)..."
        cd ios
        if command -v pod &> /dev/null; then
            pod install
            cd ..
            echo "✅ iOS dependencies installed"
        else
            echo "⚠️  CocoaPods not found. Install it with: sudo gem install cocoapods"
            cd ..
        fi
    fi
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To run the app:"
echo "  npm start        # Start Metro bundler"
echo "  npm run ios      # Run on iOS simulator"
echo ""

