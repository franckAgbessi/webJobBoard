import React from 'react';
import {NavLink} from "react-router-dom";
import LogoImg from '../assets/picto/logo.svg';

import SignIn from "../elements/SignIn";
import HeaderImg from '../assets/images/header.svg';

const Sign = () => {
    return (
        <div className="w-screen box-border flex flex-col items-center px-10 mt-8 px-40 max-md:px-16">

            <NavLink className="w-1/4 max-md:w-full flex items-center justify-center" to="/">
                <img  className="max-md::w-52 " src={LogoImg}/>
            </NavLink>

            <header className="mt-8 w-screen overflow-hidden shadowElement h-24  box-border flex items-center justify-between ">
                <img className="object-cover imgHearderBanner" src={HeaderImg}/>
            </header>

            <SignIn/>

        </div>
    );
};

export default Sign;