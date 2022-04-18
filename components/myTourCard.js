import React from "react";
import { StyleSheet } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";
import Button from "react-native-paper/src/components/Button";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase";
import Title from "react-native-paper/src/components/Typography/Title";
import Subheading from "react-native-paper/src/components/Typography/Subheading";

export default function MyTourCard(props) {
  const { uid, title, owner, city, country, image, poi } = props.tour;
  const navigate = useNavigation();
  const styles = StyleSheet.create({
    card: {
      margin: 3,
    },
  });

  async function handleTourUsageClick() {
    navigate.navigate("Tour Taking", { uid });
  }

  async function handleRemoveTour(id) {
    const userId = auth.currentUser.uid;

    const userRef = db.ref("users");
    userRef.once("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === userId) {
            db.ref(`/users/${uid}/tours/${id}`).remove();
          } else {
            console.log("Could not delete tour");
          }
        });
      }
    });
  }

  return (
    <Card
      key={uid}
      sx={{ maxWidth: 345 }}
      mode={"outlined"}
      style={styles.card}
    >
      <Card.Cover height="140" source={{ uri: image }} alt="tour image" />
      <Card.Content>
        <Title>{title}</Title>
        <Subheading>
          Location: {city}, {country}
        </Subheading>
        <Subheading>Tour Guide: {owner}</Subheading>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleTourUsageClick()}>Take Tour</Button>
        <Button onPress={() => handleRemoveTour(uid)}>Remove Tour</Button>
      </Card.Actions>
    </Card>
  );
}
