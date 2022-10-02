import React from "react";
import '../App.css';

import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import PrivateRoute from "../router/PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Unauthorized from './Unauthorized';

import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Admin from "./Admin";


function App() {
  return (
    <Container
      className="d-flex"
      style={{ minHeight: "100vh", minWidth: "100vw", alignItems: "flex-start", justifyContent: "space-between" }}
    >
      <div className="w-100" style={{display: "flex", flexDirection: "column",  alignItems: "center"}}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route element={<Layout><Outlet /></Layout>}>
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                ></Route>
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute allowedRoles={[3000, 5001]}>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              ></Route>
              <Route
                path="/admin"
                element={
                  <PrivateRoute allowedRoles={[5001]}>
                    <Admin />
                  </PrivateRoute>
                }
              ></Route>
              <Route path="/forgot-password" element={<ForgotPassword />} />
              </Route>
              <Route path="/*" element={<Unauthorized />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
