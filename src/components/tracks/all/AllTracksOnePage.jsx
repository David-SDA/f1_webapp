import React, { useEffect, useState } from "react";

import { allTracks } from "../../../constants/allTracks";
import { flags } from "../../../constants/flags";

import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AllTracksInfoContainer from "./AllTracksInfoContainer";

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
            // Vérification si les données sont en cache
            const cachedData = localStorage.getItem('allTracks' + circuitId);
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching track data...');

            // Si les données sont en cache
            if(cachedData){
                // On extrait les données du cache
                const { circuit, winners, races } = JSON.parse(cachedData);
                // On extrait la date de la fin de l'année
                const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).getTime()
                //console.log('Found cached data:', circuit);

                // Si la date actuelle est avant la fin de l'année, on utilise les données du cache
                if(currentDateTime < endOfYear){
                    //console.log('Using cached data...');
                    setCircuit(circuit);
                    setWinners(winners);
                    setRaces(races);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('allTracks' + circuitId);
                }
            }
            //console.log('Fetching data from API...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response1 = await fetch("http://ergast.com/api/f1/circuits/"+ circuitId + ".json");
            const response2 = await fetch("http://ergast.com/api/f1/circuits/"+ circuitId + "/results/1.json?limit=100");
            const response3 = await fetch("http://ergast.com/api/f1/circuits/"+ circuitId + "/races.json?limit=100");

            const dataCircuit = await response1.json();
            const dataWinners = await response2.json();
            const dataRaces = await response3.json();

            const circuit = dataCircuit.MRData.CircuitTable.Circuits[0];
            const winners = dataWinners.MRData.RaceTable.Races;
            const races = dataRaces.MRData.RaceTable.Races;

            setCircuit(circuit);
            setWinners(winners);
            setRaces(races);
            
            localStorage.setItem('allTracks' + circuitId, JSON.stringify({ circuit, winners, races }));
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

    // Compter le nombre de victoire pour chaque pilotes sur ce circuit
    const driversWinsCount = winners.reduce((winsCount, race) => {
        const winnerName = race?.Results[0]?.Driver.givenName + " " + race?.Results[0]?.Driver.familyName;
        const winnerYear = race?.season;
        const winnerId = race?.Results[0]?.Driver.driverId;

        // Si la key existe, on ajoute 1 à son nombre de victoires sinon on l'initialise à 1
        // -- -- --- ------, on ajoute l'année de la victoire sinon on l'initialise
        if(winsCount[winnerId]){
            winsCount[winnerId].wins++;
            winsCount[winnerId].years.push(winnerYear)
        }
        else{
            winsCount[winnerId] = {
                name: winnerName,
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
                        <AllTracksInfoContainer
                            country={circuit?.Location?.country}
                            locality={circuit?.Location?.locality}
                            length={races.length}
                            nbWinners={countDifferentWinners()}
                        />
                    </Col>
                    <Col lg={12} className="mb-3 p-1 p-sm-2">
                        <p className="h2 fst-italic" style={textRegular}>All winners</p>
                        <Container className="d-flex flex-column p-1 rounded-3" style={{backgroundColor: "#38383f"}}>
                            <Row className="bg-white m-1 p-1 w-auto rounded-3">
                                <Col xs={6} sm={5} md={5} lg={5} className="p-0">
                                    <p className="mb-0 text-center" style={textBlack}>
                                        DRIVER
                                    </p>
                                </Col>
                                <Col xs={3} sm={2} md={2} lg={2} className="p-0">
                                    <p className="mb-0 text-center" style={textBlack}>
                                        WINS
                                    </p>
                                </Col>
                                <Col xs={3} sm={5} md={5} lg={5} className="p-0">
                                    <p className="mb-0 text-sm-center" style={textBlack}>
                                        YEARS
                                    </p>
                                </Col>
                            </Row>
                            {
                                sortedWinners.slice(0, showAllWinners ? sortedWinners.length : 5).map(([winnerId, { name, wins, years }], index) => (
                                    <Row key={index} className="bg-white m-1 p-1 w-auto rounded-3">
                                        <Col xs={6} sm={5} md={5} lg={5} className="d-flex justify-content-center align-items-center">
                                            <a href={"/allDrivers/" + winnerId} className="link-dark link-underline-opacity-0 link-opacity-50-hover" >
                                                <p className="text-center mb-0" style={textBold}>{name}</p>
                                            </a>
                                        </Col>
                                        <Col xs={3} sm={2} md={2} lg={2} className="d-flex justify-content-center align-items-center">
                                            <p className="text-center mb-0" style={textBold}>{wins}</p>
                                        </Col>
                                        <Col xs={3} sm={5} md={5} lg={5} className="d-flex justify-content-center align-items-center">
                                            <p className="text-center mb-0" style={textRegular}>
                                                {
                                                    years.map((year, index) => (
                                                        <a href={"/seasons/" + year} className="link-dark link-underline-opacity-0 link-opacity-50-hover" key={index}>
                                                            <span style={textBold}>
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
                    <Col lg={12} className="mb-3 p-1 p-sm-2">
                        <p className="h2 fst-italic" style={textRegular}>All Races</p>
                        <Container className="d-flex flex-column p-1 rounded-3" style={{backgroundColor: "#38383f"}}>
                            <Row className="bg-white m-1 p-1 w-auto rounded-3">
                                <Col xs={3} sm={2} md={2} lg={3} className="p-0">
                                    <p className="mb-0 text-center" style={textBlack}>
                                        SEASON
                                    </p>
                                </Col>
                                <Col xs={6} sm={8} md={8} lg={6} className="p-0">
                                    <p className="d-none d-sm-block mb-0 text-center" style={textBlack}>
                                        GRAND PRIX NAME
                                    </p>
                                    <p className="d-block d-sm-none mb-0 text-center" style={textBlack}>
                                        GP
                                    </p>
                                </Col>
                                <Col xs={3} sm={2} md={2} lg={3} className="p-0">
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
                                            <Col xs={3} sm={2} md={2} lg={3}>
                                                <p className="mb-0 text-center" style={textBold}>
                                                    <a href={"/seasons/" + race?.season} className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                                        {race?.season}
                                                    </a>
                                                </p>
                                            </Col>
                                            <Col xs={6} sm={8} md={8} lg={6}>
                                                <p className="mb-0 text-center" style={textBold}>
                                                    <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                                        {race?.raceName}
                                                    </a>
                                                </p>
                                            </Col>
                                            <Col xs={3} sm={2} md={2} lg={3}>
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