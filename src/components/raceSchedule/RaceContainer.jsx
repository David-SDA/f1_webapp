import React from "react";

import RaceHeaderContainer from './RaceHeaderContainer';
import ScheduleNormalWeekendContainer from './ScheduleNormalWeekendContainer';
import ScheduleSprintWeekendContainer from './ScheduleSprintWeekendContainer';

import { Container } from "react-bootstrap";

export default function RaceContainer({race}){
    const dateFP1 = new Date(race?.FirstPractice?.date + 'T' + race?.FirstPractice?.time);
    const dateFP2 = new Date(race?.SecondPractice?.date + 'T' + race?.SecondPractice?.time);
    const dateQuali = new Date(race?.Qualifying?.date + 'T' + race?.Qualifying?.time);
    const dateRace = new Date(race?.date + 'T' + race?.time);

    if(race?.ThirdPractice){
        var dateFP3 = new Date(race?.ThirdPractice?.date + 'T' + race?.ThirdPractice?.time);
    }
    else{
        var dateQualiSprint = new Date(race?.SecondPractice?.date + 'T' + race?.SecondPractice?.time);
        var dateSprint = new Date(race?.Sprint?.date + 'T' + race?.Sprint?.time);
    }

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
                        dateQualiSprint={dateQualiSprint}
                        dateSprint={dateSprint}
                        dateQuali={dateQuali}
                        dateRace={dateRace}
                    />
            }
        </Container>
    );
}