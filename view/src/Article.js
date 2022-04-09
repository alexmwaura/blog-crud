import Comments from './Comments';
import { Button, Popconfirm } from 'antd';
import EditArticleForm from './Forms/EditForm';
import { EditOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';

function Article(props) {
  return (
    <>
      {props.articles.map((article) => (
        <div key={article.id} className='article'>
          <>
            {props.openEdit && article.id === props.articleId ? (
              <>
                <Button
                  className='done_edit'
                  type='submit'
                  shape='circle'
                  onClick={() => props.closeEdit()}
                >
                  <CloseOutlined />
                </Button>
                <br />
                <EditArticleForm
                  article={article}
                  fetchArticles={props.fetchArticles}
                />
              </>
            ) : (
              <>
                <h2 id='subhead'>{article.title}</h2>
                <p id='edit'>
                  <Button
                    shape='circle'
                    size='midle'
                    onClick={() => props.handleEdit(article)}
                  >
                    <EditOutlined />
                  </Button>
                  &nbsp;&nbsp;
                  <Popconfirm
                    title='Are you sure？'
                    okText='Yes'
                    cancelText='No'
                    onConfirm={() => props.handleDelete(article.id)}
                  >
                    <Button shape='circle' size='midle' type='primary' danger>
                      <DeleteOutlined />
                    </Button>{' '}
                  </Popconfirm>
                </p>
                <br />
                <p className='dateline'>
                  last update: {props.formatDate(article.updatedAt)}
                </p>
                <p>{article.description}</p>
              </>
            )}
          </>
          <Comments
            comments={article.comments}
            formatDate={props.formatDate}
            articleId={article.id}
            fetchArticles={props.fetchArticles}
          />
        </div>
      ))}
    </>
  );
}

export default Article;
