import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, View, Dimensions } from "react-native";
import Button from "react-native-paper/src/components/Button";
import Modal from "react-native-paper/src/components/Modal";
import Portal from "react-native-paper/src/components/Portal/Portal";
import { auth, db } from "../firebase";
import MediaPlayer from "../components/mediaPlayer";
import Surface from "react-native-paper/src/components/Surface";
import * as Location from "expo-location";
import { Title, Subheading, Text } from "react-native-paper";
import TourDialog from "../components/dialogs/tourDialog";

const TourTakingScreen = ({ route, navigation }) => {
  const [location, setLocation] = useState(null);
  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [foundPois, setFoundPois] = useState([]);
  const [activePoi, setActivePoi] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tour, setTour] = useState(null);
  const [user, setUser] = useState(null);
  const { uid } = route.params;
  const tourId = uid;
  const containerStyle = { padding: 20 };

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

  useEffect(() => {
    const currentUserUid = auth.currentUser.uid;
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
    let location = await Location.getCurrentPositionAsync({});
    let lat = location.coords.latitude;
    let lng = location.coords.longitude;
    setCurrentLat(lat);
    setCurrentLng(lng);

    for (let i in foundPois) {
      if (
        lat <= parseFloat(foundPois[i].lat) + 0.0002 &&
        lat >= parseFloat(foundPois[i].lat) - 0.0002 &&
        lng <= parseFloat(foundPois[i].lng) + 0.0002 &&
        lng >= parseFloat(foundPois[i].lng) - 0.0002
      ) {
        calloutPressHandler(foundPois[i]);
      }
    }
  }

  function calloutPressHandler(props) {
    setActivePoi(props);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <>
        {tour && (
          <>
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
                      <MapView.Marker
                        key={poi.uid}
                        pinColor={"wheat"}
                        coordinate={{
                          latitude: parseFloat(poi.lat),
                          longitude: parseFloat(poi.lng),
                        }}
                      >
                        <Callout onPress={() => calloutPressHandler(poi)}>
                          <Text>{poi.title}</Text>
                          <Text>Press to Hear</Text>
                        </Callout>
                      </MapView.Marker>
                    );
                  })}

                  <MapView.Marker
                    coordinate={{
                      latitude: currentLat,
                      longitude: currentLng,
                    }}
                  />
                </MapView>
              )}
              <Portal>
                <Modal
                  visible={modalVisible}
                  contentContainerStyle={containerStyle}
                  onDismiss={() => {
                    setModalVisible(false);
                  }}
                >
                  {activePoi && <MediaPlayer props={activePoi} />}
                </Modal>
              </Portal>
            </>
            <Surface style={styles.surface}>
              <Title>Tour</Title>
              <Subheading>{tour.title}</Subheading>
              <Title>City</Title>
              <Subheading>{tour.city}</Subheading>

              <Title>Country</Title>
              <Subheading>{tour.country}</Subheading>

              <Title>Tour Guide</Title>
              <Subheading>{tour.owner}</Subheading>
              <Button mode="contained" onPress={getLocation}>
                Get Current Location
              </Button>
            </Surface>
          </>
        )}
      </>
      {user && <TourDialog props={user} />}
    </View>
  );
};

export default TourTakingScreen;

const styles = StyleSheet.create({
  map: {
    padding: 0,
    margin: 0,
    width: "100%",
    height: Dimensions.get("window").height / 2,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  surface: {
    margin: 3,
    padding: 3,
  },
});
