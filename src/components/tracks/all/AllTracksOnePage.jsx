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

    const handleDisplayMore = () => {
        setShowAllWinners(!showAllWinners);
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
                    <Col lg={6} className="d-flex justify-content-center align-items-center">
                        <Image src={allTracks[circuitId]} style={{height: "300px", objectFit: "contain"}}/>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>COUNTRY</span>
                                    <Container className="d-flex justify-content-center align-items-center">
                                        <Image src={flags[circuit?.Location?.country]} className="rounded border me-2" style={{height: "25px"}} />
                                        <span className="text-center" style={textBold}>{circuit?.Location?.country}</span>
                                    </Container>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>LOCALITY</span>
                                    <span className="text-center" style={textBold}>{circuit?.Location?.locality}</span>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>RACES</span>
                                    <span className="text-center" style={textBold}>{races.length}</span>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>WINNERS</span>
                                    <span className="text-center" style={textBold}>{countDifferentWinners()}</span>
                                    <div></div>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12}>
                        <h2 className="fst-italic" style={textRegular}>All winners</h2>
                        <Container className="d-flex flex-column p-1 rounded-3" style={{backgroundColor: "#38383f"}}>
                            {
                                sortedWinners.slice(0, showAllWinners ? sortedWinners.length : 5).map(([driver, { wins, years}]) => (
                                    <Container key={driver} className="bg-white m-1 p-1 w-auto rounded-3">
                                        <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover" >
                                            <span style={textBold}>{driver}</span>
                                        </a> : <span style={textBold}>{wins} </span>
                                        <span style={textRegular}>
                                            {wins === 1 ? "win" : "wins"} ({
                                            years.map((year, index) => (
                                                <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                                    <span key={index} style={textBold}>{index === 0 ? year : ", " + year}</span>
                                                </a>
                                            ))
                                        })
                                        </span>
                                    </Container>
                                ))
                            }
                            {
                                countDifferentWinners() > 5 ? (
                                    <Button variant="outline-light" size="sm" className="align-self-end mt-1" onClick={handleDisplayMore}>
                                        {showAllWinners ? "Show less" : "Show More"}
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