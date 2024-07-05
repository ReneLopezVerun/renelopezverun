import React from "react";
import { routes } from "../data/routes";
import Link from "../atoms/Link";

const Header = () => {
    return(
        <div className="block  md:fixed bg-white bg-opacity-10 w-full md:h-12 md:flex justify-around items-center md:flex-nowrap flex-wrap space-y-4 md:space-y-0 py-4 md:py-0 z-50">
            {routes.map((route, index)=>(
                <Link key={index} href={route.pathName} value={route.name} />
            ))}
        </div>
    );
};

export default Header;