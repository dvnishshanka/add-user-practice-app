import AddUser from "./components/Users/AddUser";
import "./App.css";
import UsersList from "./components/Users/UsersList";
import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const onAddUserHandler = (user) => {
    setUsers((prevState) => [user, ...prevState]);
  };

  return (
    <div className="App">
      <AddUser onAddUser={onAddUserHandler} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
