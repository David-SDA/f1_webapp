import React, { useEffect, useState } from "react";

import { allTracks } from "../../../constants/allTracks";
import { flags } from "../../../constants/flags";

import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function AllTracksOnePage(){
    let { circuitId } = useParams();

    const [circuit, setCircuit] = useState([]);
    const [winners, setWinners] = useState([]);
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAllWinners, setShowAllWinners] = useState(false);
    const [showAllRaces, setShowAllRaces] = useState(false);

    const fetchInfo = async () => {
        try{
            const [response1, response2, response3] = await Promise.all([
                fetch("http://ergast.com/api/f1/circuits/"+ circuitId + ".json"),
                fetch("http://ergast.com/api/f1/circuits/"+ circuitId + "/results/1.json?limit=100"),
                fetch("http://ergast.com/api/f1/circuits/"+ circuitId + "/races.json?limit=100"),
            ]);
            
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();

            setCircuit(data1.MRData.CircuitTable.Circuits[0]);
            setWinners(data2.MRData.RaceTable.Races);
            setRaces(data3.MRData.RaceTable.Races);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    // Compter le nombre de victoire pour chaque pilotes sur ce circuit
    const driversWinsCount = winners.reduce((winsCount, race) => {
        const winnerName = race?.Results[0]?.Driver.givenName + " " + race?.Results[0]?.Driver.familyName;
        const winnerYear = race?.season;

        // Si la key existe, on ajoute 1 à son nombre de victoires sinon on l'initialise à 1
        // -- -- --- ------, on ajoute l'année de la victoire sinon on l'initialise
        if(winsCount[winnerName]){
            winsCount[winnerName].wins++;
            winsCount[winnerName].years.push(winnerYear)
        }
        else{
            winsCount[winnerName] = {
                wins: 1,
                years: [winnerYear]
            };
        }

        return winsCount;
    }, {});

    // Compter le nombre de vainqueurs différents
    const countDifferentWinners = () => {
        return Object.keys(driversWinsCount).length;
    }

    const handleDisplayMoreWinners = () => {
        setShowAllWinners(!showAllWinners);
    }

    const handleDisplayMoreRaces = () => {
        setShowAllRaces(!showAllRaces);
    }

    const sortedWinners = Object.entries(driversWinsCount).sort((a, b) => b[1].wins - a[1].wins);

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
                <Row className="d-flex align-items-center mb-3">
                    <Col lg={6} className="mb-3 d-flex justify-content-center align-items-center">
                        <Image src={allTracks[circuitId]} className="img-fluid" style={{maxHeight: "250px", objectFit: "contain"}}/>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col sm={6} md={6} lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>COUNTRY</span>
                                    <Container className="d-flex justify-content-center align-items-center">
                                        <Image src={flags[circuit?.Location?.country]} className="rounded border me-2" style={{height: "25px"}} />
                                        <span className="text-center" style={textBold}>{circuit?.Location?.country}</span>
                                    </Container>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col sm={6} md={6} lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>LOCALITY</span>
                                    <span className="text-center" style={textBold}>{circuit?.Location?.locality}</span>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col sm={6} md={6} lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>RACES</span>
                                    <span className="text-center" style={{...textBold, fontSize: "30px"}}>{races.length}</span>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col sm={6} md={6} lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>WINNERS</span>
                                    <span className="text-center" style={{...textBold, fontSize: "30px"}}>{countDifferentWinners()}</span>
                                    <div></div>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12} className="mb-3">
                        <p className="h2 fst-italic" style={textRegular}>All winners</p>
                        <Container className="d-flex flex-column p-1 rounded-3" style={{backgroundColor: "#38383f"}}>
                            <Row className="bg-white m-1 p-1 w-auto rounded-3">
                                <Col sm={5} md={5} lg={5}>
                                    <p className="mb-0 text-center" style={textBlack}>
                                        DRIVER
                                    </p>
                                </Col>
                                <Col sm={2} md={2} lg={2}>
                                    <p className="mb-0 text-center" style={textBlack}>
                                        WINS
                                    </p>
                                </Col>
                                <Col sm={5} md={5} lg={5}>
                                    <p className="mb-0 text-center" style={textBlack}>
                                        YEARS
                                    </p>
                                </Col>
                            </Row>
                            {
                                sortedWinners.slice(0, showAllWinners ? sortedWinners.length : 5).map(([driver, { wins, years}]) => (
                                    <Row key={driver} className="bg-white m-1 p-1 w-auto rounded-3">
                                        <Col sm={5} md={5} lg={5} className="d-flex justify-content-center align-items-center">
                                            <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover" >
                                                <p className="text-center mb-0" style={textBold}>{driver}</p>
                                            </a>
                                        </Col>
                                        <Col sm={2} md={2} lg={2} className="d-flex justify-content-center align-items-center">
                                            <p className="text-center mb-0" style={textBold}>{wins}</p>
                                        </Col>
                                        <Col sm={5} md={5} lg={5} className="d-flex justify-content-center align-items-center">
                                            <p className="text-center mb-0" style={textRegular}>
                                                {
                                                    years.map((year, index) => (
                                                        <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                                            <span key={index} style={textBold}>
                                                                {index === 0 ? year : ", " + year}
                                                            </span>
                                                        </a>
                                                    ))
                                                }
                                            </p>
                                        </Col>
                                    </Row>
                                ))
                            }
                            {
                                countDifferentWinners() > 5 ? (
                                    <Button variant="outline-light" size="sm" className="align-self-center mt-1" onClick={handleDisplayMoreWinners}>
                                        {showAllWinners ? "Show less" : "Show More"}
                                    </Button>
                                ) : ("")
                            }
                        </Container>
                    </Col>
                    <Col lg={12}>
                        <p className="h2 fst-italic" style={textRegular}>All Races</p>
                        <Container className="d-flex flex-column p-1 rounded-3" style={{backgroundColor: "#38383f"}}>
                            <Row className="bg-white m-1 p-1 w-auto rounded-3">
                                <Col sm={2} md={2} lg={3}>
                                    <p className="mb-0 text-center" style={textBlack}>
                                        SEASON
                                    </p>
                                </Col>
                                <Col sm={8} md={8} lg={6}>
                                    <p className="mb-0 text-center" style={textBlack}>
                                        GRAND PRIX NAME
                                    </p>
                                </Col>
                                <Col sm={2} md={2} lg={3}>
                                    <p className="mb-0 text-center" style={textBlack}>
                                        DATE
                                    </p>
                                </Col>
                            </Row>
                            {
                                races.slice().reverse().slice(0, showAllRaces ? races.length : 5).map((race, index) => {
                                    let raceDate = new Date(race?.date);
                                    return (
                                        <Row key={index} className="bg-white m-1 p-2 w-auto rounded-3">
                                            <Col sm={2} md={2} lg={3}>
                                                <p className="mb-0 text-center" style={textBold}>
                                                    <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                                        {race?.season}
                                                    </a>
                                                </p>
                                            </Col>
                                            <Col sm={8} md={8} lg={6}>
                                                <p className="mb-0 text-center" style={textBold}>
                                                    <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                                        {race?.raceName}
                                                    </a>
                                                </p>
                                            </Col>
                                            <Col sm={2} md={2} lg={3}>
                                                <p className="mb-0 text-center" style={textRegular}>
                                                    {raceDate.toLocaleDateString("en-GB", {day: "2-digit", month: "short"})}
                                                </p>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                            {
                                races.length > 5 ? (
                                    <Button variant="outline-light" size="sm" className="align-self-center mt-1" onClick={handleDisplayMoreRaces}>
                                        {showAllRaces ? "Show less" : "Show More"}
                                    </Button>
                                ) : ("")
                            }
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}