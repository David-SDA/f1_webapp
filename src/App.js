import './App.css';

import './fonts/Formula1-Black.ttf';
import './fonts/Formula1-Bold.ttf';
import './fonts/Formula1-Regular.ttf';
import './fonts/Formula1-Wide.ttf';

import Navbar from './components/Navbar';
import NextRace from './components/NextRace';

function App() {
    return (
        <div className="App">
            <Navbar />
            <NextRace />
        </div>
    );
}

export default App;
