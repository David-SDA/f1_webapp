import React from "react";

import { Card, Col, Image } from "react-bootstrap";

export default function CurrentConstructorsCard({
    constructorId,
    color,
    imageFlag,
    name,
    imageTeam,
}){
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    return (
        <Col md={6} lg={4} xl={3} className="mb-2">
            <Card className="rounded-5 overflow-hidden" style={{height: "240px"}}>
                <a href={"/currentConstructors/" + constructorId} className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                    <Card.Header className="d-flex flex-row justify-content-center align-items-center text-white rounded-top-5 pt-3 pb-3" style={{backgroundColor: color}}>
                        <Image src={imageFlag} rounded className="me-1 border" style={{height: 25}} />
                        <p className="mb-0" style={textBold}>{name}</p>
                    </Card.Header>
                    <Card.Body className="d-flex flex-row justify-content-center align-items-center">
                        <Image src={imageTeam} className="rounded-0" style={{height: "150px", objectFit: "cover"}} />
                    </Card.Body>
                </a>
            </Card>
        </Col>
    );
}