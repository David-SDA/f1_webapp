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
import ConstructorsStandingsPage from './components/ConstructorsStandingsPage';
import DriverChampionsPage from './components/DriverChampionsPage';
import ConstructorChampionsPage from './components/ConstructorChampionsPage';
import TracksPage from './components/TracksPage';
import NotFoundPage from './components/NotFoundPage';

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
                    <Route path='/constructorsStandings' element={<ConstructorsStandingsPage />} />
                    <Route path='/driverChampions' element={<DriverChampionsPage />} />
                    <Route path='/constructorChampions' element={<ConstructorChampionsPage />} />
                    <Route path='/tracks' element={<TracksPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
