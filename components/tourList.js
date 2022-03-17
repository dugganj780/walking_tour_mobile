import React from "react";
import Tour from "./tourCard";
import Surface from "react-native-paper/src/components/Surface";

const TourList = ({ props, action }) => {
  let tourCards = props.map((m) => <Tour key={m.uid} tour={m} />);
  return tourCards;
};

export default TourList;
