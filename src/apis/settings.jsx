import axios from "../axios";

export function updateProfile(name, gender, interest, birthdate, desc, imgUrl){
    return axios.put('/api/update-profile',{
        name,
        gender,
        interest,
        birthdate,
        desc,
        imgUrl
    })
}