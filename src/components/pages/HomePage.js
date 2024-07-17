import React from "react";
import Title from "../atoms/Title";
import Tecnologias from "../molecules/Tecnologias";
import Subtitle from "../atoms/Subtitle";
import Footer from "../organisms/Footer";
import Button from "../atoms/Button";

const HomePage = () => {
    const  openPdfInWindow = () => {
        window.open(`${process.env.PUBLIC_URL}/CV_Rene_Lopez_Verun.pdf`, "_blank");
    }

    return (
        <div className="w-full h-screen flex flex-col justify-around items-center px-8 space-y-8 md:pt-32 lg:pt-20 xl:pt-16">
            <Title value="René López Verún" />
            <Subtitle value="Desarrollador Front-end egresado en Ing. de Ciencias de la Computación en la BUAP" />
            <Button value="Descargar CV" onClick={openPdfInWindow} />
            <Tecnologias />
            <Footer />
        </div>
    );
}

export default HomePage;
