import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthWrapper } from "./AuthWrapper";
import './page-auth.css';
import React  from "react";
import Cookies from 'js-cookie';

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate



  const handleRegister = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/v1/user/register", {
        name,
        email,
        password
      },
  
    );
      console.log(response);

    const { token } = response.data; // Extract the token from the response
      Cookies.set('token', token, { expires: 7 });   // Set the token in cookies (expires in 7 days)

      setSuccess("Registration successful! Please check your email.");
      setError(null);
      
      // Redirect to home page or login page
      navigate('/'); // Use navigate function
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess(null);
    }
  };

  return (
    <AuthWrapper>
      <h4 className="mb-2">Adventure starts here 🚀</h4>
      <p className="mb-4">Make your app management easy and fun!</p>

      <form id="formAuthentication" className="mb-3" onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 form-password-toggle">
          <label className="form-label" htmlFor="password">Password</label>
          <div className="input-group input-group-merge">
            <input
              type="password"
              id="password"
              className="form-control"
              name="password"
              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
              aria-describedby="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-group-text cursor-pointer">
              <i className="bx bx-hide"></i>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="terms-conditions"
              name="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="terms-conditions">
              I agree to
              <a aria-label="privacy policy and terms" href="#"> privacy policy & terms</a>
            </label>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button aria-label='Click me' className="btn btn-primary d-grid w-100" type="submit">Sign up</button>
      </form>
      <p className="text-center">
        <span>Already have an account?</span>
        <Link aria-label="Go to Login Page" to="/auth/login" className="d-flex align-items-center justify-content-center">
          <i className="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
          Back to login
        </Link>
      </p>
    </AuthWrapper>
  );
};
