import React, { useEffect } from "react";

interface Props extends React.HTMLProps<HTMLSelectElement> {
    label?: string;
    labelProps?: React.HTMLProps<HTMLSpanElement>;
    variant?: "outlined" | "solid";
}

export default function Select({ label, labelProps, onSelect, variant = "outlined", ...selectProps }: Props) {
    const selectRef = React.useRef<HTMLSelectElement>(null);

    const solidSelect = `rounded-lg ${selectProps.disabled && "bg-opacity-50"}`;
    const outlinedSelect = `border-2 px-5 border-tint py-2 rounded-lg ${selectProps.disabled && "border-opacity-50"}`;
    const solidLayout = `trans bg-tint-alt bg-opacity-15 px-3 rounded-lg ${selectProps.disabled && "bg-opacity-50"}`;

    const handleOnSelectFocused = (e: React.FocusEvent<HTMLSelectElement>) => {
        selectProps?.onFocus && selectProps.onFocus(e);
    };

    const handleOnSelectBlurred = (e: React.FocusEvent<HTMLSelectElement>) => {
        selectProps?.onBlur && selectProps.onBlur(e);
    };

    useEffect(() => {
        if (selectProps.defaultValue) {
            if (selectRef.current) selectRef.current.value = selectProps.defaultValue as any;
        }
    }, []);

    return (
        <div
            className={`${variant === "solid" && solidLayout} ${variant === "outlined" ? "flex items-center" : ""} trans`}
        >
            <span
                onClick={() => {
                    !labelProps?.disabled && selectRef.current?.focus();
                }}
                {...labelProps}
                className={`text-sm trans ${variant === "solid" ? "text-secondary" : "text-tint"} font-semibold ${labelProps
                    } ${variant === "outlined" && "absolute"} ${variant === "solid" ? "bg-none" : "bg-secondary"
                    } ${variant === "outlined" && "mx-3 px-2"} ${selectProps.disabled && "text-opacity-70"}`}
            >
                {label}
            </span>
            <select
                onChange={onSelect}
                ref={selectRef}
                onBlur={handleOnSelectBlurred}
                onFocus={handleOnSelectFocused}
                {...selectProps}
                className={`${selectProps?.className} pb-2 w-full bg-transparent outline-none ${variant === "solid" ? solidSelect : outlinedSelect
                    }`}
                disabled={labelProps?.disabled}
            >
                {selectProps.children}
            </select>
        </div>
    );
}