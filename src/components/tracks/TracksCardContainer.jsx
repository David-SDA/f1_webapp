import React from "react";

import { Card, Col, Image, ListGroup } from "react-bootstrap";

export default function TracksCardContainer({
    circuitName,
    imageTrack,
    imageCountry,
    country,
    locality,
}){
    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    };

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    return (
        <Col xs={12} sm={12} md={6} lg={4} xxl={3}>
            <Card className="mb-2 rounded-top-5 overflow-hidden">
                <a href="###" className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                    <Card.Header className="d-flex justify-content-center align-items-center p-2 text-center rounded-top-5" style={{backgroundColor: "#ff1801", height: "80px"}}>
                        <span className="text-white" style={textWide}>{circuitName}</span>
                    </Card.Header>
                    <Card.Body>
                        <Card.Img variant="top" src={imageTrack} style={{height: "150px", objectFit: "contain"}} />
                        <ListGroup variant="flush">
                            <ListGroup.Item style={textBold}>
                                <Image src={imageCountry} rounded className="me-1 border" style={{height: 25}} />
                                    {country}
                            </ListGroup.Item>
                            <ListGroup.Item style={textRegular}>
                                {locality}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </a>
            </Card>
        </Col>
    );
}