# Erasmus Life Las Palmas (ELLP) Mobile Application

Welcome to the Erasmus Life Las Palmas (ELLP) mobile app! This app is designed to provide members with easy access to their membership benefits, including discounts, events, and exclusive offers.

## 🌟 Key Features

### 1. **Digital Membership Card**
   - Users can purchase and access a digital ELLP membership card.
   - Show the membership card to unlock exclusive discounts at partner locations.

### 2. **Discounts Directory**
   - View a list of locations where discounts are available.
   - Filter by categories such as restaurants, bars, shops, and activities.
   - See detailed information about each discount, including conditions.

### 3. **Events Calendar**
   - Browse upcoming events organized by Erasmus Life Las Palmas.
   - View event details including date, location, and how to attend.
   - Stay updated with notifications for new and upcoming events.

### 4. **Exclusive Offers**
   - Access special offers only available to ELLP members.
   - Redeem unique promotions directly through the app.

## 🚀 Technology Stack

The application is developed using:
- **Expo**: A framework for React Native that simplifies the development process.
- **React Native**: For building the cross-platform mobile user interface.
- **TypeScript**: Ensuring type safety and better code maintainability.
- **Async Storage**: For storing user preferences and data locally.
- **NativeWind**: Utilized for Tailwind-like styling in React Native.

## 🛠️ Installation

To get started with the ELLP app, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sofianopoulou/ellp-app.git
   cd .\ELLP\
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Expo server**:
   ```bash
   npx expo start
   ```

## 🧩 Project Structure

```
/ellp-mobile-app
  ├── /app
  │   ├── (auth)          # Authentication-related screens
  │   ├── (tabs)          # Tab navigation screens (Events, Discounts, Profile)
  │   └── screens       # General screens like Profile, Membership, Info, etc.
  ├── /components       # Reusable components (e.g., buttons, alerts, forms)
  ├── /assets           # Images, icons, fonts, and other static assets
  ├── /navigation       # Navigation configuration files
  ├── /types            # TypeScript types for navigation, components, etc.
  ├── index.tsx           # Main application entry point
  └── ...
```

## 📦 Dependencies

Key dependencies used in the project:
- `expo` - Framework for React Native.
- `react-navigation` - For navigation between screens.
- `react-native-async-storage/async-storage` - For local data storage.
- `nativewind` - For consistent and reusable styling.
- `expo-vector-icons` - For icon components in navigation and UI.

## 📱 Usage

1. **Login / Sign Up**: Users need to create an account or log in to access the app.
2. **View Membership**: Access and display the digital membership card from the Profile tab.
3. **Browse Discounts**: Navigate to the Discounts tab to see available offers.
4. **Check Events**: Go to the Events tab for a list of upcoming events.
5. **Manage Profile**: Update personal details and preferences in the Profile tab.

## 🤝 Contributing

1. **Fork the repository**.
2. **Create a new branch** for your feature or fix.
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Stage your changes**.
   ```bash
   git add .
   ```
4. **Commit your changes**.
   ```bash
   git commit -m "Add your feature description"
   ```
5. **Push to the branch**.
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** on GitHub.

## 🔒 License

This project is licensed under the [MIT License](LICENSE).

## 📧 Contact

For inquiries or support, please reach out to the ELLP team at [erasmuslifelaspalmas@gmail.com](mailto:erasmuslifelaspalmas@gmail.com).
