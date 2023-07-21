import React from "react";

import { Col, Container, Row } from "react-bootstrap";

export default function RaceResultsContainer(){
    const MyBar = {
        width: 7,
        height: 25,
        backgroundColor: "red",
    };

    return (
        <Container className="p-0">
            <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Race Results</p>
            <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
                    <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center d-none d-lg-block" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>POSITION</p>
                        <p className="m-0 text-center d-block d-lg-none" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>POS</p>
                    </Col>
                    <Col xs={2} sm={1} md={1} lg={1}>
                    </Col>
                    <Col className="p-0" xs={2} sm={6} md={4} lg={5}>
                        <p className="m-0 d-none d-sm-block" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>DRIVER</p>
                        <p className="m-0 d-block d-sm-none" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>DRI</p>
                    </Col>
                    <Col className="p-0 d-none d-md-block" md={3} lg={2}>
                        <p className="m-0 text-center" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>FASTEST LAP</p>
                    </Col>
                    <Col className="p-0" xs={5} sm={3} md={2} lg={2}>
                        <p className="m-0 text-center" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>TIME</p>
                    </Col>
                    <Col className="p-0" xs={2} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center d-none d-lg-block" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>POINTS</p>
                        <p className="m-0 text-center d-block d-lg-none" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>PTS</p>
                    </Col>
                </Row>
                <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3">
                    <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center text-xs" style={{fontFamily: "Formula1-Wide", letterSpacing: "0.0005rem"}}>1</p>
                    </Col>
                    <Col className="d-flex flex-row justify-content-center align-items-center" xs={2} sm={1} md={1} lg={1}>
                        <div className="rounded-3" style={MyBar}></div>
                    </Col>
                    <Col className="p-0" xs={2} sm={6} md={4} lg={5}>
                        <p className="m-0 d-none d-sm-block" style={{fontFamily: "Formula1-Bold", letterSpacing: "0.0005rem"}}><span style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Max</span> Verstappen</p>
                        <p className="m-0 d-block d-sm-none" style={{fontFamily: "Formula1-Bold", letterSpacing: "0.0005rem"}}>VER</p>
                    </Col>
                    <Col className="p-0 d-none d-md-block" md={3} lg={2}>
                        <p className="m-0 text-center" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}><span className="rounded-5 p-1 text-white" style={{backgroundColor: "purple"}}>1:30:275</span></p>
                    </Col>
                    <Col className="p-0"  xs={5} sm={3} md={2} lg={2}>
                        <p className="m-0 text-center" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}><span className="rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>1:25:16:938</span></p>
                    </Col>
                    <Col className="p-0" xs={2} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center" style={{fontFamily: "Formula1-Black", letterSpacing: "0.0005rem"}}>26</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}