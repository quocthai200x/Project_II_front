import React, { useEffect, useState, useMemo, useRef } from 'react'


import HeaderNameProject from './MatchChatCol/Header';
import Tabs from './MatchChatCol/Tabs';
import ChatList from './MatchChatCol/ChatList';
import MatchList from './MatchChatCol/MatchList';
import ChatInfoHeader from './ChatCol/Header';
import ChatForm from './ChatCol/ChatForm';
import Conservations from './ChatCol/Conservations';
import SwipeCard from './TinderSwipe/SwipeCard';
import ProfileCol from './ProfileCol';



function HomePage() {
    const [listChat, setListChat] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [listMatch, setListMatch] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [isChat, setIsChat] = useState(true);
    const [personChatWith, setPersonChatWith] = useState({})
    const [chatInput, setChatInput] = useState('');
    const [conversation, setConversation] = useState([]);
    const [isChatSide, setIsChatSide] = useState(true);
    const theCard = useRef(null);
    const theFrontCard = useRef(null);
    const theBackCard = useRef(null);

    useEffect(() => {
        settingConversation();
    }, [])


    const settingConversation = () => {
        for (let index = 0; index < 20; index++) {
            let ele = {};
            if (index % 2 == 0) {
                ele = {
                    type: "text",
                    _id: "626b953c0d48da2fb402ccd1",
                    owner: "1",
                    content: "Hi Im Alice",
                    createdAt: "2022-04-29T07:35:24.903Z"
                }
            } else {
                ele = {
                    type: "text",
                    _id: "626b94860d48da2fb402ccce",
                    owner: "2",
                    content: "Hi Im Bob",
                    createdAt: "2022-04-29T07:32:22.545Z"

                }
            }

            setConversation(prev => [...prev, ele])
        }
    }

    const Swicth = () => {
        setIsChatSide(!isChatSide);
    }

    useEffect(() => {
        if (isChatSide) {
            theCard.current.style.transform = "rotateY(0deg)"
            theFrontCard.current.style.visibility = "visible";
            theBackCard.current.style.visibility = 'hidden';



        } else {
            theCard.current.style.transform = "rotateY(180deg)"
            theFrontCard.current.style.visibility = "hidden";
            theBackCard.current.style.visibility = 'visible';


        }
    }, [isChatSide])

    const handleClickChat = (item) => {
        console.log('chat: ' + item);
    }
    const handleClickMatch = (item) => {
        console.log('match: ' + item)
    }

    const submitChat = () => {
        if (chatInput) {
            let ele = {
                type: "text",
                _id: "626b94860d48da2fb402ccce",
                owner: "1",
                content: chatInput,
                createdAt: "2022-04-29T07:32:22.545Z"
            }

            setConversation(
                prev => [ele, ...prev]
            )
            setChatInput("")
        }

    }

    const MemoChatList = useMemo(() => {
        return (
            <ChatList onClickChatItem={(item) => handleClickChat(item)} listChat={listChat} />
        )
    }, [listChat])
    const MemoMatchList = useMemo(() => {
        return (
            <MatchList onClickMatchItem={(item) => handleClickMatch(item)} listMatch={listMatch} />

        )
    }, [listMatch])



    const renderChatOrMatchTab = isChat ? MemoChatList : MemoMatchList

    return (
        <main className='h-screen grid grid-cols-12 bg-zinc-200'>
            <div className="flex flex-col bg-zinc-100 col-span-3 overflow-hidden  z-[99]">
                <HeaderNameProject />
                <Tabs isChat={isChat} onSwitchTab={(bool) => setIsChat(bool)} />
                {renderChatOrMatchTab}
            </div>
            <div className='grid grid-cols-12 col-span-9'>
                <div className=" col-span-7 h-screen border-2 border-zinc-300 ">
                    <div id='main-container-card' className="h-screen relative">
                        <div ref={theCard} id='the-card' className='bg-zinc-200 the-card h-screen w-full absolute top-0' >
                            <div id='the-front' ref={theFrontCard} className='bg-zinc-100 the-front h-screen w-full aboslute  top-0'>
                                <div className="flex flex-col h-screen relative">
                                    {conversation.length === 0 ?
                                        <div className=' flex flex-col justify-center items-center h-screen  bg-zinc-200'>
                                            <img src="https://i.pinimg.com/originals/60/fb/1f/60fb1f9ec36ef7e8972d27661c15e2a9.gif" alt="Hiển thị không có gì" />
                                            <p className='text-sm text-center'>Don't want to be like this cat</p>
                                            <p className='text-xl text-bold text-center' >Go into this app and have a partner now</p>
                                            <button className='px-4 py-2 mt-8 bg-sky-400 text-zinc-100 rounded-xl hover:bg-sky-600 hover:scale-110 transition duration-200 ease-in-out' onClick={() => Swicth()}>Let's go</button>
                                        </div> :
                                        <>
                                            <ChatInfoHeader onExitChat={(e) => Swicth()} />
                                            <Conservations conversation={conversation} />
                                            <ChatForm onChatChange={(text) => setChatInput(text)} chatInput={chatInput} submitChat={submitChat} />
                                        </>
                                    }

                                </div>
                            </div>

                            <div id='the-back' ref={theBackCard} className=' the-back flex flex-col items-center justify-center h-screen w-full bg-zinc-200 absolute  top-0 ' >
                                <svg onClick={(e) => Swicth()} className='cursor-pointer transition duration-200 ease-in-out hover:fill-sky-400 absolute top-5 right-6' width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15,16 L10.4903882,16 C9.10967629,16 7.99038817,14.8807119 7.99038817,13.5 L7.99038817,9 L7.5,9 C7.22385763,9 7,8.77614237 7,8.5 C7,8.22385763 7.22385763,8 7.5,8 L7.99038817,8 L7.99038817,4.5 C7.99038817,3.11928813 9.10967629,2 10.4903882,2 L19.5,2 C20.8807119,2 22,3.11928813 22,4.5 L22,13.5 C22,14.8807119 20.8807119,16 19.5,16 L16,16 L16,16.5 C16,16.7761424 15.7761424,17 15.5,17 C15.2238576,17 15,16.7761424 15,16.5 L15,16 L15,16 Z M19.5,15 C20.3284271,15 21,14.3284271 21,13.5 L21,4.5 C21,3.67157288 20.3284271,3 19.5,3 L10.4903882,3 C9.66196104,3 8.99038817,3.67157288 8.99038817,4.5 L8.99038817,13.5 C8.99038817,14.3284271 9.66196104,15 10.4903882,15 L19.5,15 Z M13.5,22 C13.2238576,22 13,21.7761424 13,21.5 C13,21.2238576 13.2238576,21 13.5,21 C14.3284271,21 15,20.3284271 15,19.5 C15,19.2238576 15.2238576,19 15.5,19 C15.7761424,19 16,19.2238576 16,19.5 C16,20.8807119 14.8807119,22 13.5,22 Z M4.5,21 C4.77614237,21 5,21.2238576 5,21.5 C5,21.7761424 4.77614237,22 4.5,22 C3.11928813,22 2,20.8807119 2,19.5 C2,19.2238576 2.22385763,19 2.5,19 C2.77614237,19 3,19.2238576 3,19.5 C3,20.3284271 3.67157288,21 4.5,21 Z M3,10.5 C3,10.7761424 2.77614237,11 2.5,11 C2.22385763,11 2,10.7761424 2,10.5 C2,9.11928813 3.11928813,8 4.5,8 C4.77614237,8 5,8.22385763 5,8.5 C5,8.77614237 4.77614237,9 4.5,9 C3.67157288,9 3,9.67157288 3,10.5 Z M2,13.5 C2,13.2238576 2.22385763,13 2.5,13 C2.77614237,13 3,13.2238576 3,13.5 L3,16.5 C3,16.7761424 2.77614237,17 2.5,17 C2.22385763,17 2,16.7761424 2,16.5 L2,13.5 Z M7.5,22 C7.22385763,22 7,21.7761424 7,21.5 C7,21.2238576 7.22385763,21 7.5,21 L10.5,21 C10.7761424,21 11,21.2238576 11,21.5 C11,21.7761424 10.7761424,22 10.5,22 L7.5,22 Z" />
                                </svg>
                                <SwipeCard />
                            </div>




                        </div>
                    </div>

                </div>
                <div className="flex flex-col bg-zinc-100 col-span-5 z-[99]">
                    <ProfileCol user={{
                        email:"quocthai2000x@gmail.com",
                        password:"12345567",
                        name:"Thai NXQ",
                        gender:"male",
                        interestedIn:"female",
                        avatar:"https://i.pinimg.com/736x/80/1e/59/801e5989fe2ff32395865bd36f6734c5.jpg"
                    }
                    } />
                </div>
            </div>

        </main>
    )
}

export default HomePage