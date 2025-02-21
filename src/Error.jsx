import { Link } from "react-router"

export default function ErrorPage({ message }) {
    return (
        <div className="error-container">
            <h1>Oops! Something went wrong</h1>
            <p>{message}</p>
            <Link to="/articles" className="error-home-link">Back to Articles</Link>
        </div>
    )
}