import React ,{useState ,useRef, useEffect} from 'react'
import { useRecoilState } from 'recoil';
import { uploadImage } from '../../../apis/other';
import { updateProfile } from '../../../apis/settings';
import InputWithLabel from '../../../components/InputWithLabel'
import getBase64 from '../../../functions/base64EncoderFile';
import { userState } from '../../../recoil/user';


function ProfileCol() {
    const [user, setUser] = useRecoilState(userState)
    const avatarRef = useRef(null)
    const setAvatar = (e) =>{
        if (e.target.files.length) {
            avatarRef.current.style.backgroundImage = 'url("https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif")'
            getBase64(e.target.files[0]).then((data) => {
                uploadImage({ base64URL: data }).then(result => {
                    return result.data
                }).then(resultUpload => {
                    if (resultUpload.success) {
                        setImgUrl(resultUpload.data.link);
                        avatarRef.current.style.backgroundImage = `url(${resultUpload.data.link})`
                    } else {
                        console.log(resultUpload);
                    }
                })
            })
        }
    }
    useEffect(()=>{
        avatarRef.current.style.backgroundImage = `url(${user.info.imgUrl})`
    },[])

    const setImgUrl = (value) =>{
        setUser(prev =>({
            ...prev,
            "info": {
                ...prev.info,
                imgUrl: value,
            }
        }))
    }
    
    const setName = (text) =>{
        setUser(prev =>({
            ...prev,
            "info": {
                ...prev.info,
                name: text,
            }
        }))
    }

    const setGender = (value) =>{
        setUser(prev =>({
            ...prev,
            "info": {
                ...prev.info,
                gender: value,
            }
        }))
    }

    const setDob = (value) =>{
        setUser(prev =>({
            ...prev,
            "info": {
                ...prev.info,
                birthdate: value,
            }
        }))
    }

    const setDesc = (value) =>{
        setUser(prev =>({
            ...prev,
            "info": {
                ...prev.info,
                desc: value,
            }
        }))
    }
    const setInterestedIn = (value) =>{
        setUser(prev =>({
            ...prev,
            "info": {
                ...prev.info,
                interest: value,
            }
        }))
    }

    const updateInfo = (e )=>{
        e.preventDefault();
        let { name,
            gender,
            interest,
            birthdate,
            desc,
            imgUrl} = user.info
        updateProfile(name, gender, interest, birthdate, desc, imgUrl)
        .then(result => {
            return result.data
        }).then(result => {
            if(result.success){
                alert("Update success")
            }
            else{
                alert("Update failed")
            }
        })
    }
      
    return (
        <form className='flex flex-col mt-4' >
            <div className='mx-8'>
                <InputWithLabel value={user.info.name} onChange={(text => setName(text))} configInputStyle='border-2 rounded-md py-2' label='Name' type='text' />
                {/* <InputWithLabel value={password} onChange={(text => setPassword(text))} configInputStyle='border-2 rounded-md py-2' label='Password' type='password' /> */}
                <div className="my-4">
                    <span className='font-semibold'>Gender:</span>
                </div>
                <div className="flex flex-row my-2">
                    <div className='flex flex-row'>
                        <input className='cursor-pointer border-2 border-sky-500 focus:border-transparent focus:ring-0 checked:bg-sky-400' onChange={(e) => { setGender(e.target.value) }} checked={user.info.gender === 'male'} value='male' name='gender-radio' id='male-radio' type='radio' />
                        <label className='ml-2 leading-3 cursor-pointer mb-2 text-base font-bold text-sky-400' htmlFor='male-radio'>Male</label>
                    </div>
                    <div className='ml-8 flex flex-row '>
                        <input className=' cursor-pointer border-2 border-sky-500 focus:border-transparent focus:ring-0 checked:bg-sky-400' onChange={e => setGender(e.target.value)} checked={user.info.gender === 'female'} value='female' name='gender-radio' id='female-radio' type='radio' />
                        <label className='ml-2 leading-3  cursor-pointer mb-2 text-base font-bold text-sky-400' htmlFor='female-radio'>Female</label>

                    </div>
                </div>

            </div>
            <div className='flex flex-col mt-6 md:mt-0 mx-8 my-8'>
                <label ref = {avatarRef} htmlFor='avatar-input' className=" border-2 transition duration-200 ease-in-out hover:border-sky-400 cursor-pointer w-40 h-40 rounded-full bg-cover bg-[url('https://img.myloview.com/posters/abstract-sign-avatar-men-icon-male-profile-white-symbol-on-gray-circle-background-vector-illustration-400-155569707.jpg')] "> </label>
                <input onChange={setAvatar} id='avatar-input' className='hidden' type='file' accept="image/*"  />
                <div className="mt-5 flex flex-col">
                    <label htmlFor='date-input' className='mb-4 cursor-pointer text-lg font-bold text-sky-400'>Date of Birth</label>
                    <input onChange={(e)=>{setDob(e.target.value)}} value={user.info.birthdate} id='date-input' type="date" className='cursor-pointer text-base border-b-2 rounded-md focus:border-sky-200 focus:outline-none transition duration-200 ease-in-out hover:ease-in' />
                </div>


                <div className="mt-4">
                    <span className='font-semibold'>Interested in:</span>
                    <div className="flex flex-row my-4">
                        <div className="flex flex-row">
                            <input className='cursor-pointer border-2 border-sky-400 focus:border-transparent focus:ring-0 checked:bg-sky-400' onChange={(e) => { setInterestedIn(e.target.value) }} checked={user.info.interest === 'male'} value='male' name='gender-interested-radio' id='male-interested-radio' type='radio' />
                            <label className='text-base ml-2 leading-3  cursor-pointer mb-2  font-bold text-sky-400' htmlFor='male-interested-radio'>Male</label>
                        </div>
                        <div className="ml-8 flex flex-row">
                            <input className='cursor-pointer border-2 border-sky-400 focus:border-transparent focus:ring-0 checked:bg-sky-400 ' onChange={e => setInterestedIn(e.target.value)} checked={user.info.interest === 'female'} value='female' name='gender-interested-radio' id='female-interested-radio' type='radio' />
                            <label className='text-base ml-2 leading-3  cursor-pointer mb-2 font-bold text-sky-400' htmlFor='female-interested-radio'>Female</label>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <textarea value={user.info.desc} onChange={(e)=>setDesc(e.target.value)}  className='outline-none p-2 w-full h-24'>
                    </textarea>
                </div>
                <div className="mt-4 flex justify-center items-center">
                     <button onClick={(e) =>updateInfo(e)} className='transition duration-200 ease-in-out bg-sky-400 py-2 px-4 rounded-md text-white hover:bg-sky-600'  >Update Profile</button>
                </div>


            </div>
        </form>
    )
}

export default ProfileCol