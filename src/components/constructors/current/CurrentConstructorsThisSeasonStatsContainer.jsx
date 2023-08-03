import React from "react";

import { Col, Container, Row } from "react-bootstrap";

export default function CurrentConstructorsThisSeasonStatsContainer({
    position,
    points,
    wins,
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
        <Row className="mb-2">
            <Col md={4} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>POSITION IN STANDINGS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{position}</p>
                    <div></div>
                </Container>
            </Col>
            <Col md={4} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>POINTS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{points}</p>
                    <div></div>
                </Container>
            </Col>
            <Col md={4} lg={4} className="mb-3">
                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                    <p className="mb-0" style={textBlack}>WINS</p>
                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{wins}</p>
                    <div></div>
                </Container>
            </Col>
        </Row>
    );
}