import React, { useEffect, useState } from "react";
import '../styles/NextRace.css';
import { flags } from '../constants/flags';

export default function NextRace(){
    const [isLoading, setIsLoading] = useState(true);
    const [race, setRace] = useState([]);

    const fetchInfo = async () => {
        try{
            const response = await fetch('https://ergast.com/api/f1/current/next.json');
            const data = await response.json();
            setRace(data.MRData.RaceTable.Races[0]);
            console.log(race);
        }catch(error){
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    let dateFP1 = new Date(race?.FirstPractice?.date + 'T' + race?.FirstPractice?.time);
    let dateFP2 = new Date(race?.SecondPractice?.date + 'T' + race?.SecondPractice?.time);
    let dateFP3 = new Date(race?.ThirdPractice?.date + 'T' + race?.ThirdPractice?.time);
    let dateQuali = new Date(race?.Qualifying?.date + 'T' + race?.Qualifying?.time);
    let dateRace = new Date(race?.date + 'T' + race?.time);

    return (
        <div className="nextRaceContainer">
            <h1 className="titleNextRace">Next Race</h1>
            <div className="raceContainer">
                <div className="raceRoundNameContainer">
                    <div className="roundContainer">
                        <p className="roundText">Round</p>
                        <p className="roundNumber">{race?.round}</p>
                    </div>
                    <img src={flags[race?.Circuit?.Location?.country]} alt="Flag image" className="countryFlag" />
                    <p className="raceName">{race?.raceName}</p>
                </div>
                <h2 className="scheduleText">SCHEDULE</h2>
                <div className="allSchedule">
                    <div className="scheduleBox">
                        <div className="scheduleDate">
                            <p className="scheduleDateNumber">{dateRace.toLocaleDateString('en-GB', {day: '2-digit'})}</p>
                            <p className="scheduleDateMonth">{dateRace.toLocaleDateString('en-GB', {month: 'short'})}</p>
                        </div>
                        <div className="verticalBar"></div>
                        <div className="scheduleSession">
                            <p className="scheduleSessionName">RACE</p>
                            <p className="scheduleSessionTime">{dateRace.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</p>
                        </div>
                    </div>
                    <div className="scheduleBox">
                        <div className="scheduleDate">
                            <p className="scheduleDateNumber">{dateQuali.toLocaleDateString('en-GB', {day: '2-digit'})}</p>
                            <p className="scheduleDateMonth">{dateQuali.toLocaleDateString('en-GB', {month: 'short'})}</p>
                        </div>
                        <div className="verticalBar"></div>
                        <div className="scheduleSession">
                            <p className="scheduleSessionName">QUALIFYING</p>
                            <p className="scheduleSessionTime">{dateQuali.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</p>
                        </div>
                    </div>
                    <div className="scheduleBox">
                        <div className="scheduleDate">
                            <p className="scheduleDateNumber">{dateFP3.toLocaleDateString('en-GB', {day: '2-digit'})}</p>
                            <p className="scheduleDateMonth">{dateFP3.toLocaleDateString('en-GB', {month: 'short'})}</p>
                        </div>
                        <div className="verticalBar"></div>
                        <div className="scheduleSession">
                            <p className="scheduleSessionName">PRACTICE 3</p>
                            <p className="scheduleSessionTime">{dateFP3.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</p>
                        </div>
                    </div>
                    <div className="scheduleBox">
                        <div className="scheduleDate">
                            <p className="scheduleDateNumber">{dateFP2.toLocaleDateString('en-GB', {day: '2-digit'})}</p>
                            <p className="scheduleDateMonth">{dateFP2.toLocaleDateString('en-GB', {month: 'short'})}</p>
                        </div>
                        <div className="verticalBar"></div>
                        <div className="scheduleSession">
                            <p className="scheduleSessionName">PRACTICE 2</p>
                            <p className="scheduleSessionTime">{dateFP2.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</p>
                        </div>
                    </div>
                    <div className="scheduleBox">
                        <div className="scheduleDate">
                            <p className="scheduleDateNumber">{dateFP1.toLocaleDateString('en-GB', {day: '2-digit'})}</p>
                            <p className="scheduleDateMonth">{dateFP1.toLocaleDateString('en-GB', {month: 'short'})}</p>
                        </div>
                        <div className="verticalBar"></div>
                        <div className="scheduleSession">
                            <p className="scheduleSessionName">PRACTICE 1</p>
                            <p className="scheduleSessionTime">{dateFP1.toLocaleTimeString('en-GB', {hour: '2-digit', minute: '2-digit'})}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}