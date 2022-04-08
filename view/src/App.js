import './App.css';
import { Component } from 'react';
import { getArticles } from './client';
import Comments from './Comments';
import moment from 'moment';
import axios from 'axios';
import { Modal } from 'antd';
import AddArticleForm from './Forms/ArticleForm';
import { openNotification } from './Notification';
import Footer from './Footer';

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

  fetchArticles = () => {
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
  };

  openAddModal = () => this.setState({ isAddStudentModalVisible: true });
  closeAddModal = () => this.setState({ isAddStudentModalVisible: false });

  render() {
    const { articles, isFetching, isAddStudentModalVisible, isError } =
      this.state;

    if (articles) {
      return (
        <>
          <div id='container'>
            <h1 id='headline'>Blog Life</h1>

            {articles.map((article) => (
              <div key={article.id} className='article'>
                <h2 id='subhead'>{article.title}</h2>
                <p id='edit'>edit</p>
                <p className='dateline'>
                  Posted: {this.formatDate(article.updatedAt)}
                </p>

                <p>{article.description}</p>
                <Comments
                  comments={article.comments}
                  formatDate={this.formatDate}
                  articleId={article.id}
                  fetchArticles={this.fetchArticles}
                />
              </div>
            ))}
          </div>
          <div className='footer'>
            <Modal
              title='Add new article'
              visible={isAddStudentModalVisible}
              onOk={this.closeAddModal}
              onCancel={this.closeAddModal}
              width={800}
            >
              <AddArticleForm
                onSuccess={() => {
                  this.closeAddModal();
                  this.fetchArticles();
                  openNotification('success', 'article added', 200);
                }}
                onFailure={(err) => {
                  const { message, httpStatus } = err.error;
                  openNotification('error', message, httpStatus);
                }}
              />
            </Modal>
            <Footer handleAddArticle={this.openAddModal} />
          </div>
        </>
      );
    }
  }
}

export default App;
