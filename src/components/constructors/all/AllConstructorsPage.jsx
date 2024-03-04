import React, { useEffect, useState } from "react";

import { flagsNationality } from "../../../constants/flagsNationality";

import { Container, Row, Col, Spinner, Card, Image } from "react-bootstrap";

export default function AllConstructorsPage(){
    const [constructors, setConstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/constructors.json?limit=250");
            const data = await response.json();
            setConstructors(data.MRData.ConstructorTable.Constructors);
        }catch(error){
            console.log(error);
        }finally{
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
                <h1 className="fst-italic mt-1" style={textRegular}>All Constructors</h1>
                <Row>
                    {
                        constructors.map((constructor, index)=>{
                            return (
                                <Col sm={6} md={4} lg={3} xl={2} className="mb-2 p-1" key={index}>
                                    <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                                        <Card style={{height: "8rem"}}>
                                            <Card.Body className="d-flex flex-column justify-content-between">
                                                <Card.Title>
                                                    <span style={textBold}>{constructor?.name}</span>
                                                </Card.Title>
                                                <Card.Subtitle className="d-flex align-items-center">
                                                    <Image src={flagsNationality[constructor?.nationality]} rounded className="me-1 border" style={{height: 20}} />
                                                    <span className="fst-italic" style={textRegular}>{constructor?.nationality}</span>
                                                </Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </a>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        )
    }
}