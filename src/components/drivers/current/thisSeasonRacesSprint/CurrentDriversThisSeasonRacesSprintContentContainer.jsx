import React from "react";
import { Col, Row } from "react-bootstrap";

export default function CurrentDriversThisSeasonRacesSprintContentContainer({
    round,
    raceName,
    grid,
    position,
    time,
    status,
    points,
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
    }
    return (
        <Row className="bg-white ms-1 me-1 mt-2 p-1 rounded">
            <Col sm={1} md={1} lg={1} className="d-none d-sm-flex justify-content-center align-items-center p-0">
                <p className="mb-0 text-center" style={textBlack}>{round}</p>
            </Col>
            <Col xs={6} sm={7} md={6} lg={4} className="d-flex justify-content-center align-items-center p-0">
                <a href={"/schedule/" + round} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                    <p className="d-flex d-sm-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "3em"}}>{raceName}</p>
                    <p className="d-none d-sm-flex align-items-center mb-0 text-center" style={textBold}>{raceName}</p>
                </a>
            </Col>
            <Col md={1} lg={1} className="d-flex justify-content-center align-items-center d-none d-md-block p-0">
                <p className="mb-0 text-center" style={textBold}>{grid}</p>
            </Col>
            <Col xs={2} sm={1} md={1} lg={1} className="d-flex justify-content-center align-items-center p-0">
                <p className="mb-0 text-center" style={textBold}>{position}</p>
            </Col>
            <Col xs={4} sm={3} md={2} lg={4} className="d-flex justify-content-center align-items-center p-0">
                {
                    time ? (
                        <p className="mb-0 text-center" style={textRegular}>
                            <span className="rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{time}</span>
                        </p>
                    ) : (
                        <p className="mb-0 text-center" style={textRegular}>
                            <span className="rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{status}</span>
                        </p>
                    )
                }
            </Col>
            <Col md={1} lg={1} className="d-flex justify-content-center align-items-center d-none d-md-block p-0">
                <p className="mb-0 text-center" style={textBlack}>{points}</p>
            </Col>
        </Row>
    );
}