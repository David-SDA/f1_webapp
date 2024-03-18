import React, { useEffect, useState } from "react";

import { Col, Container, Row, Spinner } from "react-bootstrap";

import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";
import OneSeasonOneRace from "./OneSeasonOneRace";
import OneSeasonDriverStandingsHeader from "./OneSeasonDriverStandingsHeader";
import OneSeasonDriverStandingsContent from "./OneSeasonDriverStandingsContent";
import OneSeasonConstructorStandingsHeader from "./OneSeasonConstructorStandingsHeader";

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
    const [driverStandings, setDriverStandings] = useState([]);
    const [constructorStandings, setConstructorStandings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [seasonValid, setSeasonValid] = useState(true);

    const fetchInfo = async () => {
        try{
            const racesResponse = await fetch("http://ergast.com/api/f1/" + season + ".json");
            const driverStandingsResponse = await fetch("http://ergast.com/api/f1/" + season + "/driverStandings.json");
            const constructorStandingsResponse = await fetch("http://ergast.com/api/f1/" + season + "/constructorStandings.json");

            const racesData = await racesResponse.json();
            const driverStandingsData = await driverStandingsResponse.json();
            const constructorStandingsData = await constructorStandingsResponse.json();
            
            setRaces(racesData.MRData.RaceTable.Races);
            setDriverStandings(driverStandingsData.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            if(constructorStandingsData.MRData.total != 0){
                setConstructorStandings(constructorStandingsData.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
            }
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
    const textBlack = {
        fontFamily: "Formula1-Black",
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
                <h2 className="fst-italic mt-1" style={textRegular}>DRIVER STANDINGS</h2>
                <Container className="mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <OneSeasonDriverStandingsHeader />
                    {
                        driverStandings.map((driver, index) => {
                            return (
                                <OneSeasonDriverStandingsContent
                                    key={index}
                                    position={driver?.position}
                                    givenName={driver?.Driver?.givenName}
                                    familyName={driver?.Driver?.familyName}
                                    name={driver?.Constructors[0]?.name}
                                    wins={driver?.wins}
                                    points={driver?.points}
                                />
                            )
                        })
                    }
                </Container>
                {
                    constructorStandings.length !== 0 ? (
                        <>
                            <h2 className="fst-italic mt-1" style={textRegular}>CONSTRUCTORS STANDINGS</h2>
                            <Container className="mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                                <OneSeasonConstructorStandingsHeader />
                                {
                                    constructorStandings.map((constructor, index) => {
                                        return (
                                            <Row className="d-flex flex-nowrap flex-row justify-content-around align-items-center bg-white m-1 p-1 p-sm-2 rounded-3" key={index}>
                                                <Col className="p-0" xs={1} sm={1} md={1} lg={1}>
                                                    <p className="m-0 text-center" style={textWide}>
                                                        {constructor?.position}
                                                    </p>
                                                </Col>
                                                <Col className="p-0" xs={5} sm={6} md={7} lg={7}>
                                                    <p className="m-0" style={textBold}>
                                                        {constructor?.Constructor?.name}
                                                    </p>
                                                </Col>
                                                <Col className="p-0 d-none d-md-block" xs={3} sm={2} md={1} lg={1}>
                                                    <p className="m-0 text-center" style={textBold}>
                                                        {constructor?.wins}
                                                    </p>
                                                </Col>
                                                <Col className="p-0" xs={3} sm={2} md={1} lg={1}>
                                                    <p className="m-0 text-center" style={textBold}>
                                                        {constructor?.points}
                                                    </p>
                                                </Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Container>
                        </>
                        
                    ) : (
                        <i style={textRegular}>No constructors championship at the time</i>
                    )
                }
            </Container>
        )
    }
}