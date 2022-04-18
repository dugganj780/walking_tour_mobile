import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TextInput, Button, Card, Divider, Text } from "react-native-paper";
import { auth, db } from "../firebase";
import { set, ref } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

const RegistrationForm = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [message, setMessage] = useState("");
  const [buttonMessage, setButtonMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();

  const [userFound, setUserFound] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const currentUserUid = auth.currentUser.uid;
    const userRef = db.ref("users");
    userRef.on("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === currentUserUid) {
            setUser(users[uid]);
            setUserFound(true);
            console.log(userFound);
            setFirstName(users[uid].firstName);
            setSurname(users[uid].surname);
          }
        });
      }
      if (userFound) {
        setMessage("Please Update Your Account Details Here");
        setButtonMessage("Update Details");
      } else {
        setMessage("Please Enter Your Details");
        setButtonMessage("Complete Registration");
      }
    });
  }, []);

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!firstName || !surname) {
      setError("Field Missing. Please check your entries and update.");
    } else {
      try {
        e.preventDefault();
        set(ref(db, `/users/${currentUserUid}`), {
          uid: currentUserUid,
          firstName: firstName,
          surname: surname,
          newUserWelcome: true,
          newUserTour: true,

          email: auth.currentUser.email,
          admin: false,
          tourGuide: false,
          tours: [],
        });

        navigate.navigate("HomeTabs");
      } catch {
        setError("Failed to create an account");
      }
    }
  }

  async function handleLogout() {
    await logout();
    navigate.navigate("Login");
  }

  return (
    <Card style={styles.card}>
      <Card.Title title={message} />
      <Card.Content style={styles.content}>
        <TextInput
          label="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Divider />

        <TextInput
          label="Surname"
          value={surname}
          onChangeText={(text) => setSurname(text)}
        />
        <Divider />
        <Text>{error}</Text>
        <Button onPress={handleRegisterSubmit} mode="contained">
          {buttonMessage}
        </Button>
        <Button onPress={handleLogout} mode="contained">
          Logout
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

export default RegistrationForm;
