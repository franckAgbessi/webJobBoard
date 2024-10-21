import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {useContext, useEffect, useState} from "react";

const ProtectRoute = ({ children }) => {
    const { utilisateur } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!utilisateur ) {
            navigate("/");
        }
    }, [utilisateur, navigate]);

    return utilisateur ? children : null;
};


export default ProtectRoute;
