import React from "react";
import Button from "../atoms/Button";
import { routes } from "../data/routes";

const Header = () => {
    return(
        <div className="w-full md:h-16 flex justify-around md:flex-nowrap flex-wrap  pt-4 space-y-4 md:space-y-0">
            {routes.map((route, index)=>(
                <Button value={route.name} />
            ))}
        </div>
    );
};

export default Header;