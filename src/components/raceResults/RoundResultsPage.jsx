import React, { useEffect, useState } from "react";

import RaceContainer from "../raceSchedule/RaceContainer";
import RaceResultsContainer from "./RaceResultsContainer";
import QualifyingResultsContainer from "./QualifyingResultsContainer";

import { Container, Spinner } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import SprintResultsContainer from "./SprintResultsContainer";

export default function RoundResultsPage(){
    let { round } = useParams();

    const [race, setRace] = useState([]);
    const [raceResults, setRaceResults] = useState([]);
    const [qualifyingResults, setQualifyingResults] = useState([]);
    const [sprintResults, setSprintResults] = useState([]);
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
            const cachedRace = localStorage.getItem('nowRace-' + round);
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching race data...');
    
            // Si les données sont en cache
            if(cachedRace){
                // On extrait les données du cache
                const { race, raceResults, qualifyingResults, sprintResults, nextMonday } = JSON.parse(cachedRace);
                //console.log('Found cached data:', race);
    
                if(currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setRace(race);
                    setRaceResults(raceResults);
                    setQualifyingResults(qualifyingResults);
                    setSprintResults(sprintResults);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('nowRace-' + round);
                }
            }
            //console.log('Fetching data from API...');
            // On fait l'appel à l'API ainsi que la ssauvegarde dans le cache
            const raceResponse = await fetch('https://ergast.com/api/f1/current/' + round + '.json');
            const raceResultsResponse = await fetch("http://ergast.com/api/f1/current/" + round + "/results.json");
            const qualifyingResultsResponse = await fetch("http://ergast.com/api/f1/current/" + round + "/qualifying.json");
            const sprintResultsResponse = await fetch("http://ergast.com/api/f1/current/" + round + "/sprint.json");

            const raceData = await raceResponse.json();
            const raceResultsData = await raceResultsResponse.json();
            const qualifyingResultsData = await qualifyingResultsResponse.json();
            const sprintResultsData = await sprintResultsResponse.json();

            const race = raceData?.MRData?.RaceTable?.Races[0];
            const raceResults = raceResultsData?.MRData?.RaceTable?.Races[0]?.Results;
            const qualifyingResults = qualifyingResultsData?.MRData?.RaceTable?.Races[0]?.QualifyingResults;
            const sprintResults = sprintResultsData?.MRData?.RaceTable?.Races[0]?.SprintResults;

            setRace(race);
            setRaceResults(raceResults);
            setQualifyingResults(qualifyingResults);
            setSprintResults(sprintResults);
            localStorage.setItem('nowRace-' + round, JSON.stringify({ race, raceResults, qualifyingResults, sprintResults, nextMonday: getNextMonday() }));
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

    if(isLoading){
        return (
            <Spinner animation="border" style={{color: "#ff1801"}} />
        )
    }
    else{
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center pt-3 pb-3 ps-1 pe-1">
                <RaceContainer race={race} />
                {
                    raceResults ? (
                        <>
                            <RaceResultsContainer raceResults={raceResults} />
                            <QualifyingResultsContainer qualifyingResults={qualifyingResults} />
                            {
                                sprintResults ? (
                                    <SprintResultsContainer sprintResults={sprintResults} />
                                ) : ("")
                            }
                        </>
                    ) : (
                        <p className="fst-italic">Resuts will be available the Monday after the race</p>
                    )
                }
            </Container>
        );
    }
}