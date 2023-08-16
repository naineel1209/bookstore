import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/AuthContext';
const env = import.meta.env;
// import React, { useEffect } from 'react';
// import axios from 'axios';

const Login = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, 'Too Short!'),
  });

  const navigate = useNavigate();
  const auth = useGlobalContext();

  return (
    <div className='container'>
      <Formik initialValues={{
        email: '',
        password: '',
      }} validationSchema={LoginSchema} onSubmit={async (values, { resetForm }) => {
        console.log(values)
        const res = await fetch(`${env.VITE_BASE_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })
        const data = await res.json();

        if (data.key === "SUCCESS") {
          toast.success('Login Successful', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })

          const { result } = data;

          auth.login(result);

          setTimeout(() => {
            navigate('/', { replace: true });
          }, 1200);

        } else {
          toast.error(`${data.error}`, {
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
              <button type="submit" disabled={isSubmitting} className={(isSubmitting) ? 'roller ' : ''}>Login</button>
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