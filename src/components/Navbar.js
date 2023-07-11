import '../styles/navBar.css';
import '../fonts/Formula1-Bold.ttf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function Navbar(){
    return (
        <header className="navBar">
            <h1><a href='#' className='title'>Title</a></h1>
            <div className='navList'>
                <div>
                    <a href='#' className='navLink'>Schedule</a>
                </div>
                <div className='subNav'>
                    <button className='subNavButton'>Standings <FontAwesomeIcon icon={faCaretDown} /></button>
                    <div className='subNavContent'>
                        <a href="#">Drivers</a>
                        <a href="#">Constructors</a>
                    </div>
                </div>
                <div className='subNav'>
                    <button className='subNavButton'>History <FontAwesomeIcon icon={faCaretDown} /><i class="fa-solid fa-caret-down"></i></button>
                    <div className='subNavContent'>
                        <a href="#">Drivers Champions</a>
                        <a href="#">Constructors Champions</a>
                        <a href="#">Circuits</a>
                    </div>
                </div>
            </div>
        </header>
    );
}