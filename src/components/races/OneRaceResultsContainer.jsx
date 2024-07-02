import React from "react";

import { Col, Row } from "react-bootstrap";

export default function OneRaceResultsContainer({
    positionText,
    driverGivenName,
    driverFamilyName,
    driverId,
    constructorName,
    constructorId,
    grid,
    time,
    status,
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

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    };
    
    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    }

    return (
        <Row className="d-flex  flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
            <Col className="p-0" xs={2} sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-none d-sm-block" style={textWide}>
                    {positionText}
                </p>
                <p className="m-0 text-center d-sm-none" style={{...textWide, fontSize: "0.8rem"}}>
                    {positionText}
                </p>
            </Col>
            <Col className="p-0" xs={5} sm={6} md={6} lg={5}>
                <p className="m-0 d-none d-sm-block" style={textRegular}>
                    <a href={"/allDrivers/" + driverId} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                        {driverGivenName} <span style={textBold}>{driverFamilyName}</span>
                    </a>
                </p>
                <p className="m-0 d-block d-sm-none" style={textBold}>
                    <a href={"/allDrivers/" + driverId} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                        {driverFamilyName}
                    </a>
                </p>
            </Col>
            <Col className="p-0 d-none d-lg-block" lg={2}>
                <p className="m-0 text-center d-none d-lg-block" style={textRegular}>
                    <a href={"/allConstructors/" + constructorId} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                        {constructorName}
                    </a>
                </p>
            </Col>
            <Col className="p-0 d-none d-md-block" md={1} lg={1}>   
                <p className="m-0 text-center d-none d-md-block" style={textBlack}>
                    {grid}
                </p>
            </Col>
            <Col className="p-0" xs={5} sm={3} md={3} lg={2}>
                <p className="m-0 text-center rounded-5 p-1" style={textRegular}>
                {
                    time ? (
                        <span className="rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{time}</span>
                    ) : (
                        status ? (
                            <span className="rounded-5 p-1 fst-italic">{status}</span>
                        ):(
                            <span className="rounded-5 p-1 fst-italic">DNF</span>
                        )
                    )
                }
                </p>
            </Col>
            <Col className="p-0" sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-none d-sm-block" style={textBlack}>
                    {points}
                </p>
            </Col>
        </Row>
    );
}