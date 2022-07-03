import React from 'react'
import moment from "moment"
import { userState } from '../../../recoil/user';
import { useRecoilState } from 'recoil';


function ChatList({ listChat, onClickChatItem }) {
    const [user, setUser] = useRecoilState(userState);
    return (

        <ul className=' scrollbar  overflow-scroll overflow-x-hidden'>
            {listChat.map((item, index) => {
                let hasRead = true;
                item.usersRead.forEach((eachUser) => {
                    if (eachUser.userId == user._id) {
                        hasRead = eachUser.read;
                    }
                })
                return (
                    <li onClick={() => onClickChatItem(item)} key={"chat-list-" + index} className='transition duration-200 ease-in-out hover:bg-zinc-200 cursor-pointer flex flex-row px-4 py-2'>
                        <img loading='lazy' className='w-14 h-14 rounded-full' src={item.users[0].info.imgUrl} />
                        <div className="flex flex-col ml-4">
                            <span className='font-bold'>{item.users[0].info.name}</span>
                            <span className={"text-xs text-zinc-500 " + (hasRead ? ' ' : ' font-bold')} >{item.messages.length ?
                                (item.messages[0].owner != item.users[0]._id ?
                                    "Bạn: " + item.messages[0].content.substring(0, 40) :
                                    item.messages[0].content.substring(0, 40))
                                +
                                ' . ' + moment(item.messages[0].createdAt).fromNow()

                                : `Have a text to ${item.users[0].info.name}!!`
                            } </span>
                        </div>
                    </li>
                )
            })}
        </ul>

    )
}

export default ChatList