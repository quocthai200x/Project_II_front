import { useLocation } from "react-router-dom";
import "./Call.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { userState } from '../../../recoil/user';
import { useRecoilValue } from "recoil";

import {
  collection,
  addDoc,
  setDoc,
  doc,
  onSnapshot,getDoc,updateDoc,getDocs 
} from "firebase/firestore";

const usePathname = () => {
  const location = useLocation();
  return location.pathname;
};
const firebaseConfig = {
  apiKey: "AIzaSyAtiOzvSnzMzYkg3Y6rUDNIzTAXnmxKjKo",
  authDomain: "fir-test-d7b92.firebaseapp.com",
  databaseURL: "https://fir-test-d7b92.firebaseio.com",
  projectId: "fir-test-d7b92",
  storageBucket: "fir-test-d7b92.appspot.com",
  messagingSenderId: "695243701902",
  appId: "1:695243701902:web:3b6ddb3cbc87d45f94d3df",
  measurementId: "G-WZFMHP5HV9",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 3,
};
const pc = new RTCPeerConnection(servers);
let localStream = null;
let remoteStream = null;
let id = null;

const setup = async ()=>{
  localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  remoteStream = new MediaStream();
  // Push tracks from local stream to peer connection
  localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });
  // Pull tracks from remote stream, add to video stream
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };
  console.log(1);
  webcamVideo.srcObject = localStream;
  remoteVideo.srcObject = remoteStream;
}
// setup()
const call = async () => {
  let user = window.location.search;
  const callId = window.location.pathname.slice(6,window.location.pathname.length);
  const callDoc = doc(db, 'calls',callId);
  const offerCandidates = collection(callDoc, "offerCandidates"); // callDoc.collection('offerCandidates');
  const answerCandidates = collection(callDoc, "answerCandidates"); // callDoc.collection('answerCandidates');
  console.log(callDoc,offerCandidates,answerCandidates);
  console.log(callDoc.id);

  pc.onicecandidate = async (event) => {
    if(event.candidate){
      console.log(event.candidate.toJSON());
        await addDoc(offerCandidates,event.candidate.toJSON())
    }
  }

  const offerDescription = await pc.createOffer();
  await pc.setLocalDescription(offerDescription);

  const offer = {
    sdp: offerDescription.sdp,
    type: offerDescription.type,
    // uid:uid
  };

   await setDoc(callDoc,{offer:offer,uid:user.slice(3, user.length)});
  onSnapshot(callDoc, (doc) => {
    let data = doc.data();
    if (!pc.currentRemoteDescription && data?.answer) {
      const answerDescription = new RTCSessionDescription(data.answer);
      pc.setRemoteDescription(answerDescription);
    }
  });
  console.log(2);
  onSnapshot(answerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
};

const answerCall = async () => {
  const callId = window.location.pathname.slice(6,window.location.pathname.length);
  const callDoc = doc(db, 'calls',callId);
  const offerCandidates = collection(callDoc, "offerCandidates");
  const answerCandidates = collection(callDoc, "answerCandidates");

  pc.onicecandidate = async (event) => {
    if (event.candidate) {
      await addDoc(answerCandidates, event.candidate.toJSON());
    }
  };

  const callData = (await getDoc(callDoc)).data();
  console.log(callData);
  const offerDescription = callData.offer;
  await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));

  const answerDescription = await pc.createAnswer();
  await pc.setLocalDescription(answerDescription);

  const answer = {
    type: answerDescription.type,
    sdp: answerDescription.sdp,
    
  };

  await updateDoc(callDoc,{answer:answer,uid: window.location.search.slice(3,window.location.search.length)});

  onSnapshot(offerCandidates, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("added");
        console.log(change.doc.data());
        const candidate = new RTCIceCandidate(change.doc.data());
        pc.addIceCandidate(candidate);
      }
    });
  });
};
const Call = (props) => {
  const currentUser = useRecoilValue(userState);
  // console.log(currentUser);
  id = usePathname().slice(6, usePathname().length);
  let user = window.location.search;
  let someoneiscalling = false
  // nnếu uid ở param khác với hiên tại tức là from 
  console.log(user.slice(3, user.length));
  // console.log(id);
  const webcamVideo = useRef(null);
  const remoteVideo = useRef(null);

  useEffect(() => {
    setup().then(()=>{
      if(currentUser._id == user.slice(3, user.length)){
        call()
      }else{
        answerCall()
      }
    })

    // setup(id, user.slice(3, user.length));
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        {/* <h2>1. Start your Webcam</h2> */}
        <div className="videos">
          <span>
            {/* <h3>You</h3> */}
            <video
              ref={webcamVideo}
              id="webcamVideo"
              autoPlay
              playsInline
            ></video>
          </span>
          <span>
            {/* <h3>Your friend</h3> */}
            <video ref={remoteVideo} id="remoteVideo" autoPlay playsInline></video>
          </span>
        </div>

        {/* <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' id="webcamButton">Start webcam</button> */}
        {/* <h2>Answer Call</h2> */}
        <button style={{display:'none'}}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          id="callButton"
          onClick={answerCall}
        >
          Answer Call
        </button>

        {/* <h2>3. Join a Call</h2> */}
        {/* <p>Answer the call from a different browser window or device</p> */}

        <input style={{display:'none'}}
          className="
         
        w-half
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="callInput"
        />
        <button style={{display:'none'}}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          id="answerButton"
          onClick={call}
        >
          Call
        </button>

        {/* <h2>4. Hangup</h2>

        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          id="hangupButton"
          disabled
        >
          Hangup
        </button> */}
      </div>
    </>
  );
};
export default Call;
