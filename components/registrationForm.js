import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
//import { TextInput, TouchableOpacity } from "react-native-web/src/exports/TouchableOpacity";
import { TextInput, Button, Card, Divider } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { auth, db, storage } from "../firebase";
import { set, ref } from "firebase/database";
import { ref as sRef } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
//import { KeyboardAvoidingView } from 'react-native-web';

const RegistrationForm = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [message, setMessage] = useState("");
  const [buttonMessage, setButtonMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  const currentUserUid = auth.currentUser.uid;
  const currentUserEmail = auth.currentUser.email;

  useEffect(() => {
    const userRef = db.ref("users");
    userRef.on("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === currentUserUid) {
            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(users[uid]);
            setUser(users[uid]);
            setFirstName(users[uid].firstName);
            setSurname(users[uid].surname);
            setMessage("Please Update Your Account Details Here");
            setButtonMessage("Update Details");
          } else {
            setMessage("Please Enter Your Details");
            setButtonMessage("Complete Registration");
          }
        });
      }
    });
  }, []);

  const uploadImageHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadImageFile(file);
  };

  function uploadImageFile(file) {
    if (!file) return;

    const storageRef = sRef(storage, `profileImages/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        //setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          setImage(url);
        });
      }
    );
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    try {
      e.preventDefault();
      set(ref(db, `/users/${currentUserUid}`), {
        uid: currentUserUid,
        firstName: firstName,
        surname: surname,
        newUser: true,
        email: currentUserEmail,
        admin: false,
        tourGuide: false,
        tours: [],
      });

      setFirstName("");
      setSurname("");
      setImage("");
      navigate.navigate("All Tours");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  /*
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
*/
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
        {/*<form onSubmit={uploadImageHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload Profile Image</button>
        </form>*/}

        <Button onPress={handleRegisterSubmit} mode="contained">
          {buttonMessage}
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
