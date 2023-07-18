import React from "react";

import DayMonth from "./DayMonth";
import VerticalBar from "../others/VerticalBar";
import Session from "./Session";

import { Stack } from "react-bootstrap";

export default function ScheduleOneSession({sessionName, date}){
    return (
        <Stack direction="horizontal" className="bg-white shadow-sm rounded-3 mb-2 p-2 pt-3 pb-3">
            <DayMonth date={date} />
            <VerticalBar />
            <Session sessionName={sessionName} date={date} />
        </Stack>
    );
}