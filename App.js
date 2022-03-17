import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllToursScreen from "./screens/AllToursScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { AuthProvider } from "./contexts/AuthContext";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import TourDetailsScreen from "./screens/TourDetailsScreen";
import TourTakingScreen from "./screens/TourTakingScreen";
import MyToursScreen from "./screens/MyToursScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#04A777",
    accent: "#496A81",
    background: "#D3D0CB",
    //surface: "#7D6D61",
    //onSurface: "#7D6D61",
    //backdrop: "#D3D0CB",
  },
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerMode: "screen",
        headerTintColor: "white",
        headerStyle: { backgroundColor: "#04A777" },
        tabBarStyle: { backgroundColor: "#04A777" },
        tabBarActiveTintColor: "#F7C548",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen
        name="Home"
        component={AllToursScreen}
        options={{
          tabBarLabel: "All Tours",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Tours"
        component={MyToursScreen}
        options={{
          tabBarLabel: "My Tours",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="My Profile"
        component={RegistrationScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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
            <Stack.Screen
              name="Home"
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Tour Details" component={TourDetailsScreen} />
            <Stack.Screen name="Tour Taking" component={TourTakingScreen} />

            {/*
            <Stack.Screen name="All Tours" component={AllToursScreen} />
            <Stack.Screen name="My Tours" component={MyToursScreen} />

          */}
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
