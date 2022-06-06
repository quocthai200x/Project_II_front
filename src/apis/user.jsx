import axios from "../axios";


export function getCards(pageIndex = 1, pageSize = 10){
    return axios.get(`/api/cards?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}

export function likeAndUnlike(status, _id){
    return axios.post('/api/like-unlike',{
        status,
        _id,
    })
}

export function getMatches(pageIndex, pageSize = 10){
    return axios.get(`/api/match?pageIndex=${pageIndex}&pageSize=${pageSize}`)
}