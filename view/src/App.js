import './App.css';
import { Component } from 'react';
import { getArticles } from './client';
import Comments from './Comments';
import moment from 'moment';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

class App extends Component {
  state = {
    articles: null,
    isFetching: false,
  };

  componentDidMount() {
    this.fetchArticles();
  }

  formatDate(date) {
    return moment(date).fromNow();
  }

  fetchArticles() {
    this.setState({
      isFetching: true,
    });
    getArticles()
      .then((res) => {
        this.setState({
          articles: res,
          isFetching: false,
        });
      })
      .catch((e) => {});
  }

  render() {
    const { articles } = this.state;
    console.log(articles);
    if (articles) {
      return (
        <>
          <div id='container'>
            <h1 id='headline'>Blog Life</h1>

            {articles.map((article) => (
              <div key={article.id} className='article'>
                <h2 id='subhead'>{article.title}</h2>
                <p id='edit'>
                  edit
                </p>
                <p className='dateline'>
                  Posted: {this.formatDate(article.updatedAt)}
                </p>
                
                <p>{article.description}</p>
                <Comments
                  comments={article.comments}
                  formatDate={this.formatDate}
                />
              </div>
            ))}
          </div>
        </>
      );
    }
  }
}

export default App;
