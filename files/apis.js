import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://news-journal.onrender.com/'
});

export function getAllArticles(topic) {
    const url = topic ? `/api/articles?topic=${topic}` : "/api/articles"
    return newsApi.get(url)
    .then((response) => {
        return response.data;
    });
}

export  function getSingleArticle (article_id){
    return newsApi.get(`/api/articles/${article_id}`)
    .then((response)=>{
        return response.data
    })
}

export function getCommentById (article_id) {
    return newsApi.get(`/api/articles/${article_id}/comments`)
    .then((response)=>{
        return response.data
    })
}

export function updateVote (article_id,vote) {
    return newsApi.patch(`/api/articles/${article_id}`,{votes:vote})
    .then((response)=>{

        return response.data

    })
}

export function postComment (article_id,comment){
    return newsApi.post(`/api/articles/${article_id}/comments`, comment)
    .then((response)=>{

        console.log(response)
        return response.data
    })
}

export function deleteCommentById (comment_id) {
    return newsApi.delete(`/api/comments/${comment_id}`)
    .then((response)=>{
        return response.data
    })
}

export function getTopics () {
    return newsApi.get("/api/topics")
        .then((response) => {
            return response.data;
    })
}