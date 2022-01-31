import React, { useState, useEffect } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { db } from "../firebase";
import MediaPlayer from "./mediaPlayer";

export default function MapCard(props) {
  const { uid, title, city, pois } = props.props;
  const [foundPois, setFoundPois] = useState([]);
  console.log(props);

  useEffect(() => {
    const getPois = async () => {
      const poiRef = db.ref("pois");
      poiRef.on("value", (snapshot) => {
        const poi = snapshot.val();
        const dbPois = [];
        console.log(pois);
        const keys = Object.keys(pois);
        console.log(keys);
        for (let id in poi) {
          keys.forEach((key, index) => {
            if (key === id) {
              console.log(key);
              dbPois.push(poi[id]);
              console.log(dbPois);
            }
          });
        }
        console.log(dbPois);
        setFoundPois(dbPois);
        //console.log(foundPois[0].lat);
      });
    };
    getPois();
  }, []);

  return (
    <View style={styles.container}>
      {foundPois[0] && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: parseFloat(foundPois[0].lat),
            longitude: parseFloat(foundPois[0].lng),
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(foundPois[0].lat),
              longitude: parseFloat(foundPois[0].lng),
            }}
          >
            <Callout>
              {/*<MediaPlayer props={foundPois[0]} />*/}
              <Text>{foundPois[0].title}</Text>
            </Callout>
          </Marker>
        </MapView>
      )}
    </View>
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
    height: Dimensions.get("window").height,
  },
});
