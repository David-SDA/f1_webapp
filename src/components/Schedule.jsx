import React, { useState } from "react";

import { Col, Container, Row } from "react-bootstrap";

export default function Schedule() {
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Container className="border border-primary">
            <h2 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2023 Schedule</h2>
            <Row>
                <Col sm={6} md={4} lg={3}>
                    <Container className="border border-black"><p>ici</p></Container>
                </Col>
            </Row>
        </Container>
    );
}
