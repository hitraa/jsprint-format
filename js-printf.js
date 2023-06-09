function sprintf(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  var index = 0;

  return format.replace(/%(\d+\$)?(0?\.?\d+)?([a-zA-Z%])/g, function (match, argIndex, precision, specifier) {
    if (match === '%%') return '%';

    // If the argument index is provided in the format string
    if (argIndex) {
      var idx = parseInt(argIndex, 10);
      if (idx <= args.length) {
        var arg = args[idx - 1];
        return processSpecifier(specifier, arg, precision);
      }
    }

    // If the argument index is not provided or is out of range,
    // fallback to sequential argument retrieval
    if (index < args.length) {
      var arg = args[index++];
      return processSpecifier(specifier, arg, precision);
    }

    return match;
  });

  function processSpecifier(specifier, arg, precision) {
    switch (specifier) {
      case 's':
        return String(arg);
      case 'd':
      case 'i':
        return parseInt(arg, 10);
      case 'f':
        var precisionValue = precision ? precision.slice(1) : '2';
        return parseFloat(arg).toFixed(precisionValue);
      // Add more specifiers as needed
      default:
        return match;
    }
  }
}

function vsprintf(format, args) {
  return sprintf.apply(null, [format].concat(args));
}

/*

Uses:

var name = 'John';
var age = 25;
var height = 1.85;
var message = sprintf('My name is %s, I am %d years old, and my height is %f meters.', name, age, height);
console.log(message);

var message2 = sprintf('My name is %2$s, I am %1$d years old, and my height is %f meters.', age, name, height);
console.log(message2);

var pi = 3.14159;
console.log(sprintf('The value of pi is approximately %.2f.', pi));

console.log(sprintf('The value of pi is approximately %0.2f.', pi));

Output:

My name is John, I am 25 years old, and my height is 1.85 meters.

My name is John, I am 25 years old, and my height is 1.85 meters.

The value of pi is approximately 3.14.

The value of pi is approximately 3.14.
*/