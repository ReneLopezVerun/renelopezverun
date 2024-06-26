import React from "react";
import Tippy from "@tippyjs/react";

const CardTecnologia = ({ icon: Icon, tecnologia, color, hoverColor, onClick }) => {
    return (
        <Tippy content={tecnologia}>
            <div style={{ color: color }} onClick={onClick} >
                <Icon
                    style={{ 
                        transition: "color 0.3s, transform 0.3s", 
                        width: 100, 
                        height: 100 
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = hoverColor;
                        e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = color;
                        e.currentTarget.style.transform = "scale(1)";
                    }}
                />
            </div>
        </Tippy>
    );
};

export default CardTecnologia;
