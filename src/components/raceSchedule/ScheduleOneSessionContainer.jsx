import React from "react";

import DayMonthContainer from "./DayMonthContainer";
import VerticalBar from "../others/VerticalBar";
import SessionContainer from "./SessionContainer";

import { Stack } from "react-bootstrap";

export default function ScheduleOneSessionContainer({sessionName, date}){
    return (
        <Stack direction="horizontal" className="bg-white shadow-sm rounded-3 mb-2 p-2 pt-3 pb-3">
            <DayMonthContainer date={date} />
            <VerticalBar />
            <SessionContainer sessionName={sessionName} date={date} />
        </Stack>
    );
}