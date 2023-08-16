import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [values, setValues] = useState({
    user: {
      name: null,
      email: null,
      roleId: null,
      role: null,
      _id: null,
    },
    isLoggedIn: false,
  });

  const login = (userData) => {
    setValues(() => {
      return {
        user: {
          name: userData.firstName + ' ' + userData.lastName,
          email: userData.email,
          roleId: userData.roleId,
          role: userData.role,
          _id: userData._id,
        },
        isLoggedIn: true,
      }
    })
  }

  const logout = () => {
    setValues({
      user: {
        name: null,
        email: null,
        roleId: null,
        role: null,
        _id: null,
      },
      isLoggedIn: false,
    })
  }

  return <AppContext.Provider value={{ values, login, logout }}>{children}</AppContext.Provider>;
}

const useGlobalContext = () => {
  return useContext(AppContext);
}

// eslint-disable-next-line
export { useGlobalContext };
export default AppContext;
