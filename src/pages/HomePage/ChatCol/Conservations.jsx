import React from 'react'
import { VariableSizeList as List } from 'react-window';


let data = [
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },
    {
        "type": "text",
        "_id": "6295e25f2e3624548c654510",
        "owner": "6294df26ef467d56646e3328",
        "content": "Bạn ổn đấy",
        "createdAt": "2022-05-31T09:39:43.907Z"
    },

]


function Conservations({ conversation }) {

    const getItemSize = (index) => {
       
        return data[index]
    }


    const Row = ({ index, style }) => {
        if (data[index].owner == "6294df26ef467d56646e3328") {
            return (
                <div className="" style={style}>
                    <div key={'comment-' + index} className='mx-4 my-1 flex justify-end '>
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
                <div className="" style={style}>

                    <div key={'comment-' + index} style={style} className='mx-4 my-1 flex justify-start '>
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
    console.log("fsdfhsjdf");
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
        <List
            height={400}
            itemCount={data.length}
            itemSize={getItemSize}
            width={300}
            className='flex flex-col-reverse'

        >
            {Row}
        </List>
    )
}

export default Conservations