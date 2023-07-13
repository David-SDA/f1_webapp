import React from "react";
import '../../styles/raceComponentsStyles/raceHeader.css';

import Round from "./Round";
import FlagTitleRace from "./FlagTitleRace";

export default function RaceHeader({round, raceName, country}){
    return (
        <div className="raceRoundNameContainer">
            <Round round={round} />
            <FlagTitleRace raceName={raceName} country={country} />
        </div>
    );
}