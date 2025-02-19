import { useNavigate } from "react-router"
import { getSingleArticle } from "../files/apis"


export default function ArticleCard ({article}) {

    const navigate = useNavigate()

    function articleClick () {

       getSingleArticle(article.article_id)
       .then(()=>{

        navigate(`/api/articles/${article.article_id}`)

       })

    }

    return (
        <section  className="article-card">
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
                <button onClick={articleClick}>Read Article </button>
                <p>Posted on: {new Date(article.created_at).toLocaleDateString()}</p>
            </section>
    )

}

