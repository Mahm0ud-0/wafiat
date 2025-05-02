import React from "react";

const Input = (props) => {
    return (
        <input
            {...props}
            className={`bg-primary/10 w-full p-3 rounded-lg not-focus:border-bg/10 border-2 outline-none ${
                props.className
            } ${props.hasError ? "!border-red-600" : "border-primary/70"}`}
        />
    );
};

export default Input;
