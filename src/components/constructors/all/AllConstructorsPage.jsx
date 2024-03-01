import React, { useEffect, useState } from "react";

import { flagsNationality } from "../../../constants/flagsNationality";

import { Container, Row, Col, Spinner, Card, Image } from "react-bootstrap";

export default function AllConstructorsPage(){
    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    return (
        <Container>
            <h1 className="fst-italic mt-1" style={textRegular}>All Constructors</h1>
            <Row>
                <Col sm={6} md={4} lg={3} xl={2} className="mb-2 p-1">
                <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                    <Card style={{height: "8rem"}}>
                        <Card.Body className="d-flex flex-column justify-content-between">
                            <Card.Title>
                                <span style={textBold}>Example name</span>
                            </Card.Title>
                            <Card.Subtitle className="d-flex align-items-center">
                                <Image src={flagsNationality["French"]} rounded className="me-1 border" style={{height: 20}} />
                                <span className="fst-italic" style={textRegular}>French</span>
                            </Card.Subtitle>
                        </Card.Body>
                    </Card>
                </a>
                </Col>
            </Row>
        </Container>
    )
}