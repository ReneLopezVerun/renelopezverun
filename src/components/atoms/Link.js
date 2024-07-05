import React from "react";

const Link = ({
    value="", href="", textColor="text-white", textAling="text-center"
}) =>{
    return(
        <a href={href} className={`inline-block w-full ${textColor} ${textAling} `} >
            {value}
        </a>
    );
};

export default Link;