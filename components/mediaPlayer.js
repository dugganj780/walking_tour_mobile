import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";
import Button from "react-native-paper/src/components/Button";
import { Audio } from "expo-av";

const MediaPlayer = (props) => {
  const { title, city, recording, image, owner } = props.props;
  const [sound, setSound] = useState();
  const [status, setStatus] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    async function getSound() {
      const { sound } = await Audio.Sound.createAsync({ uri: recording });
      setSound(sound);
    }
    getSound();
  }, []);

  const playAudio = async () => {
    setIsPlaying(true);
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
          style={styles.button}
        />
      );
    } else {
      return (
        <Button
          icon="pause"
          mode="contained"
          onPress={audioFunction}
          color="#F7C548"
          style={styles.button}
        />
      );
    }
  }

  async function skipForward() {
    await sound.getStatusAsync().then(function (result) {
      const status = result.positionMillis;
      sound.setPositionAsync(status + 10000);
    });
  }

  async function skipBack() {
    await sound.getStatusAsync().then(function (result) {
      const status = result.positionMillis;
      sound.setPositionAsync(status - 10000);
    });
  }

  return (
    <View>
      <Card sx={{ display: "flex" }}>
        <Card.Cover source={{ uri: image }} />
        <Card.Title title={title} subtitle={"Tour Guide: " + owner} />
        <Card.Content style={styles.cardContent}>
          <Button
            icon="rewind"
            mode="contained"
            onPress={skipBack}
            style={styles.button}
          />

          <PlayPauseButton style={styles.button} />
          <Button
            icon="fast-forward"
            mode="contained"
            onPress={skipForward}
            style={styles.button}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default MediaPlayer;

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: "row",
    padding: 2,
    margin: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "30%",
    margin: 2,
  },
});
