import axios from 'axios';

export const getArticles = () => axios.get('/article').then((res) => res.data);

export const addArticle = (article) => axios.post('/article', article);

export const addComment = (comment) => axios.post('/comment', comment).then((res)=>res);

export const editArticle = (id,article) => axios.patch(`/article/${id}`, article)

export const deleteArticle = (id) => axios.delete(`/article/${id}`)