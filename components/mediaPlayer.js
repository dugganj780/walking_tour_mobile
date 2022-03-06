import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";
import Button from "react-native-paper/src/components/Button";
import { Audio } from "expo-av";

const MediaPlayer = (props) => {
  const { title, city, recording, image, owner } = props.props;
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    setIsPlaying(true);
    const { sound } = await Audio.Sound.createAsync({ uri: recording });
    setSound(sound);

    await sound.playAsync();
  };

  const pauseAudio = async () => {
    setIsPlaying(false);
    await sound.pauseAsync();
  };

  const audioFunction = () => {
    if (!isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  function PlayPauseButton(props) {
    if (!isPlaying) {
      return (
        <Button
          icon="play"
          mode="contained"
          onPress={audioFunction}
          color="teal"
        />
      );
    } else {
      return <Button icon="pause" mode="contained" onPress={audioFunction} />;
    }
  }

  return (
    <View>
      <Card sx={{ display: "flex" }}>
        <Card.Cover source={{ uri: image }} />
        <Card.Title title={title} subtitle={"Tour Guide: " + owner} />
        <Card.Content>
          <PlayPauseButton />
        </Card.Content>
      </Card>
    </View>
  );
};

export default MediaPlayer;

const styles = StyleSheet.create({});
