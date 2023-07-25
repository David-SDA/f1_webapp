import React from "react";

import { Container, Row } from "react-bootstrap";
import DriverChampionsCardContainer from "./DriverChampionsCardContainer";

export default function DriverChampionsPage() {
    return (
        <Container>
            <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>Driver Champions</h1>
            <Row>
                <DriverChampionsCardContainer />
                <DriverChampionsCardContainer />
                <DriverChampionsCardContainer />
                <DriverChampionsCardContainer />
                <DriverChampionsCardContainer />
            </Row>
        </Container>
    );
}
