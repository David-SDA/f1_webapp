import React, { useEffect, useState } from "react";

import AllDriversOneDetailsContainer from "./AllDriversOneDetailsContainer";

import { Card, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { flagsNationality } from "../../../constants/flagsNationality";

export default function AllDriversOnePage(){
    let { driverId } = useParams();

    const [driver, setDriver] = useState([]);
    const [results, setResults] = useState([]);
    const [driverStandings, setDriverStandings] = useState([]);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response1 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + ".json");
            const response2 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/driverStandings.json");
            const response3 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/results.json?limit=500");
            const response4 = await fetch("http://ergast.com/api/f1/drivers/" + driverId + "/constructors.json");

            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();

            setDriver(data1.MRData.DriverTable.Drivers[0]);
            setDriverStandings(data2.MRData.StandingsTable.StandingsLists);
            setResults(data3.MRData.RaceTable.Races);
            setTeams(data4.MRData.ConstructorTable.Constructors);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    // Calcul du nombre de podiums
    const getPodiums = () => {
        let podiums = 0;
        for(const result of results){
            const position = result?.Results[0]?.position;
            if(["1", "2", "3"].includes(position)){
                podiums++;
            }
        }
        return podiums;
    }

    // Calcul du nombre de victoires
    const getWins = () => {
        let wins = 0;
        for(const result of results){
            const position = result?.Results[0]?.position;
            if(position === "1"){
                wins++;
            }
        }
        return wins;
    }

    // Calcul du nombre de championnat gagné
    const getChampionships = () => {
        let championships = 0;
        for(const driverStanding of driverStandings){
            const position = driverStanding?.DriverStandings[0]?.position;
            if(position === "1"){
                championships++;
            }
        }
        return championships;
    }

    const seasonsByTeams = {};

    for(const driverStanding of driverStandings){
        const season = driverStanding?.season;
        const team = driverStanding?.DriverStandings[0]?.Constructors[0]?.name;

        if(!seasonsByTeams[team]){
            seasonsByTeams[team] = [];
        }

        seasonsByTeams[team].push(season);
    }

    let nbPodiums = getPodiums();
    let nbWins = getWins();
    let nbChampionships = getChampionships();

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

    if(isLoading){
        return(
            <Spinner animation="border" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container>
                <h1 className="fst-italic mt-1" style={textRegular}>
                    <span style={textRegular}>{driver?.givenName}</span> <span style={textBold}>{driver?.familyName}</span>
                </h1>
                <AllDriversOneDetailsContainer
                    nationality={driver?.nationality}
                    dateOfBirth={driver?.dateOfBirth}
                    firstSeason={results[0]?.season}
                    firstRace={results[0]?.raceName}
                    nbSeasons={driverStandings.length}
                    nbRaces={results.length}
                    nbChampionships={nbChampionships}
                    nbWins={nbWins}
                    nbPodiums={nbPodiums}
                    nbTeams={teams.length}
                />
                <h1 className="fst-italic mt-1" style={textRegular}>
                    TEAMS
                </h1>
                <Container className="mb-2 pt-3 pb-3 rounded" style={{backgroundColor: "#38383f"}}>
                    <Row className="d-flex justify-content-around">
                        {
                            teams.map((team, index) => {
                                return (
                                    <Col md={6} lg={4} xl={3} className="mt-1 mb-1" key={index}>
                                        <Card className="p-2">
                                            <Card.Title className="d-flex justify-content-center" style={textBold}>
                                                {team?.name}
                                            </Card.Title>
                                            <Card.Subtitle className="d-flex justify-content-center align-items-center">
                                                <Image src={flagsNationality[team?.nationality]} rounded className="me-1 border" style={{height: 20}} />
                                                <span className="fst-italic" style={textRegular}>{team?.nationality}</span>
                                            </Card.Subtitle>
                                            <Card.Body className="text-center ps-0 pe-0" style={{...textRegular, height: "6rem"}}>
                                                (
                                                    {
                                                        seasonsByTeams[team.name]?.map((season, seasonIndex) => {
                                                            return (
                                                                <span key={seasonIndex}>
                                                                    {season}
                                                                    {seasonIndex !== seasonsByTeams[team.name].length - 1 ? ", " : ""}
                                                                </span>
                                                            );
                                                        }) || null
                                                    }
                                                )
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </Container>
            </Container>
        );
    }
}