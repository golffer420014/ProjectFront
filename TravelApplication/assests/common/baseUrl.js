import { Platform } from "react-native";

let baseURL = '';

{
  Platform.OS == 'android'
<<<<<<< Updated upstream
    ? (baseURL = 'http://192.168.207.76:3000/api/v1/')
    // ? (baseURL = 'http://192.168.34.76:3000/api/v1/')
=======
    ? (baseURL = 'http://192.168.224.98:3000/api/v1/')
>>>>>>> Stashed changes
    : (baseURL = 'http://localhost:3000/api/v1/');

  // baseURL = 'http://192.168.189.76:3000/api/v1/';
  // baseURL = 'http://10.0.2.2:3000/api/v1/';
  // baseURL = 'http://10.0.2.2:3000/api/v1/';
  // baseURL = 'http://10.0.2.2:3000/api/v1/';
}
 
export default baseURL;

<<<<<<< Updated upstream
// import { Platform } from "react-native";

// let baseURL = '';

// if (Platform.OS === 'android') {
//     if (Platform.OS === 'android') {
//       baseURL = 'http://192.168.13.98:3000/api/v1/';
//       baseURL = 'http://192.168.115.76:3000/api/v1/';
//     } else {
//       baseURL = 'http://10.0.2.2:3000/api/v1/';
//     }
// } else {rr
//     baseURL = 'http://localhost:3000/api/v1/';
// }

// export default baseURL;

// import {Platform} from 'react-native';

// let baseURL = '';

//   if (Platform.OS === 'android') {
//     baseURL = 'http://192.168.13.98:3000/api/v1/';
//     baseURL = 'http://192.168.115.76:3000/api/v1/';
//     baseURL = 'http://10.0.2.2:3000/api/v1/';
//     baseURL = 'http://localhost:3000/api/v1/';
//   }

// export default baseURL;
=======
>>>>>>> Stashed changes
