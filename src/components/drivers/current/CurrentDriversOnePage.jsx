import React, { useEffect, useState } from "react";

import { currentDrivers } from "../../../constants/currentDrivers";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CurrentDriversOnePage(){
    let { driverId } = useParams();

    const [standing, setStanding] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/driverStandings.json");
            const response2 = await fetch("http://ergast.com/api/f1/current/drivers/" + {driverId} + "/results.json")

            const data1 = await response1.json();
            const data2 = await response2.json();

            setStanding(data1.MRData.StandingsTable.StandingsLists[0]);
            setRaceResults(data2.MRData.RaceTable.Races[0]);
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
        // calcul de l'âge
        const dateOfBirth = new Date(standing?.DriverStandings[0]?.Driver?.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dateOfBirth.getFullYear();
        let monthDiff = today.getMonth() - today.getMonth();

        if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())){
            age--;
        }

        return (
            <Container>
                <h1 className="fst-italic mt-1">
                    <span style={textRegular}>{standing?.DriverStandings[0]?.Driver?.givenName}</span> <span style={textBold}>{standing?.DriverStandings[0]?.Driver?.familyName}</span>
                </h1>
                <Row className="mb-2 mb-md-0">
                    <Col md={6} lg={4} className="d-flex justify-content-center align-items-center mb-2 mb-md-0">
                        <Image src={currentDrivers[driverId]} className="img-fluid rounded-4" style={{maxHeight: "300px", objectFit: "contain"}} />
                    </Col>
                    <Col md={6} lg={8} className="d-flex flex-column justify-content-center">
                        <Row>
                            <Col lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <p className="mb-0" style={textBlack}>NATIONALITY</p>
                                    <div className="d-flex flex-row justify-content-center align-items-center">
                                        <Image src={flagsNationality[standing?.DriverStandings[0]?.Driver?.nationality]} rounded className="me-1 border" style={{height: 25}} />
                                        <p className="mb-0" style={{...textBold, fontSize: "24px"}}>{standing?.DriverStandings[0]?.Driver?.nationality}</p>
                                    </div>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <p className="mb-0" style={textBlack}>DATE OF BIRTH</p>
                                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{dateOfBirth.toLocaleDateString("en")} ({age} y/o)</p>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <p className="mb-0" style={textBlack}>NUMBER</p>
                                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{standing?.DriverStandings[0]?.Driver?.permanentNumber}</p>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col lg={6}>
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <p className="mb-0" style={textBlack}>TEAM</p>
                                    <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{currentConstructorSmallText[standing?.DriverStandings[0]?.Constructors[0]?.constructorId]}</p>
                                    <div></div>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <h2 className="fst-italic mt-2" style={textRegular}>THIS SEASON, AFTER ROUND {standing?.round}</h2>
                <Row className="mb-2">
                    <Col lg={3} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>POSITION IN STANDINGS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{standing?.DriverStandings[0]?.positionText}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={3} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>POINTS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{standing?.DriverStandings[0]?.points}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={3} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>WINS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>{standing?.DriverStandings[0]?.wins}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col lg={3} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>PODIUMS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "24px"}}>..</p>
                            <div></div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}