import { useEffect, useState } from "react";
import { getTopics } from "../files/apis";
import { Link } from "react-router-dom";

export default function Topics({ session }) {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTopics()
            .then(({ topics }) => {
                setTopics(topics);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, []);

    const mappedTopics = topics.map((topic) => (
        <section key={topic.slug} className="topics-card">
            <h2 className="topic-title">{topic.slug}</h2>
            <p className="topic-description">{topic.description}</p>
            
            {/* Conditional rendering of different link types */}
            {session ? (
                // For logged-in users, link directly to the topic articles
                <Link to={`/articles?topic=${topic.slug}`} className="topic-btn">
                    See all {topic.slug} articles
                </Link>
            ) : (
                // For non-logged-in users, link to the login page
                <Link to="/login" className="topic-btn login-required">
                   Read {topic.slug} articles
                </Link>
            )}
        </section>
    ));

    return (
        <div className="topics-container">
            <h1 className="topics-header">Explore Topics</h1>
            {loading ? 
                <p className="loading-message">Loading Topics, Please Wait...</p>
            : (
                <div className="topics-grid">
                    {mappedTopics}
                </div>
            )}
        </div>
    );
}