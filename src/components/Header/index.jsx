import './header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="header">
            <div className='logo'>
                <img className="img-logo" src="src/components/Header/Logo/film-hive-logo.png" alt="logo img" />
                <Link to={"/"}>
                    <img className='title-logo' src="src/components/Header/Logo/film-hive-title-logo.png" alt="logo title" />
                </Link>
               
            </div>
          
            <div className='pages-button'>
                <Link to="/lista">Minha lista</Link>
                
                <Link to="/favoritos">Favoritos</Link>
            </div>
          
        </header>
    );
}

export default Header;
