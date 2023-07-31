import React from "react";

import { flagsNationality } from "../../../constants/flagsNationality";
import { currentDrivers } from "../../../constants/currentDrivers";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";

import { Card, Col, Container, Image, Row } from "react-bootstrap";

export default function CurrentDriversPage(){
    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }
    return (
        <Container>
            <h1 className="fst-italic mt-1" style={textRegular}>F1 2023 : Drivers</h1>
            <Row>
                <Col lg={4}>
                    <Card className="rounded-5 overflow-hidden" style={{height: "300px"}}>
                        <a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                            <Card.Header className="d-flex flex-row justify-content-between align-items-center text-white rounded-top-5 pt-3 pb-3" style={{backgroundColor: currentConstructorColor["red_bull"]}}>
                                <Image src={flagsNationality["Dutch"]} rounded className="me-1 border" style={{height: 25}} />
                                <p className="mb-0"><span style={textRegular}>Max</span> <span style={textBold}>Verstappen</span></p>
                                <p className="mb-0 fst-italic" style={textBlack}>33</p>
                            </Card.Header>
                            <Card.Img variant="top" src={currentDrivers["max_verstappen"]} className="rounded-0" />
                        </a>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}