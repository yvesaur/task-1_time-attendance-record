// import React from 'react'
import { useContext, useState } from "react"
import Fetch from "../../api/Fetch"
import userPicture from "../../assets/img/user_picture.svg"
import { AppContext } from "../../context/AppContext"
import TimeHistoryTable from "./TimeHistoryTable"

const UserDashboard = () => {
    const { currentUserInfo, notifySuccess, notifyError } = useContext(AppContext);
    const [enteredUsername, setEnteredUsername] = useState('');
    const [isEnteredUsernameValid, setIsEnteredUsernameValid] = useState(true);
    const [attendanceButtonClicked, setAttendanceButtonClicked] = useState(0);

    const validateUsername = (input) => {
        if (input === currentUserInfo.username) {
            setIsEnteredUsernameValid(true);
        } else {
            setIsEnteredUsernameValid(false);
        }
    };

    const addNewAttendanceRecord = async () => {
        try {
            const response = await Fetch.post(`/auth/user/${currentUserInfo.user_id}/time-in`)
            setAttendanceButtonClicked(prevState => prevState + 1);
            if (response.data.status == "success") {
                notifySuccess(response.data.message)
            } else {
                notifyError(response.data.message)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <main id="user-dashboard" className="form-style">
            <div className="user-details">
                <h1 className="userId title-large"><b>USERNAME:</b> {currentUserInfo.username}</h1>
                <div className="user-info">
                    <img className="user-profile-picture" src={userPicture} alt="User's Profile Picture" />
                    <dl className="user-basic-info description-field-styles">
                        <div>
                            <dt><b>Name:</b></dt>
                            <dd>{currentUserInfo.first_name} {currentUserInfo.last_name}</dd>
                        </div>

                        <div>
                            <dt><b>Birthdate:</b></dt>
                            <dd>{currentUserInfo.birthdate}</dd>
                        </div>

                        <div>
                            <dt><b>Deparment:</b></dt>
                            <dd>{currentUserInfo.department}</dd>
                        </div>
                        <div>
                            <dt><b>Project:</b></dt>
                            <dd>{currentUserInfo.project}</dd>
                        </div>
                    </dl>
                </div>
                <h2 className="login-details description-field-style title-medium"><b>LOGIN DETAILS:</b> TIME-IN/TIME-OUT</h2>
            </div>
            <div className="attendance-function-section">
                <div>
                    <h2 className="type-userId-label title-large">TYPE USERNAME:</h2>
                    <input
                        type="text"
                        name="confirm-username"
                        id=""
                        required
                        value={enteredUsername}
                        onChange={(e) => {
                            setEnteredUsername(e.target.value);
                            validateUsername(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                if (isEnteredUsernameValid) {
                                    notifySuccess("Username confirmed.");
                                    addNewAttendanceRecord()
                                } else {
                                    notifyError("Username entered is incorrect. Please try again.")
                                }
                            }
                        }}
                    />
                    <button
                        className="login-logout-btn label-large"
                        onClick={() => {
                            if (isEnteredUsernameValid) {
                                notifySuccess("Username confirmed.");
                                addNewAttendanceRecord()
                            } else {
                                notifyError("Username entered is incorrect. Please try again.")
                            }
                        }}
                    >LOGIN/LOGOUT</button>
                </div>
            </div>
            <div className="time-history-section">
                <h1 className="time-history-heading title-large"><b>TIME HISTORY</b></h1>
                <TimeHistoryTable attendanceButtonClicked={attendanceButtonClicked} />
            </div>
        </main>
    )
}

export default UserDashboard