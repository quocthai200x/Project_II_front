import React, { useCallback, useMemo, useRef } from "react";
import { VariableSizeList as List } from "react-window";

import { useWindowResize } from "../../../hooks/useWindowResize";
import { useRecoilState } from 'recoil'
import { userState } from '../../../recoil/user.jsx'


const height = window.innerHeight;

const Row = ({ data, index, setSize, windowWidth }) => {

  const rowRef = useRef();
  const [user, setUser] = useRecoilState(userState)

  React.useEffect(() => {
    setSize(index, rowRef.current.getBoundingClientRect().height);
  }, [setSize, index, windowWidth]);

  if (data[index].owner == user._id) {
    return (
      <li ref={rowRef} key={'comment-' + index} className='mx-4 my-1 flex justify-end '>
        <div className="max-w-[45%]">
          <p className='break-all p-2 rounded-xl border-2 border-sky-400 bg-sky-400 text-zinc-50'>
            {data[index].content}
          </p>
        </div>

      </li>
    )
  } else {
    return (
      <li ref={rowRef} key={'comment-' + index} className='mx-4 my-1 flex justify-start '>
        <div className="max-w-[45%]">

          <p className='break-all p-2 rounded-xl border-2 border-sky-300'>
            {data[index].content}
          </p>
        </div>
      </li>
    )
  }
}

const NoConversationRenderer = () =>{
  return (
    <div className="flex">
        <p>Now is your time to have some words for this partner</p>
    </div>
  )
}

export default function Conversation({conversation}) {

  const listRef = useRef();
 
  const sizeMap = useRef({});
  const setSize = useCallback((index, size) => {
    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = index => sizeMap.current[index] || 50;
  const [windowWidth] = useWindowResize();

  return (
    conversation?
    <List
      
      ref={listRef}
      height={height}
      width="100%"
      itemCount={conversation.length}
      itemSize={getSize}
      itemData={conversation}
      className='flex flex-col-reverse'
    >
      {({ data, index, style }) => (
        <div style={style}>
          <Row
            data={data}
            index={index}
            setSize={setSize}
            windowWidth={windowWidth}
          />
        </div>
      )}
    </List>:<NoConversationRenderer />
  );
}

