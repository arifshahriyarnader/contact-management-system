import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState} from "react";
//import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthContextProvider =({children}) =>{
    const navigate = useNavigate();
    const {toast} = useContext(ToastContext);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

   useEffect(() =>{
        checkUserLoggedIn();
   })

    //check if the user is logged in.
    const checkUserLoggedIn = async() =>{
        try{
            const res= await fetch(`http://localhost:5000/api/auth/me`, {
                method:"GET",
                headers:{
                   Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result =await res.json();
            if(!result.error){
                setUser(result);
                navigate("/", {replace:true})
            }
        }
        catch(err){
            console.log(err);
        }
    }

    //login request
    const loginUser = async(userData) =>{
        try{
            const res= await fetch(`http://localhost:5000/api/auth/login`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({...userData}),
            });
            const result= await res.json();
            if(!result.error){
                localStorage.setItem("token", result.token);
                setUser(result.user);
                toast.success(`Logged in ${result.user.name}`);
                navigate("/", {replace:true})
            }else{
               toast.error(result.error)
            }
        }
        catch(err){
            console.log(err);
        }
    }

    //register request

    const registerUser =async(userData) =>{
        try{
            const res = await fetch(`http://localhost:5000/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({...userData}),
            });
            const result = await res.json();
            if(!result.error){
                toast.success("User registered successfully! login into your account.");
                navigate("/login", {replace:true})
            }
            else{
                toast.error(result.error);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    return (
        <AuthContext.Provider value={{loginUser, registerUser, user, setUser}}>
        {children}
        </AuthContext.Provider>
    );
}
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default AuthContext;