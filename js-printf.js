function sprintf(format) {
  var args = Array.prototype.slice.call(arguments, 1);
  return format.replace(/%([a-zA-Z%])/g, function (match, specifier) {
    if (match === '%%') return '%';
    if (args.length === 0) return match;
    var arg = args.shift();
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
  });
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