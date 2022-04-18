import { StyleSheet, Text } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";
import Title from "react-native-paper/src/components/Typography/Title";
import Subheading from "react-native-paper/src/components/Typography/Subheading";
import Button from "react-native-paper/src/components/Button";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { set, ref } from "firebase/database";
import { Divider } from "react-native-paper";

const TourDetailsCard = (props) => {
  const { uid, title, owner, city, country, image, description } = props.props;
  const tourId = uid;
  const navigate = useNavigation();
  const [user, setUser] = useState(null);
  const currentUserUid = auth.currentUser.uid;

  useEffect(() => {
    const userRef = db.ref("users");
    userRef.on("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === currentUserUid) {
            setUser(users[uid]);
          }
        });
      }
    });
  }, []);

  function handlePressBack() {
    navigate.navigate("All Tours");
  }

  function handleAddTour() {
    const userRef = db.ref("users");
    userRef.once("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === currentUserUid) {
            set(ref(db, `users/${currentUserUid}/tours/${tourId}`), { tourId });
          }
        });
      }
    });
    navigate.navigate("My Tours");
  }

  return (
    <Card key={uid} height="100%">
      <Card.Cover height="33%" source={{ uri: image }} />
      <Card.Content>
        <Title>{title}</Title>
        <Subheading>
          <Text>City: {city}</Text>
        </Subheading>
        <Subheading>
          <Text>Country: {country}</Text>
        </Subheading>
        <Subheading>
          <Text>Tour Guide: {owner}</Text>
        </Subheading>
        <Divider style={styles.divider} />
        <Subheading>
          <Text>{description}</Text>
        </Subheading>
      </Card.Content>
      <Card.Actions>
        <Button onPress={handleAddTour} mode="contained" style={styles.divider}>
          Add Tour to Account
        </Button>
        <Button
          onPress={handlePressBack}
          mode="contained"
          style={styles.divider}
        >
          Back
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default TourDetailsCard;

const styles = StyleSheet.create({
  divider: {
    padding: 2,
    margin: 5,
  },
});
