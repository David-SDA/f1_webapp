import React from "react";

import { Col, Row } from "react-bootstrap";

export default function AllConstructorsTitleListContent({
    season,
    points,
    wins
}){
    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    return (
        <Row className="bg-white mt-2 ms-1 me-1 p-1 rounded">
            <Col xs={4} className="ps-0 pe-0">
                <p className="mb-0 text-center" style={textBlack}>
                    <a href={"/seasons/" + season} className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                        {season}
                    </a>
                </p>
            </Col>
            <Col xs={4} className="ps-0 pe-0">
                <p className="mb-0 text-center" style={textBlack}>{points}</p>
            </Col>
            <Col xs={4} className="ps-0 pe-0">
                <p className="mb-0 text-center" style={textBlack}>{wins}</p>
            </Col>
        </Row>
    )
}