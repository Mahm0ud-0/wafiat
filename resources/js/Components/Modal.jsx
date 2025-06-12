const Modal = ({ open, onClose, className, children }) => {
    return (
        // backdrop
        <div
            onClick={onClose}
            className={`w-full fixed inset-0 z-10 flex justify-center items-center transition-colors ${
                open
                    ? "visible bg-black/90"
                    : "invisible z-0 pointer-events-none"
            }`}
        >
            {/* modal */}
            <div
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        onClose();
                    }
                }}
                onClick={(e) => e.stopPropagation()}
                // style={{width: "400px"}}
                className={`
                bg-bg rounded-xl p-4 md:p-5 transition-all overflow-auto 
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
