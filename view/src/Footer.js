import { Button } from "antd";



const Footer = (props) => (
  <div className="footer">
      <Button type="primary" onClick={() => props.handleAddArticle()}>
        Add new Article +
      </Button>
  </div>
);

export default Footer;
