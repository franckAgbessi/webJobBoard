import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Config from '../config/config';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import {toast, ToastContainer} from "react-toastify";

//TODO PROBLEM DE TOKEN JE MINSPRIRE DE MON ANCIEN CODE

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState(null);
    const [compagnie, setCompagnie] = useState(null);
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUtilisateur({
                    token,
                    ...decodedToken.peopleToken,
                });
            } catch (error) {
                handleSignOut();
            }
        }
    }, []);

    const updateToken = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUtilisateur({
                    token,
                    ...decodedToken.peopleToken,
                });
            } catch (error) {
                handleSignOut();
            }
        }
    }, []);

    const handleSignIn = async (userData) => {
        try {
            const response = await axios.post(`${Config.ApiBackUrl}/people/login`, userData);
            const { token } = response.data;
            localStorage.setItem('token', token);
            updateToken();
        } catch (error) {
            toast.error("Erreur lors de la connexion");
        }
    };

    //ICI LES FUNTIONS POUR LES PEOPLES
    const handleSignUp = async (userData) => {
        try {
            await axios.post(`${Config.ApiBackUrl}/people/signup`, userData);
        } catch (error) {
            throw error;
        }
    };

    const handleAccountUpdate = async (userData) => {
        try {
            const userID = utilisateur.peopleId;
            await axios.put(`${Config.ApiBackUrl}/people/update/${userID}`, userData);

        } catch (error) {
            console.log(error);

        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUtilisateur(null);
        toast.info("Déconnexion réussie 🎉");
        navigate('/');
    };


    //ICI LES FUNCTION POUR LES COMPAGNIES

    const createCompagnies = async (elementCompaniesData) => {
        try {
            await axios.post(`${Config.ApiBackUrl}/companies/create`, elementCompaniesData);
        } catch (error) {
            console.log(error)
        }
    };

    // POUR LES JOBSSSSS
    const createJobs = async (elementCompaniesData) => {
        try {
            await axios.post(`${Config.ApiBackUrl}/advertisements/create`, elementCompaniesData);
        } catch (error) {
            console.log(error)
        }
    };

    // CREER LES POSTULAT
    const createPostule = async () => {
        try {
            await axios.post(`${Config.ApiBackUrl}/applications/create`);
        } catch (error) {
            console.log(error)
        }
    };





    return (
        <AuthContext.Provider value={{ utilisateur, handleSignOut, handleSignIn, handleSignUp, handleAccountUpdate, updateToken , createCompagnies, toggle, setToggle , createJobs, createPostule}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
