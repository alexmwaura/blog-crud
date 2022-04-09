import { Button } from "antd";



const Footer = (props) => (
  <div className="footer">
      <Button  onClick={() => props.handleAddArticle()} className='blog_button'>
        Blog
      </Button>
  </div>
);

export default Footer;
