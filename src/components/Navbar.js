import '../styles/navBar.css';
import '../fonts/Formula1-Bold.ttf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Navbar(){
    return (
        <header className="navBar">
            <h1 className='title'><a href='#'>Title</a></h1>
            <div className='navList'>
                <a href='#' className='navLink'>Schedule</a>
                <div className='subNav'>
                    <button className='subNavButton'>Standings <FontAwesomeIcon icon={faCaretDown} /></button>
                    <div class="subNavContent">
                        <a href="#" className='navLink'>Drivers</a>
                        <a href="#" className='navLink'>Constuctors</a>
                    </div>
                </div>
                <div className='subNav'>
                    <button className='subNavButton'>History <FontAwesomeIcon icon={faCaretDown} /><i class="fa-solid fa-caret-down"></i></button>
                    <div className='subNavContent'>
                        <a href="#" className='navLink'>Drivers Champions</a>
                        <a href="#" className='navLink'>Constructors Champions</a>
                        <a href="#" className='navLink'>Tracks</a>
                    </div>
                </div>
            </div>
        </header>
    );
}