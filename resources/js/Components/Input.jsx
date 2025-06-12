import React from "react";

const Input = (props) => {
    return (
        <input
            {...props}
            className={`bg-primary/10 w-full px-4 h-10 md:h-14 placeholder:text-sm rounded-lg not-focus:border-bg/10 border-2 outline-none disabled:opacity-50 ${
                props.className
            } ${props.haserror ? "!border-red-600" : "border-primary/70"}`}
        />
    );
};

export default Input;
