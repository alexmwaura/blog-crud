import { Button, Modal } from 'antd';
import { openNotification } from './Notification';
import AddArticleForm from './Forms/ArticleForm';

const Footer = (props) => (
  <div className='footer'>
    <Button onClick={() => props.handleAddArticle()} className='blog_button'>
      Blog
    </Button>
    <Modal
      visible={props.isAddStudentModalVisible}
      onOk={props.closeAddModal}
      onCancel={props.closeAddModal}
      width={800}
      okText='Done'
      cancelText='Exit'
    >
      <AddArticleForm
        onSuccess={() => {
          props.closeAddModal();
          props.fetchArticles();
          openNotification('success', 'article added', 200);
        }}
        onFailure={(err) => {
          const { message, httpStatus } = err.error;
          openNotification('error', message, httpStatus);
        }}
      />
    </Modal>
  </div>
);

export default Footer;


