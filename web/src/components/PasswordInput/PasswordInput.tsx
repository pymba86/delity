import React, {useRef, useState} from "react";
import {TextInput} from "../TextInput";
import {ActionIcon} from "../ActionIcon";

export interface PasswordInputProps
    extends Omit<React.ComponentPropsWithoutRef<typeof TextInput>, 'rightSection'> {
    /** Title for visibility toggle */
    showPasswordLabel?: string;

    /** Title for visibility  toggle*/
    hidePasswordLabel?: string;

    /** Focus input when toggle button is pressed */
    focusInputOnToggle?: boolean;
}

export function PasswordInput(
    {
        radius,
        disabled,
        hidePasswordLabel,
        showPasswordLabel,
        focusInputOnToggle = false,
        colorScheme,
        elementRef,
        ...props
    }: PasswordInputProps) {

    const inputRef = useRef<HTMLInputElement>();

    const [reveal, setReveal] = useState(false);

    const toggleReveal = () => {
        setReveal(current => !current);
        if (focusInputOnToggle) {
            inputRef.current?.focus();
        }
    }

    const rightSection = (
        <ActionIcon
        onClick={toggleReveal}
        colorScheme={colorScheme}
        title={reveal ? hidePasswordLabel : showPasswordLabel}
        radius={radius}>
            <div>icon</div>
        </ActionIcon>
    )

}