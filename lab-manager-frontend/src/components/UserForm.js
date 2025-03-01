import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      password,
    };

    axios
      .post("http://127.0.0.1:8000/users/", newUser)
      .then((response) => {
        alert("User added successfully!");
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm;
