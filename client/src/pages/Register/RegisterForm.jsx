// import React from 'react'

const RegisterForm = () => {
    return (
        <form id="register-form" className="form-style">
            <h1 className="form-heading headline-medium">Time Attendance Record System</h1>
            <h2 className="signup-text_fields-heading headline-small text_field-heading-partition">Create your account</h2>
            <div className="signup-text_fields-container text_field-container-input-styles">
                <input type="text" name="" id="" placeholder="USERNAME" />
                <input type="password" name="" id="" placeholder="PASSWORD" />
                <input type="password" name="" id="" placeholder="CONFIRM PASSWORD" />
                <input type="text" name="" id="" placeholder="NAME" />
                <input type="date" name="" id="" placeholder="mm/dd/yyyy" />
                <input type="text" name="" id="" placeholder="DEPARTMENT" />
                <input type="text" name="" id="" placeholder="PROJECT" />
            </div>
            <div className="registerBtn-container form-btn-container-partition">
                <button className="registerBtn headline-medium form-button-style">Create Account</button>
            </div>
            <div className="register-section formBtn-section-style">
                <p className="title-medium">Have an Account? <a href="" className="label-large">Sign In</a></p>
            </div>
        </form>
    )
}

export default RegisterForm