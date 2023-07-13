import React from "react";
import '../styles/NextRace.css';
import RaceContainer from "./raceComponents/RaceContainer";

export default function Home(){
    return (
        <div className="nextRaceContainer">
            <h1 className="titleNextRace">Next Race</h1>
            <RaceContainer round={'next'} />
        </div>
    );
}