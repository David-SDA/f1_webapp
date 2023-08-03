import React from "react";
import { Card, Col } from "react-bootstrap";

export default function AllDriversCardContainer({
    driverId,
    givenName,
    familyName,
    nationality,
}){
    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }
    return (
        <Col sm={6} md={4} lg={2} className="mb-2 p-1">
            <a href={"/allDrivers/" + driverId} className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                <Card style={{height: "8rem"}}>
                    <Card.Body>
                        <Card.Title>
                            <span style={textRegular}>{givenName}</span> <span style={textBold}>{familyName}</span>
                        </Card.Title>
                        <Card.Subtitle className="link-underline-opacity-0-hover">
                            <span className="fst-italic" style={textRegular}>{nationality}</span>
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </a>
        </Col>
    );
}