import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div>
      <h1>Welcome to GenSpeaks</h1>
      <p>This is the home page</p>
      <Link to="/signup">Signup</Link>
      <br />
      <Link to="/login">Login</Link>
      <br />
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
}
