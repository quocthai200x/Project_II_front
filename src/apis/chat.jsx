import axios from "../axios";

export function getListChat(){
    return axios.get('/api/chat/list');
}

export function getMessage(chatID, pageIndex, pageSize){
    return axios.get(`/api/chat/message?pageIndex=${pageIndex}&pageSize=${pageSize}&chatId=${chatID}`)
}
export function sendMessage(chatId, matchId, content ){
    return axios.post(`/api/chat/message?chatId=${chatId}&matchId=${matchId}`,{
        content,
    })
}

export function readMessage(chatId){
    return axios.put(`/api/chat/read-message?chatId=${chatId}`)
}