import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import ToastContext from "../../context/ToastContext";
const Navbar =({title= "CMS"}) =>{
  const navigate= useNavigate();
  const {user, setUser} = useContext(AuthContext);
  const {toast} = useContext(ToastContext); 
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">

        <Link to="/" className="navbar-brand">
          {title}
          </Link> 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav ms-auto">
        {user ? (
          <>
            <li className="nav-item">
            <Link className="nav-link" to="/create">Create</Link>
        </li>
           <li className="nav-item" onClick={() =>{
            setUser(null);
            localStorage.clear();
            toast.success("Logged Out")
            navigate("/login", {replace:true})
          }}>
          <button className="btn btn-danger">Logout</button>
          </li>
          </>
        ) : (
          <><li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
        </li></>
        )}
      </ul>
    </div>
  </div>
</nav>
 )
}

export default Navbar;