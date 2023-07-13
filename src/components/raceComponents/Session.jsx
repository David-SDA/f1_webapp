import React from "react";
import '../../styles/raceComponentsStyles/session.css';

export default function Session({sessionName, date}){
    return (
        <div className="scheduleSession">
            <p className="scheduleSessionName">{sessionName}</p>
            <p className="scheduleSessionTime">{date.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</p>
        </div>
    );
}