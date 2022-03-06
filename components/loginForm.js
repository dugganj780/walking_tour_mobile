import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
//import { TextInput, TouchableOpacity } from "react-native-web/src/exports/TouchableOpacity";
import { TextInput, Button, Card, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
//import { KeyboardAvoidingView } from 'react-native-web';

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
    try {
      setError("");
      setLoading(true);
      await register(email, password);
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate.navigate("All Tours");
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
