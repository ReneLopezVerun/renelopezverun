import React from "react";

const Button = ({value="", type, onClick, ...rest}) =>{
    return(
        <button 
            className="bg-black min-w-64 h-12 rounded-lg border-2 text-white border-white hover:bg-white hover:text-black"
            onClick={onClick}
            type={type}
            {...rest}
        >
                {value}
        </button>
    );
};

export default Button;