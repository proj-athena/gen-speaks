// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";

// export default function PrivateRoute({ component: Component, ...rest }) {
//   const { currentUser } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         return currentUser ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/login" />
//         );
//       }}
//     ></Route>
//   );
// }
// import { get, ref } from "firebase/database";
// import { db } from "../firebase";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";



// const getRoles = async (user) => {
//   let roles = (await get(ref(db, 'users/'+user.uid)).then(
//     snapshot => snapshot.toJSON()));
//   roles = roles.roles;
//   return Object.values(roles);
// }

export default function PrivateRoute({ children, allowedRoles }) {
  let { currentUser, roles } = useAuth();
  if(!allowedRoles)
    return currentUser? children : <Navigate to="/login" />
  const loc = useLocation();
  return currentUser && roles && roles.find(role => allowedRoles.includes(role)) ? children : 
  // currentUser? <Unauthorized /> : 
  <Navigate to="/login" replace state={{from: loc}} />;
}
