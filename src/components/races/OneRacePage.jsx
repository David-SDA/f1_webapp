import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Container, Image, Spinner, Row, Col } from "react-bootstrap";

import OneRaceResultsHeader from "./OneRaceResultsHeader";
import { allTracks } from "../../constants/allTracks";
import { flags } from "../../constants/flags";

export default function OneRacePage(){
    const { season, round } = useParams();

    const [race, setRace] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Fonction pour connaitre le prochain lundi
    const getNextMonday = () => {
        const d = new Date();
        d.setDate(d.getDate() + (((1 + 7 - d.getDay()) % 7) || 7));
        d.setHours(8, 0, 0, 0);
        return d.getTime();
    };

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedData = localStorage.getItem('raceSeason_' + season + '_round_' + round);
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching race data...');
    
            // Si les données sont en cache
            if(cachedData){
                // On extrait les données du cache
                const { race, nextMonday } = JSON.parse(cachedData);
                //console.log('Found cached data:', race);            
    
                // L'année actuel
                let thisYear = new Date().getFullYear();

                // Si la saison de la course n'est pas la saison actuelle ou si on est avant le prochain lundi, on utilise les données du cache
                if(parseInt(race.season) !== thisYear || currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setRace(race);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('raceResultsSeason_' + season + '_round_' + round);
                }
            }
            //console.log('Fetching data from API...');
            // On fait l'appel à l'API ainsi que la ssauvegarde dans le cache
            const response = await fetch("http://ergast.com/api/f1/" + season + "/" + round + "/results.json");
            const data = await response.json();
            const race = data.MRData.RaceTable.Races[0];
            setRace(race);
            localStorage.setItem('raceSeason_' + season + '_round_' + round, JSON.stringify({ race, nextMonday: getNextMonday() }));
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
    }, []);

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    const textBlack = {
        fontFamily: "Formula1-Black",
        letterSpacing: "0.0005rem",
    };

    if(isLoading){
        return (
            <Spinner animation="border" className="mt-2 align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textBold}>{race.season} {race.raceName}</h1>
                <Row>
                    <Col lg={6} className="mb-3 d-flex justify-content-center align-items-center">
                        <Image src={allTracks[race.Circuit.circuitId]} className="img-fluid" style={{maxHeight: "250px", objectFit: "contain"}}/>
                    </Col>
                    <Col lg={6}>
                        <Row>
                            <Col sm={6} md={6} lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>COUNTRY</span>
                                    <Container className="d-flex justify-content-center align-items-center">
                                        <Image src={flags[race.Circuit.Location.country]} className="rounded border me-2" style={{height: "25px"}} />
                                        <span className="text-center" style={textBold}>{race.Circuit.Location.country}</span>
                                    </Container>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col sm={6} md={6} lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>LOCALITY</span>
                                    <span className="text-center" style={textBold}>{race.Circuit.Location.locality}</span>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col sm={6} md={6} lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>WINNER</span>
                                    <span className="text-center" style={textBold}>{race.Results[0].Driver.givenName} {race.Results[0].Driver.familyName}</span>
                                    <div></div>
                                </Container>
                            </Col>
                            <Col sm={6} md={6} lg={6} className="mb-3">
                                <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                                    <span style={textBlack}>TEAM WINNER</span>
                                    <span className="text-center" style={textBold}>{race.Results[0].Constructor.name}</span>
                                    <div></div>
                                </Container>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Race Results</p>
                <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                    <OneRaceResultsHeader />
                </Container>
            </Container>
        );
    }
}