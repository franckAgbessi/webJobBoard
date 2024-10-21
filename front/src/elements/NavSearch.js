import React, { useState } from 'react';
import BannerImg from '../assets/images/hero.webp';
import SearchImg from '../assets/picto/search.svg';
import Lieux from '../assets/picto/lieux.svg';

import {useAuth} from "../Context/AuthContext";


const villes = [
    'Paris',
    'Lyon',
    'Marseille',
    'Bordeaux',
    'Toulouse',
    'Toulon',
    'tzt',
    'tpjnvrepinj',
    'Nice',
    'Strasbourg',
    'Nantes',
    'Lille',
];

const NavSearch = () => {
    const [inputVille, setInputVille] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { utilisateur } = useAuth();

    const completionVille = (e) => {
        const value = e.target.value;
        setInputVille(value);
        if (value) {
            const filteredSuggestions = villes.filter(ville =>
                ville.toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const clickAutoVille = (ville) => {
        setInputVille(ville);
        setSuggestions([]);
    };


    return (
        <div className="w-screen relative box-border max-md:p-4 p-10">
            <img className="w-full h-64 rounded-3xl object-center" src={BannerImg} alt="Banner" />
            <div className="w-full flex flex-col items-center left-0 top-1/2 absolute box-border">
                <h1 className="text-5xl max-md:text-2xl text-white mb-12  font-extrabold font-element-rig text-center ">
                    Trouve le job dont tu <span>rêve</span>
                </h1>
            </div>
        </div>
    );
};

export default NavSearch;
