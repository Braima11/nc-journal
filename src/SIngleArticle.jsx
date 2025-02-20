import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSingleArticle, getCommentById, updateVote, postComment, deleteCommentById } from "../files/apis";

export default function SingleArticle() {
    const [article, setArticle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comment, setComment] = useState([]);
    const [viewComment, setViewComment] = useState(false);
    const [voting, setVoting] = useState(0);
    const [disableButton, setDisableButton] = useState(true);
    const [voteError, setVoteError] = useState(false);
    const [viewPostComment, setViewPostComment] = useState(false);
    const [disableForm, setDisableForm] = useState(false);

    const { article_id } = useParams();

    useEffect(() => {
        getSingleArticle(article_id).then(({ article }) => {
            setArticle(article);
            setVoting(article.votes);
            setLoading(false);
        });
    }, [article_id]);

    useEffect(() => {
        getCommentById(article_id).then((comments) => {
            setComment(comments);
        });
    }, [article_id]);

    function hideShowComments() {
        setViewComment((previousState) => !previousState);
    }

    function vote(votes) {
        setVoting((previousVote) => previousVote + votes);
        setDisableButton((previousState) => !previousState);
        setVoteError(false);

        updateVote(article_id, votes).catch(() => {
            setVoteError(true);
            setDisableButton((previousState) => !previousState);
            setVoting((previousVote) => previousVote - votes);
        });
    }

    function post() {
        const formData = new FormData(document.getElementById("post-comment"));
        const username = article.author;
        const body = formData.get("body");
        const commentObject = { username, body };

        postComment(article_id, commentObject)
            .then(({ comment }) => {
                setComment(prevComments => ({
                    comments: [comment, ...prevComments.comments]
                }));
                setDisableForm(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function viewHideForm() {
        setViewPostComment((previousState) => !previousState);
    }

    function deleteComment(id) {
        deleteCommentById(id).then(() => {
            setComment(prevComments => ({
                comments: prevComments.comments.filter(comment => comment.comment_id !== id)
            }));
        });
    }

    const buttonText = viewComment ? "Hide comments 💬" : "View comments 💬";

    return (
        <article className="single-article-container">
            {loading ? (
                <div className="loading-state">
                    <p>Loading Article, Please Wait ...</p>
                </div>
            ) : (
                <>
                    <header className="article-header">
                        <h1>{article.title}</h1>
                        <div className="article-meta">
                            <span className="author">By {article.author}</span>
                            <span className="date">{new Date(article.created_at).toLocaleDateString()}</span>
                            <span className="topic">{article.topic}</span>
                        </div>
                    </header>

                    <figure className="article-figure">
                        <img
                            src={article.article_img_url}
                            alt={article.title}
                            className="article-image"
                        />
                    </figure>

                    <div className="article-content">
                        <p className="article-body">{article.body}</p>
                        
                        <div className="article-interactions">
                            <div className="votes">
                                <button 
                                    onClick={() => vote(1)} 
                                    disabled={!disableButton}
                                    className="vote-button"
                                >
                                    👍
                                </button>
                                <span className="vote-count">{voting} votes</span>
                                <button 
                                    onClick={() => vote(-1)} 
                                    disabled={!disableButton}
                                    className="vote-button"
                                >
                                    👎
                                </button>
                                {voteError && (
                                    <p className="error-message">Vote unsuccessful. Please try again...</p>
                                )}
                            </div>

                            <div className="comments-count">
                                <button 
                                    onClick={hideShowComments} 
                                    className="comment-toggle"
                                >
                                    {buttonText}
                                </button>
                                <span>{article.comment_count} comments</span>
                            </div>
                        </div>

                        {viewComment && (
                            <section className="comments-section">
                                <div className="comments-header">
                                    <button 
                                        onClick={viewHideForm}
                                        className="post-comment-toggle"
                                    >
                                        {viewPostComment ? "Hide Form" : "Post comment"}
                                    </button>
                                </div>

                                {viewPostComment && (
                                    <form 
                                        action={post} 
                                        id="post-comment" 
                                        className="comment-form"
                                    >
                                        <label htmlFor="body-text">
                                            Leave a comment
                                            <textarea
                                                id="body-text"
                                                className="body-text"
                                                name="body"
                                                rows={4}
                                                disabled={disableForm}
                                                required
                                            />
                                        </label>
                                        <button 
                                            className="submit-comment"
                                            disabled={disableForm}
                                        >
                                            {disableForm ? "Comment Posted" : "Submit Form"}
                                        </button>
                                    </form>
                                )}

                                <div className="comments-list">
                                    {comment.comments?.map((comment) => (
                                        <article 
                                            key={comment.comment_id} 
                                            className="comment-card"
                                        >
                                            <header className="comment-header">
                                                <h3>{comment.author}</h3>
                                                <time dateTime={comment.created_at}>
                                                    {new Date(comment.created_at).toLocaleDateString()}
                                                </time>
                                            </header>
                                            <p className="comment-body">{comment.body}</p>
                                            <footer className="comment-info">
                                                <span className="comment-votes">
                                                    Votes: {comment.votes}
                                                </span>
                                                <button 
                                                    onClick={() => deleteComment(comment.comment_id)}
                                                    className="delete-comment"
                                                >
                                                    delete comment
                                                </button>
                                            </footer>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </>
            )}
        </article>
    );
}