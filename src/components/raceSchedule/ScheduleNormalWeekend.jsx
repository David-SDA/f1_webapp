import React from "react";

import ScheduleOneSession from './ScheduleOneSession';

import { Container } from "react-bootstrap";

export default function ScheduleNormalWeekend({dateFP1, dateFP2, dateFP3, dateQuali, dateRace}){
    return (
        <Container>
            <h3 className="ms-3 mt-2 fst-italic" style={{fontFamily: 'Formula1-Bold'}}>SCHEDULE</h3>
            <Container className="d-flex flex-column p-0">
                <ScheduleOneSession sessionName={'RACE'} date={dateRace} />
                <ScheduleOneSession sessionName={'QUALIFYING'} date={dateQuali} />
                <ScheduleOneSession sessionName={'PRACTICE 3'} date={dateFP3} />
                <ScheduleOneSession sessionName={'PRACTICE 2'} date={dateFP2} />
                <ScheduleOneSession sessionName={'PRACTICE 1'} date={dateFP1} />
            </Container>
        </Container>
    );
}