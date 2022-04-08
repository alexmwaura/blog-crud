function Comments(props) {
    const comments = props.comments;
    const formatDate = props.formatDate;
    return (
      <div className='comments-container'>
        <details>
          <summary>
            <div className='comments-header'>{comments.length} Replies</div>
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
          <summary className='accordion'>Add Comment</summary>
          <div className='container-form'>
            <div className='inputs'>
              <label>username</label>
              <input type='text' placeholder='John Smith' />
              <label>message</label>
              <textarea cols='100' rows='4'></textarea>
              <button type='submit'>Send</button>
            </div>
          </div>
        </details>
      </div>
    );
  }
  
  export default Comments;
  