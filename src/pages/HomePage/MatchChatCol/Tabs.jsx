import React from 'react'

function Tabs({isChat, onSwitchTab}) {
  return (
    <div className=" flex flex-row justify-around mb-4" >
      <span className={(isChat ? 'bg-gradient-to-r from-cyan-300 to-blue-500 text-zinc-200' : 'bg-zinc-200 hover:bg-zinc-300')
        + " px-10 py-2 rounded-xl font-bold cursor-pointer  transition duration-300 ease-out"}
        onClick={() => onSwitchTab(true)}>Chat</span>
      <span className={(!isChat ? 'bg-gradient-to-r from-cyan-300 to-blue-500 text-zinc-200' : 'bg-zinc-200 hover:bg-zinc-300')
        + " px-10 py-2 rounded-xl font-bold cursor-pointer transition duration-300 ease-out"}
        onClick={() => onSwitchTab(false)}>Match</span>
    </div>
  )
}

export default Tabs