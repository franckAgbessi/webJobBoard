import React, {useContext, useState, useEffect} from 'react';
import PeopleImg from "../assets/images/people.webp";
import PenImg from "../assets/picto/pen.svg";
import { AuthContext} from "../Context/AuthContext";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
import Config from "../config/config";



const LeftAcount = ({utilisateur}) => {
    const [hiddenModify, setHiddenModify] = React.useState(false);
    const {handleAccountUpdate} = useContext(AuthContext);
    const [user, setUser] = useState({});


    const toogleModify = () => {
        setHiddenModify(prevState => !prevState)
    }

    const [data, setData] = useState({
        firstNamePeople: "",
        namePeople: "",
        mailPeople: "",
        phoneNumberPeople: "",
        city: "",
        postalCode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };



    useEffect(() => {
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
                });
            } catch (error) {
                toast.error("Oups.. 😢, on ne peut pas récupérer les données utilisateur.");
            }
        };

        getUserByID();
    }, [utilisateur.peopleId]);


    const  handleUpdate = async (e) => {
        e.preventDefault();
        try{
            await handleAccountUpdate(data);
            setUser(prevUser => ({
                ...prevUser,
                ...data
            }));
            setHiddenModify(false)

            toast.success("Super 🎉 ! Ton compte est mis a jour !");
        }catch (err){
            toast.error("Oups.. 😢, un petit problème est survenu");
        }
    }




    return (
        <div className="border border-rad-O5 py-4  ">
            <header className="flex items-center justify-between border-bottom p-4">
                <h1 className="font-element-rig text-2xl">Mon Profil</h1>
                <img className="w-1/4" src={PeopleImg}/>
            </header>
            <main className="px-4 py-6 border-bottom   ">
                <h3 className="font-semibold flex items-center">Mes informations
                    <button
                        onClick={toogleModify}
                    className="modifie_action"><img src={PenImg}/></button></h3>

                {hiddenModify ? (
                    <form>
                        <div className="mt-3">
                            <div className="flex flex-col items-start">
                                <h5 className="font-semibold text-black-2">Mon prénom:</h5>
                                <input
                                    id="firstName" type="text"
                                    className="min-w-48 borderBottomClick px-4 py-2 mt-2 max-md:w-full"
                                    onChange={handleChange}
                                    name="firstNamePeople"
                                    value={data.firstNamePeople}
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="flex flex-col items-start">
                                <h5 className="font-semibold text-black-2">Mon nom:</h5>
                                <input
                                    id="name" type="text"
                                    className="min-w-48 borderBottomClick px-4 py-2 mt-2 max-md:w-full"
                                    name="namePeople"
                                    value={data.namePeople}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="flex flex-col items-start">
                                <h5 className="font-semibold text-black-2">Mon email:</h5>
                                <input
                                    id="email" type="email"
                                    className="min-w-48 borderBottomClick px-4 py-2 mt-2 max-md:w-full"
                                    onChange={handleChange}
                                    name="mailPeople"
                                    value={data.mailPeople}
                                />
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="flex flex-col items-start">
                                <h5 className="font-semibold text-black-2">Mon téléphone:</h5>
                                <input
                                    id="téléphone" type="text"
                                    className="min-w-48 borderBottomClick px-4 py-2 mt-2 max-md:w-full"
                                    onChange={handleChange}
                                    value={data.phoneNumberPeople}
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="bg-black mt-4 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700	">

                            Enregistrer les modifications
                        </button>
                    </form>
                ) : (
                    <div>
                        <div className="mt-3">
                            <div className="flex flex-col">
                                <h5 className="font-semibold text-black-2">Mon prénom:</h5>
                                <p className="text-green-dark">{ user.firstNamePeople || ""}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="flex flex-col">
                                <h5 className="font-semibold text-black-2">Mon nom:</h5>
                                <p className="text-green-dark">{ user.namePeople || ""}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="flex flex-col">
                                <h5 className="font-semibold text-black-2">Mon email:</h5>
                                <p className="text-green-dark">{user.mailPeople || ""}</p>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="flex flex-col">
                                <h5 className="font-semibold text-black-2">Mon téléphone:</h5>
                                <p className="text-green-dark">{ user.phoneNumberPeople || ""}</p>
                            </div>
                        </div>
                    </div>
                )}

            </main>
            <main className="px-4 pt-4 ">
                <button
                    className="bg-black ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700	">
                    Supprimer le compte
                </button>

            </main>

            <ToastContainer/>
        </div>

    )
        ;
};

export default LeftAcount;