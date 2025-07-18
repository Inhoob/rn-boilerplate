# Inhoob React Native Boilerplate

A React Native boilerplate template with Expo that includes common libraries and utilities.

## Features

- 📱 React Native with Expo
- 🎨 React Native Unistyles for styling
- 🧭 React Navigation for navigation
- 🌍 i18next for internationalization
- 📦 Zustand for state management
- 💾 React Native MMKV for storage
- 🎯 TypeScript support
- 🔧 Pre-configured with common utilities and hooks

## Usage

```bash
npx inhoob-rn-boilerplate new MyApp
cd MyApp
npm install
```

## Development

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Generate app icons
npm run generate-icons
```

## What's Included

### Libraries
- **Navigation**: React Navigation v7
- **Styling**: React Native Unistyles
- **State Management**: Zustand
- **Storage**: React Native MMKV
- **Internationalization**: i18next
- **Utilities**: Lodash

### Components
- Atomic components (Column, Row, Spacer, Typography)
- Overlay system with useOverlay hook

### Hooks
- useDebounce
- useThrottle
- useStorage
- usePreservedCallback
- usePreservedReference
- useOverlay

### Utilities
- Storage utilities
- Theme configuration
- Internationalization setup

## Project Structure

```
MyApp/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable components
│   │   └── atom/        # Atomic components
│   ├── constants/       # App constants
│   ├── hooks/           # Custom hooks
│   ├── locales/         # Internationalization files
│   ├── stores/          # Zustand stores
│   ├── styles/          # Theme and style configurations
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── android/             # Android-specific files
├── ios/                 # iOS-specific files
├── App.tsx             # Main app component
└── package.json
```

## License

MIT