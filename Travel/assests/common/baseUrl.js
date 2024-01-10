import { Platform } from "react-native";

let baseURL = '';

{
  Platform.OS == 'android'
    ? (baseURL = 'http://192.168.189.76:3000/api/v1/')
    : (baseURL = 'http://localhost:3000/api/v1/');


  // baseURL = 'http://10.0.2.2:3000/api/v1/';
  // baseURL = 'http://10.0.2.2:3000/api/v1/';
  // baseURL = 'http://10.0.2.2:3000/api/v1/';
  // baseURL = 'http://10.0.2.2:3000/api/v1/';
}
 
export default baseURL;

// import { Platform } from "react-native";

// let baseURL = '';

// if (Platform.OS === 'android') {
//     if (Platform.OS === 'android') {
//       baseURL = 'http://192.168.13.98:3000/api/v1/';
//       baseURL = 'http://192.168.115.76:3000/api/v1/';
//     } else {
//       baseURL = 'http://10.0.2.2:3000/api/v1/';
//     }
// } else {
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
