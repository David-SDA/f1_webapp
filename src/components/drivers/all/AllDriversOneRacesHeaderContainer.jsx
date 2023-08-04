import React from "react";

import { Col, Row } from "react-bootstrap";

export default function AllDriversOneRacesHeaderContainer(){
    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    return (
        <Row className="bg-white mt-sm-0 ms-1 me-1 p-1 rounded">
            <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>ROUND</p>
                <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>R</p>
            </Col>
            <Col xs={2} sm={3} md={2} lg={2} className="ps-0 ps-sm-2 pe-0 pe-sm-2">
                <p className="d-none d-sm-block mb-0 text-center" style={textBlack}>SEASON</p>
                <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>2023</p>
            </Col>
            <Col xs={8} sm={7} md={7} lg={6}>
                <p className="mb-0 text-center" style={textBlack}>RACE</p>
            </Col>
            <Col md={1} lg={1} className="d-none d-md-block p-0">
                <p className="mb-0 text-center" style={textBlack}>GRID</p>
            </Col>
            <Col xs={2} sm={1} md={1} lg={2} className="p-0">
                <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POSITION</p>
                <p className="d-none d-sm-block d-lg-none mb-0 text-center" style={textBlack}>POS</p>
                <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>P</p>
            </Col>
        </Row>
    );
}