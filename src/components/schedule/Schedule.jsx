import React, { useEffect, useState } from "react";

import Dates from "./Dates";
import TopThreeDriversRace from "./TopThreeDriversRace";
import TrackImageContainer from "./TrackImageContainer";

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

    const [schedule, setSchedule] = useState([]); // Le programme complet
    const [winners, setWinners] = useState([]); // Les vainqueurs des courses déjà couru
    const [seconds, setSeconds] = useState([]); // Les deuxièmes des courses déjà couru
    const [thirds, setThirds] = useState([]); // Les troisièmes des courses déjà couru
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
                            
                            return (
                                <Col sm={12} md={6} lg={4} className="mb-3" key={index}>
                                    <a href="#" className="link-dark link-underline-opacity-0 link-opacity-50-hover">
                                        <Container style={myBorder} >
                                            <Container className="d-flex justify-content-between align-items-center p-0">
                                                <p className="m-0" style={{fontFamily: "Formula1-Regular"}}>Round {race?.round}</p>
                                                <Image src={flags[race?.Circuit?.Location?.country]} alt={"Flag of " + race?.Circuit?.Location?.country} className="border rounded-3" height={30} />
                                            </Container>
                                            <Dates dateDebut={dateDebut} dateFin={dateFin} />
                                            <p className="text-center mt-2" style={{fontFamily: "Formula1-Bold", letterSpacing: "0.0001rem"}}>{race?.raceName} &gt;</p>
                                            {
                                                winners[index] && seconds[index] && thirds[index] ? (
                                                    <TopThreeDriversRace winner={winners[index]} second={seconds[index]} third={thirds[index]} />
                                                ) : (
                                                    <TrackImageContainer heightSize={170} circuitId={race?.Circuit?.circuitId} country={race?.Circuit?.Location?.country} />
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
