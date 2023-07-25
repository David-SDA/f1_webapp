import React from "react";

import { driversImages } from "../../../constants/driversImages";

import { Card, Col, Container, ListGroup, Row } from "react-bootstrap";

export default function DriverChampionsPage() {
    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    };

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    };

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    };

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    return (
        <Container>
            <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>Driver Champions</h1>
            <Row>
                <Col lg={3}>
                    <Card className="rounded-5">
                        <Card.Header className="text-center rounded-top-5" style={{backgroundColor: "#ff1801"}}>
                            <span className="text-white" style={textWide}>2022</span>
                        </Card.Header>
                        <Card.Img className="mt-1" variant="top" src={driversImages["max_verstappen"]} style={{height: "150px", objectFit: "contain"}} />
                        <Card.Body>
                            <Card.Title className="text-center">
                                <a href="#" className="link-dark link-underline-opacity-0 link-opacity-75-hover">
                                    <span style={textRegular}>Max <br/></span>
                                    <span style={textBold}>Verstappen</span>
                                </a>
                            </Card.Title>
                            <ListGroup className="list-group list-group-flush">
                                <ListGroup.Item style={textBold}>
                                    <a href="#" className="link-dark link-underline-opacity-0 link-opacity-75-hover fst-italic">
                                        Red Bull
                                    </a>
                                </ListGroup.Item>
                                <ListGroup.Item style={{fontStyle: "italic"}}>
                                    <span style={textBold}>15 </span>
                                    <span style={textRegular}>wins</span>
                                </ListGroup.Item>
                                <ListGroup.Item style={{fontStyle: "italic"}}>
                                    <span style={textBold}>454 </span>
                                    <span style={textRegular}>points</span>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
