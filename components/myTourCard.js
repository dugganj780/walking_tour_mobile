import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";
//import CardActions from "react-native-paper/src/components/Card/CardActions";
//import CardContent from "react-native-paper/src/components/Card/CardContent";
//import CardMedia from "react-native-paper/src/components/Card/Card";
import Button from "react-native-paper/src/components/Button";
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { set, ref } from "firebase/database";
import Title from "react-native-paper/src/components/Typography/Title";
import Subheading from "react-native-paper/src/components/Typography/Subheading";
//import Image from "../../public/images/home_image";

export default function MyTourCard(props) {
  const { uid, title, owner, city, country, image, poi } = props.tour;
  const navigate = useNavigation();
  const styles = StyleSheet.create({
    card: {
      margin: 3,
    },
  });
  //const { tourId } = useParams();
  //const [activeTour, setActiveTour] = useState(null);
  //const pois = [];

  /*
  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          // The ID is the key
          console.log(uid);
          // The Object is foo[key]
          console.log(tours[uid]);
          setActiveTour(tours[uid]);
        });
      }
    });
  }, []);
  /*
  function PoiButtons(props) {
    return (
      <>
        {activeTour && (
          <Button onPress={() => handleAddPoi()}>Add to Tour</Button>
        )}
        <Button onPress={() => handlePoiDetailsClick()}>View Details</Button>
      </>
    );
  }
  

  function TourButtons(props) {
    return (
      <>
        <Button onPress={() => handleTourDetailsClick()}>View Tour</Button>
      </>
    );
  }

  function UsableButtons(props) {
    if (poi) {
      return <PoiButtons />;
    } else {
      return <TourButtons />;
    }
  }
  */

  async function handleTourUsageClick() {
    navigate.navigate("Tour Taking", { uid });
  }

  async function handlePoiDetailsClick(props) {
    //navigate(`/poi/${uid}`);
  }

  /*
  function handleAddPoi(props) {
    const poiUid = uid;
    console.log(poiUid);

    const tourRef = db.ref("tours");
    tourRef.once("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(tours[uid]);
            //const tourPoiRef = db.ref(`tours/${uid}/pois`);
            set(ref(db, `tours/${uid}/pois/${poiUid}`), { poiUid });
          }
        });
      }
    });
  }

  
  async function handleUpdatePois() {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(tours[uid]);
            set(ref(db, `/tours/${uid}`), {
              uid: activeTour.uid,
              title: activeTour.title,
              city: activeTour.city,
              country: activeTour.country,
              owner: activeTour.owner,
              image: activeTour.image,
              pois: pois,
            });
          }
        });
      }
    });
    //navigate("/tourlist");
  }
  */

  return (
    <Card
      key={uid}
      sx={{ maxWidth: 345 }}
      mode={"outlined"}
      style={styles.card}
    >
      <Card.Cover height="140" source={{ uri: image }} alt="tour image" />
      <Card.Content>
        <Title>{title}</Title>
        <Subheading>
          Location: {city}, {country}
        </Subheading>
        <Subheading>Tour Guide: {owner}</Subheading>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => handleTourUsageClick()}>Take Tour</Button>
      </Card.Actions>
    </Card>
  );
}
