import React from "react";

import { Card, Col, Image } from "react-bootstrap";

export default function AllConstructorsCardContainer({
    constructorId,
    nationality,
    imageFlag,
    name,
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
        <Col sm={6} md={4} lg={3} xl={2} className="mb-2 p-1">
            <a href={"/allConstructors/" + constructorId} className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                <Card style={{height: "8rem"}}>
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title>
                            <span style={textBold}>{name}</span>
                        </Card.Title>
                        <Card.Subtitle className="d-flex align-items-center">
                            <Image src={imageFlag} rounded className="me-1 border" style={{height: 20}} />
                            <span className="fst-italic" style={textRegular}>{nationality}</span>
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </a>
        </Col>
    )
}