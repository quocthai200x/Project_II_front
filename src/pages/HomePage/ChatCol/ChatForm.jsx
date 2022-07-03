import React, { useState } from 'react'
import { ListEmojis } from '../../../constant/iconList'


function ChatForm({ onChatChange, chatInput, onClickEmoji, submitChat, onReadMessage }) {
    const [isEmojiListVisible, setIsEmojiListVisible] = useState(false);

 
    return (
        <form className=" bottom-2 h-16 w-full  flex items-center p-4  border-t-2 border-zinc-100">
            <input 
                onFocus={()=>{
                    setIsEmojiListVisible(false)
                    onReadMessage()
                }}
                onKeyDown={(ele) => {
                if(ele.key==="Enter"){
                    submitChat()
                }
                }} 
            value={chatInput} onChange={(e) => onChatChange(e.target.value)} placeholder='Type something here...' className='outline-none w-4/5 h-6 text-md focus:border-zinc-400 border-2 rounded-md py-4 px-2' type="text" name="" id="" />
            <div className='leading-4 relative ml-4'>
                <span onClick={() => setIsEmojiListVisible(!isEmojiListVisible)} className='cursor-pointer hover:bg-zinc-200 p-1 rounded-md'>
                    😀
                </span>
                {
                    isEmojiListVisible ?
                        <ul className='transition duration-150 grid grid-cols-6 p-2 absolute right-0 bottom-10 w-80 h-50 border-2  bg-zinc-100 border-zinc-300 rounded-xl'>
                            {ListEmojis.map((emoji, index) => {
                                return (
                                    <li onClick={() => onChatChange(chatInput + emoji)} className='select-none text-center text-xl cursor-pointer transition duration-200 ease-in-out rounded-md hover:bg-zinc-200' key={"emoji-" + index}>{emoji}</li>
                                )
                            })}
                        </ul>
                        : <></>
                }

                {/* {renderEmojiList} */}
            </div>
            <button onClick={(e) => { e.preventDefault(); setIsEmojiListVisible(false);submitChat() }} className='leading-4 ml-4 hover:bg-zinc-200 p-1 rounded-md'>💘</button>
        </form>
    )
}

export default ChatForm