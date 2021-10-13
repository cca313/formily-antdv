(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.index = global.index || {}, global.index.ts = {})));
})(this, (function (exports) { 'use strict';

	/*
	 * @Author: Gavin
	 * @Date: 2021-10-08 17:59:46
	 * @LastEditors: Gavin
	 * @LastEditTime: 2021-10-13 18:47:27
	 * @FilePath: \formily-antdv\packages\index.ts
	 * @Descriptions: todo
	 */
	var version = "1.0.0";
	// export * from "./input";
	// export * from "./preview-text";

	exports.version = version;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
