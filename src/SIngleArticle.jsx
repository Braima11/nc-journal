import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleArticle } from "../files/apis";


export default function SingleArticle () {

    const [article,setArticle] = useState([])
    const [loading,setLoading] = useState(true)

    const {article_id} =useParams()

    useEffect(()=>{

        getSingleArticle(article_id)
        .then(({article})=>{
           
            setArticle(article)
            setLoading(false)
        })




    },[article_id])

    return   (
       <div className="single-article-container">
         {loading ?  <p> Loading Article, Please Wait ...</p> :
         <>
         <header className="article-header">
                <h1>{article.title}</h1>
                <div className="article-meta">
                    <span>By {article.author}</span>
                    <span>• {new Date(article.created_at).toLocaleDateString()}</span>
                    <span>• {article.topic}</span>
                </div>
            </header>

       
            <main className="article-content">
                <img 
                    src={article.article_img_url} 
                    alt={article.title}
                    className="article-image"
                />
                <p className="article-body">{article.body}</p>
            </main>

          
            <div className="article-interactions">
                <div className="votes">
                    <span>👍 {article.votes} votes</span>
                </div>
                <div className="comments-count">
                    <span>💬 {article.comment_count} comments</span>
                </div>
            </div>
            <section className="comments-section">
                <h2>Comments</h2>
                <div className="comments-placeholder">
                    <p>Comments loading soon...</p>
                </div>
            </section></>}
           
        </div>
    )

}