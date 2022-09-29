import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ref, set } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const signed = await signup(emailRef.current.value, passwordRef.current.value);
      const uid = signed.user.uid;
      set(ref(db, 'users/'+uid), {
        email: emailRef.current.value,
        roles: [3000]
      })
      navigate("/login");
    } catch(err) {
      console.log(err);
      setError("Failed to create an account");
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
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            &nbsp;
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </>
  );
}
