import React from "react";

import { Col, Container, Row } from "react-bootstrap";

export default function DriversStandingsPage() {
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: "red",
    };

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    };

    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    }

    return (
        <Container className="p-0">
            <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2023 : Driver Standings</h1>
            <Container className="rounded p-1" style={{backgroundColor: "#38383f"}}>
                <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
                    <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center d-none d-lg-block" style={textBlack}>
                            POSITION
                        </p>
                        <p className="m-0 text-center d-block d-lg-none" style={textBlack}>
                            POS
                        </p>
                    </Col>
                    <Col xs={2} sm={1} md={1} lg={1}>
                    </Col>
                    <Col className="p-0" xs={3} sm={3} md={4} lg={4}>
                        <p className="m-0 d-none d-sm-block" style={textBlack}>
                            DRIVER
                        </p>
                        <p className="m-0 d-block d-sm-none" style={textBlack}>
                            DRI
                        </p>
                    </Col>
                    <Col className="p-0 d-none d-sm-block" sm={4} md={3} lg={3}>
                        <p className="m-0 text-center" style={textBlack}>
                            TEAM
                        </p>
                    </Col>
                    <Col className="p-0 d-none d-md-block" sm={1} md={1} lg={1}>
                        <p className="m-0 text-center" style={textBlack}>
                            WINS
                        </p>
                    </Col>
                    <Col className="p-0" xs={3} sm={2} md={1} lg={1}>
                        <p className="m-0 text-center d-none d-lg-block" style={textBlack}>
                            POINTS
                        </p>
                        <p className="m-0 text-center d-block d-lg-none" style={textBlack}>
                            PTS
                        </p>
                    </Col>
                    <Col className="p-0" xs={3} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center" style={textBlack}>
                            DIFF
                        </p>
                    </Col>
                </Row>
                <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 mt-2 p-1 p-sm-2 rounded-3">
                    <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center" style={textWide}>
                            1
                        </p>
                    </Col>
                    <Col className="d-flex flex-row justify-content-center align-items-center" xs={2} sm={1} md={1} lg={1}>
                        <div className="rounded-3" style={MyBar}></div>
                    </Col>
                    <Col className="p-0" xs={3} sm={3} md={4} lg={4}>
                        <p className="m-0 d-none d-sm-block" style={textBold}>
                            <span className="d-none d-md-inline" style={textRegular}>Max </span>
                            Verstappen
                        </p>
                        <p className="m-0 d-block d-sm-none" style={textBold}>
                            VER
                        </p>
                    </Col>
                    <Col className="p-0 d-none d-sm-block" sm={4} md={3} lg={3}>
                        <p className="m-0 text-center" style={textRegular}>
                            Red Bull
                        </p>
                    </Col>
                    <Col className="p-0 d-none d-md-block" md={1} lg={1}>
                        <p className="m-0 text-center" style={textBold}>
                            9
                        </p>
                    </Col>
                    <Col className="p-0" xs={3} sm={2} md={1} lg={1}>
                        <p className="m-0 text-center" style={textBold}>
                            <span className="rounded-4 p-1" style={{backgroundColor: "#e8e8e8"}}>281</span>
                        </p>
                    </Col>
                    <Col className="p-0" xs={3} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center" style={textBold}>
                            -
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}
