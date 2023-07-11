import '../styles/navBar.css';
import '../fonts/Formula1-Bold.ttf';

export default function Navbar(){
    return (
        <nav className="navBar">
            <h1>Title</h1>
            <ul>
                <li><a href="#">Schedule</a></li>
                <li><a href="#">Standings</a></li>
                <li><a href="#">History</a></li>
            </ul>
        </nav>
    );
}