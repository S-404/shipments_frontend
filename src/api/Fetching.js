import axios from 'axios';

const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS

export default class Fetching {

    static async queryData({...param},querypath,method){
       //  console.log(querypath,{...param}, method)
        const response = await axios({
            method: method,
            url: `${backendAddress}/${querypath}`,
            params: {...param},
        })
        return response.data;
    }
}
