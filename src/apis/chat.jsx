import axios from "../axios";

export function getListChat(){
    return axios.get('/api/chat/list');
}

export function getMessage(chatID, pageIndex, pageSize){
    return axios.get(`/api/chat/message?pageIndex=${pageIndex}&pageSize=${pageSize}&chatId=${chatID}`)
}