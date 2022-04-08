import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addArticle } from '../client';

const inputStyle = { marginBottom: '5px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputStyle };
const { TextArea } = Input;

const AddArticleForm = (props) => {
  return (
    <Formik
      initialValues={{ title: '', description: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Title is Required';
        }
        if (!values.description) {
          errors.description = 'Description is Required';
        }
        return errors;
      }}
      onSubmit={(article, { setSubmitting }) => {
        addArticle(article)
          .then(() => {
            props.onSuccess();
          })
          .catch((err) => {
            props.onFailure(err);
          })
          .finally(() => {
            setSubmitting(false);
          });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        submitForm,
        isValid,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={inputStyle}
            name='title'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.title}
            placeholder='Title'
          />
          {errors.title && touched.title && (
            <Tag style={tagStyle}>{errors.title}</Tag>
          )}
          <TextArea
            style={inputStyle}
            name='description'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
            placeholder='some description'
          />
          {errors.description && touched.description && (
            <Tag style={tagStyle}>{errors.description}</Tag>
          )}

          <Button
            type='submit'
            disabled={isSubmitting | (touched && !isValid)}
            onClick={() => submitForm()}
          >
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default AddArticleForm;
