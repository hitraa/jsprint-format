function sprintf(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  var index = 0;

  return format.replace(/%(\d+\$)?(0?)(\d+)?(\.\d+)?([a-zA-Z%])/g, function (match, argIndex, zeroPad, width, precision, specifier) {
    if (match === '%%') return '%';

    // If the argument index is provided in the format string
    if (argIndex) {
      var idx = parseInt(argIndex, 10);
      if (idx <= args.length) {
        var arg = args[idx - 1];
        return processSpecifier(specifier, arg, zeroPad, width, precision);
      }
    }

    // If the argument index is not provided or is out of range,
    // fallback to sequential argument retrieval
    if (index < args.length) {
      var arg = args[index++];
      return processSpecifier(specifier, arg, zeroPad, width, precision);
    }

    return match;
  });

  function processSpecifier(specifier, arg, zeroPad, width, precision) {
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
      var paddingChar = zeroPad ? '0' : ' ';
      if (padLength > 0) {
        var padding = paddingChar.repeat(padLength);
        if (zeroPad && (stringValue[0] === '-' || stringValue[0] === '+')) {
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

/*

Uses:

var name = 'John';
var age = 25;
var height = 1.852;
var message = sprintf('My name is %s, I am %d years old, and my height is %f meters.', name, age, height);
console.log(message);

var message2 = sprintf('My name is %2$s, I am %1$d years old, and my height is %f meters.', age, name, height);
console.log(message2);

var pi = 3.14159;
console.log(sprintf('The value of pi is approximately %.2f.', pi));

console.log(sprintf('The value of pi is approximately %0.2f.', pi));


var message3 = sprintf('Hello, %10s!', name);
console.log(message3);  // Output: Hello,       John!

var message4 = sprintf('Age: %02d', age);
console.log(message4);  // Output: Age: 25

var message5 = sprintf('Value of pi: %010.2f', pi);
console.log(message5);  // Output: Value of pi: 000003.14

Output:

My name is John, I am 25 years old, and my height is 1.85 meters.

My name is John, I am 25 years old, and my height is 1.85 meters.

The value of pi is approximately 3.14.

The value of pi is approximately 3.14.
*/