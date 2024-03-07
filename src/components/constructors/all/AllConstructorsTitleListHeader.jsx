import React from "react";

import { Col, Row } from "react-bootstrap";

export default function AllConstructorsTitleListHeader(){
    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    return (
        <Row className="bg-white ms-1 me-1 p-1 rounded">
            <Col xs={4} className="ps-0 pe-0">
                <p className="mb-0 text-center" style={textBlack}>SEASON</p>
            </Col>
            <Col xs={4} className="ps-0 pe-0">
                <p className="mb-0 text-center" style={textBlack}>POINTS</p>
            </Col>
            <Col xs={4} className="ps-0 pe-0">
                <p className="mb-0 text-center" style={textBlack}>WINS</p>
            </Col>
        </Row>
    )
}