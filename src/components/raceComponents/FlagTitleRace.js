import React from "react";
import { flags } from "../../constants/flags";
import '../../styles/raceComponentsStyles/flagTitleRace.css';

export default function FlagTitleRace({raceName, country}){
    return (
        <>
            <img src={flags[country]} alt="Flag image" className="countryFlag" />
            <p className="raceName">{raceName}</p>
        </>
    );
}