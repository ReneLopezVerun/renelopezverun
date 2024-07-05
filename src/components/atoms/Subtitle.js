import React from "react"

const Subtitle = ({value, colorText="text-white"}) =>{
    return(
        <p className={`${colorText} text-base md:text-2xl text-center`}>{value}</p>
    );
};

export default Subtitle;