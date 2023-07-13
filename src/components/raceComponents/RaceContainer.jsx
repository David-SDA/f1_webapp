import React, { useEffect, useState } from "react";
import '../../styles/raceComponentsStyles/raceContainer.css';

import RaceHeader from './RaceHeader';
import ScheduleNormalWeekend from './ScheduleNormalWeekend';
import ScheduleSprintWeekend from './ScheduleSprintWeekend';
import LoadingCircle from "../others/LoadingCircle";

export default function RaceContainer({round}){
    const [race, setRace] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch('https://ergast.com/api/f1/current/' + round + '.json');
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
    let dateQuali = new Date(race?.Qualifying?.date + 'T' + race?.Qualifying?.time);
    let dateRace = new Date(race?.date + 'T' + race?.time);

    if(race?.ThirdPractice){
        var dateFP3 = new Date(race?.ThirdPractice?.date + 'T' + race?.ThirdPractice?.time);
    }
    else{
        var dateSprint = new Date(race?.Sprint?.date + 'T' + race?.Sprint?.time);
    }

    if(isLoading){
        return (
            <LoadingCircle />
        )
    }else{
        return (
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
        );
    }
}