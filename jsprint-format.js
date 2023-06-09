((global, factory) => {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory());
    } else {
        global = typeof globalThis !== 'undefined' ? globalThis : global || self;
        let fact = factory()
        global.sprintf = fact.sprintf;
        global.vsprintf = fact.vsprintf;
    }
})(this, function() {
    'use strict';

    function sprintf(format) {
        let args = Array.prototype.slice.call(arguments, 1);
        let index = 0;

        return format.replace(/%(\d+\$|\(([^)]+)\))?([0-9]*)?(\.?[0-9]+)?([a-zA-Z%])/g, function(match, argIndex, argName, width, precision, specifier) {

            if (match === '%%') return '%';

            // If the argument index is provided in the format string
            if (argIndex && argIndex !== '()') {
                let idx = parseInt(argIndex.slice(0, -1), 10);
                if (idx <= args.length) {
                    let arg = args[idx - 1];
                    return processSpecifier(specifier, arg, width, precision);
                }
            }

            // If the argument name is provided in the format string
            if (argName) {
                let argIndex = args.findIndex(function(arg) {
                    return arg && typeof arg === 'object' && argName in arg;
                });

                if (argIndex !== -1) {
                    let arg = args[argIndex][argName];
                    return processSpecifier(specifier, arg, width, precision);
                }
            }

            // If the argument index/name is not provided or is out of range,
            // fallback to sequential argument retrieval
            if (index < args.length) {
                let arg = args[index++];
                return processSpecifier(specifier, arg, width, precision);
            }

            return match;
        });

        function processSpecifier(specifier, arg, width, precision) {
            let stringValue;

            switch (specifier) {
                case 's':
                    stringValue = (arg && typeof arg === 'object' && !Array.isArray(arg)) ? JSON.stringify(arg) : String(arg);
                    break;
                case 'd':
                case 'i':
                    stringValue = parseInt(arg, 10).toString();
                    break;
                case 'f':
                    let precisionValue = precision ? parseInt(precision.slice(1), 10) : 2;
                    stringValue = parseFloat(arg).toFixed(precisionValue);
                    break;
                    // Add more specifiers as needed
                default:
                    return match;
            }

            // Apply padding if width is specified
            if (width) {
                let padLength = parseInt(width, 10) - stringValue.length;
                let paddingChar = ' ';

                // Check if a custom padding character is provided
                if (width.length > 1 && width[0] === '0' && width[1] !== '.') {
                    paddingChar = width[1];
                }

                if (padLength > 0) {
                    let padding = paddingChar.repeat(padLength);
                    if ((paddingChar === '0') && (stringValue[0] === '-' || stringValue[0] === '+')) {
                        // Preserve sign when zero-padding
                        stringValue = stringValue[0] + padding + stringValue.slice(1);
                    } else {
                        stringValue = padding + stringValue;
                    }
                }
            }

            return stringValue;
        }
    }

    function vsprintf(format, args) {
        return sprintf.apply(null, [format].concat(args));
    }
    return { sprintf, vsprintf };
});