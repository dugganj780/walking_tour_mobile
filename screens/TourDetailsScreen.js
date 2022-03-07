import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import TourDetailsCard from "../components/tourDetailsCard";
import { db } from "../firebase";

const TourDetailsScreen = ({ route, navigation }) => {
  const { uid } = route.params;
  const tourId = uid;

  const [tour, setTour] = useState(null);

  //const fooRef = rootRef.child("foo");

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            // The ID is the key
            // The Object is foo[key]
            setTour(tours[uid]);
          }
        });
      }
    });
  }, []);

  return (
    <View styles={styles.container}>
      {tour && <TourDetailsCard props={tour} />}
    </View>
  );
};

export default TourDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D3D0CB",
    width: "100%",
    height: "100%",
  },
});
