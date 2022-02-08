import React, {useEffect, useState} from 'react';
import {useFetching} from "../../../../hooks/useFetching";
import MyModal from "../../../../components/UI/modal/myModal";
import AddGate from "./AddGate";
import AddPlace from "./AddPlace";
import EditPlace from "./EditPlace";
import EditGate from "./EditGate";
import Gates from "./Gates";
import "../adminShippingAreaPage.scss"
import ShipmentAreaService from "../../../../api/ShipmentAreaService";

const ShippingArea = () => {
    const [gates, setGates] = useState([]);
    const [gatesPlaces, setGatesPlaces] = useState([]);
    const [fetchGatesPlacesList] = useFetching(async () => {
        const responseData = await ShipmentAreaService.getGatesPlaces({}, 'places/list', 'GET');
        setGatesPlaces(responseData);
    });
    const [modalForms, setModalForms] = useState({
        newGate: false, newPlace: false, placeForm: false, gateForm: false,
    })


    const [selectedPlace, setSelectedPlace] = useState({
        PLACE_ID: 0, PLACE: '00', GATE: '00',
    });
    const [selectedGate, setSelectedGate] = useState({
        GATE_ID: 0, GATE: '00',
    });

    useEffect(async () => await fetchGatesPlacesList(), [])
    useEffect(() => {
        let gates = gatesPlaces.reduce(function (arr, place) {
            if (!arr.filter((row) => row.GATE_ID === place.GATE_ID).length) {
                arr.push({GATE: place.GATE, GATE_ID: place.GATE_ID});
            }
            return arr;
        }, []);
        setGates(gates);
    }, [gatesPlaces])

    const createGate = async (newGateName) => {
        const responseData = await ShipmentAreaService.addGate({
            GATE: newGateName,
        });
        let id = responseData[0].ID;
        if (id) {
            setGates([...gates, {...responseData[0], GATE_ID: id}])
        }
    }

    const updateGate = async (gateObj) => {
        const responseData = await ShipmentAreaService.updGate({
            ...gateObj
        });
        let id = responseData[0].ID;
        if (id) {
            let newGateObj = Object.assign(gates);
            let updRowIndex = newGateObj.findIndex(gate => gate.GATE_ID === id);
            newGateObj[updRowIndex] = {...responseData[0], GATE_ID: id};
            setGates([...newGateObj]);
        }
    }

    const deleteGate = async (gateID) => {
        const responseData = await ShipmentAreaService.removeGate({
            ID: gateID,
        });
        let id = responseData[0].ID;
        if (id) {
            let newGatesObj = [...gates.filter(gate => gate.GATE_ID !== id),]
            setGates(newGatesObj)
        }
    }

    const createPlace = async (newPlaceName) => {
        const responseData = await ShipmentAreaService.addPlace({
            PLACE: newPlaceName, GATE_ID: selectedGate.GATE_ID
        });
        let id = responseData[0].ID;
        if (id) {
            setGatesPlaces([...gatesPlaces, {...responseData[0]}])
        }
    }

    const updatePlace = async (placeObj) => {
        const responseData = await ShipmentAreaService.updPlace({
            ...placeObj
        });
        let id = responseData[0].ID;
        if (id) {
            let newPlaceObj = Object.assign(gatesPlaces);
            let updRowIndex = newPlaceObj.findIndex(place => place.ID === id);
            newPlaceObj[updRowIndex] = {...newPlaceObj[updRowIndex], PLACE: responseData[0].PLACE};
            setGatesPlaces([...newPlaceObj]);
        }
    }

    const deletePlace = async (placeID) => {
        const responseData = await ShipmentAreaService.removePlace( {
            ID: placeID,
        });
        let id = responseData[0].ID;
        if (id) {
            setGatesPlaces([...gatesPlaces.filter(place => place.ID !== id)])
        }
    }

    const setVisible = (key, value) => {
        setModalForms({...modalForms, [key]: value})
    }

    return (
        <div className='manage-shipping-area-container__shipping-area-manager'>
            <MyModal visible={modalForms.newGate} setVisible={() => setVisible('newGate', false)}>
                <AddGate
                    createGate={createGate}
                    setVisible={() => setVisible('newGate', false)}
                />
            </MyModal>
            <MyModal visible={modalForms.newPlace} setVisible={() => setVisible('newPlace', false)}>
                <AddPlace
                    createPlace={createPlace}
                    setVisible={() => setVisible('newPlace', false)}
                />
            </MyModal>
            <MyModal visible={modalForms.placeForm} setVisible={() => setVisible('placeForm', false)}>
                <EditPlace
                    selectedPlace={selectedPlace}
                    setSelectedPlace={setSelectedPlace}
                    updatePlace={updatePlace}
                    deletePlace={deletePlace}
                />
            </MyModal>
            <MyModal visible={modalForms.gateForm} setVisible={() => setVisible('gateForm', false)}>
                <EditGate
                    selectedGate={selectedGate}
                    setSelectedGate={setSelectedGate}
                    updateGate={updateGate}
                    deleteGate={deleteGate}
                />
            </MyModal>
            <div className='shipping-area-manager__shipping-area'>
                <Gates
                    gates={gates}
                    setSelectedGate={setSelectedGate}
                    gatesPlaces={gatesPlaces}
                    setSelectedPlace={setSelectedPlace}
                    setVisible={setVisible}
                />
            </div>
        </div>

    );
};

export default ShippingArea;