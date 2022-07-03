import {
    atom,
} from 'recoil';

export const userState = atom({
    key: 'userState', // unique ID (with respect to other atoms/selectors)
    default: {
            info: {
                gender: "",
                interest: "",
                name: "",
                birthdate: "",
                desc: "",
                imgUrl: ""
            },
            match: [],
            like: [],
            unlike: [],
            _id: "",
            email: "",
    }
  });