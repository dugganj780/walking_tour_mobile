import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllToursScreen from "./screens/AllToursScreen";
import LoginScreen from "./screens/LoginScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import TourDetailsScreen from "./screens/TourDetailsScreen";
import TourUsageScreen from "./screens/TourUsageScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  console.log(require("./assets/favicon.png"));
  return (
    <NavigationContainer>
      <AuthProvider>
        <PaperProvider>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="All Tours" component={AllToursScreen} />
            <Stack.Screen name="Tour Details" component={TourDetailsScreen} />
            <Stack.Screen name="Tour Usage" component={TourUsageScreen} />
          </Stack.Navigator>
        </PaperProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
