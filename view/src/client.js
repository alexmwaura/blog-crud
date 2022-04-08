import axios from 'axios';

export const getArticles = () => axios.get('/article').then((res) => res.data);
