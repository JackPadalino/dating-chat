import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  // signOut
} from "firebase/auth";
import { auth } from "../../../firebase";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<any>({
    email: "",
    passwordk: "",
  });

  const handleLoginInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginInfo({
      ...loginInfo,
      [id]: value,
    });
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginInfo.email,
        loginInfo.password
      );
      navigate("/chat");
    } catch (error: any) {
      // The 'any' type here captures any kind of error thrown
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error signing in (${errorCode}): ${errorMessage}`);
      setLoginInfo({ email: "", password: "" });
    }
  };

  // useEffect(() => {
  //   signOut(auth)
  //     .then(() => {
  //       console.log("User signed out.");
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="loginContainer">
      <h1>Hinge</h1>
      <form onSubmit={handleLogin} className="loginForm">
        <input
          type="email"
          id="email"
          value={loginInfo.email}
          placeholder="Email"
          onChange={handleLoginInfoChange}
          className="loginInput"
        />
        <input
          type="password"
          id="password"
          value={loginInfo.password}
          placeholder="Enter anniversary date DD.MM.YYYY"
          onChange={handleLoginInfoChange}
          className="loginInput"
        />
        <button type="submit" className="loginBtn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
