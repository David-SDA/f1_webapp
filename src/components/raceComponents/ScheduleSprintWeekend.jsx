import React from "react";
import '../../styles/raceComponentsStyles/scheduleNormalAndSprintWeekend.css';
import ScheduleOneSession from './ScheduleOneSession';

export default function ScheduleNormalWeekend({dateFP1, dateQuali, dateFP2, dateSprint, dateRace}){
    return (
        <>
            <h2 className="scheduleText">SCHEDULE</h2>
            <div className="allSchedule">
                <ScheduleOneSession sessionName={'RACE'} date={dateRace} />
                <ScheduleOneSession sessionName={'SPRINT'} date={dateSprint} />
                <ScheduleOneSession sessionName={'PRACTICE 2'} date={dateFP2} />
                <ScheduleOneSession sessionName={'QUALIFYING'} date={dateQuali} />
                <ScheduleOneSession sessionName={'PRACTICE 1'} date={dateFP1} />
            </div>
        </>
    );
}