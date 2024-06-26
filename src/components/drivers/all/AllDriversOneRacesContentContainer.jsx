import React from "react";

import { Col, Row } from "react-bootstrap";

export default function AllDriversOneRacesContentContainer({
    round,
    season,
    raceName,
    grid,
    position,
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
        <Row className="bg-white mt-2 ms-1 me-1 p-1 rounded">
            <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                <p className="mb-0 text-center" style={textBlack}>{round}</p>
            </Col>
            <Col xs={2} sm={3} md={2} lg={2} className="d-flex justify-content-center align-items-center ps-0 ps-sm-2 pe-0 pe-sm-2">
                <p className="mb-0 text-center" style={textRegular}>
                    <a href={"/seasons/" + season} className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                        {season}
                    </a>
                </p>
            </Col>
            <Col xs={8} sm={7} md={7} lg={6} className="d-flex justify-content-center align-items-center">
                <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                    <p className="d-flex d-sm-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "3em"}}>{raceName}</p>
                    <p className="d-none d-sm-flex align-items-center mb-0 text-center" style={textBold}>{raceName}</p>
                </a>
            </Col>
            <Col md={1} lg={1} className="d-none d-md-block p-0">
                <p className="mb-0 text-center" style={textBlack}>{grid}</p>
            </Col>
            <Col xs={2} sm={1} md={1} lg={2} className="d-flex justify-content-center align-items-center p-0">
                <p className="mb-0 text-center" style={textBlack}>{position}</p>
            </Col>
        </Row>
    );
}