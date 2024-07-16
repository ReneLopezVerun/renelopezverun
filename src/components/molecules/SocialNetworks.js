import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";

const SocialNetworks = () => {
    return (
        <div className="h-16 flex flex-row items-center justify-center space-x-4 text-white">
            <a href="https://github.com/ReneLopezVerun" target="_blank" rel="noopener noreferrer" className="h-full flex items-center">
                <FaGithub size={30} />
            </a>
            <a href="https://instagram.com/rene_de_nazaret/" target="_blank" rel="noopener noreferrer"  className="h-full flex items-center">
                <FaInstagram size={30} />
            </a>

        </div>
    );
};

export default SocialNetworks;
