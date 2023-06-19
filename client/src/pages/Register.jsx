import { useContext } from "react";
import { useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import ToastContext from "../context/ToastContext.jsx";
import { Link } from "react-router-dom";
const Register = () => {
    const {toast} = useContext(ToastContext);
    const {registerUser} = useContext(AuthContext);
    const [credentials, setCredentials] =useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const handleInputChange =(e) =>{
        const {name, value} = e.target;
        setCredentials({...credentials, [name]:value})
    }
    const handleSubmit=(e) =>{
        e.preventDefault();
        
        if(!credentials.name || !credentials.email || 
          !credentials.password || !credentials.confirmPassword){
            toast.error("Please enter all the required fields");
            return;
          }
          if(credentials.password !== credentials.confirmPassword){
            toast.error("Password do not match");
            return;
          }
          const userData ={...credentials,confirmPassword:undefined};
          registerUser(userData);
    }
    return (
       <>
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
      <label htmlFor="exampleInput" className="form-label mt-4">Name</label>
      <input type="name" 
      className="form-control" 
      id="exampleInput" 
      name="name"
      value={credentials.name}
      onChange={handleInputChange}
      placeholder="Enter Your Name"
      required />
    </div>
    {/* <div className="form-group">
      <label htmlFor="phoneInput" className="form-label mt-4">Phone</label>
      <input type="tel" 
      className="form-control" 
      id="phoneleInput" 
      name="phone"
      value={credentials.phone}
      onChange={handleInputChange}
      placeholder="Mobile Number"
      required />
    </div> */}
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
    <div className="form-group">
      <label htmlFor="confirmPassword" className="form-label mt-4">Confirm Password</label>
      <input type="password" 
      className="form-control" 
      id="confirmPassword" 
      name="confirmPassword"
      value={credentials.confirmPassword}
      onChange={handleInputChange}
      placeholder="Confirm Password"
      required />
    </div>
    <button type="submit" className="btn btn-primary mt-3">Register</button>
    <p>Already have an account ? <Link to="/login">Login</Link></p>
    </form>
       </>
    );
};

export default Register;