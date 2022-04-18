import { StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TourList from "../components/tourList";
import { db } from "../firebase";
import { Searchbar } from "react-native-paper";

const AllToursScreen = (props) => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snapshot) => {
      const tour = snapshot.val();
      const tours = [];
      for (let id in tour) {
        tours.push(tour[id]);
      }
      setTours(tours);
      setFilteredTours(tours);
    });
  }, []);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = tours.filter(function (item) {
        const itemData = item.city ? item.city.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredTours(newData);
      setSearch(text);
    } else {
      setFilteredTours(tours);
      setSearch(text);
    }
  };

  return (
    <>
      <Searchbar
        placeholder="Search by City"
        onChangeText={searchFilterFunction}
        value={search}
      />
      <ScrollView style={styles.page}>
        <TourList props={filteredTours} />
      </ScrollView>
    </>
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
