import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Container, Image, Spinner, Row, Col } from "react-bootstrap";

import { allTracks } from "../../constants/allTracks";
import OneRaceResultsHeader from "./OneRaceResultsHeader";
import OneRaceInfoContainer from "./OneRaceInfoContainer";
import OneRaceResultsContainer from "./OneRaceResultsContainer";

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
                <Container className="d-flex flex-column p-0 p-sm-2 rounded mb-2" style={{backgroundColor: "#38383f"}}>
                    <OneRaceResultsHeader />
                    {
                        race.Results.map((result, index) => {
                            return (
                                <OneRaceResultsContainer
                                    key={index}
                                    positionText={result?.positionText}
                                    driverGivenName={result?.Driver?.givenName}
                                    driverFamilyName={result?.Driver?.familyName}
                                    driverId={result?.Driver?.driverId}
                                    constructorName={result?.Constructor?.name}
                                    constructorId={result?.Constructor?.constructorId}
                                    grid={result?.grid}
                                    time={result?.Time?.time}
                                    status={result?.status}
                                    points={result?.points}
                                />
                            );
                        })
                    }
                </Container>
            </Container>
        );
    }
}