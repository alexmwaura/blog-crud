import './App.css';
import { Component } from 'react';
import { deleteArticle, getArticles } from './client';
import Comments from './Comments';
import moment from 'moment';
import axios from 'axios';
import { Button, Modal, Popconfirm } from 'antd';
import AddArticleForm from './Forms/ArticleForm';
import { openNotification } from './Notification';
import Footer from './Footer';
import { EditOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import EditArticleForm from './Forms/EditForm';
import filterByDate from './lib/filterByDate';

axios.defaults.baseURL = 'http://localhost:8080';

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

            {articles.map((article) => (
              <div key={article.id} className='article'>
                <>
                  {openEdit && article.id === articleId ? (
                    <>
                      <Button
                        className='done_edit'
                        type='submit'
                        shape='circle'
                        onClick={() => this.closeEdit()}
                      >
                        <CloseOutlined />
                      </Button>
                      <br />
                      <EditArticleForm
                        article={article}
                        fetchArticles={this.fetchArticles}
                      />
                    </>
                  ) : (
                    <>
                      <h2 id='subhead'>{article.title}</h2>
                      <p id='edit'>
                        <Button
                          shape='circle'
                          size='midle'
                          onClick={() => this.handleEdit(article)}
                        >
                          <EditOutlined />
                        </Button>
                        &nbsp;&nbsp;
                        <Popconfirm
                          title='Are you sure？'
                          okText='Yes'
                          cancelText='No'
                          onConfirm={() => this.handleDelete(article.id)}
                        >
                          <Button
                            shape='circle'
                            size='midle'
                            type='primary'
                            danger
                          >
                            <DeleteOutlined />
                          </Button>{' '}
                        </Popconfirm>
                      </p>
                      <br />
                      <p className='dateline'>
                        last update: {this.formatDate(article.updatedAt)}
                      </p>
                      <p>{article.description}</p>
                    </>
                  )}
                </>
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
              visible={isAddStudentModalVisible}
              onOk={this.closeAddModal}
              onCancel={this.closeAddModal}
              width={800}
              okText='Done'
              cancelText='Exit'
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
    } if (articles?.length === 0) {
      return (
        <>
          <div id='container'>
            <h1 id='headline'>Blog Life</h1>
            <h2 id='subhead'>No Data</h2>

            <div className='article'>
              <p>There is no article, Please Add an article</p>
            </div>
          </div>
          <div className='footer'>
            <Modal
              visible={isAddStudentModalVisible}
              onOk={this.closeAddModal}
              onCancel={this.closeAddModal}
              width={800}
              okText='Done'
              cancelText='Exit'
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
