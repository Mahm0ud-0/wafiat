const Row = ({ children, example, error, className }) => {
    return (
        <div
            className={`${className} mx-auto w-full flex items-center justify-evenly gap-2 ${
                error && "flex-col items-start !gap-1 group"
            }`}
        >
            {children}
            {error && (
                <p className="group-focus-within:block block text-xs pr-1 text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
};

export default Row;
