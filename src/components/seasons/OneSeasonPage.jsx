import React, { useEffect, useState } from "react";

import { Container, Row, Spinner } from "react-bootstrap";

import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import OneSeasonOneRace from "./OneSeasonOneRace";

const isValidSeason = (year) => {
    const currentYear = new Date().getFullYear();
    const minYear = 1950;

    if(!isNaN(year) && year >= minYear && year <= currentYear){
        return true;
    }
    else{
        return false;
    }
}

export default function OneSeasonPage(){
    const { season } = useParams();

    const [races, setRaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [seasonValid, setSeasonValid] = useState(true);

    const fetchInfo = async () => {
        try{
            const racesResponse = await fetch("http://ergast.com/api/f1/" + season + ".json");

            const racesData = await racesResponse.json();
            
            setRaces(racesData.MRData.RaceTable.Races);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if(!isValidSeason(season)) {
            setSeasonValid(false);
        }
        else{
            fetchInfo();
        }
    }, [season]);

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    if(!seasonValid){
        return <NotFoundPage />;
    }

    if(isLoading){
        return(
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textBold}>{season} Season</h1>
                <h2 className="fst-italic mt-1" style={textRegular}>CALENDAR</h2>
                <Container className="mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <Row className="d-flex justify-content-around">
                        {
                            races.map((race, index) => {
                                return (
                                    <OneSeasonOneRace
                                        key={index}
                                        round={race?.round}
                                        date={race?.date}
                                        raceName={race?.raceName}
                                    />
                                )
                            })
                        }
                    </Row>
                </Container>
            </Container>
        )
    }
}