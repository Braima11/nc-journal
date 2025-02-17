import axios from 'axios';

const newsApi = axios.create({
    baseURL: 'https://news-journal.onrender.com/'
});

export default function getAllArticles  () {
    return newsApi.get("/api/articles")
    .then((response)=>{
        return response.data
    })
};