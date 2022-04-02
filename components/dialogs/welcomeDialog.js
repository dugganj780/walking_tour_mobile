import React, { useEffect } from "react";
import { View } from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { useAuth } from "../../contexts/AuthContext";
import { auth, db, storage } from "../../firebase";
import { set, ref } from "firebase/database";

const WelcomeDialog = (props) => {
  const { uid, newUser, firstName, surname, tours } = props.props;
  const [visible, setVisible] = React.useState(true);
  //console.log("new user status " + JSON.stringify(props));

  useEffect(() => {
    if (newUser) {
      console.log("sratus is " + newUser);
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
            // The ID is the key
            // The Object is foo[key]
            console.log(users[uid]);
            //const tourPoiRef = db.ref(`tours/${uid}/pois`);
            set(ref(db, `/users/${userId}`), {
              uid: userId,
              newUser: false,
              firstName: firstName,
              surname: surname,
              tours: tours,
            });
            setVisible(false);
            //navigate("/tourlist");
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
        <Dialog.Title>Welcome to Tour Pal!</Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            You can browse all tours on the All Tours screen. In order to take a
            tour you will need to assign it to your account.
          </Paragraph>
          <Paragraph>
            Once a tour is assigned to your account, you can take it by going to
            My Tours and the clicking Take Tour.
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Done</Button>
          <Button onPress={handleDontShow}>Don't Show Again</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default WelcomeDialog;
