import React from "react";
import '../../styles/raceComponentsStyles/dayMonth.css';

export default function DayMonth({date}){
    return (
        <div className="scheduleDate">
            <p className="scheduleDateNumber">{date.toLocaleDateString('en-GB', {day: '2-digit'})}</p>
            <p className="scheduleDateMonth">{date.toLocaleDateString('en-GB', {month: 'short'})}</p>
        </div>
    );
}