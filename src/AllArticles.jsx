import { getAllArticles } from "../files/apis"
import { useState, useEffect } from "react"
import ArticleCard from "./ArticleCard"
import { useSearchParams } from 'react-router-dom'


export default function AllArticles() {
    const [allArticles, setAllArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchParams] = useSearchParams()
    const topic = searchParams.get('topic')
    

        useEffect(() => {
        getAllArticles(topic)
            .then((response) => {
                setAllArticles(response.articles) 
                setLoading(false)
            })
    }, [topic])
    

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