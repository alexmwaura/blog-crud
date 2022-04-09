import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { editArticle } from '../client';
import { openNotification } from '../Notification';

const inputStyle = { marginBottom: '5px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputStyle };
const { TextArea } = Input;

const EditTitle = (props) => {
  return (
    <Formik
      initialValues={{
        title: props.article.title,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = 'Title is Required';
        }
        return errors;
      }}
      onSubmit={(article, { setSubmitting }) => {
        editArticle(props.article.id, article)
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
        <form
          onSubmit={handleSubmit}
          className='container-form'
          style={{ marginTop: '2rem' }}
        >
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
          <br />
          <Button
            type='submit'
            disabled={isSubmitting | (touched && !isValid)}
            onClick={() => submitForm()}
          >
            save
          </Button>
        </form>
      )}
    </Formik>
  );
};

const EditDescription = (props) => {
  return (
    <Formik
      initialValues={{
        description: props.article.description,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.description) {
          errors.description = 'Description is Required';
        }
        return errors;
      }}
      onSubmit={(article, { setSubmitting }) => {
        editArticle(props.article.id, article)
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
        <form onSubmit={handleSubmit} className='container-form'>
          <TextArea
            cols='100'
            rows='12'
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
          <br />
          <Button
            type='submit'
            disabled={isSubmitting | (touched && !isValid)}
            onClick={() => submitForm()}
          >
            Save
          </Button>
        </form>
      )}
    </Formik>
  );
};

const EditArticleForm = (props) => {
  return (
    <>
      <EditTitle
        article={props.article}
        onSuccess={() => {
          openNotification('success', 'Title has been updated successfully!');
          props.fetchArticles();
        }}
        onFailure={(err) => {
          const { message, httpStatus } = err;
          openNotification('error', message, httpStatus);
        }}
      />
      <EditDescription
        article={props.article}
        onSuccess={() => {
          openNotification(
            'success',
            'The description has been updated successfully!'
          );
          props.fetchArticles();
        }}
        onFailure={(err) => {
          const { message, httpStatus } = err;
          openNotification('error', message, httpStatus);
        }}
      />
    </>
  );
};

export default EditArticleForm;
