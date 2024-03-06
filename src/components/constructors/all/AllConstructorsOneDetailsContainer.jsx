import React from "react";

import { flagsNationality } from "../../../constants/flagsNationality";

import { Col, Container, Image, Row } from "react-bootstrap";

export default function AllConstructorsOneDetailsContainer({
    nationality,
    nbDrivers,
    nbSeasons,
    titles,
    wins,
    podiums,
}){
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    return (
        <Row className="d-flex justify-content-center">
            <Col md={6} lg={4}>
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>NATIONALITY</p>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <Image src={flagsNationality[nationality]} rounded className="me-1 border" style={{height: 25}} />
                        <p className="mb-0" style={{...textBold, fontSize: "20px"}}>{nationality}</p>
                    </div>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4}>
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>DRIVERS</p>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <p className="mb-0" style={{...textBold, fontSize: "20px"}}>{nbDrivers}</p>
                    </div>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4}>
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>SEASONS</p>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <p className="mb-0" style={{...textBold, fontSize: "20px"}}>{nbSeasons}</p>
                    </div>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4}>
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>CONSTRUCTORS TITLES</p>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <p className="mb-0" style={{...textBold, fontSize: "20px"}}>{titles}</p>
                    </div>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4}>
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>WINS</p>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <p className="mb-0" style={{...textBold, fontSize: "20px"}}>{wins}</p>
                    </div>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4}>
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>PODIUMS</p>
                    <div className="d-flex flex-row justify-content-center align-items-center">
                        <p className="mb-0" style={{...textBold, fontSize: "20px"}}>{podiums}</p>
                    </div>
                    <div></div>
                </Container>
            </Col>
        </Row>
    )
}