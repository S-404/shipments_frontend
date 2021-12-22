import axios from 'axios';

export default class ShipmentService {
    static async getData({...param}) {
        const response = await axios({
            method: 'GET',
            url: `http://localhost:5002/api/${param.query}`,
            params: {...param},
        })
        return response.data;
    }

    static async addData({...param}) {
        const response = await axios({
            method: 'POST',
            url: `http://localhost:5002/api/${param.query}`,
            params: {...param},
        })
        return response.data;
    }

    static async deleteData({...param}) {
        const response = await axios({
            method: 'DELETE',
            url: `http://localhost:5002/api/${param.query}`,
            params: {...param},
        })
        return response.data;
    }

    static async updateData({...param}) {
        const response = await axios({
            method: 'PUT',
            url: `http://localhost:5002/api/${param.query}`,
            params: {...param},
        })
        return response.data;
    }
}
