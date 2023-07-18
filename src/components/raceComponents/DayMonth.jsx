import React from "react";

import { Container } from "react-bootstrap";

export default function DayMonth({date}){
    return (
        <Container className="d-flex flex-column align-items-center ms-2 me-2">
            <span className="h4 mb-0" style={{fontFamily: "Formula1-Bold"}}>{date.toLocaleDateString('en-GB', {day: '2-digit'})}</span>
            <span className="rounded-5 text-center ps-3 pe-3" style={{backgroundColor: "#e8e8e8", fontFamily: "Formula1-Regular"}}>{date.toLocaleDateString('en-GB', {month: 'short'})}</span>
        </Container>
    );
}