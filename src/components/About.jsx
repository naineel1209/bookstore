import React from 'react'
import { useGlobalContext } from '../context/AuthContext'

const About = () => {
  const auth = useGlobalContext()
  const { values } = auth;

  return (
    <div>
      <h1 className='home-title'>About</h1>


      <div className="form-container">
        <form id="userForm">
          <div className="form-group">
            <label className="form-label" htmlFor="name">Name:</label>
            <input disabled className="form-input" type="text" id="name" name="name" value={values.user.name} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email:</label>
            <input disabled className="form-input" type="email" id="email" name="email" value={values.user.email} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="role">Role:</label>
            <input disabled className="form-input" type="text" id="role" name="role" value={values.user.role} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="roleId">Role ID:</label>
            <input disabled className="form-input" type="number" id="roleId" name="roleId" value={values.user.roleId} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="_id">User ID:</label>
            <input disabled className="form-input" type="text" id="_id" name="_id" value={values.user._id} />
          </div>
        </form>
      </div>
      {
        JSON.stringify(values)
      }
    </div>

  )
}

export default About