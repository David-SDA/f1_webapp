import '../styles/navBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Navbar(){
    return (
        <header className="navBar">
            <h1 className='title'><Link to='/'>Title</Link></h1>
            <div className='navList'>
                <Link to="/schedule" className='navLink'>Schedule</Link>
                <div className='subNav'>
                    <button className='subNavButton'>Standings <FontAwesomeIcon icon={faCaretDown} /></button>
                    <div class="subNavContent">
                        <Link to="/driversStandings" className='navLink'>Drivers</Link>
                        <Link to="/constructorsStandings" className='navLink'>Constuctors</Link>
                    </div>
                </div>
                <div className='subNav'>
                    <button className='subNavButton'>History <FontAwesomeIcon icon={faCaretDown} /><i class="fa-solid fa-caret-down"></i></button>
                    <div className='subNavContent'>
                        <Link to='/driverChampions' className='navLink'>Driver Champions</Link>
                        <Link to='/constructorChampions' className='navLink'>Constructor Champions</Link>
                        <Link to='/tracks' className='navLink'>Tracks</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}