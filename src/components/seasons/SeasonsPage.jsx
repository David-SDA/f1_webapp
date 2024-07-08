import React, { useEffect, useState } from "react";

import { Container, Row, Spinner } from "react-bootstrap";

import SeasonsCardContainer from "./SeasonsCardContainer";

export default function SeasonsPage(){
    const [seasons, setSeasons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedSeasons = localStorage.getItem('seasons');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching seasons data...');

            // Si les données sont en cache
            if(cachedSeasons){
                // On extrait les données du cache
                const { seasons } = JSON.parse(cachedSeasons);
                // On extrait la date de la fin de l'année
                const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).getTime();
                //console.log('Found cached data:', seasons);

                // Si la date actuelle est avant la fin de l'année, on utilise les données du cache
                if(currentDateTime < endOfYear){
                    //console.log('Using cached data...');
                    setSeasons(seasons);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('seasons');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const seasonsResponse = await fetch("https://ergast.com/api/f1/seasons.json?limit=100");

            const seasonsData = await seasonsResponse.json();
            const seasons = seasonsData.MRData.SeasonTable.Seasons;
            setSeasons(seasons);
            localStorage.setItem('seasons', JSON.stringify({ seasons }));
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

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    if(isLoading){
        return(
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textRegular}>Seasons</h1>
                <Row>
                    {
                        seasons.slice().reverse().map((season, index) => {
                            return (
                                <SeasonsCardContainer
                                    key={index}
                                    season={season?.season}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        )
    }
}