import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Button from "react-native-paper/src/components/Button";
import Modal from "react-native-paper/src/components/Modal";
import Portal from "react-native-paper/src/components/Portal/Portal";
import { db } from "../firebase";
import MediaPlayer from "./mediaPlayer";

export default function MapCard({ props, currentLat, currentLng }) {
  console.log(currentLat);

  //console.log("Current location is " + JSON.stringify(currentLocation));
  //console.log(props);
  const { uid, title, city, pois } = props;
  const [foundPois, setFoundPois] = useState([]);
  const [activePoi, setActivePoi] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [userMarkerVisible, setUserMarkerVisible] = useState(false);
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  //const currentLat = currentLocation.currentLatLng.lat;
  //const currentLng = currentLocation.currentLatLng.lng;
  /*
  this.state = { 
    mapRegion: {
      latitude: userLat,
      longitude: userLng,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0025,
    },
    markerCoordinate: {
      latitude: userLat,
      longitude: userLng,
     }
 }
 */

  useEffect(() => {
    setUserLat(currentLat);
    setUserLng(currentLng);
    console.log("Latitude read is: " + userLat);

    const getPois = async () => {
      const poiRef = db.ref("pois");
      poiRef.on("value", (snapshot) => {
        const poi = snapshot.val();
        const dbPois = [];
        const keys = Object.keys(pois);
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

  function calloutPressHandler(props) {
    setUserLat(currentLat);
    setUserLng(currentLng);
    setActivePoi(props);
    setModalVisible(true);

    /*
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <MediaPlayer props={props} />
      </Modal>
    );
    */
  }

  return (
    <>
      {foundPois[0] && (
        <MapView
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: parseFloat(userLat),
            longitude: parseFloat(userLng),
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
            key={userLat}
            //pinColor={"navy"}
            coordinate={{
              latitude: parseFloat(userLat),
              longitude: parseFloat(userLng),
            }}
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
  );
}

/*
          {currentLocation && (
            <MapView.Marker
              //key={poi.uid}
              //pinColor={"navy"}
              coordinate={{
                latitude: parseFloat(currentLat),
                longitude: parseFloat(currentLng),
              }}
            ></MapView.Marker>
          )}





*/

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
