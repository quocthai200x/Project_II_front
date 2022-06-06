import React, { useEffect, useState } from 'react'
import FormInputLayout from '../../layouts/FormInputLayout';
import InputWithLabel from '../../components/InputWithLabel';
import { signIn } from '../../apis/auth';
import { useRecoilState, useRecoilCallback } from 'recoil'
import { userState } from '../../recoil/user.jsx'
import {  useNavigate } from 'react-router-dom'
import axios from '../../axios';





function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsloading] = useState(false);
  const [user, setUser] = useRecoilState(userState);

  // useEffect(()=>{
  //   let AUTH_TOKEN = localStorage.getItem("user_token");
  //   if(AUTH_TOKEN){

  //   }
  // },[])

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

  const onSignIn = (e) => {
    e.preventDefault();
    // TODO: make a api call to sign in
    setIsloading(true);
    signIn({ email, password }).then(result => { return result.data })
      .then(result => {
        if (result.success) {
          console.log("Sucesss");
          let data = result.data;
          setUserInfo(data)
          localStorage.setItem("user_token", data.accessToken)
          axios.defaults.headers.token = data.accessToken;
          navigate('/')
        } else {
          console.log(result)
          setIsloading(false);
          setErrorMessage(result.message)
        }
      }).catch((err)=>{
        console.log(err);
      })
  }

  return (
    <main className='flex top-16 relative flex-col items-center'>
      <h1 className='text-2xl md:text-4xl font-extrabold mb-10'>
        <span className='text-sky-400'>Welcome to </span>
        <span className='text-sky-600'>Project II</span>
      </h1>
       
      <FormInputLayout>
        <InputWithLabel label='email' type='email' value={email} placeHolder='Type your email' onChange={(text) => setEmail(text)} />
        <InputWithLabel label='password' type='password' value={password} placeHolder='Type your password' onChange={(text) => setPassword(text)} />
        <p className='text-xs h-4 text-red-500 font-bold indent-1 mt-4'>{errorMessage}</p>
        <div className='flex flex-col items-center mb-16 mt-12 '>
          <button disabled={isLoading} onClick={(e) => onSignIn(e)} className='cursor-pointer w-60 md:w-72 py-2 px-4 bg-sky-400 rounded-xl text-white font-bold hover:bg-sky-600 transition ease-in-out duration-200' >Sign in</button>
        </div>
        <div className='flex flex-col items-center  mb-16 '>
          <p className='text-sm m-auto'>Dont have a account?<a className='cursor-pointer hover:text-sky-600 text-sky-400 transition ease-in-out duration-200' href='/sign-up'> Sign up </a></p>
        </div>
      </FormInputLayout>
      {isLoading?<>
        <div className='z-[999] fixed top-0 opacity-20 bg-black flex justify-center items-center w-screen h-screen'>
            <img className='w-auto h-1/3' src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif" alt="" />
        </div>
      </>:<></>}
    </main>
    
  )
}

export default SignInPage