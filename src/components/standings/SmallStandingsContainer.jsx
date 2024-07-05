import React, { useState } from "react";

import TopThreeDriversContainer from "./TopThreeDriversContainer";
import TopThreeConstructorsContainer from "./TopThreeConstructorsContainer";

import { Button, Col, Container, Row } from "react-bootstrap";

export default function SmallStandingsContainer(){
    const [isHoveredDriver, setIsHoveredDriver] = useState(false);
    const [isHoveredConstructor, setIsHoveredConstructor] = useState(false);

    const baseStyle = {
        fontFamily: "Formula1-Bold",
        backgroundColor: "#ff1801",
        fontSize: 14,
        border: "0",
    };

    const hoverStyle = {
        backgroundColor: "#cc1400",
    };

    return (
        <Container>
            <Row direction="horizontal" gap={1} className="d-flex justify-content-evenly mb-4">
                <Col xs={12} lg={5} className="d-flex flex-column align-items-end rounded-3 shadow pt-3 pb-3 ps-1 ps-sm-3 pe-1 pe-sm-3 mb-1" style={{backgroundColor: "#38383f"}}>
                    <TopThreeDriversContainer />
                    <Button
                        href="/driverStandings"
                        className="border-0 mt-1"
                        style={isHoveredDriver ? { ...baseStyle, ...hoverStyle } : baseStyle}
                        onMouseEnter={() => setIsHoveredDriver(true)}
                        onMouseLeave={() => setIsHoveredDriver(false)}
                    >
                        Full Drivers Standings &gt;
                    </Button>
                </Col>
                <Col xs={12} lg={5} className="d-flex flex-column align-items-end rounded-3 shadow pt-3 pb-3 ps-1 ps-sm-3 pe-1 pe-sm-3 mb-1" style={{backgroundColor: "#38383f"}}>
                    <TopThreeConstructorsContainer />
                    <Button
                        href="/constructorStandings"
                        className="border-0 mt-1"
                        style={isHoveredConstructor ? { ...baseStyle, ...hoverStyle } : baseStyle}
                        onMouseEnter={() => setIsHoveredConstructor(true)}
                        onMouseLeave={() => setIsHoveredConstructor(false)}
                    >
                        Full Constructors Standings &gt;
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}