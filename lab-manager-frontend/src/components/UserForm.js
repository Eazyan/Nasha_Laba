import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password_hash: password,  // Передаем захешированный пароль, если нужно
    };

    axios
      .post("http://127.0.0.1:8000/users/", newUser)
      .then((response) => {
        console.log("User created successfully:", response.data);
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit">Create User</button>
    </form>
  );
}

export default UserForm;
