import React from "react";

import { flags } from "../../../constants/flags";

import { Col, Container, Image, Row } from "react-bootstrap";

export default function AllTracksInfoContainer({
    country,
    locality,
    length,
    nbWinners,
}){
    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    return (
        <Row>
            <Col sm={6} md={6} lg={6} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <span style={textBlack}>COUNTRY</span>
                    <Container className="d-flex justify-content-center align-items-center">
                        <Image src={flags[country]} className="rounded border me-2" style={{height: "25px"}} />
                        <span className="text-center" style={textBold}>{country}</span>
                    </Container>
                    <div></div>
                </Container>
            </Col>
            <Col sm={6} md={6} lg={6} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <span style={textBlack}>LOCALITY</span>
                    <span className="text-center" style={textBold}>{locality}</span>
                    <div></div>
                </Container>
            </Col>
            <Col sm={6} md={6} lg={6} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <span style={textBlack}>RACES</span>
                    <span className="text-center" style={{...textBold, fontSize: "30px"}}>{length}</span>
                    <div></div>
                </Container>
            </Col>
            <Col sm={6} md={6} lg={6} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <span style={textBlack}>WINNERS</span>
                    <span className="text-center" style={{...textBold, fontSize: "30px"}}>{nbWinners}</span>
                    <div></div>
                </Container>
            </Col>
        </Row>
    )
}