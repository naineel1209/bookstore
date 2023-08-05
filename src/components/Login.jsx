// import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
// import { Button } from 'bootstrap';

const Login = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Too Short!'),
  });

  const navigate = useNavigate();

  return (
    <div className='container'>
      <Formik initialValues={{
        email: '',
        password: '',
      }} validationSchema={LoginSchema} onSubmit={async (values, { resetForm }) => {
        console.log(values)
        const res = await fetch('https://book-e-sell-node-api.vercel.app/api/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        const data = await res.json();
        console.log(data);

        if (data.key === "SUCCESS") {
          toast.success('🦄 Wow so easy!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })


          setTimeout(() => {
            navigate('/', { replace: true });
          }, 5000);

        } else {
          toast.error('🦄 Wow so easy!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
        }

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
      <>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </>
    </div>
  );
}

export default Login;