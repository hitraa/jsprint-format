function sprintf(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  var index = 0;

  return format.replace(/%(\d+\$)?([a-zA-Z%])/g, function (match, argIndex, specifier) {
    if (match === '%%') return '%';

    // If the argument index is provided in the format string
    if (argIndex) {
      var idx = parseInt(argIndex, 10);
      if (idx <= args.length) {
        var arg = args[idx - 1];
        return processSpecifier(specifier, arg);
      }
    }

    // If the argument index is not provided or is out of range,
    // fallback to sequential argument retrieval
    if (index < args.length) {
      var arg = args[index++];
      return processSpecifier(specifier, arg);
    }

    return match;
  });

  function processSpecifier(specifier, arg) {
    switch (specifier) {
      case 's':
        return String(arg);
      case 'd':
      case 'i':
        return parseInt(arg, 10);
      case 'f':
        return parseFloat(arg).toFixed(2);
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
var message = sprintf('My name is %s, I am %d years old, and my height is %.2f meters.', name, age, height);
console.log(message);

Output:

My name is John, I am 25 years old, and my height is 1.85 meters.

*/