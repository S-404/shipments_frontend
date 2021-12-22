import axios from 'axios';

export default class ShipmentService {
    static async getData({...param}) {
        const response = await axios({
            method:'GET',
            url: `http://localhost:5002/api/${param.query}`,
            params: {...param},
        })
        return response.data;
    }

}
