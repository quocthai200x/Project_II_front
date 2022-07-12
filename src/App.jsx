import * as React from 'react';
import { useEffect, useState, Suspense } from "react"
import './App.css';
import axios from './axios'
import { useRecoilState } from 'recoil'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { checkUser } from './apis/auth';
import { userState } from './recoil/user';
// import VueSocketIO from 'vue-3-socket.io'
// import SocketIO from 'socket.io-client'

import { socketState } from './recoil/socket';
// import Call from './pages/HomePage/Call/Call'

import Test from './Test';
const SignInPage = React.lazy(() => import('./pages/SignInPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const Call = React.lazy(() => import('./pages/HomePage/Call/Call'));
const SignUpPage = React.lazy(() => import("./pages/SignUpPage"));


function App() {

  const navigate = useNavigate();
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useRecoilState(userState)
  const [socket, setSocket] = useRecoilState(socketState)

  const setUserInfo = (data) => {
    let info = data.info
    setUser({
      info: info,
      match: data.match,
      like: data.like,
      unlike: data.unlike,
      _id: data._id,
      email: data.email,
    })
  }

  const checkTokenFromStorage = () => {

    console.log('Check token');

    let AUTH_TOKEN = localStorage.getItem("user_token");
    if (AUTH_TOKEN) {
      axios.defaults.headers.token = AUTH_TOKEN;
      checkUser().then(result => {
        return result.data
      }).then(data => {
        if (data.success) {
          let userData = data.data
          setUserInfo(userData);
          setAuth(true);
        }
        else {
          console.log("clear")
          axios.defaults.headers.token = "";
          localStorage.clear();
          navigate("/sign-in")
        }
        setLoading(false);

      })
    } else {
      let pathNameCanAccessWithoutToken = ['/sign-up', '/sign-in']
      if (!pathNameCanAccessWithoutToken.includes(window.location.pathname)) {
        navigate("/sign-in", { replace: true })
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    checkTokenFromStorage();
  }, [])

  const LoadingPage = () => {
    return (
      <div className=" w-screen h-screen flex flex-col justify-center items-center">
        <svg role="status" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <p>Please wait a second for loading app...</p>
      </div>
    )
  }

  return (
    <div className="App body">

      {loading ? <LoadingPage /> :
        <>
          <Routes>
            <Route exact path='/' element={
              <Suspense fallback={<LoadingPage />}>
                <HomePage />
              </Suspense>
            } />
            <Route exact path='/sign-in' element={
              <Suspense fallback={<LoadingPage />}>
                <SignInPage />
              </Suspense>
            } />
            <Route exact path='/sign-up' element={
              <Suspense fallback={<LoadingPage />}>
                <SignUpPage />
              </Suspense>
            } />
            <Route exact path='/test' element={
              <Suspense fallback={<LoadingPage />}>
                <Test />
              </Suspense>
            } />
            <Route exact path='call/:id' element={
              <Suspense fallback={<LoadingPage />}>
                <Call/>
              </Suspense>
              // <Call/>
            } />

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
