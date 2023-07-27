import React, { useEffect, useState } from "react";

import { currentYearTracks } from "../../constants/currentYearTracks";
import { flags } from "../../constants/flags";

import { Container, Row, Spinner } from "react-bootstrap";
import CurrentTracksCardContainer from "./CurrentTracksCardContainer";

export default function CurrentTracksPage() {
    const [tracks, setTracks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch("http://ergast.com/api/f1/current/circuits.json");
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

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    };

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
                        tracks.map((track, index) => {
                            return (
                                <CurrentTracksCardContainer
                                    key={index}
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
