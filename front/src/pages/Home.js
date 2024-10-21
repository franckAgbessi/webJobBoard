import React from 'react';
import Navbar from "../elements/Navbar";
import NavSearch from "../elements/NavSearch";
import ContentCards from "../elements/ContentCards";
import Footer from "../elements/Footer";

const Home = () => {
    return (
        <div>
            <Navbar/>
            <NavSearch/>
            <ContentCards/>
            <Footer/>
        </div>
    );
};

export default Home;