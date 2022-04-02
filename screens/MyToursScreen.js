import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import TourList from "../components/tourList";
import { auth, db } from "../firebase";
import WelcomeDialog from "../components/dialogs/welcomeDialog";
import Appbar from "../components/appBar";

const MyToursScreen = (props) => {
  const [tours, setTours] = useState([]);
  const currentUserUid = auth.currentUser.uid;
  const [user, setUser] = useState(null);
  const myTours = true;

  useEffect(() => {
    let foundUser = null;
    const userRef = db.ref("users");
    userRef.on("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === currentUserUid) {
            // The ID is the key
            console.log(uid);
            // The Object is foo[key]
            console.log(users[uid]);
            setUser(users[uid]);
            foundUser = users[uid];

            const tourRef = db.ref("tours");
            tourRef.on("value", (snapshot) => {
              const tour = snapshot.val();
              const tours = [];
              for (let id in tour) {
                console.log("Id: " + id);
                for (let tourId in foundUser.tours) {
                  console.log("TourID: " + tourId);
                  if (id === tourId) {
                    tours.push(tour[id]);
                  }
                }
              }
              setTours(tours);
            });
          }
        });
      }
    });
  }, []);

  return (
    <ScrollView style={styles.page}>
      {/*<Appbar props="All Tours" />*/}
      <TourList props={tours} myTours />
      {user && <WelcomeDialog props={user} />}
    </ScrollView>
  );
};

export default MyToursScreen;

const styles = StyleSheet.create({
  page: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    //backgroundColor: "#D3D0CB",
  },
});
