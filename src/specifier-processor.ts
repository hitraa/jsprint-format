export type SprintfArg = string | number | boolean | null | undefined | any[] | Record<string, any>;

export interface FormatMatch {
    argIndex?: string;
    argName?: string;
    width?: string;
    precision?: string;
    specifier: string;
}

export const processSpecifier = (
    { specifier, width, precision }: FormatMatch,
    arg?: SprintfArg
): string => {
    if (arg === undefined) return '';

    let stringValue: string = '';

    switch (specifier) {
        case 's':
            stringValue = typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            break;
        case 'd':
        case 'i':
            stringValue = parseInt(String(arg), 10).toString();
            break;
        case 'f':
            stringValue = parseFloat(String(arg)).toFixed(precision ? parseInt(precision.slice(1), 10) : 2);
            break;
        case 'e':
            stringValue = parseFloat(String(arg)).toExponential(precision ? parseInt(precision.slice(1), 10) : 2);
            break;
        default:
            return String(arg);
    }

    if (width) {
        const padLength = parseInt(width, 10) - stringValue.length;
        if (padLength > 0) {
            const paddingChar = width.startsWith('0') && !width.includes('.') ? '0' : ' ';
            const padding = paddingChar.repeat(padLength);
            return /^[+-]/.test(stringValue)
                ? stringValue[0] + padding + stringValue.slice(1)
                : padding + stringValue;
        }
    }

    return stringValue;
};