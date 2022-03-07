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
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  //const [image, setImage] = useState("");
  //const { register } = useAuth();
  //const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();
  const uid = auth.currentUser.uid;

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
      /*
        console.log(title);
        const poi = {
          uid: uid,
          poi: true,
          title: title,
          owner: owner,
          ownerid: auth.currentUser.uid,
          city: city,
          lat: lat,
          lng: lng,
          image: image,
          recording: recording,
        };
        setPois((pois) => {
          return [...pois, poi];
        });
        */

      set(ref(db, `/users/${uid}`), {
        uid: uid,
        firstName: firstName,
        surname: surname,
        //image: image,
        pois: [],
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
      <Card.Title title="Please Enter Your Details" />
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
          Complete Registration
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
