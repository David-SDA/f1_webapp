import React from "react";

import { Col } from "react-bootstrap";

export default function OneSeasonOneRace({
    round,
    date,
    raceName,
}){
    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }
    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    }

    return (
        <Col xs={6} sm={4} md={3} lg={2} className="bg-white m-1 rounded" style={textRegular}>
            <p><span style={textWide}>{round}</span> : <i>{new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</i></p>
            <p style={textBold}>{raceName}</p>
        </Col>
    )
}