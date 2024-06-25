import React, { useEffect, useState } from "react";

import DriverStandingsHeaderContainer from "./DriverStandingsHeaderContainer";
import DriverStandingsContentContainer from "./DriverStandingsContentContainer";
import { currentConstructorColor } from "../../../constants/currentConstructorColor";
import { currentConstructorSmallText } from "../../../constants/currentConstructorSmallText";

import { Container, Spinner } from "react-bootstrap";

export default function DriverStandingsPage() {
    const [standings, setStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDriverIndex, setSelectedDriverIndex] = useState(0);

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
            const cachedData = localStorage.getItem('nowDriverStandings');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching driver standings data...');

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
                    localStorage.removeItem('nowDriverStandings');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch("https://ergast.com/api/f1/current/driverStandings.json");
            const data = await response.json();
            const standings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            setStandings(standings);
            localStorage.setItem('nowDriverStandings', JSON.stringify({ standings, nextMonday: getNextMonday() }));
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

    const handleDriverClick = (driverIndex) => {
        setSelectedDriverIndex(driverIndex);
    }

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="p-0">
                <h1 className="fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2024 : Driver Standings</h1>
                <Container className="rounded p-1 mb-3" style={{backgroundColor: "#38383f"}}>
                    <DriverStandingsHeaderContainer />
                    {
                        standings.map((driver, index) => {
                            return (
                                <DriverStandingsContentContainer
                                    key={index}
                                    driverId={driver?.Driver?.driverId}
                                    teamId={driver?.Constructors[0]?.constructorId}
                                    position={driver?.positionText}
                                    color={currentConstructorColor[driver?.Constructors[0]?.constructorId]}
                                    givenName={driver?.Driver?.givenName}
                                    familyName={driver?.Driver?.familyName}
                                    code={driver?.Driver?.code}
                                    team={currentConstructorSmallText[driver?.Constructors[0]?.constructorId]}
                                    wins={driver?.wins}
                                    points={driver?.points}
                                    isSelected={selectedDriverIndex === index}
                                    onClick={() => handleDriverClick(index)}
                                    selectedDriverPoints={selectedDriverIndex !== null ? standings[selectedDriverIndex].points : 0}
                                />
                            );
                        })
                    }
                </Container>
            </Container>
        );
    }
}
