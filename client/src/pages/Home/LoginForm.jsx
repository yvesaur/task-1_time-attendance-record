// import React from 'react'
import "./styles.css"

const LoginForm = () => {
    return (
        <form id="login-form">
            <h1 className="login-heading headline-medium">Time Attendance Record System</h1>
            <h2 className="text-fields-heading headline.small">Sign in to your account</h2>
            <div className="login-text_fields-container">
                <input type="text" name="" id="" placeholder="Username" />
                <input type="text" name="" id="" placeholder="Password" />
            </div>
            <div className="continue_button-container">
                <button className="continue-button headline-medium" type="submit">Continue</button>
            </div>
            <div className="signup-section">
                <p className="title-medium">Don&apos;t Have an Account? <a href="" className="label-large">click here</a></p>
            </div>
        </form>
    )
}

export default LoginForm