import React, { useState } from "react";

import { Container, Button, Row, Col } from "react-bootstrap";

export default function AllTracksRacesListContainer({
    races
}){
    const [showAllRaces, setShowAllRaces] = useState(false);

    const handleDisplayMoreRaces = () => {
        setShowAllRaces(!showAllRaces);
    }

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    return (
        <Container className="d-flex flex-column p-1 rounded-3" style={{backgroundColor: "#38383f"}}>
            <Row className="bg-white m-1 p-1 w-auto rounded-3">
                <Col xs={3} sm={2} md={2} lg={3} className="p-0">
                    <p className="mb-0 text-center" style={textBlack}>
                        SEASON
                    </p>
                </Col>
                <Col xs={6} sm={8} md={8} lg={6} className="p-0">
                    <p className="d-none d-sm-block mb-0 text-center" style={textBlack}>
                        GRAND PRIX NAME
                    </p>
                    <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>
                        GP
                    </p>
                </Col>
                <Col xs={3} sm={2} md={2} lg={3} className="p-0">
                    <p className="mb-0 text-center" style={textBlack}>
                        DATE
                    </p>
                </Col>
            </Row>
            {
                races.slice().reverse().slice(0, showAllRaces ? races.length : 5).map((race, index) => {
                    let raceDate = new Date(race?.date);
                    return (
                        <Row key={index} className="bg-white m-1 p-2 w-auto rounded-3">
                            <Col xs={3} sm={2} md={2} lg={3}>
                                <p className="mb-0 text-center" style={textBold}>
                                    <a href={"/seasons/" + race?.season} className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                        {race?.season}
                                    </a>
                                </p>
                            </Col>
                            <Col xs={6} sm={8} md={8} lg={6}>
                                <p className="mb-0 text-center" style={textBold}>
                                    <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                        {race?.raceName}
                                    </a>
                                </p>
                            </Col>
                            <Col xs={3} sm={2} md={2} lg={3}>
                                <p className="mb-0 text-center" style={textRegular}>
                                    {raceDate.toLocaleDateString("en-GB", {day: "2-digit", month: "short"})}
                                </p>
                            </Col>
                        </Row>
                    );
                })
            }
            {
                races.length > 5 ? (
                    <Button variant="outline-light" size="sm" className="align-self-center mt-1" onClick={handleDisplayMoreRaces}>
                        {showAllRaces ? "Show less" : "Show More"}
                    </Button>
                ) : ("")
            }
        </Container>
    );
}