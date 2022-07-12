import React, { useEffect, useState, useMemo, useRef } from 'react'
import CatWrite from "../../assets/gif/cat_write.gif"

import HeaderNameProject from './MatchChatCol/Header';
import Tabs from './MatchChatCol/Tabs';
import ChatList from './MatchChatCol/ChatList';
import MatchList from './MatchChatCol/MatchList';
import ChatInfoHeader from './ChatCol/Header';
import ChatForm from './ChatCol/ChatForm';
import Conservations from './ChatCol/Conservations';
import SwipeCard from './TinderSwipe/SwipeCard';
import ProfileCol from './ProfileCol';
import { getMatches } from '../../apis/user';
import { getListChat, getMessage, sendMessage, readMessage } from '../../apis/chat';
import { userState } from '../../recoil/user';
import { useRecoilState } from 'recoil';
import LogoutIcon from '../../assets/svg/logout';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom'
import { socketState } from '../../recoil/socket';
import Modal from '../../components/Modal';




function HomePage() {
    const [user, setUser] = useRecoilState(userState);
    const [lastMatchUser, setLastMatchUser] = useState({
        info: {
            gender: "",
            interest: "",
            name: "",
            birthdate: "",
            desc: "",
            imgUrl: ""
        },
        _id: null
    })
    const navigate = useNavigate();
    const [socket, setSocket] = useRecoilState(socketState);
    const [listChat, setListChat] = useState([])
    const [listMatch, setListMatch] = useState([])
    const [conversation, setConversation] = useState({ messages: [] });
    const [modalData,setmodalData] = useState({
        title:"You have a match",
        reject: "Cancel",
        accept:"Contact now",
        callID:null,
        from: null,
        to:null,
        caller:null
    })
    const listChatRef = useRef();
    const conversationRef = useRef();
    listChatRef.current = listChat;
    conversationRef.current = conversation;


    const [isChat, setIsChat] = useState(true);

    const [chatInput, setChatInput] = useState('');

    const [isChatSide, setIsChatSide] = useState(true);
    const theCard = useRef(null);
    const theFrontCard = useRef(null);
    const theBackCard = useRef(null);
    const [chatPageIndex, setChatPageIndex] = useState(1);

    const [pageIndexMatch, setPageIndexMatch] = useState(1);
    const [chatLoadMore, setChatLoadMore] = useState(true);
    const [isModalShow, setIsModalShow] = useState(false);
    useEffect(() => {
        // settingConversation();
        setUpListMatch();
        setUpListChat();
        setUpSocketCallFirst();
    }, [])

    const logOut = (e) => {
        e.preventDefault();
        setUser({
            info: {
                gender: "",
                interest: "",
                name: "",
                birthdate: "",
                desc: "",
                imgUrl: ""
            },
            match: [],
            like: [],
            unlike: [],
            _id: "",
            email: "",
        })
        localStorage.setItem("user_token", '')
        axios.defaults.headers.token = '';
        navigate('/sign-in')
    }

    const setUpSocketCallFirst = () => {
        socket.emit('reply');
        socket.emit('online', user._id, user.match)
    }
    const setUpListMatch = () => {
        getMatches(pageIndexMatch, 999).then(res => {
            return res.data
        }).then(res => {
            if (res.success) {
                let data = res.data;
                setListMatch(data);
                setPageIndexMatch(pageIndexMatch + 1)
            }

        })
    }


    const setUpListChat = () => {
        getListChat().then(res => {
            return res.data
        }).then(res => {
            if (res.success) {
                let data = res.data;
                data.sort(function (a, b) {
                    return new Date(b.lastModify) - new Date(a.lastModify);
                });
                setListChat(data);
            }

        })
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
        if (item._id != conversationRef.current._id) {
            
            setChatLoadMore(true);
            getMessage(item._id, 1, 10).then(res => {
                return res.data
            }).then(res => {
                let data = res.data;
                setConversation(prev => ({
                    ...prev,
                    ...data,
                    "namePartner": item.users[0].info.name,
                    "imgUrlPartner": item.users[0].info.imgUrl
                }))
                setChatPageIndex(2);
            })

        }
        setIsChatSide(true)
        readMessageCall(item._id);
    }

    const readMessageCall = (chatId) => {

        readMessage(chatId).then(res => {
            return res.data
        }).then(data => {
            if (data.success) {
                let newArray = listChat.map(item => {
                    if (item._id == chatId) {
                        item.usersRead = data.data.usersRead
                    }
                    return item;
                });
                setListChat(newArray)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const handleClickMatch = (item) => {
        setIsChatSide(true);

    }


    const submitChat = () => {
        if (chatInput) {
            let ele = {
                owner: user._id,
                content: chatInput,
                createdAt: new Date(),
            }
            let chatId = conversation._id;
            let matchId = conversation.users[0] == user._id ? conversation.users[1] : conversation.users[0];
            // lưu db tin nhắn
            sendMessage(chatId, matchId, ele.content).then(res => {
                return res.data
            }).then(data => {
                if (data.success) {
                    return null;
                }
                // gửi lại 1 lần nếu lỗi
                sendMessage(chatId, matchId, ele.content);
            })
            // gửi bằng socket cho nhanh để hiện nhưng k lưu db
            socket.emit('send-message', ele, chatId, matchId)
            refreshPositionChatListSend(chatId, ele);
            setConversation(prev => ({
                ...prev,
                messages: [ele, ...prev.messages],
            }))
            setChatInput("")
        }
    }

    useEffect(() => {
        socket.on("matches-online", (data) => {
            // TODO: làm thanh hiện trạng thái hoạt động

        });
        socket.on('receive-message', (newMess, chatId, matchId) => {
            refreshPositionChatListReceived(chatId, newMess);
            if (chatId == conversationRef.current._id) {
                setConversation(prev => ({
                    ...prev,
                    messages: [newMess, ...prev.messages],
                }))
            }
        })
        //  data gồm info và _id
        socket.on('receive-match', (matchUser) =>{
            setLastMatchUser(matchUser);
        })
        socket.on("calling",(mess,matchId,uid,callerName) => { 
                console.log(mess,matchId,uid,callerName);
                setIsModalShow(true)
                setmodalData({
                    title: callerName + " is Calling",
                    reject: "Cancel",
                    accept:"Enter Call Now",
                    callId:matchId,
                    from:mess,
                    to:uid,
                    caller:callerName
                })

         })
    }, [socket])

    useEffect(()=>{
        if(lastMatchUser._id){
            setUpListChat()
            setIsModalShow(true);
        }
    },[lastMatchUser])

    const refreshPositionChatListSend = (chatId, mess) => {
        let cloneListChat = listChatRef.current;
        let itemToTop = null;
        let newArray = cloneListChat.filter((itemChat) => {
            if (itemChat._id == chatId) {
                itemToTop = itemChat;
            }
            return itemChat._id != chatId;
        })
        itemToTop.messages.unshift(mess);
        newArray.unshift(itemToTop);
        setListChat(newArray);
    }

    const refreshPositionChatListReceived = (chatId, mess) => {
        let cloneListChat = listChatRef.current;
        let itemToTop = null;
        let newArray = cloneListChat.filter((itemChat) => {
            if (itemChat._id == chatId) {
                itemToTop = itemChat;
            }
            return itemChat._id != chatId;
        })
        itemToTop.usersRead.forEach(eachUser => {
            if (user._id == eachUser.userId) {
                eachUser.read = false;
            }
        })
        itemToTop.messages.unshift(mess);
        newArray.unshift(itemToTop);
        setListChat(newArray);
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

    const RenderNothingList = ({ text }) => {
        return (
            <div className='text-center text-bold text-xl text-black'>{text}</div>
        )
    };

    const loadMore = () => {
        if (chatLoadMore) {
            getMessage(conversation._id, chatPageIndex, 10).then(res => {
                return res.data
            }).then(res => {
                if (res.success && res.data.messages.length != 0) {
                    let data = res.data.messages;

                    setConversation(prev => ({
                        ...prev,
                        messages: [...prev.messages, ...data],
                    }))
                    setChatPageIndex(chatPageIndex + 1)
                }
                if (res.data.messages.length == 0) {
                    setChatLoadMore(false);
                }
            })
        }

    }

    const NoConversationRenderer = () => {
        return (
            <div className="w-full h-screen flex flex-col justify-center items-center">
                <img src={CatWrite} width='200px' alt="the-cat-is-writing some text" />
                <p className='font-thin '>Now is your time to have some words for this partner</p>
            </div>
        )
    }
    const renderChatOrMatchTab = isChat ?
        listChat.length != 0 ? MemoChatList : <RenderNothingList text={'You have match first'} /> : listMatch.length != 0 ? MemoMatchList : <RenderNothingList text={'You have to swipe card'} />

    const handleModal = (contact) =>{
        setIsModalShow(false);
        if(contact){
            let chatRoomId = getChatIdByUserId(lastMatchUser._id);
            let item = {
                users:[
                    lastMatchUser,
                ],
                _id: chatRoomId
            }
            handleClickChat(item);
        }
    }
    const getChatIdByUserId = (userId) =>{
        let chatRoomId = null;
        listChat.forEach(chatRoom=>{
            if(chatRoom.users[0]._id == userId){
                chatRoomId = chatRoom._id;
            }
        })
        return chatRoomId;
    }

    return (
        <>
            <main className='h-screen grid grid-cols-12 bg-zinc-200 '>
                {isModalShow?<Modal  info={lastMatchUser} toggleModal={(value)=>handleModal(value)} modalData={modalData}/>:null}

                <div className='col-span-3 bg-zinc-100  relative h-screen'>
                    <div className="flex flex-col z-[99]  overflow-hidden">
                        <HeaderNameProject />
                        <Tabs isChat={isChat} onSwitchTab={(bool) => setIsChat(bool)} />
                        {renderChatOrMatchTab}
                    </div>
                    <div className="absolute bottom-0 w-full bg-zinc-200 h-16 flex items-center">
                        <button className="w-4 h-4 m-4" onClick={(e) => logOut(e)}>
                            <LogoutIcon classname="cursor-pointer transition duration-200 ease-in-out hover:fill-sky-400" />
                        </button>

                    </div>
                </div>
                <div className='grid grid-cols-12 col-span-9 '>
                    <div className=" col-span-7 h-screen border-2 border-zinc-300 relative">
                        {/* <div className=' absolute left-0 right-0 top-4 mx-auto z-[9999] flex items-center justify-center'>
    
</div> */}
   
                        <div id='main-container-card' className="h-screen relative">
                            <div ref={theCard} id='the-card' className='bg-zinc-200 the-card h-screen w-full absolute top-0' >
                                <div id='the-front' ref={theFrontCard} className='bg-zinc-100 the-front h-screen w-full aboslute  top-0'>
                                    <div className="flex flex-col h-screen relative">
                                        {!conversation._id ?
                                            <div className=' flex flex-col justify-center items-center h-screen  bg-zinc-200'>
                                                <img src="https://i.pinimg.com/originals/60/fb/1f/60fb1f9ec36ef7e8972d27661c15e2a9.gif" alt="Hiển thị không có gì" />
                                                <p className='text-sm text-center'>Don't want to be like this cat</p>
                                                <p className='text-xl text-bold text-center' >Go into this app and have a partner now</p>
                                                <button className='px-4 py-2 mt-8 bg-sky-400 text-zinc-100 rounded-xl hover:bg-sky-600 hover:scale-110 transition duration-200 ease-in-out' onClick={() => Swicth()}>Let's go</button>
                                            </div> :
                                            <>
                                                <ChatInfoHeader matchHistory={conversation.createdAt} name={conversation.namePartner} avatar={conversation.imgUrlPartner} conversation={conversation} user={user} onExitChat={(e) => Swicth()} />
                                                {
                                                    conversation.messages.length ? <Conservations loadMore={loadMore} conversation={conversation.messages} />
                                                        : <NoConversationRenderer />
                                                }
                                                <ChatForm onChatChange={(text) => setChatInput(text)} chatInput={chatInput} submitChat={submitChat} onReadMessage={(e) => readMessageCall(conversation._id)} />
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
                        <ProfileCol />
                    </div>
                </div>

            </main>
        </>
    )
}

export default HomePage