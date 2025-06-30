# JS Print Format

Here are detailed examples for different use cases of the `sprintf` function, showcasing various specifiers and formatting options:

### Basic String Substitution

```javascript
console.log(sprintf("Hello, %s!", "world")); // "Hello, world!"
console.log(sprintf("My name is %s and I am %s.", "John", "a developer")); // "My name is John and I am a developer."
```

### Integer Formatting

```javascript
console.log(sprintf("Number: %d", 42)); // "Number: 42"
console.log(sprintf("Padded Number: %04d", 42)); // "Padded Number: 0042"
console.log(sprintf("Negative Number: %d", -42)); // "Negative Number: -42"
```

### Floating Point Number Formatting

```javascript
console.log(sprintf("Pi: %.2f", 3.14159)); // "Pi: 3.14"
console.log(sprintf("Scientific: %.4e", 123.456789)); // "Scientific: 1.2346e+2"
console.log(sprintf("Width and Precision: %8.2f", 123.456)); // "Width and Precision:   123.46"
```

### Named Arguments

```javascript
console.log(sprintf("Name: %(name)s, Age: %(age)d", {name: "Alice", age: 30})); // "Name: Alice, Age: 30"
console.log(sprintf("Coordinates: x = %(x).2f, y = %(y).2f", {x: 12.345, y: 67.890})); // "Coordinates: x = 12.35, y = 67.89"
```

### Positional Arguments

```javascript
console.log(sprintf("Order: %1$s, %3$s, %2$s", "first", "second", "third")); // "Order: first, third, second"
console.log(sprintf("Order: %2$d, %1$d", 10, 20)); // "Order: 20, 10"
```

### JSON Object Formatting

```javascript
console.log(sprintf("Object: %s", {key: "value"})); // "Object: {"key":"value"}"
console.log(sprintf("Nested Object: %s", {key: {nestedKey: "nestedValue"}})); // "Nested Object: {"key":{"nestedKey":"nestedValue"}}"
```

### Literal Percent Sign

```javascript
console.log(sprintf("100%% Complete")); // "100% Complete"
console.log(sprintf("Discount: %d%%", 20)); // "Discount: 20%"
```

### Combining Various Specifiers

```javascript
console.log(sprintf("String: %s, Integer: %d, Float: %.2f", "test", 123, 45.678)); // "String: test, Integer: 123, Float: 45.68"
console.log(sprintf("%2$s costs $%1$.2f", 12.34, "Apple")); // "Apple costs $12.34"
console.log(sprintf("Padded: [%10s]", "pad")); // "Padded: [       pad]"
console.log(sprintf("Zero-padded: [%010d]", 42)); // "Zero-padded: [0000000042]"
```

### Edge Cases and Special Handling

```javascript
console.log(sprintf("No arguments: %s", undefined)); // "No arguments: undefined"
console.log(sprintf("Null value: %s", null)); // "Null value: null"
console.log(sprintf("Array: %s", [1, 2, 3])); // "Array: 1,2,3"
console.log(sprintf("Boolean: %s", true)); // "Boolean: true"
```

### Using `vsprintf`

```javascript
console.log(vsprintf("Hello, %s!", ["world"])); // "Hello, world!"
console.log(vsprintf("Number: %04d", [42])); // "Number: 0042"
console.log(vsprintf("Pi: %.2f", [3.14159])); // "Pi: 3.14"
```

### Custom Padding Character

```javascript
console.log(sprintf("Custom padding: [%010d]", 42)); // "Custom padding: [0000000042]"
console.log(sprintf("Space padding: [%10s]", "test")); // "Space padding: [      test]"
```

These examples cover a wide range of possible uses, demonstrating the flexibility and power of the `sprintf` function in JavaScript for formatting strings.