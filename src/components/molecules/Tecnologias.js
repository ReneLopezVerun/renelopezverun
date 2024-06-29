import React from "react";
import CardTecnologia from "../atoms/CardTecnologia";
import { FaReact, FaGithub  } from "react-icons/fa";
import { DiJavascript1 } from "react-icons/di";
import { MdCss, MdHtml  } from "react-icons/md";
import { RiTailwindCssFill } from "react-icons/ri";
import { toast } from "react-toastify";

const Tecnologias = () =>{
    
    const tecnologias = [
        { icon: FaReact, tecnologia: "React", color: "#ffffff", hoverColor: "#61DAFB" },
        { icon: DiJavascript1, tecnologia: "JavaScript", color: "#ffffff", hoverColor: "#F7DF1E" },
        { icon: MdCss, tecnologia: "CSS", color: "#ffffff", hoverColor: "#1572B6" },
        { icon: MdHtml, tecnologia: "HTML", color: "#ffffff", hoverColor: "#E34F26" },
        { icon: RiTailwindCssFill, tecnologia: "Tailwind CSS", color: "#ffffff", hoverColor: "#38B2AC" },
        { icon: FaGithub, tecnologia: "GitHub", color: "#ffffff", hoverColor: "#ffffff" },
    ];

    const HandleClick = (tecnologia) =>{
        toast(`hola, tengo conocimientos en ${tecnologia}`)
    };

    return(
        <div className="w-full flex flex-row flex-wrap items-center justify-around">
            {tecnologias.map((tech, index) => (
                <CardTecnologia  
                    key={index}  
                    icon={tech.icon} 
                    tecnologia={tech.tecnologia} 
                    color={tech.color} 
                    hoverColor={tech.hoverColor} 
                    onClick={()=>HandleClick(tech.tecnologia)}
                />
            ))}
        </div>
    );
};

export default Tecnologias;