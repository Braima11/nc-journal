import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleArticle,getCommentById,updateVote} from "../files/apis";

export default function SingleArticle () {

    const [article,setArticle] = useState([])
    const [loading,setLoading] = useState(true)
    const [comment,setComment] =useState([])
    const [viewComment,setViewComment] =useState(false)
    const [voting, setVoting] = useState(0)
    const [disableButton,setDisableButton] = useState(true)
    const [voteError,setVoteError] =useState(false)

    const {article_id} =useParams()

    useEffect(()=>{

        getSingleArticle(article_id)
        .then(({article})=>{
           
            setArticle(article)
            setVoting(article.votes)
            setLoading(false)
        })

    },[article_id])

    useEffect(()=>{
        getCommentById(article_id)
        .then((comments)=>{
            setComment(comments)
            
        })
    },[])


    const mapComments = comment.comments?.map((comment) => {
        return (
            <div key={comment.comment_id} className="comment-card">
                <h3>{comment.author}</h3>
                <p>{comment.body}</p>
                <div className="comment-info">
                    <span>Votes: {comment.votes}</span>
                    <span>Posted: {new Date(comment.created_at).toLocaleDateString()}</span>
                </div>
            </div>
        )
    })

    function hideShowComments () {
        setViewComment((previousState)=>{
            return !previousState
        })
    }
    
    const buttonText = viewComment ? <p>Hide comments 💬</p> :<p>View comments 💬</p> 

    function vote (votes) {

        setVoting((previousVote)=>{
            return previousVote +votes
        })

        setDisableButton((previousState)=>{
            return !previousState
        })
        
        setVoteError(false)

        updateVote(article_id,votes)
        .catch(()=>{
            setVoteError(true)

           setDisableButton((previousState)=>{
            return !previousState
           })

           setVoting((previousVote)=>{
            return previousVote - votes
           })

        })
        
    }

    return (
        <div className="single-article-container">
            {loading ? (
                <p>Loading Article, Please Wait ...</p>
            ) : (
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
                            <span>
                                <button 
                                    onClick={() => vote(1)} 
                                    disabled={!disableButton}
                                >
                                    👍
                                </button>
                                {voting} votes
                                <button 
                                    onClick={() => vote(-1)} 
                                    disabled={!disableButton}
                                >
                                    👎
                                </button>
                            </span>
                            {voteError && <p className="error-message">Vote unsuccessful. Please try again...</p>}
                        </div>
                        <div className="comments-count">
                            <span>
                                <button 
                                    onClick={hideShowComments} 
                                    className="comment-toggle"
                                >
                                    {buttonText}
                                </button>
                                {article.comment_count} comments
                            </span>
                        </div>
                    </div>
    
                    {viewComment && (
                        <section className="comments-section">
                            {mapComments}
                        </section>
                    )}
                </>
            )}
        </div>
    )

}