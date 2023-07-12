import React, { useEffect, useState } from "react";
import '../styles/NextRace.css';

import ScheduleNormalWeekend from "./raceComponents/ScheduleNormalWeekend";
import ScheduleSprintWeekend from "./raceComponents/ScheduleSprintWeekend";
import RaceHeader from "./raceComponents/RaceHeader";

export default function NextRace(){
    const [race, setRace] = useState([]);

    const fetchInfo = async () => {
        try{
            const response = await fetch('https://ergast.com/api/f1/current/next.json');
            const data = await response.json();
            setRace(data.MRData.RaceTable.Races[0]);
            console.log(race);
        }catch(error){
            console.log(error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    let dateFP1 = new Date(race?.FirstPractice?.date + 'T' + race?.FirstPractice?.time);
    let dateFP2 = new Date(race?.SecondPractice?.date + 'T' + race?.SecondPractice?.time);
    let dateQuali = new Date(race?.Qualifying?.date + 'T' + race?.Qualifying?.time);
    let dateRace = new Date(race?.date + 'T' + race?.time);

    if(race?.ThirdPractice){
        var dateFP3 = new Date(race?.ThirdPractice?.date + 'T' + race?.ThirdPractice?.time);
    }
    else{
        var dateSprint = new Date(race?.Sprint?.date + 'T' + race?.Sprint?.time);
    }

    return (
        <div className="nextRaceContainer">
            <h1 className="titleNextRace">Next Race</h1>
            <div className="raceContainer">
                <RaceHeader
                    round={race?.round}
                    raceName={race?.raceName}
                    country={race?.Circuit?.Location?.country}
                />
                {
                    (dateFP3) ? 
                        <ScheduleNormalWeekend
                            dateFP1={dateFP1}
                            dateFP2={dateFP2}
                            dateFP3={dateFP3}
                            dateQuali={dateQuali}
                            dateRace={dateRace} 
                        />
                    :
                        <ScheduleSprintWeekend
                            dateFP1={dateFP1}
                            dateQuali={dateQuali}
                            dateFP2={dateFP2}
                            dateSprint={dateSprint}
                            dateRace={dateRace}
                        />
                }
            </div>
        </div>
    );
}