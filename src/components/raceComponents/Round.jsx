import React from "react";
import '../../styles/raceComponentsStyles/round.css';

export default function Round({round}){
    return (
        <div className="roundContainer">
            <p className="roundText">Round</p>
            <p className="roundNumber">{round}</p>
        </div>
    );
}