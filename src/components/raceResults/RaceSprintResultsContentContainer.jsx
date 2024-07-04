import React from "react";

import { Col, Row } from "react-bootstrap";

export default function RaceSprintResultsContentContainer({
    type,
    driverId,
    position,
    startingPosition,
    color,
    firstName,
    familyName,
    code, 
    fastestLap,
    fastestLapRank,
    totalTime,
    status,
    points
}){
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: color,
    };

    const regularText = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    const boldText = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    };

    const blackText = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    };

    const wideText = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    };

    return (
        <a href={"/currentDrivers/" + driverId} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
            <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">                    
                <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                    <p className="m-0 text-center text-xs" style={wideText}>
                        {position}
                    </p>
                </Col>
                <Col className="d-flex flex-row justify-content-center align-items-center" xs={2} sm={1} md={1} lg={1}>
                    <div className="rounded-3" style={MyBar}></div>
                </Col>
                <Col className="p-0" xs={2} sm={6} md={4} lg={5}>
                    <p className="m-0 d-none d-sm-block" style={boldText}>
                        <span style={regularText}>{firstName} </span> 
                        {familyName}
                    </p>
                    <p className="m-0 d-block d-sm-none" style={boldText}>
                        {code}
                    </p>
                </Col>
                <Col className="p-0 d-none d-md-block" md={3} lg={2}>
                    <p className="m-0 text-center" style={regularText}>
                        {
                            type === "Race" ? (
                                fastestLap ? (
                                    fastestLapRank === "1" ? (
                                        <span className="rounded-5 p-1 text-white" style={{backgroundColor: "purple"}}>{fastestLap}</span>
                                    ) : (
                                        <span className="rounded-5 p-1">{fastestLap}</span>
                                    )
                                ) : (
                                    <span className="fst-italic p-1">Not Available</span>
                                )
                            ) : (
                                <span className="rounded-5 p-1">{startingPosition}</span>
                            )
                        }
                    </p>
                </Col>
                <Col className="p-0"  xs={5} sm={3} md={2} lg={2}>
                    <p className="m-0 text-center" style={regularText}>
                        {
                            totalTime ? (
                                <span className="rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{totalTime}</span>
                            ) : (
                                status ? (
                                    <span className="fst-italic p-1">{status}</span>
                                ):(
                                    <span className="fst-italic p-1">DNF</span>
                                )
                            )
                        }
                    </p>
                </Col>
                <Col className="p-0" xs={2} sm={1} md={1} lg={1}>
                    <p className="m-0 text-center" style={blackText}>
                        {points}
                    </p>
                </Col>
            </Row>
        </a>
    );
}