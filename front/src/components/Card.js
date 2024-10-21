import React, {useContext, useEffect, useState} from 'react';
import JobImg from '../assets/images/hero.webp';
import Eclair from '../assets/picto/apply.svg';
import Left from '../assets/picto/leftElement.svg';
import Close from '../assets/picto/delete.svg';
import {useAuth} from "../Context/AuthContext";

import { AuthContext} from "../Context/AuthContext";
import {toast} from "react-toastify";
import axios from "axios";
import Config from "../config/config";

const Card = ({ job }) => {
    const [isIOpenDescription, setIsIOpenDescription] = useState(false);
    const [isBorderBottomClicked, setIsBorderBottomClicked] = useState(false);
    const [isIOpenForm, setIsIOpenForm] = useState(false);
    const { utilisateur } = useAuth();
    const [companies, setCompanies] = useState([]);
    const [select, setSelect] = useState(null);


    const [user, setUser] = useState({});
    const [contractElement, setContractElement] = useState([]);
    const [city, setCity] = useState([]);

    const {createPostule} = useContext(AuthContext)





    const getAllCompagnies = async () => {
        try {
            const response = await axios.get(`${Config.ApiBackUrl}/advertisements/all`);
            setCompanies(response.data.advertisements);
        } catch (error) {
            toast.error("Erreur lors de la récupération des entreprises");
        }
    };

    useEffect(()=>{
        contractType()
        addresseElement()
    },[])

    const contractType = async () => {
        try {
            const response = await axios.get(`${Config.ApiBackUrl}/advertisements/getContract/${job.contractAdvertisementId}`);
            const contractType = response.data.contract[0].contractType;
            setContractElement(contractType);
        } catch (error) {
            toast.error("Erreur lors de la récupération des entreprises");
        }
    };

    const addresseElement = async () => {
        try {
            const response = await axios.get(`${Config.ApiBackUrl}/advertisements/getAddress/${job.contractAdvertisementId}`);
            const contractType = response.data.address[0].city;
            setCity(contractType);
        } catch (error) {
            toast.error("Erreur lors de la récupération des entreprises");
        }
    };


    const contractTypeMapping = {
        "CDI": 1,
        "CDD": 2,
        "Freelance": 3,
    };

    const isRemoteMapping = {
        "Remote": 1,
        "On-site": 2,
    };



    const [data, setData] = useState({
        firstNamePeople: "",
        namePeople: "",
        mailPeople: "",
        phoneNumberPeople: "",
        city: "",
        postalCode: "",
    });



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
                    });
                } catch (error) {
                    toast.error("Oups.. 😢, on ne peut pas récupérer les données utilisateur.");
                }
            };

            getUserByID();
        }
    }, [utilisateur]);


    const [formData, setFormData] = useState({
        firstNameApply: utilisateur?.firstNamePeople || "",
        nameApply:  utilisateur?.namePeople || "",
        mailApply:  utilisateur?.mailPeople || "",
        messageApply: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handlePotula = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8000/applications/create', formData);
            toast.success(`Hey 🎉, bien joué tu viens de postuler !`);
            setIsIOpenForm(false)
        }catch (err){
            toast.error(`Oups.. 😢, il y à un erreur .. `);
            console.log(err);
        }
    };



    const formattedDate = new Date(job.dateAdvertisement).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const toggleDescriptionModal = () => {
        setIsIOpenDescription(prevState => !prevState);
        setIsBorderBottomClicked(prevState => !prevState);
        setIsIOpenForm(false);
    };

    const toggleForm = () => {
        setIsIOpenForm(prevState => !prevState);
    };

    return (
        <div className="border rounded-3xl mb-4 flex flex-col items-center overflow-hidden">
            <div className={`flex ${isBorderBottomClicked ? 'borderBottomClick' : ''}`}>
                <img src={JobImg} alt="" className="w-2/12 imgBannerCard" />
                <div className="py-4 px-6 w-full flex flex-col justify-between">
                    <h4 className="text-3xl font-element-rig">{job.nameAdvertisement}</h4>
                    <h5 className="text-1xl mb-3 text-green-dark">{job.company_name}</h5>
                    <div className="flex items-center mb-3">
                        <span className="py-2 px-3 bg-grey text-sm rounded-lg">{city}</span>
                        <span className="py-2 px-3 bg-green-light text-sm rounded-lg ml-2">
                             {contractElement === 1 ? "CDI" : null}
                            {contractElement === 2 ? "CDD" : null}
                            {contractElement === 3 ? "Freelance" : null}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm">{formattedDate}</span>
                        <button onClick={toggleDescriptionModal}
                                className="px-4 py-2 flex items-center justify-center bg-green-dark custom-radius elementRotateBtn"
                                aria-expanded={isBorderBottomClicked}>
                            {isBorderBottomClicked ? (
                                <img src={Close} alt="Close" />
                            ) : (
                                <div className="flex items-center">
                                    <img className={`mr-2 rounded-full ${isBorderBottomClicked ? 'rotateIcon' : ''}`} src={Left} />
                                    <span>Lire plus</span>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isIOpenDescription && (
                <div className="w-full py-4 px-6">
                    <p className="font-bold mb-2 font-element-rig">Une petite description du post</p>
                    <p>{job.descriptionAdvertisement}</p>
                    <span onClick={toggleForm} className="elementRotateBtn">
                        {!isIOpenForm && (
                            <button className="mt-4 px-4 py-2 flex items-center bg-green-light custom-radius elementRotateBtn borderBottomClick">
                                <img className="mr-2 rounded-full" src={Eclair} />
                                Postuler
                            </button>
                        )}
                    </span>
                    {isIOpenForm && (
                        <form onSubmit={handlePotula} className='flex items-center mt-8 flex-wrap'>
                            <div className="w-full flex flex-col flex-wrap">
                                <div className="w-full flex flex-wrap">
                                    <div className="flex flex-col mr-4 mb-4">
                                        <label className="mb-2" htmlFor="name">Ton nom</label>
                                        <input
                                            onChange={handleChange}

                                            value={formData.nameApply}
                                            name="nameApply"
                                            id="name" className="borderBottomClick px-4 py-2" type="text"
                                            placeholder="Ton Nom"/>
                                    </div>
                                    <div className="flex flex-col mr-4 mb-4">
                                        <label className="mb-2" htmlFor="surname">Ton prénom</label>
                                        <input
                                            onChange={handleChange}

                                            value={ formData.firstNameApply }
                                            name="firstNameApply"
                                            id="surname" className="borderBottomClick px-4 py-2" type="text"
                                            placeholder="Ton prénom"/>
                                    </div>
                                    <div className="flex flex-col mr-4 mb-4">
                                        <label className="mb-2" htmlFor="email">Ton email</label>
                                        <input
                                            onChange={handleChange}
                                            name="mailApply"
                                            value={formData.mailApply}
                                            id="email" className="borderBottomClick px-4 py-2" type="email"
                                            placeholder="Ton email"/>
                                    </div>
                                </div>
                                <div className="flex flex-col mr-4 mb-4">
                                    <label className="mb-2" htmlFor="cv">Ta description</label>
                                    <textarea
                                        onChange={handleChange}
                                        value={formData.messageApply }
                                        name="messageApply"
                                        placeholder="Explique et vend toi en quelque mot..." className="outline-none textaera resize-none borderBottomClick px-4 py-2">
                                    </textarea>
                                </div>

                            </div>
                            {isIOpenForm && (
                                <div className="flex flex-col mr-4 mt-4">
                                    <button
                                        className=" px-4 py-2 flex items-center bg-green-dark custom-radius elementRotateBtn">
                                        <img className="mr-2 rounded-full" src={Eclair}/>
                                        Envoyer
                                    </button>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default Card;
