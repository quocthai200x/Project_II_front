import axios from "../axios";

export function uploadImage({base64URL}){
    return  axios.post("/api/upload-image", {
        source:base64URL,
    })
}