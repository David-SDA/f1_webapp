import React from "react";

import { Col, Row } from "react-bootstrap";

export default function CurrentDriversThisSeasonQualifyingHeaderContainer(){
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
            <Col xs={8} sm={4} md={4} lg={4} className="p-0">
                <p className="d-none d-sm-block mb-0 text-center" style={textBlack}>GRAND PRIX</p>
                <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>GP</p>
            </Col>
            <Col xs={4} sm={1} md={1} lg={1} className="p-0">
                <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POSITION</p>
                <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>POS</p>                            
            </Col>
            <Col sm={2} md={2} lg={2} className="d-none d-sm-block p-0">
                <p className="mb-0 text-center" style={textBlack}>Q1</p>
            </Col>
            <Col sm={2} md={2} lg={2} className="d-none d-sm-block">
                <p className="mb-0 text-center" style={textBlack}>Q2</p>
            </Col>
            <Col sm={2} md={2} lg={2} className="d-none d-sm-block">
                <p className="mb-0 text-center" style={textBlack}>Q3</p>
            </Col>
        </Row>
    );
}