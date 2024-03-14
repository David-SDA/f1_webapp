import React, { useEffect, useState } from "react";

import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

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
    const textWide = {
        fontFamily: "Formula1-Wide",
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
        console.log(races);
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textBold}>{season} Season</h1>
                <h2 className="fst-italic mt-1" style={textRegular}>CALENDAR</h2>
                <Container className="mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <Row className="d-flex justify-content-around">
                        {
                            races.map((race, index) => {

                                return (
                                    <Col xs={6} sm={4} md={3} lg={2} className="bg-white m-1 rounded" style={textRegular} key={index}>
                                        <p><span style={textWide}>{race?.round}</span> : <i>{new Date(race?.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</i></p>
                                        <p style={textBold}>{race?.raceName}</p>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </Container>
        )
    }
}