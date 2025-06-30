import { processSpecifier, SprintfArg } from "./specifier-processor.js";

export type SpecifierProcessor = (arg: SprintfArg, width?: string, precision?: string) => string;

export const sprintf = (format: string, ...args: SprintfArg[]): string => {
    let index = 0;

    return format.replace(
        /%(\d+\$|\(([^)]+)\))?([0-9]*)?(\.?[0-9]+)?([a-zA-Z%])/g,
        (match, argIndex, argName, width, precision, specifier) => {
            if (match === '%%') return '%';

            let arg: SprintfArg | undefined;

			// If the argument index is provided in the format string
            if (argIndex && !/\(\w+\)/.test(argIndex)) {
                const idx = parseInt(argIndex.slice(0, -1), 10);
                arg = args[idx - 1];
            } else if (argName) { // If the argument name is provided in the format string
                const found = args.find(a => typeof a === 'object' && a !== null && argName in a);
                arg = found ? (found as Record<string, unknown>)[argName] as SprintfArg : undefined;
            } else if (index < args.length) { // If the argument index/name is not provided or is out of range,
                // fallback to sequential argument retrieval
                arg = args[index++];
            }

            return processSpecifier({ specifier, width, precision }, arg);
        }
    );
};
