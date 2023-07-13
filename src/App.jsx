import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import './fonts/Formula1-Black.ttf';
import './fonts/Formula1-Bold.ttf';
import './fonts/Formula1-Regular.ttf';
import './fonts/Formula1-Wide.ttf';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Schedule from './components/Schedule';
import DriversStandings from './components/DriversStandings';
import ConstructorsStandings from './components/ConstructorsStandings';
import DriverChampions from './components/DriverChampions';
import ConstructorChampions from './components/ConstructorChampions';
import Tracks from './components/Tracks';
import NotFound from './components/NotFound';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="App">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/schedule' element={<Schedule />} />
                    <Route path='/driversStandings' element={<DriversStandings />} />
                    <Route path='/constructorsStandings' element={<ConstructorsStandings />} />
                    <Route path='/driverChampions' element={<DriverChampions />} />
                    <Route path='/constructorChampions' element={<ConstructorChampions />} />
                    <Route path='/tracks' element={<Tracks />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
