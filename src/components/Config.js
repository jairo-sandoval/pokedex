import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Config = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const themePokedex = useSelector(state => state.themePokedex)
    const body = document.getElementsByTagName('body')[0]

    themePokedex 
        ? body.style.background = '#1D1B1B'
        : body.style.background = 'white'

    const select = () => {
        const selectBox = document.getElementsByTagName('select')[0].value
        dispatch({
            type: "CHANGE_NUMBER_CONFIG",
            payload: selectBox
        })

    }

    return (
        <div className="container_config">
                <i onClick={() => navigate(-1)} className="fa-solid fa-arrow-left"></i>
    

            <h2>Settings</h2>
            <div className="container_gl">
                <h3>Theme</h3>
                <input type="checkbox" onChange={() => dispatch({type: "CHANGE_THEME_POKEDEX"})}/>
            </div>

            <div className="container_gl">
                <h3>Items per page</h3>
                <select onChange={select}>
                    <option value="20">20 items</option>
                    <option value="16">16 items</option>
                    <option value="12">12 items</option>
                    <option value="8">8 items</option>
                    <option value="4">4 items</option>
                </select>
            </div>
        </div>
    );
};

export default Config;