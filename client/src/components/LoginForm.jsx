import React from "react";
import axios from "axios";
const LoginForm = () => {
  const [submitButtonText, setSubmitButtonText] = React.useState("Login");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [serverResponse, setServerResponse] = React.useState("");
  const fetchData = async () => {
    const baseurl = "http://localhost:3050"; //TODO:: STORE GLOBALLY
    const response = await axios.post(
      baseurl + "/login", //Route Endpoint
      {
        //Request body?
        username: username,
        password: password,
      },
      {
        //Axios Options
        withCredentials: true,
      }
    );
    const { data } = response;
    setServerResponse(data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitButtonText === "Login"
      ? setSubmitButtonText("Welcome")
      : setSubmitButtonText("Login");
    if (username === "Fill this in!") return;
    fetchData().catch((err) => {
      setUsername("Fill this in!");

      console.log("Logged at LoginForm.jsx");
      console.error(err.message);
      console.table(err);
      if (err.response.status) {
        console.warn("Found Info!");
        console.table({
          response: err.response,
        });
      }
    });
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
      {serverResponse.timesvisited && (
        <h2>You have visited {serverResponse.timesvisited} times!</h2>
      )}
      {serverResponse && (
        <div>
          <h2>Server says:</h2>
          <p>Message: {serverResponse.message}</p>
          <p>Received username: {serverResponse.usernameReceived}</p>
          <p>Receivded password: {serverResponse.passwordReceived}</p>
        </div>
      )}
    </>
  );
};
export default LoginForm;
