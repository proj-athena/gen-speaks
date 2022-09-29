import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { ref, get } from 'firebase/database';
import { db } from "../firebase";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const { user } = await login(emailRef.current.value, passwordRef.current.value);
      let roles = await get(ref(db, 'users/'+user.uid)).then(
        snapshot => snapshot.toJSON());
      if(!roles){
        setError("Oops! You'll need to sign up first...");
        return
      }
      roles = Object.values(roles.roles);
      if(roles.find(role => role === 5001))  
        navigate('/admin');
      else navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setError("Failed to login");
    }
    setLoading(false);
  }
  
  useEffect(() => {
    if(currentUser)
      navigate("/dashboard")
  }, [])
  
  return (
    <>
      <Card>
        <Card.Body>
          <img
            className="img-fluid rounded-pill center-block d-block mx-auto"
            src={`${process.env.PUBLIC_URL}/assets/images/logo.jpg`}
            alt="logo"
            width="100"
            height="100"
          />
          <h2 className="text-center mb-4">Log In</h2>
          {/* {currentuser && currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            &nbsp;
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Create an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
