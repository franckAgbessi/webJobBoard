import React, { useEffect, useState } from 'react';
import axios from "axios";
import Config from "../config/config";
import {toast, ToastContainer} from "react-toastify";
import Profil from "../assets/images/hero.png";

const UserDash = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const { data } = await axios.get(`${Config.ApiBackUrl}/people/all`);
            setUsers(data.allPeople);
            console.log(data);
        } catch (error) {
            console.log("PAS DE USER ", error);
        }
    };

    const deleteUserByID = async (peopleId) => {
        try {
            await axios.delete(`${Config.ApiBackUrl}/people/del/${peopleId}`);
            toast.success("Super 🎉 ! Tu l'as supprimé !");
            getAllUsers();
        } catch (error) {
            console.log(error);
            toast.error("Oups.. 😢, on ne peut pas le supprimer...");
        }
    };

    return (
        <div className="flex flex-col w-full">
            {users.map((user) => (
                <div
                    key={user.peopleId}
                    className="max-md:w-full max-md:flex-col flex items-center justify-between py-4 px-6 border-rad-O5 border mb-3 hover:bg-black-hover2"
                >
                    <div className="w-2/3 flex items-center justify-between max-md:flex-wrap ">
                        <div className="w-10 h-10 rounded-full overflow-hidden max-md:w-full max-md:flex max-md:items-center max-md:justify-center">
                            <img src={Profil} className="object-cover w-full h-full max-md:h-8 max-md:w-8 rounded-full" />
                        </div>
                        <div className="max-md:w-1/2 w-40">{user.firstNamePeople}</div>
                        <div className="max-md:w-1/2 w-40">{user.namePeople}</div>
                        <div className="max-md:w-1/2 w-40">{user.phoneNumberPeople}</div>
                        <div className="max-md:w-1/2 w-40">{user.mailPeople}</div>
                    </div>
                    <div className="flex items-center max-md:mt-4">
                        <button onClick={() => deleteUserByID(user.peopleId)}
                                className="ml-4 text-sm px-2 text-white py-1 bg-red-el custom-radius">
                            Supprimer
                        </button>
                    </div>
                </div>
            ))}
            <ToastContainer/>
        </div>
    );
};

export default UserDash;
