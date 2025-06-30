import { describe, it, expect } from 'vitest';
import { vsprintf } from '../src';

describe('vsprintf', () => {
    it('handles strings', () => {
        expect(vsprintf("Hello, %s!", ["world"])).toBe('Hello, world!');
        expect(vsprintf('My name is %s and I am %s.', ['John', 'a developer'])).toBe('My name is John and I am a developer.');
    });

    it('handles ints', () => {
        expect(vsprintf('Age -> %d', [35])).toBe('Age -> 35');
        expect(vsprintf("Negative Number: %d", [-42])).toBe('Negative Number: -42');
    });

    it('handles floats, scientific with width & precission', () => {
        expect(vsprintf("Pi: %.2f", [3.14159])).toBe('Pi: 3.14');
        expect(vsprintf("Scientific: %.4e", [123.456789])).toBe('Scientific: 1.2346e+2');
        expect(vsprintf("Width and Precision: %8.2f", [123.456])).toBe('Width and Precision:   123.46');
    });

    it('handles objects & array as string', () => {
        expect(vsprintf("Object: %s", [{key: "value"}])).toBe('Object: {"key":"value"}');
        expect(vsprintf("Nested Object: %s", [{key: {nestedKey: "nestedValue"}}])).toBe('Nested Object: {"key":{"nestedKey":"nestedValue"}}');
        expect(vsprintf("Object: %s", [[1,2,3]])).toBe('Object: [1,2,3]');
        expect(vsprintf("Object: %s", [['a','b','c']])).toBe('Object: ["a","b","c"]');
        expect(vsprintf("Array: %s", [[5, 6, '7']])).toBe('Array: [5,6,"7"]');
    });

    it('handles undefined, null & boolean', () => {
        expect(vsprintf("No arguments: %s", [undefined])).toBe('No arguments: ');
        expect(vsprintf("Null value: %s", [null])).toBe('Null value: null');
        expect(vsprintf("Boolean: %s", [true])).toBe('Boolean: true');
    });

    it('handle % sign', () => {
        expect(vsprintf("100%% Complete", [])).toBe('100% Complete');
        expect(vsprintf("Discount: %d%%", [20])).toBe('Discount: 20%');
        expect(vsprintf("Discount: %.2f%%", [20])).toBe('Discount: 20.00%');
    });

    it('handle padding', () => {
        expect(vsprintf("Padded Number: %04d", [42])).toBe('Padded Number: 0042');
        expect(vsprintf("Padded: [%10s]", ["pad"])).toBe('Padded: [       pad]');
        expect(vsprintf("Zero-padded: [%010d]", [42])).toBe('Zero-padded: [0000000042]');
        expect(vsprintf("Custom padding: [%010d]", [42])).toBe('Custom padding: [0000000042]');
        expect(vsprintf("Space padding: [%10s]", ["test"])).toBe('Space padding: [      test]');
    });

    it('handles positional params', () => {
        expect(vsprintf("Order: %1$s, %3$s, %2$s", ["first", "second", "third"])).toBe('Order: first, third, second');
        expect(vsprintf("Order: %2$d, %1$d", [10, 20])).toBe('Order: 20, 10');
        expect(vsprintf("%2$s costs $%1$.2f", [12.346, "Apple"])).toBe('Apple costs $12.35');
    });

    it('handles named params', () => {
        expect(vsprintf("Name: %(name)s, Age: %(age)d", [{name: "Alice", age: 30}])).toBe('Name: Alice, Age: 30');
        expect(vsprintf("Coordinates: x = %(x).2f, y = %(y).2f", [{x: 12.345, y: 67.890}])).toBe('Coordinates: x = 12.35, y = 67.89');
    });

    it('handles strings, ints, and objects', () => {
        // combine named params require to pass object at last
        expect(vsprintf(
            'Name: %(name)s, %s -> %d, numbers -> %s',
            ['Age', 35, [1,2,3],
            { name: 'John' }]
        )).toBe('Name: John, Age -> 35, numbers -> [1,2,3]');

        expect(vsprintf("String: %s, Integer: %d, Float: %.2f", ["test", 123, 45.678])).toBe('String: test, Integer: 123, Float: 45.68');
    });
});
