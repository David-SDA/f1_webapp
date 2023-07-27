import React, { useEffect, useState } from "react";

import { allTracks } from "../../../constants/allTracks";
import { flags } from "../../../constants/flags";

import { Container, Row, Spinner } from "react-bootstrap";
import TracksCardContainer from "../TracksCardContainer";

export default function AllTracksPage() {
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/circuits.json?limit=100");
            const data = await response.json();
            setTracks(data.MRData.CircuitTable.Circuits);
        }catch(error){
            console.log(error);
        }finally{
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
                <h1 className="fst-italic" style={textRegular}>F1 2023 : Tracks</h1>
                <Row>
                    {
                        sortedData.map((track, index) => {
                            return (
                                <TracksCardContainer
                                    key={index}
                                    circuitName={track?.circuitName}
                                    imageTrack={allTracks[track?.circuitId]}
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
