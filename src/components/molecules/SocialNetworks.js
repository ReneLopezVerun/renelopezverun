import React from "react";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

const SocialNetworks = () => {
    return (
        <div className="h-16 flex flex-row items-center justify-center space-x-4 text-white">
            <a href="https://github.com/ReneLopezVerun" target="_blank" rel="noopener noreferrer" className="h-full flex items-center">
                <FaGithub size={30} />
            </a>
            <a href="https://instagram.com/rene_de_nazaret/" target="_blank" rel="noopener noreferrer"  className="h-full flex items-center">
                <FaInstagram size={30} />
            </a>
            <a href="https://www.youtube.com/channel/UCJ5dUQC3Z59ttsyEt-om26w" target="_blank" rel="noopener noreferrer" className="h-full flex items-center">
                <FaYoutube size={30} />
            </a>
        </div>
    );
};

export default SocialNetworks;
