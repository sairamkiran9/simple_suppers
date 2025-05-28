import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add form validation + API call to your backend
    console.log("Submitting:", formData);
  };

  return (
    <div className="register-bg">
      <div className="register-card">
        <div className="register-logo-container">
          {/* <img
            src="/logo.png"
            alt="Simple Suppers Logo"
            className="register-logo"
          /> */}
          <h2 className="register-title">Create Account</h2>
          <p className="register-subtitle">Join Simple Suppers today!</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="register-input"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="register-input"
          />

          <button type="submit" className="register-btn">
            Register
          </button>

          <p className="register-footer">
            Already have an account?
            <a href="/login" className="register-link">
              Login
            </a>
          </p>
        </form>
      </div>

      <style>{`
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        .register-bg {
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #e0e7ff 0%, #fff 70%, #c7d2fe 100%);
          padding: 48px 0;
          overflow-y: auto;
        }
        .register-card {
          width: 95%;
          max-width: 420px;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 8px 32px rgba(60, 72, 88, 0.18);
          padding: 40px 24px 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 auto;
        }
        .register-logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 18px;
        }
        .register-logo {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          margin-bottom: 10px;
        }
        .register-title {
          font-size: 2rem;
          font-weight: 700;
          color: #4f46e5;
          margin-bottom: 2px;
        }
        .register-subtitle {
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 22px;
        }
        .register-form {
          width: 100%;
          max-width: 340px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 0;
          box-sizing: border-box;
        }
        .register-input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          color: #334155;
          background: #f8fafc;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .register-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 2px #6366f133;
        }
        .register-btn {
          width: 100%;
          background: linear-gradient(90deg, #6366f1 60%, #4f46e5 100%);
          color: #fff;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 13px 0;
          border: none;
          border-radius: 8px;
          margin-top: 8px;
          cursor: pointer;
          box-shadow: 0 2px 8px #6366f120;
          transition: background 0.2s, transform 0.1s;
        }
        .register-btn:hover {
          background: linear-gradient(90deg, #4f46e5 60%, #6366f1 100%);
          transform: translateY(-2px) scale(1.02);
        }
        .register-footer {
          margin-top: 14px;
          text-align: center;
          font-size: 0.98rem;
          color: #64748b;
        }
        .register-link {
          color: #4f46e5;
          font-weight: 600;
          margin-left: 5px;
          text-decoration: none;
          transition: text-decoration 0.2s;
        }
        .register-link:hover {
          text-decoration: underline;
        }
        @media (max-width: 600px) {
          .register-card {
            padding: 24px 0 16px 0;
            border-radius: 14px;
          }
          .register-form {
            max-width: 98vw;
            padding: 0 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
