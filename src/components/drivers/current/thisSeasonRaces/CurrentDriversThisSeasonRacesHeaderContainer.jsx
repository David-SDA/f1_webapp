import React from "react";

import { Col, Row } from "react-bootstrap";

export default function CurrentDriversThisSeasonRacesHeaderContainer(){
    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }
    
    return (
        <Row className="bg-white mt-sm-0 ms-1 me-1 p-1 rounded">
            <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                <p className="d-none d-md-block mb-0 text-center" style={textBlack}>ROUND</p>
                <p className="d-block d-md-none mb-0 text-center" style={textBlack}>R</p>
            </Col>
            <Col xs={6} sm={7} md={6} lg={4} className="p-0">
                <p className="mb-0 text-center" style={textBlack}>GRAND PRIX</p>
            </Col>
            <Col md={1} lg={1} className="d-none d-md-block p-0">
                <p className="mb-0 text-center" style={textBlack}>GRID</p>
            </Col>
            <Col xs={2} sm={1} md={1} lg={1} className="p-0">
                <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POSITION</p>
                <p className="d-none d-sm-block d-lg-none mb-0 text-center" style={textBlack}>POS</p>
                <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>P</p>
            </Col>
            <Col xs={4} sm={3} md={2} lg={4} className="p-0">
                <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>TIME/STATUS</p>
                <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>TIME</p>
            </Col>
            <Col md={1} lg={1} className="d-none d-md-block p-0">
                <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POINTS</p>
                <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>PTS</p>
            </Col>
        </Row>
    );
}