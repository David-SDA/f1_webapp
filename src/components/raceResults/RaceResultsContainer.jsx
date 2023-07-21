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
            <Container className="d-flex flex-column p-2 rounded" style={{backgroundColor: "#38383f"}}>
                <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-2 rounded-3">
                    <Col className="bg-primary p-0" xs={1} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center">POSITION</p>
                    </Col>
                    <Col className="d-flex flex-row justify-content-center align-items-center" xs={1} sm={1} md={1} lg={1}>
                    </Col>
                    <Col className="bg-success">
                        <p className="m-0">DRIVER</p>
                    </Col>
                    <Col className="bg-danger">
                        <p className="m-0">FASTEST LAP</p>
                    </Col>
                    <Col className="bg-warning">
                        <p className="m-0">TIME/RETIRED</p>
                    </Col>
                    <Col className="bg-info">
                        <p className="m-0">POINTS</p>
                    </Col>
                </Row>
                <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-2 rounded-3">
                    <Col className="bg-primary p-0" xs={1} sm={1} md={1} lg={1}>
                        <p className="m-0 text-center">1</p>
                    </Col>
                    <Col>
                        <div className="rounded-3" style={MyBar}></div>
                    </Col>
                    <Col className="bg-success">
                        <p className="m-0 d-none d-md-block">Max Verstappen</p>
                        <p className="m-0 d-none d-sm-block d-md-none">Verstappen</p>
                        <p className="m-0 d-block d-sm-none">VER</p>
                    </Col>
                    <Col className="bg-danger">
                        <p className="m-0">1:30:275</p>
                    </Col>
                    <Col className="bg-warning">
                        <p className="m-0">1:25:16:938</p>
                    </Col>
                    <Col className="bg-info">
                        <p className="m-0">26</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}