import React, { useEffect, useState } from "react";

import { allTracks } from "../../../constants/allTracks";

import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AllTracksInfoContainer from "./AllTracksInfoContainer";
import AllTracksWinnersListContainer from "./AllTracksWinnersListContainer";
import AllTracksRacesListContainer from "./AllTracksRacesListContainer";

export default function AllTracksOnePage(){
    let { circuitId } = useParams();

    const [circuit, setCircuit] = useState([]);
    const [winners, setWinners] = useState([]);
    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    const sortedWinners = Object.entries(driversWinsCount).sort((a, b) => b[1].wins - a[1].wins);

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
                        <AllTracksWinnersListContainer
                            sortedWinners={sortedWinners}
                            nbWinners={countDifferentWinners()}
                        />
                    </Col>
                    <Col lg={12} className="mb-3 p-1 p-sm-2">
                        <p className="h2 fst-italic" style={textRegular}>All Races</p>
                        <AllTracksRacesListContainer
                            races={races}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}