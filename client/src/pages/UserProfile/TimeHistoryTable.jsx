// import React from 'react'
import { useContext, useEffect, useState } from 'react';
import Fetch from '../../api/Fetch';
import { AppContext } from '../../context/AppContext';
import { convertDatesToLocale } from '../../utils/convertDatesToLocale';
import './TimeHistoryTable.css';

const TimeHistoryTable = ({ attendanceButtonClicked }) => {
    const { currentUserInfo } = useContext(AppContext);
    const [userTimeHistoryRecords, setUserTimeHistoryRecords] = useState([])

    useEffect(() => {
        const fetchUserRecords = async () => {
            try {
                const response = await Fetch.get(`/auth/user/${currentUserInfo.user_id}/records`);

                const responseParsedDate = convertDatesToLocale(response.data.data)

                console.log(responseParsedDate)
                setUserTimeHistoryRecords(responseParsedDate)

            } catch (error) {
                console.error(error.message)
            }
        };
        fetchUserRecords();
    }, [currentUserInfo, attendanceButtonClicked])

    return (
        <main id="time-history-table">
            <table>
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>TIME IN</th>
                        <th>TIME OUT</th>
                        <th>COMPUTER</th>
                    </tr>
                </thead>
                <tbody>
                    {userTimeHistoryRecords.length > 0 ? (
                        [...userTimeHistoryRecords].reverse().map((record) => {
                            return (
                                <tr key={record.time_history_id}>
                                    <td>{record.date}</td>
                                    <td>{record.time_in}</td>
                                    <td>{record.time_out}</td>
                                    <td>{record.computer}</td>
                                </tr>
                            );
                        })
                    ) : (
                        <div>Loading...</div>
                    )}

                </tbody>
            </table>
        </main>
    )
}

export default TimeHistoryTable