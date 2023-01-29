import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (username.trim().length === 0 || age.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+age < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }

    const user = {
      username: username,
      age: age,
      id: Math.random(),
    };
    props.onAddUser(user);
    setAge("");
    setUsername("");
  };

  const closeModalHandler = () => {
    setError("");
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClick={closeModalHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={usernameChangeHandler}
          ></input>
          <label htmlFor="age">Age (years)</label>
          <input
            id="age"
            type="number"
            onChange={ageChangeHandler}
            value={age}
          ></input>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
