import Fetching from "./Fetching";

export default class OrdersService {

    static async addOrder(param){
        return await Fetching.queryData(
            param,
            'api/orders/order',
            'POST'
        )
    }

    static async removeOrder(param){
        return await Fetching.queryData(
            param,
            'api/orders/order',
            'DELETE'
        )
    }

    static async removeOrders(param){
        return await Fetching.queryData(
            param,
            'api/orders/place',
            'DELETE'
        )
    }


    static async updOrderLoadingStatus(param){
        return await Fetching.queryData(
            param,
            'api/orders/order/loading-status',
            'PUT'
        )
    }

    static async getOrdersList(){
        return await Fetching.queryData(
            {},
            'api/orders/list',
            'GET'
        )
    }

    static async getOrder(param){
        return await Fetching.queryData(
            param,
            'api/orders/order',
            'GET'
        )
    }

    static async getOrdersHistory(param){
        return await Fetching.queryData(
            param,
            'api/orders/log',
            'GET'
        )
    }

    static async updOrderStatus(param){
        return await Fetching.queryData(
            param,
            'api/orders/order/picked-status',
            'PUT'
        )
    }


}
