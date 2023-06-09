function sprintf(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  var index = 0;

  return format.replace(/%(\d+\$)?([0-9]*)?(\.?[0-9]+)?([a-zA-Z%])/g, function (match, argIndex, width, precision, specifier) {
    if (match === '%%') return '%';

    // If the argument index is provided in the format string
    if (argIndex) {
      var idx = parseInt(argIndex, 10);
      if (idx <= args.length) {
        var arg = args[idx - 1];
        return processSpecifier(specifier, arg, width, precision);
      }
    }

    // If the argument index is not provided or is out of range,
    // fallback to sequential argument retrieval
    if (index < args.length) {
      var arg = args[index++];
      return processSpecifier(specifier, arg, width, precision);
    }

    return match;
  });

  function processSpecifier(specifier, arg, width, precision) {
    var stringValue;

    switch (specifier) {
      case 's':
        stringValue = String(arg);
        break;
      case 'd':
      case 'i':
        stringValue = parseInt(arg, 10).toString();
        break;
      case 'f':
        var precisionValue = precision ? parseInt(precision.slice(1), 10) : 2;
        stringValue = parseFloat(arg).toFixed(precisionValue);
        break;
      // Add more specifiers as needed
      default:
        return match;
    }

    // Apply padding if width is specified
    if (width) {
      var padLength = parseInt(width, 10) - stringValue.length;
      var paddingChar = ' ';
      
      // Check if a custom padding character is provided
      if (width.length > 1 && width[0] === '0' && width[1] !== '.') {
        paddingChar = width[1];
      }

      if (padLength > 0) {
        var padding = paddingChar.repeat(padLength);
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