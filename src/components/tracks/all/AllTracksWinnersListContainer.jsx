import React, { useState } from "react";

import { Col, Container, Button, Row } from "react-bootstrap";

export default function AllTracksWinnersListContainer({
    sortedWinners,
    nbWinners,
}){
    const [showAllWinners, setShowAllWinners] = useState(false);

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

    const handleDisplayMoreWinners = () => {
        setShowAllWinners(!showAllWinners);
    }

    return (
        <Container className="d-flex flex-column p-1 rounded-3" style={{backgroundColor: "#38383f"}}>
            <Row className="bg-white m-1 p-1 w-auto rounded-3">
                <Col xs={6} sm={5} md={5} lg={5} className="p-0">
                    <p className="mb-0 text-center" style={textBlack}>
                        DRIVER
                    </p>
                </Col>
                <Col xs={3} sm={2} md={2} lg={2} className="p-0">
                    <p className="mb-0 text-center" style={textBlack}>
                        WINS
                    </p>
                </Col>
                <Col xs={3} sm={5} md={5} lg={5} className="p-0">
                    <p className="mb-0 text-sm-center" style={textBlack}>
                        YEARS
                    </p>
                </Col>
            </Row>
            {
                sortedWinners.slice(0, showAllWinners ? sortedWinners.length : 5).map(([winnerId, { name, wins, years }], index) => (
                    <Row key={index} className="bg-white m-1 p-1 w-auto rounded-3">
                        <Col xs={6} sm={5} md={5} lg={5} className="d-flex justify-content-center align-items-center">
                            <a href={"/allDrivers/" + winnerId} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover" >
                                <p className="text-center mb-0" style={textBold}>{name}</p>
                            </a>
                        </Col>
                        <Col xs={3} sm={2} md={2} lg={2} className="d-flex justify-content-center align-items-center">
                            <p className="text-center mb-0" style={textBold}>{wins}</p>
                        </Col>
                        <Col xs={3} sm={5} md={5} lg={5} className="d-flex justify-content-center align-items-center">
                            <p className="text-center mb-0" style={textRegular}>
                                {
                                    years.map((year, index) => (
                                        <a href={"/seasons/" + year} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover" key={index}>
                                            <span style={textBold}>
                                                {index === 0 ? year : ", " + year}
                                            </span>
                                        </a>
                                    ))
                                }
                            </p>
                        </Col>
                    </Row>
                ))
            }
            {
                nbWinners > 5 ? (
                    <Button variant="outline-light" size="sm" className="align-self-center mt-1" onClick={handleDisplayMoreWinners}>
                        {showAllWinners ? "Show less" : "Show More"}
                    </Button>
                ) : ("")
            }
        </Container>
    )
}