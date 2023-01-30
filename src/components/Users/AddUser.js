import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
  const [error, setError] = useState();
  const ageRef = useRef();
  const usernameRef = useRef();

  const addUserHandler = (event) => {
    event.preventDefault();
    const ageUserRef = ageRef.current.value;
    const usernameUserRef = usernameRef.current.value;
    if (usernameUserRef.trim().length === 0 || ageUserRef.trim().length === 0) {
      setError({
        title: "Invalid Input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+ageUserRef < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (>0).",
      });
      return;
    }

    const user = {
      username: usernameUserRef,
      age: ageUserRef,
      id: Math.random(),
    };
    props.onAddUser(user);
    ageRef.current.value = "";
    usernameRef.current.value = "";
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
          <input id="username" type="text" ref={usernameRef}></input>
          <label htmlFor="age">Age (years)</label>
          <input id="age" type="number" ref={ageRef}></input>
          <Button type="submit">Submit</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
