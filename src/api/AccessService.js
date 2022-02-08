import Fetching from "./Fetching";

export default class AccessService {

    static async getUsersList(){
        return await Fetching.queryData(
            {},
            'login/users',
            'GET'
        )
    }

    static async addUser(param){
        return await Fetching.queryData(
            param,
            'login/user',
            'POST'
        )
    }

    static async removeUser(param){
        return await Fetching.queryData(
            param,
            'login/user',
            'DELETE'
        )
    }

    static async updPassword(param){
        return await Fetching.queryData(
            param,
            'login/user/password',
            'PUT'
        )
    }

    static async checkPassword(param){
        return await Fetching.queryData(
            param,
            'login/user/checkpassword',
            'GET'
        )
    }

    static async updAccess(param){
        return await Fetching.queryData(
            param,
            'login/user/access',
            'PUT'
        )
    }
    
}
