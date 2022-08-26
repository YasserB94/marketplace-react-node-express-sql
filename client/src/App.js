import React from "react";
import LoginForm from "./components/LoginForm";

function App() {
  const [backendMessage, setBackendMessage] = React.useState("No response");
  React.useEffect(() => {
    const callApi = async () => {
      const response = await fetch("http://localhost:3050/users");
      const data = await response.text();
      setBackendMessage(data);
    };
    callApi();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <LoginForm></LoginForm>
        <p> {backendMessage}</p>
      </header>
    </div>
  );
}

export default App;
