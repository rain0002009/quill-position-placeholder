import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import sass from 'rollup-plugin-sass'
import babel from 'rollup-plugin-babel'
import svg from 'rollup-plugin-svg'
import { uglify } from 'rollup-plugin-uglify'

export default {
    input: 'src/index.ts',
    output: {
        name: 'QuillPositionPlaceholder',
        file: 'dist/index.js',
        format: 'umd'
    },
    plugins: [
        resolve(),
        commonjs(),
        svg(),
        sass({
            insert: true
        }),
        typescript(),
        babel({
            runtimeHelpers: true,
            extensions: ['.js', '.ts']
        }),
        uglify()
    ],
    external: ['quill']
}
