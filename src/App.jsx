
import { useEffect, useState } from "react"
import './App.css';
import axios from 'axios'
import { Route, Routes, useNavigate } from 'react-router-dom'

import SignInPage from './pages/SignInPage'
import HomePage from './pages/HomePage';
import SignUpPage from "./pages/SignUpPage";

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true);

  const checkTokenFromStorage = () => {
    let AUTH_TOKEN = localStorage.getItem("user_token");
    if (AUTH_TOKEN) {
      axios.defaults.headers.token = AUTH_TOKEN;
      setAuth(true);
    }
    setLoading(false);
  }
  useEffect(() => {
    if (!auth && !loading) {
      navigate("/sign-in")
    }
  }, [auth, loading, navigate])



  useEffect(() => {
    checkTokenFromStorage();
  }, [])


  console.log('render')

  return (
    <div className="App">

      {loading ? <></> :
        <>
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/sign-in' element={<SignInPage />} />
            <Route exact path='/sign-up' element={<SignUpPage />} /> 
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
          </Routes>

        </>
      }

    </div>
  )
}

export default App
