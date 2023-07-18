import React from "react";

import DayMonth from "./DayMonth";
import VerticalBar from "../others/VerticalBar";
import Session from "./Session";

import { Container } from "react-bootstrap";

export default function ScheduleOneSession({sessionName, date}){
    return (
        <Container className="d-flex flex-row justify-content-start align-items-center bg-white rounded-3 shadow-sm mb-2 p-2">
            <DayMonth date={date} />
            <VerticalBar />
            <Session sessionName={sessionName} date={date} />
        </Container>
    );
}