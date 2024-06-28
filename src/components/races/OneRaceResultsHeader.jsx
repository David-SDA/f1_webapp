import React from "react";

import { Col, Row } from "react-bootstrap";

export default function OneRaceResultsHeader(){
    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    };

    return (
        <Row className="d-flex  flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
            <Col className="p-0" xs={2} sm={1} md={1} lg={1}>
                <p className="m-0 text-center" style={textBlack}>
                    POS
                </p>
            </Col>
            <Col className="p-0" xs={5} sm={6} md={6} lg={5}>
                <p className="m-0 d-none d-sm-block" style={textBlack}>
                    DRIVER
                </p>
                <p className="m-0 d-block d-sm-none" style={textBlack}>
                    DRI
                </p>
            </Col>
            <Col className="p-0 d-none d-lg-block" lg={2}>
                <p className="m-0 text-center d-none d-lg-block" style={textBlack}>
                    TEAM
                </p>
            </Col>
            <Col className="p-0 d-none d-md-block" md={1} lg={1}>
                <p className="m-0 text-center d-none d-md-block" style={textBlack}>
                    GRID
                </p>
            </Col>
            <Col className="p-0" xs={4} sm={3} md={3} lg={2}>
                <p className="m-0 text-center" style={textBlack}>
                    TIME
                </p>
            </Col>
            <Col className="p-0" sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-none d-lg-block" style={textBlack}>
                    POINTS
                </p>
                <p className="m-0 text-center d-none d-sm-block d-lg-none" style={textBlack}>
                    PTS
                </p>
            </Col>
        </Row>
    );
}