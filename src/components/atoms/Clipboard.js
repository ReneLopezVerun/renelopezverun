import React from "react";
import { toast } from "react-toastify";
import { MdContentCopy } from "react-icons/md";
import Tippy from "@tippyjs/react";

const Clipboard = () =>{
    const text = "rene.lopez.verun@gmail.com";

    const handleCopy = () =>{
        navigator.clipboard.writeText(text).then(()=>{
            toast.success(`Texto copiado: ${text}`);
        }).catch(err=>{
            console.log("Error al copiar el texto", err);
        })
    }

    return(
        <div className="h-full flex flex-row items-center space-x-2 text-white">
            <p>{text}</p>
            <Tippy content="Copiar!">
                <div>
                    <MdContentCopy size={15} onClick={handleCopy} className="cursor-pointer" />
                </div>
            </Tippy>
        </div>
    );
};

export default Clipboard;


