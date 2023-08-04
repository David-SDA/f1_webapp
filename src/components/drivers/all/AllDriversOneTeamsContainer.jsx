import React from "react";

import { flagsNationality } from "../../../constants/flagsNationality";

import { Card, Col, Image } from "react-bootstrap";

export default function AllDriversOneTeamContainer({
    name,
    nationality,
    driverStandings,
}){
    const seasonsByTeams = {};
    
    for(const driverStanding of driverStandings){
        const season = driverStanding?.season;
        const team = driverStanding?.DriverStandings[0]?.Constructors[0]?.name;

        if(!seasonsByTeams[team]){
            seasonsByTeams[team] = [];
        }

        seasonsByTeams[team].push(season);
    }

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    const textBold = {
        fontFamily: "Formula1-Bold",
        letterSpacing: "0.0005rem",
    }

    return (
        <Col md={6} lg={4} xl={3} className="mt-1 mb-1">
            <Card>
                <a href="#" className="p-2 link-dark link-underline-opacity-0 link-opacity-75-hover">
                    <Card.Title className="d-flex justify-content-center" style={textBold}>
                        {name}
                    </Card.Title>
                    <Card.Subtitle className="d-flex justify-content-center align-items-center">
                        <Image src={flagsNationality[nationality]} rounded className="me-1 border" style={{height: 20}} />
                        <span className="fst-italic" style={textRegular}>{nationality}</span>
                    </Card.Subtitle>
                    <Card.Body className="text-center ps-0 pe-0" style={{...textRegular, height: "6rem"}}>
                        (
                            {
                                seasonsByTeams[name]?.map((season, seasonIndex) => {
                                    return (
                                        <span key={seasonIndex}>
                                            {season}
                                            {seasonIndex !== seasonsByTeams[name].length - 1 ? ", " : ""}
                                        </span>
                                    );
                                }) || null
                            }
                        )
                    </Card.Body>
                </a>
            </Card>
        </Col>
    );
}