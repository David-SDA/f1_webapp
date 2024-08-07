import React from "react";

import { Col, Container, Image, Row } from "react-bootstrap";

import { currentConstructorColor } from "../../../constants/currentConstructorColor";

export default function CurrentDriversDetailsContainer({
    image,
    flagNationality,
    nationality,
    dateOfBirth,
    permanentNumber,
    team,
    teamId
}){
    // calcul de l'âge
    const today = new Date();
    let age = today.getFullYear() - dateOfBirth.getFullYear();

    if(today.getMonth() < dateOfBirth.getMonth(0) || (today.getMonth() === dateOfBirth.getMonth() && today.getDate() < dateOfBirth.getDate())){
        age--;
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    const color = currentConstructorColor[teamId];

    return (
        <Row className="mb-2 mb-md-0">
            <Col md={6} lg={4} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
                <Image src={image} className="img-fluid rounded-4" style={{maxHeight: "300px", objectFit: "contain"}} />
            </Col>
            <Col md={6} lg={8} className="d-flex flex-column justify-content-center">
                <Row>
                    <Col lg={6} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid " + color, borderBottom: "5px solid " + color}}>
                            <p className="mb-0" style={textBlack}>NATIONALITY</p>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <Image src={flagNationality} rounded className="me-1 border" style={{height: 25}} />
                                <p className="mb-0" style={{...textBold, fontSize: "24px"}}>{nationality}</p>
                            </div>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={6} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid " + color, borderBottom: "5px solid " + color}}>
                            <p className="mb-0" style={textBlack}>DATE OF BIRTH</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{dateOfBirth.toLocaleDateString("en")} ({age} y/o)</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={6} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid " + color, borderBottom: "5px solid " + color}}>
                            <p className="mb-0" style={textBlack}>NUMBER</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{permanentNumber}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={6}>
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid " + color, borderBottom: "5px solid " + color}}>
                            <p className="mb-0" style={textBlack}>TEAM</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{team}</p>
                            <div></div>
                        </Container>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}