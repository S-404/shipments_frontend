import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import ShipmentService from "../api/ShipmentService";
import "../styles/admin.scss"
import MyModal from "../components/UI/modal/myModal";
import AddGate from "../components/forms/admin/AddGate";
import AddPlace from "../components/forms/admin/AddPlace";
import EditPlace from "../components/forms/admin/EditPlace";
import EditGate from "../components/forms/admin/EditGate";
import Gates from "../components/adminShippingArea/Gates";

const Admin = () => {
    const [gates, setGates] = useState([]);
    const [gatesPlaces, setGatesPlaces] = useState([]);
    const [fetchGatesPlacesList, isGatesPlacesLoading, isGatesPlacesError] = useFetching(async () => {
        const responseData = await ShipmentService.getData({
            query: 'places/list',
        });
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
        let param = {
            query: 'gates/gate', GATE: newGateName,
        };
        const responseData = await ShipmentService.addData(param);
        let id = responseData[0].ID;
        if (id) {
            setGates([...gates, {...responseData[0], GATE_ID: id}])
        }
    }

    const updateGate = async (gateObj) => {
        let param = {
            query: 'gates/gate', ...gateObj
        }
        const responseData = await ShipmentService.updateData(param);
        let id = responseData[0].ID;
        if (id) {
            let newGateObj = Object.assign(gates);
            let updRowIndex = newGateObj.findIndex(gate => gate.GATE_ID === id);
            newGateObj[updRowIndex] = {...responseData[0], GATE_ID: id};
            setGates([...newGateObj]);
        }
    }

    const deleteGate = async (gateID) => {
        let param = {
            query: 'gates/gate', ID: gateID,
        }
        console.log(param)
        const responseData = await ShipmentService.deleteData(param);
        let id = responseData[0].ID;
        if (id) {
            let newGatesObj = [...gates.filter(gate => gate.GATE_ID !== id),]
            setGates(newGatesObj)
        }
    }

    const createPlace = async (newPlaceName) => {
        let param = {
            query: 'places/place', PLACE: newPlaceName, GATE_ID: selectedGate.GATE_ID
        }
        console.log(param)
        const responseData = await ShipmentService.addData(param);
        let id = responseData[0].ID;
        if (id) {
            setGatesPlaces([...gatesPlaces, {...responseData[0]}])
        }
    }

    const updatePlace = async (placeObj) => {
        let param = {
            query: 'places/place', ...placeObj
        }
        const responseData = await ShipmentService.updateData(param);
        console.log(responseData[0])
        let id = responseData[0].ID;
        if (id) {
            let newPlaceObj = Object.assign(gatesPlaces);
            let updRowIndex = newPlaceObj.findIndex(place => place.ID === id);
            newPlaceObj[updRowIndex] = {...newPlaceObj[updRowIndex], PLACE: responseData[0].PLACE};
            setGatesPlaces([...newPlaceObj]);
        }
    }

    const deletePlace = async (placeID) => {
        let param = {
            query: 'places/place', ID: placeID,
        }
        console.log(param)
        const responseData = await ShipmentService.deleteData(param);
        let id = responseData[0].ID;
        if (id) {
            setGatesPlaces([...gatesPlaces.filter(place => place.ID !== id)])
        }
    }

    const setVisible = (key, value) => {
        setModalForms({...modalForms, [key]: value})
    }

    return (<div className='shipping-area'>
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
            <div className='admin-form__shipping-area'>
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

export default Admin;