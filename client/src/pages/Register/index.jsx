// import React from 'react'
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import RegisterForm from "./RegisterForm";
import "./styles.css";

const Register = () => {
    const { isAuthenticated, currentUserInfo, isAuth } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        isAuth();
    })
    return (
        !isAuthenticated ? (
            <main id="register-page" className="page-style-gradient">
                <RegisterForm />
            </main>
        ) : (
            navigate(`/user/${currentUserInfo.user_id}/profile`)
        )

    )
}

export default Register