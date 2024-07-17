import React from "react"
import Title from "../atoms/Title";
import Subtitle from "../atoms/Subtitle";
import { GiMexico } from "react-icons/gi";
import { FaCss3, FaGitAlt, FaGithub, FaGitlab, FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";

const About = () =>{
    return(
        <div className="pt-6">
            <div className="w-full h-fit md:h-screen bg-black flex flex-wrap p-8 space-y-4 sm:space-y-0">
                <div className="w-full md:w-2/5 h-24 md:h-3/5  text-white hover:text-black bg-black hover:bg-red-600 hover:scale-90 hover:border-black flex flex-col justify-center items-center border-2 border-white">
                    <Subtitle value="Soy" colorText=""/>
                    <Title value="Frontend 💻" colorText="md:sticky md:top-10" />
                </div>
                <div className="w-full md:w-3/5 h-40 md:h-3/5 text-white hover:text-black bg-black hover:bg-blue-600 hover:scale-90 hover:border-black flex flex-col justify-center items-center border-2 border-white space-y-4"> 
                    <Title value="René López Verún 🐝" colorText="md:sticky md:top-10"/>
                    <div className="w-full flex flex-row justify-center items-center space-x-4">
                        <GiMexico size={100} />
                        <Subtitle  value="Puebla MX" colorText="" />
                    </div>
                </div>
                <div className="w-full md:w-3/4 h-24 md:h-2/5 text-white hover:text-black bg-black hover:bg-green-600 hover:scale-90 hover:border-black flex flex-col justify-center items-center border-2 border-white px-4">
                    <Subtitle value="Cursé la ingenieria en Ciencias de la computación en la BUAP" colorText="" />
                </div>
                <div className="w-full md:w-1/4 h-24 md:h-2/5 text-white hover:text-black bg-black hover:bg-red-600 hover:scale-90 hover:border-black flex justify-center items-center border-2 border-white"><Subtitle value="Creativo" colorText="" /></div>
            </div>
            <div className="w-full h-screen flex flex-col justify-around p-12">
                <Title value="Tecnologías y Habilidades"/>
                <div className="w-full h-auto flex flex-col justify-center items-center text-white space-y-4">
                    <Subtitle value="Mi fuerte es React, llevo desarrollando más de un año en este framework con solida maquetación y diseño responsivo." />
                    <FaReact size={50} className="slow-spin"/>
                    <Subtitle value="Para CSS me siento comodo con Tailwind pero no tengo problemas con las hojas de estilo convencionales." />
                    <div className="w-full flex flex-row justify-center space-x-6"> <FaCss3 size={50} className="animate-pulse" /> <RiTailwindCssFill size={50} className="animate-pulse" /> </div>
                    <Subtitle value="Manejo de repositorios y versiones por consola con GIT, Github y Gitlab." />
                    <div className="w-full flex flex-row justify-center space-x-6"> <FaGitAlt size={50} className="animate-pulse" /> <FaGithub size={50} className="animate-pulse" /> <FaGitlab size={50} className="animate-pulse" /> </div>
                    <Subtitle value="Una cosa que me gusta es diseñar componentes, y mi metodologia preferida es el diseño Atomico" />
                </div>
            </div>
        </div>
    );
}

export default About;