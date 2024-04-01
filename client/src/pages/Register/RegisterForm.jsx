// import React from 'react'

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Fetch from "../../api/Fetch";
import { AppContext } from "../../context/AppContext";

const RegisterForm = () => {
    const { notifySuccess, notifyError, setAuth } = useContext(AppContext);
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        birthdate: "",
        department: "",
        project: "",
    })
    const { username, password, first_name, last_name, birthdate, department, project } = inputs

    const onChangeInputs = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const birthdateCompare = new Date(e.target.date.value);

        // Check if passwords match
        if (password !== confirmPassword) {
            notifyError('Passwords do not match');
            return;
        }
        // Check if user is under 18
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
        if (birthdateCompare > eighteenYearsAgo) {
            notifyError('You must be 18 years old or above');
            return;
        }

        try {
            const isUsernameExists = await Fetch.get(`/auth/checkUserExists/${username}`)

            console.log(isUsernameExists)
            if (isUsernameExists.data) {
                notifyError("Username already exists, try another one.")
            }

            const date = new Date('2002-06-10T00:00:00.000Z');
            const year = date.getUTCFullYear();
            const month = date.getUTCMonth() + 1; // Months are 0-indexed in JavaScript
            const day = date.getUTCDate();

            const formattedBirthdate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
            console.log(formattedBirthdate)

            const body = { username, password, first_name, last_name, birthdate, department, project };

            const response = await Fetch.post("/auth/account/register", body, {
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.data.data.token) {
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("username", username);
                setAuth(true);

                const userInfoResponse = await Fetch.get(`/auth/user/${localStorage.username}`, {
                    headers: {
                        token: localStorage.token
                    }
                });

                notifySuccess(response.data.message);
                navigate(`/user/${userInfoResponse.data.data.user_id}/profile`)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <form id="register-form" className="form-style" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="form-heading headline-medium">Time Attendance Record System</h1>
            <h2 className="signup-text_fields-heading headline-small text_field-heading-partition">Create your account</h2>
            <div className="signup-text_fields-container text_field-container-input-styles">
                <input type="text" name="username" id="username" placeholder="USERNAME" value={username} onChange={onChangeInputs} required />
                <div className="name-field text_field-container-input-styles">
                    <input type="text" name="first_name" id="firstName" placeholder="FIRST NAME" value={first_name} onChange={onChangeInputs} required />
                    <input type="text" name="last_name" id="lastName" placeholder="LAST NAME" value={last_name} onChange={onChangeInputs} required />
                </div>
                <input type="password" name="password" id="password" placeholder="PASSWORD" value={password} onChange={onChangeInputs} required />
                <input type="password" name="confirmPassword" id="confirmPassword" placeholder="CONFIRM PASSWORD" required />
                <input type="date" name="birthdate" id="date" placeholder="mm/dd/yyyy" value={birthdate} onChange={onChangeInputs} required />
                <input type="text" name="department" id="department" placeholder="DEPARTMENT" value={department} onChange={onChangeInputs} required />
                <input type="text" name="project" id="project" placeholder="PROJECT" value={project} onChange={onChangeInputs} required />
            </div>
            <div className="registerBtn-container form-btn-container-partition">
                <button type="submit" className="registerBtn headline-medium form-button-style">Create Account</button>
            </div>
            <div className="register-section formBtn-section-style">
                <p className="title-medium">Have an Account? <a href="" onClick={() => navigate("/")} className="label-large">Sign In</a></p>
            </div>
        </form>
    )
}

export default RegisterForm