import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage"
import userService from "./utils/userService"

import Layout from "./pages/Layout/Layout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ActivitiesPage from "./pages/ActivitiesPage/ActivitesPage";

export default function App() {
  
  const [user, setUser] = useState(userService.getUser());
  
  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function logout(){
    console.log("logging out user")
    userService.logout();
    setUser(null);
  }
  
  if (!user) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Layout loggedUser={user} handleLogout={logout} />}
      >
        {/* <Route index element={<ActivitiesPage loggedUser={user} />} /> */}

        <Route 
          path="/random"
          element={<ActivitiesPage />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      </Route>
    </Routes>
  );
}
