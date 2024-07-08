import React, { useEffect, useState } from "react";

import TracksCardContainer from "../TracksCardContainer";
import { currentYearTracks } from "../../../constants/currentYearTracks";
import { flags } from "../../../constants/flags";

import { Container, Row, Spinner } from "react-bootstrap";

export default function CurrentTracksPage() {
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            // Vérification si les données sont en cache
            const cachedCurrentTracks = localStorage.getItem('current_tracks');
            // On détermine la date actuelle
            const currentDateTime = new Date().getTime();
            //console.log('Fetching current tracks data...');

            // Si les données sont en cache
            if(cachedCurrentTracks){
                // On extrait les données du cache
                const { currentTracks } = JSON.parse(cachedCurrentTracks);
                // On extrait la date de la fin de l'année
                const endOfYear = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).getTime();
                //console.log('Found cached data:', currentTracks);

                // Si la date actuelle est avant la fin de l'année, on utilise les données du cache
                if(currentDateTime < endOfYear){
                    //console.log('Using cached data...');
                    setTracks(currentTracks);
                    setIsLoading(false);
                    return;
                }
                else{
                    //console.log('Cached data is outdated. Removing...');
                    localStorage.removeItem('current_tracks');
                }
            }
            //console.log('Making API call...');
            // On fait l'appel API ainsi que la sauvegarde dans le cache
            const response = await fetch("https://ergast.com/api/f1/current/circuits.json");
            const data = await response.json();
            const currentTracks = data.MRData.CircuitTable.Circuits;
            setTracks(currentTracks);
            localStorage.setItem('current_tracks', JSON.stringify({ currentTracks }));
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

    const getSortedData = () => {
        const sortedData = [...tracks]; // On copie les champions que l'on récupère
        sortedData.sort((a, b) => { // On effectue le tri
            let aValue = a.circuitName; // On crée les variables
            let bValue = b.circuitName; // pour les comparés
            
            // On effectue le tri pour de bon
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        });
        return sortedData;
    }

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

    const sortedData = getSortedData();

    if(isLoading){
        return(
            <Spinner animation="border" className="align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic" style={textRegular}>F1 2024 : Tracks</h1>
                <Row>
                    {
                        sortedData.map((track, index) => {
                            return (
                                <TracksCardContainer
                                    key={index}
                                    circuitId={track?.circuitId}
                                    circuitName={track?.circuitName}
                                    imageTrack={currentYearTracks[track?.circuitId]}
                                    imageCountry={flags[track?.Location?.country]}
                                    country={track?.Location?.country}
                                    locality={track?.Location?.locality}
                                />
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
