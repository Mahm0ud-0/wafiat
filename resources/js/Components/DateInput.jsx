import React, { useRef } from "react";

const DateInput = (props) => {
    const hiddenInputRef = useRef();

    return (
        <div className="w-full">
            <input
                type="text"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                readOnly
                onClick={() => hiddenInputRef.current.showPicker()}
                onFocus={() => hiddenInputRef.current.showPicker()}
                className={`cursor-pointer bg-primary/10 w-full px-4 h-10 md:h-14 placeholder:text-sm rounded-lg not-focus:border-bg/10 border-2 outline-none disabled:opacity-50 ${
                    props.haserror ? "!border-red-600" : "border-primary/70"
                }`}
                />
            <input
                type="date"
                tabIndex={-1}
                ref={hiddenInputRef}
                className="h-0 w-0"
                onChange={props.onChange}
            />
        </div>
    );
};

export default DateInput;
