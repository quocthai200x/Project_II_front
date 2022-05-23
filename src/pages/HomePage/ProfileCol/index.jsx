import React ,{useState ,useRef} from 'react'
import InputWithLabel from '../../../components/InputWithLabel'
import getBase64 from '../../../functions/base64EncoderFile';

function ProfileCol({user}) {
    
    const [password, setPassword] = useState(user.password);
    const [name, setName] = useState(user.name)
    const [gender, setGender] = useState(user.gender);
    const [interestedIn, setInterestedIn] = useState(user.interestedIn);
    const avatarRef = useRef(null)
    const setAvatar = (e) =>{
        // console.log(e.target.files[0])
        getBase64(e.target.files[0]).then(data=>{
            avatarRef.current.style.backgroundImage = `url(${data})`
        })
    }


      
    return (
        <form className='flex flex-col mt-6' >
            <div className='mx-8'>
                <InputWithLabel value={name} onChange={(text => setName(text))} configInputStyle='border-2 rounded-md py-2' label='Name' type='text' />
                <InputWithLabel value={password} onChange={(text => setPassword(text))} configInputStyle='border-2 rounded-md py-2' label='Password' type='password' />
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
            <div className='flex flex-col mt-6 md:mt-0 mx-8 my-8'>
                <label ref = {avatarRef} htmlFor='avatar-input' className="bg-cover border-2 transition duration-200 ease-in-out hover:border-sky-400 cursor-pointer w-40 h-40 rounded-full bg-cover bg-[url('https://img.myloview.com/posters/abstract-sign-avatar-men-icon-male-profile-white-symbol-on-gray-circle-background-vector-illustration-400-155569707.jpg')] "> </label>
                <input onChange={setAvatar} id='avatar-input' className='hidden' type='file' accept="image/*"  />
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
    )
}

export default ProfileCol