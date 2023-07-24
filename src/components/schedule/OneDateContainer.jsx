import React from "react";

import { Container } from "react-bootstrap";

export default function OneDateContainer({date}){
    const dateStyle = {
        fontFamily: "Formula1-Wide",
        fontSize: 12,
    }

    return (
        <Container className="d-flex flex-column align-items-center">
            <p className="m-0" style={dateStyle}>{date.toLocaleDateString("en-GB", {day: "2-digit"})}</p>
            <p className="m-0" style={dateStyle}>{date.toLocaleDateString("en-GB", {month: "short"})}</p>
        </Container>
    );
}