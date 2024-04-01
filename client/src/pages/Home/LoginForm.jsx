// import React from 'react'
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Fetch from '../../api/Fetch';
import { AppContext } from '../../context/AppContext';
import "./styles.css";

const LoginForm = () => {
    const { notifySuccess, notifyError, setAuth, setCurrentUserInfo, currentUserInfo } = useContext(AppContext);
    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })
    const { username, password } = inputs
    const navigate = useNavigate();

    const onChangeInputs = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {
            const body = { username, password };

            const response = await Fetch.post("/auth/account/login", body, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.data.data.token) {
                localStorage.setItem("token", response.data.data.token);

                const userInfoResponse = await Fetch.get(`/auth/user/${username}`, {
                    headers: {
                        token: response.data.data.token
                    }
                })
                setCurrentUserInfo(userInfoResponse.data.data)

                notifySuccess(response.data.message);
                setAuth(true);
                navigate(`/user/${userInfoResponse.data.data.user_id}/profile`);
            }

        } catch (error) {
            const body = { username, password };
            const response = await Fetch.post("/auth/account/login", body, {
                headers: { "Content-Type": "application/json" }
            })
            notifyError(response.data)
        }
    }

    return (
        <form id="login-form" className="form-style" onSubmit={onSubmitForm}>
            <h1 className="form-heading headline-medium">Time Attendance Record System</h1>
            <h2 className="text-fields-heading text_field-heading-partition headline-small">Sign in to your account</h2>
            <div className="login-text_fields-container text_field-container-input-styles">
                <input type="text" name="username" id="" placeholder="Username" required value={username} onChange={(e) => onChangeInputs(e)} />
                <input type="password" name="password" id="" placeholder="Password" required value={password} onChange={(e) => onChangeInputs(e)} />
            </div>
            <div className="continue_button-container form-btn-container-partition">
                <button className="continue-button headline-medium form-button-style" type="submit">Continue</button>
            </div>
            <div className="signup-section formBtn-section-style">
                <p className="title-medium">Don&apos;t Have an Account? <a onClick={() => navigate("/account/register")} className="label-large">click here</a></p>
            </div>
        </form>
    )
}

export default LoginForm