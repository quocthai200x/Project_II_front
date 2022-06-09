import React, { Fragment, useCallback, useMemo, useRef } from "react";
import { VariableSizeList as List } from "react-window-reversed";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { useWindowResize } from "../../../hooks/useWindowResize";
import { useRecoilState } from 'recoil'
import { userState } from '../../../recoil/user.jsx'

// const height = window.innerHeight;

const Row = ({ data, index, setSize, windowWidth }) => {

  const rowRef = useRef();
  const [user, setUser] = useRecoilState(userState)

  React.useEffect(() => {
    setSize(index, rowRef.current.getBoundingClientRect().height);
  }, [setSize, index, windowWidth]);

  if (data[index].owner == user._id) {
    return (
      <div ref={rowRef} className="pb-1">
        <div key={'comment-' + index} className='mx-2 flex justify-end '>
          <div className="max-w-[45%]">
            <p className='break-all p-2 rounded-xl border-2 border-sky-400 bg-sky-400 text-zinc-50'>
              {data[index].content}
            </p>
          </div>

        </div>
      </div>

    )
  } else {
    return (
      <div ref={rowRef} className="pb-1">
        <div key={'comment-' + index} className='mx-2 flex justify-start '>
          <div className="max-w-[45%]">

            <p className='break-all p-2 rounded-xl border-2 border-sky-300'>
              {data[index].content}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

const mergeRefs = (...refs) => (incomingRef) =>
  refs.forEach((ref) => {
    if (typeof ref === "function") {
      ref(incomingRef);
    } else {
      // eslint-disable-next-line no-param-reassign
      ref.current = incomingRef;
    }
  });





export default function Conversation({ conversation, loadMore }) {
  const listRef = useRef();

  const sizeMap = useRef({});
  const setSize = useCallback((index, size) => {

    sizeMap.current = { ...sizeMap.current, [index]: size };
    listRef.current.resetAfterIndex(index);
  }, []);
  const getSize = index => sizeMap.current[index] || 50;
  const [windowWidth] = useWindowResize();



  return (
      <div className="w-full h-screen">
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={(index) => index < conversation.length}
              itemCount={conversation.length + 1}
              loadMoreItems={loadMore}
              threshold={2}
             
            >
              {({ onItemsRendered, ref }) => {
                return (
                  <List
                    onItemsRendered={onItemsRendered}
                    reversed={true}

                    ref={mergeRefs(ref, listRef)}

                    height={height}
                    width={width}
                    itemCount={conversation.length}
                    itemSize={getSize}
                    itemData={conversation}
                  >
                    {({ data, index, style }) => {


                      return (
                        <div style={style}>
                          <Row
                            data={data}
                            index={index}
                            setSize={setSize}
                            windowWidth={windowWidth}
                          />
                        </div>
                      )
                    }}
                  </List>
                )
              }}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
  );
}

