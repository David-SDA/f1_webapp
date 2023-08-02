import React, { useEffect, useState } from "react";

import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentConstructorImage } from "../../../constants/currentConstructorImage";

import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";

export default function CurrentConstructorsPage(){
    const [constructors, setConstructors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/current/constructors.json");
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

    const textBlack = {
        fontFamily: "Formula1-Black",
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
                <h1 className="fst-italic mt-1" style={textRegular}>F1 2023 : Constructors</h1>
                <Row>
                    {
                        constructors.map((constructor, index) => {
                            return (
                                <Col md={6} lg={4} xl={3} className="mb-2" key={index}>
                                    <Card className="rounded-5 overflow-hidden" style={{height: "240px"}}>
                                        <a href="#" className="link-light link-underline-opacity-0 link-underline-opacity-100-hover">
                                            <Card.Header className="d-flex flex-row justify-content-center align-items-center text-white rounded-top-5 pt-3 pb-3" style={{backgroundColor: currentConstructorColor[constructor?.constructorId]}}>
                                                <Image src={flagsNationality[constructor?.nationality]} rounded className="me-1 border" style={{height: 25}} />
                                                <p className="mb-0" style={textBold}>{constructor?.name}</p>
                                            </Card.Header>
                                            <Card.Body className="d-flex flex-row justify-content-center align-items-center">
                                                <Image src={currentConstructorImage[constructor?.constructorId]} className="rounded-0" style={{height: "150px", objectFit: "cover"}} />
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