import React from "react";

import { Col, Row } from "react-bootstrap";

export default function ConstructorStandingsContentContainer({
    position,
    color,
    team,
    wins,
    points,
    isSelected,
    onClick,
    selectedTeamPoints
}){
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: color,
    };

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
        color: isSelected ? "#ffffff" : "",
    };

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
        color: isSelected ? "#ffffff" : "",
    }

    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
        color: isSelected ? "#ffffff" : "",
    }

    const pointsDiff = selectedTeamPoints !== 0 ? parseInt(points) - selectedTeamPoints : 0;

    return (
        <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center m-1 mt-2 p-1 p-sm-2 rounded-3"
            style={{backgroundColor: isSelected ? "#ff1801" : "white", cursor: "pointer"}}
            onClick={onClick}
        >
            <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                <p className="m-0 text-center" style={textWide}>
                    {position}
                </p>
            </Col>
            <Col className="d-flex flex-row justify-content-center align-items-center" xs={2} sm={1} md={1} lg={1}>
                <div className="rounded-3" style={MyBar}></div>
            </Col>
            <Col className="p-0" xs={5} sm={6} md={4} lg={4}>
                <p className="m-0 d-none d-sm-block">
                    <a href="##" className="link-dark link-underline-opacity-0 link-opacity-75-hover">
                        <span style={textBold}>{team}</span>
                    </a>
                </p>
                <p className="m-0 d-block d-sm-none">
                    <a href="##" className="link-dark link-underline-opacity-0 link-opacity-75-hover">
                        <span style={{fontFamily: "Formula1-Bold", fontSize: 15, letterSpacing: "0.0005rem", color: isSelected ? "#ffffff" : ""}}>{team}</span>
                    </a>
                </p>
            </Col>
            <Col className="p-0 d-none d-md-block" md={2} lg={2}>
                <p className="m-0 text-center" style={textBold}>
                    {wins}
                </p>
            </Col>
            <Col className="p-0" xs={2} sm={2} md={2} lg={2}>
                <p className="m-0 text-center" style={textBold}>
                    <span className="rounded-4 p-1 ps-2 pe-2" style={{backgroundColor: isSelected ? "#000000" : "#e8e8e8"}}>
                        {points}
                    </span>
                </p>
            </Col>
            <Col className="p-0" xs={2} sm={2} md={2} lg={2}>
                <p className="m-0 text-center" style={textBold}>
                    {pointsDiff > 0 ? "+" + pointsDiff : pointsDiff}
                </p>
            </Col>
        </Row>
    );
}