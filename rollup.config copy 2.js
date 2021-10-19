/*
 * @Author: Gavin
 * @Date: 2021-10-08 17:59:22
 * @LastEditors: Gavin
 * @LastEditTime: 2021-10-13 18:36:31
 * @FilePath: \formily-antdv\rollup.config.js
 * @Descriptions: todo
 */
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript";
import json from "@rollup/plugin-json";
import pkg from "./package.json";

export default {
  // input: "packages/index.ts",
  // output: [
  //   {
  //     file: "lib/index.cjs.js",
  //     format: "cjs",
  //   },
  //   {
  //     file: "lib/index.esm.js",
  //     format: "es",
  //   },
  // ],
  input: "packages/index.ts", // 打包入口
  output: {
    // 打包出口
    file: pkg.browser, // 最终打包出来的文件路径和文件名，这里是在package.json的browser: 'dist/index.js'字段中配置的
    format: "umd", // umd是兼容amd/cjs/iife的通用打包格式，适合浏览器
    name: "index.ts",
  },
  plugins: [
    json(),
    resolve(),
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    }),
  ],
};
