import {cloneElement, ReactChild} from "react";
import {RenderableValues} from "./types";
import {isElement} from 'react-is';

type Child = string | { propName: string } | ReactChild | undefined;

function hasPropName(child: Child): child is { propName: string } {
    return child
        ? typeof child === 'object' && child.hasOwnProperty('propName')
        : false;
}

export function processStringToChildren(
    input: string,
    values: RenderableValues,
    mappingFunc?: (token: string) => string,
    primitiveValues?: boolean
): string | ReactChild[] {

    const children: ReactChild[] = [];

    let child: Child;

    function appendCharToChild(char: string) {
        if (child === undefined) {
            // starting a new string literal
            child = char;
        } else if (typeof child === 'string') {
            // existing string literal
            child = child + char;
        } else if (hasPropName(child)) {
            // adding to the propName of a values lookup
            child.propName = child.propName + char;
        }
    }

    function appendValueToChildren(value: Child) {
        if (value === undefined) {
            return;
        } else if (isElement(value)) {
            children.push(cloneElement(value, {key: children.length}))
        } else if (hasPropName(value)) {
            // this won't be called, propName children are converted to a ReactChild before calling this
        } else {
            children.push(value);
        }
    }

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === '\\') {
            // peek at the next character to know if this is an escape
            const nextChar = input[i + 1];

            // if this isn't an escape sequence then we will add the backslash
            let charToAdd = char;

            if (nextChar === '{' || nextChar === '}') {
                // escaping a brace
                i += 1; // advance passed the brace
                charToAdd = input[i];
            }
            appendCharToChild(charToAdd);
        } else if (char === '{') {

            appendValueToChildren(child);
            child = {propName: ''};

        } else if (char === '}') {

            const propName = (child as { propName: string }).propName;
            if (!values.hasOwnProperty(propName)) {
                throw new Error(
                    `Key "${propName}" not found in ${JSON.stringify(values, null, 2)}`
                );
            }
            const propValue = values[propName];

            appendValueToChildren(propValue);
            child = undefined;

        } else {
            appendCharToChild(char);
        }
    }

    // include any remaining child value
    appendValueToChildren(child);

    return primitiveValues ? children.join('') : children;
}