import react from "react";

const Modal = ({title, button, children, onClose }) =>{
    const handleClose = () => {
        console.log("estoy cerra")
    }

    return(
        <div className="fixed top-0 left-0 h-screen w-screen bg-green-500 bg-opacity-80 flex items-center justify-center">
            <div className="bg-green-600 w-[70%] h-[75%] p-8 rounded-lg">
                <div className="flex items-center justify-between">
                    <p>Hdhahdha</p>
                    <div className=""> 
                        <button className="w-8 h-8">icon</button>
                        <button onClick={handleClose} className="w-8 h-8">icon</button>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;