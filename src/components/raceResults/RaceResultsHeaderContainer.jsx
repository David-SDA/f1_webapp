import React from "react";

import { Col, Row } from "react-bootstrap";

export default function RaceResultsHeaderContainer(){
    const headerTextStyle = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    };

    return (
        <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
            <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-none d-lg-block" style={headerTextStyle}>
                    POSITION
                </p>
                <p className="m-0 text-center d-block d-lg-none" style={headerTextStyle}>
                    POS
                </p>
            </Col>
            <Col xs={2} sm={1} md={1} lg={1}>
            </Col>
            <Col className="p-0" xs={2} sm={6} md={4} lg={5}>
                <p className="m-0 d-none d-sm-block" style={headerTextStyle}>
                    DRIVER
                </p>
                <p className="m-0 d-block d-sm-none" style={headerTextStyle}>
                    DRI
                </p>
            </Col>
            <Col className="p-0 d-none d-md-block" md={3} lg={2}>
                <p className="m-0 text-center" style={headerTextStyle}>
                    FASTEST LAP
                </p>
            </Col>
            <Col className="p-0" xs={5} sm={3} md={2} lg={2}>
                <p className="m-0 text-center" style={headerTextStyle}>
                    TIME
                </p>
            </Col>
            <Col className="p-0" xs={2} sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-none d-lg-block" style={headerTextStyle}>
                    POINTS
                </p>
                <p className="m-0 text-center d-block d-lg-none" style={headerTextStyle}>
                    PTS
                </p>
            </Col>
        </Row>
    );
}