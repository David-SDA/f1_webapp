import React, { useEffect, useState } from "react";
import '../styles/NextRace.css';
import { flags } from '../constants/flags';
import ScheduleOneSession from "./raceComponents/ScheduleOneSession";

export default function NextRace(){
    const [isLoading, setIsLoading] = useState(true);
    const [race, setRace] = useState([]);

    const fetchInfo = async () => {
        try{
            const response = await fetch('https://ergast.com/api/f1/current/next.json');
            const data = await response.json();
            setRace(data.MRData.RaceTable.Races[0]);
            console.log(race);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    let dateFP1 = new Date(race?.FirstPractice?.date + 'T' + race?.FirstPractice?.time);
    let dateFP2 = new Date(race?.SecondPractice?.date + 'T' + race?.SecondPractice?.time);
    let dateFP3 = new Date(race?.ThirdPractice?.date + 'T' + race?.ThirdPractice?.time);
    let dateQuali = new Date(race?.Qualifying?.date + 'T' + race?.Qualifying?.time);
    let dateRace = new Date(race?.date + 'T' + race?.time);

    return (
        <div className="nextRaceContainer">
            <h1 className="titleNextRace">Next Race</h1>
            <div className="raceContainer">
                <div className="raceRoundNameContainer">
                    <div className="roundContainer">
                        <p className="roundText">Round</p>
                        <p className="roundNumber">{race?.round}</p>
                    </div>
                    <img src={flags[race?.Circuit?.Location?.country]} alt="Flag image" className="countryFlag" />
                    <p className="raceName">{race?.raceName}</p>
                </div>
                <h2 className="scheduleText">SCHEDULE</h2>
                <div className="allSchedule">
                    <ScheduleOneSession sessionName={'RACE'} date={dateRace} />
                    <ScheduleOneSession sessionName={'QUALIFYING'} date={dateQuali} />
                    <ScheduleOneSession sessionName={'PRACTICE 3'} date={dateFP3} />
                    <ScheduleOneSession sessionName={'PRACTICE 2'} date={dateFP2} />
                    <ScheduleOneSession sessionName={'PRACTICE 1'} date={dateFP1} />
                </div>
            </div>
        </div>
    );
}