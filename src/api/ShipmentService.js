import axios from 'axios';

const backendAddress = process.env.REACT_APP_BACKEND_ADDRESS;
const apiPath = `${backendAddress}/api/`;

export default class ShipmentService {

    static async queryData({...param},query,method){
        const response = await axios({
            method,
            url: `${apiPath}${query}`,
            params: {...param},
        })
        return response.data;
    }

}
