import React, { useEffect, useState } from "react";

import { currentConstructorImage } from "../../../constants/currentConstructorImage";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentDriversSideImage } from "../../../constants/currentDriversSideImage";

import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CurrentConstuctorsOnePage(){
    let { constructorId } = useParams();

    const [standing, setStanding] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/current/constructors/" + constructorId + "/constructorStandings.json");
            const response2 = await fetch("http://ergast.com/api/f1/current/constructors/" + constructorId + "/drivers.json");

            const data1 = await response1.json();
            const data2 = await response2.json();

            setStanding(data1.MRData.StandingsTable.StandingsLists[0]);
            setDrivers(data2.MRData.DriverTable.Drivers);
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
                <h1 className="fst-italic mt-1">
                    <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                        <span style={textBold}>{standing?.ConstructorStandings[0]?.Constructor?.name}</span>
                    </a>
                </h1>
                <Row className="mb-2 mb-md-0">
                    <Col md={6} lg={4} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
                        <Image src={currentConstructorImage[constructorId]} className="img-fluid rounded-4" style={{maxHeight: "300px", objectFit: "contain"}} />
                    </Col>
                    <Col md={6} lg={8} className="d-flex flex-column justify-content-center">
                        <Row className="d-flex justify-content-center">
                            <Col lg={12} className="mb-2">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <p className="mb-0" style={textBlack}>NATIONALITY</p>
                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                        <Image src={flagsNationality[standing?.ConstructorStandings[0]?.Constructor?.nationality]} rounded className="me-1 border" style={{height: 25}} />
                                        <p className="mb-0" style={{...textBold, fontSize: "24px"}}>{standing?.ConstructorStandings[0]?.Constructor?.nationality}</p>
                                    </div>
                                    <div></div>
                                </Container>
                            </Col>
                            {
                                drivers.map((driver, index) => {
                                    return (
                                        <Col lg={6} className="mb-3" key={index}>
                                            <Container className="d-flex flex-column justify-content-between rounded-4" style={{height: "200px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                                <div className="d-flex justify-content-between">
                                                    <div className="d-flex">
                                                        <Image src={flagsNationality[driver?.nationality]} rounded className="me-1 border" style={{height: 25}} />
                                                        <p className="mb-0 fst-italic">
                                                            <span style={textRegular}>{driver?.givenName}</span> <span style={textBold}>{driver?.familyName}</span>
                                                        </p>
                                                    </div>
                                                    <p className="mb-0 fst-italic" style={{...textBlack, fontSize: 20}}>
                                                        {driver?.permanentNumber}
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-center">
                                                    <Image src={currentDriversSideImage[driver?.driverId]} style={{height: 160, width: 160}} />
                                                </div>
                                            </Container>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    </Col>
                </Row>
                <h2 className="fst-italic mt-2" style={textRegular}>THIS SEASON, AFTER ROUND {standing?.round}</h2>
            </Container>
        );
    }
}