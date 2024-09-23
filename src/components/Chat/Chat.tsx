import React, { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

const Chat = () => {
  const [user, setUser] = useState<boolean>(false);

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(true);
    } else {
      setUser(false);
    }
  });

  if (!user) return <p>Please sign in to join chat!</p>;
  return (
    <div>
      <h1>This is the chat room component</h1>
    </div>
  );
};

export default Chat;
