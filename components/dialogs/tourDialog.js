import React, { useEffect } from "react";
import { Button, Paragraph, Dialog, Portal } from "react-native-paper";
import { auth, db, storage } from "../../firebase";
import { set, ref } from "firebase/database";

const TourDialog = (props) => {
  const {
    uid,
    newUserTour,
    firstName,
    surname,
    tours,
    newUserWelcome,
    admin,
    email,
    tourGuide,
  } = props.props;
  const [visible, setVisible] = React.useState(true);

  useEffect(() => {
    if (newUserTour) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  const hideDialog = () => setVisible(false);

  const handleDontShow = () => {
    const userId = auth.currentUser.uid;

    const userRef = db.ref("users");
    userRef.once("value", (snap) => {
      const users = snap.val();
      if (users !== null) {
        Object.keys(users).forEach((uid) => {
          if (uid === userId) {
            set(ref(db, `/users/${userId}`), {
              uid: userId,
              newUserTour: false,
              newUserWelcome: newUserWelcome,
              firstName: firstName,
              surname: surname,
              tours: tours,
              admin: admin,
              email: email,
              tourGuide: tourGuide,
            });
            setVisible(false);
          } else {
            console.log("Could not edit");
          }
        });
      }
    });
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Taking a Tour</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            When taking a tour if you are near a destination marked by a yellow
            marker press "GET CURRENT LOCATION" to hear the audio.
          </Paragraph>
          <Paragraph>
            You can also press on the yellow destination marker to hear the
            audio.
          </Paragraph>
          <Paragraph>Your postion is represented by the red marker. </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
          <Button onPress={handleDontShow}>Don't Show Again</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default TourDialog;
