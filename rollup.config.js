import terser from "@rollup/plugin-terser";

export default {
    input: "dist/index.js",
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs'
        },
        {
            file: "dist/jsprint-format.js",
            format: "umd",
            name: 'jsprintFormat'
        },
        {
            file: "dist/jsprint-format.min.js",
            format: "umd",
            name: 'jsprintFormat',
            plugins: [terser()],
        },
    ],
};
