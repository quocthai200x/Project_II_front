import React,{useEffect, useRef} from 'react'
import MatchGif from "../assets/gif/love_match.gif"
import { timeToShowAndHide } from '../constant/settings';

function Modal({info, toggleModal,modalData}){
  const modalElementRef = useRef(null);
  const backgroundRef = useRef(null);
  let timer = null;
  useEffect(() => {
      modalElementRef.current.style.transform = 'scale(0)'
      backgroundRef.current.style.backgroundColor = 'rbga(0,0,0,0)'
      let animation = setTimeout(()=>{
        modalElementRef.current.style.transform = 'scale(1)'
        backgroundRef.current.style.backgroundColor = 'rbga(0,0,0,0.4)'
      },timeToShowAndHide)
      return () => {
        clearTimeout(animation)
        clearTimeout(timer);
      }
  }, [])

  const cancel = () =>{
    closeModal(false)
  }
  const contact = () =>{
    closeModal(true)
  }
  const call = () => {
    console.log(modalData.matchId);
    window.open("http://"+window.location.host + "/call/" + modalData.callId+"?u="+modalData.from).focus();
    closeModal(true)

  }
// true là có contact, false là chỉ đóng modal
  const closeModal = (value) =>{
    backgroundRef.current.style.backgroundColor = 'rbga(0,0,0,0)'
    modalElementRef.current.style.transform = 'scale(0)'
    timer = setTimeout(()=>{
      toggleModal(value)
    },timeToShowAndHide)
  }

  
  
  return (
    <div ref={backgroundRef} style={{ background: "rgba(0,0,0, 0.4)" }} className='transition duration-[500ms] absolute top-0 left-0 h-screen w-screen  z-[998] flex justify-center items-center'>
      <div ref={modalElementRef}className='transition duration-[500ms] px-8 py-8  rounded bg-white z-[999]  flex flex-col justify-center items-center'>
        <img src={MatchGif} alt="" className='h-40 w-40' />
        <span className='text-2xl font-bold'>{modalData.title}</span>
        <span className='font-medium'>{info.info.name}</span>
        <div className='flex mt-12'>
          <button className='m-4 border-2 border-sky-400 px-4 py-2 rounded text-sky-400 w-32' onClick={cancel}>{modalData.reject}</button>
          {
            (modalData.accept=="Enter Call Now")
            ?(<button className='m-4 bg-sky-400 px-4 py-2 rounded text-white w-32'  onClick={call}>{modalData.accept}</button>)
            :<button className='m-4 bg-sky-400 px-4 py-2 rounded text-white w-32'  onClick={contact}>Contact now</button>   
          }
        </div>
      </div>
    </div>
  )
}

export default Modal