import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState<any>({
    email: "",
    passwordk: "",
  });
  const [displayErrorMessage, setDisplayErrorMessage] =
    useState<boolean>(false);

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
      setDisplayErrorMessage(true);
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
    <div>
      <h1>This is the login component</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          value={loginInfo.email}
          placeholder="Email"
          onChange={handleLoginInfoChange}
        />
        <input
          type="password"
          id="password"
          value={loginInfo.password}
          placeholder="Enter anniversary date."
          onChange={handleLoginInfoChange}
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
