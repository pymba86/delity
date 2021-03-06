import {useRef} from "react";
import {randomId} from "../utils/random/randomId";

export function useId(id?: string, generateId: () => string = randomId): string {
    const generatedId = useRef(generateId());
    return id || generatedId.current;
}