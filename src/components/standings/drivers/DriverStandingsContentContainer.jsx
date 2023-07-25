import React from "react";

import { Col, Row } from "react-bootstrap";

export default function DriverStandingsContentContainer({
    position,
    color,
    givenName,
    familyName,
    code,
    team,
    wins,
    points
}){
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: color,
    };

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    }

    return (
        <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 mt-2 p-1 p-sm-2 rounded-3">
            <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                <p className="m-0 text-center" style={textWide}>
                    {position}
                </p>
            </Col>
            <Col className="d-flex flex-row justify-content-center align-items-center" xs={2} sm={1} md={1} lg={1}>
                <div className="rounded-3" style={MyBar}></div>
            </Col>
            <Col className="p-0" xs={3} sm={3} md={4} lg={4}>
                <p className="m-0 d-none d-sm-block" style={textBold}>
                    <span className="d-none d-md-inline" style={textRegular}>{givenName} </span>
                    {familyName}
                </p>
                <p className="m-0 d-block d-sm-none" style={textBold}>
                    {code}
                </p>
            </Col>
            <Col className="p-0 d-none d-sm-block" sm={4} md={3} lg={3}>
                <p className="m-0 text-center" style={textRegular}>
                    {team}
                </p>
            </Col>
            <Col className="p-0 d-none d-md-block" md={1} lg={1}>
                <p className="m-0 text-center" style={textBold}>
                    {wins}
                </p>
            </Col>
            <Col className="p-0" xs={3} sm={2} md={1} lg={1}>
                <p className="m-0 text-center" style={textBold}>
                    <span className="rounded-4 p-1" style={{backgroundColor: "#e8e8e8"}}>{points}</span>
                </p>
            </Col>
            <Col className="p-0" xs={3} sm={1} md={1} lg={1}>
                <p className="m-0 text-center" style={textBold}>
                    -
                </p>
            </Col>
        </Row>
    );
}