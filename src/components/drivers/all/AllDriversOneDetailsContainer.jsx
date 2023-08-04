import React from "react";

import { flagsNationality } from "../../../constants/flagsNationality";

import { Col, Container, Image, Row } from "react-bootstrap";

export default function AllDriversOneDetailsContainer({
    nationality,
    dateOfBirth,
    firstSeason,
    firstRace,
    nbSeasons,
    nbRaces,
    nbChampionships,
    nbWins,
    nbPodiums,
    nbTeams,
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
            <Col md={6} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>DATE OF BIRTH</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{new Date(dateOfBirth).toLocaleDateString("en")}</p>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>FIRST RACE</p>
                    <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover"><p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{firstSeason} {firstRace}</p></a>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>COMPLETED SEASONS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbSeasons}</p>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>RACES</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbRaces}</p>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>WORLD CHAMPIONSHIPS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbChampionships}</p>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>WINS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbWins}</p>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>PODIUMS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbPodiums}</p>
                    <div></div>
                </Container>
            </Col>
            <Col md={6} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>TEAMS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbTeams}</p>
                    <div></div>
                </Container>
            </Col>
        </Row>
    );
}