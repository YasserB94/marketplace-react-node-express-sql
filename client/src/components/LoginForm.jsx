import React from "react";
import axios from "axios";
import { useEffect } from "react";
const LoginForm = () => {
  const [submitButtonText, setSubmitButtonText] = React.useState("Login");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [serverResponse, setServerResponse] = React.useState("");
  const fetchData = async () => {
    const url = "http://localhost:3050/login";
    const { data } = await axios.post(url, {
      username: username,
      password: password,
    });
    console.table(data);
    setServerResponse(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    submitButtonText === "Login"
      ? setSubmitButtonText("Welcome")
      : setSubmitButtonText("Login");
    fetchData();
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">{submitButtonText}</button>
      </form>
      <div>
        <h2>Server says:</h2>
        <p>Message: {serverResponse.message}</p>
        <p>Received username: {serverResponse.usernameReceived}</p>
        <p>Receivded password: {serverResponse.passwordReceived}</p>
      </div>
    </>
  );
};
export default LoginForm;
