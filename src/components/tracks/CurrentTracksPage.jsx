import React, { useEffect, useState } from "react";

import { currentYearTracks } from "../../constants/currentYearTracks";
import { flags } from "../../constants/flags";

import { Card, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";

export default function CurrentTracksPage() {
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/current/circuits.json");
            const data = await response.json();
            setTracks(data.MRData.CircuitTable.Circuits);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

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

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic" style={textRegular}>F1 2023 : Tracks</h1>
                <Row>
                    {
                        tracks.map((track, index) => {
                            return (
                                <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
                                    <Card className="mb-2 rounded-top-5">
                                        <a href="###" className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                                            <Card.Header className="d-flex justify-content-center align-items-center p-2 text-center rounded-top-5" style={{backgroundColor: "#ff1801", height: "80px"}}>
                                                <span className="text-white" style={textWide}>{track?.circuitName}</span>
                                            </Card.Header>
                                            <Card.Body>
                                                <Card.Img variant="top" src={currentYearTracks[track?.circuitId]} style={{height: "150px", objectFit: "contain"}} />
                                                <ListGroup variant="flush">
                                                    <ListGroup.Item style={textBold}>
                                                        <Image src={flags[track?.Location?.country]} rounded className="me-1 border" style={{height: 25}} />
                                                        {track?.Location?.country}
                                                    </ListGroup.Item>
                                                    <ListGroup.Item style={textRegular}>
                                                        {track?.Location?.locality}
                                                    </ListGroup.Item>
                                                </ListGroup>
                                            </Card.Body>
                                        </a>
                                    </Card>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
