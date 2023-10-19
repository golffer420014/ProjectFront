import { Platform } from "react-native";

let baseURL = '';

{Platform.OS == 'android'
    ? baseURL = 'http://10.0.2.2:5000/api/v1/' || 'http://10.0.2.2:5000/public/uploads/'
    : baseURL = 'http://localhost:5000/api/v1/' || 'http://localhost:5000/public/uploads/'
}

export default baseURL;