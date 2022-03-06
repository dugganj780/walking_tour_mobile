import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllToursScreen from "./screens/AllToursScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import TourDetailsScreen from "./screens/TourDetailsScreen";
import TourUsageScreen from "./screens/TourUsageScreen";
import TourTakingScreen from "./screens/TourTakingScreen";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FC440F",
    accent: "#496A81",
    background: "#D3D0CB",
    surface: "#D3D0CB",
    onSurface: "#D3D0CB",
    //backdrop: "#D3D0CB",
  },
};

export default function App() {
  console.log(require("./assets/favicon.png"));
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <AuthProvider>
          <Stack.Navigator
            screenOptions={{
              headerMode: "screen",
              headerTintColor: "white",
              headerStyle: { backgroundColor: "#FC440F" },
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="All Tours" component={AllToursScreen} />
            <Stack.Screen name="Tour Details" component={TourDetailsScreen} />
            <Stack.Screen name="Tour Usage" component={TourUsageScreen} />
            <Stack.Screen name="Tour Taking" component={TourTakingScreen} />
          </Stack.Navigator>
        </AuthProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D3D0CB",
    alignItems: "center",
    justifyContent: "center",
  },
});
