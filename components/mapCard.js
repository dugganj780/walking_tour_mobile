import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Modal from "react-native-paper/src/components/Modal";
import Portal from "react-native-paper/src/components/Portal/Portal";
import { db } from "../firebase";
import MediaPlayer from "./mediaPlayer";

export default function MapCard({ props, currentLat, currentLng }) {
  const { uid, title, city, pois } = props;
  const [foundPois, setFoundPois] = useState([]);
  const [activePoi, setActivePoi] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };
  const [userMarkerVisible, setUserMarkerVisible] = useState(false);
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  useEffect(() => {
    setUserLat(currentLat);
    setUserLng(currentLng);

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
    setActivePoi(props);
    setModalVisible(true);
  }

  return (
    <>
      {foundPois[0] && (
        <MapView
          style={styles.map}
          loadingEnabled={true}
          initialRegion={{
            latitude: userLat,
            longitude: userLng,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0025,
          }}
          region={{
            latitude: userLat,
            longitude: userLng,
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
          {userMarkerVisible && (
            <MapView.Marker
              coordinate={{ latitude: userLat, longitude: userLng }}
            />
          )}
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
  );
}

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
