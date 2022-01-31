import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import TourDetailsCard from "../components/tourDetailsCard";
import { db } from "../firebase";

const TourDetailsScreen = ({ route, navigation }) => {
  const { uid } = route.params;
  console.log(uid);
  const tourId = uid;
  console.log(tourId);

  const [tour, setTour] = useState(null);

  //const fooRef = rootRef.child("foo");

  useEffect(() => {
    console.log("Step 1");

    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        console.log("Step 2");

        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            console.log("Step 3");

            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(tours[uid]);
            setTour(tours[uid]);
          }
        });
      }
    });
  }, []);

  return <View>{tour && <TourDetailsCard props={tour} />}</View>;
};

export default TourDetailsScreen;

const styles = StyleSheet.create({});
