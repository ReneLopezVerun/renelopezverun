import React from "react";
const Title = ({value, colorText="text-white "}) => {
    return(
        <p className={` ${colorText} text-2xl md:text-7xl text-center`}>{value}</p>
    );
};

export default Title