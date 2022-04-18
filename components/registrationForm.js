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
  const [tours, setTours] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [tourGuide, setTourGuide] = useState(false);
  const [newUserWelcome, setNewUserWelcome] = useState(false);
  const [newUserTour, setNewUserTour] = useState(false);
  const [error, setError] = useState("");
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
            setFirstName(users[uid].firstName);
            setSurname(users[uid].surname);
            setTours(users[uid].tours);
            if (users[uid].admin) {
              setAdmin(users[uid].admin);
            }
            if (users[uid].tourGuide) {
              setTourGuide(users[uid].tourGuide);
            }
            if (users[uid].newUserTour) {
              setNewUserTour(users[uid].newUserTour);
            }
            if (users[uid].newUserWelcome) {
              setNewUserWelcome(users[uid].newUserWelcome);
            }
            console.log(users[uid].admin);
          }
        });
      }
    });
  }, []);

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    const currentUserUid = auth.currentUser.uid;
    console.log(currentUserUid);
    console.log(admin);

    if (!firstName || !surname) {
      setError("Field Missing. Please check your entries and update.");
    } else {
      try {
        set(ref(db, `/users/${currentUserUid}`), {
          uid: currentUserUid,
          firstName: firstName,
          surname: surname,
          newUserWelcome: newUserWelcome,
          newUserTour: newUserTour,
          email: auth.currentUser.email,
          admin: admin,
          tourGuide: tourGuide,
          tours: tours,
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

  function AccountButtons() {
    if (userFound) {
      return (
        <>
          <Button onPress={handleRegisterSubmit} mode="contained">
            Update Details
          </Button>

          <Button onPress={handleLogout} mode="contained">
            Logout
          </Button>
        </>
      );
    } else {
      return (
        <Button onPress={handleRegisterSubmit} mode="contained">
          Complete Registration
        </Button>
      );
    }
  }

  return (
    <Card style={styles.card}>
      {userFound && (
        <Card.Title title={"Please Update Your Account Details Here"} />
      )}
      {!userFound && <Card.Title title={"Please Enter Your Details"} />}

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
        <AccountButtons />
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
