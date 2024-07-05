import React from "react";
import Subtitle from "./Subtitle";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({title="Titulo", onClose}) =>{
    return(
        <div className="fixed top-0 left-0 h-screen w-screen bg-white bg-opacity-30 flex justify-center items-center ">
            <div className="w-3/4 h-3/4 bg-white rounded-lg p-4">
                <div className="flex flex-row justify-between items-center h-16">
                    <Subtitle value={title} colorText="black"/>
                    <IoIosCloseCircleOutline  onClick={onClose} size={30} />
                </div>
            </div>
        </div>
    );
}

export default Modal;