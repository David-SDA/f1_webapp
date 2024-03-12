import React from "react";

import { Card, Col } from "react-bootstrap";

export default function SeasonsCardContainer({
    season
}){
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    return (
        <Col m={6} md={4} lg={3} xl={2} className="mb-2 p-1">
            <a href={"#"} className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                <Card>
                    <Card.Body>
                        <Card.Title className="text-center" style={textBold}>{season}</Card.Title>
                    </Card.Body>
                </Card>
            </a>
        </Col>
    )
}