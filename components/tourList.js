import React from "react";
import Tour from "./tourCard";
import MyTour from "./myTourCard";
import Surface from "react-native-paper/src/components/Surface";

const TourList = ({ props, myTours }) => {
  if (!myTours) {
    console.log(myTours);
    let tourCards = props.map((m) => <Tour key={m.uid} tour={m} />);
    return tourCards;
  } else {
    console.log(myTours);
    let tourCards = props.map((m) => <MyTour key={m.uid} tour={m} />);
    return tourCards;
  }
};

export default TourList;
