import React from "react";
import { Col, Row } from "react-bootstrap";

export default function OneSeasonDriverStandingsHeader(){
    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }
    
    return (
        <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
            <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-none d-lg-block" style={textBlack}>
                    POSITION
                </p>
                <p className="m-0 text-center d-block d-lg-none" style={textBlack}>
                    POS
                </p>
            </Col>
            <Col className="p-0" xs={5} sm={3} md={4} lg={4}>
                <p className="m-0 d-none d-sm-block" style={textBlack}>
                    DRIVER
                </p>
                <p className="m-0 d-block d-sm-none" style={textBlack}>
                    DRI
                </p>
            </Col>
            <Col className="p-0 d-none d-sm-block" sm={3} md={4} lg={3}>
                <p className="m-0 text-center" style={textBlack}>
                    TEAM
                </p>
            </Col>
            <Col className="p-0 d-none d-md-block" sm={1} md={1} lg={1}>
                <p className="m-0 text-center" style={textBlack}>
                    WINS
                </p>
            </Col>
            <Col className="p-0" xs={3} sm={1} md={1} lg={1}>
                <p className="m-0 text-center d-none d-lg-block" style={textBlack}>
                    POINTS
                </p>
                <p className="m-0 text-center d-block d-lg-none" style={textBlack}>
                    PTS
                </p>
            </Col>
        </Row>
    );
}