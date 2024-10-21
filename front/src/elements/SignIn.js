import React, {useContext, useState} from 'react';
import ImageBG from '../assets/images/Group6.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//ICI ON IMPORTE LES FUNTION CONTEXT
import {AuthContext} from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [openFormRegister, setOpenFormRegister] = useState(false);
    const {handleSignIn} = useContext(AuthContext);
    const {handleSignUp} = useContext(AuthContext);
    const navigate = useNavigate();



    const [data, setData] = useState({
        firstNamePeople: "",
        namePeople: "",
        mailPeople: "",
        passwordPeople: "",
        phoneNumberPeople: "",
        city: "",
        postalCode: "",
        logTypeLvl: "0",

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignLogin = async (e) => {
        e.preventDefault();
        try{
            await handleSignIn(data);
            toast.success(`Bienvenue 🎉 !`);
            navigate("/");
        }catch (err){
            toast.error(`Oups.. 😢, il y à un erreur .. `);
            console.log(err);
        }
    };

    const handleSignRegister = async (e) => {
        e.preventDefault();
        try{
            await handleSignUp(data);
            toast.success(`Bienvenue 🎉 !`);
        }catch (err){
            if (err.response && err.response.status === 409) {
                toast.error(`Oups.. 😢, cet email existe déjà.`);
            } else {
                toast.error(`Oups.. 😢, il y a une erreur..`);
            }
            console.log(err);
        }
    };


    const toggleFormRegister = () => {
        setOpenFormRegister(prevState => !prevState);
    };



    return (
        <div className="relative  pb-14">
            <div className="flex flex-col justify-center items-center mt-8">
                <h2 className="text-3xl mb-8 font-bold">
                    {openFormRegister ? (
                        <p className="font-element-rig max-md:text-center">C'est parti 💪, inscris-toi ici</p>
                    ) : (
                        <p className="font-element-rig max-md:text-center">Hey 👋 ! Tu peux te connecter ici</p>
                    )}
                </h2>
                {openFormRegister ? (
                    <form onSubmit={handleSignRegister} className="flex flex-col flex-wrap items-center mt-8 max-md:w-full">
                        <div className="flex items-center flex-wrap justify-center max-md:w-full">
                            <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                                <label className="mb-2">Ton prénom</label>
                                <input
                                    name="firstNamePeople"
                                    className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                    type="text"
                                    value={data.firstNamePeople}
                                    onChange={handleChange}
                                    placeholder="Ton prénom"/>
                            </div>
                            <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                                <label className="mb-2">Ton nom</label>
                                <input
                                    name="namePeople"
                                    className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                    type="text"
                                    value={data.namePeople}
                                    onChange={handleChange}
                                    placeholder="Ton nom"/>
                            </div>
                            <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                                <label className="mb-2">Ton mail</label>
                                <input
                                    name="mailPeople"
                                    className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                    type="email"
                                    value={data.mailPeople}
                                    onChange={handleChange}
                                    placeholder="Ton email"/>
                            </div>
                            <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                                <label className="mb-2">Ton mot de passe</label>
                                <input
                                    name="passwordPeople"
                                    className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                    type="password"
                                    value={data.passwordPeople}
                                    onChange={handleChange}
                                    placeholder="Ton mot de passe"/>
                            </div>
                        </div>

                        <div className="flex items-center flex-wrap justify-center max-md:w-full">
                            <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                                <label className="mb-2">Ton numéro de téléphone</label>
                                <input
                                    name="phoneNumberPeople"
                                    className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                    type="tel"
                                    value={data.phoneNumberPeople}
                                    onChange={handleChange}
                                    placeholder="Ton numéro de téléphone"/>
                            </div>
                            <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                                <label className="mb-2">Ta ville</label>
                                <input
                                    name="city"
                                    className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                    type="text"
                                    value={data.city}
                                    onChange={handleChange}
                                    placeholder="Ta ville"/>
                            </div>
                            <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                                <label className="mb-2">Code postal</label>
                                <input
                                    name="postalCode"
                                    className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                    type="text"
                                    value={data.postalCode}
                                    onChange={handleChange}
                                    placeholder="Code postal"/>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-8 max-md:justify-center max-md:w-full px-4 py-2 flex items-center bg-green-dark custom-radius elementRotateBtn">
                            S'inscrire
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSignLogin} className="flex items-center flex-wrap mt-8">
                        <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                            <label className="mb-2">Ton mail</label>
                            <input
                                name="mailPeople"
                                className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                type="email"
                                value={data.mailPeople}
                                onChange={handleChange}
                                placeholder="Ton email"/>
                        </div>
                        <div className="flex flex-col mr-4 mb-4 max-md:w-full">
                            <label className="mb-2">Ton mot de passe</label>
                            <input
                                name="passwordPeople"
                                className="min-w-48 borderBottomClick px-4 py-2 max-md:w-full"
                                type="password"
                                value={data.passwordPeople}
                                onChange={handleChange}
                                placeholder="Ton mot de passe"/>
                        </div>
                        <button
                            className="mt-4 max-md:w-full max-md:items-center max-md:justify-center px-4 py-2 flex items-center bg-green-dark custom-radius elementRotateBtn">
                            Se connecter
                        </button>
                    </form>
                )}
                <button onClick={toggleFormRegister} className="text-sm mt-4 text-green-dark btnNoHover max-md:mt-8">
                    {openFormRegister ? "J'ai déjà un compte ? Cliquer ici" : "Je n'ai pas de compte ? Cliquer ici"}
                </button>

            </div>

            <ToastContainer/>
        </div>
    );
};

export default SignIn;
