import React from "react";
import Tippy from "@tippyjs/react";

const CardTecnologia = ({ icon: Icon, tecnologia, color, hoverColor, onClick }) => {
    return (
        <Tippy content={tecnologia}>
            <div className="flex justify-center items-center" onClick={onClick}>
                <Icon
                    className={`w-24 h-24 ${color} ${hoverColor} hover:scale-150`}
                />
            </div>
        </Tippy>
    );
};

export default CardTecnologia;
