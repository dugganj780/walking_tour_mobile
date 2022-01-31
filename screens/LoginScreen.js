import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
//import { TextInput, TouchableOpacity } from "react-native-web/src/exports/TouchableOpacity";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
//import { KeyboardAvoidingView } from 'react-native-web';

const LoginScreen = () => {
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
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLoginSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleRegisterSubmit}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "blue",
    width: "100%",
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "blue",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "blue",
    fontWeight: "700",
    fontSize: 16,
  },
});
