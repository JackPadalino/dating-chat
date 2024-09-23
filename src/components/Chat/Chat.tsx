import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import "./chat.css";

const Chat = () => {
  const [user, setUser] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null); // Create a ref for scrolling

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.currentTarget.value);
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "") return;
    try {
      await addDoc(collection(db, "messages"), {
        createdAt: serverTimestamp(),
        userId: user.uid,
        content: message,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setMessage("");
  };

  // use effect to check if user is signed in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // use effect to get real time messages from firestore
  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const queryMessages = query(messagesRef, orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessages, (querySnapshot) => {
      const allMessages: any = [];
      querySnapshot.forEach((doc) => {
        allMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(allMessages);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <p>Please sign in to join chat!</p>;
  return (
    <div className="chatContainer">
      <div className="messagesContainer">
        {messages.map((message: any, index: number) => (
          <p
            className={
              message.userId === user.uid
                ? "message myMessages"
                : "message theirMessages"
            }
            ref={index === messages.length - 1 ? messagesEndRef : null}
          >
            {message.content}
          </p>
        ))}
        <div />
      </div>
      <form onSubmit={handleSendMessage} className="inputContainer">
        <input
          id="message"
          value={message}
          onChange={handleMessageChange}
          placeholder="Get to know eachother!"
          className="messageInput"
        />
        <button type="submit" className="sendBtn">
          <i className="material-icons">send</i>
        </button>
      </form>
    </div>
  );
};

export default Chat;
