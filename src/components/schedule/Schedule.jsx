import React, { useEffect, useState } from "react";

import SmallDriver from "../standings/SmallDriver";
import TrackImageContainer from "./TrackImageContainer";
import { currentConstructorColor } from "../../constants/currentConstructorColor";

import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { flags } from "../../constants/flags";

export default function Schedule() {
    const myBorder = {
        fontFamily: "Formula1-Regular",
        borderBottom: "5px solid #ff1801",
        borderRight: "5px solid #ff1801",
        borderRadius: 10,
        minHeight: 200,
    };

    const dateStyle = {
        fontFamily: "Formula1-Wide",
        fontSize: 12,
    }

    const [schedule, setSchedule] = useState([]);
    const [winners, setWinners] = useState([]);
    const [seconds, setSeconds] = useState([]);
    const [thirds, setThirds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const responseSchedule = await fetch("http://ergast.com/api/f1/current.json");
            const responseWinners = await fetch("http://ergast.com/api/f1/current/results/1.json");
            const responseSeconds = await fetch("http://ergast.com/api/f1/current/results/2.json");
            const responseThirds = await fetch("http://ergast.com/api/f1/current/results/3.json");

            const dataSchedule = await responseSchedule.json();
            const dataWinners = await responseWinners.json();
            const dataSeconds = await responseSeconds.json();
            const dataThirds = await responseThirds.json();

            setSchedule(dataSchedule.MRData.RaceTable.Races);
            setWinners(dataWinners.MRData.RaceTable.Races);
            setSeconds(dataSeconds.MRData.RaceTable.Races);
            setThirds(dataThirds.MRData.RaceTable.Races);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    if(isLoading){
        return (
            <Spinner animation="border" className="mt-2 align-self-center" style={{color: "#ff1801"}} />
        );
    }
    else{
        return (
            <Container className="mt-2">
                <h2 className="mb-4 p-3 fst-italic" style={{fontFamily: "Formula1-Regular"}}>F1 2023 Schedule</h2>
                <Row className="d-flex flex-wrap">
                    {
                        schedule.map((race, index) => {
                            const dateDebut = new Date(race?.FirstPractice?.date);
                            const dateFin = new Date(race?.date);
                            
                            if(winners[index]){
                                var winnerPosition = winners[index]?.Results[0]?.position;
                                var winnerName = winners[index]?.Results[0]?.Driver?.familyName;
                                var winnerTeamId = winners[index]?.Results[0]?.Constructor?.constructorId;
                            }
                            if(seconds[index]){
                                var secondPosition = seconds[index]?.Results[0]?.position;
                                var secondName = seconds[index]?.Results[0]?.Driver?.familyName;
                                var secondTeamId = seconds[index]?.Results[0]?.Constructor?.constructorId;
                            }
                            if(thirds[index]){
                                var thridPosition = thirds[index]?.Results[0]?.position;
                                var thirdName  = thirds[index]?.Results[0]?.Driver?.familyName;
                                var thirdTeamId = thirds[index]?.Results[0]?.Constructor?.constructorId;
                            }
                            
                            return (
                                <Col sm={12} md={6} lg={4} className="mb-3" key={index}>
                                    <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                        <Container style={myBorder} >
                                            <Container className="d-flex justify-content-between align-items-center p-0">
                                                <p className="m-0" style={{fontFamily: "Formula1-Regular"}}>Round {race?.round}</p>
                                                <Image src={flags[race?.Circuit?.Location?.country]} alt={"Flag of " + race?.Circuit?.Location?.country} className="border rounded-3" height={30} />
                                            </Container>
                                            <Container className="d-flex flex-row align-items-center mt-2 border-2 border-black border-bottom border-end rounded-4">
                                                <Container className="d-flex flex-column align-items-center">
                                                    <p className="m-0" style={dateStyle}>{dateDebut.toLocaleDateString("en-GB", {day: "2-digit"})}</p>
                                                    <p className="m-0" style={dateStyle}>{dateDebut.toLocaleDateString("en-GB", {month: "short"})}</p>
                                                </Container>
                                                <p style={{fontFamily: "Formula1-Wide"}}>-</p>
                                                <Container className="d-flex flex-column align-items-center">
                                                    <p className="m-0" style={dateStyle}>{dateFin.toLocaleDateString("en-GB", {day: "2-digit"})}</p>
                                                    <p className="m-0" style={dateStyle}>{dateFin.toLocaleDateString("en-GB", {month: "short"})}</p>
                                                </Container>
                                            </Container>
                                            <p className="text-center mt-2" style={{fontFamily: "Formula1-Bold", letterSpacing: "0.0001rem"}}>{race?.raceName}</p>
                                            {
                                                winners[index] ? (
                                                    <Container className="d-flex flex-column justify-content-center mb-2 pt-2 rounded-2" style={{backgroundColor: "#38383f", height: 170}}>
                                                        {
                                                            winners[index] ? (
                                                                <SmallDriver
                                                                    position={winnerPosition}
                                                                    name={winnerName}
                                                                    color={currentConstructorColor[winnerTeamId]}
                                                                />
                                                            ) : ("")
                                                        }
                                                        {
                                                            seconds[index] ? (
                                                                <SmallDriver
                                                                    position={secondPosition}
                                                                    name={secondName}
                                                                    color={currentConstructorColor[secondTeamId]}
                                                                />
                                                            ) : ("")
                                                        }
                                                        {
                                                            thirds[index] ? (
                                                                <SmallDriver
                                                                    position={thridPosition}
                                                                    name={thirdName}
                                                                    color={currentConstructorColor[thirdTeamId]}
                                                                />
                                                            ) : ("")
                                                        }
                                                    </Container>
                                                ) : (
                                                    <TrackImageContainer heightSize={170} circuitId={race?.Circuit?.circuitId}/>
                                                )
                                            }
                                        </Container>
                                    </a>
                                </Col>
                            );
                        })
                    }
                </Row>
            </Container>
        );
    }
}
