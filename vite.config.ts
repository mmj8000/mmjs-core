import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            entryRoot: './src',
            root: './',
            outDir: './dist/types',
            declarationOnly: false,
            cleanVueFileName: true,
            compilerOptions: {
                incremental: true
            },
            include: [
                `src/**/*.ts`,
                `src/**/*d.ts`,
                `src/**/*.vue`,
            ],
        }),
    ],
    build: {
        outDir: './dist',
        cssCodeSplit: false,
        lib: {
            name: "AutoScroll",
            entry: './src/index.ts',
            formats: ['es', 'cjs'],
            fileName(fromat, entry) {
                return `${fromat}/${entry.replace('.vue', '')}.js`;
            },
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: false,
                preserveModules: true,
                preserveModulesRoot: 'src',
                assetFileNames: '[ext]/[name].[ext]',
                globals: {
                },
            },
            external: [
                'vue',
                'axios',
                '@enhances/with-resolvers'
            ]
        }
    }
});