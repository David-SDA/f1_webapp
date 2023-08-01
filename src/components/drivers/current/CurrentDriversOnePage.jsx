import React, { useEffect, useState } from "react";

import CurrentDriversDetailsContainer from "./CurrentDriversDetailsContainer";
import CurrentDriversThisSeasonStatsContainer from "./CurrentDriversThisSeasonStatsContainer";
import { currentDrivers } from "../../../constants/currentDrivers";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function CurrentDriversOnePage(){
    let { driverId } = useParams();

    const [standing, setStanding] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/driverStandings.json");
            const response2 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/results.json")

            const data1 = await response1.json();
            const data2 = await response2.json();

            setStanding(data1.MRData.StandingsTable.StandingsLists[0]);
            setDriverResults(data2.MRData.RaceTable.Races);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {    
        fetchInfo();
    }, [])
    
    // Calcul du nombre de podiums
    const getPodiums = () => {
        let podiums = 0;
        for(const driverResult of driverResults){
            const position = driverResult?.Results[0]?.position;
            if(["1", "2", "3"].includes(position)){
                podiums++;
            }
        }
        return podiums;
    }

    let nbPodiums = getPodiums();

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
        const dateOfBirth = new Date(standing?.DriverStandings[0]?.Driver?.dateOfBirth);

        return (
            <Container>
                <h1 className="fst-italic mt-1">
                    <span style={textRegular}>{standing?.DriverStandings[0]?.Driver?.givenName}</span> <span style={textBold}>{standing?.DriverStandings[0]?.Driver?.familyName}</span>
                </h1>
                <CurrentDriversDetailsContainer
                    image={currentDrivers[driverId]}
                    flagNationality={flagsNationality[standing?.DriverStandings[0]?.Driver?.nationality]}
                    nationality={standing?.DriverStandings[0]?.Driver?.nationality}
                    dateOfBirth={dateOfBirth}
                    permanentNumber={standing?.DriverStandings[0]?.Driver?.permanentNumber}
                    team={currentConstructorSmallText[standing?.DriverStandings[0]?.Constructors[0]?.constructorId]}
                />
                <h2 className="fst-italic mt-2" style={textRegular}>THIS SEASON, AFTER ROUND {standing?.round}</h2>
                <CurrentDriversThisSeasonStatsContainer
                    position={standing?.DriverStandings[0]?.positionText}
                    points={standing?.DriverStandings[0]?.points}
                    wins={standing?.DriverStandings[0]?.wins}
                    nbPodiums={nbPodiums}
                />
                <h2 className="fst-italic mt-2" style={textRegular}>RACES</h2>
                <Container className="d-flex flex-column mb-2 p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                    <Row className="bg-white mt-2 mt-sm-0 ms-1 me-1 mb-2 p-1 rounded">
                        <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                            <p className="d-none d-md-block mb-0 text-center" style={textBlack}>ROUND</p>
                            <p className="d-block d-md-none mb-0 text-center" style={textBlack}>R</p>
                        </Col>
                        <Col xs={6} sm={7} md={6} lg={4} className="p-0">
                            <p className="mb-0 text-center" style={textBlack}>GRAND PRIX</p>
                        </Col>
                        <Col md={1} lg={1} className="d-none d-md-block p-0">
                            <p className="mb-0 text-center" style={textBlack}>GRID</p>
                        </Col>
                        <Col xs={2} sm={1} md={1} lg={1} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POSITION</p>
                            <p className="d-none d-sm-block d-lg-none mb-0 text-center" style={textBlack}>POS</p>
                            <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>P</p>
                        </Col>
                        <Col xs={4} sm={3} md={2} lg={4} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>TIME/STATUS</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>TIME</p>
                        </Col>
                        <Col md={1} lg={1} className="d-none d-md-block p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POINTS</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>PTS</p>
                        </Col>
                    </Row>
                    {
                        [...driverResults].reverse().map((driverResult, index) => {
                            return (
                                <Row className="bg-white ms-1 me-1 mb-2 p-1 rounded" key={index}>
                                    <Col sm={1} md={1} lg={1} className="d-none d-sm-flex justify-content-center align-items-center p-0">
                                        <p className="mb-0 text-center" style={textBlack}>{driverResult?.round}</p>
                                    </Col>
                                    <Col xs={6} sm={7} md={6} lg={4} className="d-flex justify-content-center align-items-center p-0">
                                        <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                                            <p className="d-flex d-sm-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "3em"}}>{driverResult?.raceName}</p>
                                            <p className="d-none d-sm-flex align-items-center mb-0 text-center" style={textBold}>{driverResult?.raceName}</p>
                                        </a>
                                    </Col>
                                    <Col md={1} lg={1} className="d-flex justify-content-center align-items-center d-none d-md-block p-0">
                                        <p className="mb-0 text-center" style={textBold}>{driverResult?.Results[0]?.grid}</p>
                                    </Col>
                                    <Col xs={2} sm={1} md={1} lg={1} className="d-flex justify-content-center align-items-center p-0">
                                        <p className="mb-0 text-center" style={textBold}>{driverResult?.Results[0]?.positionText}</p>
                                    </Col>
                                    <Col xs={4} sm={3} md={2} lg={4} className="d-flex justify-content-center align-items-center p-0">
                                        {
                                            driverResult?.Results[0]?.Time ? (
                                                <p className="mb-0 text-center" style={textRegular}>
                                                    <span className="rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{driverResult?.Results[0]?.Time?.time}</span>
                                                </p>
                                            ) : (
                                                <p className="mb-0 text-center" style={textRegular}>
                                                    <span className="rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{driverResult?.Results[0]?.status}</span>
                                                </p>
                                            )
                                        }
                                    </Col>
                                    <Col md={1} lg={1} className="d-flex justify-content-center align-items-center d-none d-md-block p-0">
                                        <p className="mb-0 text-center" style={textBlack}>{driverResult?.Results[0]?.points}</p>
                                    </Col>
                                </Row>
                            );
                        })
                    }
                </Container>
            </Container>
        );
    }
}