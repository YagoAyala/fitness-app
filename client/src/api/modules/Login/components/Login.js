import React, { useState } from "react";
import LoginService from "../services/LoginService";

const styles = {
  container: {
    maxWidth: '350px',
    margin: '50px auto',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ddd'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  button: {
    width: '100%',
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px'
  }
};

const Login = () => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value, "value")
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const result = await LoginService.signUp({
      User: {id: -1, Namespace: "yagologin"}, 
      ...formData
    });

    console.log(result, "result")

  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            name="Username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            style={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            name="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={styles.input}
            required
          />
        </div>
        <div>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="Password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            style={styles.input}
            required
          />
        </div>
        <div>
          <button type="submit" style={styles.button}>Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
