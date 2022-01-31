import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { db } from "../firebase";
import WebViewLeaflet from "react-native-webview-leaflet";

const MapLeaflet = (props) => {
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
    <View>
      {foundPois[0] && (
        <WebViewLeaflet
          ref={(component) => (this.webViewLeaflet = component)}
          mapCentrePosition={{
            lat: parseFloat(foundPois[0].lat),
            lng: parseFloat(foundPois[0].lng),
          }}
        />
      )}
    </View>
  );
};

export default MapLeaflet;

const styles = StyleSheet.create({});
