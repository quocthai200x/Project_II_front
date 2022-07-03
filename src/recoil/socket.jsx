import {
    atom,
} from 'recoil';
import { io } from "socket.io-client";
import config from "../config";


export const socketState = atom({
    key: 'socketState', // unique ID (with respect to other atoms/selectors)
    default:io(config.rootPath, {   transports: ["websocket", "polling"] }),
    dangerouslyAllowMutability: true,
  });