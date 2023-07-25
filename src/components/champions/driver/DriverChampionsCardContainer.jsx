import React from "react";

import { driversImages } from "../../../constants/driversImages";

import { Card, Col, ListGroup } from "react-bootstrap";

export default function DriverChampionsCardContainer({
    season,
    driverId,
    givenName,
    familyName,
    team,
    wins,
    points,
}){
    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    };

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    };

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    return (
        <Col className="mb-3" xs={12} sm={6} md={4} lg={3}>
            <Card className="rounded-5">
                <Card.Header className="text-center rounded-top-5" style={{backgroundColor: "#ff1801"}}>
                    <span className="text-white" style={textWide}>{season}</span>
                </Card.Header>
                <Card.Img className="mt-1" variant="top" src={driversImages[driverId]} style={{height: "150px", objectFit: "contain"}} />
                <Card.Body>
                    <Card.Title className="text-center">
                        <a href="#" className="link-dark link-underline-opacity-0 link-opacity-75-hover">
                            <span style={textRegular}>{givenName} <br/></span>
                            <span style={textBold}>{familyName}</span>
                        </a>
                    </Card.Title>
                    <ListGroup className="list-group list-group-flush">
                        <ListGroup.Item style={textBold}>
                            <a href="#" className="link-dark link-underline-opacity-0 link-opacity-75-hover fst-italic">
                                {team}
                            </a>
                        </ListGroup.Item>
                        <ListGroup.Item style={{fontStyle: "italic"}}>
                            <span style={textBold}>{wins} </span>
                            <span style={textRegular}>wins</span>
                        </ListGroup.Item>
                        <ListGroup.Item style={{fontStyle: "italic"}}>
                            <span style={textBold}>{points} </span>
                            <span style={textRegular}>points</span>
                        </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
    );
}