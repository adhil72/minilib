import React, { useEffect } from "react";

interface Props extends React.HTMLProps<HTMLDivElement> {
    inputProps?: React.HTMLProps<HTMLInputElement>;
    label?: string;
    labelProps?: React.HTMLProps<HTMLSpanElement>;
    type?: "text" | "number" | "email" | "password" | "date" | "time" | "tel" | "file";
    variant?: "outlined" | "solid";
    multiline?: boolean;
}

const focusedTypes = [
    "date", "time", "file"
]

export default function Input({ name, multiline, label, labelProps, inputProps, type = "text", value, defaultValue, variant = "outlined", ...layoutProps }: Props) {

    const labelRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const outlinedInput = `border-2 px-5 border-tint py-2 rounded-lg ${layoutProps.disabled && "border-opacity-50"}`
    const solidInput = `rounded-lg ${layoutProps.disabled && "bg-opacity-50"}`

    const solidLayout = `trans bg-tint-alt bg-opacity-15 px-3 rounded-lg ${layoutProps.disabled && "bg-opacity-50"}`

    const handleOnInputFocused = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!labelRef.current || layoutProps?.disabled) return e.target.blur()
        adjustLabelMargin()
        inputProps?.onFocus && inputProps.onFocus(e)
    }

    const handleOnInputBlurred = (e: React.FocusEvent<HTMLInputElement>) => {
        if (labelRef.current && e.target.value === "" && !focusedTypes.includes(type))
            labelRef.current.style.marginTop = `0px`

        inputProps?.onBlur && inputProps.onBlur(e)
    }

    const adjustLabelMargin = () => {
        if (variant === "solid") return
        if (!labelRef.current || !inputRef.current) return
        const inputHeight = inputRef.current.offsetHeight
        const labelHeight = labelRef.current.offsetHeight
        const mTop = inputHeight - (labelHeight / 2) + 6
        labelRef.current.style.marginTop = `-${mTop}px`
    }

    useEffect(() => {
        if (focusedTypes.includes(type) || defaultValue) adjustLabelMargin()
    }, [])

    return (
        <div
            {...layoutProps}
            className={`${layoutProps?.className} ${variant === "solid" && solidLayout} ${variant === "outlined" ? "flex items-center" : ""} trans`}
            style={{ height: multiline ? "auto" : undefined }}
        >
            <span
                onClick={() => { !labelProps?.disabled && inputRef.current?.focus() }}
                ref={labelRef}
                {...labelProps}
                className={`text-sm trans ${variant === "solid" ? "text-secondary" : "text-tint"} font-semibold ${labelProps} ${variant === "outlined" && "absolute"} ${variant === "solid" ? "bg-none" : "bg-secondary"} ${variant === "outlined" && "mx-3 px-2"} ${layoutProps.disabled && "text-opacity-70"}`}
            >
                {label}
            </span>
            {multiline ? (
                <textarea
                    name={name}
                    value={value ? value : undefined}
                    defaultValue={defaultValue ? defaultValue : undefined}
                    ref={inputRef as any}
                    onBlur={handleOnInputBlurred as any}
                    onFocus={handleOnInputFocused as any}
                    {...inputProps as any}
                    className={`${inputProps?.className} pb-2 w-full bg-transparent outline-none ${variant === "solid" ? solidInput : outlinedInput}`} disabled={labelProps?.disabled}
                />
            ) : (
                <input
                    name={name}
                    value={value ? value : undefined}
                    defaultValue={defaultValue ? defaultValue : undefined}
                    ref={inputRef}
                    onBlur={handleOnInputBlurred}
                    onFocus={handleOnInputFocused}
                    {...inputProps}
                    type={type}
                    className={`${inputProps?.className} pb-2 w-full bg-transparent outline-none ${variant === "solid" ? solidInput : outlinedInput}`} disabled={labelProps?.disabled}
                />
            )}
        </div>
    );
}