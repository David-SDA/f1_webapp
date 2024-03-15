import React from "react";
import { Col, Row } from "react-bootstrap";

export default function OneSeasonDriverStandingsContent({
    position,
    givenName,
    familyName,
    name,
    wins,
    points
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
        <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
            <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-block" style={textWide}>
                    {position}
                </p>
            </Col>
            <Col className="p-0" xs={5} sm={3} md={4} lg={4}>
                <p className="m-0 d-none d-sm-block">
                    <span style={textRegular}>{givenName}</span> <span style={textBold}>{familyName}</span>
                </p>
                <p className="m-0 d-block d-sm-none" style={textBold}>
                    {familyName}
                </p>
            </Col>
            <Col className="p-0 d-none d-sm-block" sm={3} md={4} lg={3}>
                <p className="m-0 text-center" style={textRegular}>
                    {name}
                </p>
            </Col>
            <Col className="p-0 d-none d-md-block" sm={1} md={1} lg={1}>
                <p className="m-0 text-center" style={textBold}>
                    {wins}
                </p>
            </Col>
            <Col className="p-0" xs={3} sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-block" style={textBold}>
                    {points}
                </p>
            </Col>
        </Row>
    );
}