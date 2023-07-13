import React from "react";
import '../../styles/raceComponentsStyles/scheduleOneSession.css'

import DayMonth from "./DayMonth";
import VerticalBar from "../others/VerticalBar";
import Session from "./Session";

export default function ScheduleOneSession({sessionName, date}){
    return (
        <div className="scheduleBox">
            <DayMonth date={date} />
            <VerticalBar />
            <Session sessionName={sessionName} date={date} />
        </div>
    );
}