import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Button from "react-native-paper/src/components/Button";
import Modal from "react-native-paper/src/components/Modal";
import Portal from "react-native-paper/src/components/Portal/Portal";
import Card from "react-native-paper/src/components/Card/Card";
import { db } from "../firebase";
import MediaPlayer from "../components/mediaPlayer";
import Surface from "react-native-paper/src/components/Surface";
import * as Location from "expo-location";

const TourTakingScreen = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [foundPois, setFoundPois] = useState([]);
  const [activePoi, setActivePoi] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tour, setTour] = useState(null);
  const { uid } = route.params;
  const tourId = uid;
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const getPois = async (tour) => {
    const poiRef = db.ref("pois");
    poiRef.on("value", (snapshot) => {
      const poi = snapshot.val();
      const dbPois = [];
      const keys = Object.keys(tour.pois);
      for (let id in poi) {
        keys.forEach((key, index) => {
          if (key === id) {
            dbPois.push(poi[id]);
          }
        });
      }
      setFoundPois(dbPois);
    });
  };

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            setTour(tours[uid]);
            getPois(tours[uid]);
          }
        });
      }
    });
  }, []);

  /*
  useEffect(() => {
    const getPois = async () => {
      const poiRef = db.ref("pois");
      poiRef.on("value", (snapshot) => {
        const poi = snapshot.val();
        const dbPois = [];
        const keys = Object.keys(tour.pois);
        for (let id in poi) {
          keys.forEach((key, index) => {
            if (key === id) {
              dbPois.push(poi[id]);
            }
          });
        }
        setFoundPois(dbPois);
      });
    };
    getPois();
  }, []);
  */

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
      const lng = location.coords.longitude;
      setCurrentLat(lat);
      setCurrentLng(lng);
    })();
  }, []);

  async function getLocation() {
    console.log("button pressed");
    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    setCurrentLat(lat);
    setCurrentLng(lng);
    console.log(currentLat);
  }

  function calloutPressHandler(props) {
    setActivePoi(props);
    setModalVisible(true);
  }

  return (
    <>
      <Card style={styles.card}>
        {tour && (
          <Card.Content>
            <>
              {foundPois[0] && (
                <MapView
                  style={styles.map}
                  loadingEnabled={true}
                  initialRegion={{
                    latitude: currentLat,
                    longitude: currentLng,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0025,
                  }}
                  region={{
                    latitude: currentLat,
                    longitude: currentLng,
                    latitudeDelta: 0.0022,
                    longitudeDelta: 0.0025,
                  }}
                >
                  {foundPois.map((poi) => {
                    return (
                      <>
                        <MapView.Marker
                          key={poi.uid}
                          pinColor={"navy"}
                          coordinate={{
                            latitude: parseFloat(poi.lat),
                            longitude: parseFloat(poi.lng),
                          }}
                        >
                          <Callout onPress={() => calloutPressHandler(poi)}>
                            <Text>{poi.title}</Text>
                          </Callout>
                        </MapView.Marker>
                      </>
                    );
                  })}

                  <MapView.Marker
                    //pinColor={"navy"}
                    coordinate={{ latitude: currentLat, longitude: currentLng }}
                  />
                </MapView>
              )}
              <Portal>
                <Modal
                  //animationType="slide"
                  //transparent={true}
                  visible={modalVisible}
                  contentContainerStyle={containerStyle}
                  onDismiss={() => {
                    //Alert.alert("Modal has been closed.");
                    setModalVisible(false);
                  }}
                >
                  {activePoi && <MediaPlayer props={activePoi} />}
                </Modal>
              </Portal>
            </>
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

export default TourTakingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
});
