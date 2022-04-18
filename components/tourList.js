import React from "react";
import Tour from "./tourCard";
import MyTour from "./myTourCard";

const TourList = ({ props, myTours }) => {
  if (!myTours) {
    let tourCards = props.map((m) => <Tour key={m.uid} tour={m} />);
    return tourCards;
  } else {
    let tourCards = props.map((m) => <MyTour key={m.uid} tour={m} />);
    return tourCards;
  }
};

export default TourList;
