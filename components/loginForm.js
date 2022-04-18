import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, Button, Card, Divider, Text } from "react-native-paper";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email || !password) {
      setError("Field Missing. Please check your entries and update.");
    } else if (password.toString().length < 5) {
      setError("Password must be at least 6 characters in length");
    } else if (!regex.test(email)) {
      setError("Invalid email address");
    } else {
      try {
        setError("");
        setLoading(true);
        await register(email, password);
        await login(email, password);
        navigate.navigate("Registration");
      } catch {
        setError("Failed to create an account");
      }
    }
    setLoading(false);
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate.navigate("HomeTabs");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Divider />

        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <Divider />
        <Text color="red">{error}</Text>
        <Button onPress={handleLoginSubmit} mode="contained">
          Login
        </Button>
        <Divider />

        <Button onPress={handleRegisterSubmit} mode="contained">
          Register
        </Button>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
});

export default LoginForm;
