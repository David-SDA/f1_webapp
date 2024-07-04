import React from "react";

import { Col } from "react-bootstrap";

export default function OneSeasonOneRace({
    season,
    round,
    date,
    raceName,
}){
    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }
    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }
    const textWide = {
        fontFamily: "Formula1-Wide",
        letterSpacing: "0.0005rem",
    }

    const raceDate = new Date(date);

    // Fonction pour obtenir le lundi suivant la course
    const getNextMonday = (date) => {
        const resultDate = new Date(date);
        resultDate.setDate(resultDate.getDate() + (1 + 7 - resultDate.getDay()) % 7);
        resultDate.setHours(0, 0, 0, 0);
        return resultDate;
    };

    const nextMonday = getNextMonday(raceDate);
    const today = new Date();

    const isPastNextMonday = today > nextMonday;

    return (
        <Col xs={6} sm={4} md={3} lg={2} className="bg-white m-1 rounded" style={textRegular}>
            {
                isPastNextMonday ? (
                    <a href={"/races/" + season + "/" + round} className="link-dark link-underline-opacity-0 link-underline-opacity-100-hover">
                        <p><span style={textWide}>{round}</span> : <i>{new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</i></p>
                        <p style={textBold}>{raceName}</p>
                    </a>
                ) : (
                    <div className="text-muted">
                        <p><span style={textWide}>{round}</span> : <i>{raceDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</i></p>
                        <p style={textBold}>{raceName}</p>
                    </div>
                )
            }
        </Col>
    )
}