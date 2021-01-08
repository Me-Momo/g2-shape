import { uglify } from 'rollup-plugin-uglify';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import size from 'rollup-plugin-size';
import commonjs from '@rollup/plugin-commonjs';

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/g2-shape.min.js',
      name: 'G2Shape',
      format: 'umd',
      sourcemap: false,
      globals: {
        '@antv/g2': 'G2',
      },
    },
    external: ['@antv/g2'],
    plugins: [
      resolve(),
      typescript(),
      commonjs(),
      uglify(),
      size({}),
    ],
    watch: {
      include: 'src/**'
    }
  },
];
