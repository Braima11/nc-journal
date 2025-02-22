import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://news-journal.onrender.com/'
});

export function getAllArticles(params = {}) {
    const { author,topic, sort_by, order } = params;
    let url = "/api/articles";

    if (topic || sort_by || order) {
        const queryParams = [];
        if (topic) queryParams.push(`topic=${topic}`);
        if (sort_by) queryParams.push(`sort_by=${sort_by}`);
        if (order) queryParams.push(`order=${order}`);
        url += `?${queryParams.join('&')}`;
    }

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

export function getUsers() {
    return newsApi.get("/api/users")
    .then((response)=>{
      return response.data
    })
}