import React, { useRef, useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_red.css";

const DateInput = (props) => {
    console.log(props.value);

    return (
        // <div className="w-full">
        //     <input
        //         type="text"
        //         name={props.name}
        //         value={props.value}
        //         placeholder={props.placeholder}
        //         readOnly
        //         onClick={() => hiddenInputRef.current.showPicker()}
        //         onFocus={() => hiddenInputRef.current.showPicker()}
        //         className={`cursor-pointer bg-primary/10 w-full px-4 h-10 md:h-14 placeholder:text-sm rounded-lg not-focus:border-bg/10 border-2 outline-none disabled:opacity-50 ${
        //             props.haserror ? "!border-red-600" : "border-primary/70"
        //         }`}
        //         />
        //     <input
        //         type="date"
        //         tabIndex={-1}
        //         ref={hiddenInputRef}
        //         className="h-0 w-0"
        //         onChange={props.onChange}
        //     />
        // </div>

        <Flatpickr
            name={props.name}
            value={new Date(props.value)}
            placeholder={props.placeholder}
            onChange={([dateStr]) => {
                props.onChange(
                    dateStr
                        .toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })
                        .replace(/[^\d/]/g, "")
                        .replace(/\//g, "-")
                );
            }}
            options={{ dateFormat: "Y-m-d", disableMobile: true }}
            className={`bg-primary/10 w-full px-4 h-10 md:h-14 placeholder:text-sm rounded-lg not-focus:border-bg/10 border-2 outline-none disabled:opacity-50 ${
                props.haserror ? "!border-red-600" : "border-primary/70"
            }`}
        />
        // <div className="relative w-full flex items-center">
        //     <span
        //         className={`block absolute mr-4 ${
        //             props.value
        //                 ? "opacity-100 hidden lg:block"
        //                 : "opacity-70 text-sm"
        //         }`}
        //     >
        //         {props.value ? props.value : props.placeholder}
        //     </span>
        //     <input
        //         type="date"
        //         name={props.name}
        //         value={props.value}
        //         onChange={(e) => {
        //             // setTouched(true);
        //             props.onChange(e);
        //         }}
        //         // onFocus={() => setTouched(true)}
        //         // onBlur={() => setTouched(false)}
        //         className={`bg-primary/10 w-full px-4 h-10 md:h-14 placeholder:text-sm rounded-lg not-focus:border-bg/10 border-2 outline-none disabled:opacity-50 ${
        //             props.haserror ? "!border-red-600" : "border-primary/70"
        //         }`}
        //     />
        // </div>
    );
};

export default DateInput;
