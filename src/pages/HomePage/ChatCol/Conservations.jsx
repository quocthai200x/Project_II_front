import React, { PureComponent } from "react";
import { VariableSizeList as List } from "react-window";
import { useRef, useEffect, useState } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import {faker} from '@faker-js/faker'

var data = new Array(100).fill(true).map(()=>{
    return{
        owner: "6294df26ef467d56646e3328",
        content: faker.lorem.sentence(),
    }
})
// console.log(data);
var style={
    backgroundColor:"red"
}

function Row({ index,isScrolling, style }){
    var ref = useRef(null)
    useEffect(()=>{
        // console.log(ref.current.clientHeight);
    })
    
  if (data[index].owner == "6294df26ef467d56646e3328") {
    return (
      <div
        key={"comment-" + index}
        style={style}
        className="mx-4 my-1 flex justify-end "
        ref={ref}
      >
        <div className="max-w-[45%]" >
          <p className="break-all p-2 rounded-xl border-2 border-sky-400 bg-sky-400 text-zinc-50">
            {isScrolling ? 'Loading' : data[index].content}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={"comment-" + index}
        style={style}
        className="mx-4 my-1 flex justify-start "
      >
        <div className="max-w-[45%]">
          <p className="break-all p-2 rounded-xl border-2 border-sky-300">
            {isScrolling ? 'Loading' : data[index].content}
          </p>
        </div>
      </div>
    );
  }
};
var getItemSize = (index) => {
//   console.log(index);
  return 60;
};

function Conservations({ conversation }) {


  return (
      
    // <ul className='h-[80%] flex flex-col-reverse scrollbar  overflow-scroll overflow-x-hidden'>
    //     {conversation.map((comment, index) => {
    //         if (comment.owner == user) {
    //             return (
    //                 <li key={'comment-' + index} className='mx-4 my-1 flex justify-end '>
    //                     <div className="max-w-[45%]">
    //                     <p className='break-all p-2 rounded-xl border-2 border-sky-400 bg-sky-400 text-zinc-50'>
    //                         {comment.content}
    //                     </p>
    //                         </div>

    //                 </li>
    //             )
    //         } else {
    //             return (
    //                 <li key={'comment-' + index} className='mx-4 my-1 flex justify-start '>
    //                      <div className="max-w-[45%]">

    //                     <p className='break-all p-2 rounded-xl border-2 border-sky-300'>
    //                         {comment.content}
    //                     </p>
    //                      </div>
    //                 </li>
    //             )
    //         }
    //     })}
    // </ul>
    <div id="test" style={{ width: "100%", height: "100%" }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={data.length}
            itemSize={getItemSize}
            // estimatedItemSize={50}
            useIsScrolling
            style={{
                backgroundColor:"gray",  
                // height:"auto"
                }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
}

export default Conservations;
