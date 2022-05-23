import React from 'react'

function Conservations({ conversation }) {
    const user = "1";

    return (
        <ul className='h-[80%] flex flex-col-reverse scrollbar  overflow-scroll overflow-x-hidden'>
            {conversation.map((comment, index) => {
                if (comment.owner == user) {
                    return (
                        <li key={'comment-' + index} className='mx-4 my-1 flex justify-end '>
                            <div className="max-w-[45%]">
                            <p className='break-all p-2 rounded-xl border-2 border-sky-400 bg-sky-400 text-zinc-50'>
                                {comment.content}
                            </p>
                                </div>
                         
                        </li>
                    )
                } else {
                    return (
                        <li key={'comment-' + index} className='mx-4 my-1 flex justify-start '>
                             <div className="max-w-[45%]">

                            <p className='break-all p-2 rounded-xl border-2 border-sky-300'>
                                {comment.content}
                            </p>
                             </div>
                        </li>
                    )
                }
            })}
        </ul>

    )
}

export default Conservations