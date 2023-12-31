// import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const env = import.meta.env;

const Signup = () => {

  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string().trim().required('First Name is required'),
    lastName: Yup.string().trim().required('Last Name is required'),
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    password: Yup.string().trim().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className='container'>
      <Formik initialValues={
        { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }
      } validationSchema={SignupSchema} onSubmit={async (values, { resetForm }) => {
        values.roleId = 2;
        delete values.confirmPassword;

        try {
          const res = await fetch(`${env.VITE_BASE_URL}/user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
          })
          const data = await res.json();
          console.log(data);

          if (data.key === "SUCCESS") {
            toast.success('Registration Successful', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            })

            resetForm();
            navigate('/login', { replace: true })

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


        } catch (e) {
          console.log(e);
          toast.error(`${e}`, {
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
      }}>

        {
          ({ isSubmitting }) => {
            return <Form className="form registration-form"> {/* Add the "registration-form" class */}
              <div className="form-group"> {/* Add the "form-group" class */}
                <label>First Name:</label>
                <Field type="text" name="firstName" />
                <ErrorMessage name="firstName" component="div" className="error-message" />
              </div>
              <div className="form-group"> {/* Add the "form-group" class */}
                <label>Last Name:</label>
                <Field type="text" name="lastName" />
                <ErrorMessage name="lastName" component="div" className="error-message" />
              </div>
              <div className="form-group"> {/* Add the "form-group" class */}
                <label>Email:</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="form-group"> {/* Add the "form-group" class */}
                <label>Password:</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <div className="form-group"> {/* Add the "form-group" class */}
                <label>Confirm Password:</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
              </div>
              <button type="submit" disabled={isSubmitting}>Register</button>
            </Form>
          }
        }
      </Formik>
      <ToastContainer />
    </div>
  );
}

export default Signup