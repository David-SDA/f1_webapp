import React from "react";

import { Col, Row } from "react-bootstrap";

export default function CurrentConstructorsThisSeasonRacesSprintHeaderContainer({
    driver1,
    driver1Code,
    driver2,
    driver2Code,
    driver3,
    driver3Code,
}){
    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }
    
    return (
        <Row className="bg-white mt-sm-0 ms-1 me-1 p-1 rounded">
            <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                <p className="d-none d-md-block mb-0 text-center" style={textBlack}>ROUND</p>
                <p className="d-block d-md-none mb-0 text-center" style={textBlack}>R</p>
            </Col>
            {
                driver3 ? (
                    <Col xs={6} sm={5} md={4} lg={4} className="p-0">
                        <p className="mb-0 text-center" style={textBlack}>GRAND PRIX</p>
                    </Col>
                ) : (
                    <Col xs={8} sm={7} md={6} lg={6} className="p-0">
                        <p className="mb-0 text-center" style={textBlack}>GRAND PRIX</p>
                    </Col>
                )
            }
            {
                driver3 ? (
                    <>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>{driver1}</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>{driver1Code}</p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>{driver2}</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>{driver2Code}</p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>{driver3}</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>{driver3Code}</p>
                        </Col>
                    </>
                ) : (
                    <>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>{driver1}</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>{driver1Code}</p>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>{driver2}</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>{driver2Code}</p>
                        </Col>
                    </>
                )
            }
            <Col md={1} lg={1} className="d-none d-md-block p-0">
                <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POINTS</p>
                <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>PTS</p>
            </Col>
        </Row>
    );
}