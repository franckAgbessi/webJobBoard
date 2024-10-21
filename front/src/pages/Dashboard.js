import React, { useEffect, useState } from 'react';
import Navbar from "../elements/Navbar";
import UserDash from "../elements/UserDash";
import CompaniesDash from "../elements/CompaniesDash";
import JobDash from "../elements/JobDash";
import ApplicationDash from "../elements/ApplicationDash";

const Dashboard = () => {

    const [activeModal, setActiveModal] = useState('user');



    const handleModalChange = (modal) => {
        setActiveModal(modal);
    };

    return (
        <div className="w-screen h-screen">
            <Navbar/>
            <div className="p-6">
                <header className="w-full mb-8">
                    <button className="bg-black ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700" onClick={() => handleModalChange('user')}>User</button>
                    <button className="bg-black ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700" onClick={() => handleModalChange('companies')}>Companies</button>
                    <button className="bg-black ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700" onClick={() => handleModalChange('jobs')}>Jobs</button>
                    <button className="bg-black ml-1.5 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-dark duration-700" onClick={() => handleModalChange('applications')}>Applications</button>
                </header>
                {activeModal === 'user' && <UserDash/>}
                {activeModal === 'companies' && <CompaniesDash/>}
                {activeModal === 'jobs' && <JobDash/>}
                {activeModal === 'applications' && <ApplicationDash/>}
            </div>
        </div>
    );
};

export default Dashboard;
