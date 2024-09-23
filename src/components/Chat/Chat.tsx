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
        user: user.uid === "uMkjvKnUIsXJrudILZJAm88YNXD2" ? "Jack" : "Jasmine",
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
    <div>
      <div className="messagesContainer">
        {messages.map((message: any) => (
          <p key={message.id}>{message.content}</p>
        ))}
        <div ref={messagesEndRef} />
      </div>
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
