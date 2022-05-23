import React from 'react'

function ChatList({ listChat, onClickChatItem }) {

    return (

        <ul className=' scrollbar  overflow-scroll overflow-x-hidden'>
            {listChat.map((item, index) => {
                return (
                    <li onClick={() => onClickChatItem(item)} key={"chat-list-" + index} className='flex flex-row m-4'>
                        <img loading='lazy' className='w-14 h-14 rounded-full' src='https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg' />
                        <div className="flex flex-col ml-4">
                            <span className='font-bold'>Name of something</span>
                            <span className='text-xs text-zinc-500' >You: haha that is a duck avatar</span>
                        </div>
                    </li>
                )
            })}
        </ul>

    )
}

export default ChatList