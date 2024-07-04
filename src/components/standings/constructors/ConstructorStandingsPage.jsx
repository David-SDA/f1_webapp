import React, { useEffect, useState } from "react";

import ConstructorStandingsHeaderContainer from "./ConstructorStandingsHeaderContainer";
import ConstructorStandingsContentContainer from "./ConstructorStandingsContentContainer";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Container, Spinner } from "react-bootstrap";

export default function ConstructorStandingsPage() {
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTeamIndex, setSelectedTeamIndex] = useState(0);

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
            const cachedData = localStorage.getItem('nowConstructorStandings');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching constructor standings data...');

            // Si les données sont en cache
            if(cachedData){
                // On extrait les données du cache
                const { standings, nextMonday } = JSON.parse(cachedData);
                //console.log('Found cached data:', standings);

                // Si la date actuelle est avant le prochain lundi, on utilise les données du cache
                if(currentDateTime < nextMonday){
                    //console.log('Using cached data...');
                    setStandings(standings);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('nowConstructorStandings');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch("https://ergast.com/api/f1/current/constructorStandings.json");
            const data = await response.json();
            const standings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            setStandings(standings);
            localStorage.setItem('nowConstructorStandings', JSON.stringify({ standings, nextMonday: getNextMonday() }));
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleTeamClick = (teamIndex) => {
        setSelectedTeamIndex(teamIndex);
    }

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="p-0">
                <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2024 : Constructors Standings</h1>
                <Container className="rounded p-1 mb-3" style={{backgroundColor: "#38383f"}}>
                    <ConstructorStandingsHeaderContainer />
                    {
                        standings.map((team, index) => {
                            return (
                                <ConstructorStandingsContentContainer
                                    key={index}
                                    teamId={team?.Constructor?.constructorId}
                                    position={team?.positionText}
                                    color={currentConstructorColor[team?.Constructor?.constructorId]}
                                    team={currentConstructorSmallText[team?.Constructor?.constructorId]}
                                    wins={team?.wins}
                                    points={team?.points}
                                    isSelected={selectedTeamIndex === index}
                                    onClick={() => handleTeamClick(index)}
                                    selectedTeamPoints={selectedTeamIndex !== null ? standings[selectedTeamIndex].points : 0}
                                />
                            );
                        })
                    }
                </Container>
            </Container>
        );
    }
}
