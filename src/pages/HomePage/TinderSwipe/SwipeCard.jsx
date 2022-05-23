
import React, { useState, useRef, useMemo, useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import ImageSwipe from '../../../assets/img/anh_mau_swipe_card.jpg'
import DenyFaceSVG from '../../../assets/svg/deny.jsx';
import LoveFaceSVG from "../../../assets/svg/love.jsx"




function SwipeCard() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [db, setDB] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)
    const [canSwipe, setCanSwipe] = useState(false);
    const [childRefs, setChildRefs] = useState([]);

    useEffect(() => {
        getMoreMatchOption()

    }, [])

    const getMoreMatchOption = () => {
        let array = [{
            name: 'Thái',
            url: ImageSwipe,
            age: 20,
            desc:"Project 2 go go :>>> ",
        },
        {
            name: 'Thắng',
            url: "https://lp-cms-production.imgix.net/2020-10/shutterstockRF_433429591.jpg",
            age: 20,
            desc:"Project 2 go go :>>> ",


        },
        {
            name: 'Pate',
            desc:"Project 2 go go :>>> ",
            url: ImageSwipe,
            age: 20
        },
        {
            name: 'Victor',
            desc:"Project 2 go go :>>> ",

            url: ImageSwipe,
            age: 20
        },
        {
            name: 'Nguyễn Xuân Quốc Thái',
            desc:"Project 2 go go :>>> Project 2 go go :>>>Project 2 go go :>>>Project 2 go go :>>>Project 2 go go :>>>Project 2 go go :>>>Project 2 go go :>>>  ",
            url: ImageSwipe,
            age: 20
        }]
        setDB(prev => [...array, ...prev])
        setCanSwipe(currentIndex < db.length+ array.length - 1);
        let childRefsArray = () => {
            return (
                Array(db.length + array.length)
                    .fill(0)
                    .map((i) => React.createRef())
            )
        }
        setChildRefs(childRefsArray);
    }



    const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
    }





    // set last direction and decrease current index
    const swiped = (direction, item, index) => {
        console.log(direction, item);
        setLastDirection(direction)
        updateCurrentIndex(index + 1)

    }

    useEffect(() => {
        if (db.length - 3 == currentIndex) {
            getMoreMatchOption()
        }
    }, [currentIndex])


    const swipe = async (dir) => {
        
        if (canSwipe && currentIndex < db.length - 1) {
            await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
    }

    // increase current index and show card

    return (
        <div className='w-full h-screen flex flex-col  items-center'>
            <div className='cardContainer  m-4  h-[85%]  w-[65%] relative'>
                {db.map((character, index) =>
                    <TinderCard className=' rounded-3xl h-full swipe absolute cursor-pointer bg-zinc-50 z-10'
                        ref={childRefs[db.length - index - 1]}
                        key={'swipe-card' + (db.length - index - 1)}
                        preventSwipe={['up', 'down']}
                        swipeThreshold={50}
                      
                        onSwipe={(dir) => swiped(dir, character.name, db.length - index - 1)}
                    // onCardLeftScreen={() => outOfFrame(character.name, index)}
                    >
                    

                            <img loading='lazy' className='rounded-3xl bg-cover w-full  h-full' src={character.url} />
                            <div className='w-full flex items-start justify-end absolute bottom-0   bg-gradient-to-t from-black '>
                                <div className="p-4 pb-10 w-full text-white flex flex-col  relative mb-20">
                                    <p>
                                    <span className='text-3xl font-extrabold mr-4' >{character.name}</span>
                                    <span className='text-xl font-semibold'>{character.age}</span>
                                    </p>
                                    <span className='text-md font-normal' >{character.desc}</span>
                                </div>
                            </div>
                        
                    </TinderCard>
                )}
                <div className='absolute flex flex-col justify-center items-center h-full w-full border-2  z-0'>
                    <img src="https://i.pinimg.com/originals/60/fb/1f/60fb1f9ec36ef7e8972d27661c15e2a9.gif" alt="Hiển thị không có gì" />
                    <p className='text-sm text-center'>Ouch, there's no more person for you </p>
                    <p className='text-xl text-bold text-center' >Please go outside and have a meet</p>
                </div>

            </div>
            {currentIndex < db.length - 1 ? <div className="flex justify-center w-1/2 -mt-24">
                <div onClick={() => swipe('left')} className='mx-4 w-16 h-16 z-10 '>
                    <DenyFaceSVG className={'hover:scale-125 cursor-pointer hover:-rotate-12 transition duration-200 ease-in-out'}/>
                </div>
                <div onClick={() => swipe('right')} className='mx-4 w-16 h-16 z-10'>
                    <LoveFaceSVG className={'hover:scale-125 cursor-pointer hover:rotate-12 transition duration-200 ease-in-out'}/>
                </div>
            </div>

                : <></>
            }


            {/* {lastDirection ?
                <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />} */}
        </div>
    )
}

export default SwipeCard