import AddCommentForm from './Forms/CommentForm';
import { openNotification } from './Notification';


function Comments(props) {
  const comments = props.comments;
  const formatDate = props.formatDate;
  return (
    <div className='comments-container'>
      <details>
        <summary>
          <div className='comments-header'>{comments.length} Comments</div>
        </summary>
        {comments.map((comment) => (
          <div className='comment-thread' key={comment.id}>
            <div className='comment' id='comment-1'>
              <div className='comment-heading'>
                <div className='comment-info'>
                  <p className='comment-author'>{comment.username}</p>
                </div>
              </div>
              <div className='comment-body'>
                <p>{comment.message}</p>
              </div>
              <div className='comment-info'>
                <p className='m-0'>{formatDate(comment.updatedAt)}</p>
              </div>
            </div>
          </div>
        ))}
      </details>
      <details>
        <summary className='add-comment'>Add Comment</summary>
        <div className='container-form'>
          <AddCommentForm
            articleId={props.articleId}
            onSuccess={() => {
              openNotification('success', 'comment added');
              props.fetchArticles();
            }}
            onFailure={(err) => {
              const { message, httpStatus } = err;
              openNotification('error', message, httpStatus);
            }}
          />
        </div>
      </details>
    </div>
  );
}

export default Comments;
