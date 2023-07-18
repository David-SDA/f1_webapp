import React from "react";

import TopThree from "./TopThree";

import { Button, Col, Container, Row } from "react-bootstrap";

export default function SmallStandingsContainer(){
    return (
        <Container>
            <Row direction="horizontal" gap={1} className="d-flex justify-content-evenly mb-4">
                <Col xs={12} lg={5} className="d-flex flex-column align-items-end rounded-3 shadow p-3 mb-1" style={{backgroundColor: "#38383f"}}>
                    <TopThree />
                    <Button href="#" className="border-0 mt-1" style={{fontFamily: "Formula1-Bold", backgroundColor: "#ff1801"}}>Full Drivers Standings &gt;</Button>
                </Col>
                <Col xs={12} lg={5} className="d-flex flex-column align-items-end rounded-3 shadow p-3 mb-1" style={{backgroundColor: "#38383f"}}>
                    <TopThree />
                    <Button href="#" className="border-0 mt-1" style={{fontFamily: "Formula1-Bold", backgroundColor: "#ff1801"}}>Full Constructors Standings &gt;</Button>
                </Col>
            </Row>
        </Container>
    );
}