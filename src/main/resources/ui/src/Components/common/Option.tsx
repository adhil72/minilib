import React from "react";

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
    value: string;
    label: string;
}

export function Option({ value, label,className, ...optionProps }: OptionProps) {
    return (
        <option value={value} {...optionProps} className={`${className}`}>
            {label}
        </option>
    );
}