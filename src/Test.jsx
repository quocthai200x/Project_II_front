import React from 'react'
import { VariableSizeList as List } from 'react-window';
import { socketState } from './recoil/socket';
import { useRecoilState } from 'recoil'
import { io } from "socket.io-client"
import { useEffect, useState } from 'react';

function Test() {
    const [socket, setSocket] = useRecoilState(socketState);
    const click = (e) => {
        e.preventDefault();
        console.log("OOK ");
        socket.emit('reply');
    }
    return (
        <div>
            {/* <button onClick={(e) => setSocketFunc(e)}>set me</button> */}

            <button onClick={(e) => click(e)}>Click me</button>
        </div>
    )

}

export default Test