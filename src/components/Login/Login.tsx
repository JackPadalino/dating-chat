import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<boolean>(false);

  const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
    setDisplayErrorMessage(false);
    setPassword(e.currentTarget.value);
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_CHAT_PASSWORD) {
      navigate("/chat");
    } else {
      setPassword("");
      setDisplayErrorMessage(true);
    }
  };

  return (
    <div>
      <h1>This is the login component</h1>
      <form onSubmit={handleLogin}>
        <input
          value={password}
          placeholder="Enter anniversary date."
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
      {displayErrorMessage && (
        <p>Psst...Enter your annivseary date in the form DD.MM.YYYY</p>
      )}
    </div>
  );
};

export default Login;
