import React, { useEffect, useState } from "react";

import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { allTracks } from "../../../constants/allTracks";

export default function AllTracksOnePage(){
    let { circuitId } = useParams();

    const [circuit, setCircuit] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/circuits/monza.json")
            const data = await response.json();
            setCircuit(data.MRData.CircuitTable.Circuits[0])
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic" style={textRegular}>{circuit?.circuitName}</h1>
                <Row>
                    <Col lg={6} className="d-flex justify-content-center align-items-center">
                        <Image src={allTracks[circuitId]} style={{height: "300px", objectFit: "contain"}}/>
                    </Col>
                    <Col lg={6} className="bg-warning">
                        <Row>
                            <Col lg={6}>
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>COUNTRY</span>
                                    <span className="text-center" style={textBold}>{circuit?.Location?.country}</span>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col lg={6} className="bg-secondary">
                                <span>{circuit?.Location?.locality}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}