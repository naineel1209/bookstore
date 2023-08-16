import React from 'react'
import { useGlobalContext } from '../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import '../styles/PostBook.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const env = import.meta.env;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required'),
  categoryId: Yup.number().required('Category ID is required'),
});

const PostBook = () => {
  const auth = useGlobalContext();
  const navigate = useNavigate();
  const { values } = auth;


  {/* Chain of Actions:
    1. User selects the file
    2. Then the handler is launched 
    3. we get the file using the event object
    4. now we append the file to the form data
*/}
  const initialValues = {
    name: '',
    description: '',
    price: '',
    categoryId: '',
  };

  const [image, setImage] = React.useState(null);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];

    if (imageFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = e.target.result;
        // send the image to the server
        setImage(() => (image));
      }

      reader.readAsDataURL(imageFile);
    }
  }

  const handleSubmit = async (values, { resetForm }) => {

    try {

      // Handle form submission, values contain the form data
      const { name, description, price, categoryId } = values;
      const book = {
        name,
        description,
        price,
        categoryId,
        base64image: image,
      };

      const config = {
        headers: {
          'Content-Type': 'application/json', // Specify the content type
          'Authorization': 'Bearer YourAccessToken', // Add any authorization token if required
        }
      };

      console.log(book)

      const res = await fetch(`${env.VITE_BASE_URL}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        redirect: 'follow',
        body: JSON.stringify(book),
      });

      const data = await res.json();

      console.log(data);

      if (data.key === "NOT_FOUND") {
        toast.error(data.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      } else if (data.key === "CONFLICT") {
        toast.error(data.error, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      } else {
        toast.success('Book added successfully', {
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
        navigate('/', {
          replace: true,
        })
      }
      // const { data } = await axios.post(`${env.VITE_BASE_URL}/book`, book, config);
    } catch (e) {
      toast.error(e.message, {
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
  };

  return (<div className="form-container">
    <h1 className={'home-title'}>New Book Form</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="form-field">
          <label>Name:</label>
          <Field type="text" name="name" />
          <ErrorMessage name="name" component="div" className="error-message" />
        </div>

        <div className="form-field">
          <label>Description:</label>
          <Field type="text" name="description" />
          <ErrorMessage name="description" component="div" className="error-message" />
        </div>

        <div className="form-field">
          <label>Price:</label>
          <Field type="number" name="price" />
          <ErrorMessage name="price" component="div" className="error-message" />
        </div>

        <div className="form-field">
          <label>Category ID:</label>
          <Field type="number" name="categoryId" />
          <ErrorMessage name="categoryId" component="div" className="error-message" />
        </div>

        <div className="form-field">
          <label>Image:</label>
          <Field type="file" accept="image/*" name="base64image" onChange={handleImageChange} />
          <ErrorMessage name="base64image" component="div" className="error-message" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
    <ToastContainer />
  </div>
  );
}

export default PostBook