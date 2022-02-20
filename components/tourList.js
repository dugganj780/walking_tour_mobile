import React from "react";
import Tour from "./tourCard";
import Surface from "react-native-paper/src/components/Surface";

const TourList = ({ props, action }) => {
  let tourCards = props.map((m) => (
    <Surface key={m.uid} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Tour key={m.uid} tour={m} action={action} />
    </Surface>
  ));
  return tourCards;
};

export default TourList;
