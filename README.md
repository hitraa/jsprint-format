# JS Print Format

A lightweight, cross-platform formatting library for `sprintf`/`vsprintf`-style output—just like PHP’s, but now for modern JavaScript and TypeScript.

- Supports Node.js and browser environments
- Handles positional, named, and variadic arguments
- Typed for maximum confidence with TypeScript
- UMD + ESM + CommonJS builds included

## 🚀 Installation

```bash
npm install jsprint-format
```

Or via CDN:

```html
<!-- jsDeliver -->
<script src="https://cdn.jsdelivr.net/npm/jsprint-format@2.0.0/dist/jsprint-format.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/jsprint-format@2.0.0/dist/jsprint-format.min.js"></script>
```


## ✨ Usage

### Importing

```ts
import { sprintf, vsprintf } from 'jsprint-format';
```

Or in a browser (via UMD):

```html
<script src="jsprint-format.min.js"></script>
<script>
  const result = sprintf("Hello, %s!", "John");
</script>
```

---

## 🧪 Examples

### 📌 Basic formatting

```ts
sprintf("Hello, %s!", "world"); // "Hello, world!"
sprintf("Age -> %d", 35);       // "Age -> 35"
sprintf("Pi: %.2f", 3.14159);   // "Pi: 3.14"
```

---

### 🧠 Named Parameters

```ts
sprintf("Name: %(name)s, Age: %(age)d", { name: "Alice", age: 30 });
// => "Name: Alice, Age: 30"

sprintf("Coordinates: x = %(x).2f, y = %(y).2f", { x: 12.345, y: 67.89 });
// => "Coordinates: x = 12.35, y = 67.89"
```

---

### 🔢 Positional Arguments

```ts
sprintf("Order: %1$s, %3$s, %2$s", "first", "second", "third");
// => "Order: first, third, second"

sprintf("%2$s costs $%1$.2f", 12.346, "Apple");
// => "Apple costs $12.35"
```

---

### 🎯 Padding & Width

```ts
sprintf("Padded Number: %04d", 42);         // "Padded Number: 0042"
sprintf("Padded: [%10s]", "pad");           // "Padded: [       pad]"
sprintf("Zero-padded: [%010d]", 42);        // "Zero-padded: [0000000042]"
sprintf("Space padding: [%10s]", "test");   // "Space padding: [      test]"
```

---

### 🧬 Objects & Arrays

```ts
sprintf("Array: %s", [1, 2, 3]);                      // "Array: [1,2,3]"
sprintf("Object: %s", { key: "value" });              // "Object: {\"key\":\"value\"}"
sprintf("Nested: %s", { key: { nested: true } });     // "Nested: {\"key\":{\"nested\":true}}"
```

---

### 🧩 Special Cases

```ts
sprintf("Boolean: %s", true);       // "Boolean: true"
sprintf("Null value: %s", null);    // "Null value: null"
sprintf("Undefined: %s", undefined); // "Undefined: "

sprintf("Discount: %d%%", 20);      // "Discount: 20%"
sprintf("100%% Complete");          // "100% Complete"
```

---

### 📚 vsprintf

The `vsprintf` variant takes the format string and an array:

```ts
vsprintf("Name: %s, Age: %d", ["Harshal", 28]); // "Name: Harshal, Age: 28"

vsprintf("%2$s costs $%1$.2f", [12.3456, "Banana"]);
// => "Banana costs $12.35"

vsprintf("Nested object: %s", [{ x: 1, y: [2, 3] }]);
// => "Nested object: {\"x\":1,\"y\":[2,3]}"
```

---

## 📜 License

Released under the [MIT License](LICENSE)

---

## 👨‍💻 Author
Made with ❤️ by **Harshal Khairnar**  
Founder, [Hitraa Technologies](https://hitraa.com)  
📧 [harshal@hitraa.com](mailto:harshal@hitraa.com)