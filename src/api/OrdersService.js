import Fetching from "./Fetching";

export default class OrdersService {

    static async addOrder(param){
        return await Fetching.queryData(
            param,
            'api/orders/order',
            'POST'
        )
    }

    static async deferOrder(param){
        return await Fetching.queryData(
            param,
            'api/orders/defer',
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

    static async getDeferredOrderList(){
        return await Fetching.queryData(
            {},
            'api/orders/defer',
            'GET'
        )
    }

    static async getOrderLocation(param, criteria){
        return await Fetching.queryData(
            param,
            `api/orders/location/${criteria}`,
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

    static async updOrderPosition(param){
        return await Fetching.queryData(
            param,
            'api/orders/order/position',
            'PUT'
        )
    }



}
