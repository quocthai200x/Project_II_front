import React from 'react'
import moment from 'moment'
import Modal from '../../../components/Modal'
import { useRecoilState } from 'recoil';
import { socketState } from '../../../recoil/socket';
import Conversation from './Conservations';
import { userState } from '../../../recoil/user';
import { useRecoilValue } from "recoil";



function Header({ name, matchHistory, avatar, onExitChat,conversation,user }) {
    const [socket, setSocket] = useRecoilState(socketState);
    const currentUser = useRecoilValue(userState);

    console.log(conversation);
    return (
        <div className="bg-zinc-100 flex pl-8 pt-2 pb-1 border-b-2 border-zinc-200 relative">
            <img className='w-12 h-12 rounded-full' src={avatar} />
            <div className="flex flex-col ml-4">
                <span className='font-bold'>{name}</span>
                <span className='text-xs text-zinc-500' >Your match is {moment(matchHistory).format('ll')}</span>

            </div>
            {/* <div style={{float:"left"}}> */}
            <button onClick={
                ()=>{
                let matchId = conversation.users[0] == user._id ? conversation.users[1] : conversation.users[0];
                let callerName = currentUser.info.name
                socket.emit("calling",user._id,conversation._id, matchId,callerName) 
                window.open("http://"+window.location.host + "/call/" + conversation._id+"?u="+user._id).focus();
                
                }} id='call' className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' style={{marginLeft:"auto"}}>Call</button>
                {/* <h2 style={{float:"left"}}>sss</h2> */}
            {/* </div> */}
            <svg style={{margin:".7rem"}} onClick={(e)=>onExitChat(e)} className='cursor-pointer transition duration-200 ease-in-out hover:fill-sky-400  top-5 right-6' width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M15,16 L10.4903882,16 C9.10967629,16 7.99038817,14.8807119 7.99038817,13.5 L7.99038817,9 L7.5,9 C7.22385763,9 7,8.77614237 7,8.5 C7,8.22385763 7.22385763,8 7.5,8 L7.99038817,8 L7.99038817,4.5 C7.99038817,3.11928813 9.10967629,2 10.4903882,2 L19.5,2 C20.8807119,2 22,3.11928813 22,4.5 L22,13.5 C22,14.8807119 20.8807119,16 19.5,16 L16,16 L16,16.5 C16,16.7761424 15.7761424,17 15.5,17 C15.2238576,17 15,16.7761424 15,16.5 L15,16 L15,16 Z M19.5,15 C20.3284271,15 21,14.3284271 21,13.5 L21,4.5 C21,3.67157288 20.3284271,3 19.5,3 L10.4903882,3 C9.66196104,3 8.99038817,3.67157288 8.99038817,4.5 L8.99038817,13.5 C8.99038817,14.3284271 9.66196104,15 10.4903882,15 L19.5,15 Z M13.5,22 C13.2238576,22 13,21.7761424 13,21.5 C13,21.2238576 13.2238576,21 13.5,21 C14.3284271,21 15,20.3284271 15,19.5 C15,19.2238576 15.2238576,19 15.5,19 C15.7761424,19 16,19.2238576 16,19.5 C16,20.8807119 14.8807119,22 13.5,22 Z M4.5,21 C4.77614237,21 5,21.2238576 5,21.5 C5,21.7761424 4.77614237,22 4.5,22 C3.11928813,22 2,20.8807119 2,19.5 C2,19.2238576 2.22385763,19 2.5,19 C2.77614237,19 3,19.2238576 3,19.5 C3,20.3284271 3.67157288,21 4.5,21 Z M3,10.5 C3,10.7761424 2.77614237,11 2.5,11 C2.22385763,11 2,10.7761424 2,10.5 C2,9.11928813 3.11928813,8 4.5,8 C4.77614237,8 5,8.22385763 5,8.5 C5,8.77614237 4.77614237,9 4.5,9 C3.67157288,9 3,9.67157288 3,10.5 Z M2,13.5 C2,13.2238576 2.22385763,13 2.5,13 C2.77614237,13 3,13.2238576 3,13.5 L3,16.5 C3,16.7761424 2.77614237,17 2.5,17 C2.22385763,17 2,16.7761424 2,16.5 L2,13.5 Z M7.5,22 C7.22385763,22 7,21.7761424 7,21.5 C7,21.2238576 7.22385763,21 7.5,21 L10.5,21 C10.7761424,21 11,21.2238576 11,21.5 C11,21.7761424 10.7761424,22 10.5,22 L7.5,22 Z" />
            </svg>
        </div >
    )
}

export default Header