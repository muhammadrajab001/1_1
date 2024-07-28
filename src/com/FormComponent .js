import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Button, Box } from '@mui/material';

const validationSchema = Yup.object({
  title: Yup.string().required('Требуется название'),
  name: Yup.string().required('Требуется имя'),
  email: Yup.string().email('Неверный адрес электронной почты').required('Требуется электронная почта'),
  body: Yup.string().required('Требуется тело'),
});

const FormComponent = ({ onAddRecord, showComments }) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Add a unique ID for each record
      const newRecord = { ...values, id: Date.now() };

      let response;
      if (showComments) {
        response = await axios.post('http://localhost:3000/comments', newRecord);
      } else {
        response = await axios.post('http://localhost:3000/posts', newRecord);
      }
      onAddRecord(response.data); 
      resetForm();
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ title: '', name: '', email: '', body: '', messageId: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          {!showComments && (
            <Box mb={2}>
              <Field
                name="messageId"
                as={TextField}
                label="Идентификатор сообщения"
                variant="outlined"
                fullWidth
                helperText={<ErrorMessage name="messageId" />}
                error={<ErrorMessage name="messageId" component="div" />}
              />
            </Box>
          )}
          <Box mb={2}>
            <Field
              name="title"
              as={TextField}
              label="Title"
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name="title" />}
              error={<ErrorMessage name="title" component="div" />}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="name"
              as={TextField}
              label="Name"
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name="name" />}
              error={<ErrorMessage name="name" component="div" />}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="email"
              as={TextField}
              label="Email"
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name="email" />}
              error={<ErrorMessage name="email" component="div" />}
            />
          </Box>
          <Box mb={2}>
            <Field
              name="body"
              as={TextField}
              label="Body"
              variant="outlined"
              fullWidth
              helperText={<ErrorMessage name="body" />}
              error={<ErrorMessage name="body" component="div" />}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            Отправить
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
