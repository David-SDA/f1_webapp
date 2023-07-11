import React, { useEffect, useState } from "react";
import '../styles/NextRace.css';

export default function NextRace(){
    const [isLoading, setIsLoading] = useState(true);
    const [race, setRace] = useState([]);

    const fetchInfo = async () => {
        try{
            const response = await fetch('https://ergast.com/api/f1/current/next.json');
            const data = await response.json();
            setRace(data.MRData.RaceTable);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="nextRaceContainer">
            <h1 className="titleNextRace">Next Race</h1>
            <div className="raceContainer">
                <div className="roundContainer">
                    <p className="roundText">Round</p>
                    <p className="roundNumber">{race?.round}</p>
                </div>
                <p className="raceName">RACE NAME</p>
            </div>
            
        </div>
    );
}