// import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import { Button } from 'bootstrap';

const Login = () => {

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Too Short!'),
  });

  return (
    <div className='container'>
      <Formik initialValues={{
        email: '',
        password: '',
      }} validationSchema={LoginSchema} onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}>

        {
          ({ isSubmitting }) => {
            return <Form className='form login-form'>
              <div className='form-group'>
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className='form-group'>
                <label>Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <button type="submit" disabled={isSubmitting}>Login</button>
            </Form>
          }
        }
      </Formik>
    </div>
  );
}

export default Login;