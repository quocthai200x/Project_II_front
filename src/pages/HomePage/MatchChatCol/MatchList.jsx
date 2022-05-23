import React from 'react'

function MatchList({ listMatch, onClickMatchItem }) {

    return (

        <ul className='grid grid-cols-3 scrollbar overflow-scroll overflow-x-hidden'>
            {listMatch.map((item, index) => {
                return (
                    <li onClick={() => onClickMatchItem(item)} key={'match-list-' + index} className="m-2 relative hover:scale-105 cursor-pointer transition hover:opacity-80" >
                        <span className='absolute bottom-2 left-2 text-xs font-black text-zinc-200'>Your name </span>
                        <img loading='lazy' className='bg-cover rounded-xl aspect-[4/5] ' src="https://images.pexels.com/photos/1147124/pexels-photo-1147124.jpeg" alt="" />
                    </li>
                )
            })}

        </ul>

    )
}

export default MatchList