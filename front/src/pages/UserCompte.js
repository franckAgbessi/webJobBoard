import React from 'react';
import Navbar from "../elements/Navbar";
import LeftAcount from "../components/LeftAcount";

import {useAuth} from "../Context/AuthContext";


const UserCompte = () => {
    const { utilisateur } = useAuth();


    return (
        <div className="w-screen">
            <Navbar/>

            <div className="flex flex-col items-center justify-center w-full py-10 max-md:px-4 ">
                <LeftAcount utilisateur={utilisateur}/>
            </div>
        </div>
    );
};

export default UserCompte;