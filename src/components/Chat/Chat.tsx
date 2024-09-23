import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

const Chat = () => {
  const [user, setUser] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
    console.log(e.currentTarget.value);
  };

  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);
    setMessage("");
  };

  useEffect(() => {
    const unsubmit = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
    return () => unsubmit();
  }, []);

  if (!user) return <p>Please sign in to join chat!</p>;
  return (
    <div>
      <form onSubmit={handleSendMessage}>
        <input
          id="message"
          value={message}
          onChange={handleMessageChange}
          placeholder="Say something nice..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
