import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Card from "react-native-paper/src/components/Card/Card";
import Button from "react-native-paper/src/components/Button";
import Title from "react-native-paper/src/components/Typography/Title";

const MediaPlayer = (props) => {
  const { title, city, recording } = props.props;
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useRef();

  const playAudio = () => {
    const audio = player.current;
    setIsPlaying(true);
    audio.volume = 1;
    audio.play();
  };

  const pauseAudio = () => {
    const audio = player.current;
    setIsPlaying(false);
    audio.pause();
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
      return <Button icon="play" onPress={audioFunction} />;
    } else {
      return <Button icon="pause" onPress={audioFunction} />;
    }
  }

  return (
    <View>
      <Card sx={{ display: "flex" }}>
        <Card.Content>
          <Title>{title}</Title>
        </Card.Content>
        <Card.Content>
          <PlayPauseButton />
          <audio src={recording} ref={player}></audio>
        </Card.Content>
      </Card>
    </View>
  );
};

export default MediaPlayer;

const styles = StyleSheet.create({});
