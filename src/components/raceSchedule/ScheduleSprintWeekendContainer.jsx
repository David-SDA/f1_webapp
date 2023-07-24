import React from "react";

import ScheduleOneSessionContainer from './ScheduleOneSessionContainer';

import { Container } from "react-bootstrap";

export default function ScheduleNormalWeekendContainer({dateFP1, dateQuali, dateFP2, dateSprint, dateRace}){
    return (
        <Container>
            <h3 className="ms-3 mt-2 fst-italic" style={{fontFamily: 'Formula1-Bold'}}>SCHEDULE</h3>
            <Container className="d-flex flex-column p-0">
                <ScheduleOneSessionContainer sessionName={'RACE'} date={dateRace} />
                <ScheduleOneSessionContainer sessionName={'SPRINT'} date={dateSprint} />
                <ScheduleOneSessionContainer sessionName={'PRACTICE 2'} date={dateFP2} />
                <ScheduleOneSessionContainer sessionName={'QUALIFYING'} date={dateQuali} />
                <ScheduleOneSessionContainer sessionName={'PRACTICE 1'} date={dateFP1} />
            </Container>
        </Container>
    );
}