import React from "react";

import { constructorImage } from "../../../constants/constructorImage"

import { Card, Col, Image, ListGroup } from "react-bootstrap";

export default function ConstructorChampionsCardContainer({
    season,
    constructorId,
    name,
    wins,
    points,
    image,
    nationality
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
        <Col className="mb-3" xs={12} sm={6} md={6} lg={4} xl={3}>
            <Card className="rounded-5">
                <Card.Header className="text-center rounded-top-5" style={{backgroundColor: "#ff1801"}}>
                    <span className="text-white" style={textWide}>{season}</span>
                </Card.Header>
                <Card.Img className="mt-1" variant="top" src={constructorImage[constructorId]} style={{height: "150px", objectFit: "contain"}} />
                <Card.Body>
                    <Card.Title className="text-center">
                        <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                            <span style={textBold}>{name}</span>
                        </a>
                    </Card.Title>
                    <ListGroup className="list-group list-group-flush">
                        <ListGroup.Item className="d-flex flex-row justify-content-center align-items-center ps-2 pe-2" style={{fontStyle: "italic"}}>
                            <Image src={image} rounded className="me-1 border" style={{height: 25}} />
                            <span style={textBold}>{nationality}</span>
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