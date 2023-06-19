import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import ToastContext from "../context/ToastContext.jsx";
import { Link } from "react-router-dom";

const Login = () => {
  const {toast} = useContext(ToastContext)
  const {loginUser} = useContext(AuthContext);
    const [credentials, setCredentials] =useState({
        email:"",
        password:""
    })
    const handleInputChange =(e) =>{
        const {name, value} = e.target;
        setCredentials({...credentials, [name]: value});
    }
    const handleSubmit =(e) =>{
        e.preventDefault();
        if(!credentials.email || !credentials.password){
            toast.error("Please enter all the required fields");
            return;
        }
        loginUser(credentials);
    }
    return (
       <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
      <label htmlFor="exampleInput" className="form-label mt-4">Email address</label>
      <input type="email" 
      className="form-control" 
      id="exampleInput" 
      name="email"
      value={credentials.email}
      onChange={handleInputChange}
      placeholder="Enter email"
      required />
    </div>
    <div className="form-group">
      <label htmlFor="passwordInput" className="form-label mt-4">Password</label>
      <input type="password" 
      className="form-control" 
      id="passwordInput" 
      name="password"
      value={credentials.password}
      onChange={handleInputChange}
      placeholder="Enter Password"
      required />
    </div>
    <button type="submit" className="btn btn-primary mt-3">Login</button>
    <p>Don&apos;t have an account ? <Link to="/register">Create an Account</Link></p>
    </form>
       </>
    );
};

export default Login;