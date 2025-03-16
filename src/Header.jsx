import { Link } from 'react-router-dom'
import { supabase } from './main.jsx' // Make sure this path is correct

export default function Header({ session }) {
    const handleSignOut = () => {
        supabase.auth.signOut()
    }

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
                        {session && (
                            <>
                                <li className="user-email">{session.user.email}</li>
                                <li>
                                    <button 
                                        onClick={handleSignOut} 
                                        className="nav-link sign-out-btn"
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    )
}