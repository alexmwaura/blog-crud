import './App.css';
import { Component } from 'react';
import { deleteArticle, getArticles } from './client';
import moment from 'moment';
import axios from 'axios';
import { openNotification } from './Notification';
import Footer from './Footer';
import filterByDate from './lib/filterByDate';
import Article from './Article';

axios.defaults.baseURL = 'https://blog-lyf.herokuapp.com';

class App extends Component {
  state = {
    articles: null,
    isFetching: false,
    openEdit: false,
    articleId: '',
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
        const articles = filterByDate(res);

        this.setState({
          articles: articles.reverse(),
          isFetching: false,
        });
      })
      .catch((e) => {});
  };

  handleEdit = (article) => {
    this.setState({
      openEdit: (state) => !state,
      articleId: article.id,
      article: article,
    });
  };

  handleDelete = (id) => {
    deleteArticle(id).then(() => {
      openNotification('warning', 'article deleted successfully');
      this.fetchArticles();
    });
  };

  closeEdit = () => {
    this.setState({
      openEdit: (state) => !state,
      articleId: '',
    });
  };

  openAddModal = () => this.setState({ isAddStudentModalVisible: true });
  closeAddModal = () => this.setState({ isAddStudentModalVisible: false });

  render() {
    const { articles, isAddStudentModalVisible, openEdit, articleId } =
      this.state;

    if (articles?.length > 0) {
      return (
        <>
          <div id='container'>
            <h1 id='headline'>Blog Life</h1>
            <Article
              articles={articles}
              closeEdit={this.closeEdit}
              fetchArticles={this.fetchArticles}
              handleEdit={this.handleEdit}
              handleDelete={this.handleDelete}
              formatDate={this.formatDate}
              openEdit={openEdit}
              articleId={articleId}
            />
          </div>
          
          <Footer
            handleAddArticle={this.openAddModal}
            isAddStudentModalVisible={isAddStudentModalVisible}
            closeAddModal={this.closeAddModal}
            fetchArticles={this.fetchArticles}
          />
        </>
      );
    }
    if (articles?.length === 0) {
      return (
        <>
          <div id='container'>
            <h1 id='headline'>Blog Life</h1>
            <h2 id='subhead'>No Data</h2>

            <div className='article'>
              <p>There is no article, Please Add an article</p>
            </div>
          </div>
          <Footer
            handleAddArticle={this.openAddModal}
            isAddStudentModalVisible={isAddStudentModalVisible}
            closeAddModal={this.closeAddModal}
            fetchArticles={this.fetchArticles}
          />
        </>
      );
    } else {
      return <div className='loader'>Loading...</div>;
    }
  }
}

export default App;
