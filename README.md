1. npx create-expo-app frontend --template
2. cd frontend
3. npm install @react-navigation/native @react-navigation/native-stack
4. npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
5. npm install redux react-redux
6. npx expo install react-dom react-native-web @expo/metro-runtime
7. npm install @reduxjs/toolkit react-redux axios react-navigation react-native-screens react-native-safe-area-context @react-navigation/native @react-navigation/native-stack jwt-decode
8. npx expo install expo-auth-session expo-web-browser
9. npm install jwt-decode
10. npm install -D tailwindcss postcss autoprefixer
11. npx tailwindcss init -p

# Database Setup
- docker-compose up -d # to run in detach mode
- docker-compose up # to see logs
- Open http://localhost:5050/ for pgadmin console. Docker compose takes care of setting up postgres, jsut enter admin123 to use the config if it asks for master password.
- SimpleSuppers db passowrd: secret123
