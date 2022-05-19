import React, { useState } from 'react'
import FormInputLayout from '../../layouts/FormInputLayout';
import InputWithLabel from '../../components/InputWithLabel';

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const onSignIn = (e) => {
    e.preventDefault();
    // TODO: make a api call to sign in
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
          <button onClick={(e) => onSignIn(e)} className='cursor-pointer w-60 md:w-72 py-2 px-4 bg-sky-400 rounded-xl text-white font-bold hover:bg-sky-600 transition ease-in-out duration-200' >Sign in</button>
        </div>
        <div className='flex flex-col items-center  mb-16 '>
          <p className='text-sm m-auto'>Dont have a account?<a className='cursor-pointer hover:text-sky-600 text-sky-400 transition ease-in-out duration-200' href='/sign-up'> Sign up </a></p>
        </div>
      </FormInputLayout>

    </main>
  )
}

export default SignInPage