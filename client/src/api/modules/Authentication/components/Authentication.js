import React, { useState } from 'react';
import AuthenticationService from '../services/Authentication';

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

const FormInput = ({ type, id, name, value, placeholder, onChange }) => (
  <div>
    <label htmlFor={id} style={styles.label}>{placeholder}:</label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter your ${placeholder.toLowerCase()}`}
      style={styles.input}
      required
    />
  </div>

  //TODO: remove this required;
);

const Register = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    await AuthenticationService.signUp({
      User: {id: -1, Namespace: "yagologin"}, 
      ...formData
    });

    //TODO: add a response for the client
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <FormInput type="text" id="username" name="Username" value={formData.Username} placeholder="Username" onChange={handleChange} />
        <FormInput type="email" id="email" name="Email" value={formData.Email} placeholder="Email" onChange={handleChange} />
        <FormInput type="password" id="password" name="Password" value={formData.Password} placeholder="Password" onChange={handleChange} />
        <button type="submit" style={styles.button}>Register</button>
        <button type="button" onClick={onSwitch} style={{...styles.button, backgroundColor: "#ccc", marginTop: '10px'}}>Switch to Login</button>
      </form>
    </div>
  );
};

const Login = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    Username: "",
    Password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    await AuthenticationService.signIn({
      User: {id: -1, Namespace: "yagologin"}, 
      ...formData
    });

    //TODO: add a response for the client
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <FormInput type="text" id="username" name="Username" value={formData.Username} placeholder="Username" onChange={handleChange} />
        <FormInput type="password" id="password" name="Password" value={formData.Password} placeholder="Password" onChange={handleChange} />
        <button type="submit" style={styles.button}>Login</button>
        <button type="button" onClick={onSwitch} style={{...styles.button, backgroundColor: "#ccc", marginTop: '10px'}}>Switch to Register</button>
      </form>
    </div>
  );
};

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(false);

  return isLogin ? 
    <Login onSwitch={() => setIsLogin(false)} /> : 
    <Register onSwitch={() => setIsLogin(true)} />;
};

export default Authentication;

//TODO: add response to the client, add toastify;
//TODO: separated this big component into smalls one;
//TODO: created my owns inputs components;
//TODO: add login by google logic;
