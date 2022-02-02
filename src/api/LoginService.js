import axios from 'axios';

const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS
const loginPath = `${backendAddress}/login/`

export default class LoginService {

    static async queryData({...param},query,method){
        const response = await axios({
            method: method,
            url: `${loginPath}${query}`,
            params: {...param},
        })
        return response.data;
    }
    
}
