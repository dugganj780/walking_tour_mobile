import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllToursScreen from "./screens/AllToursScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import TourDetailsScreen from "./screens/TourDetailsScreen";
import TourTakingScreen from "./screens/TourTakingScreen";
import MyToursScreen from "./screens/MyToursScreen";

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#04A777",
    accent: "#496A81",
    background: "#D3D0CB",
    surface: "#7D6D61",
    onSurface: "#7D6D61",
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
              headerStyle: { backgroundColor: "#04A777" },
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="All Tours" component={AllToursScreen} />
            <Stack.Screen name="My Tours" component={MyToursScreen} />
            <Stack.Screen name="Tour Details" component={TourDetailsScreen} />
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
