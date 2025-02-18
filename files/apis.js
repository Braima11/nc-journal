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