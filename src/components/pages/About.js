import React from "react"
import Title from "../atoms/Title";
import Subtitle from "../atoms/Subtitle";
import { valores } from "../data/valores";

const About = () =>{
    return(
        <div className="pt-12">
            <div className="w-full h-screen bg-black flex flex-wrap p-8">
                <div className="w-1/4 h-3/5 bg-black hover:bg-red-600 hover:scale-90 hover:border-black flex justify-center items-center border-2 border-white"><Subtitle value="Soy"/></div>
                <div className="w-3/4 h-3/5 bg-black hover:bg-blue-600 hover:scale-90 hover:border-black flex justify-center items-center border-2 border-white"> <Title value="René López Verún 🐝"/></div>
                <div className="w-3/4 h-2/5 bg-black hover:bg-green-600 hover:scale-90 hover:border-black flex flex-col justify-center items-center border-2 border-white">
                    <Subtitle value="Apasionado del desarrollo frontend 💻" />
                    <Subtitle value="Cursé la ingenieria en Ciencias de la computación en la BUAP" />
                </div>
                <div className="w-1/4 h-2/5 bg-black hover:bg-red-600 hover:scale-90 hover:border-black flex justify-center items-center border-2 border-white"><Subtitle value="Creativo" /></div>
            </div>
            <div className="w-full h-screen flex flex-col justify-around p-12">
                <Title value="Valores y cualidades"/>
                <div className="w-full flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                {valores.map((valor, index)=>(
                    <Subtitle key={index} value={valor.name} colorText={valor.color} />
                ))}
                </div>
            </div>
            <div className="w-full h-screen bg-green-600">

            </div>
        </div>
    );
}

export default About;