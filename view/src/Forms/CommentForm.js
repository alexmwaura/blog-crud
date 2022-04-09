import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addComment } from '../client';

const inputStyle = { marginBottom: '5px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputStyle };
const { TextArea } = Input;

const AddCommentForm = (props) => {
  return (
    <Formik
      initialValues={{ username: '', message: '', articleId: props.articleId }}
      validate={(values) => {
        const errors = {};
        if (!values.username) {
          errors.username = 'Username is Required';
        }
        if (!values.message) {
          errors.message = 'Message is Required';
        }
        return errors;
      }}
      onSubmit={(comment, { setSubmitting, resetForm }) => {
        addComment(comment)
          .then(() => {
            props.onSuccess();
          })
          .catch((err) => {
            props.onFailure(err);
          })
          .finally(() => {
            setSubmitting(false);
            resetForm()
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
        resetForm
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <Input
            style={inputStyle}
            name='username'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            placeholder='John Doe'
          />
          {errors.username && touched.username && (
            <Tag style={tagStyle}>{errors.username}</Tag>
          )}
          <TextArea
            rows='6'
            style={inputStyle}
            name='message'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message}
            placeholder='some message'
          />
          {errors.message && touched.message && (
            <Tag style={tagStyle}>{errors.message}</Tag>
          )}
          <br />
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

export default AddCommentForm;
