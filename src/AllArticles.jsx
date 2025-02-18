import { getAllArticles } from "../files/apis"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"

export default function AllArticles() {
    const [allArticles, setAllArticles] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getAllArticles()
            .then((response) => {
                setAllArticles(response.articles) 
                setLoading(false)
            })
    }, [])
    

    const mappedArticles = allArticles.map((article) => {
        return (
            <ArticleCard  key={article.article_id} article ={article}/>
        )
    })

    return (
        <div className="articles-container">
            {loading  ?<p>Loading Articles Please Wait ...</p>:
            mappedArticles}
            
        </div>
    )
}