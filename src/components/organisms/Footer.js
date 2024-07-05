import React from "react";
import Clipboard from "../atoms/Clipboard";
import SocialNetworks from "../molecules/SocialNetworks";

const Footer =() =>{
    return(
        <div className="flex flex-col md:flex-row pb-4 md:pb-0 w-full md:h-16 items-center justify-center md:justify-between md:space-y-0 space-y-4">
            <Clipboard/>
            <SocialNetworks/>
        </div>
    );
};

export default Footer;