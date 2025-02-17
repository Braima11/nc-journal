import getAllArticles from "../files/apis"
import { useState, useEffect } from "react"

export default function AllArticles() {
    const [allArticles, setAllArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllArticles()
            .then((response) => {
                console.log(response)
                setAllArticles(response.articles) 
                setLoading(false)
            })
    }, [])
    

    const mappedArticles = allArticles.map((article) => {
        return (
            <section  key={article.article_id} className="article-card">
                <h2>{article.title}</h2>
                <img 
                    src={article.article_img_url} 
                    alt={article.title}
                />
                <p>By {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Comments: {article.comment_count}</p>
                <p>Votes: {article.votes}</p>
                <p>{article.body.slice(0, 100)}...</p>  
                <p>Posted on: {new Date(article.created_at).toLocaleDateString()}</p>
            </section>
        )
    })

    return (
        <div className="articles-container">
            {loading  ?<p>Loading Articles Please Wait ...</p>:
            mappedArticles}
            
        </div>
    )
}