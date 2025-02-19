import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://news-journal.onrender.com/'
});

export  function getAllArticles  () {
    return newsApi.get("/api/articles")
    .then((response)=>{
        return response.data
    })
};

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