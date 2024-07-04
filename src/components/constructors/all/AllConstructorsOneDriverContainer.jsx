import React from "react";

import { flagsNationality } from "../../../constants/flagsNationality";

import { Card, Col, Image } from "react-bootstrap";

export default function AllConstructorsOneDriverContainer({
    driver,
    driverId,
    nationality,
    seasons
}){
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    return (
        <Col md={6} lg={4} xl={3} className="mt-1 mb-1">
            <Card>
                <a href={"/allDrivers/" + driverId} className="p-2 link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                    <Card.Title className="d-flex justify-content-center" style={textBold}>
                        {driver}
                    </Card.Title>
                    <Card.Subtitle className="d-flex justify-content-center align-items-center">
                        <Image src={flagsNationality[nationality]} rounded className="me-1 border" style={{height: 20}} />
                        <span className="fst-italic" style={textRegular}>{nationality}</span>
                    </Card.Subtitle>
                        <Card.Body className="text-center ps-0 pe-0" style={{...textRegular, height: "6rem"}}>
                            {seasons.join(', ')}
                        </Card.Body>
                </a>
            </Card>
        </Col>
    )
}