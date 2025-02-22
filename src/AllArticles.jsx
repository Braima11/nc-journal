import { getAllArticles } from "../files/apis"
import { useState, useEffect } from "react"
import { useSearchParams } from 'react-router-dom'
import ArticleCard from "./ArticleCard"

export default function AllArticles() {
    const [allArticles, setAllArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [sortBy, setSortBy] = useState('created_at-desc') 
    const [searchParams] = useSearchParams()
    
   
    const topic = searchParams.get('topic')
    const author = searchParams.get("author")

    useEffect(() => {
        const [sort_by, order] = sortBy.split('-')
        
        getAllArticles({ topic, sort_by, order,author })
            .then((response) => {

                

              if (author) {
                response.articles = response.articles.filter ((article)=>{
                    return article.author === author
                })
              }


                setAllArticles(response.articles) 
                setLoading(false)
            })
    }, [sortBy, topic,author]) 

    const handleSortChange = (event) => {
        setSortBy(event.target.value)
    }

    return (
        <>
            <div className="sort-controls">
                <label htmlFor="select-option">Sort By:
                    <select 
                        id="select-option"
                        value={sortBy} 
                        onChange={handleSortChange}
                        className="sort-select"
                    >
                        <option value="created_at-desc">Newest First</option>
                        <option value="created_at-asc">Oldest First</option>
                        <option value="comment_count-desc">Most Comments</option>
                        <option value="comment_count-asc">Least Comments</option>
                        <option value="votes-desc">Most Votes</option>
                        <option value="votes-asc">Least Votes</option>
                    </select>
                </label>
                {topic && <p>Showing articles about: {topic}</p>}
            </div>

            <div className="articles-container">
                {loading ? 
                    <p>Loading Articles Please Wait ...</p> 
                    : allArticles.map((article) => (
                        <ArticleCard key={article.article_id} article={article}/>
                    ))
                }
            </div>
        </>
    )
}