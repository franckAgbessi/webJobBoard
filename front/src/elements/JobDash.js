import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import Config from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import Profil from "../assets/images/hero.png";
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../Context/AuthContext";

const JobDash = () => {
    const [companies, setCompanies] = useState([]);
    const { createJobs } = useContext(AuthContext);
    const [modalForm, setModalForm] = useState(false);
    const [modalFormUpdate, setModalFormUpdate] = useState(false);
    const [select, setSelect] = useState(null);


    const [dataCompanies, setDataCompanies] = useState({
        nameAdvertisement: "",
        mailAdvertisement: "",
        descriptionAdvertisement: "",
        dateAdvertisement: "",
        city: "",
        postalCode: "",
        contractType: "",
        isRemote: "",
    });

    useEffect(() => {
        getAllCompagnies();
    }, []);

    const getAllCompagnies = async () => {
        try {
            const response = await axios.get(`${Config.ApiBackUrl}/advertisements/all`);
            setCompanies(response.data.advertisements);
        } catch (error) {
            toast.error("Erreur lors de la récupération des entreprises");
        }
    };

    const deleteCompagniesByID = async (companyId) => {
        try {
            await axios.delete(`${Config.ApiBackUrl}/advertisements/del/${companyId}`);
            toast.success(`Super 🎉 ! Tu l'as supprimé.`);
            getAllCompagnies();
        } catch (error) {
            toast.error(`Oups.. 😢, on ne peut pas supprimer...`);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataCompanies(prevData => ({
            ...prevData,
            [name]: value
        }));
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



    //MERCI STACK
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };



    useEffect(()=>{
        contractType()
    },[companies])

    const [contractElement, setContractElement] = useState([]);
    const [city, setCity] = useState([]);

    const contractType = async () => {
        const contractIds = companies.map(company => company.contractAdvertisementId);

        try {
            const response = await axios.get(`${Config.ApiBackUrl}/advertisements/getContract/${contractIds.join(',')}`);
            const contractTypes = response.data.contract.reduce((acc, contract) => {
                acc[contract.id] = contract.contractType;
                return acc;
            }, {});
            setContractElement(contractTypes);
        } catch (error) {
            toast.error("Erreur lors de la récupération des entreprises");
        }

    };


    const handleCreateCompagnie = async (e) => {
        e.preventDefault();
        const dataToSend = {
            ...dataCompanies,
            dateAdvertisement: formatDate(dataCompanies.dateAdvertisement),
            contractType: contractTypeMapping[dataCompanies.contractType] || null,
            isRemote: isRemoteMapping[dataCompanies.isRemote] || null,
        };
        try {
            await createJobs(dataToSend);
            getAllCompagnies();
            toast.success(`Super 🎉 ! Tu as créé ${dataCompanies.nameCompany}`);
            resetForm();
        } catch (err) {
            toast.error(`Oups.. 😢, on ne peut pas créer ${dataCompanies.nameCompany}...`);
        }
    };

    const updateCompagniesByID = async (companyId) => {
        try {
            await axios.put(`${Config.ApiBackUrl}/advertisements/update/${companyId}`, dataCompanies);
            toast.success(`Super 🎉 ! Tu as mis à jour ${dataCompanies.nameCompany}`);
            getAllCompagnies();
            resetForm();
        } catch (error) {
            toast.error(`Oups.. 😢, on ne peut pas mettre à jour ${dataCompanies.nameCompany}...`);
        }
    };

    const openModalFormUpdate = (company) => {
        setDataCompanies(company);
        setSelect(company.companyId);
        setModalFormUpdate(true);
    };

    const closeModalFormUpdate = () => {
        setModalFormUpdate(false);
        resetForm();
    };

    const resetForm = () => {
        setDataCompanies({
            nameAdvertisement: "",
            mailAdvertisement: "",
            descriptionAdvertisement: "",
            dateAdvertisement: "",
            city: "",
            postalCode: "",
            contractType: "",
            isRemote: "",
        });
        setSelect(null);
        setModalForm(false);
        setModalFormUpdate(false);
    };

    return (
        <div className="flex flex-col items-start w-screen max-md:w-11/12  mt-4 ">
            {modalForm ? (
                <button onClick={resetForm} className="bg-black ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700">Annuler la création</button>
            ) : (
                <button onClick={() => setModalForm(true)} className="bg-black ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700">Créer une compagnie</button>
            )}

            {modalForm && (
                <form className="mt-4 mb-4 flex items-center flex-wrap max-md:flex-wrap"
                      onSubmit={handleCreateCompagnie}>
                    {["nameAdvertisement", "mailAdvertisement", "descriptionAdvertisement", "city", "postalCode"].map((field, index) => (
                        <div key={index} className="flex flex-col mr-4">
                            <input
                                name={field}
                                className="min-w-48 borderBottomClick px-4 py-2 max-md:mb-4"
                                placeholder={field.replace("Advertisement", "")}
                                type={field === "mailAdvertisement" ? "email" : "text"}
                                onChange={handleChange}
                                value={dataCompanies[field]}
                            />
                        </div>
                    ))}

                    <div className="flex flex-col mr-4">
                        <input
                            name="dateAdvertisement"
                            className="min-w-48 borderBottomClick px-4 py-2 max-md:mb-4"
                            type="date"
                            onChange={handleChange}
                            value={dataCompanies.dateAdvertisement}
                        />
                    </div>

                    <div className="flex flex-col mr-4">
                        <select
                            name="contractType"
                            className="min-w-48 borderBottomClick px-4 py-2 max-md:mb-2"
                            onChange={handleChange}
                            value={dataCompanies.contractType}
                        >
                            <option value="">Type de contrat</option>
                            <option value="CDI">CDI</option>
                            <option value="CDD">CDD</option>
                            <option value="Freelance">Freelance</option>
                        </select>
                    </div>

                    <div className="flex flex-col mr-4">
                        <select
                            name="isRemote"
                            className="min-w-48 borderBottomClick px-4 py-2 max-md:mb-2"
                            onChange={handleChange}
                            value={dataCompanies.isRemote}
                        >
                            <option value="">Mode de travail</option>
                            <option value="Remote">Remote</option>
                            <option value="On-site">On-site</option>
                        </select>
                    </div>

                    <button className="max-md:ml-0 ml-4 text-sm px-4 py-2 text-white bg-green-dark custom-radius"
                            type="submit">
                        Confirmer
                    </button>
                </form>

            )}

            {companies.map(compa => (
                <div key={compa.companyId}
                     className="max-md:w-full max-md:flex-col  mt-4 w-full overflow-hidden flex items-center justify-between py-4 px-6 border-rad-O5 border mb-3 hover:bg-black-hover2">
                    <div className="w-full flex max-md:flex-wrap">
                        <div className="w-full flex items-center justify-between max-md:flex-col ">
                            <div className="w-2/3  max-md:w-11/12 flex items-center max-md:flex-col ">
                                <div
                                    className="w-10 h-10 rounded-full overflow-hidden max-md:w-full max-md:flex max-md:items-center max-md:justify-center   ">
                                    <img src={Profil}
                                         className="object-cover w-full h-full max-md:h-8  max-md:w-8 rounded-full"/>
                                </div>
                                {modalFormUpdate && select === compa.companyId ? (
                                    <form className="mt-4 mb-4 flex items-center max-md:flex-col flex-wrap"
                                          onSubmit={() => updateCompagniesByID(compa.companyId)}>
                                        {["nameCompany", "mailCompany", "phoneNumberCompany", "descriptionCompany"].map((field, index) => (
                                            <div key={index} className="flex flex-col mr-2">
                                                <input
                                                    name={field}
                                                    className="min-w-48 borderBottomClick px-4 py-2 max-md:mb-2"
                                                    placeholder={field.replace("Company", "")}
                                                    type={field === "mailCompany" ? "email" : field === "phoneNumberCompany" ? "tel" : "text"}
                                                    onChange={handleChange}
                                                    value={dataCompanies[field]}
                                                />
                                            </div>
                                        ))}

                                    </form>
                                ) : (
                                    <div className="ml-4 flex items-center max-md:flex-wrap ">
                                        <div
                                            className="max-md:w-1/2 w-32 overflow-hidden text-nowrap text-ellipsis">{compa.nameAdvertisement}</div>
                                        <div
                                            className="max-md:w-1/2 w-32 overflow-hidden text-nowrap text-ellipsis"> city</div>
                                        <div
                                            className="max-md:w-1/2 w-32 overflow-hidden text-nowrap text-ellipsis">
                                            {contractElement[compa.contractAdvertisementIdd] === 1 ? "CDI" : null}
                                            {contractElement[compa.contractAdvertisementIdd] === 2 ? "CDD" : null}
                                            {contractElement[compa.contractAdvertisementIdd] === 3 ? "Freelance" : null}
                                        </div>
                                        <div
                                            className="max-md:w-1/2 w-32 overflow-hidden text-nowrap text-ellipsis">{compa.isRemote}</div>
                                        <div
                                            className="max-md:w-1/2 w-32 overflow-hidden text-nowrap text-ellipsis">{compa.dateAdvertisement}</div>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center max-md:mt-4">
                                {modalFormUpdate && select === compa.companyId ? (
                                    <div className="max-md:flex max-md:items-center max-md:justify-center">
                                        <button onClick={() => updateCompagniesByID(compa.companyId)} className="ml-4 mr-4  text-sm px-2 text-white py-1 bg-green-dark custom-radius">Confirmer</button>
                                        <button onClick={closeModalFormUpdate} className="ml-4 mr-4  text-sm px-2 text-white py-1 bg-black custom-radius">Annuler</button>
                                    </div>
                                ) : (
                                    <div className="max-md:flex max-md:items-center max-md:justify-center">
                                        <button onClick={() => deleteCompagniesByID(compa.companyId)}
                                                className="ml-4 mr-4 text-sm px-2 text-white py-1 bg-red-el custom-radius">Supprimer
                                        </button>
                                        <button onClick={() => openModalFormUpdate(compa)}
                                                className="ml-4 mr-4  text-sm px-2 text-white py-1 bg-black-2 custom-radius">Modifier
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <ToastContainer />
        </div>
    );
};

export default JobDash;
