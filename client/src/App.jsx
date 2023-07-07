import Layout from './components/Layout/Layout'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateContact from './pages/CreateContact';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ToastContextProvider } from './context/ToastContext';



function App() {
  return (
    <Router>
    <ToastContextProvider>
      <AuthContextProvider>
          <Layout>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/create" element={<CreateContact />} />
            </Routes>
          </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
    </Router>
  
  )
}

export default App
