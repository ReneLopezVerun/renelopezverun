import React from "react";
import Title from "../atoms/Title";
import Tecnologias from "../molecules/Tecnologias";
import Subtitle from "../atoms/Subtitle";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Button from "../atoms/Button";

const HomePage = () =>{
    return(
        <div className="w-full h-screen flex flex-col justify-around items-center px-8 space-y-8">
            <Header/>
            <Title value="René López Verún"/>
            <Subtitle value="Desarrollador Front-end egresado en Ing. de Ciencias de la Computación en la BUAP" />
            <Button value="Descargar CV"/>
            <Tecnologias/>
            <Footer/>
        </div>
    );
}

export default HomePage;