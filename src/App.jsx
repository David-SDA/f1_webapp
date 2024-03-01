import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import './fonts/Formula1-Black.ttf';
import './fonts/Formula1-Bold.ttf';
import './fonts/Formula1-Regular.ttf';
import './fonts/Formula1-Wide.ttf';

import TopNavBar from './components/TopNavBar';
import HomePage from './components/HomePage';
import SchedulePage from './components/schedule/SchedulePageContainer';
import RoundResultsPage from './components/raceResults/RoundResultsPage';
import DriverStandingsPage from './components/standings/drivers/DriverStandingsPage';
import ConstructorStandingsPage from './components/standings/constructors/ConstructorStandingsPage';
import DriverChampionsPage from './components/champions/driver/DriverChampionsPage';
import ConstructorChampionsPage from './components/champions/constructor/ConstructorChampionsPage';
import CurrentTracksPage from './components/tracks/current/CurrentTracksPage';
import AllTracksPage from './components/tracks/all/AllTracksPage';
import AllTracksOnePage from './components/tracks/all/AllTracksOnePage';
import CurrentDriversPage from './components/drivers/current/CurrentDriversPage';
import CurrentDriversOnePage from './components/drivers/current/CurrentDriversOnePage';

import CurrentConstructorsPage from './components/constructors/current/CurrentConstructorsPage';
import CurrentConstructorsOnePage from './components/constructors/current/CurrentConstructorsOnePage';
import NotFoundPage from './components/NotFoundPage';
import AllDriversPage from './components/drivers/all/AllDriversPage';
import AllDriversOnePage from './components/drivers/all/AllDriversOnePage';
import AllConstructorsPage from './components/constructors/all/AllConstructorsPage';


function App() {
    return (
        <Router>
            <TopNavBar />
            <div className="App">
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/schedule' element={<SchedulePage />} />
                    <Route path='/schedule/:round/:format' element={<RoundResultsPage />} />
                    <Route path='/driverStandings' element={<DriverStandingsPage />} />
                    <Route path='/constructorStandings' element={<ConstructorStandingsPage />} />
                    <Route path='/driverChampions' element={<DriverChampionsPage />} />
                    <Route path='/constructorChampions' element={<ConstructorChampionsPage />} />
                    <Route path='/currentTracks' element={<CurrentTracksPage />} />
                    <Route path='/allTracks' element={<AllTracksPage />} />
                    <Route path='/allTracks/:circuitId' element={<AllTracksOnePage />} />
                    <Route path='/currentDrivers' element={<CurrentDriversPage />} />
                    <Route path='/currentDrivers/:driverId' element={<CurrentDriversOnePage />} />
                    <Route path='/allDrivers' element={<AllDriversPage />} />
                    <Route path='/allDrivers/:driverId' element={<AllDriversOnePage />} />
                    <Route path='/currentConstructors' element={<CurrentConstructorsPage />} />
                    <Route path='/currentConstructors/:constructorId' element={<CurrentConstructorsOnePage />} />
                    <Route path='/allConstructors' element={<AllConstructorsPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
