import React, { useEffect, useState } from "react";

import { flagsNationality } from "../../../constants/flagsNationality";

import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
                <Row className="d-flex justify-content-center">
                    <Col md={6} lg={4}>
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>NATIONALITY</p>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <Image src={flagsNationality[driver?.nationality]} rounded className="me-1 border" style={{height: 25}} />
                                <p className="mb-0" style={{...textBold, fontSize: "20px"}}>{driver?.nationality}</p>
                            </div>
                            <div></div>
                        </Container>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>DATE OF BIRTH</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{new Date(driver?.dateOfBirth).toLocaleDateString("en")}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>FIRST RACE</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{results[0]?.season} {results[0]?.raceName}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>COMPLETED SEASONS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{driverStandings.length}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>RACES</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{results.length}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>WORLD CHAMPIONSHIPS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbChampionships}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>WINS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbWins}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>PODIUMS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{nbPodiums}</p>
                            <div></div>
                        </Container>
                    </Col>
                    <Col md={6} lg={4} className="mb-3">
                        <Container className="d-flex flex-column justify-content-around rounded-4" style={{height: "100px", borderRight: "5px solid #ff1801", borderBottom: "5px solid #ff1801"}}>
                            <p className="mb-0" style={textBlack}>TEAMS</p>
                            <p className="text-center mb-0" style={{...textBold, fontSize: "20px"}}>{teams.length}</p>
                            <div></div>
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}