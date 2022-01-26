import axios from 'axios';

const loginPath = 'http://localhost:5002/login/'

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
