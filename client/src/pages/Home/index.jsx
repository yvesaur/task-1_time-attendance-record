// import React from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import LoginForm from "./LoginForm";
import "./styles.css";

const Home = () => {
  const { isAuthenticated, currentUserInfo, isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    isAuth();
  })
  return (

    !isAuthenticated ? (
      <main id="login-page" className="page-style-gradient">
        <LoginForm />
      </main>
    ) : (
      navigate(`/user/${currentUserInfo.user_id}/profile`)
    )

  );
};

export default Home;
