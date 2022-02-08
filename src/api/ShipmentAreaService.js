import Fetching from "./Fetching";

export default class ShipmentAreaService {

    static async getGatesPlaces(){
        return await Fetching.queryData(
            {},
            'api/places/list',
            'GET'
        )
    }

    static async addGate(param){
        return await Fetching.queryData(
            param,
            'api/gates/gate',
            'POST'
        )
    }

    static async updGate(param){
        return await Fetching.queryData(
            param,
            'api/gates/gate',
            'PUT'
        )
    }

    static async removeGate(param){
        return await Fetching.queryData(
            param,
            'api/gates/gate',
            'DELETE'
        )
    }

    static async addPlace(param){
        return await Fetching.queryData(
            param,
            'api/places/place',
            'POST'
        )
    }

    static async updPlace(param){
        return await Fetching.queryData(
            param,
            'api/places/place',
            'PUT'
        )
    }

    static async removePlace(param){
        return await Fetching.queryData(
            param,
            'api/places/place',
            'DELETE'
        )
    }

    static async updPlaceLoadingStatus(param){
        return await Fetching.queryData(
            param,
            'api/places/status',
            'PUT'
        )
    }

    static async updPlaceAssignedTruck(param){
        return await Fetching.queryData(
            param,
            'api/places/truck',
            'PUT'
        )
    }

    static async updPlaceLoadingTime(param){
        return await Fetching.queryData(
            param,
            'api/places/loadingtime',
            'PUT'
        )
    }



}
