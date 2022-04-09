import { Button, Modal } from 'antd';
import { openNotification } from './Notification';
import AddArticleForm from './Forms/ArticleForm';
import {CloseOutlined} from '@ant-design/icons'

const Footer = (props) => (
  <div className='footer'>
    <input class='modal-btn' type='checkbox' id='modal-btn' name='modal-btn' />
    <label for='modal-btn'>
      Blog <i class='uil uil-expand-arrows'></i>
    </label>
    <div class='modal'>
      <div class='modal-wrap'>
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
      </div>
    </div>
  </div>
);

export default Footer;
