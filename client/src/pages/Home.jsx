import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate= useNavigate();
    const {user} = useContext(AuthContext)
    useEffect(() => {
        !user && navigate("/login", {replace:true})
    }, [])
    return (
        <div>
            <h1>This is home page</h1>
        </div>
    );
};

export default Home;