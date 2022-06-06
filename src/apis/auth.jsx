import axios from "../axios";

export function signUp({email,password,name,birthdate,gender,interest, imgUrl, desc}){
    return axios.post("/api/auth/sign-up",{
       email, password,name, birthdate, gender, interest,imgUrl,desc
    })
}

export function signIn({email, password}){
    return axios.post("/api/auth/sign-in",{
        email, password
    })
}

export function checkUser(){
    return axios.get("/api/auth/check-user");
}