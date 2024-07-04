import React from "react";

import { Col, Row } from "react-bootstrap";

export default function CurrentConstructorsThisSeasonRacesSprintContentContainer({
    round,
    race,
    driver1Position,
    driver2Position,
    driver3Position,
    points,
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
        <Row className="bg-white mt-2 ms-1 me-1 p-1 rounded d-flex justify-content-center align-items-center p-0">
            <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                <p className="mb-0 text-center" style={textBlack}>{round}</p>
            </Col>
            {
                driver3Position ? (
                    <Col xs={6} sm={5} md={4} lg={4} className="d-flex justify-content-center p-0">
                        <a href={"/schedule/" + round} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                            <p className="d-flex d-sm-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "5em"}}>{race}</p>
                            <p className="d-none d-sm-flex d-lg-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "3em"}}>{race}</p>
                            <p className="d-none d-lg-flex align-items-center mb-0 text-center" style={textBold}>{race}</p>
                        </a>
                    </Col>
                ) : (
                    <Col xs={8} sm={7} md={6} lg={6} className="d-flex justify-content-center p-0">
                        <a href={"/schedule/" + round} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                            <p className="d-flex d-sm-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "3em"}}>{race}</p>
                            <p className="d-none d-sm-flex align-items-center mb-0 text-center" style={textBold}>{race}</p>
                        </a>
                    </Col>
                )
            }
            {
                driver3Position ? (
                    <>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="mb-0 text-center" style={textBold}>{driver1Position}</p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="mb-0 text-center" style={textBold}>{driver2Position}</p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="mb-0 text-center" style={textBold}>{driver3Position}</p>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="mb-0 text-center" style={textBold}>{driver1Position}</p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="mb-0 text-center" style={textBold}>{driver2Position}</p>
                        </Col>
                    </>
                )
            }
            <Col md={1} lg={1} className="d-none d-md-block p-0">
                <p className="mb-0 text-center" style={textBlack}>{points}</p>
            </Col>
        </Row>
    );
}