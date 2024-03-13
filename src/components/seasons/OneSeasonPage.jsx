import React from "react";

import { Container } from "react-bootstrap";

import { useParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage";

const isValidSeason = (year) => {
    const currentYear = new Date().getFullYear();
    const minYear = 1950;

    if(!isNaN(year) && year >= minYear && year <= currentYear){
        return true;
    }
    else{
        return false;
    }
}

export default function OneSeasonPage(){
    const { season } = useParams();

    if(!isValidSeason(season)){
        return <NotFoundPage />;
    }

    const textRegular = {
        fontFamily: "Formula1-Regular",
        letterSpacing: "0.0005rem",
    }

    return (
        <Container>
            <h1 className="fst-italic mt-1" style={textRegular}>{season} Season</h1>
        </Container>
    )
}