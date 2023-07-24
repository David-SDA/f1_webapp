import React, { useEffect, useState } from "react";

import RaceHeaderContainer from './RaceHeaderContainer';
import ScheduleNormalWeekendContainer from './ScheduleNormalWeekendContainer';
import ScheduleSprintWeekendContainer from './ScheduleSprintWeekendContainer';

import { Container, Spinner } from "react-bootstrap";

export default function RaceContainer({round, onDateReceived}){
    const [race, setRace] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInfo = async () => {
        try{
            const response = await fetch('https://ergast.com/api/f1/current/' + round + '.json');
            const data = await response.json();
            setRace(data.MRData.RaceTable.Races[0]);
            onDateReceived(data.MRData.RaceTable.Races[0].date + 'T' + data.MRData.RaceTable.Races[0].time);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, [onDateReceived]);

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
            <Spinner animation="border" style={{color: "#ff1801"}} />
        )
    }else{
        return (
            <Container className="d-flex flex-column shadow-lg rounded-4 p-2 mb-5" style={{backgroundColor: '#f8f8f8'}}>
                <RaceHeaderContainer
                    round={race?.round}
                    raceName={race?.raceName}
                    country={race?.Circuit?.Location?.country}
                />
                {
                    (dateFP3) ? 
                        <ScheduleNormalWeekendContainer
                            dateFP1={dateFP1}
                            dateFP2={dateFP2}
                            dateFP3={dateFP3}
                            dateQuali={dateQuali}
                            dateRace={dateRace} 
                        />
                    :
                        <ScheduleSprintWeekendContainer
                            dateFP1={dateFP1}
                            dateQuali={dateQuali}
                            dateFP2={dateFP2}
                            dateSprint={dateSprint}
                            dateRace={dateRace}
                        />
                }
            </Container>
        );
    }
}