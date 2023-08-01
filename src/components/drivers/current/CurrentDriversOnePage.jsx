import React, { useEffect, useState } from "react";

import CurrentDriversDetailsContainer from "./CurrentDriversDetailsContainer";
import CurrentDriversThisSeasonStatsContainer from "./CurrentDriversThisSeasonStatsContainer";
import CurrentDriversThisSeasonRacesHeaderContainer from "./thisSeasonRaces/CurrentDriversThisSeasonRacesHeaderContainer";
import { currentDrivers } from "../../../constants/currentDrivers";
import { flagsNationality } from "../../../constants/flagsNationality";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CurrentDriversThisSeasonRacesContentContainer from "./thisSeasonRaces/CurrentDriversThisSeasonRacesContentContainer";

export default function CurrentDriversOnePage(){
    let { driverId } = useParams();

    const [standing, setStanding] = useState([]);
    const [driverResults, setDriverResults] = useState([]);
    const [driverQualifyings, setDriverQualifyings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/driverStandings.json");
            const response2 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/results.json");
            const response3 = await fetch("http://ergast.com/api/f1/current/drivers/" + driverId + "/qualifying.json")

            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();

            setStanding(data1.MRData.StandingsTable.StandingsLists[0]);
            setDriverResults(data2.MRData.RaceTable.Races);
            setDriverQualifyings(data3.MRData.RaceTable.Races);
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
                <Container className="d-flex flex-column mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <CurrentDriversThisSeasonRacesHeaderContainer />
                    {
                        [...driverResults].reverse().map((driverResult, index) => {
                            return (
                                <CurrentDriversThisSeasonRacesContentContainer
                                    key={index}
                                    round={driverResult?.round}
                                    raceName={driverResult?.raceName}
                                    grid={driverResult?.Results[0]?.grid}
                                    position={driverResult?.Results[0]?.positionText}
                                    time={driverResult?.Results[0]?.Time?.time}
                                    status={driverResult?.Results[0]?.status}
                                    points={driverResult?.Results[0]?.points}
                                />
                            );
                        })
                    }
                </Container>
                <h2 className="fst-italic mt-2" style={textRegular}>QUALIFYING</h2>
                <Container className="d-flex flex-column mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <Row className="bg-white mt-sm-0 ms-1 me-1 p-1 rounded">
                        <Col sm={1} md={1} lg={1} className="d-none d-sm-block p-0">
                            <p className="d-none d-md-block mb-0 text-center" style={textBlack}>ROUND</p>
                            <p className="d-block d-md-none mb-0 text-center" style={textBlack}>R</p>
                        </Col>
                        <Col xs={8} sm={4} md={4} lg={4} className="p-0">
                            <p className="d-none d-sm-block mb-0 text-center" style={textBlack}>GRAND PRIX</p>
                            <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>GP</p>
                        </Col>
                        <Col xs={4} sm={1} md={1} lg={1} className="p-0">
                            <p className="d-none d-lg-block mb-0 text-center" style={textBlack}>POSITION</p>
                            <p className="d-block d-lg-none mb-0 text-center" style={textBlack}>POS</p>
                            
                        </Col>
                        <Col sm={2} md={2} lg={2} className="d-none d-sm-block p-0">
                            <p className="mb-0 text-center" style={textBlack}>Q1</p>
                        </Col>
                        <Col sm={2} md={2} lg={2} className="d-none d-sm-block">
                            <p className="mb-0 text-center" style={textBlack}>Q2</p>
                        </Col>
                        <Col sm={2} md={2} lg={2} className="d-none d-sm-block">
                            <p className="mb-0 text-center" style={textBlack}>Q3</p>
                        </Col>
                    </Row>
                    {
                        [...driverQualifyings].reverse().map((driverQualifying, index) => {
                            return (
                                <Row className="bg-white ms-1 me-1 mt-2 p-1 rounded" key={index}>
                                    <Col sm={1} md={1} lg={1} className="d-none d-sm-flex p-0 justify-content-center align-items-center ">
                                        <p className="mb-0 text-center" style={textBlack}>{driverQualifying?.round}</p>
                                    </Col>
                                    <Col xs={8} sm={4} md={4} lg={4} className="d-flex justify-content-center align-items-center p-0">
                                        <a href="#" className="link-dark link-underline-opacity-0 link-underline-opacity-50-hover">
                                            <p className="d-flex d-lg-none align-items-center mb-0 text-center" style={{...textBold, minHeight: "3em"}}>{driverQualifying?.raceName}</p>
                                            <p className="d-none d-lg-flex align-items-center mb-0 text-center" style={textBold}>{driverQualifying?.raceName}</p>
                                        </a>
                                    </Col>
                                    <Col xs={4} sm={1} md={1} lg={1} className="d-flex justify-content-center align-items-center p-0">
                                        <p className="mb-0 text-center" style={textBold}>{driverQualifying?.QualifyingResults[0]?.position}</p>
                                    </Col>
                                    <Col sm={2} md={2} lg={2} className="d-none d-sm-flex justify-content-center align-items-center p-0">
                                        <p className="mb-0 text-center" style={textRegular}>
                                            {
                                                driverQualifying?.QualifyingResults[0]?.Q1 ? (
                                                    <>
                                                        <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{driverQualifying?.QualifyingResults[0]?.Q1}</span>
                                                        <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>{driverQualifying?.QualifyingResults[0]?.Q1}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                                        <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>--:--:---</span>
                                                    </>
                                                )
                                            }
                                        </p>
                                    </Col>
                                    <Col sm={2} md={2} lg={2} className="d-none d-sm-flex justify-content-center align-items-center p-0">
                                        <p className="mb-0 text-center" style={textRegular}>
                                            {
                                                driverQualifying?.QualifyingResults[0]?.Q2 ? (
                                                    <>
                                                        <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{driverQualifying?.QualifyingResults[0]?.Q2}</span>
                                                        <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>{driverQualifying?.QualifyingResults[0]?.Q2}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                                        <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>--:--:---</span>
                                                    </>
                                                )
                                            }
                                        </p>
                                    </Col>
                                    <Col sm={2} md={2} lg={2} className="d-none d-sm-flex justify-content-center align-items-center p-0">
                                        <p className="mb-0 text-center" style={textRegular}>
                                            {
                                                driverQualifying?.QualifyingResults[0]?.Q3 ? (
                                                    <>
                                                        <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{driverQualifying?.QualifyingResults[0]?.Q3}</span>
                                                        <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>{driverQualifying?.QualifyingResults[0]?.Q3}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="d-none d-md-block rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>--:--:---</span>
                                                        <span className="d-block d-md-none rounded-5 p-1" style={{backgroundColor: "#e8e8e8", fontSize: 14}}>--:--:---</span>
                                                    </>
                                                )
                                            }
                                        </p>
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