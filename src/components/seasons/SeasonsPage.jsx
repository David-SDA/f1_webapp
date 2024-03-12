import React, { useEffect, useState } from "react";

import { Container, Row, Spinner } from "react-bootstrap";

import SeasonsCardContainer from "./SeasonsCardContainer";

export default function SeasonsPage(){
    const [seasons, setSeasons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchInfo = async () => {
        try{
            const seasonsResponse = await fetch("http://ergast.com/api/f1/seasons.json?limit=100");

            const seasonsData = await seasonsResponse.json();
            
            setSeasons(seasonsData.MRData.SeasonTable.Seasons);
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