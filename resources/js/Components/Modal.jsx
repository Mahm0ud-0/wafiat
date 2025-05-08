const Modal = ({ open, onClose, children, width }) => {
    return (
        // backdrop
        <div
            onClick={onClose}
            className={`fixed inset-0 z-10 flex justify-center items-center transition-colors ${
                open ? "visible bg-black/50" : "invisible z-0 pointer-events-none"
            }`}
        >
            {/* modal */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                bg-bg rounded-xl shadow p-6 transition-all  w-${
                    width ? width : "5/12"
                } overflow-auto
                ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
                `}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
