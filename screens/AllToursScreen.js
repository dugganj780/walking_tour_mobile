import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import TourList from "../components/tourList";
import { db } from "../firebase";
import Appbar from "../components/appBar";

const AllToursScreen = (props) => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snapshot) => {
      const tour = snapshot.val();
      const tours = [];
      for (let id in tour) {
        tours.push(tour[id]);
      }
      setTours(tours);
    });
  }, []);

  return (
    <View style={styles.page}>
      {/*<Appbar props="All Tours" />*/}
      <TourList props={tours} />
    </View>
  );
};

export default AllToursScreen;

const styles = StyleSheet.create({
  page: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
});
