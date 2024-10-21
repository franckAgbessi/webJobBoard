import React, {useEffect, useState} from 'react';
import Card from '../components/Card';
import datajob from '../assets/data/job.json';
import axios from "axios";
import Config from "../config/config";
import {toast} from "react-toastify";




const ContentCards = () => {

    const [add, setAdd] = useState([]);
    useEffect(() => {
        getAllAdd();
    }, []);

    const getAllAdd = async () => {
        try {
            const response = await axios.get(`${Config.ApiBackUrl}/advertisements/all`);
            setAdd(response.data.advertisements);
        } catch (error) {
            toast.error("Erreur lors de la récupération des entreprises");
        }
    };

    return (
        <div className="w-screen box-border flex flex-col px-10 mt-8 max-md:px-4 px-40">
            <h2 className="mb-4 text-xl font-semibold ">{datajob.length} offres</h2>
            <div className="w-full ">
                    {add.map((job) => (
                    <Card
                        key={job.advertisementId}
                        job={job}
                    />
                ))}
            </div>
        </div>
    );
};

export default ContentCards;
