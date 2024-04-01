// import React from 'react'
import userPicture from "../../assets/img/user_picture.svg"
import TimeHistoryTable from "./TimeHistoryTable"

const UserDashboard = () => {
    return (
        <main id="user-dashboard" className="form-style">
            <div className="user-details">
                <h1 className="userId title-large">USERNAME: {"user_id"}</h1>
                <div className="user-info">
                    <img className="user-profile-picture" src={userPicture} alt="User's Profile Picture" />
                    <dl className="user-basic-info description-field-styles">
                        <div>
                            <dt>Name:</dt>
                            <dd>{"user's name"}</dd>
                        </div>

                        <div>
                            <dt>Birthdate:</dt>
                            <dd>{"mm/dd/yyy"}</dd>
                        </div>

                        <div>
                            <dt>Department:</dt>
                            <dd>{"text here"}</dd>
                        </div>
                        <div>
                            <dt>Project:</dt>
                            <dd>{"text here"}</dd>
                        </div>
                    </dl>
                </div>
                <h2 className="login-details description-field-style title-medium">LOGIN DETAILS: TIME IN/TIMEOUT</h2>
            </div>
            <div className="attendance-function-section">
                <div>
                    <h2 className="type-userId-label title-large">TYPE USERNAME:</h2>
                    <input type="text" name="" id="" />
                    <button className="login-logout-btn label-large">LOGIN/LOGOUT</button>
                </div>
            </div>
            <div className="time-history-section">
                <h1 className="time-history-heading title-large">TIME HISTORY</h1>
                <TimeHistoryTable />
            </div>
        </main>
    )
}

export default UserDashboard