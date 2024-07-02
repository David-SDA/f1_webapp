import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Container, Image, Spinner, Row, Col } from "react-bootstrap";

import OneRaceResultsHeader from "./OneRaceResultsHeader";
import { allTracks } from "../../constants/allTracks";
import OneRaceInfoContainer from "./OneRaceInfoContainer";

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
    };
    
    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    }

    if(isLoading){
        return (
            <Spinner animation="border" className="mt-2 align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textBold}>{race?.season} {race?.raceName}</h1>
                <Row>
                    <Col lg={6} className="mb-3 d-flex justify-content-center align-items-center">
                        <Image src={allTracks[race?.Circuit?.circuitId]} className="img-fluid" style={{maxHeight: "250px", objectFit: "contain"}}/>
                    </Col>
                    <OneRaceInfoContainer
                        country={race?.Circuit?.Location?.country}
                        locality={race?.Circuit?.Location?.locality}
                        winnerFirstName={race?.Results[0]?.Driver?.givenName}
                        winnerLastName={race?.Results[0]?.Driver?.familyName}
                        winnerTeam={race?.Results[0]?.Constructor?.name}
                    />
                </Row>
                <p className="h1 align-self-start fst-italic" style={{fontFamily: "Formula1-Regular", letterSpacing: "0.0005rem"}}>Race Results</p>
                <Container className="d-flex flex-column p-0 p-sm-2 rounded" style={{backgroundColor: "#38383f"}}>
                    <OneRaceResultsHeader />
                    {
                        race.Results.map((result, index) => {
                            return (
                                <Row className="d-flex  flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3" key={index}>
                                    <Col className="p-0" xs={2} sm={1} md={1} lg={1}>
                                        <p className="m-0 text-center d-none d-sm-block" style={textWide}>
                                            {result?.positionText}
                                        </p>
                                        <p className="m-0 text-center d-sm-none" style={{...textWide, fontSize: "0.8rem"}}>
                                            {result?.positionText}
                                        </p>
                                    </Col>
                                    <Col className="p-0" xs={5} sm={6} md={6} lg={5}>
                                        <p className="m-0 d-none d-sm-block" style={textRegular}>
                                            {result?.Driver?.givenName} <span style={textBold}>{result?.Driver?.familyName}</span>
                                        </p>
                                        <p className="m-0 d-block d-sm-none" style={textBold}>
                                            {result?.Driver?.familyName}
                                        </p>
                                    </Col>
                                    <Col className="p-0 d-none d-lg-block" lg={2}>
                                        <p className="m-0 text-center d-none d-lg-block" style={textRegular}>
                                            {result?.Constructor?.name}
                                        </p>
                                    </Col>
                                    <Col className="p-0 d-none d-md-block" md={1} lg={1}>   
                                        <p className="m-0 text-center d-none d-md-block" style={textBlack}>
                                            {result?.grid}
                                        </p>
                                    </Col>
                                    <Col className="p-0" xs={5} sm={3} md={3} lg={2}>
                                        <p className="m-0 text-center rounded-5 p-1" style={textRegular}>
                                        {
                                            result?.Time?.time ? (
                                                <span className="rounded-5 p-1" style={{backgroundColor: "#e8e8e8"}}>{result?.Time?.time}</span>
                                            ) : (
                                                result?.status ? (
                                                    <span className="rounded-5 p-1 fst-italic">{result?.status}</span>
                                                ):(
                                                    <span className="rounded-5 p-1 fst-italic">DNF</span>
                                                )
                                            )
                                        }
                                        </p>
                                    </Col>
                                    <Col className="p-0" sm={1} md={1} lg={1}>
                                        <p className="m-0 text-center d-none d-sm-block" style={textBlack}>
                                            {result?.points}
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