import React from 'react';
import MyInput from "../../../UI/input/myInput";

const GateLogListFilter = ({filter, setFilter}) => {
    return (
        <div className='filters'>

            <h1 className='filters__header'>Filters:</h1>

            <div className='filters__filter'>
                <MyInput
                    maxLength={10}
                    placeholder='filter place'
                    value={filter.PLACE}
                    onChange={(e) => {
                        setFilter({...filter, PLACE: e.target.value})
                    }}
                    labeltext='place'
                />
            </div>
            <div className='filters__filter'>
                <MyInput
                    maxLength={10}
                    placeholder='filter userid'
                    value={filter.USERID}
                    onChange={(e) => {
                        setFilter({...filter, USERID: e.target.value})
                    }}
                    labeltext='userid'
                /></div>

            <div className='filters__filter'>
                <MyInput
                    maxLength={9}
                    placeholder='filter ordernum'
                    value={filter.ORDERNUM}
                    onChange={(e) => {
                        setFilter({...filter, ORDERNUM: e.target.value})
                    }}
                    labeltext='ordernum'
                /></div>


        </div>
    );
};

export default GateLogListFilter;