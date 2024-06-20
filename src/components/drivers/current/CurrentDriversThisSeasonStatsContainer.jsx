import React from "react";

import { Col, Container, Row } from "react-bootstrap";

import { currentConstructorColor } from "../../../constants/currentConstructorColor";

export default function CurrentDriversThisSeasonStatsContainer({
    position,
    points,
    wins,
    nbPodiums,
    teamId
}){
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
        <Row className="mb-2">
            <Col lg={3} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid " + color, borderBottom: "5px solid " + color}}>
                    <p className="mb-0" style={textBlack}>POSITION IN STANDINGS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{position}</p>
                    <div></div>
                </Container>
            </Col>
            <Col lg={3} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid " + color, borderBottom: "5px solid " + color}}>
                    <p className="mb-0" style={textBlack}>POINTS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{points}</p>
                    <div></div>
                </Container>
            </Col>
            <Col lg={3} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid " + color, borderBottom: "5px solid " + color}}>
                    <p className="mb-0" style={textBlack}>WINS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{wins}</p>
                    <div></div>
                </Container>
            </Col>
            <Col lg={3} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid " + color, borderBottom: "5px solid " + color}}>
                    <p className="mb-0" style={textBlack}>PODIUMS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{nbPodiums}</p>
                    <div></div>
                </Container>
            </Col>
        </Row>
    );
}