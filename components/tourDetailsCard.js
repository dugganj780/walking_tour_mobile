import { StyleSheet, Text, View } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";
import Title from "react-native-paper/src/components/Typography/Title";
import Subheading from "react-native-paper/src/components/Typography/Subheading";
import Button from "react-native-paper/src/components/Button";
import React from "react";

const TourDetailsCard = (props) => {
  const { uid, title, owner, city, country, image } = props.props;

  return (
    <Card key={uid}>
      <Card.Cover height="33%" source={{ uri: image }} />
      <Card.Content>
        <Title>{title}</Title>
        <Subheading>
          <Text>City: {city}</Text>
        </Subheading>
        <Subheading>
          <Text>Country: {country}</Text>
        </Subheading>
        <Subheading>
          <Text>Tour Guide: {owner}</Text>
        </Subheading>
      </Card.Content>
      <Card.Actions>
        <Button>Add Destinations</Button>
        <Button>Delete</Button>
      </Card.Actions>
    </Card>
  );
};

export default TourDetailsCard;

const styles = StyleSheet.create({});
