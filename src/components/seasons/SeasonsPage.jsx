import React, { useEffect, useState } from "react";

import { Card, Col, Container, Row, Spinner } from "react-bootstrap";

export default function SeasonsPage(){
    const [seasons, setSeasons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInfo = async () => {
        try{
            const seasonsResponse = await fetch("http://ergast.com/api/f1/seasons.json?limit=100");

            const seasonsData = await seasonsResponse.json();
            
            setSeasons(seasonsData.MRData.SeasonTable.Seasons);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    if(isLoading){
        return(
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textRegular}>Seasons</h1>
                <Row>
                    {
                        seasons.slice().reverse().map((season, index) => {
                            return (
                                <Col m={6} md={4} lg={3} xl={2} className="mb-2 p-1" key={index}>
                                    <a href={"#"} className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                                        <Card>
                                            <Card.Body>
                                                <Card.Title className="text-center" style={textBold}>{season?.season}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        )
    }
}