import React, { useContext, useEffect, useState } from 'react';
import LogoImg from '../assets/picto/logo.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import UserC from '../assets/picto/userC.svg';
import Dash from '../assets/picto/dash.svg';
import LogOut from '../assets/picto/logout.svg';
import { toast } from "react-toastify";
import axios from "axios";
import Config from "../config/config";

const Navbar = () => {
    const navigate = useNavigate();
    const { utilisateur } = useAuth();
    const [user, setUser] = useState({});
    const [data, setData] = useState({
        firstNamePeople: "",
        namePeople: "",
        mailPeople: "",
        phoneNumberPeople: "",
        city: "",
        postalCode: "",
        logTypePeopleId: ""
    });
    const [contractType, setContractType] = useState(null);
    const [buttonApparence, setButtonApparence] = useState(false);
    const [buttonAdmin, setButtonAdmin] = useState(false);

    const handleSignOut = async () => {
        localStorage.removeItem('token');
        toast.info("Déconnexion réussie 🎉");
        navigate('/sign');
        window.location.reload();
    };

    useEffect(() => {
        if (utilisateur && utilisateur.peopleId) {
            const getUserByID = async () => {
                try {
                    const response = await axios.get(`${Config.ApiBackUrl}/people/check/${utilisateur.peopleId}`);
                    const getUserByID = response.data.user[0];
                    setUser(getUserByID);
                    setData({
                        firstNamePeople: getUserByID.firstNamePeople || "",
                        namePeople: getUserByID.namePeople || "",
                        mailPeople: getUserByID.mailPeople || "",
                        phoneNumberPeople: getUserByID.phoneNumberPeople || "",
                        city: getUserByID.city || "",
                        postalCode: getUserByID.postalCode || "",
                        peopleId: getUserByID.peopleId || "",
                        logTypePeopleId: getUserByID.logTypePeopleId || "",
                    });
                } catch (error) {
                    toast.error("Oups.. 😢, on ne peut pas récupérer les données utilisateur.");
                }
            };

            getUserByID();
        }
    }, [utilisateur]);

    useEffect(() => {
        const logType = async () => {
            if (user.logTypePeopleId) {
                try {
                    const response = await axios.get(`${Config.ApiBackUrl}/people/getLogType/${user.logTypePeopleId}`);
                    const logTypeElement = response.data.logtype[0].logTypeLvl;
                    setContractType(logTypeElement);
                } catch (error) {
                    toast.error("Erreur lors de la récupération des entreprises");
                }
            }
        };

        logType();
    }, [user.logTypePeopleId]);

    useEffect(() => {
        setButtonAdmin(contractType === 1);
    }, [contractType]);


    useEffect(() => {
        setButtonApparence(utilisateur === null);
    }, [utilisateur]);



    return (
        <div className="w-screen shadowElement h-20 box-border flex items-center justify-between px-10 max-md:px-2">
            <NavLink to="/"><img className="w-1/8" src={LogoImg} alt="Logo" /></NavLink>
            <div>
                {buttonApparence ? (
                    <div>
                        <button
                            onClick={() => navigate('/sign')}
                            className="bg-black ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700">
                            Se connecter
                        </button>
                    </div>

                ) : (
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate('/myAccount')}
                            className="bg-black flex items-center justify-center ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700">
                            <img className="mr-1.5 w-4 h-4 max-md:mr-0" src={UserC} alt="User icon" />
                            <p className="block max-md:hidden">Mon compte</p>
                        </button>
                        {buttonAdmin && (
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="bg-black ml-1.5 flex items-center justify-center text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700">
                                <img className="mr-1.5 w-4 h-4 max-md:mr-0" src={Dash} alt="Dashboard icon" />
                                <p className="block max-md:hidden">Dashboard</p>
                            </button>
                        )}
                        <button
                            onClick={handleSignOut}
                            className="bg-black ml-1.5 flex items-center justify-center text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700">
                            <img className="mr-1.5 w-4 h-4 max-md:mr-0" src={LogOut} alt="Logout icon" />
                            <p className="block max-md:hidden">Deconnexion</p>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
