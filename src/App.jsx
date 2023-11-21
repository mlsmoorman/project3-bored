import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage"
import userService from "./utils/userService"

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
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
    </Routes>
  );
}
