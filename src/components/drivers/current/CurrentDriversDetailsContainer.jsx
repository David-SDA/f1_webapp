import React from "react";


import { Col, Container, Image, Row } from "react-bootstrap";

export default function CurrentDriversDetailsContainer({
    image,
    flagNationality,
    nationality,
    dateOfBirth,
    permanentNumber,
    team,
}){
    // calcul de l'âge
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    let monthDiff = today.getMonth() - today.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())){
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

    return (
        <Row className="mb-2 mb-md-0">
            <Col md={6} lg={4} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
                <Image src={image} className="img-fluid rounded-4" style={{maxHeight: "300px", objectFit: "contain"}} />
            </Col>
            <Col md={6} lg={8} className="d-flex flex-column justify-content-center">
                <Row>
                    <Col lg={6} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>NATIONALITY</p>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <Image src={flagNationality} rounded className="me-1 border" style={{height: 25}} />
                                <p className="mb-0" style={{...textBold, fontSize: "24px"}}>{nationality}</p>
                            </div>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={6} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>DATE OF BIRTH</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{dateOfBirth} ({age} y/o)</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={6} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>NUMBER</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{permanentNumber}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={6}>
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
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