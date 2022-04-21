import React from 'react';
import ToggleSwitch from './ToggleSwitch';
import { useDispatch } from 'react-redux';

const DataGroupToggle = ({ title, layerIndex, active }) => {
    const dispatch = useDispatch();

    const toggleSwitch = () => {
        dispatch({
            type: "TOGGLE_DATA_GROUP",
            payload: layerIndex
        })
    }

    return (
        <div
            className={`tray-item`}
        >
            <div className={`tray-item-title`}
                onClick={toggleSwitch}
            >
                {title}
            </div>
            <ToggleSwitch on={active} tooltip="showHideData" toggle={toggleSwitch} />
        </div>
    )
}

export default DataGroupToggle;
