import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="header">
            <div className="header-content">
                <Link to="/articles" className="site-title">
                    <h1>News Journal</h1>
                </Link>
                <nav>
                    <ul className="nav-list">
                        <li><Link to="/articles" className="nav-link">Articles</Link></li>
                        <li><Link to="/topics" className="nav-link">Topics</Link></li>
                        <li><Link to="/users" className="nav-link">Users</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}