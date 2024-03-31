// import React from 'react'
import "./styles.css"

const LoginForm = () => {
    return (
        <form id="login-form" className="form-style">
            <h1 className="form-heading headline-medium">Time Attendance Record System</h1>
            <h2 className="text-fields-heading text_field-heading-partition headline-small">Sign in to your account</h2>
            <div className="login-text_fields-container text_field-container-input-styles">
                <input type="text" name="" id="" placeholder="Username" />
                <input type="password" name="" id="" placeholder="Password" />
            </div>
            <div className="continue_button-container form-btn-container-partition">
                <button className="continue-button headline-medium form-button-style" type="submit">Continue</button>
            </div>
            <div className="signup-section formBtn-section-style">
                <p className="title-medium">Don&apos;t Have an Account? <a href="" className="label-large">click here</a></p>
            </div>
        </form>
    )
}

export default LoginForm