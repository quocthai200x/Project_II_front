import React, { useState } from 'react'
import InputWithLabel from '../../components/InputWithLabel'

function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [gender, setGender] = useState('male');
    const [interestedIn, setInterestedIn] = useState("male");

    return (
        <main className='flex top-16 relative flex-col items-center'>
            <h1 className='text-2xl md:text-4xl font-extrabold mb-10'>
                <span className='text-sky-400'>Welcome to </span>
                <span className='text-sky-600'>Project II</span>
            </h1>
            <form className='flex flex-col md:flex-row mt-6' >
                <div className='mx-8'>
                    <InputWithLabel value={email} onChange={(text => setEmail(text))} configInputStyle='border-2 rounded-md py-2' label='Email' type='text' />
                    <InputWithLabel value={password} onChange={(text => setPassword(text))} configInputStyle='border-2 rounded-md py-2' label='Password' type='password' />
                    <InputWithLabel value={name} onChange={(text => setName(text))} configInputStyle='border-2 rounded-md py-2' label='Name' type='text' />
                    <div className="my-4">
                        <span className='font-semibold'>Gender:</span>
                    </div>
                    <div className="flex flex-row">
                        <div className='flex flex-row'>
                            <input className='cursor-pointer border-2 border-sky-500 focus:border-transparent focus:ring-0 checked:bg-sky-400' onChange={(e) => { setGender(e.target.value) }} checked={gender === 'male'} value='male' name='gender-radio' id='male-radio' type='radio' />
                            <label className='ml-2 leading-3 cursor-pointer mb-2 text-base font-bold text-sky-400' htmlFor='male-radio'>Male</label>
                        </div>
                        <div className='ml-8 flex flex-row '>
                            <input className=' cursor-pointer border-2 border-sky-500 focus:border-transparent focus:ring-0 checked:bg-sky-400' onChange={e => setGender(e.target.value)} checked={gender === 'female'} value='female' name='gender-radio' id='female-radio' type='radio' />
                            <label className='ml-2 leading-3  cursor-pointer mb-2 text-base font-bold text-sky-400' htmlFor='female-radio'>Female</label>

                        </div>
                    </div>

                </div>
                <div className='flex flex-col mt-6 md:mt-0 mx-8'>
                    <label htmlFor='avatar-input' className="border-2 transition duration-200 ease-in-out hover:border-sky-400 cursor-pointer w-40 h-40 rounded-full bg-cover bg-[url('https://img.myloview.com/posters/abstract-sign-avatar-men-icon-male-profile-white-symbol-on-gray-circle-background-vector-illustration-400-155569707.jpg')] "> </label>
                    <input id='avatar-input' className='hidden' type='file' />
                    <div className="mt-5 flex flex-col">
                        <label htmlFor='date-input' className='mb-4 cursor-pointer text-lg font-bold text-sky-400'>Date of Birth</label>
                        <input id='date-input' type="date" className='cursor-pointer text-base border-b-2 rounded-md focus:border-sky-200 focus:outline-none transition duration-200 ease-in-out hover:ease-in' />
                    </div>


                    <div className="mt-7">
                        <span className='font-semibold'>Interested in:</span>
                        <div className="flex flex-row my-4">
                            <div className="flex flex-row">
                                <input className='cursor-pointer border-2 border-sky-400 focus:border-transparent focus:ring-0 checked:bg-sky-400' onChange={(e) => { setInterestedIn(e.target.value) }} checked={interestedIn === 'male'} value='male' name='gender-interested-radio' id='male-interested-radio' type='radio' />
                                <label className='text-base ml-2 leading-3  cursor-pointer mb-2  font-bold text-sky-400' htmlFor='male-interested-radio'>Male</label>
                            </div>
                            <div className="ml-8 flex flex-row">
                                <input className='cursor-pointer border-2 border-sky-400 focus:border-transparent focus:ring-0 checked:bg-sky-400 ' onChange={e => setInterestedIn(e.target.value)} checked={interestedIn === 'female'} value='female' name='gender-interested-radio' id='female-interested-radio' type='radio' />
                                <label className='text-base ml-2 leading-3  cursor-pointer mb-2 font-bold text-sky-400' htmlFor='female-interested-radio'>Female</label>
                            </div>
                        </div>
                    </div>


                </div>
            </form>
            <div className='flex flex-col items-center  mt-16 '>
                <p className='text-md m-auto'>Already have an account?<a className='cursor-pointer hover:text-sky-600 text-sky-400 transition ease-in-out duration-200' href='/sign-in'>Sign in</a></p>
            </div>
        </main>
    )
}

export default SignUpPage