import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const LoginCompany = () => {
  const { setIsCompanyLoggedIn, setCompanyInfo } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/v1/logincompany`, formData)
      .then((response) => {
        console.log(response.data.user);
        if (response.data.success) {
          const token = response.data.token;
          setIsCompanyLoggedIn(true);
          setCompanyInfo(response.data.user);
          localStorage.setItem('tokenCompany', response.data.user.token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          navigate('/Dashboard');
          // Include the token in the request headers for subsequent requests
        
        }
      })
      .catch((error) => {
        // Handle error
        setErrorMessage(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">Login Company</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log in
          </button>
        {errorMessage}
        </form>
      </div>
    </div>
  );
};

export default LoginCompany;
