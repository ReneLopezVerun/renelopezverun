import React from "react";
import Title from "../atoms/Title";
import Tecnologias from "../molecules/Tecnologias";

const HomePage = () =>{
    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center space-y-4">
                <Title value="René López Verún"/>
                <Tecnologias/>
        </div>
    );
}

export default HomePage;