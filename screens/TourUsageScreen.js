import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import TourDetailsCard from "../components/tourDetailsCard";
import { db } from "../firebase";
import MapCard from "../components/mapCard";
import Card from "react-native-paper/src/components/Card/Card";
import Surface from "react-native-paper/src/components/Surface";
import * as Location from "expo-location";
import MapLeaflet from "../components/mapLeaflet";
import { Button } from "react-native-paper";

const TourUsageScreen = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
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
            setTour(tours[uid]);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      const lat = location.coords.latitude;
      console.log("Step 1" + lat);
      const lng = location.coords.longitude;
      console.log("Step 2" + lng);
      setCurrentLat(lat);
      setCurrentLat(lng);
    })();
  }, []);

  async function getLocation() {
    console.log("button pressed");
    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    setCurrentLat(lat);
    setCurrentLat(lng);
  }

  return (
    <>
      <Card style={styles.card}>
        {tour && (
          <Card.Content>
            {tour && (
              <MapCard
                props={tour}
                currentLat={currentLat}
                currentLng={currentLng}
              />
            )}

            <Text>{tour.title}</Text>
            <Text>{tour.city}</Text>
            <Text>{tour.country}</Text>
            <Text>{tour.owner}</Text>
          </Card.Content>
        )}
        <Card.Actions>
          <Button mode="contained" onPress={getLocation}>
            Get Current Location
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};

export default TourUsageScreen;

const styles = StyleSheet.create({
  surface: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  card: {
    margin: 5,
    padding: 5,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignSelf: "flex-end",
  },
});
