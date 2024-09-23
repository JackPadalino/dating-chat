import { Routes, Route } from "react-router-dom";
import { Login, Chat } from "../index";
import "./app.css";

const App = () => {
  return (
    <div className="appContainer">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
