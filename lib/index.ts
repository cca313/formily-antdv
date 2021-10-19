(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.index = global.index || {}, global.index.js = {})));
})(this, (function (exports) { 'use strict';

    var isType$2 = function (type) {
        return function (obj) {
            return getType(obj) === "[object " + type + "]";
        };
    };
    var getType = function (obj) { return Object.prototype.toString.call(obj); };
    var isFn$2 = function (val) { return typeof val === 'function'; };
    var isArr$2 = Array.isArray;
    var isPlainObj$1 = isType$2('Object');
    var isStr$1 = isType$2('String');
    var isBool = isType$2('Boolean');
    var isNum$1 = isType$2('Number');
    var isNumberLike$1 = function (index) {
        return isNum$1(index) || /^\d+$/.test(index);
    };
    var isObj$1 = function (val) { return typeof val === 'object'; };

    var toArr$1 = function (val) { return (isArr$2(val) ? val : val ? [val] : []); };
    function each(val, iterator, revert) {
        if (isArr$2(val) || isStr$1(val)) {
            if (revert) {
                for (var i = val.length - 1; i >= 0; i--) {
                    if (iterator(val[i], i) === false) {
                        return;
                    }
                }
            }
            else {
                for (var i = 0; i < val.length; i++) {
                    if (iterator(val[i], i) === false) {
                        return;
                    }
                }
            }
        }
        else if (isObj$1(val)) {
            var key = void 0;
            for (key in val) {
                if (Object.hasOwnProperty.call(val, key)) {
                    if (iterator(val[key], key) === false) {
                        return;
                    }
                }
            }
        }
    }
    function map$1(val, iterator, revert) {
        var res = isArr$2(val) || isStr$1(val) ? [] : {};
        each(val, function (item, key) {
            var value = iterator(item, key);
            if (isArr$2(res)) {
                res.push(value);
            }
            else {
                res[key] = value;
            }
        }, revert);
        return res;
    }
    function reduce(val, iterator, accumulator, revert) {
        var result = accumulator;
        each(val, function (item, key) {
            result = iterator(result, item, key);
        }, revert);
        return result;
    }

    /* istanbul ignore next */
    function globalSelf() {
        try {
            if (typeof self !== 'undefined') {
                return self;
            }
        }
        catch (e) { }
        try {
            if (typeof window !== 'undefined') {
                return window;
            }
        }
        catch (e) { }
        try {
            if (typeof global !== 'undefined') {
                return global;
            }
        }
        catch (e) { }
        return Function('return this')();
    }
    var globalThisPolyfill = globalSelf();

    var instOf = function (value, cls) {
        if (isFn$2(cls))
            return value instanceof cls;
        if (isStr$1(cls))
            return globalThisPolyfill[cls]
                ? value instanceof globalThisPolyfill[cls]
                : false;
        return false;
    };

    var isArray$3 = isArr$2;
    var keyList$1 = Object.keys;
    var hasProp$2 = Object.prototype.hasOwnProperty;
    /* eslint-disable */
    function equal(a, b) {
        // fast-deep-equal index.js 2.0.1
        if (a === b) {
            return true;
        }
        if (a && b && typeof a === 'object' && typeof b === 'object') {
            var arrA = isArray$3(a);
            var arrB = isArray$3(b);
            var i = void 0;
            var length_1;
            var key = void 0;
            if (arrA && arrB) {
                length_1 = a.length;
                if (length_1 !== b.length) {
                    return false;
                }
                for (i = length_1; i-- !== 0;) {
                    if (!equal(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            if (arrA !== arrB) {
                return false;
            }
            var momentA = a && a._isAMomentObject;
            var momentB = b && b._isAMomentObject;
            if (momentA !== momentB)
                return false;
            if (momentA && momentB)
                return a.isSame(b);
            var immutableA = a && a.toJS;
            var immutableB = b && b.toJS;
            if (immutableA !== immutableB)
                return false;
            if (immutableA)
                return a.is ? a.is(b) : a === b;
            var dateA = instOf(a, 'Date');
            var dateB = instOf(b, 'Date');
            if (dateA !== dateB) {
                return false;
            }
            if (dateA && dateB) {
                return a.getTime() === b.getTime();
            }
            var regexpA = instOf(a, 'RegExp');
            var regexpB = instOf(b, 'RegExp');
            if (regexpA !== regexpB) {
                return false;
            }
            if (regexpA && regexpB) {
                return a.toString() === b.toString();
            }
            var urlA = instOf(a, 'URL');
            var urlB = instOf(b, 'URL');
            if (urlA !== urlB) {
                return false;
            }
            if (urlA && urlB) {
                return a.href === b.href;
            }
            var schemaA = a && a.toJSON;
            var schemaB = b && b.toJSON;
            if (schemaA !== schemaB)
                return false;
            if (schemaA && schemaB)
                return equal(a.toJSON(), b.toJSON());
            var keys = keyList$1(a);
            length_1 = keys.length;
            if (length_1 !== keyList$1(b).length) {
                return false;
            }
            for (i = length_1; i-- !== 0;) {
                if (!hasProp$2.call(b, keys[i])) {
                    return false;
                }
            }
            // end fast-deep-equal
            // Custom handling for React
            for (i = length_1; i-- !== 0;) {
                key = keys[i];
                if (key === '_owner' && a.$$typeof) {
                    // React-specific: avoid traversing React elements' _owner.
                    //  _owner contains circular references
                    // and is not needed when comparing the actual elements (and not their owners)
                    // .$$typeof and ._store on just reasonable markers of a react element
                    continue;
                }
                else {
                    // all other properties should be traversed as usual
                    if (!equal(a[key], b[key])) {
                        return false;
                    }
                }
            }
            // fast-deep-equal index.js 2.0.1
            return true;
        }
        return a !== a && b !== b;
    }
    // end fast-deep-equal
    var isEqual$1 = function exportedEqual(a, b) {
        try {
            return equal(a, b);
        }
        catch (error) {
            /* istanbul ignore next */
            if ((error.message && error.message.match(/stack|recursion/i)) ||
                error.number === -2146828260) {
                // warn on circular references, don't crash
                // browsers give this different errors name and messages:
                // chrome/safari: "RangeError", "Maximum call stack size exceeded"
                // firefox: "InternalError", too much recursion"
                // edge: "Error", "Out of stack space"
                console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
                return false;
            }
            // some other error. we should definitely know about these
            /* istanbul ignore next */
            throw error;
        }
    };

    var __assign$n = (undefined && undefined.__assign) || function () {
        __assign$n = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$n.apply(this, arguments);
    };
    var clone = function (values) {
        if (Array.isArray(values)) {
            var res_1 = [];
            values.forEach(function (item) {
                res_1.push(clone(item));
            });
            return res_1;
        }
        else if (isPlainObj$1(values)) {
            if ('$$typeof' in values && '_owner' in values) {
                return values;
            }
            if (values['_isAMomentObject']) {
                return values;
            }
            if (values['_isJSONSchemaObject']) {
                return values;
            }
            if (isFn$2(values['toJS'])) {
                return values['toJS']();
            }
            if (isFn$2(values['toJSON'])) {
                return values['toJSON']();
            }
            var res = {};
            for (var key in values) {
                if (Object.hasOwnProperty.call(values, key)) {
                    res[key] = clone(values[key]);
                }
            }
            return res;
        }
        else {
            return values;
        }
    };

    var has$2 = Object.prototype.hasOwnProperty;
    var toString$1 = Object.prototype.toString;
    var isValid$6 = function (val) { return val !== undefined && val !== null; };
    function isEmpty(val, strict) {
        if (strict === void 0) { strict = false; }
        // Null and Undefined...
        if (val == null) {
            return true;
        }
        // Booleans...
        if (typeof val === 'boolean') {
            return false;
        }
        // Numbers...
        if (typeof val === 'number') {
            return false;
        }
        // Strings...
        if (typeof val === 'string') {
            return val.length === 0;
        }
        // Functions...
        if (typeof val === 'function') {
            return val.length === 0;
        }
        // Arrays...
        if (Array.isArray(val)) {
            if (val.length === 0) {
                return true;
            }
            for (var i = 0; i < val.length; i++) {
                if (strict) {
                    if (val[i] !== undefined && val[i] !== null) {
                        return false;
                    }
                }
                else {
                    if (val[i] !== undefined &&
                        val[i] !== null &&
                        val[i] !== '' &&
                        val[i] !== 0) {
                        return false;
                    }
                }
            }
            return true;
        }
        // Errors...
        if (instOf(val, 'Error')) {
            return val.message === '';
        }
        // Objects...
        if (val.toString === toString$1) {
            switch (val.toString()) {
                // Maps, Sets, Files and Errors...
                case '[object File]':
                case '[object Map]':
                case '[object Set]': {
                    return val.size === 0;
                }
                // Plain objects...
                case '[object Object]': {
                    for (var key in val) {
                        if (has$2.call(val, key)) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        }
        // Anything else...
        return false;
    }

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    var __assign$m = function() {
        __assign$m = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign$m.apply(this, arguments);
    };

    /**
     * Source: ftp://ftp.unicode.org/Public/UCD/latest/ucd/SpecialCasing.txt
     */
    /**
     * Lower case as a function.
     */
    function lowerCase(str) {
        return str.toLowerCase();
    }

    // Support camel case ("camelCase" -> "camel Case" and "CAMELCase" -> "CAMEL Case").
    var DEFAULT_SPLIT_REGEXP = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g];
    // Remove all non-word characters.
    var DEFAULT_STRIP_REGEXP = /[^A-Z0-9]+/gi;
    /**
     * Normalize the string into something other libraries can manipulate easier.
     */
    function noCase(input, options) {
        if (options === void 0) { options = {}; }
        var _a = options.splitRegexp, splitRegexp = _a === void 0 ? DEFAULT_SPLIT_REGEXP : _a, _b = options.stripRegexp, stripRegexp = _b === void 0 ? DEFAULT_STRIP_REGEXP : _b, _c = options.transform, transform = _c === void 0 ? lowerCase : _c, _d = options.delimiter, delimiter = _d === void 0 ? " " : _d;
        var result = replace(replace(input, splitRegexp, "$1\0$2"), stripRegexp, "\0");
        var start = 0;
        var end = result.length;
        // Trim the delimiter from around the output string.
        while (result.charAt(start) === "\0")
            start++;
        while (result.charAt(end - 1) === "\0")
            end--;
        // Transform each token independently.
        return result.slice(start, end).split("\0").map(transform).join(delimiter);
    }
    /**
     * Replace `re` in the input string with the replacement value.
     */
    function replace(input, re, value) {
        if (re instanceof RegExp)
            return input.replace(re, value);
        return re.reduce(function (input, re) { return input.replace(re, value); }, input);
    }

    function pascalCaseTransform(input, index) {
        var firstChar = input.charAt(0);
        var lowerChars = input.substr(1).toLowerCase();
        if (index > 0 && firstChar >= "0" && firstChar <= "9") {
            return "_" + firstChar + lowerChars;
        }
        return "" + firstChar.toUpperCase() + lowerChars;
    }
    function pascalCase(input, options) {
        if (options === void 0) { options = {}; }
        return noCase(input, __assign$m({ delimiter: "", transform: pascalCaseTransform }, options));
    }

    // ansiRegex
    var ansiRegex = function () {
        var pattern = [
            '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
            '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
        ].join('|');
        return new RegExp(pattern, 'g');
    };
    // astralRegex
    var regex = '[\uD800-\uDBFF][\uDC00-\uDFFF]';
    var astralRegex = function (opts) {
        return opts && opts.exact ? new RegExp("^" + regex + "$") : new RegExp(regex, 'g');
    };
    // stripAnsi
    var stripAnsi = function (input) {
        return typeof input === 'string' ? input.replace(ansiRegex(), '') : input;
    };
    var stringLength = function (input) {
        return stripAnsi(input).replace(astralRegex(), ' ').length;
    };

    var __assign$l = (undefined && undefined.__assign) || function () {
        __assign$l = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$l.apply(this, arguments);
    };
    var ContextType = function (flag, props) {
        return __assign$l({ flag: flag }, props);
    };
    var bracketContext = ContextType('[]');
    var bracketArrayContext = ContextType('[\\d]');
    var bracketDContext = ContextType('[[]]');
    var parenContext = ContextType('()');
    var braceContext = ContextType('{}');
    var destructorContext = ContextType('{x}');

    var __assign$k = (undefined && undefined.__assign) || function () {
        __assign$k = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$k.apply(this, arguments);
    };
    var TokenType = function (flag, props) {
        return __assign$k({ flag: flag }, props);
    };
    var nameTok = TokenType('name', {
        expectNext: function (next) {
            if (this.includesContext(destructorContext)) {
                return (next === nameTok ||
                    next === commaTok ||
                    next === bracketRTok ||
                    next === braceRTok ||
                    next === colonTok);
            }
            return (next === dotTok ||
                next === commaTok ||
                next === eofTok ||
                next === bracketRTok ||
                next === parenRTok ||
                next === colonTok ||
                next === expandTok ||
                next === bracketLTok);
        },
    });
    var starTok = TokenType('*', {
        expectNext: function (next) {
            return (next === dotTok ||
                next === parenLTok ||
                next === bracketLTok ||
                next === eofTok ||
                next === commaTok ||
                next === parenRTok);
        },
    });
    var dbStarTok = TokenType('**', {
        expectNext: function (next) {
            return (next === dotTok ||
                next === parenLTok ||
                next === bracketLTok ||
                next === eofTok ||
                next === commaTok ||
                next === parenRTok);
        },
    });
    var dotTok = TokenType('.', {
        expectNext: function (next) {
            return (next === dotTok ||
                next === nameTok ||
                next === bracketDLTok ||
                next === starTok ||
                next === dbStarTok ||
                next === bracketLTok ||
                next === braceLTok ||
                next === eofTok);
        },
        expectPrev: function (prev) {
            return (prev === dotTok ||
                prev === nameTok ||
                prev === bracketDRTok ||
                prev === starTok ||
                prev === parenRTok ||
                prev === bracketRTok ||
                prev === expandTok ||
                prev === braceRTok);
        },
    });
    var bangTok = TokenType('!', {
        expectNext: function (next) {
            return next === nameTok || next === bracketDLTok;
        },
    });
    var colonTok = TokenType(':', {
        expectNext: function (next) {
            if (this.includesContext(destructorContext)) {
                return next === nameTok || next === braceLTok || next === bracketLTok;
            }
            return next === nameTok || next === bracketDLTok || next === bracketRTok;
        },
    });
    var braceLTok = TokenType('{', {
        expectNext: function (next) {
            return next === nameTok;
        },
        expectPrev: function (prev) {
            if (this.includesContext(destructorContext)) {
                return prev === colonTok || prev === commaTok || prev === bracketLTok;
            }
            return prev === dotTok || prev === colonTok || prev === parenLTok;
        },
        updateContext: function () {
            this.state.context.push(braceContext);
        },
    });
    var braceRTok = TokenType('}', {
        expectNext: function (next) {
            if (this.includesContext(destructorContext)) {
                return (next === commaTok ||
                    next === braceRTok ||
                    next === eofTok ||
                    next === bracketRTok);
            }
            return next === dotTok || next === eofTok || next === commaTok;
        },
        expectPrev: function (prev) {
            return prev === nameTok || prev === braceRTok || prev === bracketRTok;
        },
        updateContext: function () {
            this.state.context.pop(braceContext);
        },
    });
    var bracketLTok = TokenType('[', {
        expectNext: function (next) {
            if (this.includesContext(destructorContext)) {
                return (next === nameTok ||
                    next === bracketLTok ||
                    next === braceLTok ||
                    next === bracketRTok);
            }
            return (next === nameTok ||
                next === bracketDLTok ||
                next === colonTok ||
                next === bracketLTok ||
                next === ignoreTok ||
                next === bracketRTok);
        },
        expectPrev: function (prev) {
            if (this.includesContext(destructorContext)) {
                return prev === colonTok || prev === commaTok || prev === bracketLTok;
            }
            return (prev === starTok ||
                prev === bracketLTok ||
                prev === dotTok ||
                prev === nameTok ||
                prev === parenLTok ||
                prev == commaTok);
        },
        updateContext: function () {
            this.state.context.push(bracketContext);
        },
    });
    var bracketRTok = TokenType(']', {
        expectNext: function (next) {
            if (this.includesContext(destructorContext)) {
                return (next === commaTok ||
                    next === braceRTok ||
                    next === bracketRTok ||
                    next === eofTok);
            }
            return (next === dotTok ||
                next === eofTok ||
                next === commaTok ||
                next === parenRTok ||
                next === bracketRTok);
        },
        updateContext: function () {
            if (this.includesContext(bracketArrayContext))
                return;
            if (!this.includesContext(bracketContext))
                throw this.unexpect();
            this.state.context.pop();
        },
    });
    var bracketDLTok = TokenType('[[', {
        updateContext: function () {
            this.state.context.push(bracketDContext);
        },
    });
    var bracketDRTok = TokenType(']]', {
        updateContext: function () {
            if (this.curContext() !== bracketDContext)
                throw this.unexpect();
            this.state.context.pop();
        },
    });
    var parenLTok = TokenType('(', {
        expectNext: function (next) {
            return (next === nameTok ||
                next === bracketDLTok ||
                next === braceLTok ||
                next === bangTok ||
                next === bracketLTok);
        },
        expectPrev: function (prev) {
            return prev === starTok;
        },
        updateContext: function () {
            this.state.context.push(parenContext);
        },
    });
    var parenRTok = TokenType(')', {
        expectNext: function (next) {
            return (next === dotTok ||
                next === eofTok ||
                next === commaTok ||
                next === parenRTok);
        },
        updateContext: function () {
            if (this.curContext() !== parenContext)
                throw this.unexpect();
            this.state.context.pop();
        },
    });
    var commaTok = TokenType(',', {
        expectNext: function (next) {
            return (next === nameTok ||
                next === bracketDLTok ||
                next === bracketLTok ||
                next === braceLTok);
        },
    });
    var ignoreTok = TokenType('ignore', {
        expectNext: function (next) {
            return next === bracketDRTok;
        },
        expectPrev: function (prev) {
            return prev == bracketDLTok;
        },
    });
    var expandTok = TokenType('expandTok', {
        expectNext: function (next) {
            return (next === dotTok ||
                next === eofTok ||
                next === commaTok ||
                next === parenRTok);
        },
    });
    var eofTok = TokenType('eof');

    var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
    var fullCharCodeAtPos = function (input, pos) {
        if (String.fromCharCode)
            return input.codePointAt(pos);
        var code = input.charCodeAt(pos);
        if (code <= 0xd7ff || code >= 0xe000)
            return code;
        var next = input.charCodeAt(pos + 1);
        return (code << 10) + next - 0x35fdc00;
    };
    var isRewordCode = function (code) {
        return code === 42 ||
            code === 46 ||
            code === 33 ||
            code === 91 ||
            code === 93 ||
            code === 40 ||
            code === 41 ||
            code === 44 ||
            code === 58 ||
            code === 126 ||
            code === 123 ||
            code === 125;
    };
    var getError = function (message, props) {
        var err = new Error(message);
        Object.assign(err, props);
        return err;
    };
    var slice = function (string, start, end) {
        var str = '';
        for (var i = start; i < end; i++) {
            var ch = string.charAt(i);
            if (ch !== '\\') {
                str += ch;
            }
        }
        return str;
    };
    var Tokenizer = /** @class */ (function () {
        function Tokenizer(input) {
            this.input = input;
            this.state = {
                context: [],
                type: null,
                pos: 0,
            };
            this.type_ = null;
        }
        Tokenizer.prototype.curContext = function () {
            return this.state.context[this.state.context.length - 1];
        };
        Tokenizer.prototype.includesContext = function (context) {
            for (var len = this.state.context.length - 1; len >= 0; len--) {
                if (this.state.context[len] === context) {
                    return true;
                }
            }
            return false;
        };
        Tokenizer.prototype.unexpect = function (type) {
            type = type || this.state.type;
            return getError("Unexpect token \"" + type.flag + "\" in " + this.state.pos + " char.", {
                pos: this.state.pos,
            });
        };
        Tokenizer.prototype.expectNext = function (type, next) {
            if (type && type.expectNext) {
                if (next && !type.expectNext.call(this, next)) {
                    throw getError("Unexpect token \"" + next.flag + "\" token should not be behind \"" + type.flag + "\" token.(" + this.state.pos + "th char)", {
                        pos: this.state.pos,
                    });
                }
            }
        };
        Tokenizer.prototype.expectPrev = function (type, prev) {
            if (type && type.expectPrev) {
                if (prev && !type.expectPrev.call(this, prev)) {
                    throw getError("Unexpect token \"" + type.flag + "\" should not be behind \"" + prev.flag + "\"(" + this.state.pos + "th char).", {
                        pos: this.state.pos,
                    });
                }
            }
        };
        Tokenizer.prototype.match = function (type) {
            return this.state.type === type;
        };
        Tokenizer.prototype.skipSpace = function () {
            if (this.curContext() === bracketDContext)
                return;
            loop: while (this.state.pos < this.input.length) {
                var ch = this.input.charCodeAt(this.state.pos);
                switch (ch) {
                    case 32:
                    case 160:
                        ++this.state.pos;
                        break;
                    case 13:
                        if (this.input.charCodeAt(this.state.pos + 1) === 10) {
                            ++this.state.pos;
                        }
                    case 10:
                    case 8232:
                    case 8233:
                        ++this.state.pos;
                        break;
                    default:
                        if ((ch > 8 && ch < 14) ||
                            (ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))) {
                            ++this.state.pos;
                        }
                        else {
                            break loop;
                        }
                }
            }
        };
        Tokenizer.prototype.next = function () {
            this.type_ = this.state.type;
            if (this.input.length <= this.state.pos) {
                return this.finishToken(eofTok);
            }
            this.skipSpace();
            this.readToken(this.getCode(), this.state.pos > 0 ? this.getCode(this.state.pos - 1) : -Infinity);
        };
        Tokenizer.prototype.getCode = function (pos) {
            if (pos === void 0) { pos = this.state.pos; }
            return fullCharCodeAtPos(this.input, pos);
        };
        Tokenizer.prototype.eat = function (type) {
            if (this.match(type)) {
                this.next();
                return true;
            }
            else {
                return false;
            }
        };
        Tokenizer.prototype.readKeyWord = function () {
            var startPos = this.state.pos, string = '';
            while (true) {
                var code = this.getCode();
                var prevCode = this.getCode(this.state.pos - 1);
                if (this.input.length === this.state.pos) {
                    string = slice(this.input, startPos, this.state.pos + 1);
                    break;
                }
                if (!isRewordCode(code) || prevCode === 92) {
                    if (code === 32 ||
                        code === 160 ||
                        code === 10 ||
                        code === 8232 ||
                        code === 8233) {
                        string = slice(this.input, startPos, this.state.pos);
                        break;
                    }
                    if (code === 13 && this.input.charCodeAt(this.state.pos + 1) === 10) {
                        string = slice(this.input, startPos, this.state.pos);
                        break;
                    }
                    if ((code > 8 && code < 14) ||
                        (code >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(code)))) {
                        string = slice(this.input, startPos, this.state.pos);
                        break;
                    }
                    this.state.pos++;
                }
                else {
                    string = slice(this.input, startPos, this.state.pos);
                    break;
                }
            }
            this.finishToken(nameTok, string);
        };
        Tokenizer.prototype.readIngoreString = function () {
            var startPos = this.state.pos, prevCode, string = '';
            while (true) {
                var code = this.getCode();
                if (this.state.pos >= this.input.length)
                    break;
                if ((code === 91 || code === 93) && prevCode === 92) {
                    this.state.pos++;
                    prevCode = '';
                }
                else if (code == 93 && prevCode === 93) {
                    string = this.input
                        .slice(startPos, this.state.pos - 1)
                        .replace(/\\([\[\]])/g, '$1');
                    this.state.pos++;
                    break;
                }
                else {
                    this.state.pos++;
                    prevCode = code;
                }
            }
            this.finishToken(ignoreTok, string);
            this.finishToken(bracketDRTok);
        };
        Tokenizer.prototype.finishToken = function (type, value) {
            var preType = this.state.type;
            this.state.type = type;
            if (value !== undefined)
                this.state.value = value;
            this.expectNext(preType, type);
            this.expectPrev(type, preType);
            if (type.updateContext) {
                type.updateContext.call(this, preType);
            }
        };
        Tokenizer.prototype.readToken = function (code, prevCode) {
            if (prevCode === 92) {
                return this.readKeyWord();
            }
            if (this.input.length <= this.state.pos) {
                this.finishToken(eofTok);
            }
            else if (this.curContext() === bracketDContext) {
                this.readIngoreString();
            }
            else if (code === 123) {
                this.state.pos++;
                this.finishToken(braceLTok);
            }
            else if (code === 125) {
                this.state.pos++;
                this.finishToken(braceRTok);
            }
            else if (code === 42) {
                this.state.pos++;
                if (this.getCode() === 42) {
                    this.state.pos++;
                    return this.finishToken(dbStarTok);
                }
                this.finishToken(starTok);
            }
            else if (code === 33) {
                this.state.pos++;
                this.finishToken(bangTok);
            }
            else if (code === 46) {
                this.state.pos++;
                this.finishToken(dotTok);
            }
            else if (code === 91) {
                this.state.pos++;
                if (this.getCode() === 91) {
                    this.state.pos++;
                    return this.finishToken(bracketDLTok);
                }
                this.finishToken(bracketLTok);
            }
            else if (code === 126) {
                this.state.pos++;
                this.finishToken(expandTok);
            }
            else if (code === 93) {
                this.state.pos++;
                this.finishToken(bracketRTok);
            }
            else if (code === 40) {
                this.state.pos++;
                this.finishToken(parenLTok);
            }
            else if (code === 41) {
                this.state.pos++;
                this.finishToken(parenRTok);
            }
            else if (code === 44) {
                this.state.pos++;
                this.finishToken(commaTok);
            }
            else if (code === 58) {
                this.state.pos++;
                this.finishToken(colonTok);
            }
            else {
                this.readKeyWord();
            }
        };
        return Tokenizer;
    }());

    var isType$1 = function (type) {
        return function (obj) {
            return obj && obj.type === type;
        };
    };
    var isIdentifier = isType$1('Identifier');
    var isIgnoreExpression = isType$1('IgnoreExpression');
    var isDotOperator = isType$1('DotOperator');
    var isWildcardOperator = isType$1('WildcardOperator');
    var isExpandOperator = isType$1('ExpandOperator');
    var isGroupExpression = isType$1('GroupExpression');
    var isRangeExpression = isType$1('RangeExpression');
    var isDestructorExpression = isType$1('DestructorExpression');
    var isObjectPattern = isType$1('ObjectPattern');
    var isArrayPattern = isType$1('ArrayPattern');

    var toString = Object.prototype.toString;
    var isType = function (type) {
        return function (obj) {
            return toString.call(obj) === "[object " + type + "]";
        };
    };
    var isFn$1 = isType('Function');
    var isArr$1 = Array.isArray || isType('Array');
    var isStr = isType('String');
    var isNum = isType('Number');
    var isObj = function (val) { return typeof val === 'object'; };
    var isRegExp = isType('RegExp');
    var isNumberLike = function (t) {
        return isNum(t) || /^(\d+)(\.\d+)?$/.test(t);
    };
    var isArray$2 = isArr$1;
    var keyList = Object.keys;
    var hasProp$1 = Object.prototype.hasOwnProperty;
    var toArr = function (val) {
        return Array.isArray(val) ? val : val !== undefined ? [val] : [];
    };
    var isEqual = function (a, b) {
        if (a === b) {
            return true;
        }
        if (a && b && typeof a === 'object' && typeof b === 'object') {
            var arrA = isArray$2(a);
            var arrB = isArray$2(b);
            var i = void 0;
            var length_1;
            var key = void 0;
            if (arrA && arrB) {
                length_1 = a.length;
                if (length_1 !== b.length) {
                    return false;
                }
                for (i = length_1; i-- !== 0;) {
                    if (!isEqual(a[i], b[i])) {
                        return false;
                    }
                }
                return true;
            }
            if (arrA !== arrB) {
                return false;
            }
            var keys = keyList(a);
            length_1 = keys.length;
            if (length_1 !== keyList(b).length) {
                return false;
            }
            for (i = length_1; i-- !== 0;) {
                if (!hasProp$1.call(b, keys[i])) {
                    return false;
                }
            }
            for (i = length_1; i-- !== 0;) {
                key = keys[i];
                if (!isEqual(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        }
        return a !== a && b !== b;
    };
    var isSegmentEqual = function (a, b) {
        a = typeof a === 'symbol' ? a : "" + a;
        b = typeof b === 'symbol' ? b : "" + b;
        return a === b;
    };

    var DestructorCache = new Map();
    var isValid$5 = function (val) { return val !== undefined && val !== null; };
    var getDestructor = function (source) {
        return DestructorCache.get(source);
    };
    var setDestructor = function (source, rules) {
        DestructorCache.set(source, rules);
    };
    var parseDestructorRules = function (node) {
        var rules = [];
        if (isObjectPattern(node)) {
            var index_1 = 0;
            node.properties.forEach(function (child) {
                rules[index_1] = {
                    path: [],
                };
                rules[index_1].key = child.key.value;
                rules[index_1].path.push(child.key.value);
                if (isIdentifier(child.value)) {
                    rules[index_1].key = child.value.value;
                }
                var basePath = rules[index_1].path;
                var childRules = parseDestructorRules(child.value);
                var k = index_1;
                childRules.forEach(function (rule) {
                    if (rules[k]) {
                        rules[k].key = rule.key;
                        rules[k].path = basePath.concat(rule.path);
                    }
                    else {
                        rules[k] = {
                            key: rule.key,
                            path: basePath.concat(rule.path),
                        };
                    }
                    k++;
                });
                if (k > index_1) {
                    index_1 = k;
                }
                else {
                    index_1++;
                }
            });
            return rules;
        }
        else if (isArrayPattern(node)) {
            var index_2 = 0;
            node.elements.forEach(function (child, key) {
                rules[index_2] = {
                    path: [],
                };
                rules[index_2].key = key;
                rules[index_2].path.push(key);
                if (isIdentifier(child)) {
                    rules[index_2].key = child.value;
                }
                var basePath = rules[index_2].path;
                var childRules = parseDestructorRules(child);
                var k = index_2;
                childRules.forEach(function (rule) {
                    if (rules[k]) {
                        rules[k].key = rule.key;
                        rules[k].path = basePath.concat(rule.path);
                    }
                    else {
                        rules[k] = {
                            key: rule.key,
                            path: basePath.concat(rule.path),
                        };
                    }
                    k++;
                });
                if (k > index_2) {
                    index_2 = k;
                }
                else {
                    index_2++;
                }
            });
            return rules;
        }
        if (isDestructorExpression(node)) {
            return parseDestructorRules(node.value);
        }
        return rules;
    };
    var setInByDestructor = function (source, rules, value, mutators) {
        rules.forEach(function (_a) {
            var key = _a.key, path = _a.path;
            mutators.setIn([key], source, mutators.getIn(path, value));
        });
    };
    var getInByDestructor = function (source, rules, mutators) {
        var response = {};
        if (rules.length) {
            if (isNum(rules[0].path[0])) {
                response = [];
            }
        }
        source = isValid$5(source) ? source : {};
        rules.forEach(function (_a) {
            var key = _a.key, path = _a.path;
            mutators.setIn(path, response, source[key]);
        });
        return response;
    };
    var deleteInByDestructor = function (source, rules, mutators) {
        rules.forEach(function (_a) {
            var key = _a.key;
            mutators.deleteIn([key], source);
        });
    };
    var existInByDestructor = function (source, rules, start, mutators) {
        return rules.every(function (_a) {
            var key = _a.key;
            return mutators.existIn([key], source, start);
        });
    };

    var __extends$5 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var createTreeBySegments = function (segments, afterNode) {
        if (segments === void 0) { segments = []; }
        var segLen = segments.length;
        var build = function (start) {
            if (start === void 0) { start = 0; }
            var after = start < segLen - 1 ? build(start + 1) : afterNode;
            var dot = after && {
                type: 'DotOperator',
                after: after,
            };
            return {
                type: 'Identifier',
                value: segments[start],
                after: dot,
            };
        };
        return build();
    };
    var calculate = function (a, b, operator) {
        if (isNumberLike(a) && isNumberLike(b)) {
            if (operator === '+')
                return String(Number(a) + Number(b));
            if (operator === '-')
                return String(Number(a) - Number(b));
            if (operator === '*')
                return String(Number(a) * Number(b));
            if (operator === '/')
                return String(Number(a) / Number(b));
        }
        else {
            if (operator === '+')
                return String(a) + String(b);
            if (operator === '-')
                return 'NaN';
            if (operator === '*')
                return 'NaN';
            if (operator === '/')
                return 'NaN';
        }
        return String(Number(b));
    };
    var Parser = /** @class */ (function (_super) {
        __extends$5(Parser, _super);
        function Parser(input, base) {
            var _this = _super.call(this, input) || this;
            _this.base = base;
            return _this;
        }
        Parser.prototype.parse = function () {
            var node;
            this.data = {
                segments: [],
            };
            if (!this.eat(eofTok)) {
                this.next();
                node = this.parseAtom(this.state.type);
            }
            this.data.tree = node;
            return node;
        };
        Parser.prototype.append = function (parent, node) {
            if (parent && node) {
                parent.after = node;
            }
        };
        Parser.prototype.parseAtom = function (type) {
            switch (type) {
                case braceLTok:
                case bracketLTok:
                    if (this.includesContext(destructorContext)) {
                        if (type === braceLTok) {
                            return this.parseObjectPattern();
                        }
                        else {
                            return this.parseArrayPattern();
                        }
                    }
                    return this.parseDestructorExpression();
                case nameTok:
                    return this.parseIdentifier();
                case expandTok:
                    return this.parseExpandOperator();
                case dbStarTok:
                case starTok:
                    return this.parseWildcardOperator();
                case bracketDLTok:
                    return this.parseIgnoreExpression();
                case dotTok:
                    return this.parseDotOperator();
            }
        };
        Parser.prototype.pushSegments = function (key) {
            this.data.segments.push(key);
        };
        Parser.prototype.parseIdentifier = function () {
            var node = {
                type: 'Identifier',
                value: this.state.value,
            };
            var hasNotInDestructor = !this.includesContext(destructorContext) &&
                !this.isMatchPattern &&
                !this.isWildMatchPattern;
            this.next();
            if (this.includesContext(bracketArrayContext)) {
                if (this.state.type !== bracketRTok) {
                    throw this.unexpect();
                }
                else {
                    this.state.context.pop();
                    this.next();
                }
            }
            else if (hasNotInDestructor) {
                this.pushSegments(node.value);
            }
            if (this.state.type === bracketLTok) {
                this.next();
                if (this.state.type !== nameTok) {
                    throw this.unexpect();
                }
                this.state.context.push(bracketArrayContext);
                var isNumberKey = false;
                if (/^\d+$/.test(this.state.value)) {
                    isNumberKey = true;
                }
                var value = this.state.value;
                this.pushSegments(isNumberKey ? Number(value) : value);
                var after = this.parseAtom(this.state.type);
                if (isNumberKey) {
                    after.arrayIndex = true;
                }
                this.append(node, after);
            }
            else {
                this.append(node, this.parseAtom(this.state.type));
            }
            return node;
        };
        Parser.prototype.parseExpandOperator = function () {
            var node = {
                type: 'ExpandOperator',
            };
            this.isMatchPattern = true;
            this.isWildMatchPattern = true;
            this.data.segments = [];
            this.next();
            this.append(node, this.parseAtom(this.state.type));
            return node;
        };
        Parser.prototype.parseWildcardOperator = function () {
            var node = {
                type: 'WildcardOperator',
            };
            if (this.state.type === dbStarTok) {
                node.optional = true;
            }
            this.isMatchPattern = true;
            this.isWildMatchPattern = true;
            this.data.segments = [];
            this.next();
            if (this.state.type === parenLTok) {
                node.filter = this.parseGroupExpression(node);
            }
            else if (this.state.type === bracketLTok) {
                node.filter = this.parseRangeExpression(node);
            }
            this.append(node, this.parseAtom(this.state.type));
            return node;
        };
        Parser.prototype.parseDestructorExpression = function () {
            var _this = this;
            var node = {
                type: 'DestructorExpression',
            };
            this.state.context.push(destructorContext);
            var startPos = this.state.pos - 1;
            node.value =
                this.state.type === braceLTok
                    ? this.parseObjectPattern()
                    : this.parseArrayPattern();
            var endPos = this.state.pos;
            this.state.context.pop();
            node.source = this.input
                .substring(startPos, endPos)
                .replace(/\[\s*([\+\-\*\/])?\s*([^,\]\s]*)\s*\]/, function (match, operator, target) {
                if (_this.relative !== undefined) {
                    if (operator) {
                        if (target) {
                            return calculate(_this.relative, target, operator);
                        }
                        else {
                            return calculate(_this.relative, 1, operator);
                        }
                    }
                    else {
                        if (target) {
                            return calculate(_this.relative, target, '+');
                        }
                        else {
                            return String(_this.relative);
                        }
                    }
                }
                return match;
            })
                .replace(/\s*\.\s*/g, '')
                .replace(/\s*/g, '');
            if (this.relative === undefined) {
                setDestructor(node.source, parseDestructorRules(node));
            }
            this.relative = undefined;
            this.pushSegments(node.source);
            this.next();
            this.append(node, this.parseAtom(this.state.type));
            return node;
        };
        Parser.prototype.parseArrayPattern = function () {
            var node = {
                type: 'ArrayPattern',
                elements: [],
            };
            this.next();
            node.elements = this.parseArrayPatternElements();
            return node;
        };
        Parser.prototype.parseArrayPatternElements = function () {
            var nodes = [];
            while (this.state.type !== bracketRTok && this.state.type !== eofTok) {
                nodes.push(this.parseAtom(this.state.type));
                if (this.state.type === bracketRTok) {
                    if (this.includesContext(destructorContext)) {
                        this.next();
                    }
                    return nodes;
                }
                this.next();
            }
            return nodes;
        };
        Parser.prototype.parseObjectPattern = function () {
            var node = {
                type: 'ObjectPattern',
                properties: [],
            };
            this.next();
            node.properties = this.parseObjectProperties();
            return node;
        };
        Parser.prototype.parseObjectProperties = function () {
            var nodes = [];
            while (this.state.type !== braceRTok && this.state.type !== eofTok) {
                var node = {
                    type: 'ObjectPatternProperty',
                    key: this.parseAtom(this.state.type),
                };
                nodes.push(node);
                if (this.state.type === colonTok) {
                    this.next();
                    node.value = this.parseAtom(this.state.type);
                }
                if (this.state.type === braceRTok) {
                    if (this.includesContext(destructorContext)) {
                        this.next();
                    }
                    return nodes;
                }
                this.next();
            }
            return nodes;
        };
        Parser.prototype.parseDotOperator = function () {
            var node = {
                type: 'DotOperator',
            };
            var prevToken = this.type_;
            if (!prevToken && this.base) {
                if (this.base.isMatchPattern) {
                    throw new Error('Base path must be an absolute path.');
                }
                this.data.segments = this.base.toArr();
                while (this.state.type === dotTok) {
                    this.relative = this.data.segments.pop();
                    this.next();
                }
                return createTreeBySegments(this.data.segments.slice(), this.parseAtom(this.state.type));
            }
            else {
                this.next();
            }
            this.append(node, this.parseAtom(this.state.type));
            return node;
        };
        Parser.prototype.parseIgnoreExpression = function () {
            this.next();
            var value = String(this.state.value).replace(/\s*/g, '');
            var node = {
                type: 'IgnoreExpression',
                value: value,
            };
            this.pushSegments(value);
            this.next();
            this.append(node, this.parseAtom(this.state.type));
            this.next();
            return node;
        };
        Parser.prototype.parseGroupExpression = function (parent) {
            var node = {
                type: 'GroupExpression',
                value: [],
            };
            this.isMatchPattern = true;
            this.data.segments = [];
            this.next();
            loop: while (true) {
                switch (this.state.type) {
                    case commaTok:
                        this.next();
                        break;
                    case bangTok:
                        node.isExclude = true;
                        this.haveExcludePattern = true;
                        this.next();
                        break;
                    case eofTok:
                        break loop;
                    case parenRTok:
                        break loop;
                    default:
                        node.value.push(this.parseAtom(this.state.type));
                }
            }
            this.next();
            this.append(parent, this.parseAtom(this.state.type));
            return node;
        };
        Parser.prototype.parseRangeExpression = function (parent) {
            var node = {
                type: 'RangeExpression',
            };
            this.next();
            this.isMatchPattern = true;
            this.data.segments = [];
            var start = false, hasColon = false;
            loop: while (true) {
                switch (this.state.type) {
                    case colonTok:
                        hasColon = true;
                        start = true;
                        this.next();
                        break;
                    case bracketRTok:
                        if (!hasColon && !node.end) {
                            node.end = node.start;
                        }
                        break loop;
                    case commaTok:
                        throw this.unexpect();
                    case eofTok:
                        break loop;
                    default:
                        if (!start) {
                            node.start = this.parseAtom(this.state.type);
                        }
                        else {
                            node.end = this.parseAtom(this.state.type);
                        }
                }
            }
            this.next();
            this.append(parent, this.parseAtom(this.state.type));
            return node;
        };
        return Parser;
    }(Tokenizer));

    var isValid$4 = function (val) { return val !== undefined && val !== null && val !== ''; };
    var Matcher = /** @class */ (function () {
        function Matcher(tree, record) {
            var _this = this;
            this.matchNext = function (node, path) {
                return node.after
                    ? _this.matchAtom(path, node.after)
                    : isValid$4(path[_this.pos]);
            };
            this.tree = tree;
            this.pos = 0;
            this.excluding = false;
            this.record = record;
            this.stack = [];
        }
        Matcher.prototype.currentElement = function (path) {
            return String(path[this.pos] || '').replace(/\s*/g, '');
        };
        Matcher.prototype.recordMatch = function (match) {
            var _this = this;
            return function () {
                var result = match();
                if (result) {
                    if (_this.record && _this.record.score !== undefined) {
                        _this.record.score++;
                    }
                }
                return result;
            };
        };
        Matcher.prototype.matchIdentifier = function (path, node) {
            var _this = this;
            this.tail = node;
            if (isValid$4(path[this.pos + 1]) && !node.after) {
                if (this.stack.length) {
                    for (var i = this.stack.length - 1; i >= 0; i--) {
                        if (!this.stack[i].after || !this.stack[i].filter) {
                            return false;
                        }
                    }
                }
                else {
                    return false;
                }
            }
            var current;
            var next = function () {
                return _this.matchNext(node, path);
            };
            if (isExpandOperator(node.after)) {
                current = this.recordMatch(function () {
                    return node.value === String(path[_this.pos]).substring(0, node.value.length);
                });
            }
            else {
                current = this.recordMatch(function () {
                    return isEqual(String(node.value), String(path[_this.pos]));
                });
            }
            if (this.excluding) {
                if (node.after) {
                    if (this.pos < path.length) {
                        return current() && next();
                    }
                    else {
                        if (node.after && isWildcardOperator(node.after.after)) {
                            return true;
                        }
                        return false;
                    }
                }
                else {
                    if (this.pos >= path.length) {
                        return true;
                    }
                    return current();
                }
            }
            return current() && next();
        };
        Matcher.prototype.matchIgnoreExpression = function (path, node) {
            return (isEqual(node.value, this.currentElement(path)) &&
                this.matchNext(node, path));
        };
        Matcher.prototype.matchDestructorExpression = function (path, node) {
            return (isEqual(node.source, this.currentElement(path)) &&
                this.matchNext(node, path));
        };
        Matcher.prototype.matchExpandOperator = function (path, node) {
            return this.matchAtom(path, node.after);
        };
        Matcher.prototype.matchWildcardOperator = function (path, node) {
            this.tail = node;
            this.stack.push(node);
            var matched = false;
            if (node.filter) {
                if (node.after) {
                    matched =
                        this.matchAtom(path, node.filter) && this.matchAtom(path, node.after);
                }
                else {
                    matched = this.matchAtom(path, node.filter);
                }
            }
            else if (node.optional) {
                matched = true;
            }
            else {
                matched = this.matchNext(node, path);
            }
            this.stack.pop();
            return matched;
        };
        Matcher.prototype.matchGroupExpression = function (path, node) {
            var _this = this;
            var current = this.pos;
            this.excluding = !!node.isExclude;
            var method = this.excluding ? 'every' : 'some';
            var result = toArr(node.value)[method](function (_node) {
                _this.pos = current;
                return _this.excluding
                    ? !_this.matchAtom(path, _node)
                    : _this.matchAtom(path, _node);
            });
            this.excluding = false;
            return result;
        };
        Matcher.prototype.matchRangeExpression = function (path, node) {
            if (node.start) {
                if (node.end) {
                    return (path[this.pos] >= parseInt(node.start.value) &&
                        path[this.pos] <= parseInt(node.end.value));
                }
                else {
                    return path[this.pos] >= parseInt(node.start.value);
                }
            }
            else {
                if (node.end) {
                    return path[this.pos] <= parseInt(node.end.value);
                }
                else {
                    return true;
                }
            }
        };
        Matcher.prototype.matchDotOperator = function (path, node) {
            this.pos++;
            return this.matchNext(node, path);
        };
        Matcher.prototype.matchAtom = function (path, node) {
            if (!node) {
                if (this.stack.length > 0)
                    return true;
                if (isValid$4(path[this.pos + 1]))
                    return false;
                if (this.pos == path.length - 1)
                    return true;
            }
            if (isIdentifier(node)) {
                return this.matchIdentifier(path, node);
            }
            else if (isIgnoreExpression(node)) {
                return this.matchIgnoreExpression(path, node);
            }
            else if (isDestructorExpression(node)) {
                return this.matchDestructorExpression(path, node);
            }
            else if (isExpandOperator(node)) {
                return this.matchExpandOperator(path, node);
            }
            else if (isWildcardOperator(node)) {
                return this.matchWildcardOperator(path, node);
            }
            else if (isGroupExpression(node)) {
                return this.matchGroupExpression(path, node);
            }
            else if (isRangeExpression(node)) {
                return this.matchRangeExpression(path, node);
            }
            else if (isDotOperator(node)) {
                return this.matchDotOperator(path, node);
            }
            return true;
        };
        Matcher.prototype.match = function (path) {
            var matched = this.matchAtom(path, this.tree);
            if (!this.tail)
                return { matched: false };
            if (this.tail == this.tree && isWildcardOperator(this.tail)) {
                return { matched: true };
            }
            return { matched: matched, record: this.record };
        };
        Matcher.matchSegments = function (source, target, record) {
            var pos = 0;
            if (source.length !== target.length)
                return false;
            var match = function (pos) {
                var current = function () {
                    var res = isSegmentEqual(source[pos], target[pos]);
                    if (record && record.score !== undefined) {
                        record.score++;
                    }
                    return res;
                };
                var next = function () { return (pos < source.length - 1 ? match(pos + 1) : true); };
                return current() && next();
            };
            return { matched: match(pos), record: record };
        };
        return Matcher;
    }());

    var __read$f = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$7 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$f(arguments[i]));
        return ar;
    };
    var pathCache = new Map();
    var isMatcher = Symbol('PATH_MATCHER');
    var isValid$3 = function (val) { return val !== undefined && val !== null; };
    var isAssignable = function (val) {
        return typeof val === 'object' || typeof val === 'function';
    };
    var isNumberIndex = function (val) {
        return isStr(val) ? /^\d+$/.test(val) : isNum(val);
    };
    var getIn$1 = function (segments, source) {
        for (var i = 0; i < segments.length; i++) {
            var index = segments[i];
            var rules = getDestructor(index);
            if (!rules) {
                if (!isValid$3(source)) {
                    if (i !== segments.length - 1) {
                        return source;
                    }
                    break;
                }
                source = source[index];
            }
            else {
                source = getInByDestructor(source, rules, { setIn: setIn, getIn: getIn$1 });
                break;
            }
        }
        return source;
    };
    var setIn = function (segments, source, value) {
        for (var i = 0; i < segments.length; i++) {
            var index = segments[i];
            var rules = getDestructor(index);
            if (!rules) {
                if (!isValid$3(source) || !isAssignable(source))
                    return;
                if (isArr$1(source) && !isNumberIndex(index)) {
                    return;
                }
                if (!isValid$3(source[index])) {
                    if (value === undefined) {
                        return;
                    }
                    if (i < segments.length - 1) {
                        source[index] = isNum(segments[i + 1]) ? [] : {};
                    }
                }
                if (i === segments.length - 1) {
                    source[index] = value;
                }
                source = source[index];
            }
            else {
                setInByDestructor(source, rules, value, { setIn: setIn, getIn: getIn$1 });
                break;
            }
        }
    };
    var deleteIn = function (segments, source) {
        for (var i = 0; i < segments.length; i++) {
            var index = segments[i];
            var rules = getDestructor(index);
            if (!rules) {
                if (i === segments.length - 1 && isValid$3(source)) {
                    delete source[index];
                    return;
                }
                if (!isValid$3(source) || !isAssignable(source))
                    return;
                source = source[index];
                if (!isObj(source)) {
                    return;
                }
            }
            else {
                deleteInByDestructor(source, rules, {
                    setIn: setIn,
                    getIn: getIn$1,
                    deleteIn: deleteIn,
                });
                break;
            }
        }
    };
    var hasOwnProperty$7 = Object.prototype.hasOwnProperty;
    var existIn = function (segments, source, start) {
        if (start instanceof Path) {
            start = start.length;
        }
        for (var i = start; i < segments.length; i++) {
            var index = segments[i];
            var rules = getDestructor(index);
            if (!rules) {
                if (i === segments.length - 1) {
                    return hasOwnProperty$7.call(source, index);
                }
                if (!isValid$3(source) || !isAssignable(source))
                    return false;
                source = source[index];
                if (!isObj(source)) {
                    return false;
                }
            }
            else {
                return existInByDestructor(source, rules, start, {
                    setIn: setIn,
                    getIn: getIn$1,
                    deleteIn: deleteIn,
                    existIn: existIn,
                });
            }
        }
    };
    var parse = function (pattern, base) {
        if (pattern instanceof Path) {
            return {
                entire: pattern.entire,
                segments: pattern.segments.slice(),
                isRegExp: false,
                isWildMatchPattern: pattern.isWildMatchPattern,
                isMatchPattern: pattern.isMatchPattern,
                haveExcludePattern: pattern.haveExcludePattern,
                tree: pattern.tree,
            };
        }
        else if (isStr(pattern)) {
            if (!pattern)
                return {
                    entire: '',
                    segments: [],
                    isRegExp: false,
                    isWildMatchPattern: false,
                    haveExcludePattern: false,
                    isMatchPattern: false,
                };
            var parser = new Parser(pattern, Path.parse(base));
            var tree = parser.parse();
            if (!parser.isMatchPattern) {
                var segments = parser.data.segments;
                return {
                    entire: segments.join('.'),
                    segments: segments,
                    tree: tree,
                    isRegExp: false,
                    isWildMatchPattern: false,
                    haveExcludePattern: false,
                    isMatchPattern: false,
                };
            }
            else {
                return {
                    entire: pattern,
                    segments: [],
                    isRegExp: false,
                    isWildMatchPattern: parser.isWildMatchPattern,
                    haveExcludePattern: parser.haveExcludePattern,
                    isMatchPattern: true,
                    tree: tree,
                };
            }
        }
        else if (isFn$1(pattern) && pattern[isMatcher]) {
            return parse(pattern['path']);
        }
        else if (isArr$1(pattern)) {
            return {
                entire: pattern.join('.'),
                segments: pattern.reduce(function (buf, key) {
                    return buf.concat(parseString(key));
                }, []),
                isRegExp: false,
                isWildMatchPattern: false,
                haveExcludePattern: false,
                isMatchPattern: false,
            };
        }
        else if (isRegExp(pattern)) {
            return {
                entire: pattern,
                segments: [],
                isRegExp: true,
                isWildMatchPattern: false,
                haveExcludePattern: false,
                isMatchPattern: true,
            };
        }
        else {
            return {
                entire: '',
                isRegExp: false,
                segments: pattern !== undefined ? [pattern] : [],
                isWildMatchPattern: false,
                haveExcludePattern: false,
                isMatchPattern: false,
            };
        }
    };
    var parseString = function (source) {
        if (isStr(source)) {
            source = source.replace(/\s*/g, '');
            try {
                var _a = parse(source), segments = _a.segments, isMatchPattern = _a.isMatchPattern;
                return !isMatchPattern ? segments : source;
            }
            catch (e) {
                return source;
            }
        }
        else if (source instanceof Path) {
            return source.segments;
        }
        return source;
    };
    var Path = /** @class */ (function () {
        function Path(input, base) {
            var _this = this;
            this.concat = function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (_this.isMatchPattern || _this.isRegExp) {
                    throw new Error(_this.entire + " cannot be concat");
                }
                var path = new Path('');
                path.segments = (_a = _this.segments).concat.apply(_a, __spread$7(args.map(function (s) { return parseString(s); })));
                path.entire = path.segments.join('.');
                return path;
            };
            this.slice = function (start, end) {
                if (_this.isMatchPattern || _this.isRegExp) {
                    throw new Error(_this.entire + " cannot be slice");
                }
                var path = new Path('');
                path.segments = _this.segments.slice(start, end);
                path.entire = path.segments.join('.');
                return path;
            };
            this.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                return _this.concat.apply(_this, __spread$7(items));
            };
            this.pop = function () {
                if (_this.isMatchPattern || _this.isRegExp) {
                    throw new Error(_this.entire + " cannot be pop");
                }
                return new Path(_this.segments.slice(0, _this.segments.length - 1));
            };
            this.splice = function (start, deleteCount) {
                var items = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    items[_i - 2] = arguments[_i];
                }
                if (_this.isMatchPattern || _this.isRegExp) {
                    throw new Error(_this.entire + " cannot be splice");
                }
                items = items.reduce(function (buf, item) { return buf.concat(parseString(item)); }, []);
                var segments_ = _this.segments.slice();
                segments_.splice.apply(segments_, __spread$7([start, deleteCount], items));
                return new Path(segments_);
            };
            this.forEach = function (callback) {
                if (_this.isMatchPattern || _this.isRegExp) {
                    throw new Error(_this.entire + " cannot be each");
                }
                _this.segments.forEach(callback);
            };
            this.map = function (callback) {
                if (_this.isMatchPattern || _this.isRegExp) {
                    throw new Error(_this.entire + " cannot be map");
                }
                return _this.segments.map(callback);
            };
            this.reduce = function (callback, initial) {
                if (_this.isMatchPattern || _this.isRegExp) {
                    throw new Error(_this.entire + " cannot be reduce");
                }
                return _this.segments.reduce(callback, initial);
            };
            this.parent = function () {
                return _this.slice(0, _this.length - 1);
            };
            this.includes = function (pattern) {
                var _a = Path.parse(pattern), entire = _a.entire, segments = _a.segments, isMatchPattern = _a.isMatchPattern;
                var cache = _this.includesCache.get(entire);
                if (cache !== undefined)
                    return cache;
                var cacheWith = function (value) {
                    _this.includesCache.set(entire, value);
                    return value;
                };
                if (_this.isMatchPattern) {
                    if (!isMatchPattern) {
                        return cacheWith(_this.match(segments));
                    }
                    else {
                        throw new Error(_this.entire + " cannot be used to match " + entire);
                    }
                }
                if (isMatchPattern) {
                    throw new Error(_this.entire + " cannot be used to match " + entire);
                }
                if (segments.length > _this.segments.length)
                    return cacheWith(false);
                for (var i = 0; i < segments.length; i++) {
                    if (!isEqual(String(segments[i]), String(_this.segments[i]))) {
                        return cacheWith(false);
                    }
                }
                return cacheWith(true);
            };
            this.transform = function (regexp, callback) {
                if (!isFn$1(callback))
                    return '';
                if (_this.isMatchPattern) {
                    throw new Error(_this.entire + " cannot be transformed");
                }
                var args = _this.segments.reduce(function (buf, key) {
                    return new RegExp(regexp).test(key) ? buf.concat(key) : buf;
                }, []);
                return callback.apply(void 0, __spread$7(args));
            };
            this.match = function (pattern) {
                var _a, _b;
                var path = Path.parse(pattern);
                var cache = _this.matchCache.get(path.entire);
                if (cache !== undefined) {
                    if (cache.record && cache.record.score !== undefined) {
                        _this.matchScore = cache.record.score;
                    }
                    return cache.matched;
                }
                var cacheWith = function (value) {
                    _this.matchCache.set(path.entire, value);
                    return value;
                };
                if (path.isMatchPattern) {
                    if (_this.isMatchPattern) {
                        throw new Error(path.entire + " cannot match " + _this.entire);
                    }
                    else {
                        _this.matchScore = 0;
                        return cacheWith(path.match(_this.segments));
                    }
                }
                else {
                    if (_this.isMatchPattern) {
                        if (_this.isRegExp) {
                            try {
                                return (_b = (_a = _this['entire']) === null || _a === void 0 ? void 0 : _a['test']) === null || _b === void 0 ? void 0 : _b.call(_a, path.entire);
                            }
                            finally {
                                _this.entire.lastIndex = 0;
                            }
                        }
                        var record = {
                            score: 0,
                        };
                        var result = cacheWith(new Matcher(_this.tree, record).match(path.segments));
                        _this.matchScore = record.score;
                        return result.matched;
                    }
                    else {
                        var record = {
                            score: 0,
                        };
                        var result = cacheWith(Matcher.matchSegments(_this.segments, path.segments, record));
                        _this.matchScore = record.score;
                        return result.matched;
                    }
                }
            };
            //别名组匹配
            this.matchAliasGroup = function (name, alias) {
                var namePath = Path.parse(name);
                var aliasPath = Path.parse(alias);
                var nameMatched = _this.match(namePath);
                var nameMatchedScore = _this.matchScore;
                var aliasMatched = _this.match(aliasPath);
                var aliasMatchedScore = _this.matchScore;
                if (_this.haveExcludePattern) {
                    if (nameMatchedScore >= aliasMatchedScore) {
                        return nameMatched;
                    }
                    else {
                        return aliasMatched;
                    }
                }
                else {
                    return nameMatched || aliasMatched;
                }
            };
            this.existIn = function (source, start) {
                if (start === void 0) { start = 0; }
                return existIn(_this.segments, source, start);
            };
            this.getIn = function (source) {
                return getIn$1(_this.segments, source);
            };
            this.setIn = function (source, value) {
                setIn(_this.segments, source, value);
                return source;
            };
            this.deleteIn = function (source) {
                deleteIn(_this.segments, source);
                return source;
            };
            this.ensureIn = function (source, defaults) {
                var results = _this.getIn(source);
                if (results === undefined) {
                    _this.setIn(source, defaults);
                    return _this.getIn(source);
                }
                return results;
            };
            var _a = parse(input, base), tree = _a.tree, segments = _a.segments, entire = _a.entire, isRegExp = _a.isRegExp, isMatchPattern = _a.isMatchPattern, isWildMatchPattern = _a.isWildMatchPattern, haveExcludePattern = _a.haveExcludePattern;
            this.entire = entire;
            this.segments = segments;
            this.isMatchPattern = isMatchPattern;
            this.isWildMatchPattern = isWildMatchPattern;
            this.isRegExp = isRegExp;
            this.haveExcludePattern = haveExcludePattern;
            this.tree = tree;
            this.matchCache = new Map();
            this.includesCache = new Map();
        }
        Path.prototype.toString = function () {
            var _a;
            return (_a = this.entire) === null || _a === void 0 ? void 0 : _a.toString();
        };
        Path.prototype.toArr = function () {
            var _a;
            return (_a = this.segments) === null || _a === void 0 ? void 0 : _a.slice();
        };
        Object.defineProperty(Path.prototype, "length", {
            get: function () {
                return this.segments.length;
            },
            enumerable: false,
            configurable: true
        });
        Path.match = function (pattern) {
            var path = Path.parse(pattern);
            var matcher = function (target) {
                return path.match(target);
            };
            matcher[isMatcher] = true;
            matcher.path = path;
            return matcher;
        };
        Path.isPathPattern = function (target) {
            if (isStr(target) ||
                isArr$1(target) ||
                isRegExp(target) ||
                (isFn$1(target) && target[isMatcher])) {
                return true;
            }
            return false;
        };
        Path.transform = function (pattern, regexp, callback) {
            return Path.parse(pattern).transform(regexp, callback);
        };
        Path.parse = function (path, base) {
            if (path === void 0) { path = ''; }
            if (path instanceof Path) {
                var found = pathCache.get(path.entire);
                if (found) {
                    return found;
                }
                else {
                    pathCache.set(path.entire, path);
                    return path;
                }
            }
            else if (path && path[isMatcher]) {
                return Path.parse(path['path']);
            }
            else {
                var key_ = base ? Path.parse(base) : '';
                var key = path + ":" + key_;
                var found = pathCache.get(key);
                if (found) {
                    return found;
                }
                else {
                    path = new Path(path, base);
                    pathCache.set(key, path);
                    return path;
                }
            }
        };
        Path.getIn = function (source, pattern) {
            var path = Path.parse(pattern);
            return path.getIn(source);
        };
        Path.setIn = function (source, pattern, value) {
            var path = Path.parse(pattern);
            return path.setIn(source, value);
        };
        Path.deleteIn = function (source, pattern) {
            var path = Path.parse(pattern);
            return path.deleteIn(source);
        };
        Path.existIn = function (source, pattern, start) {
            var path = Path.parse(pattern);
            return path.existIn(source, start);
        };
        Path.ensureIn = function (source, pattern, defaultValue) {
            var path = Path.parse(pattern);
            return path.ensureIn(source, defaultValue);
        };
        return Path;
    }());

    var Subscribable = /** @class */ (function () {
        function Subscribable() {
            var _this = this;
            this.subscribers = {
                index: 0,
            };
            this.subscribe = function (callback) {
                if (isFn$2(callback)) {
                    var index = _this.subscribers.index + 1;
                    _this.subscribers[index] = callback;
                    _this.subscribers.index++;
                    return index;
                }
            };
            this.unsubscribe = function (index) {
                if (_this.subscribers[index]) {
                    delete _this.subscribers[index];
                }
                else if (!index) {
                    _this.subscribers = {
                        index: 0,
                    };
                }
            };
            this.notify = function (payload, silent) {
                if (_this.subscription) {
                    if (_this.subscription && isFn$2(_this.subscription.notify)) {
                        if (_this.subscription.notify.call(_this, payload) === false) {
                            return;
                        }
                    }
                }
                if (silent)
                    return;
                var filter = function (payload) {
                    if (_this.subscription && isFn$2(_this.subscription.filter)) {
                        return _this.subscription.filter.call(_this, payload);
                    }
                    return payload;
                };
                each(_this.subscribers, function (callback) {
                    if (isFn$2(callback))
                        callback(filter(payload));
                });
            };
        }
        return Subscribable;
    }());

    function defaultIsMergeableObject(value) {
        return isNonNullObject(value) && !isSpecial(value);
    }
    function isNonNullObject(value) {
        return !!value && typeof value === 'object';
    }
    function isSpecial(value) {
        var stringValue = Object.prototype.toString.call(value);
        return (stringValue === '[object RegExp]' ||
            stringValue === '[object Date]' ||
            isReactElement(value));
    }
    // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
    var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;
    function isReactElement(value) {
        return value.$$typeof === REACT_ELEMENT_TYPE;
    }
    function emptyTarget(val) {
        return Array.isArray(val) ? [] : {};
    }
    function cloneUnlessOtherwiseSpecified(value, options) {
        if (options.clone !== false && options.isMergeableObject(value)) {
            return deepmerge(emptyTarget(value), value, options);
        }
        return value;
    }
    function defaultArrayMerge(target, source, options) {
        return target.concat(source).map(function (element) {
            return cloneUnlessOtherwiseSpecified(element, options);
        });
    }
    function getMergeFunction(key, options) {
        if (!options.customMerge) {
            return deepmerge;
        }
        var customMerge = options.customMerge(key);
        return typeof customMerge === 'function' ? customMerge : deepmerge;
    }
    function getEnumerableOwnPropertySymbols(target) {
        return Object.getOwnPropertySymbols
            ? Object.getOwnPropertySymbols(target).filter(function (symbol) {
                return target.propertyIsEnumerable(symbol);
            })
            : [];
    }
    function getKeys(target) {
        if (!isValid$6(target))
            return [];
        return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
    }
    function propertyIsOnObject(object, property) {
        /* istanbul ignore next */
        try {
            return property in object;
        }
        catch (_) {
            return false;
        }
    }
    // Protects from prototype poisoning and unexpected merging up the prototype chain.
    function propertyIsUnsafe(target, key) {
        return (propertyIsOnObject(target, key) && // Properties are safe to merge if they don't exist in the target yet,
            !(Object.hasOwnProperty.call(target, key) && // unsafe if they exist up the prototype chain,
                Object.propertyIsEnumerable.call(target, key))); // and also unsafe if they're nonenumerable.
    }
    function mergeObject(target, source, options) {
        var destination = options.assign ? target || {} : {};
        if (!options.isMergeableObject(target))
            return target;
        if (!options.assign) {
            getKeys(target).forEach(function (key) {
                destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
            });
        }
        getKeys(source).forEach(function (key) {
            /* istanbul ignore next */
            if (propertyIsUnsafe(target, key)) {
                return;
            }
            if (!target[key]) {
                destination[key] = source[key];
            }
            if (propertyIsOnObject(target, key) &&
                options.isMergeableObject(source[key])) {
                destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
            }
            else {
                destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
            }
        });
        return destination;
    }
    function deepmerge(target, source, options) {
        options = options || {};
        options.arrayMerge = options.arrayMerge || defaultArrayMerge;
        options.isMergeableObject =
            options.isMergeableObject || defaultIsMergeableObject;
        // cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()
        // implementations can use it. The caller may not replace it.
        options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
        var sourceIsArray = Array.isArray(source);
        var targetIsArray = Array.isArray(target);
        var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
        if (!sourceAndTargetTypesMatch) {
            return cloneUnlessOtherwiseSpecified(source, options);
        }
        else if (sourceIsArray) {
            return options.arrayMerge(target, source, options);
        }
        else {
            return mergeObject(target, source, options);
        }
    }
    var merge = deepmerge;

    var IDX = 36, HEX = '';
    while (IDX--)
        HEX += IDX.toString(36);
    function uid(len) {
        var str = '', num = len || 11;
        while (num--)
            str += HEX[(Math.random() * 36) | 0];
        return str;
    }

    var isMap$1 = function (val) {
        return val && val instanceof Map;
    };
    var isSet$1 = function (val) { return val && val instanceof Set; };
    var isWeakMap = function (val) {
        return val && val instanceof WeakMap;
    };
    var isWeakSet = function (val) {
        return val && val instanceof WeakSet;
    };
    var isFn = function (val) { return typeof val === 'function'; };
    var isArr = Array.isArray;
    var isPlainObj = function (val) {
        return Object.prototype.toString.call(val) === '[object Object]';
    };
    var isValid$2 = function (val) { return val !== null && val !== undefined; };
    var isCollectionType = function (target) {
        return (isMap$1(target) || isWeakMap(target) || isSet$1(target) || isWeakSet(target));
    };
    var isNormalType = function (target) {
        return isPlainObj(target) || isArr(target);
    };

    var toArray = function (value) {
        return Array.isArray(value)
            ? value
            : value !== undefined && value !== null
                ? [value]
                : [];
    };
    var ArraySet = /** @class */ (function () {
        function ArraySet(value) {
            if (value === void 0) { value = []; }
            this.value = value;
        }
        ArraySet.prototype.add = function (item) {
            if (!this.has(item)) {
                this.value.push(item);
            }
        };
        ArraySet.prototype.has = function (item) {
            return this.value.indexOf(item) > -1;
        };
        ArraySet.prototype.delete = function (item) {
            var index = this.value.indexOf(item);
            if (index > -1) {
                this.value.splice(index, 1);
            }
        };
        ArraySet.prototype.forEach = function (callback) {
            if (this.value.length === 0)
                return;
            for (var index = 0, len = this.value.length; index < len; index++) {
                callback(this.value[index]);
            }
        };
        ArraySet.prototype.forEachDelete = function (callback) {
            if (this.value.length === 0)
                return;
            for (var index = 0; index < this.value.length; index++) {
                var item = this.value[index];
                this.value.splice(index, 1);
                callback(item);
                index--;
            }
        };
        ArraySet.prototype.clear = function () {
            this.value.length = 0;
        };
        return ArraySet;
    }());

    var ProxyRaw = new WeakMap();
    var RawProxy = new WeakMap();
    var RawShallowProxy = new WeakMap();
    var RawNode = new WeakMap();
    var RawReactionsMap = new WeakMap();
    var ReactionStack = [];
    var BatchCount = { value: 0 };
    var UntrackCount = { value: 0 };
    var BatchScope = { value: false };
    var DependencyCollected = { value: false };
    var PendingReactions = new ArraySet();
    var PendingScopeReactions = new ArraySet();
    var BatchEndpoints = new ArraySet();
    var MakeObservableSymbol = Symbol('MakeObservableSymbol');
    var ObserverListeners = new ArraySet();

    var ITERATION_KEY = Symbol('iteration key');
    var addRawReactionsMap = function (target, key, reaction) {
        var reactionsMap = RawReactionsMap.get(target);
        if (reactionsMap) {
            var reactions = reactionsMap.get(key);
            if (reactions) {
                reactions.add(reaction);
            }
            else {
                reactionsMap.set(key, new ArraySet([reaction]));
            }
            return reactionsMap;
        }
        else {
            var reactionsMap_1 = new Map([
                [key, new ArraySet([reaction])],
            ]);
            RawReactionsMap.set(target, reactionsMap_1);
            return reactionsMap_1;
        }
    };
    var addReactionsMapToReaction = function (reaction, reactionsMap) {
        var bindSet = reaction._reactionsSet;
        if (bindSet) {
            bindSet.add(reactionsMap);
        }
        else {
            reaction._reactionsSet = new ArraySet([reactionsMap]);
        }
        return bindSet;
    };
    var getReactionsFromTargetKey = function (target, key) {
        var reactionsMap = RawReactionsMap.get(target);
        var reactions = [];
        if (reactionsMap) {
            var map = reactionsMap.get(key);
            if (map) {
                map.forEach(function (reaction) {
                    if (reactions.indexOf(reaction) === -1) {
                        reactions.push(reaction);
                    }
                });
            }
        }
        return reactions;
    };
    var runReactions = function (target, key) {
        var reactions = getReactionsFromTargetKey(target, key);
        var prevUntrackCount = UntrackCount.value;
        UntrackCount.value = 0;
        for (var i = 0, len = reactions.length; i < len; i++) {
            var reaction = reactions[i];
            if (reaction._isComputed) {
                reaction._scheduler(reaction);
            }
            else if (isScopeBatching()) {
                PendingScopeReactions.add(reaction);
            }
            else if (isBatching()) {
                PendingReactions.add(reaction);
            }
            else {
                if (isFn(reaction._scheduler)) {
                    reaction._scheduler(reaction);
                }
                else {
                    reaction();
                }
            }
        }
        UntrackCount.value = prevUntrackCount;
    };
    var notifyObservers = function (operation) {
        ObserverListeners.forEach(function (fn) { return fn(operation); });
    };
    var bindTargetKeyWithCurrentReaction = function (operation) {
        var key = operation.key, type = operation.type, target = operation.target;
        if (type === 'iterate') {
            key = ITERATION_KEY;
        }
        var current = ReactionStack[ReactionStack.length - 1];
        if (isUntracking())
            return;
        if (current) {
            DependencyCollected.value = true;
            addReactionsMapToReaction(current, addRawReactionsMap(target, key, current));
        }
    };
    var bindComputedReactions = function (reaction) {
        if (isFn(reaction)) {
            var current = ReactionStack[ReactionStack.length - 1];
            if (current) {
                var computes = current._computesSet;
                if (computes) {
                    computes.add(reaction);
                }
                else {
                    current._computesSet = new ArraySet([reaction]);
                }
            }
        }
    };
    var runReactionsFromTargetKey = function (operation) {
        var key = operation.key, type = operation.type, target = operation.target, oldTarget = operation.oldTarget;
        notifyObservers(operation);
        if (type === 'clear') {
            oldTarget.forEach(function (_, key) {
                runReactions(target, key);
            });
        }
        else {
            runReactions(target, key);
        }
        if (type === 'add' || type === 'delete' || type === 'clear') {
            var newKey = Array.isArray(target) ? 'length' : ITERATION_KEY;
            runReactions(target, newKey);
        }
    };
    var hasRunningReaction = function () {
        return ReactionStack.length > 0;
    };
    var releaseBindingReactions = function (reaction) {
        var _a;
        (_a = reaction._reactionsSet) === null || _a === void 0 ? void 0 : _a.forEach(function (reactionsMap) {
            reactionsMap.forEach(function (reactions) {
                reactions.delete(reaction);
            });
        });
        PendingReactions.delete(reaction);
        PendingScopeReactions.delete(reaction);
        delete reaction._reactionsSet;
    };
    var suspendComputedReactions = function (current) {
        var _a;
        (_a = current._computesSet) === null || _a === void 0 ? void 0 : _a.forEach(function (reaction) {
            var reactions = getReactionsFromTargetKey(reaction._context, reaction._property);
            if (reactions.length === 0) {
                disposeBindingReactions(reaction);
                reaction._dirty = true;
            }
        });
    };
    var disposeBindingReactions = function (reaction) {
        reaction._disposed = true;
        releaseBindingReactions(reaction);
        suspendComputedReactions(reaction);
    };
    var batchStart = function () {
        BatchCount.value++;
    };
    var batchEnd = function () {
        BatchCount.value--;
        if (BatchCount.value === 0) {
            var prevUntrackCount = UntrackCount.value;
            UntrackCount.value = 0;
            executePendingReactions();
            executeBatchEndpoints();
            UntrackCount.value = prevUntrackCount;
        }
    };
    var batchScopeStart = function () {
        BatchScope.value = true;
    };
    var batchScopeEnd = function () {
        var prevUntrackCount = UntrackCount.value;
        BatchScope.value = false;
        UntrackCount.value = 0;
        PendingScopeReactions.forEachDelete(function (reaction) {
            if (isFn(reaction._scheduler)) {
                reaction._scheduler(reaction);
            }
            else {
                reaction();
            }
        });
        UntrackCount.value = prevUntrackCount;
    };
    var untrackStart = function () {
        UntrackCount.value++;
    };
    var untrackEnd = function () {
        UntrackCount.value--;
    };
    var isBatching = function () { return BatchCount.value > 0; };
    var isScopeBatching = function () { return BatchScope.value; };
    var isUntracking = function () { return UntrackCount.value > 0; };
    var executePendingReactions = function () {
        PendingReactions.forEachDelete(function (reaction) {
            if (isFn(reaction._scheduler)) {
                reaction._scheduler(reaction);
            }
            else {
                reaction();
            }
        });
    };
    var executeBatchEndpoints = function () {
        BatchEndpoints.forEachDelete(function (callback) {
            callback();
        });
    };
    var hasDepsChange = function (newDeps, oldDeps) {
        if (newDeps === oldDeps)
            return false;
        if (newDeps.length !== oldDeps.length)
            return true;
        if (newDeps.some(function (value, index) { return value !== oldDeps[index]; }))
            return true;
        return false;
    };
    var disposeEffects = function (reaction) {
        if (reaction._effects) {
            try {
                batchStart();
                reaction._effects.queue.forEach(function (item) {
                    if (!item || !item.dispose)
                        return;
                    item.dispose();
                });
            }
            finally {
                batchEnd();
            }
        }
    };

    var RAW_TYPE = Symbol('RAW_TYPE');
    var OBSERVABLE_TYPE = Symbol('OBSERVABLE_TYPE');
    var hasOwnProperty$6 = Object.prototype.hasOwnProperty;
    var isObservable = function (target) {
        return ProxyRaw.has(target);
    };
    var isAnnotation = function (target) {
        return target && !!target[MakeObservableSymbol];
    };
    var isSupportObservable = function (target) {
        if (!isValid$2(target))
            return false;
        if (isArr(target))
            return true;
        if (isPlainObj(target)) {
            if (target[RAW_TYPE]) {
                return false;
            }
            if (target[OBSERVABLE_TYPE]) {
                return true;
            }
            if ('$$typeof' in target && '_owner' in target) {
                return false;
            }
            if (target['_isAMomentObject']) {
                return false;
            }
            if (target['_isJSONSchemaObject']) {
                return false;
            }
            if (isFn(target['toJS'])) {
                return false;
            }
            if (isFn(target['toJSON'])) {
                return false;
            }
            return true;
        }
        if (isMap$1(target) || isWeakMap(target) || isSet$1(target) || isWeakSet(target))
            return true;
        return false;
    };
    var toJS = function (values) {
        var visited = new WeakSet();
        var _toJS = function (values) {
            if (visited.has(values)) {
                return values;
            }
            if (values && values[RAW_TYPE])
                return values;
            if (isArr(values)) {
                if (isObservable(values)) {
                    visited.add(values);
                    var res_1 = [];
                    values.forEach(function (item) {
                        res_1.push(_toJS(item));
                    });
                    visited.delete(values);
                    return res_1;
                }
            }
            else if (isPlainObj(values)) {
                if (isObservable(values)) {
                    visited.add(values);
                    var res = {};
                    for (var key in values) {
                        if (hasOwnProperty$6.call(values, key)) {
                            res[key] = _toJS(values[key]);
                        }
                    }
                    visited.delete(values);
                    return res;
                }
            }
            return values;
        };
        return _toJS(values);
    };
    var hasCollected = function (callback) {
        DependencyCollected.value = false;
        callback === null || callback === void 0 ? void 0 : callback();
        return DependencyCollected.value;
    };

    var __read$e = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$6 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$e(arguments[i]));
        return ar;
    };
    var _a;
    var wellKnownSymbols = new Set(Object.getOwnPropertyNames(Symbol)
        .map(function (key) { return Symbol[key]; })
        .filter(function (value) { return typeof value === 'symbol'; }));
    var hasOwnProperty$5 = Object.prototype.hasOwnProperty;
    function findObservable(target, key, value) {
        var observableObj = RawProxy.get(value);
        if (observableObj) {
            return observableObj;
        }
        if (!isObservable(value) && isSupportObservable(value)) {
            return createObservable(target, key, value);
        }
        return value;
    }
    function patchIterator(target, key, iterator, isEntries) {
        var originalNext = iterator.next;
        iterator.next = function () {
            var _a = originalNext.call(iterator), done = _a.done, value = _a.value;
            if (!done) {
                if (isEntries) {
                    value[1] = findObservable(target, key, value[1]);
                }
                else {
                    value = findObservable(target, key, value);
                }
            }
            return { done: done, value: value };
        };
        return iterator;
    }
    var instrumentations = (_a = {
            has: function (key) {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'has' });
                return proto.has.apply(target, arguments);
            },
            get: function (key) {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'get' });
                return findObservable(target, key, proto.get.apply(target, arguments));
            },
            add: function (key) {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                var hadKey = proto.has.call(target, key);
                // forward the operation before queueing reactions
                var result = proto.add.apply(target, arguments);
                if (!hadKey) {
                    runReactionsFromTargetKey({ target: target, key: key, value: key, type: 'add' });
                }
                return result;
            },
            set: function (key, value) {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                var hadKey = proto.has.call(target, key);
                var oldValue = proto.get.call(target, key);
                // forward the operation before queueing reactions
                var result = proto.set.apply(target, arguments);
                if (!hadKey) {
                    runReactionsFromTargetKey({ target: target, key: key, value: value, type: 'add' });
                }
                else if (value !== oldValue) {
                    runReactionsFromTargetKey({ target: target, key: key, value: value, oldValue: oldValue, type: 'set' });
                }
                return result;
            },
            delete: function (key) {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                var hadKey = proto.has.call(target, key);
                var oldValue = proto.get ? proto.get.call(target, key) : undefined;
                // forward the operation before queueing reactions
                var result = proto.delete.apply(target, arguments);
                if (hadKey) {
                    runReactionsFromTargetKey({ target: target, key: key, oldValue: oldValue, type: 'delete' });
                }
                return result;
            },
            clear: function () {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                var hadItems = target.size !== 0;
                var oldTarget = target instanceof Map ? new Map(target) : new Set(target);
                // forward the operation before queueing reactions
                var result = proto.clear.apply(target, arguments);
                if (hadItems) {
                    runReactionsFromTargetKey({ target: target, oldTarget: oldTarget, type: 'clear' });
                }
                return result;
            },
            forEach: function (cb) {
                var _a;
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
                // swap out the raw values with their observable pairs
                // before passing them to the callback
                var wrappedCb = function (value, key) {
                    var args = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        args[_i - 2] = arguments[_i];
                    }
                    return cb.apply(void 0, __spread$6([findObservable(target, key, value), key], args));
                };
                return (_a = proto.forEach).call.apply(_a, __spread$6([target, wrappedCb], args));
            },
            keys: function () {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
                return proto.keys.apply(target, arguments);
            },
            values: function () {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
                var iterator = proto.values.apply(target, arguments);
                return patchIterator(target, '', iterator, false);
            },
            entries: function () {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
                var iterator = proto.entries.apply(target, arguments);
                return patchIterator(target, '', iterator, true);
            }
        },
        _a[Symbol.iterator] = function () {
            var target = ProxyRaw.get(this);
            var proto = Reflect.getPrototypeOf(this);
            bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
            var iterator = proto[Symbol.iterator].apply(target, arguments);
            return patchIterator(target, '', iterator, target instanceof Map);
        },
        Object.defineProperty(_a, "size", {
            get: function () {
                var target = ProxyRaw.get(this);
                var proto = Reflect.getPrototypeOf(this);
                bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
                return Reflect.get(proto, 'size', target);
            },
            enumerable: false,
            configurable: true
        }),
        _a);
    var collectionHandlers = {
        get: function (target, key, receiver) {
            // instrument methods and property accessors to be reactive
            target = hasOwnProperty$5.call(instrumentations, key)
                ? instrumentations
                : target;
            return Reflect.get(target, key, receiver);
        },
    };
    var baseHandlers = {
        get: function (target, key, receiver) {
            var result = target[key]; // use Reflect.get is too slow
            if (typeof key === 'symbol' && wellKnownSymbols.has(key)) {
                return result;
            }
            bindTargetKeyWithCurrentReaction({ target: target, key: key, receiver: receiver, type: 'get' });
            var observableResult = RawProxy.get(result);
            if (observableResult) {
                return observableResult;
            }
            if (!isObservable(result) && isSupportObservable(result)) {
                var descriptor = Reflect.getOwnPropertyDescriptor(target, key);
                if (!descriptor ||
                    !(descriptor.writable === false && descriptor.configurable === false)) {
                    return createObservable(target, key, result);
                }
            }
            return result;
        },
        has: function (target, key) {
            var result = Reflect.has(target, key);
            bindTargetKeyWithCurrentReaction({ target: target, key: key, type: 'has' });
            return result;
        },
        ownKeys: function (target) {
            var keys = Reflect.ownKeys(target);
            bindTargetKeyWithCurrentReaction({ target: target, type: 'iterate' });
            return keys;
        },
        set: function (target, key, value, receiver) {
            var hadKey = hasOwnProperty$5.call(target, key);
            var newValue = createObservable(target, key, value);
            var oldValue = target[key];
            target[key] = newValue; // use Reflect.set is too slow
            if (!hadKey) {
                runReactionsFromTargetKey({
                    target: target,
                    key: key,
                    value: newValue,
                    oldValue: oldValue,
                    receiver: receiver,
                    type: 'add',
                });
            }
            else if (value !== oldValue) {
                runReactionsFromTargetKey({
                    target: target,
                    key: key,
                    value: newValue,
                    oldValue: oldValue,
                    receiver: receiver,
                    type: 'set',
                });
            }
            return true;
        },
        deleteProperty: function (target, key) {
            var oldValue = target[key];
            delete target[key];
            runReactionsFromTargetKey({
                target: target,
                key: key,
                oldValue: oldValue,
                type: 'delete',
            });
            return true;
        },
    };

    var DataChange = /** @class */ (function () {
        function DataChange(operation, node) {
            this.key = operation.key;
            this.type = operation.type;
            this.value = operation.value;
            this.oldValue = operation.oldValue;
            this.path = node.path.concat(operation.key);
        }
        return DataChange;
    }());
    var DataNode = /** @class */ (function () {
        function DataNode(target, key, value) {
            this.target = target;
            this.key = key;
            this.value = value;
        }
        Object.defineProperty(DataNode.prototype, "path", {
            get: function () {
                if (!this.parent)
                    return this.key ? [this.key] : [];
                return this.parent.path.concat(this.key);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DataNode.prototype, "targetRaw", {
            get: function () {
                return ProxyRaw.get(this.target) || this.target;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DataNode.prototype, "parent", {
            get: function () {
                if (!this.target)
                    return;
                return RawNode.get(this.targetRaw);
            },
            enumerable: false,
            configurable: true
        });
        DataNode.prototype.isEqual = function (node) {
            if (this.key) {
                return node.targetRaw === this.targetRaw && node.key === this.key;
            }
            return node.value === this.value;
        };
        DataNode.prototype.contains = function (node) {
            if (node === this)
                return true;
            var parent = node.parent;
            while (!!parent) {
                if (this.isEqual(parent))
                    return true;
                parent = parent.parent;
            }
            return false;
        };
        return DataNode;
    }());
    var buildDataTree = function (target, key, value) {
        var currentNode = RawNode.get(ProxyRaw.get(value) || value);
        if (currentNode)
            return currentNode;
        RawNode.set(value, new DataNode(target, key, value));
    };

    var createNormalProxy = function (target, shallow) {
        var proxy = new Proxy(target, baseHandlers);
        ProxyRaw.set(proxy, target);
        if (shallow) {
            RawShallowProxy.set(target, proxy);
        }
        else {
            RawProxy.set(target, proxy);
        }
        return proxy;
    };
    var createCollectionProxy = function (target, shallow) {
        var proxy = new Proxy(target, collectionHandlers);
        ProxyRaw.set(proxy, target);
        if (shallow) {
            RawShallowProxy.set(target, proxy);
        }
        else {
            RawProxy.set(target, proxy);
        }
        return proxy;
    };
    var createShallowProxy = function (target) {
        if (isNormalType(target))
            return createNormalProxy(target, true);
        if (isCollectionType(target))
            return createCollectionProxy(target, true);
        return target;
    };
    var createObservable = function (target, key, value, shallow) {
        if (typeof value !== 'object')
            return value;
        var raw = ProxyRaw.get(value);
        if (!!raw) {
            var node = RawNode.get(raw);
            node.key = key;
            return value;
        }
        if (!isSupportObservable(value))
            return value;
        if (target) {
            var parentRaw = ProxyRaw.get(target) || target;
            var isShallowParent = RawShallowProxy.get(parentRaw);
            if (isShallowParent)
                return value;
        }
        buildDataTree(target, key, value);
        if (shallow)
            return createShallowProxy(value);
        if (isNormalType(value))
            return createNormalProxy(value);
        if (isCollectionType(value))
            return createCollectionProxy(value);
        return value;
    };
    var createAnnotation = function (maker) {
        var annotation = function (target) {
            return maker({ value: target });
        };
        if (isFn(maker)) {
            annotation[MakeObservableSymbol] = maker;
        }
        return annotation;
    };
    var getObservableMaker = function (target) {
        if (target[MakeObservableSymbol]) {
            if (!target[MakeObservableSymbol][MakeObservableSymbol]) {
                return target[MakeObservableSymbol];
            }
            return getObservableMaker(target[MakeObservableSymbol]);
        }
    };
    var createBoundaryFunction = function (start, end) {
        function boundary(fn) {
            var results;
            try {
                start();
                if (isFn(fn)) {
                    results = fn();
                }
            }
            finally {
                end();
            }
            return results;
        }
        boundary.bound = createBindFunction(boundary);
        return boundary;
    };
    var createBindFunction = function (boundary) {
        function bind(callback, context) {
            return (function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return boundary(function () { return callback.apply(context, args); });
            });
        }
        return bind;
    };
    var createBoundaryAnnotation = function (start, end) {
        var boundary = createBoundaryFunction(start, end);
        var annotation = createAnnotation(function (_a) {
            var target = _a.target, key = _a.key;
            target[key] = boundary.bound(target[key], target);
            return target;
        });
        boundary[MakeObservableSymbol] = annotation;
        boundary.bound[MakeObservableSymbol] = annotation;
        return boundary;
    };

    var batch = createBoundaryAnnotation(batchStart, batchEnd);
    batch.scope = createBoundaryAnnotation(batchScopeStart, batchScopeEnd);
    batch.endpoint = function (callback) {
        if (!isFn(callback))
            return;
        if (BatchCount.value === 0) {
            callback();
        }
        else {
            BatchEndpoints.add(callback);
        }
    };

    var action = createBoundaryAnnotation(function () {
        batchStart();
        untrackStart();
    }, function () {
        untrackEnd();
        batchEnd();
    });
    action.scope = createBoundaryAnnotation(function () {
        batchScopeStart();
        untrackStart();
    }, function () {
        untrackEnd();
        batchScopeEnd();
    });

    var untracked = createBoundaryFunction(untrackStart, untrackEnd);

    var observable$1 = createAnnotation(function (_a) {
        var target = _a.target, key = _a.key, value = _a.value;
        var store = {
            value: createObservable(target, key, target ? target[key] : value),
        };
        function get() {
            bindTargetKeyWithCurrentReaction({
                target: target,
                key: key,
                type: 'get',
            });
            return store.value;
        }
        function set(value) {
            var oldValue = store.value;
            value = createObservable(target, key, value);
            store.value = value;
            if (oldValue === value)
                return;
            runReactionsFromTargetKey({
                target: target,
                key: key,
                type: 'set',
                oldValue: oldValue,
                value: value,
            });
        }
        if (target) {
            Object.defineProperty(target, key, {
                set: set,
                get: get,
                enumerable: true,
                configurable: false,
            });
            return target;
        }
        return store.value;
    });

    var box = createAnnotation(function (_a) {
        var target = _a.target, key = _a.key, value = _a.value;
        var store = {
            value: target ? target[key] : value,
        };
        var proxy = {
            set: set,
            get: get,
        };
        ProxyRaw.set(proxy, store);
        RawProxy.set(store, proxy);
        buildDataTree(target, key, store);
        function get() {
            bindTargetKeyWithCurrentReaction({
                target: store,
                key: key,
                type: 'get',
            });
            return store.value;
        }
        function set(value) {
            var oldValue = store.value;
            store.value = value;
            if (oldValue !== value) {
                runReactionsFromTargetKey({
                    target: store,
                    key: key,
                    type: 'set',
                    oldValue: oldValue,
                    value: value,
                });
            }
        }
        if (target) {
            Object.defineProperty(target, key, {
                value: proxy,
                enumerable: true,
                configurable: false,
                writable: false,
            });
            return target;
        }
        return proxy;
    });

    var ref$1 = createAnnotation(function (_a) {
        var target = _a.target, key = _a.key, value = _a.value;
        var store = {
            value: target ? target[key] : value,
        };
        var proxy = {};
        var context = target ? target : store;
        var property = target ? key : 'value';
        buildDataTree(target, key, store);
        ProxyRaw.set(proxy, store);
        RawProxy.set(store, proxy);
        function get() {
            bindTargetKeyWithCurrentReaction({
                target: context,
                key: property,
                type: 'get',
            });
            return store.value;
        }
        function set(value) {
            var oldValue = store.value;
            store.value = value;
            if (oldValue !== value) {
                runReactionsFromTargetKey({
                    target: context,
                    key: property,
                    type: 'set',
                    oldValue: oldValue,
                    value: value,
                });
            }
        }
        if (target) {
            Object.defineProperty(target, key, {
                get: get,
                set: set,
                enumerable: true,
                configurable: false,
            });
            return target;
        }
        else {
            Object.defineProperty(proxy, 'value', {
                set: set,
                get: get,
            });
        }
        return proxy;
    });

    var shallow = createAnnotation(function (_a) {
        var target = _a.target, key = _a.key, value = _a.value;
        var store = {
            value: createObservable(target, key, target ? target[key] : value, true),
        };
        function get() {
            bindTargetKeyWithCurrentReaction({
                target: target,
                key: key,
                type: 'get',
            });
            return store.value;
        }
        function set(value) {
            var oldValue = store.value;
            value = createObservable(target, key, value, true);
            store.value = value;
            if (oldValue === value)
                return;
            runReactionsFromTargetKey({
                target: target,
                key: key,
                type: 'set',
                oldValue: oldValue,
                value: value,
            });
        }
        if (target) {
            Object.defineProperty(target, key, {
                set: set,
                get: get,
                enumerable: true,
                configurable: false,
            });
            return target;
        }
        return store.value;
    });

    var computed$1 = createAnnotation(function (_a) {
        var target = _a.target, key = _a.key, value = _a.value;
        var store = {};
        var proxy = {};
        var context = target ? target : store;
        var property = target ? key : 'value';
        var getter = getGetter(context);
        var setter = getSetter(context);
        function getGetter(target) {
            if (!target) {
                if (value === null || value === void 0 ? void 0 : value.get)
                    return value === null || value === void 0 ? void 0 : value.get;
                return value;
            }
            var descriptor = Object.getOwnPropertyDescriptor(target, property);
            if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.get)
                return descriptor.get;
            return getGetter(Object.getPrototypeOf(target));
        }
        function getSetter(target) {
            if (!target) {
                if (value === null || value === void 0 ? void 0 : value.set)
                    return value === null || value === void 0 ? void 0 : value.set;
                return;
            }
            var descriptor = Object.getOwnPropertyDescriptor(target, property);
            if (descriptor === null || descriptor === void 0 ? void 0 : descriptor.set)
                return descriptor.set;
            return getSetter(Object.getPrototypeOf(target));
        }
        function compute() {
            var _a;
            store.value = (_a = getter === null || getter === void 0 ? void 0 : getter.call) === null || _a === void 0 ? void 0 : _a.call(getter, context);
        }
        function reaction() {
            if (ReactionStack.indexOf(reaction) === -1) {
                try {
                    ReactionStack.push(reaction);
                    compute();
                }
                finally {
                    ReactionStack.pop();
                }
            }
        }
        reaction._name = 'ComputedReaction';
        reaction._scheduler = function () {
            reaction._dirty = true;
            batchStart();
            runReactionsFromTargetKey({
                target: context,
                key: property,
                value: store.value,
                type: 'set',
            });
            batchEnd();
        };
        reaction._isComputed = true;
        reaction._dirty = true;
        reaction._context = context;
        reaction._property = property;
        ProxyRaw.set(proxy, store);
        RawProxy.set(store, proxy);
        buildDataTree(target, key, store);
        function get() {
            if (hasRunningReaction()) {
                bindComputedReactions(reaction);
            }
            if (!isUntracking()) {
                //如果允许untracked过程中收集依赖，那么永远不会存在绑定，因为_dirty已经设置为false
                if (reaction._dirty) {
                    reaction();
                    reaction._dirty = false;
                }
            }
            else {
                compute();
            }
            bindTargetKeyWithCurrentReaction({
                target: context,
                key: property,
                type: 'get',
            });
            return store.value;
        }
        function set(value) {
            var _a;
            try {
                batchStart();
                (_a = setter === null || setter === void 0 ? void 0 : setter.call) === null || _a === void 0 ? void 0 : _a.call(setter, context, value);
            }
            finally {
                batchEnd();
            }
        }
        if (target) {
            Object.defineProperty(target, key, {
                get: get,
                set: set,
                enumerable: true,
                configurable: false,
            });
            return target;
        }
        else {
            Object.defineProperty(proxy, 'value', {
                set: set,
                get: get,
            });
        }
        return proxy;
    });

    function observable(target) {
        return createObservable(null, null, target);
    }
    observable.box = box;
    observable.ref = ref$1;
    observable.deep = observable$1;
    observable.shallow = shallow;
    observable.computed = computed$1;
    observable[MakeObservableSymbol] = observable$1;

    function define(target, annotations) {
        if (isObservable(target))
            return target;
        if (!isSupportObservable(target))
            return target;
        buildDataTree(undefined, undefined, target);
        ProxyRaw.set(target, target);
        RawProxy.set(target, target);
        for (var key in annotations) {
            var annotation = annotations[key];
            if (isAnnotation(annotation)) {
                getObservableMaker(annotation)({
                    target: target,
                    key: key,
                });
            }
        }
        return target;
    }

    var __assign$j = (undefined && undefined.__assign) || function () {
        __assign$j = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$j.apply(this, arguments);
    };
    var autorun = function (tracker, name) {
        if (name === void 0) { name = 'AutoRun'; }
        var reaction = function () {
            if (!isFn(tracker))
                return;
            if (reaction._boundary > 0)
                return;
            if (ReactionStack.indexOf(reaction) === -1) {
                releaseBindingReactions(reaction);
                try {
                    batchStart();
                    ReactionStack.push(reaction);
                    tracker();
                }
                finally {
                    ReactionStack.pop();
                    reaction._boundary++;
                    batchEnd();
                    reaction._boundary = 0;
                    reaction._memos.cursor = 0;
                    reaction._effects.cursor = 0;
                }
            }
        };
        var cleanRefs = function () {
            reaction._memos = {
                queue: [],
                cursor: 0,
            };
            reaction._effects = {
                queue: [],
                cursor: 0,
            };
        };
        reaction._boundary = 0;
        reaction._name = name;
        cleanRefs();
        reaction();
        return function () {
            disposeBindingReactions(reaction);
            disposeEffects(reaction);
            cleanRefs();
        };
    };
    autorun.memo = function (callback, dependencies) {
        if (!isFn(callback))
            return;
        var current = ReactionStack[ReactionStack.length - 1];
        if (!current || !current._memos)
            throw new Error('autorun.memo must used in autorun function body.');
        var deps = toArray(dependencies || []);
        var id = current._memos.cursor++;
        var old = current._memos.queue[id];
        if (!old || hasDepsChange(deps, old.deps)) {
            var value = callback();
            current._memos.queue[id] = {
                value: value,
                deps: deps,
            };
            return value;
        }
        return old.value;
    };
    autorun.effect = function (callback, dependencies) {
        if (!isFn(callback))
            return;
        var current = ReactionStack[ReactionStack.length - 1];
        if (!current || !current._effects)
            throw new Error('autorun.effect must used in autorun function body.');
        var effects = current._effects;
        var deps = toArray(dependencies || [{}]);
        var id = effects.cursor++;
        var old = effects.queue[id];
        if (!old || hasDepsChange(deps, old.deps)) {
            Promise.resolve(0).then(function () {
                if (current._disposed)
                    return;
                var dispose = callback();
                if (isFn(dispose)) {
                    effects.queue[id].dispose = dispose;
                }
            });
            effects.queue[id] = {
                deps: deps,
            };
        }
    };
    var reaction = function (tracker, subscriber, options) {
        var realOptions = __assign$j({ name: 'Reaction' }, options);
        var value = {};
        var dirtyCheck = function () {
            if (isFn(realOptions.equals))
                return !realOptions.equals(value.oldValue, value.currentValue);
            return value.oldValue !== value.currentValue;
        };
        var fireAction = function () {
            try {
                batchStart();
                if (isFn(subscriber))
                    subscriber(value.currentValue, value.oldValue);
            }
            finally {
                batchEnd();
            }
        };
        var reaction = function () {
            if (ReactionStack.indexOf(reaction) === -1) {
                releaseBindingReactions(reaction);
                try {
                    ReactionStack.push(reaction);
                    value.currentValue = tracker();
                }
                finally {
                    ReactionStack.pop();
                }
            }
        };
        reaction._scheduler = function (looping) {
            looping();
            if (dirtyCheck())
                fireAction();
            value.oldValue = value.currentValue;
        };
        reaction._name = realOptions.name;
        reaction();
        value.oldValue = value.currentValue;
        if (realOptions.fireImmediately) {
            fireAction();
        }
        return function () {
            disposeBindingReactions(reaction);
        };
    };

    var observe = function (target, observer, deep) {
        if (deep === void 0) { deep = true; }
        var addListener = function (target) {
            var raw = ProxyRaw.get(target) || target;
            var node = RawNode.get(raw);
            var listener = function (operation) {
                var targetRaw = ProxyRaw.get(operation.target) || operation.target;
                var targetNode = RawNode.get(targetRaw);
                if (deep) {
                    if (node.contains(targetNode)) {
                        observer(new DataChange(operation, targetNode));
                        return;
                    }
                }
                if (node === targetNode ||
                    (node.targetRaw === targetRaw && node.key === operation.key)) {
                    observer(new DataChange(operation, targetNode));
                }
            };
            if (node && isFn(observer)) {
                ObserverListeners.add(listener);
            }
            return function () {
                ObserverListeners.delete(listener);
            };
        };
        if (target && typeof target !== 'object')
            throw Error("Can not observe " + typeof target + " type.");
        return addListener(target);
    };

    var REVA_ACTIONS_KEY = Symbol.for('__REVA_ACTIONS');
    var SchemaNestedMap = {
        parent: true,
        root: true,
        properties: true,
        patternProperties: true,
        additionalProperties: true,
        items: true,
        additionalItems: true,
        'x-linkages': true,
        'x-reactions': true,
    };
    var SchemaStateMap = {
        title: 'title',
        description: 'description',
        default: 'initialValue',
        enum: 'dataSource',
        readOnly: 'readOnly',
        writeOnly: 'editable',
        'x-content': 'content',
        'x-data': 'data',
        'x-value': 'value',
        'x-editable': 'editable',
        'x-disabled': 'disabled',
        'x-read-pretty': 'readPretty',
        'x-read-only': 'readOnly',
        'x-visible': 'visible',
        'x-hidden': 'hidden',
        'x-display': 'display',
        'x-pattern': 'pattern',
        'x-validator': 'validator',
        'x-decorator': 'decoratorType',
        'x-component': 'componentType',
        'x-decorator-props': 'decoratorProps',
        'x-component-props': 'componentProps',
    };
    var SchemaValidatorMap = {
        required: true,
        format: true,
        maxItems: true,
        minItems: true,
        maxLength: true,
        minLength: true,
        maximum: true,
        minimum: true,
        exclusiveMaximum: true,
        exclusiveMinimum: true,
        pattern: true,
        const: true,
        multipleOf: true,
        maxProperties: true,
        minProperties: true,
        uniqueItems: true,
    };
    var hasOwnProperty$4 = Object.prototype.hasOwnProperty;
    var traverse$1 = function (target, visitor) {
        var seenObjects = [];
        var root = target;
        var traverse = function (target, path) {
            if (path === void 0) { path = []; }
            if (isPlainObj$1(target)) {
                var seenIndex = seenObjects.indexOf(target);
                if (seenIndex > -1) {
                    return;
                }
                var addIndex = seenObjects.length;
                seenObjects.push(target);
                if (isNoNeedCompileObject(target) && root !== target) {
                    visitor(target, path);
                    return;
                }
                each(target, function (value, key) {
                    traverse(value, path.concat(key));
                });
                seenObjects.splice(addIndex, 1);
            }
            else {
                visitor(target, path);
            }
        };
        traverse(target);
    };
    var traverseSchema = function (schema, visitor) {
        if (schema['x-validator'] !== undefined) {
            visitor(schema['x-validator'], ['x-validator']);
        }
        var seenObjects = [];
        var root = schema;
        var traverse = function (target, path) {
            if (path === void 0) { path = []; }
            if (path[0] === 'x-validator' ||
                path[0] === 'version' ||
                path[0] === '_isJSONSchemaObject')
                return;
            if (String(path[0]).indexOf('x-') == -1 && isFn$2(target))
                return;
            if (SchemaNestedMap[path[0]])
                return;
            if (isPlainObj$1(target)) {
                if (path[0] === 'default' || path[0] === 'x-value') {
                    visitor(target, path);
                    return;
                }
                var seenIndex = seenObjects.indexOf(target);
                if (seenIndex > -1) {
                    return;
                }
                var addIndex = seenObjects.length;
                seenObjects.push(target);
                if (isNoNeedCompileObject(target) && root !== target) {
                    visitor(target, path);
                    return;
                }
                each(target, function (value, key) {
                    traverse(value, path.concat(key));
                });
                seenObjects.splice(addIndex, 1);
            }
            else {
                visitor(target, path);
            }
        };
        traverse(schema);
    };
    var isNoNeedCompileObject = function (source) {
        if ('$$typeof' in source && '_owner' in source) {
            return true;
        }
        if (source['_isAMomentObject']) {
            return true;
        }
        if (Schema.isSchemaInstance(source)) {
            return true;
        }
        if (source[REVA_ACTIONS_KEY]) {
            return true;
        }
        if (isFn$2(source['toJS'])) {
            return true;
        }
        if (isFn$2(source['toJSON'])) {
            return true;
        }
        if (isObservable(source)) {
            return true;
        }
        return false;
    };
    var createDataSource = function (source) {
        return toArr$1(source).map(function (item) {
            if (typeof item === 'object') {
                return item;
            }
            else {
                return {
                    label: item,
                    value: item,
                };
            }
        });
    };
    var patchStateFormSchema = function (targetState, pattern, compiled) {
        untracked(function () {
            var path = Path.parse(pattern);
            var segments = path.segments;
            var key = segments[0];
            var isEnum = key === 'enum' && isArr$2(compiled);
            var schemaMapKey = SchemaStateMap[key];
            if (schemaMapKey) {
                Path.setIn(targetState, [schemaMapKey].concat(segments.slice(1)), isEnum ? createDataSource(compiled) : compiled);
            }
            else {
                var isValidatorKey = SchemaValidatorMap[key];
                if (isValidatorKey) {
                    targetState['setValidatorRule'](key, compiled);
                }
            }
        });
    };

    var ExpRE = /^\s*\{\{([\s\S]*)\}\}\s*$/;
    var Registry = {
        silent: false,
        compile: function (expression, scope) {
            if (scope === void 0) { scope = {}; }
            if (Registry.silent) {
                try {
                    return new Function('$root', "with($root) { return (" + expression + "); }")(scope);
                }
                catch (_a) { }
            }
            else {
                return new Function('$root', "with($root) { return (" + expression + "); }")(scope);
            }
        },
    };
    var silent = function (value) {
        if (value === void 0) { value = true; }
        Registry.silent = !!value;
    };
    var registerCompiler = function (compiler) {
        if (isFn$2(compiler)) {
            Registry.compile = compiler;
        }
    };
    var shallowCompile = function (source, scope) {
        if (isStr$1(source)) {
            var matched = source.match(ExpRE);
            if (!matched)
                return source;
            return Registry.compile(matched[1], scope);
        }
        return source;
    };
    var compile = function (source, scope) {
        var seenObjects = [];
        var compile = function (source) {
            if (isStr$1(source)) {
                return shallowCompile(source, scope);
            }
            else if (isArr$2(source)) {
                return source.map(function (value) { return compile(value); });
            }
            else if (isPlainObj$1(source)) {
                if (isNoNeedCompileObject(source))
                    return source;
                var seenIndex = seenObjects.indexOf(source);
                if (seenIndex > -1) {
                    return source;
                }
                var addIndex = seenObjects.length;
                seenObjects.push(source);
                var results = reduce(source, function (buf, value, key) {
                    buf[key] = compile(value);
                    return buf;
                }, {});
                seenObjects.splice(addIndex, 1);
                return results;
            }
            return source;
        };
        return compile(source);
    };
    var patchCompile = function (targetState, sourceState, scope) {
        traverse$1(sourceState, function (value, pattern) {
            var path = Path.parse(pattern);
            var compiled = compile(value, scope);
            var key = path.segments[0];
            if (compiled === undefined)
                return;
            if (hasOwnProperty$4.call(targetState, key)) {
                untracked(function () { return Path.setIn(targetState, path, compiled); });
            }
        });
    };
    var patchSchemaCompile = function (targetState, sourceSchema, scope, demand) {
        if (demand === void 0) { demand = false; }
        traverseSchema(sourceSchema, function (value, path) {
            var compiled = value;
            var collected = hasCollected(function () {
                compiled = compile(value, scope);
            });
            if (compiled === undefined)
                return;
            if (demand) {
                if (collected || !targetState.initialized) {
                    patchStateFormSchema(targetState, path, compiled);
                }
            }
            else {
                patchStateFormSchema(targetState, path, compiled);
            }
        });
    };

    var LifeCycle = /** @class */ (function () {
        function LifeCycle() {
            var _this = this;
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            this.buildListener = function (params) {
                return function (payload, ctx) {
                    var _this = this;
                    for (var index = 0; index < params.length; index++) {
                        var item = params[index];
                        if (isFn$2(item)) {
                            item.call(this, payload, ctx);
                        }
                        else if (isStr$1(item) && isFn$2(params[index + 1])) {
                            if (item === payload.type) {
                                params[index + 1].call(this, payload.payload, ctx);
                            }
                            index++;
                        }
                        else {
                            each(item, function (handler, type) {
                                if (isFn$2(handler) && isStr$1(type)) {
                                    if (type === payload.type) {
                                        handler.call(_this, payload.payload, ctx);
                                        return false;
                                    }
                                }
                            });
                        }
                    }
                };
            };
            this.notify = function (type, payload, ctx) {
                if (isStr$1(type)) {
                    _this.listener.call(ctx, { type: type, payload: payload }, ctx);
                }
            };
            this.listener = this.buildListener(params);
        }
        return LifeCycle;
    }());

    var __extends$4 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Heart = /** @class */ (function (_super) {
        __extends$4(Heart, _super);
        function Heart(_a) {
            var _b = _a === void 0 ? {} : _a, lifecycles = _b.lifecycles, context = _b.context;
            var _this = _super.call(this) || this;
            _this.lifecycles = [];
            _this.outerLifecycles = new Map();
            _this.buildLifeCycles = function (lifecycles) {
                return lifecycles.reduce(function (buf, item) {
                    if (item instanceof LifeCycle) {
                        return buf.concat(item);
                    }
                    else {
                        if (isArr$2(item)) {
                            return _this.buildLifeCycles(item);
                        }
                        else if (typeof item === 'object') {
                            _this.context = item;
                            return buf;
                        }
                        return buf;
                    }
                }, []);
            };
            _this.addLifeCycles = function (id, lifecycles) {
                if (lifecycles === void 0) { lifecycles = []; }
                var observers = _this.buildLifeCycles(lifecycles);
                if (observers.length) {
                    _this.outerLifecycles.set(id, observers);
                }
            };
            _this.hasLifeCycles = function (id) {
                return _this.outerLifecycles.has(id);
            };
            _this.removeLifeCycles = function (id) {
                _this.outerLifecycles.delete(id);
            };
            _this.setLifeCycles = function (lifecycles) {
                if (lifecycles === void 0) { lifecycles = []; }
                _this.lifecycles = _this.buildLifeCycles(lifecycles);
            };
            _this.publish = function (type, payload, context) {
                if (isStr$1(type)) {
                    _this.lifecycles.forEach(function (lifecycle) {
                        lifecycle.notify(type, payload, context || _this.context);
                    });
                    _this.outerLifecycles.forEach(function (lifecycles) {
                        lifecycles.forEach(function (lifecycle) {
                            lifecycle.notify(type, payload, context || _this.context);
                        });
                    });
                    _this.notify({
                        type: type,
                        payload: payload,
                    });
                }
            };
            _this.clear = function () {
                _this.lifecycles = [];
                _this.outerLifecycles.clear();
                _this.unsubscribe();
            };
            _this.lifecycles = _this.buildLifeCycles(lifecycles || []);
            _this.context = context;
            return _this;
        }
        return Heart;
    }(Subscribable));

    var isForm = function (node) {
        return node instanceof Form;
    };
    var isGeneralField = function (node) {
        return node instanceof Field$1 || node instanceof VoidField$1;
    };
    var isArrayField = function (node) {
        return node instanceof ArrayField$1;
    };
    var isObjectField = function (node) {
        return node instanceof ObjectField$1;
    };
    var isVoidField = function (node) {
        return node instanceof VoidField$1;
    };
    var isFormState = function (state) {
        if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
            return false;
        return (state === null || state === void 0 ? void 0 : state.displayName) === 'Form';
    };
    var isFieldState = function (state) {
        if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
            return false;
        return (state === null || state === void 0 ? void 0 : state.displayName) === 'Field';
    };
    var isArrayFieldState = function (state) {
        if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
            return false;
        return (state === null || state === void 0 ? void 0 : state.displayName) === 'ArrayField';
    };
    var isObjectFieldState = function (state) {
        if (isFn$2(state === null || state === void 0 ? void 0 : state.initialize))
            return false;
        return (state === null || state === void 0 ? void 0 : state.displayName) === 'ObjectField';
    };
    var isQuery = function (query) {
        return query && query instanceof Query;
    };

    var Graph = /** @class */ (function () {
        function Graph(form) {
            var _this = this;
            this.getGraph = function () {
                var graph = {};
                graph[''] = _this.form.getState();
                each(_this.form.fields, function (field, identifier) {
                    graph[identifier] = field.getState();
                });
                return graph;
            };
            this.setGraph = function (graph) {
                var form = _this.form;
                var createField = function (identifier, state) {
                    var address = Path.parse(identifier);
                    var name = address.segments[address.segments.length - 1];
                    var basePath = address.parent();
                    if (isFieldState(state)) {
                        return _this.form.createField({ name: name, basePath: basePath });
                    }
                    else if (isArrayFieldState(state)) {
                        return _this.form.createArrayField({ name: name, basePath: basePath });
                    }
                    else if (isObjectFieldState(state)) {
                        return _this.form.createObjectField({ name: name, basePath: basePath });
                    }
                    else {
                        return _this.form.createVoidField({ name: name, basePath: basePath });
                    }
                };
                each(graph, function (state, address) {
                    if (isFormState(state)) {
                        form.setState(state);
                    }
                    else {
                        var field = form.fields[address];
                        if (field) {
                            field.setState(state);
                        }
                        else {
                            createField(address, state).setState(state);
                        }
                    }
                });
            };
            this.form = form;
            define(this, {
                setGraph: batch,
            });
        }
        return Graph;
    }());

    var output = function (field, taker) {
        if (!field)
            return;
        if (isFn$2(taker)) {
            return taker(field, field.address);
        }
        return field;
    };
    var Query = /** @class */ (function () {
        function Query(props) {
            var _this = this;
            this.addresses = [];
            this.pattern = Path.parse(props.pattern, props.base);
            this.form = props.form;
            if (!this.pattern.isMatchPattern) {
                var identifier = this.pattern.toString();
                var index = this.form.indexes.get(identifier);
                var absoluteField = this.form.fields[identifier];
                var indexField = this.form.fields[index];
                if (absoluteField) {
                    this.addresses = [identifier];
                }
                else if (indexField) {
                    this.addresses = [index];
                }
            }
            else {
                each(this.form.fields, function (field, address) {
                    if (field.match(_this.pattern)) {
                        _this.addresses.push(address);
                    }
                });
            }
        }
        Query.prototype.take = function (taker) {
            return output(this.form.fields[this.addresses[0]], taker);
        };
        Query.prototype.map = function (iterator) {
            var _this = this;
            return this.addresses.map(function (address) {
                return output(_this.form.fields[address], iterator);
            });
        };
        Query.prototype.forEach = function (iterator) {
            var _this = this;
            return this.addresses.forEach(function (address) {
                return output(_this.form.fields[address], iterator);
            });
        };
        Query.prototype.reduce = function (reducer, initial) {
            var _this = this;
            return this.addresses.reduce(function (value, address) {
                return output(_this.form.fields[address], function (field, address) {
                    return reducer(value, field, address);
                });
            }, initial);
        };
        Query.prototype.get = function (key) {
            var results = this.take();
            if (results) {
                return results[key];
            }
        };
        Query.prototype.getIn = function (pattern) {
            return Path.getIn(this.take(), pattern);
        };
        Query.prototype.value = function () {
            return this.form.getValuesIn(this.pattern);
        };
        Query.prototype.initialValue = function () {
            return this.form.getInitialValuesIn(this.pattern);
        };
        return Query;
    }());

    var isValidateResult = function (obj) {
        return !!obj['type'] && !!obj['message'];
    };

    var getIn = Path.getIn;
    var self$1 = globalThisPolyfill;
    var defaultLanguage = 'en';
    var getBrowserlanguage = function () {
        /* istanbul ignore next */
        if (!self$1.navigator) {
            return defaultLanguage;
        }
        return (self$1.navigator.browserlanguage || self$1.navigator.language || defaultLanguage);
    };
    var registry = {
        locales: {
            messages: {},
            language: getBrowserlanguage(),
        },
        formats: {},
        rules: {},
        template: null,
    };
    var getISOCode = function (language) {
        var isoCode = registry.locales.language;
        var lang = lowerCase(language);
        if (registry.locales.messages[language]) {
            return language;
        }
        each(registry.locales.messages, function (messages, key) {
            var target = lowerCase(key);
            if (target.indexOf(lang) > -1 || lang.indexOf(target) > -1) {
                isoCode = key;
                return false;
            }
        });
        return isoCode;
    };
    var getLocaleByPath = function (path, lang) {
        if (lang === void 0) { lang = registry.locales.language; }
        return getIn(registry.locales.messages, getISOCode(lang) + "." + path);
    };
    var getValidateLocale = function (path) {
        var message = getLocaleByPath(path);
        return message || getLocaleByPath('pattern') || getLocaleByPath('pattern', defaultLanguage);
    };
    var getValidateMessageTemplateEngine = function () { return registry.template; };
    var getValidateFormats = function (key) {
        return key ? registry.formats[key] : registry.formats;
    };
    var getValidateRules = function (key) {
        return key ? registry.rules[key] : registry.rules;
    };
    var registerValidateLocale = function (locale) {
        registry.locales.messages = merge(registry.locales.messages, locale);
    };
    var registerValidateRules = function (rules) {
        each(rules, function (rule, key) {
            if (isFn$2(rule)) {
                registry.rules[key] = rule;
            }
        });
    };
    var registerValidateFormats = function (formats) {
        each(formats, function (pattern, key) {
            if (isStr$1(pattern) || pattern instanceof RegExp) {
                registry.formats[key] = new RegExp(pattern);
            }
        });
    };

    var render = function (result, rules) {
        var message = result.message;
        if (isStr$1(result.message)) {
            var template = getValidateMessageTemplateEngine();
            if (isFn$2(template)) {
                result.message = template(message, rules);
            }
            result.message = result.message.replace(/\{\{\s*([\w.]+)\s*\}\}/g, function (_, $0) {
                return Path.getIn(rules, $0);
            });
        }
        return result;
    };

    var __assign$i = (undefined && undefined.__assign) || function () {
        __assign$i = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$i.apply(this, arguments);
    };
    var __awaiter$4 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$4 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var getRuleMessage = function (rule, type) {
        if (rule.format) {
            return rule.message || getValidateLocale(rule.format);
        }
        return rule.message || getValidateLocale(type);
    };
    var parseValidatorDescription = function (description) {
        var rules = {};
        if (isStr$1(description)) {
            rules.format = description;
        }
        else if (isFn$2(description)) {
            rules.validator = description;
        }
        else {
            rules = Object.assign(rules, description);
        }
        rules.triggerType = rules.triggerType || 'onInput';
        return rules;
    };
    var parseValidatorDescriptions = function (validator) {
        var array = isArr$2(validator) ? validator : [validator];
        return array.map(function (description) {
            return parseValidatorDescription(description);
        });
    };
    var parseIValidatorRules = function (rules) {
        var rulesKeys = Object.keys(rules || {}).sort(function (key) {
            return key === 'validator' ? 1 : -1;
        });
        var getContext = function (context, value) {
            return __assign$i(__assign$i({ value: value }, rules), context);
        };
        var createValidate = function (callback, message) {
            return function (value, context) { return __awaiter$4(void 0, void 0, void 0, function () {
                var context_, results, e_1;
                return __generator$4(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            context_ = getContext(context, value);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, callback(value, __assign$i(__assign$i({}, rules), { message: message }), context_, function (message, scope) {
                                    var _a;
                                    return (_a = render({
                                        type: 'error',
                                        message: message,
                                    }, __assign$i(__assign$i({}, context_), scope))) === null || _a === void 0 ? void 0 : _a.message;
                                })];
                        case 2:
                            results = _a.sent();
                            if (isBool(results)) {
                                if (!results) {
                                    return [2 /*return*/, render({
                                            type: 'error',
                                            message: message,
                                        }, context_)];
                                }
                                return [2 /*return*/, {
                                        type: 'error',
                                        message: undefined,
                                    }];
                            }
                            else if (results) {
                                if (isValidateResult(results)) {
                                    return [2 /*return*/, render(results, context_)];
                                }
                                return [2 /*return*/, render({
                                        type: 'error',
                                        message: results,
                                    }, context_)];
                            }
                            return [2 /*return*/, {
                                    type: 'error',
                                    message: undefined,
                                }];
                        case 3:
                            e_1 = _a.sent();
                            return [2 /*return*/, {
                                    type: 'error',
                                    message: (e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || e_1,
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
        };
        return rulesKeys.reduce(function (buf, key) {
            var callback = getValidateRules(key);
            return callback
                ? buf.concat(createValidate(callback, getRuleMessage(rules, key)))
                : buf;
        }, []);
    };
    var parseValidator = function (validator, options) {
        if (options === void 0) { options = {}; }
        var array = isArr$2(validator) ? validator : [validator];
        var results = [];
        return array.reduce(function (buf, description) {
            var rules = parseValidatorDescription(description);
            if ((options === null || options === void 0 ? void 0 : options.triggerType) && options.triggerType !== rules.triggerType)
                return buf;
            return rules ? buf.concat(parseIValidatorRules(rules)) : buf;
        }, results);
    };

    var locales = {
        en: {
            pattern: 'This field is invalid',
            invalid: 'This field is invalid',
            required: 'The field value is required',
            number: 'The field value is not a number',
            integer: 'The field value is not an integer number',
            url: 'The field value is a invalid url',
            email: 'The field value is not a email format',
            ipv6: 'The field value is not a ipv6 format',
            ipv4: 'The field value is not a ipv4 format',
            idcard: 'The field value is not an idcard format',
            qq: 'The field value is not a qq number format',
            phone: 'The field value is not a phone number format',
            money: 'The field value is not a currency format',
            zh: 'The field value is not a chinese string',
            date: 'The field value is not a valid date format',
            zip: 'The field value is not a zip format',
            len: 'The length or number of entries must be {{len}}',
            min: 'The length or number of entries must be at least {{min}}',
            minLength: 'The length or number of entries must be at least {{minLength}}',
            minItems: 'The length or number of entries must be at least {{minItems}}',
            maximum: 'The field value cannot be greater than {{maximum}}',
            exclusiveMaximum: 'The field value must be less than {{exclusiveMaximum}}',
            minimum: 'The field value cannot be less than {{minimum}}',
            exclusiveMinimum: 'The field value must be greater than {{exclusiveMinimum}}',
            max: 'The field length or number of entries must be at most {{max}}',
            maxLength: 'The field length or number of entries must be at most {{maxLength}}',
            maxItems: 'The field length or number of entries must be at most {{maxItems}}',
            whitespace: 'This field value cannot be blank string.',
            enum: 'The field value must be one of {{enum}}',
            const: 'The field value must be equal to {{const}}',
            multipleOf: 'The field value must be divisible by {{multipleOf}}',
            maxProperties: 'The number of field properties cannot be greater than {{maxProperties}}',
            minProperties: 'The number of field properties cannot be less than {{maxProperties}}',
            uniqueItems: 'Array elements are not unique',
        },
        zh: {
            pattern: '该字段不是一个合法的字段',
            invalid: '该字段不是一个合法的字段',
            required: '该字段是必填字段',
            number: '该字段不是合法的数字',
            integer: '该字段不是合法的整型数字',
            url: '该字段不是合法的url',
            email: '该字段不是合法的邮箱格式',
            ipv6: '该字段不是合法的ipv6格式',
            ipv4: '该字段不是合法的ipv4格式',
            idcard: '该字段不是合法的身份证格式',
            qq: '该字段不符合QQ号格式',
            phone: '该字段不是有效的手机号',
            money: '该字段不是有效货币格式',
            zh: '该字段不是合法的中文字符串',
            date: '该字段不是合法的日期格式',
            zip: '该字段不是合法的邮编格式',
            len: '长度或条目数必须为{{len}}',
            min: '长度或条目数不能小于{{min}}',
            minLength: '长度或条目数不能小于{{minLength}}',
            minItems: '长度或条目数不能小于{{minItems}}',
            max: '长度或条目数不能大于{{max}}',
            maxLength: '长度或条目数不能大于{{maxLength}}',
            maxItems: '长度或条目数不能大于{{maxItems}}',
            maximum: '数值不能大于{{maximum}}',
            exclusiveMaximum: '数值必须小于{{exclusiveMaximum}}',
            minimum: '数值不能小于{{minimum}}',
            exclusiveMinimum: '数值必须大于{{exclusiveMinimum}}',
            whitespace: '不能为纯空白字符串',
            enum: '字段值必须为{{enum}}其中一个',
            const: '字段值必须等于{{const}}',
            multipleOf: '字段值不能被{{multipleOf}}整除',
            maxProperties: '字段属性数量不能大于{{maxProperties}}',
            minProperties: '字段属性数量不能小于{{minProperties}}',
            uniqueItems: '数组元素不唯一',
        },
        'en-US': {
            pattern: 'This field is invalid',
            invalid: 'This field is invalid',
            required: 'The field value is required',
            number: 'The field value is not a number',
            integer: 'The field value is not an integer number',
            url: 'The field value is a invalid url',
            email: 'The field value is not a email format',
            ipv6: 'The field value is not a ipv6 format',
            ipv4: 'The field value is not a ipv4 format',
            idcard: 'The field value is not an idcard format',
            qq: 'The field value is not a qq number format',
            phone: 'The field value is not a phone number format',
            money: 'The field value is not a currency format',
            zh: 'The field value is not a chinese string',
            date: 'The field value is not a valid date format',
            zip: 'The field value is not a zip format',
            len: 'The length or number of entries must be {{len}}',
            min: 'The length or number of entries must be at least {{min}}',
            minLength: 'The length or number of entries must be at least {{minLength}}',
            minItems: 'The length or number of entries must be at least {{minItems}}',
            maximum: 'The field value cannot be greater than {{maximum}}',
            exclusiveMaximum: 'The field value must be less than {{exclusiveMaximum}}',
            minimum: 'The field value cannot be less than {{minimum}}',
            exclusiveMinimum: 'The field value must be greater than {{exclusiveMinimum}}',
            max: 'The field length or number of entries must be at most {{max}}',
            maxLength: 'The field length or number of entries must be at most {{maxLength}}',
            maxItems: 'The field length or number of entries must be at most {{maxItems}}',
            whitespace: 'This field value cannot be blank string.',
            enum: 'The field value must be one of {{enum}}',
            const: 'The field value must be equal to {{const}}',
            multipleOf: 'The field value must be divisible by {{multipleOf}}',
            maxProperties: 'The number of field properties cannot be greater than {{maxProperties}}',
            minProperties: 'The number of field properties cannot be less than {{maxProperties}}',
            uniqueItems: 'Array elements are not unique',
        },
        'zh-CN': {
            pattern: '该字段不是一个合法的字段',
            invalid: '该字段不是一个合法的字段',
            required: '该字段是必填字段',
            number: '该字段不是合法的数字',
            integer: '该字段不是合法的整型数字',
            url: '该字段不是合法的url',
            email: '该字段不是合法的邮箱格式',
            ipv6: '该字段不是合法的ipv6格式',
            ipv4: '该字段不是合法的ipv4格式',
            idcard: '该字段不是合法的身份证格式',
            qq: '该字段不符合QQ号格式',
            phone: '该字段不是有效的手机号',
            money: '该字段不是有效货币格式',
            zh: '该字段不是合法的中文字符串',
            date: '该字段不是合法的日期格式',
            zip: '该字段不是合法的邮编格式',
            len: '长度或条目数必须为{{len}}',
            min: '长度或条目数不能小于{{min}}',
            minLength: '长度或条目数不能小于{{minLength}}',
            minItems: '长度或条目数不能小于{{minItems}}',
            maxLength: '长度或条目数不能大于{{maxLength}}',
            maxItems: '长度或条目数不能大于{{maxItems}}',
            max: '长度或条目数不能大于{{max}}',
            maximum: '数值不能大于{{maximum}}',
            exclusiveMaximum: '数值必须小于{{exclusiveMaximum}}',
            minimum: '数值不能小于{{minimum}}',
            exclusiveMinimum: '数值必须大于{{exclusiveMinimum}}',
            whitespace: '不能为纯空白字符串',
            enum: '字段值必须为{{enum}}其中一个',
            const: '字段值必须等于{{const}}',
            multipleOf: '字段值不能被{{multipleOf}}整除',
            maxProperties: '字段属性数量不能大于{{maxProperties}}',
            minProperties: '字段属性数量不能小于{{minProperties}}',
            uniqueItems: '数组元素不唯一',
        },
        'zh-TW': {
            pattern: '該字段不是一個合法的字段',
            invalid: '該字段不是一個合法的字段',
            required: '該字段是必填字段',
            number: '該字段不是合法的數字',
            integer: '該字段不是合法的整型數字',
            url: '該字段不是合法的url',
            email: '該字段不是合法的郵箱格式',
            ipv6: '該字段不是合法的ipv6格式',
            ipv4: '該字段不是合法的ipv4格式',
            idcard: '該字段不是合法的身份證格式',
            qq: '該字段不符合QQ號格式',
            phone: '該字段不是有效的手機號',
            money: '該字段不是有效貨幣格式',
            zh: '該字段不是合法的中文字符串',
            date: '該字段不是合法的日期格式',
            zip: '該字段不是合法的郵編格式',
            len: '長度或條目數必須為{{len}}',
            min: '長度或條目數不能小於{{min}}',
            minItems: '長度或條目數不能小於{{minItems}}',
            minLength: '長度或條目數不能小於{{minLength}}',
            max: '長度或條目數不能大於{{max}}',
            maxItems: '長度或條目數不能大於{{maxItems}}',
            maxLength: '長度或條目數不能大於{{maxLength}}',
            maximum: '數值不能大於{{maximum}}',
            exclusiveMaximum: '數值必須小於{{exclusiveMaximum}}',
            minimum: '數值不能小於{{minimum}}',
            exclusiveMinimum: '數值必須大於{{exclusiveMinimum}}',
            whitespace: '不能為純空白字符串',
            enum: '字段值必須為{{enum}}其中一個',
            const: '字段值必須等於{{const}}',
            multipleOf: '字段值不能被{{multipleOf}}整除',
            maxProperties: '字段屬性數量不能大於{{maxProperties}}',
            minProperties: '字段屬性數量不能小於{{minProperties}}',
            uniqueItems: '數組元素不唯一',
        },
        ja: {
            url: 'このフィールドは無効なURLです',
            whitespace: 'このフィールドを空の文字列にすることはできません。',
            zh: 'このフィールドは中国語の文字列ではありません',
            zip: 'このフィールドはzip形式ではありません',
            date: 'このフィールドは有効な日付形式ではありません',
            email: 'このフィールドはメール形式ではありません',
            exclusiveMaximum: '値は{{exclusiveMaximum}}未満である必要があります',
            exclusiveMinimum: '値は{{exclusiveMinimum}}より大きい必要があります',
            idcard: 'このフィールドはIDカード形式ではありません',
            integer: 'このフィールドは整数ではありません',
            ipv4: 'このフィールドはIPv4形式ではありません',
            ipv6: 'このフィールドはIPv6形式ではありません',
            len: 'エントリの長さまたは数は{{len}}でなければなりません',
            max: 'エントリの長さまたは数は最大{{max}}でなければなりません',
            maxItems: 'エントリの長さまたは数は最大{{maxItems}}でなければなりません',
            maxLength: 'エントリの長さまたは数は最大{{maxLength}}でなければなりません',
            maximum: '値は{{最大}}を超えることはできません',
            min: 'エントリの長さまたは数は、少なくとも{{min}}である必要があります',
            minItems: 'エントリの長さまたは数は、少なくとも{{minItems}}である必要があります',
            minLength: 'エントリの長さまたは数は、少なくとも{{minLength}}である必要があります',
            minimum: '値は{{minimum}}以上にする必要があります',
            money: 'このフィールドは通貨形式ではありません',
            number: 'このフィールドは数値ではありません',
            pattern: 'このフィールドはどのパターンとも一致しません',
            invalid: 'このフィールドはどのパターンとも一致しません',
            phone: 'このフィールドは電話番号の形式ではありません',
            qq: 'このフィールドはqq数値形式ではありません',
            required: 'この項目は必須です',
            enum: 'フィールド値は{{enum}}のいずれかである必要があります',
            cons: 'フィールド値は{{const}}と等しくなければなりません',
            multipleOf: 'フィールド値を{{multipleOf}}で割り切れない',
            maxProperties: 'フィールドプロパティの数は{{maxProperties}}を超えることはできません',
            minProperties: 'フィールドプロパティの数は{{minProperties}}未満にすることはできません',
            uniqueItems: '配列要素は一意ではありません',
        },
    };

    var formats = {
        url: new RegExp(
        // protocol identifier
        '^(?:(?:(?:https?|ftp|rtmp):)?//)' +
            // user:pass authentication
            '(?:\\S+(?::\\S*)?@)?' +
            '(?:' +
            // IP address exclusion - private & local networks
            // Reference: https://www.arin.net/knowledge/address_filters.html
            // filter 10.*.*.* and 127.*.*.* adresses
            '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
            // filter 169.254.*.* and 192.168.*.*
            '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
            // filter 172.16.0.0 - 172.31.255.255
            // TODO: add test to validate that it invalides address in 16-31 range
            '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
            // IP address dotted notation octets
            // excludes loopback network 0.0.0.0
            // excludes reserved space >= 224.0.0.0
            // excludes network & broacast addresses
            // (first & last IP address of each class)
            // filter 1. part for 1-223
            '(?:22[0-3]|2[01]\\d|[1-9]\\d?|1\\d\\d)' +
            // filter 2. and 3. part for 0-255
            '(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){2}' +
            // filter 4. part for 1-254
            '(?:\\.(?:25[0-4]|2[0-4]\\d|1\\d\\d|[1-9]\\d?))' +
            '|' +
            // host name
            '(?:(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9_]+)' +
            // domain name
            '(?:\\.(?:[a-z\\u00a1-\\uffff0-9_]-*)*[a-z\\u00a1-\\uffff0-9_]+)*' +
            // TLD identifier
            '(?:\\.(?:[a-z\\u00a1-\\uffff_]{2,}))' +
            ')' +
            // port number
            '(?::\\d{2,5})?' +
            // resource path
            '(?:/?\\S*)?$'),
        email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        ipv6: /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
        ipv4: /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,
        number: /^[+-]?\d+(\.\d+)?$/,
        integer: /^[+-]?\d+$/,
        qq: /^(\+?[1-9]\d*|0)$/,
        phone: /^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/,
        idcard: /^\d{15}$|^\d{17}(\d|x|X)$/,
        money: /^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\20B9\uFFE5]\s*)(\d+,?)+\.?\d*\s*$/,
        zh: /^[\u4e00-\u9fa5]+$/,
        date: /^[0-9]+[./-][0-9]+[./-][0-9]+\s*(?:[0-9]+\s*:\s*[0-9]+\s*:\s*[0-9]+)?$/,
        zip: /^[0-9]{6}$/,
    };

    var __assign$h = (undefined && undefined.__assign) || function () {
        __assign$h = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$h.apply(this, arguments);
    };
    var __awaiter$3 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$3 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __read$d = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$5 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$d(arguments[i]));
        return ar;
    };
    var isValidateEmpty = function (value) {
        var _a;
        if (isArr$2(value)) {
            for (var i = 0; i < value.length; i++) {
                if (isValid$6(value[i]))
                    return false;
            }
            return true;
        }
        else {
            //compat to draft-js
            if (value === null || value === void 0 ? void 0 : value.getCurrentContent) {
                /* istanbul ignore next */
                return !((_a = value.getCurrentContent()) === null || _a === void 0 ? void 0 : _a.hasText());
            }
            return isEmpty(value);
        }
    };
    var getLength = function (value) {
        return isStr$1(value) ? stringLength(value) : value ? value.length : 0;
    };
    var extendSameRules = function (rules, names) {
        each(names, function (realName, name) {
            rules[name] = function (value, rule) {
                var _a;
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                return rules[realName].apply(rules, __spread$5([value, __assign$h(__assign$h({}, rule), (_a = {}, _a[realName] = rule[name], _a))], args));
            };
        });
    };
    var RULES = {
        format: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            return !new RegExp(getValidateFormats(rule.format) || '').test(value)
                ? rule.message
                : '';
        },
        required: function (value, rule) {
            if (rule.required === false)
                return '';
            return isValidateEmpty(value) ? rule.message : '';
        },
        max: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            var length = isNum$1(value) ? value : getLength(value);
            var max = Number(rule.max);
            return length > max ? rule.message : '';
        },
        min: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            var length = isNum$1(value) ? value : getLength(value);
            var min = Number(rule.min);
            return length < min ? rule.message : '';
        },
        exclusiveMaximum: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            var length = isNum$1(value) ? value : getLength(value);
            var max = Number(rule.exclusiveMaximum);
            return length >= max ? rule.message : '';
        },
        exclusiveMinimum: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            var length = isNum$1(value) ? value : getLength(value);
            var min = Number(rule.exclusiveMinimum);
            return length <= min ? rule.message : '';
        },
        len: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            var length = getLength(value);
            var len = Number(rule.len);
            return length !== len ? rule.message : '';
        },
        pattern: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            return !new RegExp(rule.pattern).test(value) ? rule.message : '';
        },
        validator: function (value, rule, context, format) {
            return __awaiter$3(this, void 0, void 0, function () {
                var response;
                return __generator$3(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isFn$2(rule.validator)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Promise.resolve(rule.validator(value, rule, context, format))];
                        case 1:
                            response = _a.sent();
                            if (isBool(response)) {
                                return [2 /*return*/, !response ? rule.message : ''];
                            }
                            else {
                                return [2 /*return*/, response];
                            }
                        case 2: 
                        /* istanbul ignore next */
                        throw new Error("The rule's validator property must be a function.");
                    }
                });
            });
        },
        whitespace: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            if (rule.whitespace) {
                return /^\s+$/.test(value) ? rule.message : '';
            }
        },
        enum: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            var enums = toArr$1(rule.enum);
            return enums.indexOf(value) === -1 ? rule.message : '';
        },
        const: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            return rule.const !== value ? rule.message : '';
        },
        multipleOf: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            return Number(value) % Number(rule.multipleOf) !== 0 ? rule.message : '';
        },
        uniqueItems: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            value = toArr$1(value);
            return value.some(function (item, index) {
                for (var i = 0; i < value.length; i++) {
                    if (i !== index && !isEqual$1(value[i], item)) {
                        return false;
                    }
                }
                return true;
            })
                ? ''
                : rule.message;
        },
        maxProperties: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            return Object.keys(value || {}).length <= Number(rule.maxProperties)
                ? ''
                : rule.message;
        },
        minProperties: function (value, rule) {
            if (isValidateEmpty(value))
                return '';
            return Object.keys(value || {}).length >= Number(rule.minProperties)
                ? ''
                : rule.message;
        },
    };
    extendSameRules(RULES, {
        maximum: 'max',
        minimum: 'min',
        maxItems: 'max',
        minItems: 'min',
        maxLength: 'max',
        minLength: 'min',
    });

    var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    registerValidateRules(RULES);
    registerValidateLocale(locales);
    registerValidateFormats(formats);
    var validate = function (value, validator, options) { return __awaiter$2(void 0, void 0, void 0, function () {
        var validates, results, i, result, type, message;
        return __generator$2(this, function (_a) {
            switch (_a.label) {
                case 0:
                    validates = parseValidator(validator, options);
                    results = {
                        error: [],
                        success: [],
                        warning: [],
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < validates.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, validates[i](value, options === null || options === void 0 ? void 0 : options.context)];
                case 2:
                    result = _a.sent();
                    type = result.type, message = result.message;
                    results[type] = results[type] || [];
                    if (message) {
                        results[type].push(message);
                        if (options === null || options === void 0 ? void 0 : options.validateFirst)
                            return [3 /*break*/, 4];
                    }
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, results];
            }
        });
    }); };

    var LifeCycleTypes;
    (function (LifeCycleTypes) {
        /**
         * Form LifeCycle
         **/
        LifeCycleTypes["ON_FORM_INIT"] = "onFormInit";
        LifeCycleTypes["ON_FORM_MOUNT"] = "onFormMount";
        LifeCycleTypes["ON_FORM_UNMOUNT"] = "onFormUnmount";
        LifeCycleTypes["ON_FORM_INPUT_CHANGE"] = "onFormInputChange";
        LifeCycleTypes["ON_FORM_VALUES_CHANGE"] = "onFormValuesChange";
        LifeCycleTypes["ON_FORM_INITIAL_VALUES_CHANGE"] = "onFormInitialValuesChange";
        LifeCycleTypes["ON_FORM_SUBMIT"] = "onFormSubmit";
        LifeCycleTypes["ON_FORM_RESET"] = "onFormReset";
        LifeCycleTypes["ON_FORM_SUBMIT_START"] = "onFormSubmitStart";
        LifeCycleTypes["ON_FORM_SUBMITTING"] = "onFormSubmitting";
        LifeCycleTypes["ON_FORM_SUBMIT_END"] = "onFormSubmitEnd";
        LifeCycleTypes["ON_FORM_SUBMIT_VALIDATE_START"] = "onFormSubmitValidateStart";
        LifeCycleTypes["ON_FORM_SUBMIT_VALIDATE_SUCCESS"] = "onFormSubmitValidateSuccess";
        LifeCycleTypes["ON_FORM_SUBMIT_VALIDATE_FAILED"] = "onFormSubmitValidateFailed";
        LifeCycleTypes["ON_FORM_SUBMIT_VALIDATE_END"] = "onFormSubmitValidateEnd";
        LifeCycleTypes["ON_FORM_SUBMIT_SUCCESS"] = "onFormSubmitSuccess";
        LifeCycleTypes["ON_FORM_SUBMIT_FAILED"] = "onFormSubmitFailed";
        LifeCycleTypes["ON_FORM_VALIDATE_START"] = "onFormValidateStart";
        LifeCycleTypes["ON_FORM_VALIDATING"] = "onFormValidating";
        LifeCycleTypes["ON_FORM_VALIDATE_SUCCESS"] = "onFormValidateSuccess";
        LifeCycleTypes["ON_FORM_VALIDATE_FAILED"] = "onFormValidateFailed";
        LifeCycleTypes["ON_FORM_VALIDATE_END"] = "onFormValidateEnd";
        LifeCycleTypes["ON_FORM_GRAPH_CHANGE"] = "onFormGraphChange";
        LifeCycleTypes["ON_FORM_LOADING"] = "onFormLoading";
        /**
         * Field LifeCycle
         **/
        LifeCycleTypes["ON_FIELD_INIT"] = "onFieldInit";
        LifeCycleTypes["ON_FIELD_INPUT_VALUE_CHANGE"] = "onFieldInputValueChange";
        LifeCycleTypes["ON_FIELD_VALUE_CHANGE"] = "onFieldValueChange";
        LifeCycleTypes["ON_FIELD_INITIAL_VALUE_CHANGE"] = "onFieldInitialValueChange";
        LifeCycleTypes["ON_FIELD_SUBMIT"] = "onFieldSubmit";
        LifeCycleTypes["ON_FIELD_SUBMIT_START"] = "onFieldSubmitStart";
        LifeCycleTypes["ON_FIELD_SUBMITTING"] = "onFieldSubmitting";
        LifeCycleTypes["ON_FIELD_SUBMIT_END"] = "onFieldSubmitEnd";
        LifeCycleTypes["ON_FIELD_SUBMIT_VALIDATE_START"] = "onFieldSubmitValidateStart";
        LifeCycleTypes["ON_FIELD_SUBMIT_VALIDATE_SUCCESS"] = "onFieldSubmitValidateSuccess";
        LifeCycleTypes["ON_FIELD_SUBMIT_VALIDATE_FAILED"] = "onFieldSubmitValidateFailed";
        LifeCycleTypes["ON_FIELD_SUBMIT_VALIDATE_END"] = "onFieldSubmitValidateEnd";
        LifeCycleTypes["ON_FIELD_SUBMIT_SUCCESS"] = "onFieldSubmitSuccess";
        LifeCycleTypes["ON_FIELD_SUBMIT_FAILED"] = "onFieldSubmitFailed";
        LifeCycleTypes["ON_FIELD_VALIDATE_START"] = "onFieldValidateStart";
        LifeCycleTypes["ON_FIELD_VALIDATING"] = "onFieldValidating";
        LifeCycleTypes["ON_FIELD_VALIDATE_SUCCESS"] = "onFieldValidateSuccess";
        LifeCycleTypes["ON_FIELD_VALIDATE_FAILED"] = "onFieldValidateFailed";
        LifeCycleTypes["ON_FIELD_VALIDATE_END"] = "onFieldValidateEnd";
        LifeCycleTypes["ON_FIELD_LOADING"] = "onFieldLoading";
        LifeCycleTypes["ON_FIELD_RESET"] = "onFieldReset";
        LifeCycleTypes["ON_FIELD_MOUNT"] = "onFieldMount";
        LifeCycleTypes["ON_FIELD_UNMOUNT"] = "onFieldUnmount";
    })(LifeCycleTypes || (LifeCycleTypes = {}));

    var ReservedProperties = {
        form: true,
        parent: true,
        props: true,
        caches: true,
        requests: true,
        disposers: true,
        heart: true,
        graph: true,
        indexes: true,
        fields: true,
        lifecycles: true,
        originValues: true,
        componentType: true,
        componentProps: true,
        decoratorType: true,
        decoratorProps: true,
    };
    var RESPONSE_REQUEST_DURATION = 100;
    var GlobalState = {
        lifecycles: [],
        context: [],
        effectStart: false,
        effectEnd: false,
        initializing: false,
    };
    var NumberIndexReg = /^\.(\d+)/;

    var __assign$g = (undefined && undefined.__assign) || function () {
        __assign$g = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$g.apply(this, arguments);
    };
    var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var isHTMLInputEvent = function (event, stopPropagation) {
        var _a;
        if (stopPropagation === void 0) { stopPropagation = true; }
        if (event === null || event === void 0 ? void 0 : event.target) {
            if (isValid$6(event.target.value) || isValid$6(event.target.checked))
                return true;
            if (event.target.tagName &&
                event.target.tagName !== 'INPUT' &&
                event.target.tagName !== 'TEXTAREA' &&
                event.target.tagName !== 'SELECT') {
                return false;
            }
            if (stopPropagation)
                (_a = event.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(event);
            return true;
        }
        return false;
    };
    var getValuesFromEvent = function (args) {
        return args.map(function (event) {
            if (event === null || event === void 0 ? void 0 : event.target) {
                if (isValid$6(event.target.value))
                    return event.target.value;
                if (isValid$6(event.target.checked))
                    return event.target.checked;
                return;
            }
            return event;
        });
    };
    var buildFieldPath = function (field) {
        var prevArray = false;
        return field.address.reduce(function (path, key, index) {
            var currentPath = path.concat([key]);
            var currentAddress = field.address.slice(0, index + 1);
            var current = field.form.fields[currentAddress.toString()];
            if (prevArray) {
                prevArray = false;
                return path;
            }
            if (index >= field.address.length - 1) {
                if (isVoidField(field)) {
                    return currentPath;
                }
                return currentPath;
            }
            if (isVoidField(current)) {
                var parentAddress = field.address.slice(0, index);
                var parent_1 = field.form.fields[parentAddress.toString()];
                if (isArrayField(parent_1) && isNumberLike$1(key)) {
                    prevArray = true;
                    return currentPath;
                }
                return path;
            }
            else {
                prevArray = false;
            }
            return currentPath;
        }, new Path(''));
    };
    var buildNodeIndexes = function (field, address) {
        field.address = Path.parse(address);
        field.path = buildFieldPath(field);
        field.form.indexes.set(field.path.toString(), field.address.toString());
        return field;
    };
    var patchFieldStates = function (target, patches) {
        patches.forEach(function (_a) {
            var _b;
            var type = _a.type, address = _a.address, oldAddress = _a.oldAddress, payload = _a.payload;
            if (type === 'remove') {
                (_b = target[address]) === null || _b === void 0 ? void 0 : _b.dispose();
                delete target[address];
            }
            else if (type === 'update') {
                if (payload) {
                    target[address] = payload;
                    if (target[oldAddress] === payload)
                        delete target[oldAddress];
                }
                if (address && payload) {
                    buildNodeIndexes(payload, address);
                }
            }
        });
    };
    var patchFormValues = function (form, path, source) {
        var update = function (path, source) {
            if (path.length) {
                form.setValuesIn(path, clone(source));
            }
            else {
                Object.assign(form.values, clone(source));
            }
        };
        var patch = function (source, path) {
            if (path === void 0) { path = []; }
            var targetValue = form.getValuesIn(path);
            var targetField = form.query(path).take();
            if (allowAssignDefaultValue(targetValue, source)) {
                update(path, source);
            }
            else {
                if (isEmpty(source))
                    return;
                if (GlobalState.initializing)
                    return;
                if (isPlainObj$1(targetValue) && isPlainObj$1(source)) {
                    each(source, function (value, key) {
                        patch(value, path.concat(key));
                    });
                }
                else {
                    if (targetField) {
                        if (!isVoidField(targetField) && !targetField.modified) {
                            update(path, source);
                        }
                    }
                    else {
                        update(path, source);
                    }
                }
            }
        };
        patch(source, path);
    };
    var matchFeedback = function (search, feedback) {
        if (!search || !feedback)
            return false;
        if (search.type && search.type !== feedback.type)
            return false;
        if (search.code && search.code !== feedback.code)
            return false;
        if (search.path && feedback.path) {
            if (!Path.parse(search.path).match(feedback.path))
                return false;
        }
        if (search.address && feedback.address) {
            if (!Path.parse(search.address).match(feedback.address))
                return false;
        }
        if (search.triggerType && search.triggerType !== feedback.triggerType)
            return false;
        return true;
    };
    var queryFeedbacks = function (field, search) {
        return field.feedbacks.filter(function (feedback) {
            var _a, _b, _c;
            if (!((_a = feedback.messages) === null || _a === void 0 ? void 0 : _a.length))
                return false;
            return matchFeedback(search, __assign$g(__assign$g({}, feedback), { address: (_b = field.address) === null || _b === void 0 ? void 0 : _b.toString(), path: (_c = field.path) === null || _c === void 0 ? void 0 : _c.toString() }));
        });
    };
    var queryFeedbackMessages = function (field, search) {
        return queryFeedbacks(field, search).reduce(function (buf, info) { return (isEmpty(info.messages) ? buf : buf.concat(info.messages)); }, []);
    };
    var updateFeedback = function (field, feedback) {
        if (!feedback)
            return;
        return batch(function () {
            var _a, _b;
            if (!field.feedbacks.length) {
                if (!((_a = feedback.messages) === null || _a === void 0 ? void 0 : _a.length)) {
                    return;
                }
                field.feedbacks = [feedback];
            }
            else {
                var searched_1 = queryFeedbacks(field, feedback);
                if (searched_1.length) {
                    field.feedbacks = field.feedbacks.reduce(function (buf, item) {
                        var _a;
                        if (searched_1.includes(item)) {
                            if ((_a = feedback.messages) === null || _a === void 0 ? void 0 : _a.length) {
                                item.messages = feedback.messages;
                                return buf.concat(item);
                            }
                            else {
                                return buf;
                            }
                        }
                        else {
                            return buf.concat(item);
                        }
                    }, []);
                    return;
                }
                else if ((_b = feedback.messages) === null || _b === void 0 ? void 0 : _b.length) {
                    field.feedbacks = field.feedbacks.concat(feedback);
                }
            }
        });
    };
    var validateToFeedbacks = function (field, triggerType) { return __awaiter$1(void 0, void 0, void 0, function () {
        var results;
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validate(field.value, field.validator, {
                        triggerType: triggerType,
                        validateFirst: field.props.validateFirst || field.form.props.validateFirst,
                        context: field,
                    })];
                case 1:
                    results = _a.sent();
                    batch(function () {
                        each(results, function (messages, type) {
                            field.setFeedback({
                                triggerType: triggerType,
                                type: type,
                                code: pascalCase("validate-" + type),
                                messages: messages,
                            });
                        });
                    });
                    return [2 /*return*/, results];
            }
        });
    }); };
    var setValidatorRule = function (field, name, value) {
        var _a, _b, _c, _d;
        if (!isValid$6(value))
            return;
        var hasRule = parseValidatorDescriptions(field.validator).some(function (desc) { return name in desc; });
        var rule = (_a = {},
            _a[name] = value,
            _a);
        if (hasRule) {
            if (isArr$2(field.validator)) {
                field.validator = field.validator.map(function (desc) {
                    if (Object.prototype.hasOwnProperty.call(desc, name)) {
                        desc[name] = value;
                        return desc;
                    }
                    return desc;
                });
            }
            else if (isPlainObj$1(field.validator)) {
                field.validator[name] = value;
            }
            else {
                field.validator = (_b = {},
                    _b[name] = value,
                    _b);
            }
        }
        else {
            if (isArr$2(field.validator)) {
                if (name === 'required') {
                    field.validator.unshift(rule);
                }
                else {
                    field.validator.push(rule);
                }
            }
            else if (isPlainObj$1(field.validator)) {
                field.validator[name] = value;
            }
            else if (field.validator) {
                if (name === 'required') {
                    field.validator = [
                        (_c = {},
                            _c[name] = value,
                            _c),
                        field.validator,
                    ];
                }
                else {
                    field.validator = [
                        field.validator,
                        (_d = {},
                            _d[name] = value,
                            _d),
                    ];
                }
            }
            else {
                field.validator = [rule];
            }
        }
    };
    var spliceArrayState = function (field, props) {
        var _a = __assign$g({ startIndex: 0, deleteCount: 0, insertCount: 0 }, props), startIndex = _a.startIndex, deleteCount = _a.deleteCount, insertCount = _a.insertCount;
        var address = field.address.toString();
        var addrLength = address.length;
        var fields = field.form.fields;
        var fieldPatches = [];
        var offset = insertCount - deleteCount;
        var isArrayChildren = function (identifier) {
            return identifier.indexOf(address) === 0 && identifier.length > addrLength;
        };
        var isAfterNode = function (identifier) {
            var _a;
            var afterStr = identifier.substring(addrLength);
            var number = (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1];
            if (number === undefined)
                return false;
            var index = Number(number);
            return index > startIndex + deleteCount - 1;
        };
        var isInsertNode = function (identifier) {
            var _a;
            var afterStr = identifier.substring(addrLength);
            var number = (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1];
            if (number === undefined)
                return false;
            var index = Number(number);
            return index >= startIndex && index < startIndex + insertCount;
        };
        var isDeleteNode = function (identifier) {
            var _a;
            var preStr = identifier.substring(0, addrLength);
            var afterStr = identifier.substring(addrLength);
            var number = (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1];
            if (number === undefined)
                return false;
            var index = Number(number);
            return (index >= startIndex &&
                !fields["" + preStr + afterStr.replace(/^\.\d+/, "." + (index + deleteCount))]);
        };
        var moveIndex = function (identifier) {
            var _a;
            if (offset === 0)
                return identifier;
            var preStr = identifier.substring(0, addrLength);
            var afterStr = identifier.substring(addrLength);
            var number = (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1];
            if (number === undefined)
                return identifier;
            var index = Number(number) + offset;
            return "" + preStr + afterStr.replace(/^\.\d+/, "." + index);
        };
        batch(function () {
            each(fields, function (field, identifier) {
                if (isArrayChildren(identifier)) {
                    if (isAfterNode(identifier)) {
                        var newIdentifier = moveIndex(identifier);
                        fieldPatches.push({
                            type: 'update',
                            address: newIdentifier,
                            oldAddress: identifier,
                            payload: field,
                        });
                    }
                    if (isInsertNode(identifier) || isDeleteNode(identifier)) {
                        fieldPatches.push({ type: 'remove', address: identifier });
                    }
                }
            });
            patchFieldStates(fields, fieldPatches);
        });
        field.form.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
    };
    var exchangeArrayState = function (field, props) {
        var _a = __assign$g({ fromIndex: 0, toIndex: 0 }, props), fromIndex = _a.fromIndex, toIndex = _a.toIndex;
        var address = field.address.toString();
        var fields = field.form.fields;
        var addrLength = address.length;
        var fieldPatches = [];
        var isArrayChildren = function (identifier) {
            return identifier.indexOf(address) === 0 && identifier.length > addrLength;
        };
        var isFromOrToNode = function (identifier) {
            var _a;
            var afterStr = identifier.substring(addrLength);
            var number = (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1];
            if (number === undefined)
                return false;
            var index = Number(number);
            return index === toIndex || index === fromIndex;
        };
        var moveIndex = function (identifier) {
            var preStr = identifier.substring(0, addrLength);
            var afterStr = identifier.substring(addrLength);
            var number = afterStr.match(NumberIndexReg)[1];
            var current = Number(number);
            var index = current;
            if (index === fromIndex) {
                index = toIndex;
            }
            else {
                index = fromIndex;
            }
            return "" + preStr + afterStr.replace(/^\.\d+/, "." + index);
        };
        batch(function () {
            each(fields, function (field, identifier) {
                if (isArrayChildren(identifier)) {
                    if (isFromOrToNode(identifier)) {
                        var newIdentifier = moveIndex(identifier);
                        fieldPatches.push({
                            type: 'update',
                            address: newIdentifier,
                            oldAddress: identifier,
                            payload: field,
                        });
                        if (!fields[newIdentifier]) {
                            fieldPatches.push({
                                type: 'remove',
                                address: identifier,
                            });
                        }
                    }
                }
            });
            patchFieldStates(fields, fieldPatches);
        });
        field.form.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
    };
    var cleanupArrayChildren = function (field, start) {
        var address = field.address.toString();
        var fields = field.form.fields;
        var isArrayChildren = function (identifier) {
            return (identifier.indexOf(address) === 0 && identifier.length > address.length);
        };
        var isNeedCleanup = function (identifier) {
            var _a;
            var afterStr = identifier.slice(address.length);
            var number = (_a = afterStr.match(NumberIndexReg)) === null || _a === void 0 ? void 0 : _a[1];
            if (number === undefined)
                return false;
            var index = Number(number);
            return index >= start;
        };
        batch(function () {
            each(fields, function (field, identifier) {
                if (isArrayChildren(identifier) && isNeedCleanup(identifier)) {
                    field.destroy();
                }
            });
        });
    };
    var cleanupObjectChildren = function (field, keys) {
        if (keys.length === 0)
            return;
        var address = field.address.toString();
        var fields = field.form.fields;
        var isObjectChildren = function (identifier) {
            return (identifier.indexOf(address) === 0 && identifier.length > address.length);
        };
        var isNeedCleanup = function (identifier) {
            var _a;
            var afterStr = identifier.slice(address.length);
            var key = (_a = afterStr.match(/^\.([^.]+)/)) === null || _a === void 0 ? void 0 : _a[1];
            if (key === undefined)
                return false;
            return keys.includes(key);
        };
        batch(function () {
            each(fields, function (field, identifier) {
                if (isObjectChildren(identifier) && isNeedCleanup(identifier)) {
                    field.destroy();
                }
            });
        });
    };
    var initFieldUpdate = batch.scope.bound(function (field) {
        var form = field.form;
        var updates = Path.ensureIn(form, 'requests.updates', []);
        var indexes = Path.ensureIn(form, 'requests.updateIndexes', {});
        for (var index = 0; index < updates.length; index++) {
            var _a = updates[index], pattern = _a.pattern, callbacks = _a.callbacks;
            var removed = false;
            if (field.match(pattern)) {
                callbacks.forEach(function (callback) {
                    field.setState(callback);
                });
                if (!pattern.isWildMatchPattern && !pattern.isMatchPattern) {
                    updates.splice(index--, 1);
                    removed = true;
                }
            }
            if (!removed) {
                indexes[pattern.toString()] = index;
            }
            else {
                delete indexes[pattern.toString()];
            }
        }
    });
    var subscribeUpdate = function (form, pattern, callback) {
        var updates = Path.ensureIn(form, 'requests.updates', []);
        var indexes = Path.ensureIn(form, 'requests.updateIndexes', {});
        var id = pattern.toString();
        var current = indexes[id];
        if (isValid$6(current)) {
            if (updates[current] &&
                !updates[current].callbacks.some(function (fn) {
                    return fn.toString() === callback.toString() ? fn === callback : false;
                })) {
                updates[current].callbacks.push(callback);
            }
        }
        else {
            indexes[id] = updates.length;
            updates.push({
                pattern: pattern,
                callbacks: [callback],
            });
        }
    };
    var setModelState = function (model, setter) {
        if (!model)
            return;
        var isSkipProperty = function (key) {
            if (key === 'address' || key === 'path')
                return true;
            if (key === 'valid' || key === 'invalid')
                return true;
            if (key === 'componentType' || key === 'componentProps')
                return true;
            if (key === 'decoratorType' || key === 'decoratorProps')
                return true;
            if (key === 'validateStatus')
                return true;
            if (key === 'errors' || key === 'warnings' || key === 'successes')
                return true;
            if ((key === 'display' || key === 'visible' || key === 'hidden') &&
                'selfDisplay' in setter &&
                !isValid$6(setter.selfDisplay)) {
                return true;
            }
            if ((key === 'pattern' ||
                key === 'editable' ||
                key === 'disabled' ||
                key === 'readOnly' ||
                key === 'readPretty') &&
                'selfPattern' in setter &&
                !isValid$6(setter.selfPattern)) {
                return true;
            }
            return false;
        };
        if (isFn$2(setter)) {
            setter(model);
        }
        else {
            Object.keys(setter || {}).forEach(function (key) {
                var value = setter[key];
                if (isFn$2(value))
                    return;
                if (ReservedProperties[key])
                    return;
                if (isSkipProperty(key))
                    return;
                model[key] = value;
            });
        }
        return model;
    };
    var getModelState = function (model, getter) {
        if (isFn$2(getter)) {
            return getter(model);
        }
        else {
            return Object.keys(model || {}).reduce(function (buf, key) {
                var value = model[key];
                if (isFn$2(value)) {
                    return buf;
                }
                if (ReservedProperties[key])
                    return buf;
                if (key === 'address' || key === 'path') {
                    buf[key] = value.toString();
                    return buf;
                }
                buf[key] = toJS(value);
                return buf;
            }, {});
        }
    };
    var createStateSetter = function (model) {
        return batch.bound(function (state) { return setModelState(model, state); });
    };
    var createStateGetter = function (model) {
        return function (getter) { return getModelState(model, getter); };
    };
    var createBatchStateSetter = function (form) {
        return batch.bound(function (pattern, payload) {
            if (isQuery(pattern)) {
                pattern.forEach(function (field) {
                    field.setState(payload);
                });
            }
            else if (isGeneralField(pattern)) {
                pattern.setState(payload);
            }
            else {
                var matchCount_1 = 0, path = Path.parse(pattern);
                form.query(path).forEach(function (field) {
                    field.setState(payload);
                    matchCount_1++;
                });
                if (matchCount_1 === 0 || path.isWildMatchPattern) {
                    subscribeUpdate(form, path, payload);
                }
            }
        });
    };
    var createBatchStateGetter = function (form) {
        return function (pattern, payload) {
            if (isQuery(pattern)) {
                return pattern.take(payload);
            }
            else if (isGeneralField(pattern)) {
                return pattern.getState(payload);
            }
            else {
                return form.query(pattern).take(function (field) {
                    return field.getState(payload);
                });
            }
        };
    };
    var triggerFormInitialValuesChange = function (form, change) {
        var path = change.path;
        if (path[path.length - 1] === 'length')
            return;
        if (path[0] === 'initialValues') {
            if (change.type === 'add' || change.type === 'set') {
                patchFormValues(form, path.slice(1), change.value);
            }
            if (form.initialized) {
                form.notify(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE);
            }
        }
    };
    var triggerFormValuesChange = function (form, change) {
        var path = change.path;
        if (path[path.length - 1] === 'length')
            return;
        if (path[0] === 'values' && form.initialized) {
            form.notify(LifeCycleTypes.ON_FORM_VALUES_CHANGE);
        }
    };
    var notify = function (target, formType, fieldType) {
        if (isForm(target)) {
            target.notify(formType);
        }
        else {
            target.notify(fieldType);
        }
    };
    var setValidating = function (target, validating) {
        clearTimeout(target.requests.validate);
        if (validating) {
            target.requests.validate = setTimeout(function () {
                batch(function () {
                    target.validating = validating;
                    notify(target, LifeCycleTypes.ON_FORM_VALIDATING, LifeCycleTypes.ON_FIELD_VALIDATING);
                });
            }, RESPONSE_REQUEST_DURATION);
            notify(target, LifeCycleTypes.ON_FORM_VALIDATE_START, LifeCycleTypes.ON_FIELD_VALIDATE_START);
        }
        else {
            if (target.validating !== validating) {
                target.validating = validating;
            }
            notify(target, LifeCycleTypes.ON_FORM_VALIDATE_END, LifeCycleTypes.ON_FIELD_VALIDATE_END);
        }
    };
    var setSubmitting = function (target, submitting) {
        clearTimeout(target.requests.submit);
        if (submitting) {
            target.requests.submit = setTimeout(function () {
                batch(function () {
                    target.submitting = submitting;
                    notify(target, LifeCycleTypes.ON_FORM_SUBMITTING, LifeCycleTypes.ON_FIELD_SUBMITTING);
                });
            }, RESPONSE_REQUEST_DURATION);
            notify(target, LifeCycleTypes.ON_FORM_SUBMIT_START, LifeCycleTypes.ON_FIELD_SUBMIT_START);
        }
        else {
            if (target.submitting !== submitting) {
                target.submitting = submitting;
            }
            notify(target, LifeCycleTypes.ON_FORM_SUBMIT_END, LifeCycleTypes.ON_FIELD_SUBMIT_END);
        }
    };
    var setLoading = function (target, loading) {
        clearTimeout(target.requests.loading);
        if (loading) {
            target.requests.loading = setTimeout(function () {
                batch(function () {
                    target.loading = loading;
                    notify(target, LifeCycleTypes.ON_FORM_LOADING, LifeCycleTypes.ON_FIELD_LOADING);
                });
            }, RESPONSE_REQUEST_DURATION);
        }
        else if (target.loading !== loading) {
            target.loading = loading;
        }
    };
    var batchSubmit = function (target, onSubmit) { return __awaiter$1(void 0, void 0, void 0, function () {
        var getValues, results, e_2;
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0:
                    getValues = function (target) {
                        if (isForm(target)) {
                            return toJS(target.values);
                        }
                        return toJS(target.value);
                    };
                    target.setSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    notify(target, LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START, LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_START);
                    return [4 /*yield*/, target.validate()];
                case 2:
                    _a.sent();
                    notify(target, LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS, LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_SUCCESS);
                    return [3 /*break*/, 4];
                case 3:
                    _a.sent();
                    notify(target, LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED, LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_FAILED);
                    return [3 /*break*/, 4];
                case 4:
                    notify(target, LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_END, LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_END);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 9, , 10]);
                    if (target.invalid) {
                        throw target.errors;
                    }
                    if (!isFn$2(onSubmit)) return [3 /*break*/, 7];
                    return [4 /*yield*/, onSubmit(getValues(target))];
                case 6:
                    results = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    results = getValues(target);
                    _a.label = 8;
                case 8:
                    notify(target, LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS, LifeCycleTypes.ON_FIELD_SUBMIT_SUCCESS);
                    return [3 /*break*/, 10];
                case 9:
                    e_2 = _a.sent();
                    target.setSubmitting(false);
                    notify(target, LifeCycleTypes.ON_FORM_SUBMIT_FAILED, LifeCycleTypes.ON_FIELD_SUBMIT_FAILED);
                    notify(target, LifeCycleTypes.ON_FORM_SUBMIT, LifeCycleTypes.ON_FIELD_SUBMIT);
                    throw e_2;
                case 10:
                    target.setSubmitting(false);
                    notify(target, LifeCycleTypes.ON_FORM_SUBMIT, LifeCycleTypes.ON_FIELD_SUBMIT);
                    return [2 /*return*/, results];
            }
        });
    }); };
    var batchValidate = function (target, pattern, triggerType) { return __awaiter$1(void 0, void 0, void 0, function () {
        var tasks;
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isForm(target))
                        target.setValidating(true);
                    else {
                        if (target.pattern !== 'editable' ||
                            target.display !== 'visible' ||
                            target.unmounted)
                            return [2 /*return*/];
                    }
                    tasks = [];
                    target.query(pattern).forEach(function (field) {
                        if (!isVoidField(field)) {
                            tasks.push(validateSelf(field, triggerType, field === target));
                        }
                    });
                    return [4 /*yield*/, Promise.all(tasks)];
                case 1:
                    _a.sent();
                    if (isForm(target))
                        target.setValidating(false);
                    if (target.invalid) {
                        notify(target, LifeCycleTypes.ON_FORM_VALIDATE_FAILED, LifeCycleTypes.ON_FIELD_VALIDATE_FAILED);
                        throw target.errors;
                    }
                    notify(target, LifeCycleTypes.ON_FORM_VALIDATE_SUCCESS, LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS);
                    return [2 /*return*/];
            }
        });
    }); };
    var batchReset = function (target, pattern, options) { return __awaiter$1(void 0, void 0, void 0, function () {
        var tasks;
        return __generator$1(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tasks = [];
                    target.query(pattern).forEach(function (field) {
                        if (!isVoidField(field)) {
                            tasks.push(resetSelf(field, options, target === field));
                        }
                    });
                    notify(target, LifeCycleTypes.ON_FORM_RESET, LifeCycleTypes.ON_FIELD_RESET);
                    return [4 /*yield*/, Promise.all(tasks)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var validateSelf = batch.bound(function (target, triggerType, noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        return __awaiter$1(void 0, void 0, void 0, function () {
            var start, end, allTriggerTypes, results_1, i, payload, results;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = function () {
                            setValidating(target, true);
                        };
                        end = function () {
                            setValidating(target, false);
                            if (noEmit)
                                return;
                            if (target.selfValid) {
                                target.notify(LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS);
                            }
                            else {
                                target.notify(LifeCycleTypes.ON_FIELD_VALIDATE_FAILED);
                            }
                        };
                        if (target.pattern !== 'editable' ||
                            target.display !== 'visible' ||
                            target.unmounted)
                            return [2 /*return*/, {}];
                        start();
                        if (!!triggerType) return [3 /*break*/, 5];
                        allTriggerTypes = parseValidatorDescriptions(target.validator).map(function (desc) { return desc.triggerType; });
                        results_1 = {};
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < allTriggerTypes.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, validateToFeedbacks(target, allTriggerTypes[i])];
                    case 2:
                        payload = _a.sent();
                        each(payload, function (result, key) {
                            results_1[key] = results_1[key] || [];
                            results_1[key] = results_1[key].concat(result);
                        });
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        end();
                        return [2 /*return*/, results_1];
                    case 5: return [4 /*yield*/, validateToFeedbacks(target, triggerType)];
                    case 6:
                        results = _a.sent();
                        end();
                        return [2 /*return*/, results];
                }
            });
        });
    });
    var resetSelf = batch.bound(function (target, options, noEmit) {
        if (noEmit === void 0) { noEmit = false; }
        return __awaiter$1(void 0, void 0, void 0, function () {
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target.modified = false;
                        target.visited = false;
                        target.feedbacks = [];
                        target.inputValue = undefined;
                        target.inputValues = [];
                        if (options === null || options === void 0 ? void 0 : options.forceClear) {
                            if (isArrayField(target)) {
                                target.value = [];
                            }
                            else if (isObjectField(target)) {
                                target.value = {};
                            }
                            else {
                                target.value = undefined;
                            }
                        }
                        else if (isValid$6(target.value)) {
                            target.value = toJS(target.initialValue);
                        }
                        if (!noEmit) {
                            target.notify(LifeCycleTypes.ON_FIELD_RESET);
                        }
                        if (!(options === null || options === void 0 ? void 0 : options.validate)) return [3 /*break*/, 2];
                        return [4 /*yield*/, validateSelf(target)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    });
    var getValidFormValues = function (values) {
        if (isObservable(values))
            return values;
        return clone(values || {});
    };
    var getValidFieldDefaultValue = function (value, initialValue) {
        if (allowAssignDefaultValue(value, initialValue))
            return initialValue;
        return value;
    };
    var allowAssignDefaultValue = function (target, source) {
        var isEmptyTarget = isEmpty(target);
        var isEmptySource = isEmpty(source);
        var isValidTarget = isValid$6(target);
        var isValidSource = isValid$6(source);
        if (!isValidTarget) {
            if (isValidSource) {
                return true;
            }
            return false;
        }
        if (isEmptyTarget) {
            if (isEmptySource) {
                return false;
            }
            else {
                return true;
            }
        }
        return false;
    };
    var createReactions = function (field) {
        var reactions = toArr$1(field.props.reactions);
        field.form.addEffects(field, function () {
            reactions.forEach(function (reaction) {
                if (isFn$2(reaction)) {
                    field.disposers.push(autorun(batch.scope.bound(function () { return reaction(field); })));
                }
            });
        });
    };
    var initializeStart = function () {
        GlobalState.initializing = true;
    };
    var initializeEnd = function () {
        batch.endpoint(function () {
            GlobalState.initializing = false;
        });
    };

    var BaseField = /** @class */ (function () {
        function BaseField() {
            var _this = this;
            this.disposers = [];
            this.setTitle = function (title) {
                _this.title = title;
            };
            this.setDescription = function (description) {
                _this.description = description;
            };
            this.setDisplay = function (type) {
                _this.display = type;
            };
            this.setPattern = function (type) {
                _this.pattern = type;
            };
            this.setComponent = function (component, props) {
                if (component) {
                    _this.componentType = component;
                }
                if (props) {
                    _this.componentProps = _this.componentProps || {};
                    Object.assign(_this.componentProps, props);
                }
            };
            this.setComponentProps = function (props) {
                if (props) {
                    _this.componentProps = _this.componentProps || {};
                    Object.assign(_this.componentProps, props);
                }
            };
            this.setDecorator = function (component, props) {
                if (component) {
                    _this.decoratorType = component;
                }
                if (props) {
                    _this.decoratorProps = _this.decoratorProps || {};
                    Object.assign(_this.decoratorProps, props);
                }
            };
            this.setDecoratorProps = function (props) {
                if (props) {
                    _this.decoratorProps = _this.decoratorProps || {};
                    Object.assign(_this.decoratorProps, props);
                }
            };
            this.onInit = function () {
                _this.initialized = true;
                initFieldUpdate(_this);
                _this.notify(LifeCycleTypes.ON_FIELD_INIT);
            };
            this.onMount = function () {
                _this.mounted = true;
                _this.unmounted = false;
                _this.notify(LifeCycleTypes.ON_FIELD_MOUNT);
            };
            this.onUnmount = function () {
                _this.mounted = false;
                _this.unmounted = true;
                _this.notify(LifeCycleTypes.ON_FIELD_UNMOUNT);
            };
            this.query = function (pattern) {
                return new Query({
                    pattern: pattern,
                    base: _this.address,
                    form: _this.form,
                });
            };
            this.notify = function (type, payload) {
                return _this.form.notify(type, payload !== null && payload !== void 0 ? payload : _this);
            };
            this.dispose = function () {
                _this.disposers.forEach(function (dispose) {
                    dispose();
                });
                _this.form.removeEffects(_this);
            };
            this.destroy = function () {
                _this.dispose();
                delete _this.form.fields[_this.address.toString()];
            };
            this.match = function (pattern) {
                return Path.parse(pattern).matchAliasGroup(_this.address, _this.path);
            };
        }
        BaseField.prototype.makeIndexes = function (address) {
            this.form.fields[address.toString()] = this;
            buildNodeIndexes(this, address);
        };
        Object.defineProperty(BaseField.prototype, "component", {
            get: function () {
                return [this.componentType, this.componentProps];
            },
            set: function (value) {
                var component = toArr$1(value);
                this.componentType = component[0];
                this.componentProps = component[1] || {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "decorator", {
            get: function () {
                return [this.decoratorType, this.decoratorProps];
            },
            set: function (value) {
                var decorator = toArr$1(value);
                this.decoratorType = decorator[0];
                this.decoratorProps = decorator[1] || {};
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "parent", {
            get: function () {
                var parent = this.address.parent();
                var identifier = parent.toString();
                while (!this.form.fields[identifier]) {
                    parent = parent.parent();
                    identifier = parent.toString();
                    if (!identifier)
                        return;
                }
                return this.form.fields[identifier];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "display", {
            get: function () {
                var _a;
                var parentDisplay = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.display;
                if (parentDisplay && parentDisplay !== 'visible') {
                    if (this.selfDisplay && this.selfDisplay !== 'visible')
                        return this.selfDisplay;
                    return parentDisplay;
                }
                if (isValid$6(this.selfDisplay))
                    return this.selfDisplay;
                return parentDisplay || this.form.display || 'visible';
            },
            set: function (display) {
                this.selfDisplay = display;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "pattern", {
            get: function () {
                var _a;
                var parentPattern = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.pattern;
                if (isValid$6(this.selfPattern))
                    return this.selfPattern;
                return parentPattern || this.form.pattern || 'editable';
            },
            set: function (pattern) {
                this.selfPattern = pattern;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "editable", {
            get: function () {
                return this.pattern === 'editable';
            },
            set: function (editable) {
                if (!isValid$6(editable))
                    return;
                if (editable) {
                    this.pattern = 'editable';
                }
                else {
                    this.pattern = 'readPretty';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "disabled", {
            get: function () {
                return this.pattern === 'disabled';
            },
            set: function (disabled) {
                if (!isValid$6(disabled))
                    return;
                if (disabled) {
                    this.pattern = 'disabled';
                }
                else {
                    this.pattern = 'editable';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "readOnly", {
            get: function () {
                return this.pattern === 'readOnly';
            },
            set: function (readOnly) {
                if (!isValid$6(readOnly))
                    return;
                if (readOnly) {
                    this.pattern = 'readOnly';
                }
                else {
                    this.pattern = 'editable';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "readPretty", {
            get: function () {
                return this.pattern === 'readPretty';
            },
            set: function (readPretty) {
                if (!isValid$6(readPretty))
                    return;
                if (readPretty) {
                    this.pattern = 'readPretty';
                }
                else {
                    this.pattern = 'editable';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "hidden", {
            get: function () {
                return this.display === 'hidden';
            },
            set: function (hidden) {
                if (!isValid$6(hidden))
                    return;
                if (hidden) {
                    this.display = 'hidden';
                }
                else {
                    this.display = 'visible';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(BaseField.prototype, "visible", {
            get: function () {
                return this.display === 'visible';
            },
            set: function (visible) {
                if (!isValid$6(visible))
                    return;
                if (visible) {
                    this.display = 'visible';
                }
                else {
                    this.display = 'none';
                }
            },
            enumerable: false,
            configurable: true
        });
        return BaseField;
    }());

    var __extends$3 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __read$c = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var Field$1 = /** @class */ (function (_super) {
        __extends$3(Field, _super);
        function Field(address, props, form, designable) {
            var _this = _super.call(this) || this;
            _this.displayName = 'Field';
            _this.caches = {};
            _this.requests = {};
            _this.setDataSource = function (dataSource) {
                _this.dataSource = dataSource;
            };
            _this.setFeedback = function (feedback) {
                updateFeedback(_this, feedback);
            };
            _this.setSelfErrors = function (messages) {
                _this.selfErrors = messages;
            };
            _this.setSelfWarnings = function (messages) {
                _this.selfWarnings = messages;
            };
            _this.setSelfSuccesses = function (messages) {
                _this.selfSuccesses = messages;
            };
            _this.setValidator = function (validator) {
                _this.validator = validator;
            };
            _this.setValidatorRule = function (name, value) {
                setValidatorRule(_this, name, value);
            };
            _this.setRequired = function (required) {
                _this.required = required;
            };
            _this.setValue = function (value) {
                _this.value = value;
            };
            _this.setInitialValue = function (initialValue) {
                _this.initialValue = initialValue;
            };
            _this.setLoading = function (loading) {
                setLoading(_this, loading);
            };
            _this.setValidating = function (validating) {
                setValidating(_this, validating);
            };
            _this.setSubmitting = function (submitting) {
                setSubmitting(_this, submitting);
            };
            _this.setState = createStateSetter(_this);
            _this.getState = createStateGetter(_this);
            _this.onInput = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(_this, void 0, void 0, function () {
                    var values, value;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.target) {
                                    if (!isHTMLInputEvent(args[0]))
                                        return [2 /*return*/];
                                }
                                values = getValuesFromEvent(args);
                                value = values[0];
                                this.caches.inputting = true;
                                this.inputValue = value;
                                this.inputValues = values;
                                this.value = value;
                                this.modified = true;
                                this.form.modified = true;
                                this.notify(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE);
                                this.notify(LifeCycleTypes.ON_FORM_INPUT_CHANGE, this.form);
                                return [4 /*yield*/, validateSelf(this, 'onInput')];
                            case 1:
                                _b.sent();
                                this.caches.inputting = false;
                                return [2 /*return*/];
                        }
                    });
                });
            };
            _this.onFocus = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.target) {
                                    if (!isHTMLInputEvent(args[0], false))
                                        return [2 /*return*/];
                                }
                                this.active = true;
                                this.visited = true;
                                return [4 /*yield*/, validateSelf(this, 'onFocus')];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            _this.onBlur = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return __awaiter(_this, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if ((_a = args[0]) === null || _a === void 0 ? void 0 : _a.target) {
                                    if (!isHTMLInputEvent(args[0], false))
                                        return [2 /*return*/];
                                }
                                this.active = false;
                                return [4 /*yield*/, validateSelf(this, 'onBlur')];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            _this.validate = function (triggerType) {
                return batchValidate(_this, _this.address + ".**", triggerType);
            };
            _this.submit = function (onSubmit) {
                return batchSubmit(_this, onSubmit);
            };
            _this.reset = function (options) {
                return batchReset(_this, _this.address + ".**", options);
            };
            _this.queryFeedbacks = function (search) {
                return queryFeedbacks(_this, search);
            };
            _this.form = form;
            _this.props = props;
            _this.designable = designable;
            initializeStart();
            _this.makeIndexes(address);
            _this.initialize();
            _this.makeObservable();
            _this.makeReactive();
            _this.onInit();
            initializeEnd();
            return _this;
        }
        Field.prototype.initialize = function () {
            this.initialized = false;
            this.loading = false;
            this.validating = false;
            this.submitting = false;
            this.modified = false;
            this.active = false;
            this.visited = false;
            this.mounted = false;
            this.unmounted = false;
            this.inputValues = [];
            this.inputValue = null;
            this.feedbacks = [];
            this.title = this.props.title;
            this.description = this.props.description;
            this.display = this.props.display;
            this.pattern = this.props.pattern;
            this.editable = this.props.editable;
            this.disabled = this.props.disabled;
            this.readOnly = this.props.readOnly;
            this.readPretty = this.props.readPretty;
            this.visible = this.props.visible;
            this.hidden = this.props.hidden;
            this.dataSource = this.props.dataSource;
            this.validator = this.props.validator;
            this.required = this.props.required;
            this.content = this.props.content;
            this.value = getValidFieldDefaultValue(this.props.value, this.props.initialValue);
            this.initialValue = this.props.initialValue;
            this.data = this.props.data;
            this.decorator = toArr$1(this.props.decorator);
            this.component = toArr$1(this.props.component);
        };
        Field.prototype.makeObservable = function () {
            if (this.designable)
                return;
            define(this, {
                title: observable.ref,
                description: observable.ref,
                dataSource: observable.ref,
                selfDisplay: observable.ref,
                selfPattern: observable.ref,
                loading: observable.ref,
                validating: observable.ref,
                submitting: observable.ref,
                modified: observable.ref,
                active: observable.ref,
                visited: observable.ref,
                initialized: observable.ref,
                mounted: observable.ref,
                unmounted: observable.ref,
                inputValue: observable.ref,
                inputValues: observable.ref,
                decoratorType: observable.ref,
                componentType: observable.ref,
                content: observable.ref,
                decoratorProps: observable,
                componentProps: observable,
                validator: observable.shallow,
                feedbacks: observable.shallow,
                data: observable.shallow,
                component: observable.computed,
                decorator: observable.computed,
                errors: observable.computed,
                warnings: observable.computed,
                successes: observable.computed,
                valid: observable.computed,
                invalid: observable.computed,
                selfErrors: observable.computed,
                selfWarnings: observable.computed,
                selfSuccesses: observable.computed,
                selfValid: observable.computed,
                selfInvalid: observable.computed,
                validateStatus: observable.computed,
                value: observable.computed,
                initialValue: observable.computed,
                display: observable.computed,
                pattern: observable.computed,
                required: observable.computed,
                hidden: observable.computed,
                visible: observable.computed,
                disabled: observable.computed,
                readOnly: observable.computed,
                readPretty: observable.computed,
                editable: observable.computed,
                setDisplay: action,
                setTitle: action,
                setDescription: action,
                setDataSource: action,
                setValue: action,
                setPattern: action,
                setInitialValue: action,
                setLoading: action,
                setValidating: action,
                setFeedback: action,
                setSelfErrors: action,
                setSelfWarnings: action,
                setSelfSuccesses: action,
                setValidator: action,
                setRequired: action,
                setComponent: action,
                setComponentProps: action,
                setDecorator: action,
                setDecoratorProps: action,
                validate: action,
                reset: action,
                onInit: batch,
                onInput: batch,
                onMount: batch,
                onUnmount: batch,
                onFocus: batch,
                onBlur: batch,
            });
        };
        Field.prototype.makeReactive = function () {
            var _this = this;
            if (this.designable)
                return;
            this.disposers.push(reaction(function () { return _this.value; }, function (value) {
                _this.notify(LifeCycleTypes.ON_FIELD_VALUE_CHANGE);
                if (isValid$6(value) && _this.modified && !_this.caches.inputting) {
                    validateSelf(_this);
                }
            }), reaction(function () { return _this.initialValue; }, function () {
                _this.notify(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE);
            }), reaction(function () { return _this.display; }, function (display) {
                if (display === 'visible') {
                    if (isEmpty(_this.value)) {
                        _this.setValue(_this.caches.value);
                        _this.caches.value = undefined;
                    }
                }
                else {
                    _this.caches.value = toJS(_this.value);
                    if (display === 'none') {
                        _this.form.deleteValuesIn(_this.path);
                    }
                }
                if (display === 'none' || display === 'hidden') {
                    _this.setFeedback({
                        type: 'error',
                        messages: [],
                    });
                }
            }), reaction(function () { return [_this.pattern, _this.unmounted]; }, function (_a) {
                var _b = __read$c(_a, 2), pattern = _b[0], unmounted = _b[1];
                if (pattern !== 'editable' || unmounted) {
                    _this.setFeedback({
                        type: 'error',
                        messages: [],
                    });
                }
            }));
            createReactions(this);
        };
        Object.defineProperty(Field.prototype, "selfErrors", {
            get: function () {
                return queryFeedbackMessages(this, {
                    type: 'error',
                });
            },
            set: function (messages) {
                this.setFeedback({
                    type: 'error',
                    code: 'EffectError',
                    messages: messages,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "errors", {
            get: function () {
                return this.form.queryFeedbacks({
                    address: this.address + ".**",
                    type: 'error',
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "selfWarnings", {
            get: function () {
                return queryFeedbackMessages(this, {
                    type: 'warning',
                });
            },
            set: function (messages) {
                this.setFeedback({
                    type: 'warning',
                    code: 'EffectWarning',
                    messages: messages,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "warnings", {
            get: function () {
                return this.form.queryFeedbacks({
                    address: this.address + ".**",
                    type: 'warning',
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "selfSuccesses", {
            get: function () {
                return queryFeedbackMessages(this, {
                    type: 'success',
                });
            },
            set: function (messages) {
                this.setFeedback({
                    type: 'success',
                    code: 'EffectSuccess',
                    messages: messages,
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "successes", {
            get: function () {
                return this.form.queryFeedbacks({
                    address: this.address + ".**",
                    type: 'success',
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "selfValid", {
            get: function () {
                return !this.selfErrors.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "valid", {
            get: function () {
                return !this.errors.length;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "selfInvalid", {
            get: function () {
                return !this.selfValid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "invalid", {
            get: function () {
                return !this.valid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "value", {
            get: function () {
                return this.form.getValuesIn(this.path);
            },
            set: function (value) {
                if (!this.initialized) {
                    if (this.display === 'none') {
                        this.caches.value = value;
                        return;
                    }
                    if (!allowAssignDefaultValue(this.value, value) && !this.designable) {
                        return;
                    }
                }
                this.form.setValuesIn(this.path, value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "initialValue", {
            get: function () {
                return this.form.getInitialValuesIn(this.path);
            },
            set: function (initialValue) {
                if (!this.initialized) {
                    if (!allowAssignDefaultValue(this.initialValue, initialValue) &&
                        !this.designable) {
                        return;
                    }
                }
                this.form.setInitialValuesIn(this.path, initialValue);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "required", {
            get: function () {
                return parseValidatorDescriptions(this.validator).some(function (desc) { return desc.required; });
            },
            set: function (required) {
                if (this.required === required)
                    return;
                this.setValidatorRule('required', required);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Field.prototype, "validateStatus", {
            get: function () {
                if (this.validating)
                    return 'validating';
                if (this.selfInvalid)
                    return 'error';
                if (this.selfWarnings.length)
                    return 'warning';
                if (this.selfSuccesses.length)
                    return 'success';
            },
            enumerable: false,
            configurable: true
        });
        return Field;
    }(BaseField));

    var __read$b = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$4 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$b(arguments[i]));
        return ar;
    };
    var createEffectHook = function (type, callback) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (GlobalState.effectStart) {
                GlobalState.lifecycles.push(new LifeCycle(type, function (payload, ctx) {
                    if (isFn$2(callback)) {
                        callback.apply(void 0, __spread$4([payload, ctx], GlobalState.context)).apply(void 0, __spread$4(args));
                    }
                }));
            }
            else {
                throw new Error('Effect hooks cannot be used in asynchronous function body');
            }
        };
    };
    var createEffectContext = function (defaultValue) {
        var index;
        return {
            provide: function (value) {
                if (GlobalState.effectStart) {
                    index = GlobalState.context.length;
                    GlobalState.context[index] = isValid$6(value) ? value : defaultValue;
                }
                else {
                    throw new Error('Provide method cannot be used in asynchronous function body');
                }
            },
            consume: function () {
                if (!GlobalState.effectStart) {
                    throw new Error('Consume method cannot be used in asynchronous function body');
                }
                return GlobalState.context[index];
            },
        };
    };
    var FormEffectContext = createEffectContext();
    var useEffectForm = FormEffectContext.consume;
    var runEffects = function (context) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        GlobalState.lifecycles = [];
        GlobalState.context = [];
        GlobalState.effectStart = true;
        GlobalState.effectEnd = false;
        if (isForm(context)) {
            FormEffectContext.provide(context);
        }
        args.forEach(function (effects) {
            if (isFn$2(effects)) {
                effects(context);
            }
        });
        GlobalState.context = [];
        GlobalState.effectStart = false;
        GlobalState.effectEnd = true;
        return GlobalState.lifecycles;
    };

    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __read$a = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$3 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$a(arguments[i]));
        return ar;
    };
    var ArrayField$1 = /** @class */ (function (_super) {
        __extends$2(ArrayField, _super);
        function ArrayField(address, props, form, designable) {
            var _this = _super.call(this, address, props, form, designable) || this;
            _this.displayName = 'ArrayField';
            _this.push = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                return action(function () {
                    var _a;
                    if (!isArr$2(_this.value)) {
                        _this.value = [];
                    }
                    (_a = _this.value).push.apply(_a, __spread$3(items));
                    return _this.onInput(_this.value);
                });
            };
            _this.pop = function () {
                if (!isArr$2(_this.value))
                    return;
                return action(function () {
                    var index = _this.value.length - 1;
                    spliceArrayState(_this, {
                        startIndex: index,
                        deleteCount: 1,
                    });
                    _this.value.pop();
                    return _this.onInput(_this.value);
                });
            };
            _this.insert = function (index) {
                var items = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    items[_i - 1] = arguments[_i];
                }
                return action(function () {
                    var _a;
                    if (!isArr$2(_this.value)) {
                        _this.value = [];
                    }
                    spliceArrayState(_this, {
                        startIndex: index,
                        insertCount: items.length,
                    });
                    (_a = _this.value).splice.apply(_a, __spread$3([index, 0], items));
                    return _this.onInput(_this.value);
                });
            };
            _this.remove = function (index) {
                if (!isArr$2(_this.value))
                    return;
                return action(function () {
                    spliceArrayState(_this, {
                        startIndex: index,
                        deleteCount: 1,
                    });
                    _this.value.splice(index, 1);
                    return _this.onInput(_this.value);
                });
            };
            _this.shift = function () {
                if (!isArr$2(_this.value))
                    return;
                return action(function () {
                    _this.value.shift();
                    return _this.onInput(_this.value);
                });
            };
            _this.unshift = function () {
                var items = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                }
                return action(function () {
                    var _a;
                    if (!isArr$2(_this.value)) {
                        _this.value = [];
                    }
                    spliceArrayState(_this, {
                        startIndex: 0,
                        insertCount: items.length,
                    });
                    (_a = _this.value).unshift.apply(_a, __spread$3(items));
                    return _this.onInput(_this.value);
                });
            };
            _this.move = function (fromIndex, toIndex) {
                if (!isArr$2(_this.value))
                    return;
                if (fromIndex === toIndex)
                    return;
                return action(function () {
                    var fromItem = _this.value[fromIndex];
                    _this.value.splice(fromIndex, 1);
                    _this.value.splice(toIndex, 0, fromItem);
                    exchangeArrayState(_this, {
                        fromIndex: fromIndex,
                        toIndex: toIndex,
                    });
                    return _this.onInput(_this.value);
                });
            };
            _this.moveUp = function (index) {
                if (!isArr$2(_this.value))
                    return;
                return _this.move(index, index - 1 < 0 ? _this.value.length - 1 : index - 1);
            };
            _this.moveDown = function (index) {
                if (!isArr$2(_this.value))
                    return;
                return _this.move(index, index + 1 >= _this.value.length ? 0 : index + 1);
            };
            _this.makeAutoCleanable();
            return _this;
        }
        ArrayField.prototype.makeAutoCleanable = function () {
            var _this = this;
            this.disposers.push(reaction(function () { var _a; return (_a = _this.value) === null || _a === void 0 ? void 0 : _a.length; }, function (newLength, oldLength) {
                if (oldLength && !newLength) {
                    cleanupArrayChildren(_this, 0);
                }
                else if (newLength < oldLength) {
                    cleanupArrayChildren(_this, newLength);
                }
            }));
        };
        return ArrayField;
    }(Field$1));

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var ObjectField$1 = /** @class */ (function (_super) {
        __extends$1(ObjectField, _super);
        function ObjectField(address, props, form, designable) {
            var _this = _super.call(this, address, props, form, designable) || this;
            _this.displayName = 'ObjectField';
            _this.additionalProperties = [];
            _this.addProperty = function (key, value) {
                _this.form.setValuesIn(_this.path.concat(key), value);
                _this.additionalProperties.push(key);
                return _this.onInput(_this.value);
            };
            _this.removeProperty = function (key) {
                _this.form.deleteValuesIn(_this.path.concat(key));
                _this.additionalProperties.splice(_this.additionalProperties.indexOf(key), 1);
                return _this.onInput(_this.value);
            };
            _this.existProperty = function (key) {
                return _this.form.existValuesIn(_this.path.concat(key));
            };
            _this.makeAutoCleanable();
            return _this;
        }
        ObjectField.prototype.makeAutoCleanable = function () {
            var _this = this;
            this.disposers.push(reaction(function () { return Object.keys(_this.value || {}); }, function (newKeys) {
                var filterKeys = _this.additionalProperties.filter(function (key) { return !newKeys.includes(key); });
                cleanupObjectChildren(_this, filterKeys);
            }));
        };
        return ObjectField;
    }(Field$1));

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var VoidField$1 = /** @class */ (function (_super) {
        __extends(VoidField, _super);
        function VoidField(address, props, form, designable) {
            var _this = _super.call(this) || this;
            _this.displayName = 'VoidField';
            _this.setState = createStateSetter(_this);
            _this.getState = createStateGetter(_this);
            _this.form = form;
            _this.props = props;
            _this.designable = designable;
            initializeStart();
            _this.makeIndexes(address);
            _this.initialize();
            _this.makeObservable();
            _this.makeReactive();
            _this.onInit();
            initializeEnd();
            return _this;
        }
        VoidField.prototype.initialize = function () {
            this.mounted = false;
            this.unmounted = false;
            this.initialized = false;
            this.title = this.props.title;
            this.description = this.props.description;
            this.pattern = this.props.pattern;
            this.display = this.props.display;
            this.hidden = this.props.hidden;
            this.editable = this.props.editable;
            this.disabled = this.props.disabled;
            this.readOnly = this.props.readOnly;
            this.readPretty = this.props.readPretty;
            this.visible = this.props.visible;
            this.content = this.props.content;
            this.data = this.props.data;
            this.decorator = toArr$1(this.props.decorator);
            this.component = toArr$1(this.props.component);
        };
        VoidField.prototype.makeObservable = function () {
            if (this.designable)
                return;
            define(this, {
                title: observable.ref,
                description: observable.ref,
                selfDisplay: observable.ref,
                selfPattern: observable.ref,
                initialized: observable.ref,
                mounted: observable.ref,
                unmounted: observable.ref,
                decoratorType: observable.ref,
                componentType: observable.ref,
                content: observable.ref,
                data: observable.shallow,
                decoratorProps: observable,
                componentProps: observable,
                display: observable.computed,
                pattern: observable.computed,
                hidden: observable.computed,
                visible: observable.computed,
                disabled: observable.computed,
                readOnly: observable.computed,
                readPretty: observable.computed,
                editable: observable.computed,
                component: observable.computed,
                decorator: observable.computed,
                setTitle: action,
                setDescription: action,
                setDisplay: action,
                setPattern: action,
                setComponent: action,
                setComponentProps: action,
                setDecorator: action,
                setDecoratorProps: action,
                onInit: batch,
                onMount: batch,
                onUnmount: batch,
            });
        };
        VoidField.prototype.makeReactive = function () {
            if (this.designable)
                return;
            createReactions(this);
        };
        return VoidField;
    }(BaseField));

    var __assign$f = (undefined && undefined.__assign) || function () {
        __assign$f = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$f.apply(this, arguments);
    };
    var DEV_TOOLS_HOOK = '__FORMILY_DEV_TOOLS_HOOK__';
    var Form = /** @class */ (function () {
        function Form(props) {
            var _this = this;
            this.displayName = 'Form';
            this.fields = {};
            this.requests = {};
            this.indexes = new Map();
            this.disposers = [];
            /** 创建字段 **/
            this.createField = function (props) {
                var address = Path.parse(props.basePath).concat(props.name);
                var identifier = address.toString();
                if (!identifier)
                    return;
                if (!_this.fields[identifier] || _this.props.designable) {
                    batch(function () {
                        new Field$1(address, props, _this, _this.props.designable);
                    });
                    _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
                }
                return _this.fields[identifier];
            };
            this.createArrayField = function (props) {
                var address = Path.parse(props.basePath).concat(props.name);
                var identifier = address.toString();
                if (!identifier)
                    return;
                if (!_this.fields[identifier] || _this.props.designable) {
                    batch(function () {
                        new ArrayField$1(address, __assign$f(__assign$f({}, props), { value: isArr$2(props.value) ? props.value : [] }), _this, _this.props.designable);
                    });
                    _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
                }
                return _this.fields[identifier];
            };
            this.createObjectField = function (props) {
                var address = Path.parse(props.basePath).concat(props.name);
                var identifier = address.toString();
                if (!identifier)
                    return;
                if (!_this.fields[identifier] || _this.props.designable) {
                    batch(function () {
                        new ObjectField$1(address, __assign$f(__assign$f({}, props), { value: isObj$1(props.value) ? props.value : {} }), _this, _this.props.designable);
                    });
                    _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
                }
                return _this.fields[identifier];
            };
            this.createVoidField = function (props) {
                var address = Path.parse(props.basePath).concat(props.name);
                var identifier = address.toString();
                if (!identifier)
                    return;
                if (!_this.fields[identifier] || _this.props.designable) {
                    batch(function () {
                        new VoidField$1(address, props, _this, _this.props.designable);
                    });
                    _this.notify(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
                }
                return _this.fields[identifier];
            };
            /** 状态操作模型 **/
            this.setValues = function (values, strategy) {
                if (strategy === void 0) { strategy = 'merge'; }
                if (!isPlainObj$1(values))
                    return;
                if (strategy === 'merge' || strategy === 'deepMerge') {
                    _this.values = merge(_this.values, values, {
                        arrayMerge: function (target, source) { return source; },
                    });
                }
                else if (strategy === 'shallowMerge') {
                    _this.values = Object.assign(_this.values, values);
                }
                else {
                    _this.values = values;
                }
            };
            this.setInitialValues = function (initialValues, strategy) {
                if (strategy === void 0) { strategy = 'merge'; }
                if (!isPlainObj$1(initialValues))
                    return;
                if (strategy === 'merge' || strategy === 'deepMerge') {
                    _this.initialValues = merge(_this.initialValues, initialValues, {
                        arrayMerge: function (target, source) { return source; },
                    });
                }
                else if (strategy === 'shallowMerge') {
                    _this.initialValues = Object.assign(_this.initialValues, initialValues);
                }
                else {
                    _this.initialValues = initialValues;
                }
            };
            this.setValuesIn = function (pattern, value) {
                Path.setIn(_this.values, pattern, value);
            };
            this.deleteValuesIn = function (pattern) {
                Path.deleteIn(_this.values, pattern);
            };
            this.existValuesIn = function (pattern) {
                return Path.existIn(_this.values, pattern);
            };
            this.getValuesIn = function (pattern) {
                return Path.getIn(_this.values, pattern);
            };
            this.setInitialValuesIn = function (pattern, initialValue) {
                Path.setIn(_this.initialValues, pattern, initialValue);
            };
            this.deleteInitialValuesIn = function (pattern) {
                Path.deleteIn(_this.initialValues, pattern);
            };
            this.existInitialValuesIn = function (pattern) {
                return Path.existIn(_this.initialValues, pattern);
            };
            this.getInitialValuesIn = function (pattern) {
                return Path.getIn(_this.initialValues, pattern);
            };
            this.setLoading = function (loading) {
                setLoading(_this, loading);
            };
            this.setSubmitting = function (submitting) {
                setSubmitting(_this, submitting);
            };
            this.setValidating = function (validating) {
                setValidating(_this, validating);
            };
            this.setDisplay = function (display) {
                _this.display = display;
            };
            this.setPattern = function (pattern) {
                _this.pattern = pattern;
            };
            this.addEffects = function (id, effects) {
                if (!_this.heart.hasLifeCycles(id)) {
                    _this.heart.addLifeCycles(id, runEffects(_this, effects));
                }
            };
            this.removeEffects = function (id) {
                _this.heart.removeLifeCycles(id);
            };
            this.setEffects = function (effects) {
                _this.heart.setLifeCycles(runEffects(_this, effects));
            };
            this.clearErrors = function (pattern) {
                if (pattern === void 0) { pattern = '*'; }
                _this.query(pattern).forEach(function (field) {
                    if (!isVoidField(field)) {
                        field.setFeedback({
                            type: 'error',
                            messages: [],
                        });
                    }
                });
            };
            this.clearWarnings = function (pattern) {
                if (pattern === void 0) { pattern = '*'; }
                _this.query(pattern).forEach(function (field) {
                    if (!isVoidField(field)) {
                        field.setFeedback({
                            type: 'warning',
                            messages: [],
                        });
                    }
                });
            };
            this.clearSuccesses = function (pattern) {
                if (pattern === void 0) { pattern = '*'; }
                _this.query(pattern).forEach(function (field) {
                    if (!isVoidField(field)) {
                        field.setFeedback({
                            type: 'success',
                            messages: [],
                        });
                    }
                });
            };
            this.query = function (pattern) {
                return new Query({
                    pattern: pattern,
                    base: '',
                    form: _this,
                });
            };
            this.queryFeedbacks = function (search) {
                return _this.query(search.address || search.path || '*').reduce(function (messages, field) {
                    if (isVoidField(field))
                        return messages;
                    return messages.concat(field
                        .queryFeedbacks(search)
                        .map(function (feedback) { return (__assign$f(__assign$f({}, feedback), { address: field.address.toString(), path: field.path.toString() })); })
                        .filter(function (feedback) { return feedback.messages.length > 0; }));
                }, []);
            };
            this.notify = function (type, payload) {
                _this.heart.publish(type, payload !== null && payload !== void 0 ? payload : _this);
            };
            this.subscribe = function (subscriber) {
                return _this.heart.subscribe(subscriber);
            };
            this.unsubscribe = function (id) {
                _this.heart.unsubscribe(id);
            };
            /**事件钩子**/
            this.onInit = function () {
                _this.initialized = true;
                _this.notify(LifeCycleTypes.ON_FORM_INIT);
            };
            this.onMount = function () {
                _this.mounted = true;
                _this.notify(LifeCycleTypes.ON_FORM_MOUNT);
                if (globalThisPolyfill[DEV_TOOLS_HOOK] && !_this.props.designable) {
                    globalThisPolyfill[DEV_TOOLS_HOOK].inject(_this.id, _this);
                }
            };
            this.onUnmount = function () {
                _this.notify(LifeCycleTypes.ON_FORM_UNMOUNT);
                _this.query('*').forEach(function (field) { return field.destroy(); });
                _this.disposers.forEach(function (dispose) { return dispose(); });
                _this.unmounted = true;
                _this.indexes.clear();
                _this.heart.clear();
                if (globalThisPolyfill[DEV_TOOLS_HOOK] && !_this.props.designable) {
                    globalThisPolyfill[DEV_TOOLS_HOOK].unmount(_this.id);
                }
            };
            this.setState = createStateSetter(this);
            this.getState = createStateGetter(this);
            this.setFormState = createStateSetter(this);
            this.getFormState = createStateGetter(this);
            this.setFieldState = createBatchStateSetter(this);
            this.getFieldState = createBatchStateGetter(this);
            this.getFormGraph = function () {
                return _this.graph.getGraph();
            };
            this.setFormGraph = function (graph) {
                _this.graph.setGraph(graph);
            };
            this.clearFormGraph = function (pattern) {
                if (pattern === void 0) { pattern = '*'; }
                _this.query(pattern).forEach(function (field) {
                    field.destroy();
                });
            };
            this.validate = function (pattern) {
                if (pattern === void 0) { pattern = '*'; }
                return batchValidate(_this, pattern);
            };
            this.submit = function (onSubmit) {
                return batchSubmit(_this, onSubmit);
            };
            this.reset = function (pattern, options) {
                if (pattern === void 0) { pattern = '*'; }
                return batchReset(_this, pattern, options);
            };
            this.initialize(props);
            this.makeObservable();
            this.makeReactive();
            this.makeValues();
            this.onInit();
        }
        Form.prototype.initialize = function (props) {
            this.id = uid();
            this.props = __assign$f({}, props);
            this.initialized = false;
            this.submitting = false;
            this.validating = false;
            this.loading = false;
            this.modified = false;
            this.mounted = false;
            this.unmounted = false;
            this.display = this.props.display || 'visible';
            this.pattern = this.props.pattern || 'editable';
            this.editable = this.props.editable;
            this.disabled = this.props.disabled;
            this.readOnly = this.props.readOnly;
            this.readPretty = this.props.readPretty;
            this.visible = this.props.visible;
            this.hidden = this.props.hidden;
            this.graph = new Graph(this);
            this.heart = new Heart({
                lifecycles: this.lifecycles,
                context: this,
            });
        };
        Form.prototype.makeValues = function () {
            this.values = getValidFormValues(this.props.values);
            this.initialValues = getValidFormValues(this.props.initialValues);
        };
        Form.prototype.makeObservable = function () {
            define(this, {
                fields: observable.shallow,
                initialized: observable.ref,
                validating: observable.ref,
                submitting: observable.ref,
                loading: observable.ref,
                modified: observable.ref,
                pattern: observable.ref,
                display: observable.ref,
                mounted: observable.ref,
                unmounted: observable.ref,
                values: observable,
                initialValues: observable,
                valid: observable.computed,
                invalid: observable.computed,
                errors: observable.computed,
                warnings: observable.computed,
                successes: observable.computed,
                hidden: observable.computed,
                visible: observable.computed,
                editable: observable.computed,
                readOnly: observable.computed,
                readPretty: observable.computed,
                disabled: observable.computed,
                setValues: action,
                setValuesIn: action,
                setInitialValues: action,
                setInitialValuesIn: action,
                setPattern: action,
                setDisplay: action,
                setState: action,
                deleteInitialValuesIn: action,
                deleteValuesIn: action,
                setSubmitting: action,
                setValidating: action,
                setFormGraph: action,
                clearFormGraph: action,
                reset: action,
                submit: action,
                validate: action,
                onMount: batch,
                onUnmount: batch,
                onInit: batch,
            });
        };
        Form.prototype.makeReactive = function () {
            var _this = this;
            this.disposers.push(observe(this, function (change) {
                triggerFormInitialValuesChange(_this, change);
                triggerFormValuesChange(_this, change);
            }, true));
        };
        Object.defineProperty(Form.prototype, "valid", {
            get: function () {
                return !this.invalid;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "invalid", {
            get: function () {
                return this.errors.length > 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "errors", {
            get: function () {
                return this.queryFeedbacks({
                    type: 'error',
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "warnings", {
            get: function () {
                return this.queryFeedbacks({
                    type: 'warning',
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "successes", {
            get: function () {
                return this.queryFeedbacks({
                    type: 'success',
                });
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "lifecycles", {
            get: function () {
                return runEffects(this, this.props.effects);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "hidden", {
            get: function () {
                return this.display === 'hidden';
            },
            set: function (hidden) {
                if (!isValid$6(hidden))
                    return;
                if (hidden) {
                    this.display = 'hidden';
                }
                else {
                    this.display = 'visible';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "visible", {
            get: function () {
                return this.display === 'visible';
            },
            set: function (visible) {
                if (!isValid$6(visible))
                    return;
                if (visible) {
                    this.display = 'visible';
                }
                else {
                    this.display = 'none';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "editable", {
            get: function () {
                return this.pattern === 'editable';
            },
            set: function (editable) {
                if (!isValid$6(editable))
                    return;
                if (editable) {
                    this.pattern = 'editable';
                }
                else {
                    this.pattern = 'readPretty';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "readOnly", {
            get: function () {
                return this.pattern === 'readOnly';
            },
            set: function (readOnly) {
                if (!isValid$6(readOnly))
                    return;
                if (readOnly) {
                    this.pattern = 'readOnly';
                }
                else {
                    this.pattern = 'editable';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "disabled", {
            get: function () {
                return this.pattern === 'disabled';
            },
            set: function (disabled) {
                if (!isValid$6(disabled))
                    return;
                if (disabled) {
                    this.pattern = 'disabled';
                }
                else {
                    this.pattern = 'editable';
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "readPretty", {
            get: function () {
                return this.pattern === 'readPretty';
            },
            set: function (readPretty) {
                if (!isValid$6(readPretty))
                    return;
                if (readPretty) {
                    this.pattern = 'readPretty';
                }
                else {
                    this.pattern = 'editable';
                }
            },
            enumerable: false,
            configurable: true
        });
        return Form;
    }());

    function createFormEffect(type) {
        return createEffectHook(type, function (form) { return function (callback) {
            batch(function () {
                callback(form);
            });
        }; });
    }
    createFormEffect(LifeCycleTypes.ON_FORM_INIT);
    createFormEffect(LifeCycleTypes.ON_FORM_MOUNT);
    createFormEffect(LifeCycleTypes.ON_FORM_UNMOUNT);
    createFormEffect(LifeCycleTypes.ON_FORM_VALUES_CHANGE);
    createFormEffect(LifeCycleTypes.ON_FORM_INITIAL_VALUES_CHANGE);
    createFormEffect(LifeCycleTypes.ON_FORM_INPUT_CHANGE);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT);
    createFormEffect(LifeCycleTypes.ON_FORM_RESET);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_START);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_END);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_SUCCESS);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_FAILED);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_START);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_SUCCESS);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_FAILED);
    createFormEffect(LifeCycleTypes.ON_FORM_SUBMIT_VALIDATE_END);
    createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_START);
    createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_SUCCESS);
    createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_FAILED);
    createFormEffect(LifeCycleTypes.ON_FORM_VALIDATE_END);
    createFormEffect(LifeCycleTypes.ON_FORM_GRAPH_CHANGE);
    createFormEffect(LifeCycleTypes.ON_FORM_LOADING);

    function createFieldEffect(type) {
        return createEffectHook(type, function (field, form) {
            return function (pattern, callback) {
                if (Path.parse(pattern).matchAliasGroup(field.address, field.path)) {
                    batch(function () {
                        callback(field, form);
                    });
                }
            };
        });
    }
    var _onFieldInit = createFieldEffect(LifeCycleTypes.ON_FIELD_INIT);
    var onFieldMount = createFieldEffect(LifeCycleTypes.ON_FIELD_MOUNT);
    var onFieldUnmount = createFieldEffect(LifeCycleTypes.ON_FIELD_UNMOUNT);
    var onFieldValueChange = createFieldEffect(LifeCycleTypes.ON_FIELD_VALUE_CHANGE);
    var onFieldInitialValueChange = createFieldEffect(LifeCycleTypes.ON_FIELD_INITIAL_VALUE_CHANGE);
    var onFieldInputValueChange = createFieldEffect(LifeCycleTypes.ON_FIELD_INPUT_VALUE_CHANGE);
    var onFieldValidateStart = createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_START);
    var onFieldValidateEnd = createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_END);
    createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATING);
    var onFieldValidateFailed = createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_FAILED);
    var onFieldValidateSuccess = createFieldEffect(LifeCycleTypes.ON_FIELD_VALIDATE_SUCCESS);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_START);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_END);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_START);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_END);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_SUCCESS);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_FAILED);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_SUCCESS);
    createFieldEffect(LifeCycleTypes.ON_FIELD_SUBMIT_VALIDATE_FAILED);
    createFieldEffect(LifeCycleTypes.ON_FIELD_RESET);
    createFieldEffect(LifeCycleTypes.ON_FIELD_LOADING);
    function onFieldInit(pattern, callback) {
        var form = useEffectForm();
        var count = form.query(pattern).reduce(function (count, field) {
            callback(field, form);
            return count + 1;
        }, 0);
        if (count === 0) {
            _onFieldInit(pattern, callback);
        }
    }

    var __assign$e = (undefined && undefined.__assign) || function () {
        __assign$e = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$e.apply(this, arguments);
    };
    var __read$9 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var FieldEffects = {
        onFieldInit: onFieldInit,
        onFieldMount: onFieldMount,
        onFieldUnmount: onFieldUnmount,
        onFieldValueChange: onFieldValueChange,
        onFieldInputValueChange: onFieldInputValueChange,
        onFieldInitialValueChange: onFieldInitialValueChange,
        onFieldValidateStart: onFieldValidateStart,
        onFieldValidateEnd: onFieldValidateEnd,
        onFieldValidateFailed: onFieldValidateFailed,
        onFieldValidateSuccess: onFieldValidateSuccess,
    };
    var DefaultFieldEffects = ['onFieldInit', 'onFieldValueChange'];
    var getDependencyValue = function (field, pattern, property) {
        var _a = __read$9(String(pattern).split(/\s*#\s*/), 2), target = _a[0], path = _a[1];
        return field.query(target).getIn(path || property || 'value');
    };
    var getDependencies = function (field, dependencies) {
        if (isArr$2(dependencies)) {
            var results_1 = [];
            dependencies.forEach(function (pattern) {
                if (isStr$1(pattern)) {
                    results_1.push(getDependencyValue(field, pattern));
                }
                else if (isPlainObj$1(pattern)) {
                    if (pattern.name && pattern.source) {
                        results_1[pattern.name] = getDependencyValue(field, pattern.source, pattern.property);
                    }
                }
            });
            return results_1;
        }
        else if (isPlainObj$1(dependencies)) {
            return reduce(dependencies, function (buf, pattern, key) {
                buf[key] = getDependencyValue(field, pattern);
                return buf;
            }, {});
        }
        return [];
    };
    var setSchemaFieldState = function (options, demand) {
        if (demand === void 0) { demand = false; }
        var _a = options || {}, request = _a.request, target = _a.target, field = _a.field, scope = _a.scope;
        if (!request)
            return;
        if (target) {
            if (request.state) {
                field.form.setFieldState(target, function (state) {
                    return patchCompile(state, request.state, __assign$e(__assign$e({}, scope), { $target: state }));
                });
            }
            if (request.schema) {
                field.form.setFieldState(target, function (state) {
                    return patchSchemaCompile(state, request.schema, __assign$e(__assign$e({}, scope), { $target: state }), demand);
                });
            }
        }
        else {
            if (request.state) {
                field.setState(function (state) { return patchCompile(state, request.state, scope); });
            }
            if (request.schema) {
                field.setState(function (state) {
                    return patchSchemaCompile(state, request.schema, scope, demand);
                });
            }
        }
    };
    var getBaseScope = function (field, options) {
        if (options === void 0) { options = {}; }
        var $observable = function (target, deps) {
            return autorun.memo(function () { return observable(target); }, deps);
        };
        var $props = function (props) { return field.setComponentProps(props); };
        var $effect = autorun.effect;
        var $memo = autorun.memo;
        var $self = field;
        var $form = field.form;
        var $values = field.form.values;
        return __assign$e(__assign$e({}, options.scope), { $form: $form,
            $self: $self,
            $observable: $observable,
            $effect: $effect,
            $memo: $memo,
            $props: $props,
            $values: $values });
    };
    var getBaseReactions = function (schema, options) { return function (field) {
        setSchemaFieldState({
            field: field,
            request: { schema: schema },
            scope: getBaseScope(field, options),
        }, true);
    }; };
    var getUserReactions = function (schema, options) { return function (field) {
        var reactions = toArr$1(schema['x-reactions']);
        var baseScope = getBaseScope(field, options);
        reactions.forEach(function (unCompiled) {
            var reaction = shallowCompile(unCompiled, baseScope);
            if (!reaction)
                return;
            if (isFn$2(reaction)) {
                return reaction(field);
            }
            var when = reaction.when, fulfill = reaction.fulfill, otherwise = reaction.otherwise, target = reaction.target, effects = reaction.effects;
            var run = function () {
                var $deps = getDependencies(field, reaction.dependencies);
                var $dependencies = $deps;
                var scope = __assign$e(__assign$e({}, baseScope), { $target: null, $deps: $deps,
                    $dependencies: $dependencies });
                var compiledWhen = shallowCompile(when, scope);
                var condition = isValid$6(compiledWhen) ? compiledWhen : true;
                var request = condition ? fulfill : otherwise;
                var runner = condition ? fulfill === null || fulfill === void 0 ? void 0 : fulfill.run : otherwise === null || otherwise === void 0 ? void 0 : otherwise.run;
                setSchemaFieldState({
                    field: field,
                    target: target,
                    request: request,
                    scope: scope,
                });
                if (isStr$1(runner)) {
                    shallowCompile("{{function(){" + runner + "}}}", scope)();
                }
            };
            if (target) {
                reaction.effects = (effects === null || effects === void 0 ? void 0 : effects.length) ? effects : DefaultFieldEffects;
            }
            if (reaction.effects) {
                autorun.memo(function () {
                    untracked(function () {
                        each(reaction.effects, function (type) {
                            if (FieldEffects[type]) {
                                FieldEffects[type](field.address, run);
                            }
                        });
                    });
                }, []);
            }
            else {
                run();
            }
        });
    }; };
    var transformFieldProps = function (schema, options) {
        return {
            name: schema.name,
            reactions: [
                getBaseReactions(schema, options),
                getUserReactions(schema, options),
            ],
        };
    };

    var __assign$d = (undefined && undefined.__assign) || function () {
        __assign$d = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$d.apply(this, arguments);
    };
    var patches = [];
    var polyfills = {};
    var reducePatches = function (schema) {
        return patches.reduce(function (buf, patch) {
            return patch(buf);
        }, __assign$d({}, schema));
    };
    var registerPatches = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (patch) {
            if (isFn$2(patch)) {
                patches.push(patch);
            }
        });
    };
    var registerPolyfills = function (version, patch) {
        if (version && isFn$2(patch)) {
            polyfills[version] = polyfills[version] || [];
            polyfills[version].push(patch);
        }
    };
    var enablePolyfills = function (versions) {
        if (isArr$2(versions)) {
            versions.forEach(function (version) {
                if (isArr$2(polyfills[version])) {
                    polyfills[version].forEach(function (patch) {
                        registerPatches(patch);
                    });
                }
            });
        }
    };

    var __assign$c = (undefined && undefined.__assign) || function () {
        __assign$c = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$c.apply(this, arguments);
    };
    var __read$8 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$2 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$8(arguments[i]));
        return ar;
    };
    var VOID_COMPONENTS = [
        'card',
        'block',
        'grid-col',
        'grid-row',
        'grid',
        'layout',
        'step',
        'tab',
        'text-box',
    ];
    var TYPE_DEFAULT_COMPONENTS = {};
    var transformCondition = function (condition) {
        if (isStr$1(condition)) {
            return condition.replace(/\$value/, '$self.value');
        }
    };
    var transformXLinkage = function (linkages) {
        if (isArr$2(linkages)) {
            return linkages.reduce(function (buf, item) {
                if (!item)
                    return buf;
                if (item.type === 'value:visible') {
                    return buf.concat({
                        target: item.target,
                        when: transformCondition(item.condition),
                        fulfill: {
                            state: {
                                visible: true,
                            },
                        },
                        otherwise: {
                            state: {
                                visible: false,
                            },
                        },
                    });
                }
                else if (item.type === 'value:schema') {
                    return buf.concat({
                        target: item.target,
                        when: transformCondition(item.condition),
                        fulfill: {
                            schema: SpecificationV1Polyfill(__assign$c({ version: '1.0' }, item.schema)),
                        },
                        otherwise: {
                            schema: SpecificationV1Polyfill(__assign$c({ version: '1.0' }, item.otherwise)),
                        },
                    });
                }
                else if (item.type === 'value:state') {
                    return buf.concat({
                        target: item.target,
                        when: transformCondition(item.condition),
                        fulfill: {
                            state: item.state,
                        },
                        otherwise: {
                            state: item.otherwise,
                        },
                    });
                }
            }, []);
        }
        return [];
    };
    var SpecificationV1Polyfill = function (schema) {
        if (isValid$6(schema['editable'])) {
            schema['x-editable'] = schema['x-editable'] || schema['editable'];
            delete schema['editable'];
        }
        if (isValid$6(schema['visible'])) {
            schema['x-visible'] = schema['x-visible'] || schema['visible'];
            delete schema['visible'];
        }
        if (isValid$6(schema['display'])) {
            schema['x-display'] =
                schema['x-display'] || (schema['display'] ? 'visible' : 'hidden');
            delete schema['display'];
        }
        if (isValid$6(schema['x-props'])) {
            schema['x-decorator-props'] =
                schema['x-decorator-props'] || schema['x-props'];
            delete schema['display'];
        }
        if (schema['x-linkages']) {
            schema['x-reactions'] = toArr$1(schema['x-reactions']).concat(transformXLinkage(schema['x-linkages']));
            delete schema['x-linkages'];
        }
        if (schema['x-component']) {
            if (VOID_COMPONENTS.some(function (component) { return lowerCase(component) === lowerCase(schema['x-component']); })) {
                schema['type'] = 'void';
            }
        }
        else {
            if (TYPE_DEFAULT_COMPONENTS[schema['type']]) {
                schema['x-component'] = TYPE_DEFAULT_COMPONENTS[schema['type']];
            }
        }
        if (!schema['x-decorator'] &&
            schema['type'] !== 'void' &&
            schema['type'] !== 'object') {
            schema['x-decorator'] = schema['x-decorator'] || 'FormItem';
        }
        if (schema['x-rules']) {
            schema['x-validator'] = []
                .concat(schema['x-validator'] || [])
                .concat(schema['x-rules']);
        }
        return schema;
    };
    registerPolyfills('1.0', SpecificationV1Polyfill);
    var registerVoidComponents = function (components) {
        VOID_COMPONENTS.push.apply(VOID_COMPONENTS, __spread$2(components));
    };
    var registerTypeDefaultComponents = function (maps) {
        Object.assign(TYPE_DEFAULT_COMPONENTS, maps);
    };

    var Schema = /** @class */ (function () {
        function Schema(json, parent) {
            var _this = this;
            this._isJSONSchemaObject = true;
            this.version = '2.0';
            this.addProperty = function (key, schema) {
                _this.properties = _this.properties || {};
                _this.properties[key] = new Schema(schema, _this);
                _this.properties[key].name = key;
                return _this.properties[key];
            };
            this.removeProperty = function (key) {
                var schema = _this.properties[key];
                delete _this.properties[key];
                return schema;
            };
            this.setProperties = function (properties) {
                for (var key in properties) {
                    _this.addProperty(key, properties[key]);
                }
                return _this;
            };
            this.addPatternProperty = function (key, schema) {
                if (!schema)
                    return;
                _this.patternProperties = _this.patternProperties || {};
                _this.patternProperties[key] = new Schema(schema, _this);
                _this.patternProperties[key].name = key;
                return _this.patternProperties[key];
            };
            this.removePatternProperty = function (key) {
                var schema = _this.patternProperties[key];
                delete _this.patternProperties[key];
                return schema;
            };
            this.setPatternProperties = function (properties) {
                if (!properties)
                    return _this;
                for (var key in properties) {
                    _this.addPatternProperty(key, properties[key]);
                }
                return _this;
            };
            this.setAdditionalProperties = function (properties) {
                if (!properties)
                    return;
                _this.additionalProperties = new Schema(properties);
                return _this.additionalProperties;
            };
            this.setItems = function (schema) {
                if (!schema)
                    return;
                if (Array.isArray(schema)) {
                    _this.items = schema.map(function (item) { return new Schema(item, _this); });
                }
                else {
                    _this.items = new Schema(schema, _this);
                }
                return _this.items;
            };
            this.setAdditionalItems = function (items) {
                if (!items)
                    return;
                _this.additionalItems = new Schema(items, _this);
                return _this.additionalItems;
            };
            this.findDefinitions = function (ref) {
                if (!ref || !_this.root || !isStr$1(ref))
                    return;
                if (ref.indexOf('#/') !== 0)
                    return;
                return Path.getIn(_this.root, ref.substring(2).split('/'));
            };
            this.mapProperties = function (callback) {
                return Schema.getOrderProperties(_this).map(function (_a, index) {
                    var schema = _a.schema, key = _a.key;
                    return callback(schema, key, index);
                });
            };
            this.mapPatternProperties = function (callback) {
                return Schema.getOrderProperties(_this, 'patternProperties').map(function (_a, index) {
                    var schema = _a.schema, key = _a.key;
                    return callback(schema, key, index);
                });
            };
            this.reduceProperties = function (callback, predicate) {
                var results = predicate;
                Schema.getOrderProperties(_this, 'properties').forEach(function (_a, index) {
                    var schema = _a.schema, key = _a.key;
                    results = callback(results, schema, key, index);
                });
                return results;
            };
            this.reducePatternProperties = function (callback, predicate) {
                var results = predicate;
                Schema.getOrderProperties(_this, 'patternProperties').forEach(function (_a, index) {
                    var schema = _a.schema, key = _a.key;
                    results = callback(results, schema, key, index);
                });
                return results;
            };
            this.compile = function (scope) {
                var schema = new Schema({}, _this.parent);
                each(_this, function (value, key) {
                    if (isFn$2(value) && !key.includes('x-'))
                        return;
                    if (key === 'parent' || key === 'root')
                        return;
                    if (!SchemaNestedMap[key]) {
                        schema[key] = value ? compile(value, scope) : value;
                    }
                    else {
                        schema[key] = value ? shallowCompile(value, scope) : value;
                    }
                });
                return schema;
            };
            this.fromJSON = function (json) {
                if (!json)
                    return _this;
                if (Schema.isSchemaInstance(json))
                    return json;
                each(reducePatches(json), function (value, key) {
                    if (isFn$2(value) && !key.includes('x-'))
                        return;
                    if (key === 'properties') {
                        _this.setProperties(value);
                    }
                    else if (key === 'patternProperties') {
                        _this.setPatternProperties(value);
                    }
                    else if (key === 'additionalProperties') {
                        _this.setAdditionalProperties(value);
                    }
                    else if (key === 'items') {
                        _this.setItems(value);
                    }
                    else if (key === 'additionalItems') {
                        _this.setAdditionalItems(value);
                    }
                    else if (key === '$ref') {
                        _this.fromJSON(_this.findDefinitions(value));
                    }
                    else {
                        _this[key] = value;
                    }
                });
                return _this;
            };
            this.toJSON = function (recursion) {
                if (recursion === void 0) { recursion = true; }
                var results = {};
                each(_this, function (value, key) {
                    var _a, _b;
                    if ((isFn$2(value) && !key.includes('x-')) ||
                        key === 'parent' ||
                        key === 'root')
                        return;
                    if (key === 'properties' || key === 'patternProperties') {
                        if (!recursion)
                            return;
                        results[key] = map$1(value, function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.toJSON) === null || _a === void 0 ? void 0 : _a.call(item); });
                    }
                    else if (key === 'additionalProperties' || key === 'additionalItems') {
                        if (!recursion)
                            return;
                        results[key] = (_a = value === null || value === void 0 ? void 0 : value.toJSON) === null || _a === void 0 ? void 0 : _a.call(value);
                    }
                    else if (key === 'items') {
                        if (!recursion)
                            return;
                        if (Array.isArray(value)) {
                            results[key] = value.map(function (item) { var _a; return (_a = item === null || item === void 0 ? void 0 : item.toJSON) === null || _a === void 0 ? void 0 : _a.call(item); });
                        }
                        else {
                            results[key] = (_b = value === null || value === void 0 ? void 0 : value.toJSON) === null || _b === void 0 ? void 0 : _b.call(value);
                        }
                    }
                    else {
                        results[key] = value;
                    }
                });
                return results;
            };
            this.toFieldProps = function (options) {
                return transformFieldProps(_this, options);
            };
            if (parent) {
                this.parent = parent;
                this.root = parent.root;
            }
            else {
                this.root = this;
            }
            return this.fromJSON(json);
        }
        Schema.getOrderProperties = function (schema, propertiesName) {
            if (schema === void 0) { schema = {}; }
            if (propertiesName === void 0) { propertiesName = 'properties'; }
            var orderProperties = [];
            var unorderProperties = [];
            for (var key in schema[propertiesName]) {
                var item = schema[propertiesName][key];
                var index = item['x-index'];
                if (!isNaN(index)) {
                    orderProperties[index] = { schema: item, key: key };
                }
                else {
                    unorderProperties.push({ schema: item, key: key });
                }
            }
            return orderProperties.concat(unorderProperties).filter(function (item) { return !!item; });
        };
        Schema.compile = function (expression, scope) {
            return compile(expression, scope);
        };
        Schema.shallowCompile = function (expression, scope) {
            return shallowCompile(expression, scope);
        };
        Schema.isSchemaInstance = function (value) {
            return instOf(value, Schema);
        };
        Schema.registerCompiler = registerCompiler;
        Schema.registerPatches = registerPatches;
        Schema.registerVoidComponents = registerVoidComponents;
        Schema.registerTypeDefaultComponents = registerTypeDefaultComponents;
        Schema.registerPolyfills = registerPolyfills;
        Schema.enablePolyfills = enablePolyfills;
        Schema.silent = silent;
        return Schema;
    }());

    /**
     * Make a map and return a function for checking if a key
     * is in that map.
     * IMPORTANT: all calls of this function must be prefixed with
     * \/\*#\_\_PURE\_\_\*\/
     * So that rollup can tree-shake them if necessary.
     */
    function makeMap(str, expectsLowerCase) {
        const map = Object.create(null);
        const list = str.split(',');
        for (let i = 0; i < list.length; i++) {
            map[list[i]] = true;
        }
        return expectsLowerCase ? val => !!map[val.toLowerCase()] : val => !!map[val];
    }

    function normalizeStyle(value) {
        if (isArray$1(value)) {
            const res = {};
            for (let i = 0; i < value.length; i++) {
                const item = value[i];
                const normalized = isString$1(item)
                    ? parseStringStyle(item)
                    : normalizeStyle(item);
                if (normalized) {
                    for (const key in normalized) {
                        res[key] = normalized[key];
                    }
                }
            }
            return res;
        }
        else if (isString$1(value)) {
            return value;
        }
        else if (isObject$1(value)) {
            return value;
        }
    }
    const listDelimiterRE = /;(?![^(]*\))/g;
    const propertyDelimiterRE = /:(.+)/;
    function parseStringStyle(cssText) {
        const ret = {};
        cssText.split(listDelimiterRE).forEach(item => {
            if (item) {
                const tmp = item.split(propertyDelimiterRE);
                tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
            }
        });
        return ret;
    }
    function normalizeClass(value) {
        let res = '';
        if (isString$1(value)) {
            res = value;
        }
        else if (isArray$1(value)) {
            for (let i = 0; i < value.length; i++) {
                const normalized = normalizeClass(value[i]);
                if (normalized) {
                    res += normalized + ' ';
                }
            }
        }
        else if (isObject$1(value)) {
            for (const name in value) {
                if (value[name]) {
                    res += name + ' ';
                }
            }
        }
        return res.trim();
    }

    const EMPTY_OBJ = (process.env.NODE_ENV !== 'production')
        ? Object.freeze({})
        : {};
    (process.env.NODE_ENV !== 'production') ? Object.freeze([]) : [];
    const NOOP = () => { };
    const onRE = /^on[^a-z]/;
    const isOn = (key) => onRE.test(key);
    const extend = Object.assign;
    const remove = (arr, el) => {
        const i = arr.indexOf(el);
        if (i > -1) {
            arr.splice(i, 1);
        }
    };
    const hasOwnProperty$3 = Object.prototype.hasOwnProperty;
    const hasOwn$1 = (val, key) => hasOwnProperty$3.call(val, key);
    const isArray$1 = Array.isArray;
    const isMap = (val) => toTypeString(val) === '[object Map]';
    const isSet = (val) => toTypeString(val) === '[object Set]';
    const isFunction$1 = (val) => typeof val === 'function';
    const isString$1 = (val) => typeof val === 'string';
    const isSymbol = (val) => typeof val === 'symbol';
    const isObject$1 = (val) => val !== null && typeof val === 'object';
    const isPromise = (val) => {
        return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
    };
    const objectToString$1 = Object.prototype.toString;
    const toTypeString = (value) => objectToString$1.call(value);
    const toRawType = (value) => {
        // extract "RawType" from strings like "[object RawType]"
        return toTypeString(value).slice(8, -1);
    };
    const isPlainObject$1 = (val) => toTypeString(val) === '[object Object]';
    const isIntegerKey = (key) => isString$1(key) &&
        key !== 'NaN' &&
        key[0] !== '-' &&
        '' + parseInt(key, 10) === key;
    const cacheStringFunction$1 = (fn) => {
        const cache = Object.create(null);
        return ((str) => {
            const hit = cache[str];
            return hit || (cache[str] = fn(str));
        });
    };
    /**
     * @private
     */
    const capitalize = cacheStringFunction$1((str) => str.charAt(0).toUpperCase() + str.slice(1));
    /**
     * @private
     */
    const toHandlerKey = cacheStringFunction$1((str) => str ? `on${capitalize(str)}` : ``);
    // compare whether a value has changed, accounting for NaN.
    const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
    const def = (obj, key, value) => {
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: false,
            value
        });
    };
    let _globalThis;
    const getGlobalThis = () => {
        return (_globalThis ||
            (_globalThis =
                typeof globalThis !== 'undefined'
                    ? globalThis
                    : typeof self !== 'undefined'
                        ? self
                        : typeof window !== 'undefined'
                            ? window
                            : typeof global !== 'undefined'
                                ? global
                                : {}));
    };

    let activeEffectScope;
    function recordEffectScope(effect, scope) {
        scope = scope || activeEffectScope;
        if (scope && scope.active) {
            scope.effects.push(effect);
        }
    }

    const createDep = (effects) => {
        const dep = new Set(effects);
        dep.w = 0;
        dep.n = 0;
        return dep;
    };
    const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
    const newTracked = (dep) => (dep.n & trackOpBit) > 0;
    const initDepMarkers = ({ deps }) => {
        if (deps.length) {
            for (let i = 0; i < deps.length; i++) {
                deps[i].w |= trackOpBit; // set was tracked
            }
        }
    };
    const finalizeDepMarkers = (effect) => {
        const { deps } = effect;
        if (deps.length) {
            let ptr = 0;
            for (let i = 0; i < deps.length; i++) {
                const dep = deps[i];
                if (wasTracked(dep) && !newTracked(dep)) {
                    dep.delete(effect);
                }
                else {
                    deps[ptr++] = dep;
                }
                // clear bits
                dep.w &= ~trackOpBit;
                dep.n &= ~trackOpBit;
            }
            deps.length = ptr;
        }
    };

    const targetMap = new WeakMap();
    // The number of effects currently being tracked recursively.
    let effectTrackDepth = 0;
    let trackOpBit = 1;
    /**
     * The bitwise track markers support at most 30 levels op recursion.
     * This value is chosen to enable modern JS engines to use a SMI on all platforms.
     * When recursion depth is greater, fall back to using a full cleanup.
     */
    const maxMarkerBits = 30;
    const effectStack = [];
    let activeEffect;
    const ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'iterate' : '');
    const MAP_KEY_ITERATE_KEY = Symbol((process.env.NODE_ENV !== 'production') ? 'Map key iterate' : '');
    class ReactiveEffect {
        constructor(fn, scheduler = null, scope) {
            this.fn = fn;
            this.scheduler = scheduler;
            this.active = true;
            this.deps = [];
            recordEffectScope(this, scope);
        }
        run() {
            if (!this.active) {
                return this.fn();
            }
            if (!effectStack.includes(this)) {
                try {
                    effectStack.push((activeEffect = this));
                    enableTracking();
                    trackOpBit = 1 << ++effectTrackDepth;
                    if (effectTrackDepth <= maxMarkerBits) {
                        initDepMarkers(this);
                    }
                    else {
                        cleanupEffect(this);
                    }
                    return this.fn();
                }
                finally {
                    if (effectTrackDepth <= maxMarkerBits) {
                        finalizeDepMarkers(this);
                    }
                    trackOpBit = 1 << --effectTrackDepth;
                    resetTracking();
                    effectStack.pop();
                    const n = effectStack.length;
                    activeEffect = n > 0 ? effectStack[n - 1] : undefined;
                }
            }
        }
        stop() {
            if (this.active) {
                cleanupEffect(this);
                if (this.onStop) {
                    this.onStop();
                }
                this.active = false;
            }
        }
    }
    function cleanupEffect(effect) {
        const { deps } = effect;
        if (deps.length) {
            for (let i = 0; i < deps.length; i++) {
                deps[i].delete(effect);
            }
            deps.length = 0;
        }
    }
    let shouldTrack = true;
    const trackStack = [];
    function pauseTracking() {
        trackStack.push(shouldTrack);
        shouldTrack = false;
    }
    function enableTracking() {
        trackStack.push(shouldTrack);
        shouldTrack = true;
    }
    function resetTracking() {
        const last = trackStack.pop();
        shouldTrack = last === undefined ? true : last;
    }
    function track(target, type, key) {
        if (!isTracking()) {
            return;
        }
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, (depsMap = new Map()));
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, (dep = createDep()));
        }
        const eventInfo = (process.env.NODE_ENV !== 'production')
            ? { effect: activeEffect, target, type, key }
            : undefined;
        trackEffects(dep, eventInfo);
    }
    function isTracking() {
        return shouldTrack && activeEffect !== undefined;
    }
    function trackEffects(dep, debuggerEventExtraInfo) {
        let shouldTrack = false;
        if (effectTrackDepth <= maxMarkerBits) {
            if (!newTracked(dep)) {
                dep.n |= trackOpBit; // set newly tracked
                shouldTrack = !wasTracked(dep);
            }
        }
        else {
            // Full cleanup mode.
            shouldTrack = !dep.has(activeEffect);
        }
        if (shouldTrack) {
            dep.add(activeEffect);
            activeEffect.deps.push(dep);
            if ((process.env.NODE_ENV !== 'production') && activeEffect.onTrack) {
                activeEffect.onTrack(Object.assign({
                    effect: activeEffect
                }, debuggerEventExtraInfo));
            }
        }
    }
    function trigger(target, type, key, newValue, oldValue, oldTarget) {
        const depsMap = targetMap.get(target);
        if (!depsMap) {
            // never been tracked
            return;
        }
        let deps = [];
        if (type === "clear" /* CLEAR */) {
            // collection being cleared
            // trigger all effects for target
            deps = [...depsMap.values()];
        }
        else if (key === 'length' && isArray$1(target)) {
            depsMap.forEach((dep, key) => {
                if (key === 'length' || key >= newValue) {
                    deps.push(dep);
                }
            });
        }
        else {
            // schedule runs for SET | ADD | DELETE
            if (key !== void 0) {
                deps.push(depsMap.get(key));
            }
            // also run for iteration key on ADD | DELETE | Map.SET
            switch (type) {
                case "add" /* ADD */:
                    if (!isArray$1(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    else if (isIntegerKey(key)) {
                        // new index added to array -> length changes
                        deps.push(depsMap.get('length'));
                    }
                    break;
                case "delete" /* DELETE */:
                    if (!isArray$1(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                        if (isMap(target)) {
                            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
                        }
                    }
                    break;
                case "set" /* SET */:
                    if (isMap(target)) {
                        deps.push(depsMap.get(ITERATE_KEY));
                    }
                    break;
            }
        }
        const eventInfo = (process.env.NODE_ENV !== 'production')
            ? { target, type, key, newValue, oldValue, oldTarget }
            : undefined;
        if (deps.length === 1) {
            if (deps[0]) {
                if ((process.env.NODE_ENV !== 'production')) {
                    triggerEffects(deps[0], eventInfo);
                }
                else {
                    triggerEffects(deps[0]);
                }
            }
        }
        else {
            const effects = [];
            for (const dep of deps) {
                if (dep) {
                    effects.push(...dep);
                }
            }
            if ((process.env.NODE_ENV !== 'production')) {
                triggerEffects(createDep(effects), eventInfo);
            }
            else {
                triggerEffects(createDep(effects));
            }
        }
    }
    function triggerEffects(dep, debuggerEventExtraInfo) {
        // spread into array for stabilization
        for (const effect of isArray$1(dep) ? dep : [...dep]) {
            if (effect !== activeEffect || effect.allowRecurse) {
                if ((process.env.NODE_ENV !== 'production') && effect.onTrigger) {
                    effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
                }
                if (effect.scheduler) {
                    effect.scheduler();
                }
                else {
                    effect.run();
                }
            }
        }
    }

    const isNonTrackableKeys = /*#__PURE__*/ makeMap(`__proto__,__v_isRef,__isVue`);
    const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol)
        .map(key => Symbol[key])
        .filter(isSymbol));
    const get = /*#__PURE__*/ createGetter();
    const readonlyGet = /*#__PURE__*/ createGetter(true);
    const shallowReadonlyGet = /*#__PURE__*/ createGetter(true, true);
    const arrayInstrumentations = /*#__PURE__*/ createArrayInstrumentations();
    function createArrayInstrumentations() {
        const instrumentations = {};
        ['includes', 'indexOf', 'lastIndexOf'].forEach(key => {
            instrumentations[key] = function (...args) {
                const arr = toRaw(this);
                for (let i = 0, l = this.length; i < l; i++) {
                    track(arr, "get" /* GET */, i + '');
                }
                // we run the method using the original args first (which may be reactive)
                const res = arr[key](...args);
                if (res === -1 || res === false) {
                    // if that didn't work, run it again using raw values.
                    return arr[key](...args.map(toRaw));
                }
                else {
                    return res;
                }
            };
        });
        ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key => {
            instrumentations[key] = function (...args) {
                pauseTracking();
                const res = toRaw(this)[key].apply(this, args);
                resetTracking();
                return res;
            };
        });
        return instrumentations;
    }
    function createGetter(isReadonly = false, shallow = false) {
        return function get(target, key, receiver) {
            if (key === "__v_isReactive" /* IS_REACTIVE */) {
                return !isReadonly;
            }
            else if (key === "__v_isReadonly" /* IS_READONLY */) {
                return isReadonly;
            }
            else if (key === "__v_raw" /* RAW */ &&
                receiver ===
                    (isReadonly
                        ? shallow
                            ? shallowReadonlyMap
                            : readonlyMap
                        : shallow
                            ? shallowReactiveMap
                            : reactiveMap).get(target)) {
                return target;
            }
            const targetIsArray = isArray$1(target);
            if (!isReadonly && targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
                return Reflect.get(arrayInstrumentations, key, receiver);
            }
            const res = Reflect.get(target, key, receiver);
            if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
                return res;
            }
            if (!isReadonly) {
                track(target, "get" /* GET */, key);
            }
            if (shallow) {
                return res;
            }
            if (isRef(res)) {
                // ref unwrapping - does not apply for Array + integer key.
                const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
                return shouldUnwrap ? res.value : res;
            }
            if (isObject$1(res)) {
                // Convert returned value into a proxy as well. we do the isObject check
                // here to avoid invalid value warning. Also need to lazy access readonly
                // and reactive here to avoid circular dependency.
                return isReadonly ? readonly(res) : reactive(res);
            }
            return res;
        };
    }
    const set = /*#__PURE__*/ createSetter();
    function createSetter(shallow = false) {
        return function set(target, key, value, receiver) {
            let oldValue = target[key];
            if (!shallow) {
                value = toRaw(value);
                oldValue = toRaw(oldValue);
                if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
                    oldValue.value = value;
                    return true;
                }
            }
            const hadKey = isArray$1(target) && isIntegerKey(key)
                ? Number(key) < target.length
                : hasOwn$1(target, key);
            const result = Reflect.set(target, key, value, receiver);
            // don't trigger if target is something up in the prototype chain of original
            if (target === toRaw(receiver)) {
                if (!hadKey) {
                    trigger(target, "add" /* ADD */, key, value);
                }
                else if (hasChanged(value, oldValue)) {
                    trigger(target, "set" /* SET */, key, value, oldValue);
                }
            }
            return result;
        };
    }
    function deleteProperty(target, key) {
        const hadKey = hasOwn$1(target, key);
        const oldValue = target[key];
        const result = Reflect.deleteProperty(target, key);
        if (result && hadKey) {
            trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
        }
        return result;
    }
    function has(target, key) {
        const result = Reflect.has(target, key);
        if (!isSymbol(key) || !builtInSymbols.has(key)) {
            track(target, "has" /* HAS */, key);
        }
        return result;
    }
    function ownKeys$1(target) {
        track(target, "iterate" /* ITERATE */, isArray$1(target) ? 'length' : ITERATE_KEY);
        return Reflect.ownKeys(target);
    }
    const mutableHandlers = {
        get,
        set,
        deleteProperty,
        has,
        ownKeys: ownKeys$1
    };
    const readonlyHandlers = {
        get: readonlyGet,
        set(target, key) {
            if ((process.env.NODE_ENV !== 'production')) {
                console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
            }
            return true;
        },
        deleteProperty(target, key) {
            if ((process.env.NODE_ENV !== 'production')) {
                console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
            }
            return true;
        }
    };
    // Props handlers are special in the sense that it should not unwrap top-level
    // refs (in order to allow refs to be explicitly passed down), but should
    // retain the reactivity of the normal readonly object.
    const shallowReadonlyHandlers = /*#__PURE__*/ extend({}, readonlyHandlers, {
        get: shallowReadonlyGet
    });

    const toShallow = (value) => value;
    const getProto = (v) => Reflect.getPrototypeOf(v);
    function get$1(target, key, isReadonly = false, isShallow = false) {
        // #1772: readonly(reactive(Map)) should return readonly + reactive version
        // of the value
        target = target["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (key !== rawKey) {
            !isReadonly && track(rawTarget, "get" /* GET */, key);
        }
        !isReadonly && track(rawTarget, "get" /* GET */, rawKey);
        const { has } = getProto(rawTarget);
        const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
        if (has.call(rawTarget, key)) {
            return wrap(target.get(key));
        }
        else if (has.call(rawTarget, rawKey)) {
            return wrap(target.get(rawKey));
        }
        else if (target !== rawTarget) {
            // #3602 readonly(reactive(Map))
            // ensure that the nested reactive `Map` can do tracking for itself
            target.get(key);
        }
    }
    function has$1(key, isReadonly = false) {
        const target = this["__v_raw" /* RAW */];
        const rawTarget = toRaw(target);
        const rawKey = toRaw(key);
        if (key !== rawKey) {
            !isReadonly && track(rawTarget, "has" /* HAS */, key);
        }
        !isReadonly && track(rawTarget, "has" /* HAS */, rawKey);
        return key === rawKey
            ? target.has(key)
            : target.has(key) || target.has(rawKey);
    }
    function size(target, isReadonly = false) {
        target = target["__v_raw" /* RAW */];
        !isReadonly && track(toRaw(target), "iterate" /* ITERATE */, ITERATE_KEY);
        return Reflect.get(target, 'size', target);
    }
    function add(value) {
        value = toRaw(value);
        const target = toRaw(this);
        const proto = getProto(target);
        const hadKey = proto.has.call(target, value);
        if (!hadKey) {
            target.add(value);
            trigger(target, "add" /* ADD */, value, value);
        }
        return this;
    }
    function set$1(key, value) {
        value = toRaw(value);
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
        }
        else if ((process.env.NODE_ENV !== 'production')) {
            checkIdentityKeys(target, has, key);
        }
        const oldValue = get.call(target, key);
        target.set(key, value);
        if (!hadKey) {
            trigger(target, "add" /* ADD */, key, value);
        }
        else if (hasChanged(value, oldValue)) {
            trigger(target, "set" /* SET */, key, value, oldValue);
        }
        return this;
    }
    function deleteEntry(key) {
        const target = toRaw(this);
        const { has, get } = getProto(target);
        let hadKey = has.call(target, key);
        if (!hadKey) {
            key = toRaw(key);
            hadKey = has.call(target, key);
        }
        else if ((process.env.NODE_ENV !== 'production')) {
            checkIdentityKeys(target, has, key);
        }
        const oldValue = get ? get.call(target, key) : undefined;
        // forward the operation before queueing reactions
        const result = target.delete(key);
        if (hadKey) {
            trigger(target, "delete" /* DELETE */, key, undefined, oldValue);
        }
        return result;
    }
    function clear() {
        const target = toRaw(this);
        const hadItems = target.size !== 0;
        const oldTarget = (process.env.NODE_ENV !== 'production')
            ? isMap(target)
                ? new Map(target)
                : new Set(target)
            : undefined;
        // forward the operation before queueing reactions
        const result = target.clear();
        if (hadItems) {
            trigger(target, "clear" /* CLEAR */, undefined, undefined, oldTarget);
        }
        return result;
    }
    function createForEach(isReadonly, isShallow) {
        return function forEach(callback, thisArg) {
            const observed = this;
            const target = observed["__v_raw" /* RAW */];
            const rawTarget = toRaw(target);
            const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
            !isReadonly && track(rawTarget, "iterate" /* ITERATE */, ITERATE_KEY);
            return target.forEach((value, key) => {
                // important: make sure the callback is
                // 1. invoked with the reactive map as `this` and 3rd arg
                // 2. the value received should be a corresponding reactive/readonly.
                return callback.call(thisArg, wrap(value), wrap(key), observed);
            });
        };
    }
    function createIterableMethod(method, isReadonly, isShallow) {
        return function (...args) {
            const target = this["__v_raw" /* RAW */];
            const rawTarget = toRaw(target);
            const targetIsMap = isMap(rawTarget);
            const isPair = method === 'entries' || (method === Symbol.iterator && targetIsMap);
            const isKeyOnly = method === 'keys' && targetIsMap;
            const innerIterator = target[method](...args);
            const wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
            !isReadonly &&
                track(rawTarget, "iterate" /* ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
            // return a wrapped iterator which returns observed versions of the
            // values emitted from the real iterator
            return {
                // iterator protocol
                next() {
                    const { value, done } = innerIterator.next();
                    return done
                        ? { value, done }
                        : {
                            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
                            done
                        };
                },
                // iterable protocol
                [Symbol.iterator]() {
                    return this;
                }
            };
        };
    }
    function createReadonlyMethod(type) {
        return function (...args) {
            if ((process.env.NODE_ENV !== 'production')) {
                const key = args[0] ? `on key "${args[0]}" ` : ``;
                console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
            }
            return type === "delete" /* DELETE */ ? false : this;
        };
    }
    function createInstrumentations() {
        const mutableInstrumentations = {
            get(key) {
                return get$1(this, key);
            },
            get size() {
                return size(this);
            },
            has: has$1,
            add,
            set: set$1,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, false)
        };
        const shallowInstrumentations = {
            get(key) {
                return get$1(this, key, false, true);
            },
            get size() {
                return size(this);
            },
            has: has$1,
            add,
            set: set$1,
            delete: deleteEntry,
            clear,
            forEach: createForEach(false, true)
        };
        const readonlyInstrumentations = {
            get(key) {
                return get$1(this, key, true);
            },
            get size() {
                return size(this, true);
            },
            has(key) {
                return has$1.call(this, key, true);
            },
            add: createReadonlyMethod("add" /* ADD */),
            set: createReadonlyMethod("set" /* SET */),
            delete: createReadonlyMethod("delete" /* DELETE */),
            clear: createReadonlyMethod("clear" /* CLEAR */),
            forEach: createForEach(true, false)
        };
        const shallowReadonlyInstrumentations = {
            get(key) {
                return get$1(this, key, true, true);
            },
            get size() {
                return size(this, true);
            },
            has(key) {
                return has$1.call(this, key, true);
            },
            add: createReadonlyMethod("add" /* ADD */),
            set: createReadonlyMethod("set" /* SET */),
            delete: createReadonlyMethod("delete" /* DELETE */),
            clear: createReadonlyMethod("clear" /* CLEAR */),
            forEach: createForEach(true, true)
        };
        const iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
        iteratorMethods.forEach(method => {
            mutableInstrumentations[method] = createIterableMethod(method, false, false);
            readonlyInstrumentations[method] = createIterableMethod(method, true, false);
            shallowInstrumentations[method] = createIterableMethod(method, false, true);
            shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
        });
        return [
            mutableInstrumentations,
            readonlyInstrumentations,
            shallowInstrumentations,
            shallowReadonlyInstrumentations
        ];
    }
    const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* #__PURE__*/ createInstrumentations();
    function createInstrumentationGetter(isReadonly, shallow) {
        const instrumentations = shallow
            ? isReadonly
                ? shallowReadonlyInstrumentations
                : shallowInstrumentations
            : isReadonly
                ? readonlyInstrumentations
                : mutableInstrumentations;
        return (target, key, receiver) => {
            if (key === "__v_isReactive" /* IS_REACTIVE */) {
                return !isReadonly;
            }
            else if (key === "__v_isReadonly" /* IS_READONLY */) {
                return isReadonly;
            }
            else if (key === "__v_raw" /* RAW */) {
                return target;
            }
            return Reflect.get(hasOwn$1(instrumentations, key) && key in target
                ? instrumentations
                : target, key, receiver);
        };
    }
    const mutableCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(false, false)
    };
    const readonlyCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(true, false)
    };
    const shallowReadonlyCollectionHandlers = {
        get: /*#__PURE__*/ createInstrumentationGetter(true, true)
    };
    function checkIdentityKeys(target, has, key) {
        const rawKey = toRaw(key);
        if (rawKey !== key && has.call(target, rawKey)) {
            const type = toRawType(target);
            console.warn(`Reactive ${type} contains both the raw and reactive ` +
                `versions of the same object${type === `Map` ? ` as keys` : ``}, ` +
                `which can lead to inconsistencies. ` +
                `Avoid differentiating between the raw and reactive versions ` +
                `of an object and only use the reactive version if possible.`);
        }
    }

    const reactiveMap = new WeakMap();
    const shallowReactiveMap = new WeakMap();
    const readonlyMap = new WeakMap();
    const shallowReadonlyMap = new WeakMap();
    function targetTypeMap(rawType) {
        switch (rawType) {
            case 'Object':
            case 'Array':
                return 1 /* COMMON */;
            case 'Map':
            case 'Set':
            case 'WeakMap':
            case 'WeakSet':
                return 2 /* COLLECTION */;
            default:
                return 0 /* INVALID */;
        }
    }
    function getTargetType(value) {
        return value["__v_skip" /* SKIP */] || !Object.isExtensible(value)
            ? 0 /* INVALID */
            : targetTypeMap(toRawType(value));
    }
    function reactive(target) {
        // if trying to observe a readonly proxy, return the readonly version.
        if (target && target["__v_isReadonly" /* IS_READONLY */]) {
            return target;
        }
        return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
    }
    /**
     * Creates a readonly copy of the original object. Note the returned copy is not
     * made reactive, but `readonly` can be called on an already reactive object.
     */
    function readonly(target) {
        return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
    }
    /**
     * Returns a reactive-copy of the original object, where only the root level
     * properties are readonly, and does NOT unwrap refs nor recursively convert
     * returned properties.
     * This is used for creating the props proxy object for stateful components.
     */
    function shallowReadonly(target) {
        return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
    }
    function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
        if (!isObject$1(target)) {
            if ((process.env.NODE_ENV !== 'production')) {
                console.warn(`value cannot be made reactive: ${String(target)}`);
            }
            return target;
        }
        // target is already a Proxy, return it.
        // exception: calling readonly() on a reactive object
        if (target["__v_raw" /* RAW */] &&
            !(isReadonly && target["__v_isReactive" /* IS_REACTIVE */])) {
            return target;
        }
        // target already has corresponding Proxy
        const existingProxy = proxyMap.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        // only a whitelist of value types can be observed.
        const targetType = getTargetType(target);
        if (targetType === 0 /* INVALID */) {
            return target;
        }
        const proxy = new Proxy(target, targetType === 2 /* COLLECTION */ ? collectionHandlers : baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }
    function isReactive(value) {
        if (isReadonly(value)) {
            return isReactive(value["__v_raw" /* RAW */]);
        }
        return !!(value && value["__v_isReactive" /* IS_REACTIVE */]);
    }
    function isReadonly(value) {
        return !!(value && value["__v_isReadonly" /* IS_READONLY */]);
    }
    function isProxy(value) {
        return isReactive(value) || isReadonly(value);
    }
    function toRaw(observed) {
        const raw = observed && observed["__v_raw" /* RAW */];
        return raw ? toRaw(raw) : observed;
    }
    function markRaw(value) {
        def(value, "__v_skip" /* SKIP */, true);
        return value;
    }
    const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
    const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;

    function trackRefValue(ref) {
        if (isTracking()) {
            ref = toRaw(ref);
            if (!ref.dep) {
                ref.dep = createDep();
            }
            if ((process.env.NODE_ENV !== 'production')) {
                trackEffects(ref.dep, {
                    target: ref,
                    type: "get" /* GET */,
                    key: 'value'
                });
            }
            else {
                trackEffects(ref.dep);
            }
        }
    }
    function triggerRefValue(ref, newVal) {
        ref = toRaw(ref);
        if (ref.dep) {
            if ((process.env.NODE_ENV !== 'production')) {
                triggerEffects(ref.dep, {
                    target: ref,
                    type: "set" /* SET */,
                    key: 'value',
                    newValue: newVal
                });
            }
            else {
                triggerEffects(ref.dep);
            }
        }
    }
    function isRef(r) {
        return Boolean(r && r.__v_isRef === true);
    }
    function ref(value) {
        return createRef(value, false);
    }
    function shallowRef(value) {
        return createRef(value, true);
    }
    function createRef(rawValue, shallow) {
        if (isRef(rawValue)) {
            return rawValue;
        }
        return new RefImpl(rawValue, shallow);
    }
    class RefImpl {
        constructor(value, _shallow) {
            this._shallow = _shallow;
            this.dep = undefined;
            this.__v_isRef = true;
            this._rawValue = _shallow ? value : toRaw(value);
            this._value = _shallow ? value : toReactive(value);
        }
        get value() {
            trackRefValue(this);
            return this._value;
        }
        set value(newVal) {
            newVal = this._shallow ? newVal : toRaw(newVal);
            if (hasChanged(newVal, this._rawValue)) {
                this._rawValue = newVal;
                this._value = this._shallow ? newVal : toReactive(newVal);
                triggerRefValue(this, newVal);
            }
        }
    }
    function unref(ref) {
        return isRef(ref) ? ref.value : ref;
    }
    const shallowUnwrapHandlers = {
        get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
        set: (target, key, value, receiver) => {
            const oldValue = target[key];
            if (isRef(oldValue) && !isRef(value)) {
                oldValue.value = value;
                return true;
            }
            else {
                return Reflect.set(target, key, value, receiver);
            }
        }
    };
    function proxyRefs(objectWithRefs) {
        return isReactive(objectWithRefs)
            ? objectWithRefs
            : new Proxy(objectWithRefs, shallowUnwrapHandlers);
    }

    class ComputedRefImpl {
        constructor(getter, _setter, isReadonly) {
            this._setter = _setter;
            this.dep = undefined;
            this._dirty = true;
            this.__v_isRef = true;
            this.effect = new ReactiveEffect(getter, () => {
                if (!this._dirty) {
                    this._dirty = true;
                    triggerRefValue(this);
                }
            });
            this["__v_isReadonly" /* IS_READONLY */] = isReadonly;
        }
        get value() {
            // the computed ref may get wrapped by other proxies e.g. readonly() #3376
            const self = toRaw(this);
            trackRefValue(self);
            if (self._dirty) {
                self._dirty = false;
                self._value = self.effect.run();
            }
            return self._value;
        }
        set value(newValue) {
            this._setter(newValue);
        }
    }
    function computed(getterOrOptions, debugOptions) {
        let getter;
        let setter;
        const onlyGetter = isFunction$1(getterOrOptions);
        if (onlyGetter) {
            getter = getterOrOptions;
            setter = (process.env.NODE_ENV !== 'production')
                ? () => {
                    console.warn('Write operation failed: computed value is readonly');
                }
                : NOOP;
        }
        else {
            getter = getterOrOptions.get;
            setter = getterOrOptions.set;
        }
        const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter);
        if ((process.env.NODE_ENV !== 'production') && debugOptions) {
            cRef.effect.onTrack = debugOptions.onTrack;
            cRef.effect.onTrigger = debugOptions.onTrigger;
        }
        return cRef;
    }
    Promise.resolve();

    const hmrDirtyComponents = new Set();
    // Expose the HMR runtime on the global object
    // This makes it entirely tree-shakable without polluting the exports and makes
    // it easier to be used in toolings like vue-loader
    // Note: for a component to be eligible for HMR it also needs the __hmrId option
    // to be set so that its instances can be registered / removed.
    if ((process.env.NODE_ENV !== 'production')) {
        getGlobalThis().__VUE_HMR_RUNTIME__ = {
            createRecord: tryWrap(createRecord),
            rerender: tryWrap(rerender),
            reload: tryWrap(reload)
        };
    }
    const map = new Map();
    function createRecord(id, initialDef) {
        if (map.has(id)) {
            return false;
        }
        map.set(id, {
            initialDef: normalizeClassComponent(initialDef),
            instances: new Set()
        });
        return true;
    }
    function normalizeClassComponent(component) {
        return isClassComponent(component) ? component.__vccOpts : component;
    }
    function rerender(id, newRender) {
        const record = map.get(id);
        if (!record) {
            return;
        }
        // update initial record (for not-yet-rendered component)
        record.initialDef.render = newRender;
        [...record.instances].forEach(instance => {
            if (newRender) {
                instance.render = newRender;
                normalizeClassComponent(instance.type).render = newRender;
            }
            instance.renderCache = [];
            instance.update();
        });
    }
    function reload(id, newComp) {
        const record = map.get(id);
        if (!record)
            return;
        newComp = normalizeClassComponent(newComp);
        // update initial def (for not-yet-rendered components)
        updateComponentDef(record.initialDef, newComp);
        // create a snapshot which avoids the set being mutated during updates
        const instances = [...record.instances];
        for (const instance of instances) {
            const oldComp = normalizeClassComponent(instance.type);
            if (!hmrDirtyComponents.has(oldComp)) {
                // 1. Update existing comp definition to match new one
                if (oldComp !== record.initialDef) {
                    updateComponentDef(oldComp, newComp);
                }
                // 2. mark definition dirty. This forces the renderer to replace the
                // component on patch.
                hmrDirtyComponents.add(oldComp);
            }
            // 3. invalidate options resolution cache
            instance.appContext.optionsCache.delete(instance.type);
            // 4. actually update
            if (instance.ceReload) {
                // custom element
                hmrDirtyComponents.add(oldComp);
                instance.ceReload(newComp.styles);
                hmrDirtyComponents.delete(oldComp);
            }
            else if (instance.parent) {
                // 4. Force the parent instance to re-render. This will cause all updated
                // components to be unmounted and re-mounted. Queue the update so that we
                // don't end up forcing the same parent to re-render multiple times.
                queueJob(instance.parent.update);
                // instance is the inner component of an async custom element
                // invoke to reset styles
                if (instance.parent.type.__asyncLoader &&
                    instance.parent.ceReload) {
                    instance.parent.ceReload(newComp.styles);
                }
            }
            else if (instance.appContext.reload) {
                // root instance mounted via createApp() has a reload method
                instance.appContext.reload();
            }
            else if (typeof window !== 'undefined') {
                // root instance inside tree created via raw render(). Force reload.
                window.location.reload();
            }
            else {
                console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
            }
        }
        // 5. make sure to cleanup dirty hmr components after update
        queuePostFlushCb(() => {
            for (const instance of instances) {
                hmrDirtyComponents.delete(normalizeClassComponent(instance.type));
            }
        });
    }
    function updateComponentDef(oldComp, newComp) {
        extend(oldComp, newComp);
        for (const key in oldComp) {
            if (key !== '__file' && !(key in newComp)) {
                delete oldComp[key];
            }
        }
    }
    function tryWrap(fn) {
        return (id, arg) => {
            try {
                return fn(id, arg);
            }
            catch (e) {
                console.error(e);
                console.warn(`[HMR] Something went wrong during Vue component hot-reload. ` +
                    `Full reload required.`);
            }
        };
    }

    /**
     * mark the current rendering instance for asset resolution (e.g.
     * resolveComponent, resolveDirective) during render
     */
    let currentRenderingInstance = null;
    let currentScopeId = null;
    function markAttrsAccessed() {
    }

    const isSuspense = (type) => type.__isSuspense;
    function queueEffectWithSuspense(fn, suspense) {
        if (suspense && suspense.pendingBranch) {
            if (isArray$1(fn)) {
                suspense.effects.push(...fn);
            }
            else {
                suspense.effects.push(fn);
            }
        }
        else {
            queuePostFlushCb(fn);
        }
    }

    function provide(key, value) {
        if (!currentInstance) {
            if ((process.env.NODE_ENV !== 'production')) {
                warn$1(`provide() can only be used inside setup().`);
            }
        }
        else {
            let provides = currentInstance.provides;
            // by default an instance inherits its parent's provides object
            // but when it needs to provide values of its own, it creates its
            // own provides object using parent provides object as prototype.
            // this way in `inject` we can simply look up injections from direct
            // parent and let the prototype chain do the work.
            const parentProvides = currentInstance.parent && currentInstance.parent.provides;
            if (parentProvides === provides) {
                provides = currentInstance.provides = Object.create(parentProvides);
            }
            // TS doesn't allow symbol as index type
            provides[key] = value;
        }
    }
    function inject(key, defaultValue, treatDefaultAsFactory = false) {
        // fallback to `currentRenderingInstance` so that this can be called in
        // a functional component
        const instance = currentInstance || currentRenderingInstance;
        if (instance) {
            // #2400
            // to support `app.use` plugins,
            // fallback to appContext's `provides` if the intance is at root
            const provides = instance.parent == null
                ? instance.vnode.appContext && instance.vnode.appContext.provides
                : instance.parent.provides;
            if (provides && key in provides) {
                // TS doesn't allow symbol as index type
                return provides[key];
            }
            else if (arguments.length > 1) {
                return treatDefaultAsFactory && isFunction$1(defaultValue)
                    ? defaultValue.call(instance.proxy)
                    : defaultValue;
            }
            else if ((process.env.NODE_ENV !== 'production')) {
                warn$1(`injection "${String(key)}" not found.`);
            }
        }
        else if ((process.env.NODE_ENV !== 'production')) {
            warn$1(`inject() can only be used inside setup() or functional components.`);
        }
    }

    // implementation, close to no-op
    function defineComponent(options) {
        return isFunction$1(options) ? { setup: options, name: options.name } : options;
    }

    function injectHook(type, hook, target = currentInstance, prepend = false) {
        if (target) {
            const hooks = target[type] || (target[type] = []);
            // cache the error handling wrapper for injected hooks so the same hook
            // can be properly deduped by the scheduler. "__weh" stands for "with error
            // handling".
            const wrappedHook = hook.__weh ||
                (hook.__weh = (...args) => {
                    if (target.isUnmounted) {
                        return;
                    }
                    // disable tracking inside all lifecycle hooks
                    // since they can potentially be called inside effects.
                    pauseTracking();
                    // Set currentInstance during hook invocation.
                    // This assumes the hook does not synchronously trigger other hooks, which
                    // can only be false when the user does something really funky.
                    setCurrentInstance(target);
                    const res = callWithAsyncErrorHandling(hook, target, type, args);
                    unsetCurrentInstance();
                    resetTracking();
                    return res;
                });
            if (prepend) {
                hooks.unshift(wrappedHook);
            }
            else {
                hooks.push(wrappedHook);
            }
            return wrappedHook;
        }
        else if ((process.env.NODE_ENV !== 'production')) {
            const apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''));
            warn$1(`${apiName} is called when there is no active component instance to be ` +
                `associated with. ` +
                `Lifecycle injection APIs can only be used during execution of setup().` +
                (` If you are using async setup(), make sure to register lifecycle ` +
                        `hooks before the first await statement.`
                    ));
        }
    }
    const createHook = (lifecycle) => (hook, target = currentInstance) => 
    // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
    injectHook(lifecycle, hook, target);
    const onMounted = createHook("m" /* MOUNTED */);
    const onUpdated = createHook("u" /* UPDATED */);
    const onBeforeUnmount = createHook("bum" /* BEFORE_UNMOUNT */);
    const onUnmounted = createHook("um" /* UNMOUNTED */);
    let shouldCacheAccess = true;
    /**
     * Resolve merged options and cache it on the component.
     * This is done only once per-component since the merging does not involve
     * instances.
     */
    function resolveMergedOptions(instance) {
        const base = instance.type;
        const { mixins, extends: extendsOptions } = base;
        const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
        const cached = cache.get(base);
        let resolved;
        if (cached) {
            resolved = cached;
        }
        else if (!globalMixins.length && !mixins && !extendsOptions) {
            {
                resolved = base;
            }
        }
        else {
            resolved = {};
            if (globalMixins.length) {
                globalMixins.forEach(m => mergeOptions(resolved, m, optionMergeStrategies, true));
            }
            mergeOptions(resolved, base, optionMergeStrategies);
        }
        cache.set(base, resolved);
        return resolved;
    }
    function mergeOptions(to, from, strats, asMixin = false) {
        const { mixins, extends: extendsOptions } = from;
        if (extendsOptions) {
            mergeOptions(to, extendsOptions, strats, true);
        }
        if (mixins) {
            mixins.forEach((m) => mergeOptions(to, m, strats, true));
        }
        for (const key in from) {
            if (asMixin && key === 'expose') {
                (process.env.NODE_ENV !== 'production') &&
                    warn$1(`"expose" option is ignored when declared in mixins or extends. ` +
                        `It should only be declared in the base component itself.`);
            }
            else {
                const strat = internalOptionMergeStrats[key] || (strats && strats[key]);
                to[key] = strat ? strat(to[key], from[key]) : from[key];
            }
        }
        return to;
    }
    const internalOptionMergeStrats = {
        data: mergeDataFn,
        props: mergeObjectOptions,
        emits: mergeObjectOptions,
        // objects
        methods: mergeObjectOptions,
        computed: mergeObjectOptions,
        // lifecycle
        beforeCreate: mergeAsArray,
        created: mergeAsArray,
        beforeMount: mergeAsArray,
        mounted: mergeAsArray,
        beforeUpdate: mergeAsArray,
        updated: mergeAsArray,
        beforeDestroy: mergeAsArray,
        beforeUnmount: mergeAsArray,
        destroyed: mergeAsArray,
        unmounted: mergeAsArray,
        activated: mergeAsArray,
        deactivated: mergeAsArray,
        errorCaptured: mergeAsArray,
        serverPrefetch: mergeAsArray,
        // assets
        components: mergeObjectOptions,
        directives: mergeObjectOptions,
        // watch
        watch: mergeWatchOptions,
        // provide / inject
        provide: mergeDataFn,
        inject: mergeInject
    };
    function mergeDataFn(to, from) {
        if (!from) {
            return to;
        }
        if (!to) {
            return from;
        }
        return function mergedDataFn() {
            return (extend)(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
        };
    }
    function mergeInject(to, from) {
        return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
    }
    function normalizeInject(raw) {
        if (isArray$1(raw)) {
            const res = {};
            for (let i = 0; i < raw.length; i++) {
                res[raw[i]] = raw[i];
            }
            return res;
        }
        return raw;
    }
    function mergeAsArray(to, from) {
        return to ? [...new Set([].concat(to, from))] : from;
    }
    function mergeObjectOptions(to, from) {
        return to ? extend(extend(Object.create(null), to), from) : from;
    }
    function mergeWatchOptions(to, from) {
        if (!to)
            return from;
        if (!from)
            return to;
        const merged = extend(Object.create(null), to);
        for (const key in from) {
            merged[key] = mergeAsArray(to[key], from[key]);
        }
        return merged;
    }
    /**
     * Adds directives to a VNode.
     */
    function withDirectives(vnode, directives) {
        {
            (process.env.NODE_ENV !== 'production') && warn$1(`withDirectives can only be used inside render functions.`);
            return vnode;
        }
    }

    const queuePostRenderEffect = queueEffectWithSuspense
        ;

    const isTeleport = (type) => type.__isTeleport;
    const NULL_DYNAMIC_COMPONENT = Symbol();

    const Fragment$1 = Symbol((process.env.NODE_ENV !== 'production') ? 'Fragment' : undefined);
    const Text = Symbol((process.env.NODE_ENV !== 'production') ? 'Text' : undefined);
    const Comment = Symbol((process.env.NODE_ENV !== 'production') ? 'Comment' : undefined);
    Symbol((process.env.NODE_ENV !== 'production') ? 'Static' : undefined);
    let currentBlock = null;
    function isVNode(value) {
        return value ? value.__v_isVNode === true : false;
    }
    const createVNodeWithArgsTransform = (...args) => {
        return _createVNode(...(args));
    };
    const InternalObjectKey = `__vInternal`;
    const normalizeKey = ({ key }) => key != null ? key : null;
    const normalizeRef = ({ ref }) => {
        return (ref != null
            ? isString$1(ref) || isRef(ref) || isFunction$1(ref)
                ? { i: currentRenderingInstance, r: ref }
                : ref
            : null);
    };
    function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment$1 ? 0 : 1 /* ELEMENT */, isBlockNode = false, needFullChildrenNormalization = false) {
        const vnode = {
            __v_isVNode: true,
            __v_skip: true,
            type,
            props,
            key: props && normalizeKey(props),
            ref: props && normalizeRef(props),
            scopeId: currentScopeId,
            slotScopeIds: null,
            children,
            component: null,
            suspense: null,
            ssContent: null,
            ssFallback: null,
            dirs: null,
            transition: null,
            el: null,
            anchor: null,
            target: null,
            targetAnchor: null,
            staticCount: 0,
            shapeFlag,
            patchFlag,
            dynamicProps,
            dynamicChildren: null,
            appContext: null
        };
        if (needFullChildrenNormalization) {
            normalizeChildren(vnode, children);
            // normalize suspense children
            if (shapeFlag & 128 /* SUSPENSE */) {
                type.normalize(vnode);
            }
        }
        else if (children) {
            // compiled element vnode - if children is passed, only possible types are
            // string or Array.
            vnode.shapeFlag |= isString$1(children)
                ? 8 /* TEXT_CHILDREN */
                : 16 /* ARRAY_CHILDREN */;
        }
        // validate key
        if ((process.env.NODE_ENV !== 'production') && vnode.key !== vnode.key) {
            warn$1(`VNode created with invalid key (NaN). VNode type:`, vnode.type);
        }
        // track vnode for block tree
        if (// avoid a block node from tracking itself
            !isBlockNode &&
            // has current parent block
            currentBlock &&
            // presence of a patch flag indicates this node needs patching on updates.
            // component nodes also should always be patched, because even if the
            // component doesn't need to update, it needs to persist the instance on to
            // the next vnode so that it can be properly unmounted later.
            (vnode.patchFlag > 0 || shapeFlag & 6 /* COMPONENT */) &&
            // the EVENTS flag is only for hydration and if it is the only flag, the
            // vnode should not be considered dynamic due to handler caching.
            vnode.patchFlag !== 32 /* HYDRATE_EVENTS */) {
            currentBlock.push(vnode);
        }
        return vnode;
    }
    const createVNode = ((process.env.NODE_ENV !== 'production') ? createVNodeWithArgsTransform : _createVNode);
    function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
        if (!type || type === NULL_DYNAMIC_COMPONENT) {
            if ((process.env.NODE_ENV !== 'production') && !type) {
                warn$1(`Invalid vnode type when creating vnode: ${type}.`);
            }
            type = Comment;
        }
        if (isVNode(type)) {
            // createVNode receiving an existing vnode. This happens in cases like
            // <component :is="vnode"/>
            // #2078 make sure to merge refs during the clone instead of overwriting it
            const cloned = cloneVNode(type, props, true /* mergeRef: true */);
            if (children) {
                normalizeChildren(cloned, children);
            }
            return cloned;
        }
        // class component normalization.
        if (isClassComponent(type)) {
            type = type.__vccOpts;
        }
        // class & style normalization.
        if (props) {
            // for reactive or proxy objects, we need to clone it to enable mutation.
            props = guardReactiveProps(props);
            let { class: klass, style } = props;
            if (klass && !isString$1(klass)) {
                props.class = normalizeClass(klass);
            }
            if (isObject$1(style)) {
                // reactive state objects need to be cloned since they are likely to be
                // mutated
                if (isProxy(style) && !isArray$1(style)) {
                    style = extend({}, style);
                }
                props.style = normalizeStyle(style);
            }
        }
        // encode the vnode type information into a bitmap
        const shapeFlag = isString$1(type)
            ? 1 /* ELEMENT */
            : isSuspense(type)
                ? 128 /* SUSPENSE */
                : isTeleport(type)
                    ? 64 /* TELEPORT */
                    : isObject$1(type)
                        ? 4 /* STATEFUL_COMPONENT */
                        : isFunction$1(type)
                            ? 2 /* FUNCTIONAL_COMPONENT */
                            : 0;
        if ((process.env.NODE_ENV !== 'production') && shapeFlag & 4 /* STATEFUL_COMPONENT */ && isProxy(type)) {
            type = toRaw(type);
            warn$1(`Vue received a Component which was made a reactive object. This can ` +
                `lead to unnecessary performance overhead, and should be avoided by ` +
                `marking the component with \`markRaw\` or using \`shallowRef\` ` +
                `instead of \`ref\`.`, `\nComponent that was made reactive: `, type);
        }
        return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
    }
    function guardReactiveProps(props) {
        if (!props)
            return null;
        return isProxy(props) || InternalObjectKey in props
            ? extend({}, props)
            : props;
    }
    function cloneVNode(vnode, extraProps, mergeRef = false) {
        // This is intentionally NOT using spread or extend to avoid the runtime
        // key enumeration cost.
        const { props, ref, patchFlag, children } = vnode;
        const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
        const cloned = {
            __v_isVNode: true,
            __v_skip: true,
            type: vnode.type,
            props: mergedProps,
            key: mergedProps && normalizeKey(mergedProps),
            ref: extraProps && extraProps.ref
                ? // #2078 in the case of <component :is="vnode" ref="extra"/>
                    // if the vnode itself already has a ref, cloneVNode will need to merge
                    // the refs so the single vnode can be set on multiple refs
                    mergeRef && ref
                        ? isArray$1(ref)
                            ? ref.concat(normalizeRef(extraProps))
                            : [ref, normalizeRef(extraProps)]
                        : normalizeRef(extraProps)
                : ref,
            scopeId: vnode.scopeId,
            slotScopeIds: vnode.slotScopeIds,
            children: (process.env.NODE_ENV !== 'production') && patchFlag === -1 /* HOISTED */ && isArray$1(children)
                ? children.map(deepCloneVNode)
                : children,
            target: vnode.target,
            targetAnchor: vnode.targetAnchor,
            staticCount: vnode.staticCount,
            shapeFlag: vnode.shapeFlag,
            // if the vnode is cloned with extra props, we can no longer assume its
            // existing patch flag to be reliable and need to add the FULL_PROPS flag.
            // note: perserve flag for fragments since they use the flag for children
            // fast paths only.
            patchFlag: extraProps && vnode.type !== Fragment$1
                ? patchFlag === -1 // hoisted node
                    ? 16 /* FULL_PROPS */
                    : patchFlag | 16 /* FULL_PROPS */
                : patchFlag,
            dynamicProps: vnode.dynamicProps,
            dynamicChildren: vnode.dynamicChildren,
            appContext: vnode.appContext,
            dirs: vnode.dirs,
            transition: vnode.transition,
            // These should technically only be non-null on mounted VNodes. However,
            // they *should* be copied for kept-alive vnodes. So we just always copy
            // them since them being non-null during a mount doesn't affect the logic as
            // they will simply be overwritten.
            component: vnode.component,
            suspense: vnode.suspense,
            ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
            ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
            el: vnode.el,
            anchor: vnode.anchor
        };
        return cloned;
    }
    /**
     * Dev only, for HMR of hoisted vnodes reused in v-for
     * https://github.com/vitejs/vite/issues/2022
     */
    function deepCloneVNode(vnode) {
        const cloned = cloneVNode(vnode);
        if (isArray$1(vnode.children)) {
            cloned.children = vnode.children.map(deepCloneVNode);
        }
        return cloned;
    }
    /**
     * @private
     */
    function createTextVNode(text = ' ', flag = 0) {
        return createVNode(Text, null, text, flag);
    }
    function normalizeChildren(vnode, children) {
        let type = 0;
        const { shapeFlag } = vnode;
        if (children == null) {
            children = null;
        }
        else if (isArray$1(children)) {
            type = 16 /* ARRAY_CHILDREN */;
        }
        else if (typeof children === 'object') {
            if (shapeFlag & (1 /* ELEMENT */ | 64 /* TELEPORT */)) {
                // Normalize slot to plain children for plain element and Teleport
                const slot = children.default;
                if (slot) {
                    // _c marker is added by withCtx() indicating this is a compiled slot
                    slot._c && (slot._d = false);
                    normalizeChildren(vnode, slot());
                    slot._c && (slot._d = true);
                }
                return;
            }
            else {
                type = 32 /* SLOTS_CHILDREN */;
                const slotFlag = children._;
                if (!slotFlag && !(InternalObjectKey in children)) {
                    children._ctx = currentRenderingInstance;
                }
                else if (slotFlag === 3 /* FORWARDED */ && currentRenderingInstance) {
                    // a child component receives forwarded slots from the parent.
                    // its slot type is determined by its parent's slot type.
                    if (currentRenderingInstance.slots._ === 1 /* STABLE */) {
                        children._ = 1 /* STABLE */;
                    }
                    else {
                        children._ = 2 /* DYNAMIC */;
                        vnode.patchFlag |= 1024 /* DYNAMIC_SLOTS */;
                    }
                }
            }
        }
        else if (isFunction$1(children)) {
            children = { default: children, _ctx: currentRenderingInstance };
            type = 32 /* SLOTS_CHILDREN */;
        }
        else {
            children = String(children);
            // force teleport children to array so it can be moved around
            if (shapeFlag & 64 /* TELEPORT */) {
                type = 16 /* ARRAY_CHILDREN */;
                children = [createTextVNode(children)];
            }
            else {
                type = 8 /* TEXT_CHILDREN */;
            }
        }
        vnode.children = children;
        vnode.shapeFlag |= type;
    }
    function mergeProps(...args) {
        const ret = {};
        for (let i = 0; i < args.length; i++) {
            const toMerge = args[i];
            for (const key in toMerge) {
                if (key === 'class') {
                    if (ret.class !== toMerge.class) {
                        ret.class = normalizeClass([ret.class, toMerge.class]);
                    }
                }
                else if (key === 'style') {
                    ret.style = normalizeStyle([ret.style, toMerge.style]);
                }
                else if (isOn(key)) {
                    const existing = ret[key];
                    const incoming = toMerge[key];
                    if (existing !== incoming) {
                        ret[key] = existing
                            ? [].concat(existing, incoming)
                            : incoming;
                    }
                }
                else if (key !== '') {
                    ret[key] = toMerge[key];
                }
            }
        }
        return ret;
    }

    /**
     * #2437 In Vue 3, functional components do not have a public instance proxy but
     * they exist in the internal parent chain. For code that relies on traversing
     * public $parent chains, skip functional ones and go to the parent instead.
     */
    const getPublicInstance = (i) => {
        if (!i)
            return null;
        if (isStatefulComponent(i))
            return getExposeProxy(i) || i.proxy;
        return getPublicInstance(i.parent);
    };
    const publicPropertiesMap = extend(Object.create(null), {
        $: i => i,
        $el: i => i.vnode.el,
        $data: i => i.data,
        $props: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.props) : i.props),
        $attrs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.attrs) : i.attrs),
        $slots: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.slots) : i.slots),
        $refs: i => ((process.env.NODE_ENV !== 'production') ? shallowReadonly(i.refs) : i.refs),
        $parent: i => getPublicInstance(i.parent),
        $root: i => getPublicInstance(i.root),
        $emit: i => i.emit,
        $options: i => (__VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type),
        $forceUpdate: i => () => queueJob(i.update),
        $nextTick: i => nextTick.bind(i.proxy),
        $watch: i => (__VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP)
    });
    const PublicInstanceProxyHandlers = {
        get({ _: instance }, key) {
            const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
            // for internal formatters to know that this is a Vue instance
            if ((process.env.NODE_ENV !== 'production') && key === '__isVue') {
                return true;
            }
            // prioritize <script setup> bindings during dev.
            // this allows even properties that start with _ or $ to be used - so that
            // it aligns with the production behavior where the render fn is inlined and
            // indeed has access to all declared variables.
            if ((process.env.NODE_ENV !== 'production') &&
                setupState !== EMPTY_OBJ &&
                setupState.__isScriptSetup &&
                hasOwn$1(setupState, key)) {
                return setupState[key];
            }
            // data / props / ctx
            // This getter gets called for every property access on the render context
            // during render and is a major hotspot. The most expensive part of this
            // is the multiple hasOwn() calls. It's much faster to do a simple property
            // access on a plain object, so we use an accessCache object (with null
            // prototype) to memoize what access type a key corresponds to.
            let normalizedProps;
            if (key[0] !== '$') {
                const n = accessCache[key];
                if (n !== undefined) {
                    switch (n) {
                        case 0 /* SETUP */:
                            return setupState[key];
                        case 1 /* DATA */:
                            return data[key];
                        case 3 /* CONTEXT */:
                            return ctx[key];
                        case 2 /* PROPS */:
                            return props[key];
                        // default: just fallthrough
                    }
                }
                else if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
                    accessCache[key] = 0 /* SETUP */;
                    return setupState[key];
                }
                else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
                    accessCache[key] = 1 /* DATA */;
                    return data[key];
                }
                else if (
                // only cache other properties when instance has declared (thus stable)
                // props
                (normalizedProps = instance.propsOptions[0]) &&
                    hasOwn$1(normalizedProps, key)) {
                    accessCache[key] = 2 /* PROPS */;
                    return props[key];
                }
                else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
                    accessCache[key] = 3 /* CONTEXT */;
                    return ctx[key];
                }
                else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
                    accessCache[key] = 4 /* OTHER */;
                }
            }
            const publicGetter = publicPropertiesMap[key];
            let cssModule, globalProperties;
            // public $xxx properties
            if (publicGetter) {
                if (key === '$attrs') {
                    track(instance, "get" /* GET */, key);
                    (process.env.NODE_ENV !== 'production') && markAttrsAccessed();
                }
                return publicGetter(instance);
            }
            else if (
            // css module (injected by vue-loader)
            (cssModule = type.__cssModules) &&
                (cssModule = cssModule[key])) {
                return cssModule;
            }
            else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
                // user may set custom properties to `this` that start with `$`
                accessCache[key] = 3 /* CONTEXT */;
                return ctx[key];
            }
            else if (
            // global properties
            ((globalProperties = appContext.config.globalProperties),
                hasOwn$1(globalProperties, key))) {
                {
                    return globalProperties[key];
                }
            }
            else if ((process.env.NODE_ENV !== 'production') &&
                currentRenderingInstance &&
                (!isString$1(key) ||
                    // #1091 avoid internal isRef/isVNode checks on component instance leading
                    // to infinite warning loop
                    key.indexOf('__v') !== 0)) {
                if (data !== EMPTY_OBJ &&
                    (key[0] === '$' || key[0] === '_') &&
                    hasOwn$1(data, key)) {
                    warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved ` +
                        `character ("$" or "_") and is not proxied on the render context.`);
                }
                else if (instance === currentRenderingInstance) {
                    warn$1(`Property ${JSON.stringify(key)} was accessed during render ` +
                        `but is not defined on instance.`);
                }
            }
        },
        set({ _: instance }, key, value) {
            const { data, setupState, ctx } = instance;
            if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
                setupState[key] = value;
            }
            else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
                data[key] = value;
            }
            else if (hasOwn$1(instance.props, key)) {
                (process.env.NODE_ENV !== 'production') &&
                    warn$1(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
                return false;
            }
            if (key[0] === '$' && key.slice(1) in instance) {
                (process.env.NODE_ENV !== 'production') &&
                    warn$1(`Attempting to mutate public property "${key}". ` +
                        `Properties starting with $ are reserved and readonly.`, instance);
                return false;
            }
            else {
                if ((process.env.NODE_ENV !== 'production') && key in instance.appContext.config.globalProperties) {
                    Object.defineProperty(ctx, key, {
                        enumerable: true,
                        configurable: true,
                        value
                    });
                }
                else {
                    ctx[key] = value;
                }
            }
            return true;
        },
        has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
            let normalizedProps;
            return (accessCache[key] !== undefined ||
                (data !== EMPTY_OBJ && hasOwn$1(data, key)) ||
                (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) ||
                ((normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key)) ||
                hasOwn$1(ctx, key) ||
                hasOwn$1(publicPropertiesMap, key) ||
                hasOwn$1(appContext.config.globalProperties, key));
        }
    };
    if ((process.env.NODE_ENV !== 'production') && !false) {
        PublicInstanceProxyHandlers.ownKeys = (target) => {
            warn$1(`Avoid app logic that relies on enumerating keys on a component instance. ` +
                `The keys will be empty in production mode to avoid performance overhead.`);
            return Reflect.ownKeys(target);
        };
    }
    let currentInstance = null;
    const getCurrentInstance = () => currentInstance || currentRenderingInstance;
    const setCurrentInstance = (instance) => {
        currentInstance = instance;
        instance.scope.on();
    };
    const unsetCurrentInstance = () => {
        currentInstance && currentInstance.scope.off();
        currentInstance = null;
    };
    function isStatefulComponent(instance) {
        return instance.vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
    }
    function getExposeProxy(instance) {
        if (instance.exposed) {
            return (instance.exposeProxy ||
                (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
                    get(target, key) {
                        if (key in target) {
                            return target[key];
                        }
                        else if (key in publicPropertiesMap) {
                            return publicPropertiesMap[key](instance);
                        }
                    }
                })));
        }
    }
    const classifyRE = /(?:^|[-_])(\w)/g;
    const classify = (str) => str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
    function getComponentName(Component) {
        return isFunction$1(Component)
            ? Component.displayName || Component.name
            : Component.name;
    }
    /* istanbul ignore next */
    function formatComponentName(instance, Component, isRoot = false) {
        let name = getComponentName(Component);
        if (!name && Component.__file) {
            const match = Component.__file.match(/([^/\\]+)\.\w+$/);
            if (match) {
                name = match[1];
            }
        }
        if (!name && instance && instance.parent) {
            // try to infer the name based on reverse resolution
            const inferFromRegistry = (registry) => {
                for (const key in registry) {
                    if (registry[key] === Component) {
                        return key;
                    }
                }
            };
            name =
                inferFromRegistry(instance.components ||
                    instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
        }
        return name ? classify(name) : isRoot ? `App` : `Anonymous`;
    }
    function isClassComponent(value) {
        return isFunction$1(value) && '__vccOpts' in value;
    }

    const stack = [];
    function pushWarningContext(vnode) {
        stack.push(vnode);
    }
    function popWarningContext() {
        stack.pop();
    }
    function warn$1(msg, ...args) {
        // avoid props formatting or warn handler tracking deps that might be mutated
        // during patch, leading to infinite recursion.
        pauseTracking();
        const instance = stack.length ? stack[stack.length - 1].component : null;
        const appWarnHandler = instance && instance.appContext.config.warnHandler;
        const trace = getComponentTrace();
        if (appWarnHandler) {
            callWithErrorHandling(appWarnHandler, instance, 11 /* APP_WARN_HANDLER */, [
                msg + args.join(''),
                instance && instance.proxy,
                trace
                    .map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`)
                    .join('\n'),
                trace
            ]);
        }
        else {
            const warnArgs = [`[Vue warn]: ${msg}`, ...args];
            /* istanbul ignore if */
            if (trace.length &&
                // avoid spamming console during tests
                !false) {
                warnArgs.push(`\n`, ...formatTrace(trace));
            }
            console.warn(...warnArgs);
        }
        resetTracking();
    }
    function getComponentTrace() {
        let currentVNode = stack[stack.length - 1];
        if (!currentVNode) {
            return [];
        }
        // we can't just use the stack because it will be incomplete during updates
        // that did not start from the root. Re-construct the parent chain using
        // instance parent pointers.
        const normalizedStack = [];
        while (currentVNode) {
            const last = normalizedStack[0];
            if (last && last.vnode === currentVNode) {
                last.recurseCount++;
            }
            else {
                normalizedStack.push({
                    vnode: currentVNode,
                    recurseCount: 0
                });
            }
            const parentInstance = currentVNode.component && currentVNode.component.parent;
            currentVNode = parentInstance && parentInstance.vnode;
        }
        return normalizedStack;
    }
    /* istanbul ignore next */
    function formatTrace(trace) {
        const logs = [];
        trace.forEach((entry, i) => {
            logs.push(...(i === 0 ? [] : [`\n`]), ...formatTraceEntry(entry));
        });
        return logs;
    }
    function formatTraceEntry({ vnode, recurseCount }) {
        const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
        const isRoot = vnode.component ? vnode.component.parent == null : false;
        const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
        const close = `>` + postfix;
        return vnode.props
            ? [open, ...formatProps(vnode.props), close]
            : [open + close];
    }
    /* istanbul ignore next */
    function formatProps(props) {
        const res = [];
        const keys = Object.keys(props);
        keys.slice(0, 3).forEach(key => {
            res.push(...formatProp(key, props[key]));
        });
        if (keys.length > 3) {
            res.push(` ...`);
        }
        return res;
    }
    /* istanbul ignore next */
    function formatProp(key, value, raw) {
        if (isString$1(value)) {
            value = JSON.stringify(value);
            return raw ? value : [`${key}=${value}`];
        }
        else if (typeof value === 'number' ||
            typeof value === 'boolean' ||
            value == null) {
            return raw ? value : [`${key}=${value}`];
        }
        else if (isRef(value)) {
            value = formatProp(key, toRaw(value.value), true);
            return raw ? value : [`${key}=Ref<`, value, `>`];
        }
        else if (isFunction$1(value)) {
            return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
        }
        else {
            value = toRaw(value);
            return raw ? value : [`${key}=`, value];
        }
    }

    const ErrorTypeStrings = {
        ["sp" /* SERVER_PREFETCH */]: 'serverPrefetch hook',
        ["bc" /* BEFORE_CREATE */]: 'beforeCreate hook',
        ["c" /* CREATED */]: 'created hook',
        ["bm" /* BEFORE_MOUNT */]: 'beforeMount hook',
        ["m" /* MOUNTED */]: 'mounted hook',
        ["bu" /* BEFORE_UPDATE */]: 'beforeUpdate hook',
        ["u" /* UPDATED */]: 'updated',
        ["bum" /* BEFORE_UNMOUNT */]: 'beforeUnmount hook',
        ["um" /* UNMOUNTED */]: 'unmounted hook',
        ["a" /* ACTIVATED */]: 'activated hook',
        ["da" /* DEACTIVATED */]: 'deactivated hook',
        ["ec" /* ERROR_CAPTURED */]: 'errorCaptured hook',
        ["rtc" /* RENDER_TRACKED */]: 'renderTracked hook',
        ["rtg" /* RENDER_TRIGGERED */]: 'renderTriggered hook',
        [0 /* SETUP_FUNCTION */]: 'setup function',
        [1 /* RENDER_FUNCTION */]: 'render function',
        [2 /* WATCH_GETTER */]: 'watcher getter',
        [3 /* WATCH_CALLBACK */]: 'watcher callback',
        [4 /* WATCH_CLEANUP */]: 'watcher cleanup function',
        [5 /* NATIVE_EVENT_HANDLER */]: 'native event handler',
        [6 /* COMPONENT_EVENT_HANDLER */]: 'component event handler',
        [7 /* VNODE_HOOK */]: 'vnode hook',
        [8 /* DIRECTIVE_HOOK */]: 'directive hook',
        [9 /* TRANSITION_HOOK */]: 'transition hook',
        [10 /* APP_ERROR_HANDLER */]: 'app errorHandler',
        [11 /* APP_WARN_HANDLER */]: 'app warnHandler',
        [12 /* FUNCTION_REF */]: 'ref function',
        [13 /* ASYNC_COMPONENT_LOADER */]: 'async component loader',
        [14 /* SCHEDULER */]: 'scheduler flush. This is likely a Vue internals bug. ' +
            'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-next'
    };
    function callWithErrorHandling(fn, instance, type, args) {
        let res;
        try {
            res = args ? fn(...args) : fn();
        }
        catch (err) {
            handleError(err, instance, type);
        }
        return res;
    }
    function callWithAsyncErrorHandling(fn, instance, type, args) {
        if (isFunction$1(fn)) {
            const res = callWithErrorHandling(fn, instance, type, args);
            if (res && isPromise(res)) {
                res.catch(err => {
                    handleError(err, instance, type);
                });
            }
            return res;
        }
        const values = [];
        for (let i = 0; i < fn.length; i++) {
            values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
        }
        return values;
    }
    function handleError(err, instance, type, throwInDev = true) {
        const contextVNode = instance ? instance.vnode : null;
        if (instance) {
            let cur = instance.parent;
            // the exposed instance is the render proxy to keep it consistent with 2.x
            const exposedInstance = instance.proxy;
            // in production the hook receives only the error code
            const errorInfo = (process.env.NODE_ENV !== 'production') ? ErrorTypeStrings[type] : type;
            while (cur) {
                const errorCapturedHooks = cur.ec;
                if (errorCapturedHooks) {
                    for (let i = 0; i < errorCapturedHooks.length; i++) {
                        if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
                            return;
                        }
                    }
                }
                cur = cur.parent;
            }
            // app-level handling
            const appErrorHandler = instance.appContext.config.errorHandler;
            if (appErrorHandler) {
                callWithErrorHandling(appErrorHandler, null, 10 /* APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
                return;
            }
        }
        logError(err, type, contextVNode, throwInDev);
    }
    function logError(err, type, contextVNode, throwInDev = true) {
        if ((process.env.NODE_ENV !== 'production')) {
            const info = ErrorTypeStrings[type];
            if (contextVNode) {
                pushWarningContext(contextVNode);
            }
            warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
            if (contextVNode) {
                popWarningContext();
            }
            // crash in dev by default so it's more noticeable
            if (throwInDev) {
                throw err;
            }
            else {
                console.error(err);
            }
        }
        else {
            // recover in prod to reduce the impact on end-user
            console.error(err);
        }
    }

    let isFlushing = false;
    let isFlushPending = false;
    const queue = [];
    let flushIndex = 0;
    const pendingPreFlushCbs = [];
    let activePreFlushCbs = null;
    let preFlushIndex = 0;
    const pendingPostFlushCbs = [];
    let activePostFlushCbs = null;
    let postFlushIndex = 0;
    const resolvedPromise = Promise.resolve();
    let currentFlushPromise = null;
    let currentPreFlushParentJob = null;
    const RECURSION_LIMIT = 100;
    function nextTick(fn) {
        const p = currentFlushPromise || resolvedPromise;
        return fn ? p.then(this ? fn.bind(this) : fn) : p;
    }
    // #2768
    // Use binary-search to find a suitable position in the queue,
    // so that the queue maintains the increasing order of job's id,
    // which can prevent the job from being skipped and also can avoid repeated patching.
    function findInsertionIndex(id) {
        // the start index should be `flushIndex + 1`
        let start = flushIndex + 1;
        let end = queue.length;
        while (start < end) {
            const middle = (start + end) >>> 1;
            const middleJobId = getId(queue[middle]);
            middleJobId < id ? (start = middle + 1) : (end = middle);
        }
        return start;
    }
    function queueJob(job) {
        // the dedupe search uses the startIndex argument of Array.includes()
        // by default the search index includes the current job that is being run
        // so it cannot recursively trigger itself again.
        // if the job is a watch() callback, the search will start with a +1 index to
        // allow it recursively trigger itself - it is the user's responsibility to
        // ensure it doesn't end up in an infinite loop.
        if ((!queue.length ||
            !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) &&
            job !== currentPreFlushParentJob) {
            if (job.id == null) {
                queue.push(job);
            }
            else {
                queue.splice(findInsertionIndex(job.id), 0, job);
            }
            queueFlush();
        }
    }
    function queueFlush() {
        if (!isFlushing && !isFlushPending) {
            isFlushPending = true;
            currentFlushPromise = resolvedPromise.then(flushJobs);
        }
    }
    function queueCb(cb, activeQueue, pendingQueue, index) {
        if (!isArray$1(cb)) {
            if (!activeQueue ||
                !activeQueue.includes(cb, cb.allowRecurse ? index + 1 : index)) {
                pendingQueue.push(cb);
            }
        }
        else {
            // if cb is an array, it is a component lifecycle hook which can only be
            // triggered by a job, which is already deduped in the main queue, so
            // we can skip duplicate check here to improve perf
            pendingQueue.push(...cb);
        }
        queueFlush();
    }
    function queuePreFlushCb(cb) {
        queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
    }
    function queuePostFlushCb(cb) {
        queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
    }
    function flushPreFlushCbs(seen, parentJob = null) {
        if (pendingPreFlushCbs.length) {
            currentPreFlushParentJob = parentJob;
            activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
            pendingPreFlushCbs.length = 0;
            if ((process.env.NODE_ENV !== 'production')) {
                seen = seen || new Map();
            }
            for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
                if ((process.env.NODE_ENV !== 'production') &&
                    checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
                    continue;
                }
                activePreFlushCbs[preFlushIndex]();
            }
            activePreFlushCbs = null;
            preFlushIndex = 0;
            currentPreFlushParentJob = null;
            // recursively flush until it drains
            flushPreFlushCbs(seen, parentJob);
        }
    }
    function flushPostFlushCbs(seen) {
        if (pendingPostFlushCbs.length) {
            const deduped = [...new Set(pendingPostFlushCbs)];
            pendingPostFlushCbs.length = 0;
            // #1947 already has active queue, nested flushPostFlushCbs call
            if (activePostFlushCbs) {
                activePostFlushCbs.push(...deduped);
                return;
            }
            activePostFlushCbs = deduped;
            if ((process.env.NODE_ENV !== 'production')) {
                seen = seen || new Map();
            }
            activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
            for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
                if ((process.env.NODE_ENV !== 'production') &&
                    checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
                    continue;
                }
                activePostFlushCbs[postFlushIndex]();
            }
            activePostFlushCbs = null;
            postFlushIndex = 0;
        }
    }
    const getId = (job) => job.id == null ? Infinity : job.id;
    function flushJobs(seen) {
        isFlushPending = false;
        isFlushing = true;
        if ((process.env.NODE_ENV !== 'production')) {
            seen = seen || new Map();
        }
        flushPreFlushCbs(seen);
        // Sort queue before flush.
        // This ensures that:
        // 1. Components are updated from parent to child. (because parent is always
        //    created before the child so its render effect will have smaller
        //    priority number)
        // 2. If a component is unmounted during a parent component's update,
        //    its update can be skipped.
        queue.sort((a, b) => getId(a) - getId(b));
        // conditional usage of checkRecursiveUpdate must be determined out of
        // try ... catch block since Rollup by default de-optimizes treeshaking
        // inside try-catch. This can leave all warning code unshaked. Although
        // they would get eventually shaken by a minifier like terser, some minifiers
        // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
        const check = (process.env.NODE_ENV !== 'production')
            ? (job) => checkRecursiveUpdates(seen, job)
            : NOOP;
        try {
            for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
                const job = queue[flushIndex];
                if (job && job.active !== false) {
                    if ((process.env.NODE_ENV !== 'production') && check(job)) {
                        continue;
                    }
                    // console.log(`running:`, job.id)
                    callWithErrorHandling(job, null, 14 /* SCHEDULER */);
                }
            }
        }
        finally {
            flushIndex = 0;
            queue.length = 0;
            flushPostFlushCbs(seen);
            isFlushing = false;
            currentFlushPromise = null;
            // some postFlushCb queued jobs!
            // keep flushing until it drains.
            if (queue.length ||
                pendingPreFlushCbs.length ||
                pendingPostFlushCbs.length) {
                flushJobs(seen);
            }
        }
    }
    function checkRecursiveUpdates(seen, fn) {
        if (!seen.has(fn)) {
            seen.set(fn, 1);
        }
        else {
            const count = seen.get(fn);
            if (count > RECURSION_LIMIT) {
                const instance = fn.ownerInstance;
                const componentName = instance && getComponentName(instance.type);
                warn$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. ` +
                    `This means you have a reactive effect that is mutating its own ` +
                    `dependencies and thus recursively triggering itself. Possible sources ` +
                    `include component template, render function, updated hook or ` +
                    `watcher source function.`);
                return true;
            }
            else {
                seen.set(fn, count + 1);
            }
        }
    }

    // Simple effect.
    function watchEffect(effect, options) {
        return doWatch(effect, null, options);
    }
    // initial value for watchers to trigger on undefined initial values
    const INITIAL_WATCHER_VALUE = {};
    // implementation
    function watch(source, cb, options) {
        if ((process.env.NODE_ENV !== 'production') && !isFunction$1(cb)) {
            warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. ` +
                `Use \`watchEffect(fn, options?)\` instead. \`watch\` now only ` +
                `supports \`watch(source, cb, options?) signature.`);
        }
        return doWatch(source, cb, options);
    }
    function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
        if ((process.env.NODE_ENV !== 'production') && !cb) {
            if (immediate !== undefined) {
                warn$1(`watch() "immediate" option is only respected when using the ` +
                    `watch(source, callback, options?) signature.`);
            }
            if (deep !== undefined) {
                warn$1(`watch() "deep" option is only respected when using the ` +
                    `watch(source, callback, options?) signature.`);
            }
        }
        const warnInvalidSource = (s) => {
            warn$1(`Invalid watch source: `, s, `A watch source can only be a getter/effect function, a ref, ` +
                `a reactive object, or an array of these types.`);
        };
        const instance = currentInstance;
        let getter;
        let forceTrigger = false;
        let isMultiSource = false;
        if (isRef(source)) {
            getter = () => source.value;
            forceTrigger = !!source._shallow;
        }
        else if (isReactive(source)) {
            getter = () => source;
            deep = true;
        }
        else if (isArray$1(source)) {
            isMultiSource = true;
            forceTrigger = source.some(isReactive);
            getter = () => source.map(s => {
                if (isRef(s)) {
                    return s.value;
                }
                else if (isReactive(s)) {
                    return traverse(s);
                }
                else if (isFunction$1(s)) {
                    return callWithErrorHandling(s, instance, 2 /* WATCH_GETTER */);
                }
                else {
                    (process.env.NODE_ENV !== 'production') && warnInvalidSource(s);
                }
            });
        }
        else if (isFunction$1(source)) {
            if (cb) {
                // getter with cb
                getter = () => callWithErrorHandling(source, instance, 2 /* WATCH_GETTER */);
            }
            else {
                // no cb -> simple effect
                getter = () => {
                    if (instance && instance.isUnmounted) {
                        return;
                    }
                    if (cleanup) {
                        cleanup();
                    }
                    return callWithAsyncErrorHandling(source, instance, 3 /* WATCH_CALLBACK */, [onInvalidate]);
                };
            }
        }
        else {
            getter = NOOP;
            (process.env.NODE_ENV !== 'production') && warnInvalidSource(source);
        }
        if (cb && deep) {
            const baseGetter = getter;
            getter = () => traverse(baseGetter());
        }
        let cleanup;
        let onInvalidate = (fn) => {
            cleanup = effect.onStop = () => {
                callWithErrorHandling(fn, instance, 4 /* WATCH_CLEANUP */);
            };
        };
        let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
        const job = () => {
            if (!effect.active) {
                return;
            }
            if (cb) {
                // watch(source, cb)
                const newValue = effect.run();
                if (deep ||
                    forceTrigger ||
                    (isMultiSource
                        ? newValue.some((v, i) => hasChanged(v, oldValue[i]))
                        : hasChanged(newValue, oldValue)) ||
                    (false  )) {
                    // cleanup before running cb again
                    if (cleanup) {
                        cleanup();
                    }
                    callWithAsyncErrorHandling(cb, instance, 3 /* WATCH_CALLBACK */, [
                        newValue,
                        // pass undefined as the old value when it's changed for the first time
                        oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue,
                        onInvalidate
                    ]);
                    oldValue = newValue;
                }
            }
            else {
                // watchEffect
                effect.run();
            }
        };
        // important: mark the job as a watcher callback so that scheduler knows
        // it is allowed to self-trigger (#1727)
        job.allowRecurse = !!cb;
        let scheduler;
        if (flush === 'sync') {
            scheduler = job; // the scheduler function gets called directly
        }
        else if (flush === 'post') {
            scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
        }
        else {
            // default: 'pre'
            scheduler = () => {
                if (!instance || instance.isMounted) {
                    queuePreFlushCb(job);
                }
                else {
                    // with 'pre' option, the first call must happen before
                    // the component is mounted so it is called synchronously.
                    job();
                }
            };
        }
        const effect = new ReactiveEffect(getter, scheduler);
        if ((process.env.NODE_ENV !== 'production')) {
            effect.onTrack = onTrack;
            effect.onTrigger = onTrigger;
        }
        // initial run
        if (cb) {
            if (immediate) {
                job();
            }
            else {
                oldValue = effect.run();
            }
        }
        else if (flush === 'post') {
            queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
        }
        else {
            effect.run();
        }
        return () => {
            effect.stop();
            if (instance && instance.scope) {
                remove(instance.scope.effects, effect);
            }
        };
    }
    // this.$watch
    function instanceWatch(source, value, options) {
        const publicThis = this.proxy;
        const getter = isString$1(source)
            ? source.includes('.')
                ? createPathGetter(publicThis, source)
                : () => publicThis[source]
            : source.bind(publicThis, publicThis);
        let cb;
        if (isFunction$1(value)) {
            cb = value;
        }
        else {
            cb = value.handler;
            options = value;
        }
        const cur = currentInstance;
        setCurrentInstance(this);
        const res = doWatch(getter, cb.bind(publicThis), options);
        if (cur) {
            setCurrentInstance(cur);
        }
        else {
            unsetCurrentInstance();
        }
        return res;
    }
    function createPathGetter(ctx, path) {
        const segments = path.split('.');
        return () => {
            let cur = ctx;
            for (let i = 0; i < segments.length && cur; i++) {
                cur = cur[segments[i]];
            }
            return cur;
        };
    }
    function traverse(value, seen) {
        if (!isObject$1(value) || value["__v_skip" /* SKIP */]) {
            return value;
        }
        seen = seen || new Set();
        if (seen.has(value)) {
            return value;
        }
        seen.add(value);
        if (isRef(value)) {
            traverse(value.value, seen);
        }
        else if (isArray$1(value)) {
            for (let i = 0; i < value.length; i++) {
                traverse(value[i], seen);
            }
        }
        else if (isSet(value) || isMap(value)) {
            value.forEach((v) => {
                traverse(v, seen);
            });
        }
        else if (isPlainObject$1(value)) {
            for (const key in value) {
                traverse(value[key], seen);
            }
        }
        return value;
    }

    // Actual implementation
    function h$1(type, propsOrChildren, children) {
        const l = arguments.length;
        if (l === 2) {
            if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
                // single vnode without props
                if (isVNode(propsOrChildren)) {
                    return createVNode(type, null, [propsOrChildren]);
                }
                // props without children
                return createVNode(type, propsOrChildren);
            }
            else {
                // omit props
                return createVNode(type, null, propsOrChildren);
            }
        }
        else {
            if (l > 3) {
                children = Array.prototype.slice.call(arguments, 2);
            }
            else if (l === 3 && isVNode(children)) {
                children = [children];
            }
            return createVNode(type, propsOrChildren, children);
        }
    }

    Symbol((process.env.NODE_ENV !== 'production') ? `ssrContext` : ``);

    function initCustomFormatter() {
        /* eslint-disable no-restricted-globals */
        if (!(process.env.NODE_ENV !== 'production') || typeof window === 'undefined') {
            return;
        }
        const vueStyle = { style: 'color:#3ba776' };
        const numberStyle = { style: 'color:#0b1bc9' };
        const stringStyle = { style: 'color:#b62e24' };
        const keywordStyle = { style: 'color:#9d288c' };
        // custom formatter for Chrome
        // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
        const formatter = {
            header(obj) {
                // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
                if (!isObject$1(obj)) {
                    return null;
                }
                if (obj.__isVue) {
                    return ['div', vueStyle, `VueInstance`];
                }
                else if (isRef(obj)) {
                    return [
                        'div',
                        {},
                        ['span', vueStyle, genRefFlag(obj)],
                        '<',
                        formatValue(obj.value),
                        `>`
                    ];
                }
                else if (isReactive(obj)) {
                    return [
                        'div',
                        {},
                        ['span', vueStyle, 'Reactive'],
                        '<',
                        formatValue(obj),
                        `>${isReadonly(obj) ? ` (readonly)` : ``}`
                    ];
                }
                else if (isReadonly(obj)) {
                    return [
                        'div',
                        {},
                        ['span', vueStyle, 'Readonly'],
                        '<',
                        formatValue(obj),
                        '>'
                    ];
                }
                return null;
            },
            hasBody(obj) {
                return obj && obj.__isVue;
            },
            body(obj) {
                if (obj && obj.__isVue) {
                    return [
                        'div',
                        {},
                        ...formatInstance(obj.$)
                    ];
                }
            }
        };
        function formatInstance(instance) {
            const blocks = [];
            if (instance.type.props && instance.props) {
                blocks.push(createInstanceBlock('props', toRaw(instance.props)));
            }
            if (instance.setupState !== EMPTY_OBJ) {
                blocks.push(createInstanceBlock('setup', instance.setupState));
            }
            if (instance.data !== EMPTY_OBJ) {
                blocks.push(createInstanceBlock('data', toRaw(instance.data)));
            }
            const computed = extractKeys(instance, 'computed');
            if (computed) {
                blocks.push(createInstanceBlock('computed', computed));
            }
            const injected = extractKeys(instance, 'inject');
            if (injected) {
                blocks.push(createInstanceBlock('injected', injected));
            }
            blocks.push([
                'div',
                {},
                [
                    'span',
                    {
                        style: keywordStyle.style + ';opacity:0.66'
                    },
                    '$ (internal): '
                ],
                ['object', { object: instance }]
            ]);
            return blocks;
        }
        function createInstanceBlock(type, target) {
            target = extend({}, target);
            if (!Object.keys(target).length) {
                return ['span', {}];
            }
            return [
                'div',
                { style: 'line-height:1.25em;margin-bottom:0.6em' },
                [
                    'div',
                    {
                        style: 'color:#476582'
                    },
                    type
                ],
                [
                    'div',
                    {
                        style: 'padding-left:1.25em'
                    },
                    ...Object.keys(target).map(key => {
                        return [
                            'div',
                            {},
                            ['span', keywordStyle, key + ': '],
                            formatValue(target[key], false)
                        ];
                    })
                ]
            ];
        }
        function formatValue(v, asRaw = true) {
            if (typeof v === 'number') {
                return ['span', numberStyle, v];
            }
            else if (typeof v === 'string') {
                return ['span', stringStyle, JSON.stringify(v)];
            }
            else if (typeof v === 'boolean') {
                return ['span', keywordStyle, v];
            }
            else if (isObject$1(v)) {
                return ['object', { object: asRaw ? toRaw(v) : v }];
            }
            else {
                return ['span', stringStyle, String(v)];
            }
        }
        function extractKeys(instance, type) {
            const Comp = instance.type;
            if (isFunction$1(Comp)) {
                return;
            }
            const extracted = {};
            for (const key in instance.ctx) {
                if (isKeyOfType(Comp, key, type)) {
                    extracted[key] = instance.ctx[key];
                }
            }
            return extracted;
        }
        function isKeyOfType(Comp, key, type) {
            const opts = Comp[type];
            if ((isArray$1(opts) && opts.includes(key)) ||
                (isObject$1(opts) && key in opts)) {
                return true;
            }
            if (Comp.extends && isKeyOfType(Comp.extends, key, type)) {
                return true;
            }
            if (Comp.mixins && Comp.mixins.some(m => isKeyOfType(m, key, type))) {
                return true;
            }
        }
        function genRefFlag(v) {
            if (v._shallow) {
                return `ShallowRef`;
            }
            if (v.effect) {
                return `ComputedRef`;
            }
            return `Ref`;
        }
        if (window.devtoolsFormatters) {
            window.devtoolsFormatters.push(formatter);
        }
        else {
            window.devtoolsFormatters = [formatter];
        }
    }

    function initDev() {
        {
            initCustomFormatter();
        }
    }

    // This entry exports the runtime only, and is built as
    if ((process.env.NODE_ENV !== 'production')) {
        initDev();
    }

    var FormSymbol = Symbol('form');
    var FieldSymbol = Symbol('field');
    var SchemaSymbol = Symbol('schema');
    var SchemaExpressionScopeSymbol = Symbol('schemaExpression');
    var SchemaOptionsSymbol = Symbol('schemaOptions');

    var useAttach = function (target) {
        var oldTargetRef = shallowRef(null);
        oldTargetRef.value = target;
        onMounted(function () {
            target.onMount();
        });
        onBeforeUnmount(function () {
            var _a;
            (_a = oldTargetRef.value) === null || _a === void 0 ? void 0 : _a.onUnmount();
        });
        var checker = function (target) {
            if (target !== oldTargetRef.value) {
                if (oldTargetRef.value) {
                    oldTargetRef.value.onUnmount();
                }
                oldTargetRef.value = target;
                target.onMount();
            }
            return oldTargetRef.value;
        };
        return [oldTargetRef, checker];
    };

    var Fragment = '#fragment';
    var FragmentComponent;
    {
        /* istanbul ignore next */
        FragmentComponent = defineComponent({
            name: 'Fragment',
            setup: function (props, _a) {
                var slots = _a.slots, attrs = _a.attrs;
                return function () { var _a; return (_a = slots === null || slots === void 0 ? void 0 : slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, attrs); };
            },
        });
    }

    var __assign$b = (undefined && undefined.__assign) || function () {
        __assign$b = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$b.apply(this, arguments);
    };
    var compatibleCreateElement = function (tag, data, components) {
        /* istanbul ignore else */
        {
            if (tag === Fragment) {
                tag = FragmentComponent;
            }
            var hInVue3 = h$1;
            var newData_1 = {};
            Object.keys(data).forEach(function (key) {
                if (key === 'on') {
                    if (data[key]) {
                        var events = Object.keys(data[key]);
                        events.forEach(function (event) {
                            var eventName = "on" + event[0].toUpperCase() + event.slice(1);
                            newData_1[eventName] = data[key][event];
                        });
                    }
                }
                else if (typeof data[key] === 'object' && data[key] !== null) {
                    Object.assign(newData_1, data[key]);
                }
                else {
                    newData_1[key] = data[key];
                }
            });
            return hInVue3(tag, newData_1, components);
        }
    };

    var __read$7 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    defineComponent({
        name: 'FormProvider',
        inheritAttrs: false,
        props: {
            form: {
                type: Object,
                required: true,
            },
        },
        setup: function (props, _a) {
            var attrs = _a.attrs, slots = _a.slots;
            var getForm = function () { return props.form; };
            var _b = __read$7(useAttach(getForm()), 2), formRef = _b[0], checker = _b[1];
            watch(function () { return props.form; }, function () { return (formRef.value = checker(getForm())); });
            provide(FormSymbol, formRef);
            return function () { return compatibleCreateElement(Fragment, { attrs: attrs }, slots); };
        },
    });

    // https://github.com/mobxjs/mobx-vue/blob/master/src/observer.ts
    var __assign$a = (undefined && undefined.__assign) || function () {
        __assign$a = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$a.apply(this, arguments);
    };

    var useObserver = function () {
        {
            var vm_1 = getCurrentInstance();
            var dispose_1;
            onBeforeUnmount(function () {
                if (dispose_1) {
                    dispose_1();
                }
            });
            Object.defineProperty(vm_1, 'update', {
                get: function () {
                    return vm_1['_updateEffect'];
                },
                set: function (newValue) {
                    if (dispose_1) {
                        dispose_1();
                    }
                    dispose_1 = autorun(newValue);
                    vm_1['_updateEffect'] = newValue;
                },
            });
        }
    };

    var __assign$9 = (undefined && undefined.__assign) || function () {
        __assign$9 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$9.apply(this, arguments);
    };
    var observer$1 = function (opts, options) {
        var name = (options === null || options === void 0 ? void 0 : options.name) || opts.name || 'ObservableComponent';
        return __assign$9(__assign$9({ name: name }, opts), { setup: function (props, context) {
                var _a;
                useObserver();
                return (_a = opts === null || opts === void 0 ? void 0 : opts.setup) === null || _a === void 0 ? void 0 : _a.call(opts, props, context);
            } });
    };

    function observer(baseComponent, options) {
        {
            return observer$1(baseComponent, options);
        }
    }

    var useForm = function () {
        var form = inject(FormSymbol, ref());
        if (!form.value) {
            throw new Error('Can not found form instance from context.');
        }
        return form;
    };

    var useField = function () {
        return inject(FieldSymbol, ref());
    };

    var __assign$8 = (undefined && undefined.__assign) || function () {
        __assign$8 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$8.apply(this, arguments);
    };
    observer(defineComponent({
        name: 'FormConsumer',
        inheritAttrs: false,
        setup: function (props, _a) {
            var slots = _a.slots;
            var formRef = useForm();
            return function () {
                var children = __assign$8({}, slots);
                if (slots.default) {
                    children.default = function () {
                        return slots.default({
                            form: formRef.value,
                        });
                    };
                }
                return compatibleCreateElement(Fragment, {}, children);
            };
        },
    }));

    var __assign$7 = (undefined && undefined.__assign) || function () {
        __assign$7 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$7.apply(this, arguments);
    };
    function mapProps() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function (target) {
            return observer(defineComponent({
                // listeners is needed for vue2
                setup: function (props, _a) {
                    var attrs = _a.attrs, slots = _a.slots, listeners = _a.listeners;
                    var fieldRef = useField();
                    var transform = function (input, field) {
                        return args.reduce(function (props, mapper) {
                            if (isFn$2(mapper)) {
                                props = Object.assign(props, mapper(props, field));
                            }
                            else {
                                each(mapper, function (to, extract) {
                                    var extractValue = Path.getIn(field, extract);
                                    var targetValue = isStr$1(to) ? to : extract;
                                    if (extract === 'value') {
                                        if (to !== extract) {
                                            delete props['value'];
                                        }
                                    }
                                    Path.setIn(props, targetValue, extractValue);
                                });
                            }
                            return props;
                        }, input);
                    };
                    return function () {
                        var newAttrs = fieldRef.value
                            ? transform(__assign$7({}, attrs), fieldRef.value)
                            : __assign$7({}, attrs);
                        return compatibleCreateElement(target, {
                            attrs: __assign$7({}, newAttrs),
                            on: listeners,
                        }, slots);
                    };
                },
            }));
        };
    }
    function mapReadPretty(component, readPrettyProps) {
        return function (target) {
            return observer(defineComponent({
                setup: function (props, _a) {
                    var attrs = _a.attrs, slots = _a.slots, listeners = _a.listeners;
                    var fieldRef = useField();
                    return function () {
                        var field = fieldRef.value;
                        return compatibleCreateElement(field && !isVoidField(field) && field.pattern === 'readPretty'
                            ? component
                            : target, {
                            attrs: __assign$7(__assign$7({}, readPrettyProps), attrs),
                            on: listeners,
                        }, slots);
                    };
                },
            }));
        };
    }
    function connect(target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var Component = args.reduce(function (target, mapper) {
            return mapper(target);
        }, target);
        /* istanbul ignore else */
        var functionalComponent; {
            var functionalComponent = defineComponent({
                setup: function (props, _a) {
                    var attrs = _a.attrs, slots = _a.slots;
                    return function () {
                        return compatibleCreateElement(Component, { props: props, attrs: attrs }, slots);
                    };
                },
            });
            return markRaw(functionalComponent);
        }
    }

    var __read$6 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$6(arguments[i]));
        return ar;
    };

    var __assign$6 = (undefined && undefined.__assign) || function () {
        __assign$6 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$6.apply(this, arguments);
    };
    var __read$5 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread$1 = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read$5(arguments[i]));
        return ar;
    };
    function isVueOptions(options) {
        if (!options) {
            return false;
        }
        return (typeof options.template === 'string' ||
            typeof options.render === 'function' ||
            typeof options.setup === 'function');
    }
    var ReactiveField = observer(defineComponent({
        name: 'ReactiveField',
        props: ['field'],
        setup: function (props, _a) {
            var slots = _a.slots;
            var optionsRef = inject(SchemaOptionsSymbol, ref(null));
            var key = Math.floor(Date.now() * Math.random()).toString(16);
            var mergeChildren = function (slots, content) {
                var _a;
                if (!Object.keys(slots).length && !content)
                    return {};
                var defaultSlot = (slots === null || slots === void 0 ? void 0 : slots.default) ? slots === null || slots === void 0 ? void 0 : slots.default(props.field, props.field.form) : [];
                if (typeof content === 'string') {
                    slots['default'] = function () { return __spread$1(defaultSlot, [content]); };
                }
                else if (isVueOptions(content) || typeof content === 'function') {
                    // scoped slot for class component
                    if (isVueOptions(content) && ((_a = content === null || content === void 0 ? void 0 : content.render) === null || _a === void 0 ? void 0 : _a.length) > 1) {
                        slots['default'] = function (scopedProps) { return __spread$1(defaultSlot, [
                            compatibleCreateElement(content, { props: scopedProps }, {}),
                        ]); };
                    }
                    else {
                        slots['default'] = function () { return __spread$1(defaultSlot, [compatibleCreateElement(content, {}, {})]); };
                    }
                }
                else if (content && typeof content === 'object') {
                    // for named slots
                    Object.keys(content).forEach(function (key) {
                        var _a;
                        var child = content[key];
                        var slot = (slots === null || slots === void 0 ? void 0 : slots[key]) ? slots === null || slots === void 0 ? void 0 : slots[key]() : [];
                        if (typeof child === 'string') {
                            slots[key] = function () { return __spread$1(slot, [child]); };
                        }
                        else if (isVueOptions(child) || typeof child === 'function') {
                            // scoped slot for class component
                            if (isVueOptions(child) && ((_a = child === null || child === void 0 ? void 0 : child.render) === null || _a === void 0 ? void 0 : _a.length) > 1) {
                                slots[key] = function (scopedProps) { return __spread$1(slot, [
                                    compatibleCreateElement(child, { props: scopedProps }, {}),
                                ]); };
                            }
                            else {
                                slots[key] = function () { return __spread$1(slot, [compatibleCreateElement(child, {}, {})]); };
                            }
                        }
                    });
                }
                return slots;
            };
            return function () {
                var field = props.field;
                var children = {};
                if (!field) {
                    children = slots;
                }
                else if (field.display !== 'visible') {
                    children = __assign$6(__assign$6({}, slots), { default: function () { return [compatibleCreateElement('template', {}, {})]; } });
                }
                else {
                    var renderDecorator = function (childNodes) {
                        var _a, _b, _c;
                        if (!((_a = field === null || field === void 0 ? void 0 : field.decorator) === null || _a === void 0 ? void 0 : _a[0])) {
                            return {
                                default: function () { return childNodes; },
                            };
                        }
                        else {
                            var decorator_1 = ((_c = Path.getIn((_b = optionsRef.value) === null || _b === void 0 ? void 0 : _b.components, field.decorator[0])) !== null && _c !== void 0 ? _c : field.decorator[0]);
                            var decoratorData_1 = toJS(field.decorator[1]) || {};
                            var style_1 = decoratorData_1 === null || decoratorData_1 === void 0 ? void 0 : decoratorData_1.style;
                            var classes_1 = decoratorData_1 === null || decoratorData_1 === void 0 ? void 0 : decoratorData_1.class;
                            delete decoratorData_1.style;
                            delete decoratorData_1.class;
                            return {
                                default: function () {
                                    return compatibleCreateElement(decorator_1, {
                                        style: style_1,
                                        class: classes_1,
                                        attrs: decoratorData_1,
                                    }, {
                                        default: function () { return childNodes; },
                                    });
                                },
                            };
                        }
                    };
                    var renderComponent = function () {
                        var _a, _b, _c;
                        if (!((_a = field === null || field === void 0 ? void 0 : field.component) === null || _a === void 0 ? void 0 : _a[0])) {
                            return compatibleCreateElement(Fragment, {}, {
                                default: function () { var _a; return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots, {
                                    field: props.field,
                                    form: props.field.form,
                                }); },
                            });
                        }
                        var component = ((_c = Path.getIn((_b = optionsRef.value) === null || _b === void 0 ? void 0 : _b.components, field.component[0])) !== null && _c !== void 0 ? _c : field.component[0]);
                        var originData = toJS(field.component[1]) || {};
                        var events = {};
                        var originChange = originData['@change'] || originData['onChange'];
                        var originFocus = originData['@focus'] || originData['onFocus'];
                        var originBlur = originData['@blur'] || originData['onBlur'];
                        // '@xxx' has higher priority
                        Object.keys(originData)
                            .filter(function (key) { return key.startsWith('on'); })
                            .forEach(function (eventKey) {
                            var eventName = "" + eventKey[2].toLowerCase() + eventKey.slice(3);
                            events[eventName] = originData[eventKey];
                        });
                        Object.keys(originData)
                            .filter(function (key) { return key.startsWith('@'); })
                            .forEach(function (eventKey) {
                            events[eventKey.slice(1)] = originData[eventKey];
                            delete originData[eventKey];
                        });
                        events.change = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            if (!isVoidField(field))
                                field.onInput.apply(field, __spread$1(args));
                            originChange === null || originChange === void 0 ? void 0 : originChange.apply(void 0, __spread$1(args));
                        };
                        events.focus = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            if (!isVoidField(field))
                                field.onFocus.apply(field, __spread$1(args));
                            originFocus === null || originFocus === void 0 ? void 0 : originFocus.apply(void 0, __spread$1(args));
                        };
                        events.blur = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            if (!isVoidField(field))
                                field.onBlur.apply(field, __spread$1(args));
                            originBlur === null || originBlur === void 0 ? void 0 : originBlur.apply(void 0, __spread$1(args));
                        };
                        var style = originData === null || originData === void 0 ? void 0 : originData.style;
                        var classes = originData === null || originData === void 0 ? void 0 : originData.class;
                        delete originData.style;
                        delete originData.class;
                        var attrs = __assign$6(__assign$6({ disabled: !isVoidField(field)
                                ? field.pattern === 'disabled' || field.pattern === 'readPretty'
                                : undefined, readOnly: !isVoidField(field)
                                ? field.pattern === 'readOnly'
                                : undefined }, originData), { 
                            // toJS is used to avoid some render loop.
                            value: !isVoidField(field) ? toJS(field.value) : undefined });
                        var componentData = {
                            attrs: attrs,
                            style: style,
                            class: classes,
                            on: events,
                        };
                        var componentChildren = mergeChildren(__assign$6({}, slots), field.content);
                        return compatibleCreateElement(component, componentData, componentChildren);
                    };
                    children = renderDecorator([renderComponent()]);
                }
                return compatibleCreateElement(Fragment, { key: key }, children);
            };
        },
    }));

    var getRawComponent = function (props) {
        var component = props.component, decorator = props.decorator;
        var newComponent;
        var newDecorator;
        if (Array.isArray(component)) {
            newComponent = [toRaw(component[0]), component[1]];
        }
        if (Array.isArray(decorator)) {
            newDecorator = [toRaw(decorator[0]), decorator[1]];
        }
        return { component: newComponent, decorator: newDecorator };
    };

    var __assign$5 = (undefined && undefined.__assign) || function () {
        __assign$5 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$5.apply(this, arguments);
    };
    var __read$4 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var ArrayField = observer(defineComponent({
        name: 'ArrayField',
        props: {
            name: {},
            title: {},
            description: {},
            value: {},
            initialValue: {},
            basePath: {},
            decorator: Array,
            component: Array,
            display: String,
            pattern: String,
            required: {
                type: Boolean,
                default: undefined,
            },
            validateFirst: {
                type: Boolean,
                default: undefined,
            },
            hidden: {
                type: Boolean,
                default: undefined,
            },
            visible: {
                type: Boolean,
                default: undefined,
            },
            editable: {
                type: Boolean,
                default: undefined,
            },
            disabled: {
                type: Boolean,
                default: undefined,
            },
            readOnly: {
                type: Boolean,
                default: undefined,
            },
            readPretty: {
                type: Boolean,
                default: undefined,
            },
            dataSource: {},
            validator: {},
            reactions: [Array, Function],
        },
        setup: function (props, _a) {
            var slots = _a.slots;
            var formRef = useForm();
            var parentRef = useField();
            var basePath = computed(function () {
                var _a;
                return props.basePath !== undefined
                    ? props.basePath
                    : (_a = parentRef === null || parentRef === void 0 ? void 0 : parentRef.value) === null || _a === void 0 ? void 0 : _a.address;
            });
            var createField = function () {
                return formRef.value.createArrayField(__assign$5(__assign$5(__assign$5({}, props), { basePath: basePath.value }), getRawComponent(props)));
            };
            var _b = __read$4(useAttach(createField()), 2), fieldRef = _b[0], checker = _b[1];
            watch(function () { return props; }, function () { return (fieldRef.value = checker(createField())); }, { deep: true });
            watch([formRef, parentRef], function () { return (fieldRef.value = checker(createField())); });
            provide(FieldSymbol, fieldRef);
            return function () {
                var field = fieldRef.value;
                var componentData = {
                    props: {
                        field: field,
                    },
                };
                var children = __assign$5({}, slots);
                if (slots.default) {
                    children.default = function () {
                        return slots.default({
                            field: field,
                            form: field.form,
                        });
                    };
                }
                return compatibleCreateElement(ReactiveField, componentData, children);
            };
        },
    }));

    var __assign$4 = (undefined && undefined.__assign) || function () {
        __assign$4 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$4.apply(this, arguments);
    };
    var __read$3 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var ObjectField = observer(defineComponent({
        name: 'ObjectField',
        props: {
            name: {},
            title: {},
            description: {},
            value: {},
            initialValue: {},
            basePath: {},
            decorator: Array,
            component: Array,
            display: String,
            pattern: String,
            required: {
                type: Boolean,
                default: undefined,
            },
            validateFirst: {
                type: Boolean,
                default: undefined,
            },
            hidden: {
                type: Boolean,
                default: undefined,
            },
            visible: {
                type: Boolean,
                default: undefined,
            },
            editable: {
                type: Boolean,
                default: undefined,
            },
            disabled: {
                type: Boolean,
                default: undefined,
            },
            readOnly: {
                type: Boolean,
                default: undefined,
            },
            readPretty: {
                type: Boolean,
                default: undefined,
            },
            dataSource: {},
            validator: {},
            reactions: [Array, Function],
        },
        setup: function (props, _a) {
            var slots = _a.slots;
            var formRef = useForm();
            var parentRef = useField();
            var basePath = computed(function () {
                var _a;
                return props.basePath !== undefined
                    ? props.basePath
                    : (_a = parentRef === null || parentRef === void 0 ? void 0 : parentRef.value) === null || _a === void 0 ? void 0 : _a.address;
            });
            var createField = function () {
                return formRef.value.createObjectField(__assign$4(__assign$4(__assign$4({}, props), { basePath: basePath.value }), getRawComponent(props)));
            };
            var _b = __read$3(useAttach(createField()), 2), fieldRef = _b[0], checker = _b[1];
            watch(function () { return props; }, function () { return (fieldRef.value = checker(createField())); }, { deep: true });
            watch([formRef, parentRef], function () { return (fieldRef.value = checker(createField())); });
            provide(FieldSymbol, fieldRef);
            return function () {
                var field = fieldRef.value;
                var componentData = {
                    props: {
                        field: field,
                    },
                };
                var children = __assign$4({}, slots);
                if (slots.default) {
                    children.default = function () {
                        return slots.default({
                            field: field,
                            form: field.form,
                        });
                    };
                }
                return compatibleCreateElement(ReactiveField, componentData, children);
            };
        },
    }));

    var __assign$3 = (undefined && undefined.__assign) || function () {
        __assign$3 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$3.apply(this, arguments);
    };
    var __read$2 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var VoidField = defineComponent({
        name: 'VoidField',
        props: {
            name: {},
            title: {},
            description: {},
            basePath: {},
            decorator: Array,
            component: Array,
            display: String,
            pattern: String,
            hidden: {
                type: Boolean,
                default: undefined,
            },
            visible: {
                type: Boolean,
                default: undefined,
            },
            editable: {
                type: Boolean,
                default: undefined,
            },
            disabled: {
                type: Boolean,
                default: undefined,
            },
            readOnly: {
                type: Boolean,
                default: undefined,
            },
            readPretty: {
                type: Boolean,
                default: undefined,
            },
            reactions: [Array, Function],
        },
        setup: function (props, _a) {
            var slots = _a.slots;
            var formRef = useForm();
            var parentRef = useField();
            var basePath = computed(function () { var _a; return props.basePath !== undefined ? props.basePath : (_a = parentRef === null || parentRef === void 0 ? void 0 : parentRef.value) === null || _a === void 0 ? void 0 : _a.address; });
            var createField = function () {
                return formRef.value.createVoidField(__assign$3(__assign$3(__assign$3({}, props), { basePath: basePath.value }), getRawComponent(props)));
            };
            var _b = __read$2(useAttach(createField()), 2), fieldRef = _b[0], checker = _b[1];
            watch(function () { return props; }, function () { return (fieldRef.value = checker(createField())); }, { deep: true });
            watch([formRef, parentRef], function () { return (fieldRef.value = checker(createField())); });
            provide(FieldSymbol, fieldRef);
            return function () {
                var field = fieldRef.value;
                var componentData = {
                    props: {
                        field: field,
                    },
                };
                var children = __assign$3({}, slots);
                if (slots.default) {
                    children.default = function () {
                        return slots.default({
                            field: field,
                            form: field.form,
                        });
                    };
                }
                return compatibleCreateElement(ReactiveField, componentData, children);
            };
        },
    });

    var __assign$2 = (undefined && undefined.__assign) || function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    var __read$1 = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var Field = defineComponent({
        name: 'Field',
        props: {
            name: {},
            title: {},
            description: {},
            value: {},
            initialValue: {},
            basePath: {},
            decorator: Array,
            component: Array,
            display: String,
            pattern: String,
            required: {
                type: Boolean,
                default: undefined,
            },
            validateFirst: {
                type: Boolean,
                default: undefined,
            },
            hidden: {
                type: Boolean,
                default: undefined,
            },
            visible: {
                type: Boolean,
                default: undefined,
            },
            editable: {
                type: Boolean,
                default: undefined,
            },
            disabled: {
                type: Boolean,
                default: undefined,
            },
            readOnly: {
                type: Boolean,
                default: undefined,
            },
            readPretty: {
                type: Boolean,
                default: undefined,
            },
            dataSource: {},
            validator: {},
            reactions: [Array, Function],
        },
        setup: function (props, _a) {
            var slots = _a.slots;
            var formRef = useForm();
            var parentRef = useField();
            var basePath = computed(function () { var _a; return props.basePath !== undefined ? props.basePath : (_a = parentRef === null || parentRef === void 0 ? void 0 : parentRef.value) === null || _a === void 0 ? void 0 : _a.address; });
            var createField = function () {
                return formRef.value.createField(__assign$2(__assign$2(__assign$2({}, props), { basePath: basePath.value }), getRawComponent(props)));
            };
            var _b = __read$1(useAttach(createField()), 2), fieldRef = _b[0], checker = _b[1];
            watch(function () { return props; }, function () { return (fieldRef.value = checker(createField())); }, { deep: true });
            watch([formRef, parentRef], function () { return (fieldRef.value = checker(createField())); });
            provide(FieldSymbol, fieldRef);
            return function () {
                var field = fieldRef.value;
                var componentData = {
                    props: {
                        field: field,
                    },
                };
                var children = __assign$2({}, slots);
                if (slots.default) {
                    children.default = function () {
                        return slots.default({
                            field: field,
                            form: field.form,
                        });
                    };
                }
                return compatibleCreateElement(ReactiveField, componentData, children);
            };
        },
    });

    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var __read = (undefined && undefined.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (undefined && undefined.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    var RecursionField = observer(defineComponent({
        name: 'RecursionField',
        inheritAttrs: false,
        props: {
            schema: {
                required: true,
            },
            name: [String, Number],
            basePath: {},
            onlyRenderProperties: {
                type: Boolean,
                default: undefined,
            },
            onlyRenderSelf: {
                type: Boolean,
                default: undefined,
            },
            mapProperties: {},
            filterProperties: {},
        },
        setup: function (props) {
            var parentRef = useField();
            var optionsRef = inject(SchemaOptionsSymbol);
            var scopeRef = inject(SchemaExpressionScopeSymbol);
            var createSchema = function (schemaProp) {
                return new Schema(schemaProp);
            };
            var fieldSchemaRef = shallowRef(createSchema(props.schema));
            watch([function () { return props.schema; }], function () {
                fieldSchemaRef.value = createSchema(props.schema);
            });
            var getPropsFromSchema = function (schema) { var _a; return (_a = schema === null || schema === void 0 ? void 0 : schema.toFieldProps) === null || _a === void 0 ? void 0 : _a.call(schema, __assign$1(__assign$1({}, optionsRef.value), { get scope() {
                    return __assign$1(__assign$1({}, optionsRef.value.scope), scopeRef.value);
                } })); };
            var fieldPropsRef = shallowRef(getPropsFromSchema(fieldSchemaRef.value));
            watch([fieldSchemaRef, optionsRef], function () {
                fieldPropsRef.value = getPropsFromSchema(fieldSchemaRef.value);
            });
            var getBasePath = function () {
                var _a, _b;
                if (props.onlyRenderProperties) {
                    return props.basePath || ((_a = parentRef === null || parentRef === void 0 ? void 0 : parentRef.value) === null || _a === void 0 ? void 0 : _a.address.concat(props.name));
                }
                return props.basePath || ((_b = parentRef === null || parentRef === void 0 ? void 0 : parentRef.value) === null || _b === void 0 ? void 0 : _b.address);
            };
            provide(SchemaSymbol, fieldSchemaRef);
            return function () {
                var basePath = getBasePath();
                var fieldProps = fieldPropsRef.value;
                var renderProperties = function (field) {
                    if (props.onlyRenderSelf)
                        return;
                    var children = fieldSchemaRef.value.mapProperties(function (item, name, index) {
                        var base = (field === null || field === void 0 ? void 0 : field.address) || basePath;
                        var schema = item;
                        if (isFn$2(props.mapProperties)) {
                            var mapped = props.mapProperties(item, name);
                            if (mapped) {
                                schema = mapped;
                            }
                        }
                        if (isFn$2(props.filterProperties)) {
                            if (props.filterProperties(schema, name) === false) {
                                return null;
                            }
                        }
                        return compatibleCreateElement(RecursionField, {
                            key: index,
                            attrs: {
                                schema: schema,
                                name: name,
                                basePath: base,
                            },
                        }, {});
                    });
                    var slots = {};
                    if (children.length > 0) {
                        slots.default = function () { return __spread(children); };
                    }
                    return compatibleCreateElement(Fragment, {}, slots);
                };
                var render = function () {
                    if (!isValid$6(props.name))
                        return renderProperties();
                    if (fieldSchemaRef.value.type === 'object') {
                        if (props.onlyRenderProperties)
                            return renderProperties();
                        return compatibleCreateElement(ObjectField, {
                            attrs: __assign$1(__assign$1({}, fieldProps), { name: props.name, basePath: basePath }),
                        }, {
                            default: function (_a) {
                                var field = _a.field;
                                return [renderProperties(field)];
                            },
                        });
                    }
                    else if (fieldSchemaRef.value.type === 'array') {
                        return compatibleCreateElement(ArrayField, {
                            attrs: __assign$1(__assign$1({}, fieldProps), { name: props.name, basePath: basePath }),
                        }, {});
                    }
                    else if (fieldSchemaRef.value.type === 'void') {
                        if (props.onlyRenderProperties)
                            return renderProperties();
                        return compatibleCreateElement(VoidField, {
                            attrs: __assign$1(__assign$1({}, fieldProps), { name: props.name, basePath: basePath }),
                        }, {
                            default: function (_a) {
                                var field = _a.field;
                                return [renderProperties(field)];
                            },
                        });
                    }
                    return compatibleCreateElement(Field, {
                        attrs: __assign$1(__assign$1({}, fieldProps), { name: props.name, basePath: basePath }),
                    }, {});
                };
                if (!fieldSchemaRef.value)
                    return;
                return render();
            };
        },
    }));

    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function _defineProperty$8(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);

        if (enumerableOnly) {
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        }

        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty$8(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    function _extends() {
      _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];

          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }

        return target;
      };

      return _extends.apply(this, arguments);
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
          return typeof obj;
        };
      } else {
        _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
      }

      return _typeof(obj);
    }

    var isFunction = function isFunction(val) {
      return typeof val === 'function';
    };
    var isArray = Array.isArray;
    var isString = function isString(val) {
      return typeof val === 'string';
    };
    var isObject = function isObject(val) {
      return val !== null && _typeof(val) === 'object';
    };

    var cacheStringFunction = function cacheStringFunction(fn) {
      var cache = Object.create(null);
      return function (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
      };
    };

    var camelizeRE = /-(\w)/g;
    var camelize = cacheStringFunction(function (str) {
      return str.replace(camelizeRE, function (_, c) {
        return c ? c.toUpperCase() : '';
      });
    });
    var hyphenateRE = /\B([A-Z])/g;
    var hyphenate = cacheStringFunction(function (str) {
      return str.replace(hyphenateRE, '-$1').toLowerCase();
    });
    var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

    var hasOwn = function hasOwn(val, key) {
      return hasOwnProperty$2.call(val, key);
    }; // change from vue sourcecode


    function resolvePropValue(options, props, key, value) {
      var opt = options[key];

      if (opt != null) {
        var hasDefault = hasOwn(opt, 'default'); // default values

        if (hasDefault && value === undefined) {
          var defaultValue = opt.default;
          value = opt.type !== Function && isFunction(defaultValue) ? defaultValue() : defaultValue;
        } // boolean casting


        if (opt.type === Boolean) {
          if (!hasOwn(props, key) && !hasDefault) {
            value = false;
          } else if (value === '') {
            value = true;
          }
        }
      }

      return value;
    }

    function classNames() {
      var classes = [];

      for (var i = 0; i < arguments.length; i++) {
        var value = i < 0 || arguments.length <= i ? undefined : arguments[i];
        if (!value) continue;

        if (isString(value)) {
          classes.push(value);
        } else if (isArray(value)) {
          for (var _i = 0; _i < value.length; _i++) {
            var inner = classNames(value[_i]);

            if (inner) {
              classes.push(inner);
            }
          }
        } else if (isObject(value)) {
          for (var name in value) {
            if (value[name]) {
              classes.push(name);
            }
          }
        }
      }

      return classes.join(' ');
    }

    function omit(obj, fields) {
      // eslint-disable-next-line prefer-object-spread
      var shallowCopy = Object.assign({}, obj);

      for (var i = 0; i < fields.length; i += 1) {
        var key = fields[i];
        delete shallowCopy[key];
      }

      return shallowCopy;
    }

    function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r);}}function t(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}function n(){return (n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r]);}return e}).apply(this,arguments)}function r(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t;}function i(e,t){if(null==e)return {};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t.indexOf(n=o[r])>=0||(i[n]=e[n]);return i}function o(e){return 1==(null!=(t=e)&&"object"==typeof t&&!1===Array.isArray(t))&&"[object Object]"===Object.prototype.toString.call(e);var t;}var u=Object.prototype,a=u.toString,f=u.hasOwnProperty,c=/^\s*function (\w+)/;function l(e){var t,n=null!==(t=null==e?void 0:e.type)&&void 0!==t?t:e;if(n){var r=n.toString().match(c);return r?r[1]:""}return ""}var s=function(e){var t,n;return !1!==o(e)&&"function"==typeof(t=e.constructor)&&!1!==o(n=t.prototype)&&!1!==n.hasOwnProperty("isPrototypeOf")},v=function(e){return e},y=v;if("production"!==process.env.NODE_ENV){var p="undefined"!=typeof console;y=p?function(e){console.warn("[VueTypes warn]: "+e);}:v;}var d=function(e,t){return f.call(e,t)},h=Number.isInteger||function(e){return "number"==typeof e&&isFinite(e)&&Math.floor(e)===e},b=Array.isArray||function(e){return "[object Array]"===a.call(e)},O=function(e){return "[object Function]"===a.call(e)},g=function(e){return s(e)&&d(e,"_vueTypes_name")},m=function(e){return s(e)&&(d(e,"type")||["_vueTypes_name","validator","default","required"].some(function(t){return d(e,t)}))};function j(e,t){return Object.defineProperty(e.bind(t),"__original",{value:e})}function _(e,t,n){var r;void 0===n&&(n=!1);var i=!0,o="";r=s(e)?e:{type:e};var u=g(r)?r._vueTypes_name+" - ":"";if(m(r)&&null!==r.type){if(void 0===r.type||!0===r.type)return i;if(!r.required&&void 0===t)return i;b(r.type)?(i=r.type.some(function(e){return !0===_(e,t,!0)}),o=r.type.map(function(e){return l(e)}).join(" or ")):i="Array"===(o=l(r))?b(t):"Object"===o?s(t):"String"===o||"Number"===o||"Boolean"===o||"Function"===o?function(e){if(null==e)return "";var t=e.constructor.toString().match(c);return t?t[1]:""}(t)===o:t instanceof r.type;}if(!i){var a=u+'value "'+t+'" should be of type "'+o+'"';return !1===n?(y(a),!1):a}if(d(r,"validator")&&O(r.validator)){var f=y,v=[];if(y=function(e){v.push(e);},i=r.validator(t),y=f,!i){var p=(v.length>1?"* ":"")+v.join("\n* ");return v.length=0,!1===n?(y(p),i):p}}return i}function T(e,t){var n=Object.defineProperties(t,{_vueTypes_name:{value:e,writable:!0},isRequired:{get:function(){return this.required=!0,this}},def:{value:function(e){return void 0!==e||this.default?O(e)||!0===_(this,e,!0)?(this.default=b(e)?function(){return [].concat(e)}:s(e)?function(){return Object.assign({},e)}:e,this):(y(this._vueTypes_name+' - invalid default value: "'+e+'"'),this):this}}}),r=n.validator;return O(r)&&(n.validator=j(r,n)),n}function w(e,t){var n=T(e,t);return Object.defineProperty(n,"validate",{value:function(e){return O(this.validator)&&y(this._vueTypes_name+" - calling .validate() will overwrite the current custom validator function. Validator info:\n"+JSON.stringify(this)),this.validator=j(e,this),this}})}function k(e,t,n){var r,o,u=(r=t,o={},Object.getOwnPropertyNames(r).forEach(function(e){o[e]=Object.getOwnPropertyDescriptor(r,e);}),Object.defineProperties({},o));if(u._vueTypes_name=e,!s(n))return u;var a,f,c=n.validator,l=i(n,["validator"]);if(O(c)){var v=u.validator;v&&(v=null!==(f=(a=v).__original)&&void 0!==f?f:a),u.validator=j(v?function(e){return v.call(this,e)&&c.call(this,e)}:c,u);}return Object.assign(u,l)}function P(e){return e.replace(/^(?!\s*$)/gm,"  ")}var x=function(){return w("any",{})},A=function(){return w("function",{type:Function})},E=function(){return w("boolean",{type:Boolean})},N=function(){return w("string",{type:String})},q=function(){return w("number",{type:Number})},S=function(){return w("array",{type:Array})},V=function(){return w("object",{type:Object})},F=function(){return T("integer",{type:Number,validator:function(e){return h(e)}})},D=function(){return T("symbol",{validator:function(e){return "symbol"==typeof e}})};function L(e,t){if(void 0===t&&(t="custom validation failed"),"function"!=typeof e)throw new TypeError("[VueTypes error]: You must provide a function as argument");return T(e.name||"<<anonymous function>>",{validator:function(n){var r=e(n);return r||y(this._vueTypes_name+" - "+t),r}})}function Y(e){if(!b(e))throw new TypeError("[VueTypes error]: You must provide an array as argument.");var t='oneOf - value should be one of "'+e.join('", "')+'".',n=e.reduce(function(e,t){if(null!=t){var n=t.constructor;-1===e.indexOf(n)&&e.push(n);}return e},[]);return T("oneOf",{type:n.length>0?n:void 0,validator:function(n){var r=-1!==e.indexOf(n);return r||y(t),r}})}function B(e){if(!b(e))throw new TypeError("[VueTypes error]: You must provide an array as argument");for(var t=!1,n=[],r=0;r<e.length;r+=1){var i=e[r];if(m(i)){if(g(i)&&"oneOf"===i._vueTypes_name){n=n.concat(i.type);continue}if(O(i.validator)&&(t=!0),!0!==i.type&&i.type){n=n.concat(i.type);continue}}n.push(i);}return n=n.filter(function(e,t){return n.indexOf(e)===t}),T("oneOfType",t?{type:n,validator:function(t){var n=[],r=e.some(function(e){var r=_(g(e)&&"oneOf"===e._vueTypes_name?e.type||null:e,t,!0);return "string"==typeof r&&n.push(r),!0===r});return r||y("oneOfType - provided value does not match any of the "+n.length+" passed-in validators:\n"+P(n.join("\n"))),r}}:{type:n})}function I(e){return T("arrayOf",{type:Array,validator:function(t){var n,r=t.every(function(t){return !0===(n=_(e,t,!0))});return r||y("arrayOf - value validation error:\n"+P(n)),r}})}function J(e){return T("instanceOf",{type:e})}function M(e){return T("objectOf",{type:Object,validator:function(t){var n,r=Object.keys(t).every(function(r){return !0===(n=_(e,t[r],!0))});return r||y("objectOf - value validation error:\n"+P(n)),r}})}function R(e){var t=Object.keys(e),n=t.filter(function(t){var n;return !!(null===(n=e[t])||void 0===n?void 0:n.required)}),r=T("shape",{type:Object,validator:function(r){var i=this;if(!s(r))return !1;var o=Object.keys(r);if(n.length>0&&n.some(function(e){return -1===o.indexOf(e)})){var u=n.filter(function(e){return -1===o.indexOf(e)});return y(1===u.length?'shape - required property "'+u[0]+'" is not defined.':'shape - required properties "'+u.join('", "')+'" are not defined.'),!1}return o.every(function(n){if(-1===t.indexOf(n))return !0===i._vueTypes_isLoose||(y('shape - shape definition does not include a "'+n+'" property. Allowed keys: "'+t.join('", "')+'".'),!1);var o=_(e[n],r[n],!0);return "string"==typeof o&&y('shape - "'+n+'" property validation error:\n '+P(o)),!0===o})}});return Object.defineProperty(r,"_vueTypes_isLoose",{writable:!0,value:!1}),Object.defineProperty(r,"loose",{get:function(){return this._vueTypes_isLoose=!0,this}}),r}var $=function(){function e(){}return e.extend=function(e){var t=this;if(b(e))return e.forEach(function(e){return t.extend(e)}),this;var n=e.name,r=e.validate,o=void 0!==r&&r,u=e.getter,a=void 0!==u&&u,f=i(e,["name","validate","getter"]);if(d(this,n))throw new TypeError('[VueTypes error]: Type "'+n+'" already defined');var c,l=f.type;return g(l)?(delete f.type,Object.defineProperty(this,n,a?{get:function(){return k(n,l,f)}}:{value:function(){var e,t=k(n,l,f);return t.validator&&(t.validator=(e=t.validator).bind.apply(e,[t].concat([].slice.call(arguments)))),t}})):(c=a?{get:function(){var e=Object.assign({},f);return o?w(n,e):T(n,e)},enumerable:!0}:{value:function(){var e,t,r=Object.assign({},f);return e=o?w(n,r):T(n,r),r.validator&&(e.validator=(t=r.validator).bind.apply(t,[e].concat([].slice.call(arguments)))),e},enumerable:!0},Object.defineProperty(this,n,c))},t(e,null,[{key:"any",get:function(){return x()}},{key:"func",get:function(){return A().def(this.defaults.func)}},{key:"bool",get:function(){return E().def(this.defaults.bool)}},{key:"string",get:function(){return N().def(this.defaults.string)}},{key:"number",get:function(){return q().def(this.defaults.number)}},{key:"array",get:function(){return S().def(this.defaults.array)}},{key:"object",get:function(){return V().def(this.defaults.object)}},{key:"integer",get:function(){return F().def(this.defaults.integer)}},{key:"symbol",get:function(){return D()}}]),e}();function z(e){var i;return void 0===e&&(e={func:function(){},bool:!0,string:"",number:0,array:function(){return []},object:function(){return {}},integer:0}),(i=function(i){function o(){return i.apply(this,arguments)||this}return r(o,i),t(o,null,[{key:"sensibleDefaults",get:function(){return n({},this.defaults)},set:function(t){this.defaults=!1!==t?n({},!0!==t?t:e):{};}}]),o}($)).defaults=n({},e),i}$.defaults={},$.custom=L,$.oneOf=Y,$.instanceOf=J,$.oneOfType=B,$.arrayOf=I,$.objectOf=M,$.shape=R,$.utils={validate:function(e,t){return !0===_(t,e,!0)},toType:function(e,t,n){return void 0===n&&(n=!1),n?w(e,t):T(e,t)}};(function(e){function t(){return e.apply(this,arguments)||this}return r(t,e),t})(z());

    var PropTypes = z({
      func: undefined,
      bool: undefined,
      string: undefined,
      number: undefined,
      array: undefined,
      object: undefined,
      integer: undefined
    });
    PropTypes.extend([{
      name: 'looseBool',
      getter: true,
      type: Boolean,
      default: undefined
    }, {
      name: 'style',
      getter: true,
      type: [String, Object],
      default: undefined
    }, {
      name: 'VNodeChild',
      getter: true,
      type: null
    }]);
    function withUndefined(type) {
      type.default = undefined;
      return type;
    }
    var PropTypes$1 = PropTypes;

    var inputProps = {
      prefixCls: PropTypes$1.string,
      inputPrefixCls: PropTypes$1.string,
      defaultValue: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
      value: PropTypes$1.oneOfType([PropTypes$1.string, PropTypes$1.number]),
      placeholder: {
        type: [String, Number]
      },
      type: PropTypes$1.string.def('text'),
      name: PropTypes$1.string,
      size: {
        type: String
      },
      disabled: PropTypes$1.looseBool,
      readonly: PropTypes$1.looseBool,
      addonBefore: PropTypes$1.VNodeChild,
      addonAfter: PropTypes$1.VNodeChild,
      prefix: PropTypes$1.VNodeChild,
      suffix: PropTypes$1.VNodeChild,
      autofocus: PropTypes$1.looseBool,
      allowClear: PropTypes$1.looseBool,
      lazy: PropTypes$1.looseBool.def(true),
      maxlength: PropTypes$1.number,
      loading: PropTypes$1.looseBool,
      onPressEnter: PropTypes$1.func,
      onKeydown: PropTypes$1.func,
      onKeyup: PropTypes$1.func,
      onFocus: PropTypes$1.func,
      onBlur: PropTypes$1.func,
      onChange: PropTypes$1.func,
      onInput: PropTypes$1.func,
      'onUpdate:value': PropTypes$1.func
    };

    function _arrayWithHoles$2(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit$2(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _arrayLikeToArray$2(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    }

    function _unsupportedIterableToArray$2(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
    }

    function _nonIterableRest$2() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _slicedToArray$2(arr, i) {
      return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray$2(arr);
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$2(arr) || _nonIterableSpread();
    }

    /** Detect free variable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

    var freeGlobal$1 = freeGlobal;

    /** Detect free variable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

    /** Used as a reference to the global object. */
    var root = freeGlobal$1 || freeSelf || Function('return this')();

    var root$1 = root;

    /** Built-in value references. */
    var Symbol$1 = root$1.Symbol;

    var Symbol$2 = Symbol$1;

    /** Used for built-in method references. */
    var objectProto$2 = Object.prototype;

    /** Used to check objects for own properties. */
    var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString$1 = objectProto$2.toString;

    /** Built-in value references. */
    var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

    /**
     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the raw `toStringTag`.
     */
    function getRawTag(value) {
      var isOwn = hasOwnProperty$1.call(value, symToStringTag$1),
          tag = value[symToStringTag$1];

      try {
        value[symToStringTag$1] = undefined;
        var unmasked = true;
      } catch (e) {}

      var result = nativeObjectToString$1.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag$1] = tag;
        } else {
          delete value[symToStringTag$1];
        }
      }
      return result;
    }

    /** Used for built-in method references. */
    var objectProto$1 = Object.prototype;

    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var nativeObjectToString = objectProto$1.toString;

    /**
     * Converts `value` to a string using `Object.prototype.toString`.
     *
     * @private
     * @param {*} value The value to convert.
     * @returns {string} Returns the converted string.
     */
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }

    /** `Object#toString` result references. */
    var nullTag = '[object Null]',
        undefinedTag = '[object Undefined]';

    /** Built-in value references. */
    var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

    /**
     * The base implementation of `getTag` without fallbacks for buggy environments.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
      if (value == null) {
        return value === undefined ? undefinedTag : nullTag;
      }
      return (symToStringTag && symToStringTag in Object(value))
        ? getRawTag(value)
        : objectToString(value);
    }

    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }

    /** Built-in value references. */
    var getPrototype = overArg(Object.getPrototypeOf, Object);

    var getPrototype$1 = getPrototype;

    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }

    /** `Object#toString` result references. */
    var objectTag = '[object Object]';

    /** Used for built-in method references. */
    var funcProto = Function.prototype,
        objectProto = Object.prototype;

    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to infer the `Object` constructor. */
    var objectCtorString = funcToString.call(Object);

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * @static
     * @memberOf _
     * @since 0.8.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
        return false;
      }
      var proto = getPrototype$1(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
        funcToString.call(Ctor) == objectCtorString;
    }

    var isValid = function isValid(value) {
      return value !== undefined && value !== null && value !== '';
    };

    var isValid$1 = isValid;

    var hasProp = function hasProp(instance, prop) {
      return prop in getOptionProps(instance);
    }; // 重构后直接使用 hasProp 替换

    var flattenChildren = function flattenChildren() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var filterEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var temp = Array.isArray(children) ? children : [children];
      var res = [];
      temp.forEach(function (child) {
        if (Array.isArray(child)) {
          res.push.apply(res, _toConsumableArray(flattenChildren(child, filterEmpty)));
        } else if (child && child.type === Fragment$1) {
          res.push.apply(res, _toConsumableArray(flattenChildren(child.children, filterEmpty)));
        } else if (child && isVNode(child)) {
          if (filterEmpty && !isEmptyElement(child)) {
            res.push(child);
          } else if (!filterEmpty) {
            res.push(child);
          }
        } else if (isValid$1(child)) {
          res.push(child);
        }
      });
      return res;
    };

    var getSlot = function getSlot(self) {
      var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (isVNode(self)) {
        if (self.type === Fragment$1) {
          return name === 'default' ? flattenChildren(self.children) : [];
        } else if (self.children && self.children[name]) {
          return flattenChildren(self.children[name](options));
        } else {
          return [];
        }
      } else {
        var res = self.$slots[name] && self.$slots[name](options);
        return flattenChildren(res);
      }
    };

    var findDOMNode = function findDOMNode(instance) {
      var _a;

      var node = ((_a = instance === null || instance === void 0 ? void 0 : instance.vnode) === null || _a === void 0 ? void 0 : _a.el) || instance && (instance.$el || instance);

      while (node && !node.tagName) {
        node = node.nextSibling;
      }

      return node;
    };

    var getOptionProps = function getOptionProps(instance) {
      var res = {};

      if (instance.$ && instance.$.vnode) {
        var props = instance.$.vnode.props || {};
        Object.keys(instance.$props).forEach(function (k) {
          var v = instance.$props[k];
          var hyphenateKey = hyphenate(k);

          if (v !== undefined || hyphenateKey in props) {
            res[k] = v; // 直接取 $props[k]
          }
        });
      } else if (isVNode(instance) && _typeof(instance.type) === 'object') {
        var originProps = instance.props || {};
        var _props = {};
        Object.keys(originProps).forEach(function (key) {
          _props[camelize(key)] = originProps[key];
        });
        var options = instance.type.props || {};
        Object.keys(options).forEach(function (k) {
          var v = resolvePropValue(options, _props, k, _props[k]);

          if (v !== undefined || k in _props) {
            res[k] = v;
          }
        });
      }

      return res;
    };

    var getComponent = function getComponent(instance) {
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : instance;
      var execute = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var com = undefined;

      if (instance.$) {
        var temp = instance[prop];

        if (temp !== undefined) {
          return typeof temp === 'function' && execute ? temp(options) : temp;
        } else {
          com = instance.$slots[prop];
          com = execute && com ? com(options) : com;
        }
      } else if (isVNode(instance)) {
        var _temp = instance.props && instance.props[prop];

        if (_temp !== undefined && instance.props !== null) {
          return typeof _temp === 'function' && execute ? _temp(options) : _temp;
        } else if (instance.type === Fragment$1) {
          com = instance.children;
        } else if (instance.children && instance.children[prop]) {
          com = instance.children[prop];
          com = execute && com ? com(options) : com;
        }
      }

      if (Array.isArray(com)) {
        com = flattenChildren(com);
        com = com.length === 1 ? com[0] : com;
        com = com.length === 0 ? undefined : com;
      }

      return com;
    };
    function isEmptyElement(c) {
      return c && (c.type === Comment || c.type === Fragment$1 && c.children.length === 0 || c.type === Text && c.children.trim() === '');
    }
    function filterEmpty() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var res = [];
      children.forEach(function (child) {
        if (Array.isArray(child)) {
          res.push.apply(res, _toConsumableArray(child));
        } else if (child.type === Fragment$1) {
          res.push.apply(res, _toConsumableArray(child.children));
        } else {
          res.push(child);
        }
      });
      return res.filter(function (c) {
        return !isEmptyElement(c);
      });
    }

    function getPropsSlot(slots, props) {
      var prop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

      var _a, _b;

      return (_a = props[prop]) !== null && _a !== void 0 ? _a : (_b = slots[prop]) === null || _b === void 0 ? void 0 : _b.call(slots);
    }

    var Pagination = {
      // Options.jsx
      items_per_page: '/ page',
      jump_to: 'Go to',
      jump_to_confirm: 'confirm',
      page: '',
      // Pagination.jsx
      prev_page: 'Previous Page',
      next_page: 'Next Page',
      prev_5: 'Previous 5 Pages',
      next_5: 'Next 5 Pages',
      prev_3: 'Previous 3 Pages',
      next_3: 'Next 3 Pages'
    };

    var CalendarLocale = {
      today: 'Today',
      now: 'Now',
      backToToday: 'Back to today',
      ok: 'Ok',
      clear: 'Clear',
      month: 'Month',
      year: 'Year',
      timeSelect: 'select time',
      dateSelect: 'select date',
      weekSelect: 'Choose a week',
      monthSelect: 'Choose a month',
      yearSelect: 'Choose a year',
      decadeSelect: 'Choose a decade',
      yearFormat: 'YYYY',
      dateFormat: 'M/D/YYYY',
      dayFormat: 'D',
      dateTimeFormat: 'M/D/YYYY HH:mm:ss',
      monthBeforeYear: true,
      previousMonth: 'Previous month (PageUp)',
      nextMonth: 'Next month (PageDown)',
      previousYear: 'Last year (Control + left)',
      nextYear: 'Next year (Control + right)',
      previousDecade: 'Last decade',
      nextDecade: 'Next decade',
      previousCentury: 'Last century',
      nextCentury: 'Next century'
    };

    var locale$1 = {
      placeholder: 'Select time'
    };
    var TimePicker = locale$1;

    var locale = {
      lang: _extends({
        placeholder: 'Select date',
        rangePlaceholder: ['Start date', 'End date']
      }, CalendarLocale),
      timePickerLocale: _extends({}, TimePicker)
    }; // All settings at:
    // https://github.com/vueComponent/ant-design-vue/blob/master/components/date-picker/locale/example.json

    var DatePicker = locale;

    var typeTemplate = '${label} is not a valid ${type}';
    var defaultLocale = {
      locale: 'en',
      Pagination: Pagination,
      DatePicker: DatePicker,
      TimePicker: TimePicker,
      Calendar: DatePicker,
      global: {
        placeholder: 'Please select'
      },
      Table: {
        filterTitle: 'Filter menu',
        filterConfirm: 'OK',
        filterReset: 'Reset',
        filterEmptyText: 'No filters',
        emptyText: 'No data',
        selectAll: 'Select current page',
        selectInvert: 'Invert current page',
        selectNone: 'Clear all data',
        selectionAll: 'Select all data',
        sortTitle: 'Sort',
        expand: 'Expand row',
        collapse: 'Collapse row',
        triggerDesc: 'Click to sort descending',
        triggerAsc: 'Click to sort ascending',
        cancelSort: 'Click to cancel sorting'
      },
      Modal: {
        okText: 'OK',
        cancelText: 'Cancel',
        justOkText: 'OK'
      },
      Popconfirm: {
        okText: 'OK',
        cancelText: 'Cancel'
      },
      Transfer: {
        titles: ['', ''],
        searchPlaceholder: 'Search here',
        itemUnit: 'item',
        itemsUnit: 'items',
        remove: 'Remove',
        selectCurrent: 'Select current page',
        removeCurrent: 'Remove current page',
        selectAll: 'Select all data',
        removeAll: 'Remove all data',
        selectInvert: 'Invert current page'
      },
      Upload: {
        uploading: 'Uploading...',
        removeFile: 'Remove file',
        uploadError: 'Upload error',
        previewFile: 'Preview file',
        downloadFile: 'Download file'
      },
      Empty: {
        description: 'No Data'
      },
      Icon: {
        icon: 'icon'
      },
      Text: {
        edit: 'Edit',
        copy: 'Copy',
        copied: 'Copied',
        expand: 'Expand'
      },
      PageHeader: {
        back: 'Back'
      },
      Form: {
        optional: '(optional)',
        defaultValidateMessages: {
          default: 'Field validation error for ${label}',
          required: 'Please enter ${label}',
          enum: '${label} must be one of [${enum}]',
          whitespace: '${label} cannot be a blank character',
          date: {
            format: '${label} date format is invalid',
            parse: '${label} cannot be converted to a date',
            invalid: '${label} is an invalid date'
          },
          types: {
            string: typeTemplate,
            method: typeTemplate,
            array: typeTemplate,
            object: typeTemplate,
            number: typeTemplate,
            date: typeTemplate,
            boolean: typeTemplate,
            integer: typeTemplate,
            float: typeTemplate,
            regexp: typeTemplate,
            email: typeTemplate,
            url: typeTemplate,
            hex: typeTemplate
          },
          string: {
            len: '${label} must be ${len} characters',
            min: '${label} must be at least ${min} characters',
            max: '${label} must be up to ${max} characters',
            range: '${label} must be between ${min}-${max} characters'
          },
          number: {
            len: '${label} must be equal to ${len}',
            min: '${label} must be minimum ${min}',
            max: '${label} must be maximum ${max}',
            range: '${label} must be between ${min}-${max}'
          },
          array: {
            len: 'Must be ${len} ${label}',
            min: 'At least ${min} ${label}',
            max: 'At most ${max} ${label}',
            range: 'The amount of ${label} must be between ${min}-${max}'
          },
          pattern: {
            mismatch: '${label} does not match the pattern ${pattern}'
          }
        }
      },
      Image: {
        preview: 'Preview'
      }
    };

    var LocaleReceiver = defineComponent({
      name: 'LocaleReceiver',
      props: {
        componentName: PropTypes$1.string,
        defaultLocale: {
          type: [Object, Function]
        },
        children: {
          type: Function
        }
      },
      setup: function setup(props, _ref) {
        var slots = _ref.slots;
        var localeData = inject('localeData', {});
        var locale = computed(function () {
          var _props$componentName = props.componentName,
              componentName = _props$componentName === void 0 ? 'global' : _props$componentName,
              defaultLocale$1 = props.defaultLocale;
          var locale = defaultLocale$1 || defaultLocale[componentName || 'global'];
          var antLocale = localeData.antLocale;
          var localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
          return _extends(_extends({}, typeof locale === 'function' ? locale() : locale), localeFromContext || {});
        });
        var localeCode = computed(function () {
          var antLocale = localeData.antLocale;
          var localeCode = antLocale && antLocale.locale; // Had use LocaleProvide but didn't set locale

          if (antLocale && antLocale.exist && !localeCode) {
            return defaultLocale.locale;
          }

          return localeCode;
        });
        return function () {
          var children = props.children || slots.default;
          var antLocale = localeData.antLocale;
          return children === null || children === void 0 ? void 0 : children(locale.value, localeCode.value, antLocale);
        };
      }
    });

    var Empty$2 = function Empty() {
      var _inject = inject('configProvider', defaultConfigProvider),
          getPrefixCls = _inject.getPrefixCls;

      var prefixCls = getPrefixCls('empty-img-default');
      return createVNode("svg", {
        "class": prefixCls,
        "width": "184",
        "height": "152",
        "viewBox": "0 0 184 152"
      }, [createVNode("g", {
        "fill": "none",
        "fill-rule": "evenodd"
      }, [createVNode("g", {
        "transform": "translate(24 31.67)"
      }, [createVNode("ellipse", {
        "class": "".concat(prefixCls, "-ellipse"),
        "cx": "67.797",
        "cy": "106.89",
        "rx": "67.797",
        "ry": "12.668"
      }, null), createVNode("path", {
        "class": "".concat(prefixCls, "-path-1"),
        "d": "M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
      }, null), createVNode("path", {
        "class": "".concat(prefixCls, "-path-2"),
        "d": "M101.537 86.214L80.63 61.102c-1.001-1.207-2.507-1.867-4.048-1.867H31.724c-1.54 0-3.047.66-4.048 1.867L6.769 86.214v13.792h94.768V86.214z",
        "transform": "translate(13.56)"
      }, null), createVNode("path", {
        "class": "".concat(prefixCls, "-path-3"),
        "d": "M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
      }, null), createVNode("path", {
        "class": "".concat(prefixCls, "-path-4"),
        "d": "M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
      }, null)]), createVNode("path", {
        "class": "".concat(prefixCls, "-path-5"),
        "d": "M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
      }, null), createVNode("g", {
        "class": "".concat(prefixCls, "-g"),
        "transform": "translate(149.65 15.383)"
      }, [createVNode("ellipse", {
        "cx": "20.654",
        "cy": "3.167",
        "rx": "2.849",
        "ry": "2.815"
      }, null), createVNode("path", {
        "d": "M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z"
      }, null)])])]);
    };

    Empty$2.PRESENTED_IMAGE_DEFAULT = true;
    var DefaultEmptyImg = Empty$2;

    var Simple = function Simple() {
      var _inject = inject('configProvider', defaultConfigProvider),
          getPrefixCls = _inject.getPrefixCls;

      var prefixCls = getPrefixCls('empty-img-simple');
      return createVNode("svg", {
        "class": prefixCls,
        "width": "64",
        "height": "41",
        "viewBox": "0 0 64 41"
      }, [createVNode("g", {
        "transform": "translate(0 1)",
        "fill": "none",
        "fill-rule": "evenodd"
      }, [createVNode("ellipse", {
        "class": "".concat(prefixCls, "-ellipse"),
        "fill": "#F5F5F5",
        "cx": "32",
        "cy": "33",
        "rx": "32",
        "ry": "7"
      }, null), createVNode("g", {
        "class": "".concat(prefixCls, "-g"),
        "fill-rule": "nonzero",
        "stroke": "#D9D9D9"
      }, [createVNode("path", {
        "d": "M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
      }, null), createVNode("path", {
        "d": "M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z",
        "fill": "#FAFAFA",
        "class": "".concat(prefixCls, "-path")
      }, null)])])]);
    };

    Simple.PRESENTED_IMAGE_SIMPLE = true;
    var SimpleEmptyImg = Simple;

    // https://stackoverflow.com/questions/46176165/ways-to-get-string-literal-type-of-array-values-without-enum-overhead
    var tuple = function tuple() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return args;
    };
    var withInstall = function withInstall(comp) {
      var c = comp;

      c.install = function (app) {
        app.component(c.displayName || c.name, comp);
      };

      return comp;
    };

    var __rest$2 = undefined && undefined.__rest || function (s, e) {
      var t = {};

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      }

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    };

    var defaultEmptyImg = createVNode(DefaultEmptyImg, null, null);

    var simpleEmptyImg = createVNode(SimpleEmptyImg, null, null);

    var Empty = function Empty(props, _ref) {
      var _ref$slots = _ref.slots,
          slots = _ref$slots === void 0 ? {} : _ref$slots,
          attrs = _ref.attrs;

      var _a;

      var configProvider = inject('configProvider', defaultConfigProvider);
      var getPrefixCls = configProvider.getPrefixCls,
          direction = configProvider.direction;

      var _b = _extends(_extends({}, props), attrs),
          customizePrefixCls = _b.prefixCls,
          _b$image = _b.image,
          image = _b$image === void 0 ? defaultEmptyImg : _b$image,
          _b$description = _b.description,
          description = _b$description === void 0 ? ((_a = slots.description) === null || _a === void 0 ? void 0 : _a.call(slots)) || undefined : _b$description,
          imageStyle = _b.imageStyle,
          _b$class = _b.class,
          className = _b$class === void 0 ? '' : _b$class,
          restProps = __rest$2(_b, ["prefixCls", "image", "description", "imageStyle", "class"]);

      return createVNode(LocaleReceiver, {
        "componentName": "Empty",
        "children": function children(locale) {
          var _classNames;

          var prefixCls = getPrefixCls('empty', customizePrefixCls);
          var des = typeof description !== 'undefined' ? description : locale.description;
          var alt = typeof des === 'string' ? des : 'empty';
          var imageNode = null;

          if (typeof image === 'string') {
            imageNode = createVNode("img", {
              "alt": alt,
              "src": image
            }, null);
          } else {
            imageNode = image;
          }

          return createVNode("div", _objectSpread2({
            "class": classNames(prefixCls, className, (_classNames = {}, _defineProperty$8(_classNames, "".concat(prefixCls, "-normal"), image === simpleEmptyImg), _defineProperty$8(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), _classNames))
          }, restProps), [createVNode("div", {
            "class": "".concat(prefixCls, "-image"),
            "style": imageStyle
          }, [imageNode]), des && createVNode("p", {
            "class": "".concat(prefixCls, "-description")
          }, [des]), slots.default && createVNode("div", {
            "class": "".concat(prefixCls, "-footer")
          }, [filterEmpty(slots.default())])]);
        }
      }, null);
    };

    Empty.displayName = 'AEmpty';
    Empty.PRESENTED_IMAGE_DEFAULT = defaultEmptyImg;
    Empty.PRESENTED_IMAGE_SIMPLE = simpleEmptyImg;
    Empty.inheritAttrs = false;
    Empty.props = {
      prefixCls: PropTypes$1.string,
      image: PropTypes$1.any,
      description: PropTypes$1.any,
      imageStyle: PropTypes$1.object
    };
    var Empty$1 = withInstall(Empty);

    var RenderEmpty = function RenderEmpty(props) {
      var configProvider = inject('configProvider', defaultConfigProvider);

      var renderHtml = function renderHtml(componentName) {
        var getPrefixCls = configProvider.getPrefixCls;
        var prefix = getPrefixCls('empty');

        switch (componentName) {
          case 'Table':
          case 'List':
            return createVNode(Empty$1, {
              "image": Empty$1.PRESENTED_IMAGE_SIMPLE
            }, null);

          case 'Select':
          case 'TreeSelect':
          case 'Cascader':
          case 'Transfer':
          case 'Mentions':
            return createVNode(Empty$1, {
              "image": Empty$1.PRESENTED_IMAGE_SIMPLE,
              "class": "".concat(prefix, "-small")
            }, null);

          default:
            return createVNode(Empty$1, null, null);
        }
      };

      return renderHtml(props.componentName);
    };

    function renderEmpty(componentName) {
      return createVNode(RenderEmpty, {
        "componentName": componentName
      }, null);
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function commonjsRequire () {
    	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var moment = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
        module.exports = factory() ;
    }(commonjsGlobal, (function () {
        var hookCallback;

        function hooks() {
            return hookCallback.apply(null, arguments);
        }

        // This is done to register the method called with moment()
        // without creating circular dependencies.
        function setHookCallback(callback) {
            hookCallback = callback;
        }

        function isArray(input) {
            return (
                input instanceof Array ||
                Object.prototype.toString.call(input) === '[object Array]'
            );
        }

        function isObject(input) {
            // IE8 will treat undefined and null as object if it wasn't for
            // input != null
            return (
                input != null &&
                Object.prototype.toString.call(input) === '[object Object]'
            );
        }

        function hasOwnProp(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b);
        }

        function isObjectEmpty(obj) {
            if (Object.getOwnPropertyNames) {
                return Object.getOwnPropertyNames(obj).length === 0;
            } else {
                var k;
                for (k in obj) {
                    if (hasOwnProp(obj, k)) {
                        return false;
                    }
                }
                return true;
            }
        }

        function isUndefined(input) {
            return input === void 0;
        }

        function isNumber(input) {
            return (
                typeof input === 'number' ||
                Object.prototype.toString.call(input) === '[object Number]'
            );
        }

        function isDate(input) {
            return (
                input instanceof Date ||
                Object.prototype.toString.call(input) === '[object Date]'
            );
        }

        function map(arr, fn) {
            var res = [],
                i;
            for (i = 0; i < arr.length; ++i) {
                res.push(fn(arr[i], i));
            }
            return res;
        }

        function extend(a, b) {
            for (var i in b) {
                if (hasOwnProp(b, i)) {
                    a[i] = b[i];
                }
            }

            if (hasOwnProp(b, 'toString')) {
                a.toString = b.toString;
            }

            if (hasOwnProp(b, 'valueOf')) {
                a.valueOf = b.valueOf;
            }

            return a;
        }

        function createUTC(input, format, locale, strict) {
            return createLocalOrUTC(input, format, locale, strict, true).utc();
        }

        function defaultParsingFlags() {
            // We need to deep clone this object.
            return {
                empty: false,
                unusedTokens: [],
                unusedInput: [],
                overflow: -2,
                charsLeftOver: 0,
                nullInput: false,
                invalidEra: null,
                invalidMonth: null,
                invalidFormat: false,
                userInvalidated: false,
                iso: false,
                parsedDateParts: [],
                era: null,
                meridiem: null,
                rfc2822: false,
                weekdayMismatch: false,
            };
        }

        function getParsingFlags(m) {
            if (m._pf == null) {
                m._pf = defaultParsingFlags();
            }
            return m._pf;
        }

        var some;
        if (Array.prototype.some) {
            some = Array.prototype.some;
        } else {
            some = function (fun) {
                var t = Object(this),
                    len = t.length >>> 0,
                    i;

                for (i = 0; i < len; i++) {
                    if (i in t && fun.call(this, t[i], i, t)) {
                        return true;
                    }
                }

                return false;
            };
        }

        function isValid(m) {
            if (m._isValid == null) {
                var flags = getParsingFlags(m),
                    parsedParts = some.call(flags.parsedDateParts, function (i) {
                        return i != null;
                    }),
                    isNowValid =
                        !isNaN(m._d.getTime()) &&
                        flags.overflow < 0 &&
                        !flags.empty &&
                        !flags.invalidEra &&
                        !flags.invalidMonth &&
                        !flags.invalidWeekday &&
                        !flags.weekdayMismatch &&
                        !flags.nullInput &&
                        !flags.invalidFormat &&
                        !flags.userInvalidated &&
                        (!flags.meridiem || (flags.meridiem && parsedParts));

                if (m._strict) {
                    isNowValid =
                        isNowValid &&
                        flags.charsLeftOver === 0 &&
                        flags.unusedTokens.length === 0 &&
                        flags.bigHour === undefined;
                }

                if (Object.isFrozen == null || !Object.isFrozen(m)) {
                    m._isValid = isNowValid;
                } else {
                    return isNowValid;
                }
            }
            return m._isValid;
        }

        function createInvalid(flags) {
            var m = createUTC(NaN);
            if (flags != null) {
                extend(getParsingFlags(m), flags);
            } else {
                getParsingFlags(m).userInvalidated = true;
            }

            return m;
        }

        // Plugins that add properties should also add the key here (null value),
        // so we can properly clone ourselves.
        var momentProperties = (hooks.momentProperties = []),
            updateInProgress = false;

        function copyConfig(to, from) {
            var i, prop, val;

            if (!isUndefined(from._isAMomentObject)) {
                to._isAMomentObject = from._isAMomentObject;
            }
            if (!isUndefined(from._i)) {
                to._i = from._i;
            }
            if (!isUndefined(from._f)) {
                to._f = from._f;
            }
            if (!isUndefined(from._l)) {
                to._l = from._l;
            }
            if (!isUndefined(from._strict)) {
                to._strict = from._strict;
            }
            if (!isUndefined(from._tzm)) {
                to._tzm = from._tzm;
            }
            if (!isUndefined(from._isUTC)) {
                to._isUTC = from._isUTC;
            }
            if (!isUndefined(from._offset)) {
                to._offset = from._offset;
            }
            if (!isUndefined(from._pf)) {
                to._pf = getParsingFlags(from);
            }
            if (!isUndefined(from._locale)) {
                to._locale = from._locale;
            }

            if (momentProperties.length > 0) {
                for (i = 0; i < momentProperties.length; i++) {
                    prop = momentProperties[i];
                    val = from[prop];
                    if (!isUndefined(val)) {
                        to[prop] = val;
                    }
                }
            }

            return to;
        }

        // Moment prototype object
        function Moment(config) {
            copyConfig(this, config);
            this._d = new Date(config._d != null ? config._d.getTime() : NaN);
            if (!this.isValid()) {
                this._d = new Date(NaN);
            }
            // Prevent infinite loop in case updateOffset creates new moment
            // objects.
            if (updateInProgress === false) {
                updateInProgress = true;
                hooks.updateOffset(this);
                updateInProgress = false;
            }
        }

        function isMoment(obj) {
            return (
                obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
            );
        }

        function warn(msg) {
            if (
                hooks.suppressDeprecationWarnings === false &&
                typeof console !== 'undefined' &&
                console.warn
            ) {
                console.warn('Deprecation warning: ' + msg);
            }
        }

        function deprecate(msg, fn) {
            var firstTime = true;

            return extend(function () {
                if (hooks.deprecationHandler != null) {
                    hooks.deprecationHandler(null, msg);
                }
                if (firstTime) {
                    var args = [],
                        arg,
                        i,
                        key;
                    for (i = 0; i < arguments.length; i++) {
                        arg = '';
                        if (typeof arguments[i] === 'object') {
                            arg += '\n[' + i + '] ';
                            for (key in arguments[0]) {
                                if (hasOwnProp(arguments[0], key)) {
                                    arg += key + ': ' + arguments[0][key] + ', ';
                                }
                            }
                            arg = arg.slice(0, -2); // Remove trailing comma and space
                        } else {
                            arg = arguments[i];
                        }
                        args.push(arg);
                    }
                    warn(
                        msg +
                            '\nArguments: ' +
                            Array.prototype.slice.call(args).join('') +
                            '\n' +
                            new Error().stack
                    );
                    firstTime = false;
                }
                return fn.apply(this, arguments);
            }, fn);
        }

        var deprecations = {};

        function deprecateSimple(name, msg) {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(name, msg);
            }
            if (!deprecations[name]) {
                warn(msg);
                deprecations[name] = true;
            }
        }

        hooks.suppressDeprecationWarnings = false;
        hooks.deprecationHandler = null;

        function isFunction(input) {
            return (
                (typeof Function !== 'undefined' && input instanceof Function) ||
                Object.prototype.toString.call(input) === '[object Function]'
            );
        }

        function set(config) {
            var prop, i;
            for (i in config) {
                if (hasOwnProp(config, i)) {
                    prop = config[i];
                    if (isFunction(prop)) {
                        this[i] = prop;
                    } else {
                        this['_' + i] = prop;
                    }
                }
            }
            this._config = config;
            // Lenient ordinal parsing accepts just a number in addition to
            // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
            // TODO: Remove "ordinalParse" fallback in next major release.
            this._dayOfMonthOrdinalParseLenient = new RegExp(
                (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                    '|' +
                    /\d{1,2}/.source
            );
        }

        function mergeConfigs(parentConfig, childConfig) {
            var res = extend({}, parentConfig),
                prop;
            for (prop in childConfig) {
                if (hasOwnProp(childConfig, prop)) {
                    if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                        res[prop] = {};
                        extend(res[prop], parentConfig[prop]);
                        extend(res[prop], childConfig[prop]);
                    } else if (childConfig[prop] != null) {
                        res[prop] = childConfig[prop];
                    } else {
                        delete res[prop];
                    }
                }
            }
            for (prop in parentConfig) {
                if (
                    hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])
                ) {
                    // make sure changes to properties don't modify parent config
                    res[prop] = extend({}, res[prop]);
                }
            }
            return res;
        }

        function Locale(config) {
            if (config != null) {
                this.set(config);
            }
        }

        var keys;

        if (Object.keys) {
            keys = Object.keys;
        } else {
            keys = function (obj) {
                var i,
                    res = [];
                for (i in obj) {
                    if (hasOwnProp(obj, i)) {
                        res.push(i);
                    }
                }
                return res;
            };
        }

        var defaultCalendar = {
            sameDay: '[Today at] LT',
            nextDay: '[Tomorrow at] LT',
            nextWeek: 'dddd [at] LT',
            lastDay: '[Yesterday at] LT',
            lastWeek: '[Last] dddd [at] LT',
            sameElse: 'L',
        };

        function calendar(key, mom, now) {
            var output = this._calendar[key] || this._calendar['sameElse'];
            return isFunction(output) ? output.call(mom, now) : output;
        }

        function zeroFill(number, targetLength, forceSign) {
            var absNumber = '' + Math.abs(number),
                zerosToFill = targetLength - absNumber.length,
                sign = number >= 0;
            return (
                (sign ? (forceSign ? '+' : '') : '-') +
                Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
                absNumber
            );
        }

        var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
            localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
            formatFunctions = {},
            formatTokenFunctions = {};

        // token:    'M'
        // padded:   ['MM', 2]
        // ordinal:  'Mo'
        // callback: function () { this.month() + 1 }
        function addFormatToken(token, padded, ordinal, callback) {
            var func = callback;
            if (typeof callback === 'string') {
                func = function () {
                    return this[callback]();
                };
            }
            if (token) {
                formatTokenFunctions[token] = func;
            }
            if (padded) {
                formatTokenFunctions[padded[0]] = function () {
                    return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
                };
            }
            if (ordinal) {
                formatTokenFunctions[ordinal] = function () {
                    return this.localeData().ordinal(
                        func.apply(this, arguments),
                        token
                    );
                };
            }
        }

        function removeFormattingTokens(input) {
            if (input.match(/\[[\s\S]/)) {
                return input.replace(/^\[|\]$/g, '');
            }
            return input.replace(/\\/g, '');
        }

        function makeFormatFunction(format) {
            var array = format.match(formattingTokens),
                i,
                length;

            for (i = 0, length = array.length; i < length; i++) {
                if (formatTokenFunctions[array[i]]) {
                    array[i] = formatTokenFunctions[array[i]];
                } else {
                    array[i] = removeFormattingTokens(array[i]);
                }
            }

            return function (mom) {
                var output = '',
                    i;
                for (i = 0; i < length; i++) {
                    output += isFunction(array[i])
                        ? array[i].call(mom, format)
                        : array[i];
                }
                return output;
            };
        }

        // format date using native date object
        function formatMoment(m, format) {
            if (!m.isValid()) {
                return m.localeData().invalidDate();
            }

            format = expandFormat(format, m.localeData());
            formatFunctions[format] =
                formatFunctions[format] || makeFormatFunction(format);

            return formatFunctions[format](m);
        }

        function expandFormat(format, locale) {
            var i = 5;

            function replaceLongDateFormatTokens(input) {
                return locale.longDateFormat(input) || input;
            }

            localFormattingTokens.lastIndex = 0;
            while (i >= 0 && localFormattingTokens.test(format)) {
                format = format.replace(
                    localFormattingTokens,
                    replaceLongDateFormatTokens
                );
                localFormattingTokens.lastIndex = 0;
                i -= 1;
            }

            return format;
        }

        var defaultLongDateFormat = {
            LTS: 'h:mm:ss A',
            LT: 'h:mm A',
            L: 'MM/DD/YYYY',
            LL: 'MMMM D, YYYY',
            LLL: 'MMMM D, YYYY h:mm A',
            LLLL: 'dddd, MMMM D, YYYY h:mm A',
        };

        function longDateFormat(key) {
            var format = this._longDateFormat[key],
                formatUpper = this._longDateFormat[key.toUpperCase()];

            if (format || !formatUpper) {
                return format;
            }

            this._longDateFormat[key] = formatUpper
                .match(formattingTokens)
                .map(function (tok) {
                    if (
                        tok === 'MMMM' ||
                        tok === 'MM' ||
                        tok === 'DD' ||
                        tok === 'dddd'
                    ) {
                        return tok.slice(1);
                    }
                    return tok;
                })
                .join('');

            return this._longDateFormat[key];
        }

        var defaultInvalidDate = 'Invalid date';

        function invalidDate() {
            return this._invalidDate;
        }

        var defaultOrdinal = '%d',
            defaultDayOfMonthOrdinalParse = /\d{1,2}/;

        function ordinal(number) {
            return this._ordinal.replace('%d', number);
        }

        var defaultRelativeTime = {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            ss: '%d seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            w: 'a week',
            ww: '%d weeks',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years',
        };

        function relativeTime(number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return isFunction(output)
                ? output(number, withoutSuffix, string, isFuture)
                : output.replace(/%d/i, number);
        }

        function pastFuture(diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return isFunction(format) ? format(output) : format.replace(/%s/i, output);
        }

        var aliases = {};

        function addUnitAlias(unit, shorthand) {
            var lowerCase = unit.toLowerCase();
            aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
        }

        function normalizeUnits(units) {
            return typeof units === 'string'
                ? aliases[units] || aliases[units.toLowerCase()]
                : undefined;
        }

        function normalizeObjectUnits(inputObject) {
            var normalizedInput = {},
                normalizedProp,
                prop;

            for (prop in inputObject) {
                if (hasOwnProp(inputObject, prop)) {
                    normalizedProp = normalizeUnits(prop);
                    if (normalizedProp) {
                        normalizedInput[normalizedProp] = inputObject[prop];
                    }
                }
            }

            return normalizedInput;
        }

        var priorities = {};

        function addUnitPriority(unit, priority) {
            priorities[unit] = priority;
        }

        function getPrioritizedUnits(unitsObj) {
            var units = [],
                u;
            for (u in unitsObj) {
                if (hasOwnProp(unitsObj, u)) {
                    units.push({ unit: u, priority: priorities[u] });
                }
            }
            units.sort(function (a, b) {
                return a.priority - b.priority;
            });
            return units;
        }

        function isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        }

        function absFloor(number) {
            if (number < 0) {
                // -0 -> 0
                return Math.ceil(number) || 0;
            } else {
                return Math.floor(number);
            }
        }

        function toInt(argumentForCoercion) {
            var coercedNumber = +argumentForCoercion,
                value = 0;

            if (coercedNumber !== 0 && isFinite(coercedNumber)) {
                value = absFloor(coercedNumber);
            }

            return value;
        }

        function makeGetSet(unit, keepTime) {
            return function (value) {
                if (value != null) {
                    set$1(this, unit, value);
                    hooks.updateOffset(this, keepTime);
                    return this;
                } else {
                    return get(this, unit);
                }
            };
        }

        function get(mom, unit) {
            return mom.isValid()
                ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
                : NaN;
        }

        function set$1(mom, unit, value) {
            if (mom.isValid() && !isNaN(value)) {
                if (
                    unit === 'FullYear' &&
                    isLeapYear(mom.year()) &&
                    mom.month() === 1 &&
                    mom.date() === 29
                ) {
                    value = toInt(value);
                    mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                        value,
                        mom.month(),
                        daysInMonth(value, mom.month())
                    );
                } else {
                    mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
                }
            }
        }

        // MOMENTS

        function stringGet(units) {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units]();
            }
            return this;
        }

        function stringSet(units, value) {
            if (typeof units === 'object') {
                units = normalizeObjectUnits(units);
                var prioritized = getPrioritizedUnits(units),
                    i;
                for (i = 0; i < prioritized.length; i++) {
                    this[prioritized[i].unit](units[prioritized[i].unit]);
                }
            } else {
                units = normalizeUnits(units);
                if (isFunction(this[units])) {
                    return this[units](value);
                }
            }
            return this;
        }

        var match1 = /\d/, //       0 - 9
            match2 = /\d\d/, //      00 - 99
            match3 = /\d{3}/, //     000 - 999
            match4 = /\d{4}/, //    0000 - 9999
            match6 = /[+-]?\d{6}/, // -999999 - 999999
            match1to2 = /\d\d?/, //       0 - 99
            match3to4 = /\d\d\d\d?/, //     999 - 9999
            match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
            match1to3 = /\d{1,3}/, //       0 - 999
            match1to4 = /\d{1,4}/, //       0 - 9999
            match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
            matchUnsigned = /\d+/, //       0 - inf
            matchSigned = /[+-]?\d+/, //    -inf - inf
            matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
            matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
            matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
            // any word (or two) characters or numbers including two/three word month in arabic.
            // includes scottish gaelic two word and hyphenated months
            matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
            regexes;

        regexes = {};

        function addRegexToken(token, regex, strictRegex) {
            regexes[token] = isFunction(regex)
                ? regex
                : function (isStrict, localeData) {
                      return isStrict && strictRegex ? strictRegex : regex;
                  };
        }

        function getParseRegexForToken(token, config) {
            if (!hasOwnProp(regexes, token)) {
                return new RegExp(unescapeFormat(token));
            }

            return regexes[token](config._strict, config._locale);
        }

        // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
        function unescapeFormat(s) {
            return regexEscape(
                s
                    .replace('\\', '')
                    .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                        matched,
                        p1,
                        p2,
                        p3,
                        p4
                    ) {
                        return p1 || p2 || p3 || p4;
                    })
            );
        }

        function regexEscape(s) {
            return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        }

        var tokens = {};

        function addParseToken(token, callback) {
            var i,
                func = callback;
            if (typeof token === 'string') {
                token = [token];
            }
            if (isNumber(callback)) {
                func = function (input, array) {
                    array[callback] = toInt(input);
                };
            }
            for (i = 0; i < token.length; i++) {
                tokens[token[i]] = func;
            }
        }

        function addWeekParseToken(token, callback) {
            addParseToken(token, function (input, array, config, token) {
                config._w = config._w || {};
                callback(input, config._w, config, token);
            });
        }

        function addTimeToArrayFromToken(token, input, config) {
            if (input != null && hasOwnProp(tokens, token)) {
                tokens[token](input, config._a, config, token);
            }
        }

        var YEAR = 0,
            MONTH = 1,
            DATE = 2,
            HOUR = 3,
            MINUTE = 4,
            SECOND = 5,
            MILLISECOND = 6,
            WEEK = 7,
            WEEKDAY = 8;

        function mod(n, x) {
            return ((n % x) + x) % x;
        }

        var indexOf;

        if (Array.prototype.indexOf) {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function (o) {
                // I know
                var i;
                for (i = 0; i < this.length; ++i) {
                    if (this[i] === o) {
                        return i;
                    }
                }
                return -1;
            };
        }

        function daysInMonth(year, month) {
            if (isNaN(year) || isNaN(month)) {
                return NaN;
            }
            var modMonth = mod(month, 12);
            year += (month - modMonth) / 12;
            return modMonth === 1
                ? isLeapYear(year)
                    ? 29
                    : 28
                : 31 - ((modMonth % 7) % 2);
        }

        // FORMATTING

        addFormatToken('M', ['MM', 2], 'Mo', function () {
            return this.month() + 1;
        });

        addFormatToken('MMM', 0, 0, function (format) {
            return this.localeData().monthsShort(this, format);
        });

        addFormatToken('MMMM', 0, 0, function (format) {
            return this.localeData().months(this, format);
        });

        // ALIASES

        addUnitAlias('month', 'M');

        // PRIORITY

        addUnitPriority('month', 8);

        // PARSING

        addRegexToken('M', match1to2);
        addRegexToken('MM', match1to2, match2);
        addRegexToken('MMM', function (isStrict, locale) {
            return locale.monthsShortRegex(isStrict);
        });
        addRegexToken('MMMM', function (isStrict, locale) {
            return locale.monthsRegex(isStrict);
        });

        addParseToken(['M', 'MM'], function (input, array) {
            array[MONTH] = toInt(input) - 1;
        });

        addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
            var month = config._locale.monthsParse(input, token, config._strict);
            // if we didn't find a month name, mark the date as invalid.
            if (month != null) {
                array[MONTH] = month;
            } else {
                getParsingFlags(config).invalidMonth = input;
            }
        });

        // LOCALES

        var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
                '_'
            ),
            defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
                '_'
            ),
            MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
            defaultMonthsShortRegex = matchWord,
            defaultMonthsRegex = matchWord;

        function localeMonths(m, format) {
            if (!m) {
                return isArray(this._months)
                    ? this._months
                    : this._months['standalone'];
            }
            return isArray(this._months)
                ? this._months[m.month()]
                : this._months[
                      (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                          ? 'format'
                          : 'standalone'
                  ][m.month()];
        }

        function localeMonthsShort(m, format) {
            if (!m) {
                return isArray(this._monthsShort)
                    ? this._monthsShort
                    : this._monthsShort['standalone'];
            }
            return isArray(this._monthsShort)
                ? this._monthsShort[m.month()]
                : this._monthsShort[
                      MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
                  ][m.month()];
        }

        function handleStrictParse(monthName, format, strict) {
            var i,
                ii,
                mom,
                llc = monthName.toLocaleLowerCase();
            if (!this._monthsParse) {
                // this is not used
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
                for (i = 0; i < 12; ++i) {
                    mom = createUTC([2000, i]);
                    this._shortMonthsParse[i] = this.monthsShort(
                        mom,
                        ''
                    ).toLocaleLowerCase();
                    this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
                }
            }

            if (strict) {
                if (format === 'MMM') {
                    ii = indexOf.call(this._shortMonthsParse, llc);
                    return ii !== -1 ? ii : null;
                } else {
                    ii = indexOf.call(this._longMonthsParse, llc);
                    return ii !== -1 ? ii : null;
                }
            } else {
                if (format === 'MMM') {
                    ii = indexOf.call(this._shortMonthsParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._longMonthsParse, llc);
                    return ii !== -1 ? ii : null;
                } else {
                    ii = indexOf.call(this._longMonthsParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._shortMonthsParse, llc);
                    return ii !== -1 ? ii : null;
                }
            }
        }

        function localeMonthsParse(monthName, format, strict) {
            var i, mom, regex;

            if (this._monthsParseExact) {
                return handleStrictParse.call(this, monthName, format, strict);
            }

            if (!this._monthsParse) {
                this._monthsParse = [];
                this._longMonthsParse = [];
                this._shortMonthsParse = [];
            }

            // TODO: add sorting
            // Sorting makes sure if one month (or abbr) is a prefix of another
            // see sorting in computeMonthsParse
            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = createUTC([2000, i]);
                if (strict && !this._longMonthsParse[i]) {
                    this._longMonthsParse[i] = new RegExp(
                        '^' + this.months(mom, '').replace('.', '') + '$',
                        'i'
                    );
                    this._shortMonthsParse[i] = new RegExp(
                        '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                        'i'
                    );
                }
                if (!strict && !this._monthsParse[i]) {
                    regex =
                        '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (
                    strict &&
                    format === 'MMMM' &&
                    this._longMonthsParse[i].test(monthName)
                ) {
                    return i;
                } else if (
                    strict &&
                    format === 'MMM' &&
                    this._shortMonthsParse[i].test(monthName)
                ) {
                    return i;
                } else if (!strict && this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        }

        // MOMENTS

        function setMonth(mom, value) {
            var dayOfMonth;

            if (!mom.isValid()) {
                // No op
                return mom;
            }

            if (typeof value === 'string') {
                if (/^\d+$/.test(value)) {
                    value = toInt(value);
                } else {
                    value = mom.localeData().monthsParse(value);
                    // TODO: Another silent failure?
                    if (!isNumber(value)) {
                        return mom;
                    }
                }
            }

            dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
            return mom;
        }

        function getSetMonth(value) {
            if (value != null) {
                setMonth(this, value);
                hooks.updateOffset(this, true);
                return this;
            } else {
                return get(this, 'Month');
            }
        }

        function getDaysInMonth() {
            return daysInMonth(this.year(), this.month());
        }

        function monthsShortRegex(isStrict) {
            if (this._monthsParseExact) {
                if (!hasOwnProp(this, '_monthsRegex')) {
                    computeMonthsParse.call(this);
                }
                if (isStrict) {
                    return this._monthsShortStrictRegex;
                } else {
                    return this._monthsShortRegex;
                }
            } else {
                if (!hasOwnProp(this, '_monthsShortRegex')) {
                    this._monthsShortRegex = defaultMonthsShortRegex;
                }
                return this._monthsShortStrictRegex && isStrict
                    ? this._monthsShortStrictRegex
                    : this._monthsShortRegex;
            }
        }

        function monthsRegex(isStrict) {
            if (this._monthsParseExact) {
                if (!hasOwnProp(this, '_monthsRegex')) {
                    computeMonthsParse.call(this);
                }
                if (isStrict) {
                    return this._monthsStrictRegex;
                } else {
                    return this._monthsRegex;
                }
            } else {
                if (!hasOwnProp(this, '_monthsRegex')) {
                    this._monthsRegex = defaultMonthsRegex;
                }
                return this._monthsStrictRegex && isStrict
                    ? this._monthsStrictRegex
                    : this._monthsRegex;
            }
        }

        function computeMonthsParse() {
            function cmpLenRev(a, b) {
                return b.length - a.length;
            }

            var shortPieces = [],
                longPieces = [],
                mixedPieces = [],
                i,
                mom;
            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                mom = createUTC([2000, i]);
                shortPieces.push(this.monthsShort(mom, ''));
                longPieces.push(this.months(mom, ''));
                mixedPieces.push(this.months(mom, ''));
                mixedPieces.push(this.monthsShort(mom, ''));
            }
            // Sorting makes sure if one month (or abbr) is a prefix of another it
            // will match the longer piece.
            shortPieces.sort(cmpLenRev);
            longPieces.sort(cmpLenRev);
            mixedPieces.sort(cmpLenRev);
            for (i = 0; i < 12; i++) {
                shortPieces[i] = regexEscape(shortPieces[i]);
                longPieces[i] = regexEscape(longPieces[i]);
            }
            for (i = 0; i < 24; i++) {
                mixedPieces[i] = regexEscape(mixedPieces[i]);
            }

            this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
            this._monthsShortRegex = this._monthsRegex;
            this._monthsStrictRegex = new RegExp(
                '^(' + longPieces.join('|') + ')',
                'i'
            );
            this._monthsShortStrictRegex = new RegExp(
                '^(' + shortPieces.join('|') + ')',
                'i'
            );
        }

        // FORMATTING

        addFormatToken('Y', 0, 0, function () {
            var y = this.year();
            return y <= 9999 ? zeroFill(y, 4) : '+' + y;
        });

        addFormatToken(0, ['YY', 2], 0, function () {
            return this.year() % 100;
        });

        addFormatToken(0, ['YYYY', 4], 0, 'year');
        addFormatToken(0, ['YYYYY', 5], 0, 'year');
        addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

        // ALIASES

        addUnitAlias('year', 'y');

        // PRIORITIES

        addUnitPriority('year', 1);

        // PARSING

        addRegexToken('Y', matchSigned);
        addRegexToken('YY', match1to2, match2);
        addRegexToken('YYYY', match1to4, match4);
        addRegexToken('YYYYY', match1to6, match6);
        addRegexToken('YYYYYY', match1to6, match6);

        addParseToken(['YYYYY', 'YYYYYY'], YEAR);
        addParseToken('YYYY', function (input, array) {
            array[YEAR] =
                input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
        });
        addParseToken('YY', function (input, array) {
            array[YEAR] = hooks.parseTwoDigitYear(input);
        });
        addParseToken('Y', function (input, array) {
            array[YEAR] = parseInt(input, 10);
        });

        // HELPERS

        function daysInYear(year) {
            return isLeapYear(year) ? 366 : 365;
        }

        // HOOKS

        hooks.parseTwoDigitYear = function (input) {
            return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
        };

        // MOMENTS

        var getSetYear = makeGetSet('FullYear', true);

        function getIsLeapYear() {
            return isLeapYear(this.year());
        }

        function createDate(y, m, d, h, M, s, ms) {
            // can't just apply() to create a date:
            // https://stackoverflow.com/q/181348
            var date;
            // the date constructor remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
                // preserve leap years using a full 400 year cycle, then reset
                date = new Date(y + 400, m, d, h, M, s, ms);
                if (isFinite(date.getFullYear())) {
                    date.setFullYear(y);
                }
            } else {
                date = new Date(y, m, d, h, M, s, ms);
            }

            return date;
        }

        function createUTCDate(y) {
            var date, args;
            // the Date.UTC function remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
                args = Array.prototype.slice.call(arguments);
                // preserve leap years using a full 400 year cycle, then reset
                args[0] = y + 400;
                date = new Date(Date.UTC.apply(null, args));
                if (isFinite(date.getUTCFullYear())) {
                    date.setUTCFullYear(y);
                }
            } else {
                date = new Date(Date.UTC.apply(null, arguments));
            }

            return date;
        }

        // start-of-first-week - start-of-year
        function firstWeekOffset(year, dow, doy) {
            var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
                fwd = 7 + dow - doy,
                // first-week day local weekday -- which local weekday is fwd
                fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

            return -fwdlw + fwd - 1;
        }

        // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
        function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
            var localWeekday = (7 + weekday - dow) % 7,
                weekOffset = firstWeekOffset(year, dow, doy),
                dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
                resYear,
                resDayOfYear;

            if (dayOfYear <= 0) {
                resYear = year - 1;
                resDayOfYear = daysInYear(resYear) + dayOfYear;
            } else if (dayOfYear > daysInYear(year)) {
                resYear = year + 1;
                resDayOfYear = dayOfYear - daysInYear(year);
            } else {
                resYear = year;
                resDayOfYear = dayOfYear;
            }

            return {
                year: resYear,
                dayOfYear: resDayOfYear,
            };
        }

        function weekOfYear(mom, dow, doy) {
            var weekOffset = firstWeekOffset(mom.year(), dow, doy),
                week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
                resWeek,
                resYear;

            if (week < 1) {
                resYear = mom.year() - 1;
                resWeek = week + weeksInYear(resYear, dow, doy);
            } else if (week > weeksInYear(mom.year(), dow, doy)) {
                resWeek = week - weeksInYear(mom.year(), dow, doy);
                resYear = mom.year() + 1;
            } else {
                resYear = mom.year();
                resWeek = week;
            }

            return {
                week: resWeek,
                year: resYear,
            };
        }

        function weeksInYear(year, dow, doy) {
            var weekOffset = firstWeekOffset(year, dow, doy),
                weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
            return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
        }

        // FORMATTING

        addFormatToken('w', ['ww', 2], 'wo', 'week');
        addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

        // ALIASES

        addUnitAlias('week', 'w');
        addUnitAlias('isoWeek', 'W');

        // PRIORITIES

        addUnitPriority('week', 5);
        addUnitPriority('isoWeek', 5);

        // PARSING

        addRegexToken('w', match1to2);
        addRegexToken('ww', match1to2, match2);
        addRegexToken('W', match1to2);
        addRegexToken('WW', match1to2, match2);

        addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
            input,
            week,
            config,
            token
        ) {
            week[token.substr(0, 1)] = toInt(input);
        });

        // HELPERS

        // LOCALES

        function localeWeek(mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        }

        var defaultLocaleWeek = {
            dow: 0, // Sunday is the first day of the week.
            doy: 6, // The week that contains Jan 6th is the first week of the year.
        };

        function localeFirstDayOfWeek() {
            return this._week.dow;
        }

        function localeFirstDayOfYear() {
            return this._week.doy;
        }

        // MOMENTS

        function getSetWeek(input) {
            var week = this.localeData().week(this);
            return input == null ? week : this.add((input - week) * 7, 'd');
        }

        function getSetISOWeek(input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add((input - week) * 7, 'd');
        }

        // FORMATTING

        addFormatToken('d', 0, 'do', 'day');

        addFormatToken('dd', 0, 0, function (format) {
            return this.localeData().weekdaysMin(this, format);
        });

        addFormatToken('ddd', 0, 0, function (format) {
            return this.localeData().weekdaysShort(this, format);
        });

        addFormatToken('dddd', 0, 0, function (format) {
            return this.localeData().weekdays(this, format);
        });

        addFormatToken('e', 0, 0, 'weekday');
        addFormatToken('E', 0, 0, 'isoWeekday');

        // ALIASES

        addUnitAlias('day', 'd');
        addUnitAlias('weekday', 'e');
        addUnitAlias('isoWeekday', 'E');

        // PRIORITY
        addUnitPriority('day', 11);
        addUnitPriority('weekday', 11);
        addUnitPriority('isoWeekday', 11);

        // PARSING

        addRegexToken('d', match1to2);
        addRegexToken('e', match1to2);
        addRegexToken('E', match1to2);
        addRegexToken('dd', function (isStrict, locale) {
            return locale.weekdaysMinRegex(isStrict);
        });
        addRegexToken('ddd', function (isStrict, locale) {
            return locale.weekdaysShortRegex(isStrict);
        });
        addRegexToken('dddd', function (isStrict, locale) {
            return locale.weekdaysRegex(isStrict);
        });

        addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
            var weekday = config._locale.weekdaysParse(input, token, config._strict);
            // if we didn't get a weekday name, mark the date as invalid
            if (weekday != null) {
                week.d = weekday;
            } else {
                getParsingFlags(config).invalidWeekday = input;
            }
        });

        addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
            week[token] = toInt(input);
        });

        // HELPERS

        function parseWeekday(input, locale) {
            if (typeof input !== 'string') {
                return input;
            }

            if (!isNaN(input)) {
                return parseInt(input, 10);
            }

            input = locale.weekdaysParse(input);
            if (typeof input === 'number') {
                return input;
            }

            return null;
        }

        function parseIsoWeekday(input, locale) {
            if (typeof input === 'string') {
                return locale.weekdaysParse(input) % 7 || 7;
            }
            return isNaN(input) ? null : input;
        }

        // LOCALES
        function shiftWeekdays(ws, n) {
            return ws.slice(n, 7).concat(ws.slice(0, n));
        }

        var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
                '_'
            ),
            defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
            defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
            defaultWeekdaysRegex = matchWord,
            defaultWeekdaysShortRegex = matchWord,
            defaultWeekdaysMinRegex = matchWord;

        function localeWeekdays(m, format) {
            var weekdays = isArray(this._weekdays)
                ? this._weekdays
                : this._weekdays[
                      m && m !== true && this._weekdays.isFormat.test(format)
                          ? 'format'
                          : 'standalone'
                  ];
            return m === true
                ? shiftWeekdays(weekdays, this._week.dow)
                : m
                ? weekdays[m.day()]
                : weekdays;
        }

        function localeWeekdaysShort(m) {
            return m === true
                ? shiftWeekdays(this._weekdaysShort, this._week.dow)
                : m
                ? this._weekdaysShort[m.day()]
                : this._weekdaysShort;
        }

        function localeWeekdaysMin(m) {
            return m === true
                ? shiftWeekdays(this._weekdaysMin, this._week.dow)
                : m
                ? this._weekdaysMin[m.day()]
                : this._weekdaysMin;
        }

        function handleStrictParse$1(weekdayName, format, strict) {
            var i,
                ii,
                mom,
                llc = weekdayName.toLocaleLowerCase();
            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
                this._shortWeekdaysParse = [];
                this._minWeekdaysParse = [];

                for (i = 0; i < 7; ++i) {
                    mom = createUTC([2000, 1]).day(i);
                    this._minWeekdaysParse[i] = this.weekdaysMin(
                        mom,
                        ''
                    ).toLocaleLowerCase();
                    this._shortWeekdaysParse[i] = this.weekdaysShort(
                        mom,
                        ''
                    ).toLocaleLowerCase();
                    this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
                }
            }

            if (strict) {
                if (format === 'dddd') {
                    ii = indexOf.call(this._weekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                } else if (format === 'ddd') {
                    ii = indexOf.call(this._shortWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                } else {
                    ii = indexOf.call(this._minWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                }
            } else {
                if (format === 'dddd') {
                    ii = indexOf.call(this._weekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._shortWeekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._minWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                } else if (format === 'ddd') {
                    ii = indexOf.call(this._shortWeekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._weekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._minWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                } else {
                    ii = indexOf.call(this._minWeekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._weekdaysParse, llc);
                    if (ii !== -1) {
                        return ii;
                    }
                    ii = indexOf.call(this._shortWeekdaysParse, llc);
                    return ii !== -1 ? ii : null;
                }
            }
        }

        function localeWeekdaysParse(weekdayName, format, strict) {
            var i, mom, regex;

            if (this._weekdaysParseExact) {
                return handleStrictParse$1.call(this, weekdayName, format, strict);
            }

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
                this._minWeekdaysParse = [];
                this._shortWeekdaysParse = [];
                this._fullWeekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already

                mom = createUTC([2000, 1]).day(i);
                if (strict && !this._fullWeekdaysParse[i]) {
                    this._fullWeekdaysParse[i] = new RegExp(
                        '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                        'i'
                    );
                    this._shortWeekdaysParse[i] = new RegExp(
                        '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                        'i'
                    );
                    this._minWeekdaysParse[i] = new RegExp(
                        '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                        'i'
                    );
                }
                if (!this._weekdaysParse[i]) {
                    regex =
                        '^' +
                        this.weekdays(mom, '') +
                        '|^' +
                        this.weekdaysShort(mom, '') +
                        '|^' +
                        this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (
                    strict &&
                    format === 'dddd' &&
                    this._fullWeekdaysParse[i].test(weekdayName)
                ) {
                    return i;
                } else if (
                    strict &&
                    format === 'ddd' &&
                    this._shortWeekdaysParse[i].test(weekdayName)
                ) {
                    return i;
                } else if (
                    strict &&
                    format === 'dd' &&
                    this._minWeekdaysParse[i].test(weekdayName)
                ) {
                    return i;
                } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        }

        // MOMENTS

        function getSetDayOfWeek(input) {
            if (!this.isValid()) {
                return input != null ? this : NaN;
            }
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.localeData());
                return this.add(input - day, 'd');
            } else {
                return day;
            }
        }

        function getSetLocaleDayOfWeek(input) {
            if (!this.isValid()) {
                return input != null ? this : NaN;
            }
            var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return input == null ? weekday : this.add(input - weekday, 'd');
        }

        function getSetISODayOfWeek(input) {
            if (!this.isValid()) {
                return input != null ? this : NaN;
            }

            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.

            if (input != null) {
                var weekday = parseIsoWeekday(input, this.localeData());
                return this.day(this.day() % 7 ? weekday : weekday - 7);
            } else {
                return this.day() || 7;
            }
        }

        function weekdaysRegex(isStrict) {
            if (this._weekdaysParseExact) {
                if (!hasOwnProp(this, '_weekdaysRegex')) {
                    computeWeekdaysParse.call(this);
                }
                if (isStrict) {
                    return this._weekdaysStrictRegex;
                } else {
                    return this._weekdaysRegex;
                }
            } else {
                if (!hasOwnProp(this, '_weekdaysRegex')) {
                    this._weekdaysRegex = defaultWeekdaysRegex;
                }
                return this._weekdaysStrictRegex && isStrict
                    ? this._weekdaysStrictRegex
                    : this._weekdaysRegex;
            }
        }

        function weekdaysShortRegex(isStrict) {
            if (this._weekdaysParseExact) {
                if (!hasOwnProp(this, '_weekdaysRegex')) {
                    computeWeekdaysParse.call(this);
                }
                if (isStrict) {
                    return this._weekdaysShortStrictRegex;
                } else {
                    return this._weekdaysShortRegex;
                }
            } else {
                if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                    this._weekdaysShortRegex = defaultWeekdaysShortRegex;
                }
                return this._weekdaysShortStrictRegex && isStrict
                    ? this._weekdaysShortStrictRegex
                    : this._weekdaysShortRegex;
            }
        }

        function weekdaysMinRegex(isStrict) {
            if (this._weekdaysParseExact) {
                if (!hasOwnProp(this, '_weekdaysRegex')) {
                    computeWeekdaysParse.call(this);
                }
                if (isStrict) {
                    return this._weekdaysMinStrictRegex;
                } else {
                    return this._weekdaysMinRegex;
                }
            } else {
                if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                    this._weekdaysMinRegex = defaultWeekdaysMinRegex;
                }
                return this._weekdaysMinStrictRegex && isStrict
                    ? this._weekdaysMinStrictRegex
                    : this._weekdaysMinRegex;
            }
        }

        function computeWeekdaysParse() {
            function cmpLenRev(a, b) {
                return b.length - a.length;
            }

            var minPieces = [],
                shortPieces = [],
                longPieces = [],
                mixedPieces = [],
                i,
                mom,
                minp,
                shortp,
                longp;
            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                mom = createUTC([2000, 1]).day(i);
                minp = regexEscape(this.weekdaysMin(mom, ''));
                shortp = regexEscape(this.weekdaysShort(mom, ''));
                longp = regexEscape(this.weekdays(mom, ''));
                minPieces.push(minp);
                shortPieces.push(shortp);
                longPieces.push(longp);
                mixedPieces.push(minp);
                mixedPieces.push(shortp);
                mixedPieces.push(longp);
            }
            // Sorting makes sure if one weekday (or abbr) is a prefix of another it
            // will match the longer piece.
            minPieces.sort(cmpLenRev);
            shortPieces.sort(cmpLenRev);
            longPieces.sort(cmpLenRev);
            mixedPieces.sort(cmpLenRev);

            this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
            this._weekdaysShortRegex = this._weekdaysRegex;
            this._weekdaysMinRegex = this._weekdaysRegex;

            this._weekdaysStrictRegex = new RegExp(
                '^(' + longPieces.join('|') + ')',
                'i'
            );
            this._weekdaysShortStrictRegex = new RegExp(
                '^(' + shortPieces.join('|') + ')',
                'i'
            );
            this._weekdaysMinStrictRegex = new RegExp(
                '^(' + minPieces.join('|') + ')',
                'i'
            );
        }

        // FORMATTING

        function hFormat() {
            return this.hours() % 12 || 12;
        }

        function kFormat() {
            return this.hours() || 24;
        }

        addFormatToken('H', ['HH', 2], 0, 'hour');
        addFormatToken('h', ['hh', 2], 0, hFormat);
        addFormatToken('k', ['kk', 2], 0, kFormat);

        addFormatToken('hmm', 0, 0, function () {
            return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
        });

        addFormatToken('hmmss', 0, 0, function () {
            return (
                '' +
                hFormat.apply(this) +
                zeroFill(this.minutes(), 2) +
                zeroFill(this.seconds(), 2)
            );
        });

        addFormatToken('Hmm', 0, 0, function () {
            return '' + this.hours() + zeroFill(this.minutes(), 2);
        });

        addFormatToken('Hmmss', 0, 0, function () {
            return (
                '' +
                this.hours() +
                zeroFill(this.minutes(), 2) +
                zeroFill(this.seconds(), 2)
            );
        });

        function meridiem(token, lowercase) {
            addFormatToken(token, 0, 0, function () {
                return this.localeData().meridiem(
                    this.hours(),
                    this.minutes(),
                    lowercase
                );
            });
        }

        meridiem('a', true);
        meridiem('A', false);

        // ALIASES

        addUnitAlias('hour', 'h');

        // PRIORITY
        addUnitPriority('hour', 13);

        // PARSING

        function matchMeridiem(isStrict, locale) {
            return locale._meridiemParse;
        }

        addRegexToken('a', matchMeridiem);
        addRegexToken('A', matchMeridiem);
        addRegexToken('H', match1to2);
        addRegexToken('h', match1to2);
        addRegexToken('k', match1to2);
        addRegexToken('HH', match1to2, match2);
        addRegexToken('hh', match1to2, match2);
        addRegexToken('kk', match1to2, match2);

        addRegexToken('hmm', match3to4);
        addRegexToken('hmmss', match5to6);
        addRegexToken('Hmm', match3to4);
        addRegexToken('Hmmss', match5to6);

        addParseToken(['H', 'HH'], HOUR);
        addParseToken(['k', 'kk'], function (input, array, config) {
            var kInput = toInt(input);
            array[HOUR] = kInput === 24 ? 0 : kInput;
        });
        addParseToken(['a', 'A'], function (input, array, config) {
            config._isPm = config._locale.isPM(input);
            config._meridiem = input;
        });
        addParseToken(['h', 'hh'], function (input, array, config) {
            array[HOUR] = toInt(input);
            getParsingFlags(config).bigHour = true;
        });
        addParseToken('hmm', function (input, array, config) {
            var pos = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos));
            array[MINUTE] = toInt(input.substr(pos));
            getParsingFlags(config).bigHour = true;
        });
        addParseToken('hmmss', function (input, array, config) {
            var pos1 = input.length - 4,
                pos2 = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos1));
            array[MINUTE] = toInt(input.substr(pos1, 2));
            array[SECOND] = toInt(input.substr(pos2));
            getParsingFlags(config).bigHour = true;
        });
        addParseToken('Hmm', function (input, array, config) {
            var pos = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos));
            array[MINUTE] = toInt(input.substr(pos));
        });
        addParseToken('Hmmss', function (input, array, config) {
            var pos1 = input.length - 4,
                pos2 = input.length - 2;
            array[HOUR] = toInt(input.substr(0, pos1));
            array[MINUTE] = toInt(input.substr(pos1, 2));
            array[SECOND] = toInt(input.substr(pos2));
        });

        // LOCALES

        function localeIsPM(input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return (input + '').toLowerCase().charAt(0) === 'p';
        }

        var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
            // Setting the hour should keep the time, because the user explicitly
            // specified which hour they want. So trying to maintain the same hour (in
            // a new timezone) makes sense. Adding/subtracting hours does not follow
            // this rule.
            getSetHour = makeGetSet('Hours', true);

        function localeMeridiem(hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        }

        var baseConfig = {
            calendar: defaultCalendar,
            longDateFormat: defaultLongDateFormat,
            invalidDate: defaultInvalidDate,
            ordinal: defaultOrdinal,
            dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
            relativeTime: defaultRelativeTime,

            months: defaultLocaleMonths,
            monthsShort: defaultLocaleMonthsShort,

            week: defaultLocaleWeek,

            weekdays: defaultLocaleWeekdays,
            weekdaysMin: defaultLocaleWeekdaysMin,
            weekdaysShort: defaultLocaleWeekdaysShort,

            meridiemParse: defaultLocaleMeridiemParse,
        };

        // internal storage for locale config files
        var locales = {},
            localeFamilies = {},
            globalLocale;

        function commonPrefix(arr1, arr2) {
            var i,
                minl = Math.min(arr1.length, arr2.length);
            for (i = 0; i < minl; i += 1) {
                if (arr1[i] !== arr2[i]) {
                    return i;
                }
            }
            return minl;
        }

        function normalizeLocale(key) {
            return key ? key.toLowerCase().replace('_', '-') : key;
        }

        // pick the locale from the array
        // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        function chooseLocale(names) {
            var i = 0,
                j,
                next,
                locale,
                split;

            while (i < names.length) {
                split = normalizeLocale(names[i]).split('-');
                j = split.length;
                next = normalizeLocale(names[i + 1]);
                next = next ? next.split('-') : null;
                while (j > 0) {
                    locale = loadLocale(split.slice(0, j).join('-'));
                    if (locale) {
                        return locale;
                    }
                    if (
                        next &&
                        next.length >= j &&
                        commonPrefix(split, next) >= j - 1
                    ) {
                        //the next array item is better than a shallower substring of this one
                        break;
                    }
                    j--;
                }
                i++;
            }
            return globalLocale;
        }

        function loadLocale(name) {
            var oldLocale = null,
                aliasedRequire;
            // TODO: Find a better way to register and load all the locales in Node
            if (
                locales[name] === undefined &&
                'object' !== 'undefined' &&
                module &&
                module.exports
            ) {
                try {
                    oldLocale = globalLocale._abbr;
                    aliasedRequire = commonjsRequire;
                    aliasedRequire('./locale/' + name);
                    getSetGlobalLocale(oldLocale);
                } catch (e) {
                    // mark as not found to avoid repeating expensive file require call causing high CPU
                    // when trying to find en-US, en_US, en-us for every format call
                    locales[name] = null; // null means not found
                }
            }
            return locales[name];
        }

        // This function will load locale and then set the global locale.  If
        // no arguments are passed in, it will simply return the current global
        // locale key.
        function getSetGlobalLocale(key, values) {
            var data;
            if (key) {
                if (isUndefined(values)) {
                    data = getLocale(key);
                } else {
                    data = defineLocale(key, values);
                }

                if (data) {
                    // moment.duration._locale = moment._locale = data;
                    globalLocale = data;
                } else {
                    if (typeof console !== 'undefined' && console.warn) {
                        //warn user if arguments are passed but the locale could not be set
                        console.warn(
                            'Locale ' + key + ' not found. Did you forget to load it?'
                        );
                    }
                }
            }

            return globalLocale._abbr;
        }

        function defineLocale(name, config) {
            if (config !== null) {
                var locale,
                    parentConfig = baseConfig;
                config.abbr = name;
                if (locales[name] != null) {
                    deprecateSimple(
                        'defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                            'an existing locale. moment.defineLocale(localeName, ' +
                            'config) should only be used for creating a new locale ' +
                            'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                    );
                    parentConfig = locales[name]._config;
                } else if (config.parentLocale != null) {
                    if (locales[config.parentLocale] != null) {
                        parentConfig = locales[config.parentLocale]._config;
                    } else {
                        locale = loadLocale(config.parentLocale);
                        if (locale != null) {
                            parentConfig = locale._config;
                        } else {
                            if (!localeFamilies[config.parentLocale]) {
                                localeFamilies[config.parentLocale] = [];
                            }
                            localeFamilies[config.parentLocale].push({
                                name: name,
                                config: config,
                            });
                            return null;
                        }
                    }
                }
                locales[name] = new Locale(mergeConfigs(parentConfig, config));

                if (localeFamilies[name]) {
                    localeFamilies[name].forEach(function (x) {
                        defineLocale(x.name, x.config);
                    });
                }

                // backwards compat for now: also set the locale
                // make sure we set the locale AFTER all child locales have been
                // created, so we won't end up with the child locale set.
                getSetGlobalLocale(name);

                return locales[name];
            } else {
                // useful for testing
                delete locales[name];
                return null;
            }
        }

        function updateLocale(name, config) {
            if (config != null) {
                var locale,
                    tmpLocale,
                    parentConfig = baseConfig;

                if (locales[name] != null && locales[name].parentLocale != null) {
                    // Update existing child locale in-place to avoid memory-leaks
                    locales[name].set(mergeConfigs(locales[name]._config, config));
                } else {
                    // MERGE
                    tmpLocale = loadLocale(name);
                    if (tmpLocale != null) {
                        parentConfig = tmpLocale._config;
                    }
                    config = mergeConfigs(parentConfig, config);
                    if (tmpLocale == null) {
                        // updateLocale is called for creating a new locale
                        // Set abbr so it will have a name (getters return
                        // undefined otherwise).
                        config.abbr = name;
                    }
                    locale = new Locale(config);
                    locale.parentLocale = locales[name];
                    locales[name] = locale;
                }

                // backwards compat for now: also set the locale
                getSetGlobalLocale(name);
            } else {
                // pass null for config to unupdate, useful for tests
                if (locales[name] != null) {
                    if (locales[name].parentLocale != null) {
                        locales[name] = locales[name].parentLocale;
                        if (name === getSetGlobalLocale()) {
                            getSetGlobalLocale(name);
                        }
                    } else if (locales[name] != null) {
                        delete locales[name];
                    }
                }
            }
            return locales[name];
        }

        // returns locale data
        function getLocale(key) {
            var locale;

            if (key && key._locale && key._locale._abbr) {
                key = key._locale._abbr;
            }

            if (!key) {
                return globalLocale;
            }

            if (!isArray(key)) {
                //short-circuit everything else
                locale = loadLocale(key);
                if (locale) {
                    return locale;
                }
                key = [key];
            }

            return chooseLocale(key);
        }

        function listLocales() {
            return keys(locales);
        }

        function checkOverflow(m) {
            var overflow,
                a = m._a;

            if (a && getParsingFlags(m).overflow === -2) {
                overflow =
                    a[MONTH] < 0 || a[MONTH] > 11
                        ? MONTH
                        : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                        ? DATE
                        : a[HOUR] < 0 ||
                          a[HOUR] > 24 ||
                          (a[HOUR] === 24 &&
                              (a[MINUTE] !== 0 ||
                                  a[SECOND] !== 0 ||
                                  a[MILLISECOND] !== 0))
                        ? HOUR
                        : a[MINUTE] < 0 || a[MINUTE] > 59
                        ? MINUTE
                        : a[SECOND] < 0 || a[SECOND] > 59
                        ? SECOND
                        : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                        ? MILLISECOND
                        : -1;

                if (
                    getParsingFlags(m)._overflowDayOfYear &&
                    (overflow < YEAR || overflow > DATE)
                ) {
                    overflow = DATE;
                }
                if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                    overflow = WEEK;
                }
                if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                    overflow = WEEKDAY;
                }

                getParsingFlags(m).overflow = overflow;
            }

            return m;
        }

        // iso 8601 regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
        var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
            tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
            isoDates = [
                ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
                ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
                ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
                ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
                ['YYYY-DDD', /\d{4}-\d{3}/],
                ['YYYY-MM', /\d{4}-\d\d/, false],
                ['YYYYYYMMDD', /[+-]\d{10}/],
                ['YYYYMMDD', /\d{8}/],
                ['GGGG[W]WWE', /\d{4}W\d{3}/],
                ['GGGG[W]WW', /\d{4}W\d{2}/, false],
                ['YYYYDDD', /\d{7}/],
                ['YYYYMM', /\d{6}/, false],
                ['YYYY', /\d{4}/, false],
            ],
            // iso time formats and regexes
            isoTimes = [
                ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
                ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
                ['HH:mm:ss', /\d\d:\d\d:\d\d/],
                ['HH:mm', /\d\d:\d\d/],
                ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
                ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
                ['HHmmss', /\d\d\d\d\d\d/],
                ['HHmm', /\d\d\d\d/],
                ['HH', /\d\d/],
            ],
            aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
            // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
            rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
            obsOffsets = {
                UT: 0,
                GMT: 0,
                EDT: -4 * 60,
                EST: -5 * 60,
                CDT: -5 * 60,
                CST: -6 * 60,
                MDT: -6 * 60,
                MST: -7 * 60,
                PDT: -7 * 60,
                PST: -8 * 60,
            };

        // date from iso format
        function configFromISO(config) {
            var i,
                l,
                string = config._i,
                match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
                allowTime,
                dateFormat,
                timeFormat,
                tzFormat;

            if (match) {
                getParsingFlags(config).iso = true;

                for (i = 0, l = isoDates.length; i < l; i++) {
                    if (isoDates[i][1].exec(match[1])) {
                        dateFormat = isoDates[i][0];
                        allowTime = isoDates[i][2] !== false;
                        break;
                    }
                }
                if (dateFormat == null) {
                    config._isValid = false;
                    return;
                }
                if (match[3]) {
                    for (i = 0, l = isoTimes.length; i < l; i++) {
                        if (isoTimes[i][1].exec(match[3])) {
                            // match[2] should be 'T' or space
                            timeFormat = (match[2] || ' ') + isoTimes[i][0];
                            break;
                        }
                    }
                    if (timeFormat == null) {
                        config._isValid = false;
                        return;
                    }
                }
                if (!allowTime && timeFormat != null) {
                    config._isValid = false;
                    return;
                }
                if (match[4]) {
                    if (tzRegex.exec(match[4])) {
                        tzFormat = 'Z';
                    } else {
                        config._isValid = false;
                        return;
                    }
                }
                config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
                configFromStringAndFormat(config);
            } else {
                config._isValid = false;
            }
        }

        function extractFromRFC2822Strings(
            yearStr,
            monthStr,
            dayStr,
            hourStr,
            minuteStr,
            secondStr
        ) {
            var result = [
                untruncateYear(yearStr),
                defaultLocaleMonthsShort.indexOf(monthStr),
                parseInt(dayStr, 10),
                parseInt(hourStr, 10),
                parseInt(minuteStr, 10),
            ];

            if (secondStr) {
                result.push(parseInt(secondStr, 10));
            }

            return result;
        }

        function untruncateYear(yearStr) {
            var year = parseInt(yearStr, 10);
            if (year <= 49) {
                return 2000 + year;
            } else if (year <= 999) {
                return 1900 + year;
            }
            return year;
        }

        function preprocessRFC2822(s) {
            // Remove comments and folding whitespace and replace multiple-spaces with a single space
            return s
                .replace(/\([^)]*\)|[\n\t]/g, ' ')
                .replace(/(\s\s+)/g, ' ')
                .replace(/^\s\s*/, '')
                .replace(/\s\s*$/, '');
        }

        function checkWeekday(weekdayStr, parsedInput, config) {
            if (weekdayStr) {
                // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
                var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                    weekdayActual = new Date(
                        parsedInput[0],
                        parsedInput[1],
                        parsedInput[2]
                    ).getDay();
                if (weekdayProvided !== weekdayActual) {
                    getParsingFlags(config).weekdayMismatch = true;
                    config._isValid = false;
                    return false;
                }
            }
            return true;
        }

        function calculateOffset(obsOffset, militaryOffset, numOffset) {
            if (obsOffset) {
                return obsOffsets[obsOffset];
            } else if (militaryOffset) {
                // the only allowed military tz is Z
                return 0;
            } else {
                var hm = parseInt(numOffset, 10),
                    m = hm % 100,
                    h = (hm - m) / 100;
                return h * 60 + m;
            }
        }

        // date and time from ref 2822 format
        function configFromRFC2822(config) {
            var match = rfc2822.exec(preprocessRFC2822(config._i)),
                parsedArray;
            if (match) {
                parsedArray = extractFromRFC2822Strings(
                    match[4],
                    match[3],
                    match[2],
                    match[5],
                    match[6],
                    match[7]
                );
                if (!checkWeekday(match[1], parsedArray, config)) {
                    return;
                }

                config._a = parsedArray;
                config._tzm = calculateOffset(match[8], match[9], match[10]);

                config._d = createUTCDate.apply(null, config._a);
                config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

                getParsingFlags(config).rfc2822 = true;
            } else {
                config._isValid = false;
            }
        }

        // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
        function configFromString(config) {
            var matched = aspNetJsonRegex.exec(config._i);
            if (matched !== null) {
                config._d = new Date(+matched[1]);
                return;
            }

            configFromISO(config);
            if (config._isValid === false) {
                delete config._isValid;
            } else {
                return;
            }

            configFromRFC2822(config);
            if (config._isValid === false) {
                delete config._isValid;
            } else {
                return;
            }

            if (config._strict) {
                config._isValid = false;
            } else {
                // Final attempt, use Input Fallback
                hooks.createFromInputFallback(config);
            }
        }

        hooks.createFromInputFallback = deprecate(
            'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
                'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
                'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
            function (config) {
                config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
            }
        );

        // Pick the first defined of two or three arguments.
        function defaults(a, b, c) {
            if (a != null) {
                return a;
            }
            if (b != null) {
                return b;
            }
            return c;
        }

        function currentDateArray(config) {
            // hooks is actually the exported moment object
            var nowValue = new Date(hooks.now());
            if (config._useUTC) {
                return [
                    nowValue.getUTCFullYear(),
                    nowValue.getUTCMonth(),
                    nowValue.getUTCDate(),
                ];
            }
            return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
        }

        // convert an array to a date.
        // the array should mirror the parameters below
        // note: all values past the year are optional and will default to the lowest possible value.
        // [year, month, day , hour, minute, second, millisecond]
        function configFromArray(config) {
            var i,
                date,
                input = [],
                currentDate,
                expectedWeekday,
                yearToUse;

            if (config._d) {
                return;
            }

            currentDate = currentDateArray(config);

            //compute day of the year from weeks and weekdays
            if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
                dayOfYearFromWeekInfo(config);
            }

            //if the day of the year is set, figure out what it is
            if (config._dayOfYear != null) {
                yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

                if (
                    config._dayOfYear > daysInYear(yearToUse) ||
                    config._dayOfYear === 0
                ) {
                    getParsingFlags(config)._overflowDayOfYear = true;
                }

                date = createUTCDate(yearToUse, 0, config._dayOfYear);
                config._a[MONTH] = date.getUTCMonth();
                config._a[DATE] = date.getUTCDate();
            }

            // Default to current date.
            // * if no year, month, day of month are given, default to today
            // * if day of month is given, default month and year
            // * if month is given, default only year
            // * if year is given, don't default anything
            for (i = 0; i < 3 && config._a[i] == null; ++i) {
                config._a[i] = input[i] = currentDate[i];
            }

            // Zero out whatever was not defaulted, including time
            for (; i < 7; i++) {
                config._a[i] = input[i] =
                    config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
            }

            // Check for 24:00:00.000
            if (
                config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0
            ) {
                config._nextDay = true;
                config._a[HOUR] = 0;
            }

            config._d = (config._useUTC ? createUTCDate : createDate).apply(
                null,
                input
            );
            expectedWeekday = config._useUTC
                ? config._d.getUTCDay()
                : config._d.getDay();

            // Apply timezone offset from input. The actual utcOffset can be changed
            // with parseZone.
            if (config._tzm != null) {
                config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
            }

            if (config._nextDay) {
                config._a[HOUR] = 24;
            }

            // check for mismatching day of week
            if (
                config._w &&
                typeof config._w.d !== 'undefined' &&
                config._w.d !== expectedWeekday
            ) {
                getParsingFlags(config).weekdayMismatch = true;
            }
        }

        function dayOfYearFromWeekInfo(config) {
            var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                dow = 1;
                doy = 4;

                // TODO: We need to take the current isoWeekYear, but that depends on
                // how we interpret now (local, utc, fixed offset). So create
                // a now version of current config (take local/utc/offset flags, and
                // create now).
                weekYear = defaults(
                    w.GG,
                    config._a[YEAR],
                    weekOfYear(createLocal(), 1, 4).year
                );
                week = defaults(w.W, 1);
                weekday = defaults(w.E, 1);
                if (weekday < 1 || weekday > 7) {
                    weekdayOverflow = true;
                }
            } else {
                dow = config._locale._week.dow;
                doy = config._locale._week.doy;

                curWeek = weekOfYear(createLocal(), dow, doy);

                weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

                // Default to current week.
                week = defaults(w.w, curWeek.week);

                if (w.d != null) {
                    // weekday -- low day numbers are considered next week
                    weekday = w.d;
                    if (weekday < 0 || weekday > 6) {
                        weekdayOverflow = true;
                    }
                } else if (w.e != null) {
                    // local weekday -- counting starts from beginning of week
                    weekday = w.e + dow;
                    if (w.e < 0 || w.e > 6) {
                        weekdayOverflow = true;
                    }
                } else {
                    // default to beginning of week
                    weekday = dow;
                }
            }
            if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
                getParsingFlags(config)._overflowWeeks = true;
            } else if (weekdayOverflow != null) {
                getParsingFlags(config)._overflowWeekday = true;
            } else {
                temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
                config._a[YEAR] = temp.year;
                config._dayOfYear = temp.dayOfYear;
            }
        }

        // constant that refers to the ISO standard
        hooks.ISO_8601 = function () {};

        // constant that refers to the RFC 2822 form
        hooks.RFC_2822 = function () {};

        // date from string and format string
        function configFromStringAndFormat(config) {
            // TODO: Move this to another part of the creation flow to prevent circular deps
            if (config._f === hooks.ISO_8601) {
                configFromISO(config);
                return;
            }
            if (config._f === hooks.RFC_2822) {
                configFromRFC2822(config);
                return;
            }
            config._a = [];
            getParsingFlags(config).empty = true;

            // This array is used to make a Date, either with `new Date` or `Date.UTC`
            var string = '' + config._i,
                i,
                parsedInput,
                tokens,
                token,
                skipped,
                stringLength = string.length,
                totalParsedInputLength = 0,
                era;

            tokens =
                expandFormat(config._f, config._locale).match(formattingTokens) || [];

            for (i = 0; i < tokens.length; i++) {
                token = tokens[i];
                parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                    [])[0];
                if (parsedInput) {
                    skipped = string.substr(0, string.indexOf(parsedInput));
                    if (skipped.length > 0) {
                        getParsingFlags(config).unusedInput.push(skipped);
                    }
                    string = string.slice(
                        string.indexOf(parsedInput) + parsedInput.length
                    );
                    totalParsedInputLength += parsedInput.length;
                }
                // don't parse if it's not a known token
                if (formatTokenFunctions[token]) {
                    if (parsedInput) {
                        getParsingFlags(config).empty = false;
                    } else {
                        getParsingFlags(config).unusedTokens.push(token);
                    }
                    addTimeToArrayFromToken(token, parsedInput, config);
                } else if (config._strict && !parsedInput) {
                    getParsingFlags(config).unusedTokens.push(token);
                }
            }

            // add remaining unparsed input length to the string
            getParsingFlags(config).charsLeftOver =
                stringLength - totalParsedInputLength;
            if (string.length > 0) {
                getParsingFlags(config).unusedInput.push(string);
            }

            // clear _12h flag if hour is <= 12
            if (
                config._a[HOUR] <= 12 &&
                getParsingFlags(config).bigHour === true &&
                config._a[HOUR] > 0
            ) {
                getParsingFlags(config).bigHour = undefined;
            }

            getParsingFlags(config).parsedDateParts = config._a.slice(0);
            getParsingFlags(config).meridiem = config._meridiem;
            // handle meridiem
            config._a[HOUR] = meridiemFixWrap(
                config._locale,
                config._a[HOUR],
                config._meridiem
            );

            // handle era
            era = getParsingFlags(config).era;
            if (era !== null) {
                config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
            }

            configFromArray(config);
            checkOverflow(config);
        }

        function meridiemFixWrap(locale, hour, meridiem) {
            var isPm;

            if (meridiem == null) {
                // nothing to do
                return hour;
            }
            if (locale.meridiemHour != null) {
                return locale.meridiemHour(hour, meridiem);
            } else if (locale.isPM != null) {
                // Fallback
                isPm = locale.isPM(meridiem);
                if (isPm && hour < 12) {
                    hour += 12;
                }
                if (!isPm && hour === 12) {
                    hour = 0;
                }
                return hour;
            } else {
                // this is not supposed to happen
                return hour;
            }
        }

        // date from string and array of format strings
        function configFromStringAndArray(config) {
            var tempConfig,
                bestMoment,
                scoreToBeat,
                i,
                currentScore,
                validFormatFound,
                bestFormatIsValid = false;

            if (config._f.length === 0) {
                getParsingFlags(config).invalidFormat = true;
                config._d = new Date(NaN);
                return;
            }

            for (i = 0; i < config._f.length; i++) {
                currentScore = 0;
                validFormatFound = false;
                tempConfig = copyConfig({}, config);
                if (config._useUTC != null) {
                    tempConfig._useUTC = config._useUTC;
                }
                tempConfig._f = config._f[i];
                configFromStringAndFormat(tempConfig);

                if (isValid(tempConfig)) {
                    validFormatFound = true;
                }

                // if there is any input that was not parsed add a penalty for that format
                currentScore += getParsingFlags(tempConfig).charsLeftOver;

                //or tokens
                currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

                getParsingFlags(tempConfig).score = currentScore;

                if (!bestFormatIsValid) {
                    if (
                        scoreToBeat == null ||
                        currentScore < scoreToBeat ||
                        validFormatFound
                    ) {
                        scoreToBeat = currentScore;
                        bestMoment = tempConfig;
                        if (validFormatFound) {
                            bestFormatIsValid = true;
                        }
                    }
                } else {
                    if (currentScore < scoreToBeat) {
                        scoreToBeat = currentScore;
                        bestMoment = tempConfig;
                    }
                }
            }

            extend(config, bestMoment || tempConfig);
        }

        function configFromObject(config) {
            if (config._d) {
                return;
            }

            var i = normalizeObjectUnits(config._i),
                dayOrDate = i.day === undefined ? i.date : i.day;
            config._a = map(
                [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
                function (obj) {
                    return obj && parseInt(obj, 10);
                }
            );

            configFromArray(config);
        }

        function createFromConfig(config) {
            var res = new Moment(checkOverflow(prepareConfig(config)));
            if (res._nextDay) {
                // Adding is smart enough around DST
                res.add(1, 'd');
                res._nextDay = undefined;
            }

            return res;
        }

        function prepareConfig(config) {
            var input = config._i,
                format = config._f;

            config._locale = config._locale || getLocale(config._l);

            if (input === null || (format === undefined && input === '')) {
                return createInvalid({ nullInput: true });
            }

            if (typeof input === 'string') {
                config._i = input = config._locale.preparse(input);
            }

            if (isMoment(input)) {
                return new Moment(checkOverflow(input));
            } else if (isDate(input)) {
                config._d = input;
            } else if (isArray(format)) {
                configFromStringAndArray(config);
            } else if (format) {
                configFromStringAndFormat(config);
            } else {
                configFromInput(config);
            }

            if (!isValid(config)) {
                config._d = null;
            }

            return config;
        }

        function configFromInput(config) {
            var input = config._i;
            if (isUndefined(input)) {
                config._d = new Date(hooks.now());
            } else if (isDate(input)) {
                config._d = new Date(input.valueOf());
            } else if (typeof input === 'string') {
                configFromString(config);
            } else if (isArray(input)) {
                config._a = map(input.slice(0), function (obj) {
                    return parseInt(obj, 10);
                });
                configFromArray(config);
            } else if (isObject(input)) {
                configFromObject(config);
            } else if (isNumber(input)) {
                // from milliseconds
                config._d = new Date(input);
            } else {
                hooks.createFromInputFallback(config);
            }
        }

        function createLocalOrUTC(input, format, locale, strict, isUTC) {
            var c = {};

            if (format === true || format === false) {
                strict = format;
                format = undefined;
            }

            if (locale === true || locale === false) {
                strict = locale;
                locale = undefined;
            }

            if (
                (isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)
            ) {
                input = undefined;
            }
            // object construction must be done this way.
            // https://github.com/moment/moment/issues/1423
            c._isAMomentObject = true;
            c._useUTC = c._isUTC = isUTC;
            c._l = locale;
            c._i = input;
            c._f = format;
            c._strict = strict;

            return createFromConfig(c);
        }

        function createLocal(input, format, locale, strict) {
            return createLocalOrUTC(input, format, locale, strict, false);
        }

        var prototypeMin = deprecate(
                'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
                function () {
                    var other = createLocal.apply(null, arguments);
                    if (this.isValid() && other.isValid()) {
                        return other < this ? this : other;
                    } else {
                        return createInvalid();
                    }
                }
            ),
            prototypeMax = deprecate(
                'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
                function () {
                    var other = createLocal.apply(null, arguments);
                    if (this.isValid() && other.isValid()) {
                        return other > this ? this : other;
                    } else {
                        return createInvalid();
                    }
                }
            );

        // Pick a moment m from moments so that m[fn](other) is true for all
        // other. This relies on the function fn to be transitive.
        //
        // moments should either be an array of moment objects or an array, whose
        // first element is an array of moment objects.
        function pickBy(fn, moments) {
            var res, i;
            if (moments.length === 1 && isArray(moments[0])) {
                moments = moments[0];
            }
            if (!moments.length) {
                return createLocal();
            }
            res = moments[0];
            for (i = 1; i < moments.length; ++i) {
                if (!moments[i].isValid() || moments[i][fn](res)) {
                    res = moments[i];
                }
            }
            return res;
        }

        // TODO: Use [].sort instead?
        function min() {
            var args = [].slice.call(arguments, 0);

            return pickBy('isBefore', args);
        }

        function max() {
            var args = [].slice.call(arguments, 0);

            return pickBy('isAfter', args);
        }

        var now = function () {
            return Date.now ? Date.now() : +new Date();
        };

        var ordering = [
            'year',
            'quarter',
            'month',
            'week',
            'day',
            'hour',
            'minute',
            'second',
            'millisecond',
        ];

        function isDurationValid(m) {
            var key,
                unitHasDecimal = false,
                i;
            for (key in m) {
                if (
                    hasOwnProp(m, key) &&
                    !(
                        indexOf.call(ordering, key) !== -1 &&
                        (m[key] == null || !isNaN(m[key]))
                    )
                ) {
                    return false;
                }
            }

            for (i = 0; i < ordering.length; ++i) {
                if (m[ordering[i]]) {
                    if (unitHasDecimal) {
                        return false; // only allow non-integers for smallest unit
                    }
                    if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                        unitHasDecimal = true;
                    }
                }
            }

            return true;
        }

        function isValid$1() {
            return this._isValid;
        }

        function createInvalid$1() {
            return createDuration(NaN);
        }

        function Duration(duration) {
            var normalizedInput = normalizeObjectUnits(duration),
                years = normalizedInput.year || 0,
                quarters = normalizedInput.quarter || 0,
                months = normalizedInput.month || 0,
                weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
                days = normalizedInput.day || 0,
                hours = normalizedInput.hour || 0,
                minutes = normalizedInput.minute || 0,
                seconds = normalizedInput.second || 0,
                milliseconds = normalizedInput.millisecond || 0;

            this._isValid = isDurationValid(normalizedInput);

            // representation for dateAddRemove
            this._milliseconds =
                +milliseconds +
                seconds * 1e3 + // 1000
                minutes * 6e4 + // 1000 * 60
                hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
            // Because of dateAddRemove treats 24 hours as different from a
            // day when working around DST, we need to store them separately
            this._days = +days + weeks * 7;
            // It is impossible to translate months into days without knowing
            // which months you are are talking about, so we have to store
            // it separately.
            this._months = +months + quarters * 3 + years * 12;

            this._data = {};

            this._locale = getLocale();

            this._bubble();
        }

        function isDuration(obj) {
            return obj instanceof Duration;
        }

        function absRound(number) {
            if (number < 0) {
                return Math.round(-1 * number) * -1;
            } else {
                return Math.round(number);
            }
        }

        // compare two arrays, return the number of differences
        function compareArrays(array1, array2, dontConvert) {
            var len = Math.min(array1.length, array2.length),
                lengthDiff = Math.abs(array1.length - array2.length),
                diffs = 0,
                i;
            for (i = 0; i < len; i++) {
                if (
                    (dontConvert && array1[i] !== array2[i]) ||
                    (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
                ) {
                    diffs++;
                }
            }
            return diffs + lengthDiff;
        }

        // FORMATTING

        function offset(token, separator) {
            addFormatToken(token, 0, 0, function () {
                var offset = this.utcOffset(),
                    sign = '+';
                if (offset < 0) {
                    offset = -offset;
                    sign = '-';
                }
                return (
                    sign +
                    zeroFill(~~(offset / 60), 2) +
                    separator +
                    zeroFill(~~offset % 60, 2)
                );
            });
        }

        offset('Z', ':');
        offset('ZZ', '');

        // PARSING

        addRegexToken('Z', matchShortOffset);
        addRegexToken('ZZ', matchShortOffset);
        addParseToken(['Z', 'ZZ'], function (input, array, config) {
            config._useUTC = true;
            config._tzm = offsetFromString(matchShortOffset, input);
        });

        // HELPERS

        // timezone chunker
        // '+10:00' > ['10',  '00']
        // '-1530'  > ['-15', '30']
        var chunkOffset = /([\+\-]|\d\d)/gi;

        function offsetFromString(matcher, string) {
            var matches = (string || '').match(matcher),
                chunk,
                parts,
                minutes;

            if (matches === null) {
                return null;
            }

            chunk = matches[matches.length - 1] || [];
            parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
            minutes = +(parts[1] * 60) + toInt(parts[2]);

            return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
        }

        // Return a moment from input, that is local/utc/zone equivalent to model.
        function cloneWithOffset(input, model) {
            var res, diff;
            if (model._isUTC) {
                res = model.clone();
                diff =
                    (isMoment(input) || isDate(input)
                        ? input.valueOf()
                        : createLocal(input).valueOf()) - res.valueOf();
                // Use low-level api, because this fn is low-level api.
                res._d.setTime(res._d.valueOf() + diff);
                hooks.updateOffset(res, false);
                return res;
            } else {
                return createLocal(input).local();
            }
        }

        function getDateOffset(m) {
            // On Firefox.24 Date#getTimezoneOffset returns a floating point.
            // https://github.com/moment/moment/pull/1871
            return -Math.round(m._d.getTimezoneOffset());
        }

        // HOOKS

        // This function will be called whenever a moment is mutated.
        // It is intended to keep the offset in sync with the timezone.
        hooks.updateOffset = function () {};

        // MOMENTS

        // keepLocalTime = true means only change the timezone, without
        // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
        // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
        // +0200, so we adjust the time as needed, to be valid.
        //
        // Keeping the time actually adds/subtracts (one hour)
        // from the actual represented time. That is why we call updateOffset
        // a second time. In case it wants us to change the offset again
        // _changeInProgress == true case, then we have to adjust, because
        // there is no such time in the given timezone.
        function getSetOffset(input, keepLocalTime, keepMinutes) {
            var offset = this._offset || 0,
                localAdjust;
            if (!this.isValid()) {
                return input != null ? this : NaN;
            }
            if (input != null) {
                if (typeof input === 'string') {
                    input = offsetFromString(matchShortOffset, input);
                    if (input === null) {
                        return this;
                    }
                } else if (Math.abs(input) < 16 && !keepMinutes) {
                    input = input * 60;
                }
                if (!this._isUTC && keepLocalTime) {
                    localAdjust = getDateOffset(this);
                }
                this._offset = input;
                this._isUTC = true;
                if (localAdjust != null) {
                    this.add(localAdjust, 'm');
                }
                if (offset !== input) {
                    if (!keepLocalTime || this._changeInProgress) {
                        addSubtract(
                            this,
                            createDuration(input - offset, 'm'),
                            1,
                            false
                        );
                    } else if (!this._changeInProgress) {
                        this._changeInProgress = true;
                        hooks.updateOffset(this, true);
                        this._changeInProgress = null;
                    }
                }
                return this;
            } else {
                return this._isUTC ? offset : getDateOffset(this);
            }
        }

        function getSetZone(input, keepLocalTime) {
            if (input != null) {
                if (typeof input !== 'string') {
                    input = -input;
                }

                this.utcOffset(input, keepLocalTime);

                return this;
            } else {
                return -this.utcOffset();
            }
        }

        function setOffsetToUTC(keepLocalTime) {
            return this.utcOffset(0, keepLocalTime);
        }

        function setOffsetToLocal(keepLocalTime) {
            if (this._isUTC) {
                this.utcOffset(0, keepLocalTime);
                this._isUTC = false;

                if (keepLocalTime) {
                    this.subtract(getDateOffset(this), 'm');
                }
            }
            return this;
        }

        function setOffsetToParsedOffset() {
            if (this._tzm != null) {
                this.utcOffset(this._tzm, false, true);
            } else if (typeof this._i === 'string') {
                var tZone = offsetFromString(matchOffset, this._i);
                if (tZone != null) {
                    this.utcOffset(tZone);
                } else {
                    this.utcOffset(0, true);
                }
            }
            return this;
        }

        function hasAlignedHourOffset(input) {
            if (!this.isValid()) {
                return false;
            }
            input = input ? createLocal(input).utcOffset() : 0;

            return (this.utcOffset() - input) % 60 === 0;
        }

        function isDaylightSavingTime() {
            return (
                this.utcOffset() > this.clone().month(0).utcOffset() ||
                this.utcOffset() > this.clone().month(5).utcOffset()
            );
        }

        function isDaylightSavingTimeShifted() {
            if (!isUndefined(this._isDSTShifted)) {
                return this._isDSTShifted;
            }

            var c = {},
                other;

            copyConfig(c, this);
            c = prepareConfig(c);

            if (c._a) {
                other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
                this._isDSTShifted =
                    this.isValid() && compareArrays(c._a, other.toArray()) > 0;
            } else {
                this._isDSTShifted = false;
            }

            return this._isDSTShifted;
        }

        function isLocal() {
            return this.isValid() ? !this._isUTC : false;
        }

        function isUtcOffset() {
            return this.isValid() ? this._isUTC : false;
        }

        function isUtc() {
            return this.isValid() ? this._isUTC && this._offset === 0 : false;
        }

        // ASP.NET json date format regex
        var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
            // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
            // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
            // and further modified to allow for strings containing both week and day
            isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

        function createDuration(input, key) {
            var duration = input,
                // matching against regexp is expensive, do it on demand
                match = null,
                sign,
                ret,
                diffRes;

            if (isDuration(input)) {
                duration = {
                    ms: input._milliseconds,
                    d: input._days,
                    M: input._months,
                };
            } else if (isNumber(input) || !isNaN(+input)) {
                duration = {};
                if (key) {
                    duration[key] = +input;
                } else {
                    duration.milliseconds = +input;
                }
            } else if ((match = aspNetRegex.exec(input))) {
                sign = match[1] === '-' ? -1 : 1;
                duration = {
                    y: 0,
                    d: toInt(match[DATE]) * sign,
                    h: toInt(match[HOUR]) * sign,
                    m: toInt(match[MINUTE]) * sign,
                    s: toInt(match[SECOND]) * sign,
                    ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
                };
            } else if ((match = isoRegex.exec(input))) {
                sign = match[1] === '-' ? -1 : 1;
                duration = {
                    y: parseIso(match[2], sign),
                    M: parseIso(match[3], sign),
                    w: parseIso(match[4], sign),
                    d: parseIso(match[5], sign),
                    h: parseIso(match[6], sign),
                    m: parseIso(match[7], sign),
                    s: parseIso(match[8], sign),
                };
            } else if (duration == null) {
                // checks for null or undefined
                duration = {};
            } else if (
                typeof duration === 'object' &&
                ('from' in duration || 'to' in duration)
            ) {
                diffRes = momentsDifference(
                    createLocal(duration.from),
                    createLocal(duration.to)
                );

                duration = {};
                duration.ms = diffRes.milliseconds;
                duration.M = diffRes.months;
            }

            ret = new Duration(duration);

            if (isDuration(input) && hasOwnProp(input, '_locale')) {
                ret._locale = input._locale;
            }

            if (isDuration(input) && hasOwnProp(input, '_isValid')) {
                ret._isValid = input._isValid;
            }

            return ret;
        }

        createDuration.fn = Duration.prototype;
        createDuration.invalid = createInvalid$1;

        function parseIso(inp, sign) {
            // We'd normally use ~~inp for this, but unfortunately it also
            // converts floats to ints.
            // inp may be undefined, so careful calling replace on it.
            var res = inp && parseFloat(inp.replace(',', '.'));
            // apply sign while we're at it
            return (isNaN(res) ? 0 : res) * sign;
        }

        function positiveMomentsDifference(base, other) {
            var res = {};

            res.months =
                other.month() - base.month() + (other.year() - base.year()) * 12;
            if (base.clone().add(res.months, 'M').isAfter(other)) {
                --res.months;
            }

            res.milliseconds = +other - +base.clone().add(res.months, 'M');

            return res;
        }

        function momentsDifference(base, other) {
            var res;
            if (!(base.isValid() && other.isValid())) {
                return { milliseconds: 0, months: 0 };
            }

            other = cloneWithOffset(other, base);
            if (base.isBefore(other)) {
                res = positiveMomentsDifference(base, other);
            } else {
                res = positiveMomentsDifference(other, base);
                res.milliseconds = -res.milliseconds;
                res.months = -res.months;
            }

            return res;
        }

        // TODO: remove 'name' arg after deprecation is removed
        function createAdder(direction, name) {
            return function (val, period) {
                var dur, tmp;
                //invert the arguments, but complain about it
                if (period !== null && !isNaN(+period)) {
                    deprecateSimple(
                        name,
                        'moment().' +
                            name +
                            '(period, number) is deprecated. Please use moment().' +
                            name +
                            '(number, period). ' +
                            'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                    );
                    tmp = val;
                    val = period;
                    period = tmp;
                }

                dur = createDuration(val, period);
                addSubtract(this, dur, direction);
                return this;
            };
        }

        function addSubtract(mom, duration, isAdding, updateOffset) {
            var milliseconds = duration._milliseconds,
                days = absRound(duration._days),
                months = absRound(duration._months);

            if (!mom.isValid()) {
                // No op
                return;
            }

            updateOffset = updateOffset == null ? true : updateOffset;

            if (months) {
                setMonth(mom, get(mom, 'Month') + months * isAdding);
            }
            if (days) {
                set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
            }
            if (milliseconds) {
                mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
            }
            if (updateOffset) {
                hooks.updateOffset(mom, days || months);
            }
        }

        var add = createAdder(1, 'add'),
            subtract = createAdder(-1, 'subtract');

        function isString(input) {
            return typeof input === 'string' || input instanceof String;
        }

        // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
        function isMomentInput(input) {
            return (
                isMoment(input) ||
                isDate(input) ||
                isString(input) ||
                isNumber(input) ||
                isNumberOrStringArray(input) ||
                isMomentInputObject(input) ||
                input === null ||
                input === undefined
            );
        }

        function isMomentInputObject(input) {
            var objectTest = isObject(input) && !isObjectEmpty(input),
                propertyTest = false,
                properties = [
                    'years',
                    'year',
                    'y',
                    'months',
                    'month',
                    'M',
                    'days',
                    'day',
                    'd',
                    'dates',
                    'date',
                    'D',
                    'hours',
                    'hour',
                    'h',
                    'minutes',
                    'minute',
                    'm',
                    'seconds',
                    'second',
                    's',
                    'milliseconds',
                    'millisecond',
                    'ms',
                ],
                i,
                property;

            for (i = 0; i < properties.length; i += 1) {
                property = properties[i];
                propertyTest = propertyTest || hasOwnProp(input, property);
            }

            return objectTest && propertyTest;
        }

        function isNumberOrStringArray(input) {
            var arrayTest = isArray(input),
                dataTypeTest = false;
            if (arrayTest) {
                dataTypeTest =
                    input.filter(function (item) {
                        return !isNumber(item) && isString(input);
                    }).length === 0;
            }
            return arrayTest && dataTypeTest;
        }

        function isCalendarSpec(input) {
            var objectTest = isObject(input) && !isObjectEmpty(input),
                propertyTest = false,
                properties = [
                    'sameDay',
                    'nextDay',
                    'lastDay',
                    'nextWeek',
                    'lastWeek',
                    'sameElse',
                ],
                i,
                property;

            for (i = 0; i < properties.length; i += 1) {
                property = properties[i];
                propertyTest = propertyTest || hasOwnProp(input, property);
            }

            return objectTest && propertyTest;
        }

        function getCalendarFormat(myMoment, now) {
            var diff = myMoment.diff(now, 'days', true);
            return diff < -6
                ? 'sameElse'
                : diff < -1
                ? 'lastWeek'
                : diff < 0
                ? 'lastDay'
                : diff < 1
                ? 'sameDay'
                : diff < 2
                ? 'nextDay'
                : diff < 7
                ? 'nextWeek'
                : 'sameElse';
        }

        function calendar$1(time, formats) {
            // Support for single parameter, formats only overload to the calendar function
            if (arguments.length === 1) {
                if (!arguments[0]) {
                    time = undefined;
                    formats = undefined;
                } else if (isMomentInput(arguments[0])) {
                    time = arguments[0];
                    formats = undefined;
                } else if (isCalendarSpec(arguments[0])) {
                    formats = arguments[0];
                    time = undefined;
                }
            }
            // We want to compare the start of today, vs this.
            // Getting start-of-today depends on whether we're local/utc/offset or not.
            var now = time || createLocal(),
                sod = cloneWithOffset(now, this).startOf('day'),
                format = hooks.calendarFormat(this, sod) || 'sameElse',
                output =
                    formats &&
                    (isFunction(formats[format])
                        ? formats[format].call(this, now)
                        : formats[format]);

            return this.format(
                output || this.localeData().calendar(format, this, createLocal(now))
            );
        }

        function clone() {
            return new Moment(this);
        }

        function isAfter(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input);
            if (!(this.isValid() && localInput.isValid())) {
                return false;
            }
            units = normalizeUnits(units) || 'millisecond';
            if (units === 'millisecond') {
                return this.valueOf() > localInput.valueOf();
            } else {
                return localInput.valueOf() < this.clone().startOf(units).valueOf();
            }
        }

        function isBefore(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input);
            if (!(this.isValid() && localInput.isValid())) {
                return false;
            }
            units = normalizeUnits(units) || 'millisecond';
            if (units === 'millisecond') {
                return this.valueOf() < localInput.valueOf();
            } else {
                return this.clone().endOf(units).valueOf() < localInput.valueOf();
            }
        }

        function isBetween(from, to, units, inclusivity) {
            var localFrom = isMoment(from) ? from : createLocal(from),
                localTo = isMoment(to) ? to : createLocal(to);
            if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
                return false;
            }
            inclusivity = inclusivity || '()';
            return (
                (inclusivity[0] === '('
                    ? this.isAfter(localFrom, units)
                    : !this.isBefore(localFrom, units)) &&
                (inclusivity[1] === ')'
                    ? this.isBefore(localTo, units)
                    : !this.isAfter(localTo, units))
            );
        }

        function isSame(input, units) {
            var localInput = isMoment(input) ? input : createLocal(input),
                inputMs;
            if (!(this.isValid() && localInput.isValid())) {
                return false;
            }
            units = normalizeUnits(units) || 'millisecond';
            if (units === 'millisecond') {
                return this.valueOf() === localInput.valueOf();
            } else {
                inputMs = localInput.valueOf();
                return (
                    this.clone().startOf(units).valueOf() <= inputMs &&
                    inputMs <= this.clone().endOf(units).valueOf()
                );
            }
        }

        function isSameOrAfter(input, units) {
            return this.isSame(input, units) || this.isAfter(input, units);
        }

        function isSameOrBefore(input, units) {
            return this.isSame(input, units) || this.isBefore(input, units);
        }

        function diff(input, units, asFloat) {
            var that, zoneDelta, output;

            if (!this.isValid()) {
                return NaN;
            }

            that = cloneWithOffset(input, this);

            if (!that.isValid()) {
                return NaN;
            }

            zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

            units = normalizeUnits(units);

            switch (units) {
                case 'year':
                    output = monthDiff(this, that) / 12;
                    break;
                case 'month':
                    output = monthDiff(this, that);
                    break;
                case 'quarter':
                    output = monthDiff(this, that) / 3;
                    break;
                case 'second':
                    output = (this - that) / 1e3;
                    break; // 1000
                case 'minute':
                    output = (this - that) / 6e4;
                    break; // 1000 * 60
                case 'hour':
                    output = (this - that) / 36e5;
                    break; // 1000 * 60 * 60
                case 'day':
                    output = (this - that - zoneDelta) / 864e5;
                    break; // 1000 * 60 * 60 * 24, negate dst
                case 'week':
                    output = (this - that - zoneDelta) / 6048e5;
                    break; // 1000 * 60 * 60 * 24 * 7, negate dst
                default:
                    output = this - that;
            }

            return asFloat ? output : absFloor(output);
        }

        function monthDiff(a, b) {
            if (a.date() < b.date()) {
                // end-of-month calculations work correct when the start month has more
                // days than the end month.
                return -monthDiff(b, a);
            }
            // difference in months
            var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
                // b is in (anchor - 1 month, anchor + 1 month)
                anchor = a.clone().add(wholeMonthDiff, 'months'),
                anchor2,
                adjust;

            if (b - anchor < 0) {
                anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
                // linear across the month
                adjust = (b - anchor) / (anchor - anchor2);
            } else {
                anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
                // linear across the month
                adjust = (b - anchor) / (anchor2 - anchor);
            }

            //check for negative zero, return zero if negative zero
            return -(wholeMonthDiff + adjust) || 0;
        }

        hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
        hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

        function toString() {
            return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
        }

        function toISOString(keepOffset) {
            if (!this.isValid()) {
                return null;
            }
            var utc = keepOffset !== true,
                m = utc ? this.clone().utc() : this;
            if (m.year() < 0 || m.year() > 9999) {
                return formatMoment(
                    m,
                    utc
                        ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                        : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
                );
            }
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                if (utc) {
                    return this.toDate().toISOString();
                } else {
                    return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                        .toISOString()
                        .replace('Z', formatMoment(m, 'Z'));
                }
            }
            return formatMoment(
                m,
                utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }

        /**
         * Return a human readable representation of a moment that can
         * also be evaluated to get a new moment which is the same
         *
         * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
         */
        function inspect() {
            if (!this.isValid()) {
                return 'moment.invalid(/* ' + this._i + ' */)';
            }
            var func = 'moment',
                zone = '',
                prefix,
                year,
                datetime,
                suffix;
            if (!this.isLocal()) {
                func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
                zone = 'Z';
            }
            prefix = '[' + func + '("]';
            year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
            datetime = '-MM-DD[T]HH:mm:ss.SSS';
            suffix = zone + '[")]';

            return this.format(prefix + year + datetime + suffix);
        }

        function format(inputString) {
            if (!inputString) {
                inputString = this.isUtc()
                    ? hooks.defaultFormatUtc
                    : hooks.defaultFormat;
            }
            var output = formatMoment(this, inputString);
            return this.localeData().postformat(output);
        }

        function from(time, withoutSuffix) {
            if (
                this.isValid() &&
                ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
            ) {
                return createDuration({ to: this, from: time })
                    .locale(this.locale())
                    .humanize(!withoutSuffix);
            } else {
                return this.localeData().invalidDate();
            }
        }

        function fromNow(withoutSuffix) {
            return this.from(createLocal(), withoutSuffix);
        }

        function to(time, withoutSuffix) {
            if (
                this.isValid() &&
                ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
            ) {
                return createDuration({ from: this, to: time })
                    .locale(this.locale())
                    .humanize(!withoutSuffix);
            } else {
                return this.localeData().invalidDate();
            }
        }

        function toNow(withoutSuffix) {
            return this.to(createLocal(), withoutSuffix);
        }

        // If passed a locale key, it will set the locale for this
        // instance.  Otherwise, it will return the locale configuration
        // variables for this instance.
        function locale(key) {
            var newLocaleData;

            if (key === undefined) {
                return this._locale._abbr;
            } else {
                newLocaleData = getLocale(key);
                if (newLocaleData != null) {
                    this._locale = newLocaleData;
                }
                return this;
            }
        }

        var lang = deprecate(
            'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
            function (key) {
                if (key === undefined) {
                    return this.localeData();
                } else {
                    return this.locale(key);
                }
            }
        );

        function localeData() {
            return this._locale;
        }

        var MS_PER_SECOND = 1000,
            MS_PER_MINUTE = 60 * MS_PER_SECOND,
            MS_PER_HOUR = 60 * MS_PER_MINUTE,
            MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

        // actual modulo - handles negative numbers (for dates before 1970):
        function mod$1(dividend, divisor) {
            return ((dividend % divisor) + divisor) % divisor;
        }

        function localStartOfDate(y, m, d) {
            // the date constructor remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
                // preserve leap years using a full 400 year cycle, then reset
                return new Date(y + 400, m, d) - MS_PER_400_YEARS;
            } else {
                return new Date(y, m, d).valueOf();
            }
        }

        function utcStartOfDate(y, m, d) {
            // Date.UTC remaps years 0-99 to 1900-1999
            if (y < 100 && y >= 0) {
                // preserve leap years using a full 400 year cycle, then reset
                return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
            } else {
                return Date.UTC(y, m, d);
            }
        }

        function startOf(units) {
            var time, startOfDate;
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond' || !this.isValid()) {
                return this;
            }

            startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

            switch (units) {
                case 'year':
                    time = startOfDate(this.year(), 0, 1);
                    break;
                case 'quarter':
                    time = startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3),
                        1
                    );
                    break;
                case 'month':
                    time = startOfDate(this.year(), this.month(), 1);
                    break;
                case 'week':
                    time = startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday()
                    );
                    break;
                case 'isoWeek':
                    time = startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1)
                    );
                    break;
                case 'day':
                case 'date':
                    time = startOfDate(this.year(), this.month(), this.date());
                    break;
                case 'hour':
                    time = this._d.valueOf();
                    time -= mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    );
                    break;
                case 'minute':
                    time = this._d.valueOf();
                    time -= mod$1(time, MS_PER_MINUTE);
                    break;
                case 'second':
                    time = this._d.valueOf();
                    time -= mod$1(time, MS_PER_SECOND);
                    break;
            }

            this._d.setTime(time);
            hooks.updateOffset(this, true);
            return this;
        }

        function endOf(units) {
            var time, startOfDate;
            units = normalizeUnits(units);
            if (units === undefined || units === 'millisecond' || !this.isValid()) {
                return this;
            }

            startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

            switch (units) {
                case 'year':
                    time = startOfDate(this.year() + 1, 0, 1) - 1;
                    break;
                case 'quarter':
                    time =
                        startOfDate(
                            this.year(),
                            this.month() - (this.month() % 3) + 3,
                            1
                        ) - 1;
                    break;
                case 'month':
                    time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                    break;
                case 'week':
                    time =
                        startOfDate(
                            this.year(),
                            this.month(),
                            this.date() - this.weekday() + 7
                        ) - 1;
                    break;
                case 'isoWeek':
                    time =
                        startOfDate(
                            this.year(),
                            this.month(),
                            this.date() - (this.isoWeekday() - 1) + 7
                        ) - 1;
                    break;
                case 'day':
                case 'date':
                    time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                    break;
                case 'hour':
                    time = this._d.valueOf();
                    time +=
                        MS_PER_HOUR -
                        mod$1(
                            time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                            MS_PER_HOUR
                        ) -
                        1;
                    break;
                case 'minute':
                    time = this._d.valueOf();
                    time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                    break;
                case 'second':
                    time = this._d.valueOf();
                    time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                    break;
            }

            this._d.setTime(time);
            hooks.updateOffset(this, true);
            return this;
        }

        function valueOf() {
            return this._d.valueOf() - (this._offset || 0) * 60000;
        }

        function unix() {
            return Math.floor(this.valueOf() / 1000);
        }

        function toDate() {
            return new Date(this.valueOf());
        }

        function toArray() {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hour(),
                m.minute(),
                m.second(),
                m.millisecond(),
            ];
        }

        function toObject() {
            var m = this;
            return {
                years: m.year(),
                months: m.month(),
                date: m.date(),
                hours: m.hours(),
                minutes: m.minutes(),
                seconds: m.seconds(),
                milliseconds: m.milliseconds(),
            };
        }

        function toJSON() {
            // new Date(NaN).toJSON() === null
            return this.isValid() ? this.toISOString() : null;
        }

        function isValid$2() {
            return isValid(this);
        }

        function parsingFlags() {
            return extend({}, getParsingFlags(this));
        }

        function invalidAt() {
            return getParsingFlags(this).overflow;
        }

        function creationData() {
            return {
                input: this._i,
                format: this._f,
                locale: this._locale,
                isUTC: this._isUTC,
                strict: this._strict,
            };
        }

        addFormatToken('N', 0, 0, 'eraAbbr');
        addFormatToken('NN', 0, 0, 'eraAbbr');
        addFormatToken('NNN', 0, 0, 'eraAbbr');
        addFormatToken('NNNN', 0, 0, 'eraName');
        addFormatToken('NNNNN', 0, 0, 'eraNarrow');

        addFormatToken('y', ['y', 1], 'yo', 'eraYear');
        addFormatToken('y', ['yy', 2], 0, 'eraYear');
        addFormatToken('y', ['yyy', 3], 0, 'eraYear');
        addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

        addRegexToken('N', matchEraAbbr);
        addRegexToken('NN', matchEraAbbr);
        addRegexToken('NNN', matchEraAbbr);
        addRegexToken('NNNN', matchEraName);
        addRegexToken('NNNNN', matchEraNarrow);

        addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
            input,
            array,
            config,
            token
        ) {
            var era = config._locale.erasParse(input, token, config._strict);
            if (era) {
                getParsingFlags(config).era = era;
            } else {
                getParsingFlags(config).invalidEra = input;
            }
        });

        addRegexToken('y', matchUnsigned);
        addRegexToken('yy', matchUnsigned);
        addRegexToken('yyy', matchUnsigned);
        addRegexToken('yyyy', matchUnsigned);
        addRegexToken('yo', matchEraYearOrdinal);

        addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
        addParseToken(['yo'], function (input, array, config, token) {
            var match;
            if (config._locale._eraYearOrdinalRegex) {
                match = input.match(config._locale._eraYearOrdinalRegex);
            }

            if (config._locale.eraYearOrdinalParse) {
                array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
            } else {
                array[YEAR] = parseInt(input, 10);
            }
        });

        function localeEras(m, format) {
            var i,
                l,
                date,
                eras = this._eras || getLocale('en')._eras;
            for (i = 0, l = eras.length; i < l; ++i) {
                switch (typeof eras[i].since) {
                    case 'string':
                        // truncate time
                        date = hooks(eras[i].since).startOf('day');
                        eras[i].since = date.valueOf();
                        break;
                }

                switch (typeof eras[i].until) {
                    case 'undefined':
                        eras[i].until = +Infinity;
                        break;
                    case 'string':
                        // truncate time
                        date = hooks(eras[i].until).startOf('day').valueOf();
                        eras[i].until = date.valueOf();
                        break;
                }
            }
            return eras;
        }

        function localeErasParse(eraName, format, strict) {
            var i,
                l,
                eras = this.eras(),
                name,
                abbr,
                narrow;
            eraName = eraName.toUpperCase();

            for (i = 0, l = eras.length; i < l; ++i) {
                name = eras[i].name.toUpperCase();
                abbr = eras[i].abbr.toUpperCase();
                narrow = eras[i].narrow.toUpperCase();

                if (strict) {
                    switch (format) {
                        case 'N':
                        case 'NN':
                        case 'NNN':
                            if (abbr === eraName) {
                                return eras[i];
                            }
                            break;

                        case 'NNNN':
                            if (name === eraName) {
                                return eras[i];
                            }
                            break;

                        case 'NNNNN':
                            if (narrow === eraName) {
                                return eras[i];
                            }
                            break;
                    }
                } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                    return eras[i];
                }
            }
        }

        function localeErasConvertYear(era, year) {
            var dir = era.since <= era.until ? +1 : -1;
            if (year === undefined) {
                return hooks(era.since).year();
            } else {
                return hooks(era.since).year() + (year - era.offset) * dir;
            }
        }

        function getEraName() {
            var i,
                l,
                val,
                eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
                // truncate time
                val = this.clone().startOf('day').valueOf();

                if (eras[i].since <= val && val <= eras[i].until) {
                    return eras[i].name;
                }
                if (eras[i].until <= val && val <= eras[i].since) {
                    return eras[i].name;
                }
            }

            return '';
        }

        function getEraNarrow() {
            var i,
                l,
                val,
                eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
                // truncate time
                val = this.clone().startOf('day').valueOf();

                if (eras[i].since <= val && val <= eras[i].until) {
                    return eras[i].narrow;
                }
                if (eras[i].until <= val && val <= eras[i].since) {
                    return eras[i].narrow;
                }
            }

            return '';
        }

        function getEraAbbr() {
            var i,
                l,
                val,
                eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
                // truncate time
                val = this.clone().startOf('day').valueOf();

                if (eras[i].since <= val && val <= eras[i].until) {
                    return eras[i].abbr;
                }
                if (eras[i].until <= val && val <= eras[i].since) {
                    return eras[i].abbr;
                }
            }

            return '';
        }

        function getEraYear() {
            var i,
                l,
                dir,
                val,
                eras = this.localeData().eras();
            for (i = 0, l = eras.length; i < l; ++i) {
                dir = eras[i].since <= eras[i].until ? +1 : -1;

                // truncate time
                val = this.clone().startOf('day').valueOf();

                if (
                    (eras[i].since <= val && val <= eras[i].until) ||
                    (eras[i].until <= val && val <= eras[i].since)
                ) {
                    return (
                        (this.year() - hooks(eras[i].since).year()) * dir +
                        eras[i].offset
                    );
                }
            }

            return this.year();
        }

        function erasNameRegex(isStrict) {
            if (!hasOwnProp(this, '_erasNameRegex')) {
                computeErasParse.call(this);
            }
            return isStrict ? this._erasNameRegex : this._erasRegex;
        }

        function erasAbbrRegex(isStrict) {
            if (!hasOwnProp(this, '_erasAbbrRegex')) {
                computeErasParse.call(this);
            }
            return isStrict ? this._erasAbbrRegex : this._erasRegex;
        }

        function erasNarrowRegex(isStrict) {
            if (!hasOwnProp(this, '_erasNarrowRegex')) {
                computeErasParse.call(this);
            }
            return isStrict ? this._erasNarrowRegex : this._erasRegex;
        }

        function matchEraAbbr(isStrict, locale) {
            return locale.erasAbbrRegex(isStrict);
        }

        function matchEraName(isStrict, locale) {
            return locale.erasNameRegex(isStrict);
        }

        function matchEraNarrow(isStrict, locale) {
            return locale.erasNarrowRegex(isStrict);
        }

        function matchEraYearOrdinal(isStrict, locale) {
            return locale._eraYearOrdinalRegex || matchUnsigned;
        }

        function computeErasParse() {
            var abbrPieces = [],
                namePieces = [],
                narrowPieces = [],
                mixedPieces = [],
                i,
                l,
                eras = this.eras();

            for (i = 0, l = eras.length; i < l; ++i) {
                namePieces.push(regexEscape(eras[i].name));
                abbrPieces.push(regexEscape(eras[i].abbr));
                narrowPieces.push(regexEscape(eras[i].narrow));

                mixedPieces.push(regexEscape(eras[i].name));
                mixedPieces.push(regexEscape(eras[i].abbr));
                mixedPieces.push(regexEscape(eras[i].narrow));
            }

            this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
            this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
            this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
            this._erasNarrowRegex = new RegExp(
                '^(' + narrowPieces.join('|') + ')',
                'i'
            );
        }

        // FORMATTING

        addFormatToken(0, ['gg', 2], 0, function () {
            return this.weekYear() % 100;
        });

        addFormatToken(0, ['GG', 2], 0, function () {
            return this.isoWeekYear() % 100;
        });

        function addWeekYearFormatToken(token, getter) {
            addFormatToken(0, [token, token.length], 0, getter);
        }

        addWeekYearFormatToken('gggg', 'weekYear');
        addWeekYearFormatToken('ggggg', 'weekYear');
        addWeekYearFormatToken('GGGG', 'isoWeekYear');
        addWeekYearFormatToken('GGGGG', 'isoWeekYear');

        // ALIASES

        addUnitAlias('weekYear', 'gg');
        addUnitAlias('isoWeekYear', 'GG');

        // PRIORITY

        addUnitPriority('weekYear', 1);
        addUnitPriority('isoWeekYear', 1);

        // PARSING

        addRegexToken('G', matchSigned);
        addRegexToken('g', matchSigned);
        addRegexToken('GG', match1to2, match2);
        addRegexToken('gg', match1to2, match2);
        addRegexToken('GGGG', match1to4, match4);
        addRegexToken('gggg', match1to4, match4);
        addRegexToken('GGGGG', match1to6, match6);
        addRegexToken('ggggg', match1to6, match6);

        addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
            input,
            week,
            config,
            token
        ) {
            week[token.substr(0, 2)] = toInt(input);
        });

        addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
            week[token] = hooks.parseTwoDigitYear(input);
        });

        // MOMENTS

        function getSetWeekYear(input) {
            return getSetWeekYearHelper.call(
                this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy
            );
        }

        function getSetISOWeekYear(input) {
            return getSetWeekYearHelper.call(
                this,
                input,
                this.isoWeek(),
                this.isoWeekday(),
                1,
                4
            );
        }

        function getISOWeeksInYear() {
            return weeksInYear(this.year(), 1, 4);
        }

        function getISOWeeksInISOWeekYear() {
            return weeksInYear(this.isoWeekYear(), 1, 4);
        }

        function getWeeksInYear() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
        }

        function getWeeksInWeekYear() {
            var weekInfo = this.localeData()._week;
            return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
        }

        function getSetWeekYearHelper(input, week, weekday, dow, doy) {
            var weeksTarget;
            if (input == null) {
                return weekOfYear(this, dow, doy).year;
            } else {
                weeksTarget = weeksInYear(input, dow, doy);
                if (week > weeksTarget) {
                    week = weeksTarget;
                }
                return setWeekAll.call(this, input, week, weekday, dow, doy);
            }
        }

        function setWeekAll(weekYear, week, weekday, dow, doy) {
            var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
                date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

            this.year(date.getUTCFullYear());
            this.month(date.getUTCMonth());
            this.date(date.getUTCDate());
            return this;
        }

        // FORMATTING

        addFormatToken('Q', 0, 'Qo', 'quarter');

        // ALIASES

        addUnitAlias('quarter', 'Q');

        // PRIORITY

        addUnitPriority('quarter', 7);

        // PARSING

        addRegexToken('Q', match1);
        addParseToken('Q', function (input, array) {
            array[MONTH] = (toInt(input) - 1) * 3;
        });

        // MOMENTS

        function getSetQuarter(input) {
            return input == null
                ? Math.ceil((this.month() + 1) / 3)
                : this.month((input - 1) * 3 + (this.month() % 3));
        }

        // FORMATTING

        addFormatToken('D', ['DD', 2], 'Do', 'date');

        // ALIASES

        addUnitAlias('date', 'D');

        // PRIORITY
        addUnitPriority('date', 9);

        // PARSING

        addRegexToken('D', match1to2);
        addRegexToken('DD', match1to2, match2);
        addRegexToken('Do', function (isStrict, locale) {
            // TODO: Remove "ordinalParse" fallback in next major release.
            return isStrict
                ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
                : locale._dayOfMonthOrdinalParseLenient;
        });

        addParseToken(['D', 'DD'], DATE);
        addParseToken('Do', function (input, array) {
            array[DATE] = toInt(input.match(match1to2)[0]);
        });

        // MOMENTS

        var getSetDayOfMonth = makeGetSet('Date', true);

        // FORMATTING

        addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

        // ALIASES

        addUnitAlias('dayOfYear', 'DDD');

        // PRIORITY
        addUnitPriority('dayOfYear', 4);

        // PARSING

        addRegexToken('DDD', match1to3);
        addRegexToken('DDDD', match3);
        addParseToken(['DDD', 'DDDD'], function (input, array, config) {
            config._dayOfYear = toInt(input);
        });

        // HELPERS

        // MOMENTS

        function getSetDayOfYear(input) {
            var dayOfYear =
                Math.round(
                    (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
                ) + 1;
            return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
        }

        // FORMATTING

        addFormatToken('m', ['mm', 2], 0, 'minute');

        // ALIASES

        addUnitAlias('minute', 'm');

        // PRIORITY

        addUnitPriority('minute', 14);

        // PARSING

        addRegexToken('m', match1to2);
        addRegexToken('mm', match1to2, match2);
        addParseToken(['m', 'mm'], MINUTE);

        // MOMENTS

        var getSetMinute = makeGetSet('Minutes', false);

        // FORMATTING

        addFormatToken('s', ['ss', 2], 0, 'second');

        // ALIASES

        addUnitAlias('second', 's');

        // PRIORITY

        addUnitPriority('second', 15);

        // PARSING

        addRegexToken('s', match1to2);
        addRegexToken('ss', match1to2, match2);
        addParseToken(['s', 'ss'], SECOND);

        // MOMENTS

        var getSetSecond = makeGetSet('Seconds', false);

        // FORMATTING

        addFormatToken('S', 0, 0, function () {
            return ~~(this.millisecond() / 100);
        });

        addFormatToken(0, ['SS', 2], 0, function () {
            return ~~(this.millisecond() / 10);
        });

        addFormatToken(0, ['SSS', 3], 0, 'millisecond');
        addFormatToken(0, ['SSSS', 4], 0, function () {
            return this.millisecond() * 10;
        });
        addFormatToken(0, ['SSSSS', 5], 0, function () {
            return this.millisecond() * 100;
        });
        addFormatToken(0, ['SSSSSS', 6], 0, function () {
            return this.millisecond() * 1000;
        });
        addFormatToken(0, ['SSSSSSS', 7], 0, function () {
            return this.millisecond() * 10000;
        });
        addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
            return this.millisecond() * 100000;
        });
        addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
            return this.millisecond() * 1000000;
        });

        // ALIASES

        addUnitAlias('millisecond', 'ms');

        // PRIORITY

        addUnitPriority('millisecond', 16);

        // PARSING

        addRegexToken('S', match1to3, match1);
        addRegexToken('SS', match1to3, match2);
        addRegexToken('SSS', match1to3, match3);

        var token, getSetMillisecond;
        for (token = 'SSSS'; token.length <= 9; token += 'S') {
            addRegexToken(token, matchUnsigned);
        }

        function parseMs(input, array) {
            array[MILLISECOND] = toInt(('0.' + input) * 1000);
        }

        for (token = 'S'; token.length <= 9; token += 'S') {
            addParseToken(token, parseMs);
        }

        getSetMillisecond = makeGetSet('Milliseconds', false);

        // FORMATTING

        addFormatToken('z', 0, 0, 'zoneAbbr');
        addFormatToken('zz', 0, 0, 'zoneName');

        // MOMENTS

        function getZoneAbbr() {
            return this._isUTC ? 'UTC' : '';
        }

        function getZoneName() {
            return this._isUTC ? 'Coordinated Universal Time' : '';
        }

        var proto = Moment.prototype;

        proto.add = add;
        proto.calendar = calendar$1;
        proto.clone = clone;
        proto.diff = diff;
        proto.endOf = endOf;
        proto.format = format;
        proto.from = from;
        proto.fromNow = fromNow;
        proto.to = to;
        proto.toNow = toNow;
        proto.get = stringGet;
        proto.invalidAt = invalidAt;
        proto.isAfter = isAfter;
        proto.isBefore = isBefore;
        proto.isBetween = isBetween;
        proto.isSame = isSame;
        proto.isSameOrAfter = isSameOrAfter;
        proto.isSameOrBefore = isSameOrBefore;
        proto.isValid = isValid$2;
        proto.lang = lang;
        proto.locale = locale;
        proto.localeData = localeData;
        proto.max = prototypeMax;
        proto.min = prototypeMin;
        proto.parsingFlags = parsingFlags;
        proto.set = stringSet;
        proto.startOf = startOf;
        proto.subtract = subtract;
        proto.toArray = toArray;
        proto.toObject = toObject;
        proto.toDate = toDate;
        proto.toISOString = toISOString;
        proto.inspect = inspect;
        if (typeof Symbol !== 'undefined' && Symbol.for != null) {
            proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
                return 'Moment<' + this.format() + '>';
            };
        }
        proto.toJSON = toJSON;
        proto.toString = toString;
        proto.unix = unix;
        proto.valueOf = valueOf;
        proto.creationData = creationData;
        proto.eraName = getEraName;
        proto.eraNarrow = getEraNarrow;
        proto.eraAbbr = getEraAbbr;
        proto.eraYear = getEraYear;
        proto.year = getSetYear;
        proto.isLeapYear = getIsLeapYear;
        proto.weekYear = getSetWeekYear;
        proto.isoWeekYear = getSetISOWeekYear;
        proto.quarter = proto.quarters = getSetQuarter;
        proto.month = getSetMonth;
        proto.daysInMonth = getDaysInMonth;
        proto.week = proto.weeks = getSetWeek;
        proto.isoWeek = proto.isoWeeks = getSetISOWeek;
        proto.weeksInYear = getWeeksInYear;
        proto.weeksInWeekYear = getWeeksInWeekYear;
        proto.isoWeeksInYear = getISOWeeksInYear;
        proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
        proto.date = getSetDayOfMonth;
        proto.day = proto.days = getSetDayOfWeek;
        proto.weekday = getSetLocaleDayOfWeek;
        proto.isoWeekday = getSetISODayOfWeek;
        proto.dayOfYear = getSetDayOfYear;
        proto.hour = proto.hours = getSetHour;
        proto.minute = proto.minutes = getSetMinute;
        proto.second = proto.seconds = getSetSecond;
        proto.millisecond = proto.milliseconds = getSetMillisecond;
        proto.utcOffset = getSetOffset;
        proto.utc = setOffsetToUTC;
        proto.local = setOffsetToLocal;
        proto.parseZone = setOffsetToParsedOffset;
        proto.hasAlignedHourOffset = hasAlignedHourOffset;
        proto.isDST = isDaylightSavingTime;
        proto.isLocal = isLocal;
        proto.isUtcOffset = isUtcOffset;
        proto.isUtc = isUtc;
        proto.isUTC = isUtc;
        proto.zoneAbbr = getZoneAbbr;
        proto.zoneName = getZoneName;
        proto.dates = deprecate(
            'dates accessor is deprecated. Use date instead.',
            getSetDayOfMonth
        );
        proto.months = deprecate(
            'months accessor is deprecated. Use month instead',
            getSetMonth
        );
        proto.years = deprecate(
            'years accessor is deprecated. Use year instead',
            getSetYear
        );
        proto.zone = deprecate(
            'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
            getSetZone
        );
        proto.isDSTShifted = deprecate(
            'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
            isDaylightSavingTimeShifted
        );

        function createUnix(input) {
            return createLocal(input * 1000);
        }

        function createInZone() {
            return createLocal.apply(null, arguments).parseZone();
        }

        function preParsePostFormat(string) {
            return string;
        }

        var proto$1 = Locale.prototype;

        proto$1.calendar = calendar;
        proto$1.longDateFormat = longDateFormat;
        proto$1.invalidDate = invalidDate;
        proto$1.ordinal = ordinal;
        proto$1.preparse = preParsePostFormat;
        proto$1.postformat = preParsePostFormat;
        proto$1.relativeTime = relativeTime;
        proto$1.pastFuture = pastFuture;
        proto$1.set = set;
        proto$1.eras = localeEras;
        proto$1.erasParse = localeErasParse;
        proto$1.erasConvertYear = localeErasConvertYear;
        proto$1.erasAbbrRegex = erasAbbrRegex;
        proto$1.erasNameRegex = erasNameRegex;
        proto$1.erasNarrowRegex = erasNarrowRegex;

        proto$1.months = localeMonths;
        proto$1.monthsShort = localeMonthsShort;
        proto$1.monthsParse = localeMonthsParse;
        proto$1.monthsRegex = monthsRegex;
        proto$1.monthsShortRegex = monthsShortRegex;
        proto$1.week = localeWeek;
        proto$1.firstDayOfYear = localeFirstDayOfYear;
        proto$1.firstDayOfWeek = localeFirstDayOfWeek;

        proto$1.weekdays = localeWeekdays;
        proto$1.weekdaysMin = localeWeekdaysMin;
        proto$1.weekdaysShort = localeWeekdaysShort;
        proto$1.weekdaysParse = localeWeekdaysParse;

        proto$1.weekdaysRegex = weekdaysRegex;
        proto$1.weekdaysShortRegex = weekdaysShortRegex;
        proto$1.weekdaysMinRegex = weekdaysMinRegex;

        proto$1.isPM = localeIsPM;
        proto$1.meridiem = localeMeridiem;

        function get$1(format, index, field, setter) {
            var locale = getLocale(),
                utc = createUTC().set(setter, index);
            return locale[field](utc, format);
        }

        function listMonthsImpl(format, index, field) {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';

            if (index != null) {
                return get$1(format, index, field, 'month');
            }

            var i,
                out = [];
            for (i = 0; i < 12; i++) {
                out[i] = get$1(format, i, field, 'month');
            }
            return out;
        }

        // ()
        // (5)
        // (fmt, 5)
        // (fmt)
        // (true)
        // (true, 5)
        // (true, fmt, 5)
        // (true, fmt)
        function listWeekdaysImpl(localeSorted, format, index, field) {
            if (typeof localeSorted === 'boolean') {
                if (isNumber(format)) {
                    index = format;
                    format = undefined;
                }

                format = format || '';
            } else {
                format = localeSorted;
                index = format;
                localeSorted = false;

                if (isNumber(format)) {
                    index = format;
                    format = undefined;
                }

                format = format || '';
            }

            var locale = getLocale(),
                shift = localeSorted ? locale._week.dow : 0,
                i,
                out = [];

            if (index != null) {
                return get$1(format, (index + shift) % 7, field, 'day');
            }

            for (i = 0; i < 7; i++) {
                out[i] = get$1(format, (i + shift) % 7, field, 'day');
            }
            return out;
        }

        function listMonths(format, index) {
            return listMonthsImpl(format, index, 'months');
        }

        function listMonthsShort(format, index) {
            return listMonthsImpl(format, index, 'monthsShort');
        }

        function listWeekdays(localeSorted, format, index) {
            return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
        }

        function listWeekdaysShort(localeSorted, format, index) {
            return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
        }

        function listWeekdaysMin(localeSorted, format, index) {
            return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
        }

        getSetGlobalLocale('en', {
            eras: [
                {
                    since: '0001-01-01',
                    until: +Infinity,
                    offset: 1,
                    name: 'Anno Domini',
                    narrow: 'AD',
                    abbr: 'AD',
                },
                {
                    since: '0000-12-31',
                    until: -Infinity,
                    offset: 1,
                    name: 'Before Christ',
                    narrow: 'BC',
                    abbr: 'BC',
                },
            ],
            dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
            ordinal: function (number) {
                var b = number % 10,
                    output =
                        toInt((number % 100) / 10) === 1
                            ? 'th'
                            : b === 1
                            ? 'st'
                            : b === 2
                            ? 'nd'
                            : b === 3
                            ? 'rd'
                            : 'th';
                return number + output;
            },
        });

        // Side effect imports

        hooks.lang = deprecate(
            'moment.lang is deprecated. Use moment.locale instead.',
            getSetGlobalLocale
        );
        hooks.langData = deprecate(
            'moment.langData is deprecated. Use moment.localeData instead.',
            getLocale
        );

        var mathAbs = Math.abs;

        function abs() {
            var data = this._data;

            this._milliseconds = mathAbs(this._milliseconds);
            this._days = mathAbs(this._days);
            this._months = mathAbs(this._months);

            data.milliseconds = mathAbs(data.milliseconds);
            data.seconds = mathAbs(data.seconds);
            data.minutes = mathAbs(data.minutes);
            data.hours = mathAbs(data.hours);
            data.months = mathAbs(data.months);
            data.years = mathAbs(data.years);

            return this;
        }

        function addSubtract$1(duration, input, value, direction) {
            var other = createDuration(input, value);

            duration._milliseconds += direction * other._milliseconds;
            duration._days += direction * other._days;
            duration._months += direction * other._months;

            return duration._bubble();
        }

        // supports only 2.0-style add(1, 's') or add(duration)
        function add$1(input, value) {
            return addSubtract$1(this, input, value, 1);
        }

        // supports only 2.0-style subtract(1, 's') or subtract(duration)
        function subtract$1(input, value) {
            return addSubtract$1(this, input, value, -1);
        }

        function absCeil(number) {
            if (number < 0) {
                return Math.floor(number);
            } else {
                return Math.ceil(number);
            }
        }

        function bubble() {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds,
                minutes,
                hours,
                years,
                monthsFromDays;

            // if we have a mix of positive and negative values, bubble down first
            // check: https://github.com/moment/moment/issues/2166
            if (
                !(
                    (milliseconds >= 0 && days >= 0 && months >= 0) ||
                    (milliseconds <= 0 && days <= 0 && months <= 0)
                )
            ) {
                milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
                days = 0;
                months = 0;
            }

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absFloor(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absFloor(seconds / 60);
            data.minutes = minutes % 60;

            hours = absFloor(minutes / 60);
            data.hours = hours % 24;

            days += absFloor(hours / 24);

            // convert days to months
            monthsFromDays = absFloor(daysToMonths(days));
            months += monthsFromDays;
            days -= absCeil(monthsToDays(monthsFromDays));

            // 12 months -> 1 year
            years = absFloor(months / 12);
            months %= 12;

            data.days = days;
            data.months = months;
            data.years = years;

            return this;
        }

        function daysToMonths(days) {
            // 400 years have 146097 days (taking into account leap year rules)
            // 400 years have 12 months === 4800
            return (days * 4800) / 146097;
        }

        function monthsToDays(months) {
            // the reverse of daysToMonths
            return (months * 146097) / 4800;
        }

        function as(units) {
            if (!this.isValid()) {
                return NaN;
            }
            var days,
                months,
                milliseconds = this._milliseconds;

            units = normalizeUnits(units);

            if (units === 'month' || units === 'quarter' || units === 'year') {
                days = this._days + milliseconds / 864e5;
                months = this._months + daysToMonths(days);
                switch (units) {
                    case 'month':
                        return months;
                    case 'quarter':
                        return months / 3;
                    case 'year':
                        return months / 12;
                }
            } else {
                // handle milliseconds separately because of floating point math errors (issue #1867)
                days = this._days + Math.round(monthsToDays(this._months));
                switch (units) {
                    case 'week':
                        return days / 7 + milliseconds / 6048e5;
                    case 'day':
                        return days + milliseconds / 864e5;
                    case 'hour':
                        return days * 24 + milliseconds / 36e5;
                    case 'minute':
                        return days * 1440 + milliseconds / 6e4;
                    case 'second':
                        return days * 86400 + milliseconds / 1000;
                    // Math.floor prevents floating point math errors here
                    case 'millisecond':
                        return Math.floor(days * 864e5) + milliseconds;
                    default:
                        throw new Error('Unknown unit ' + units);
                }
            }
        }

        // TODO: Use this.as('ms')?
        function valueOf$1() {
            if (!this.isValid()) {
                return NaN;
            }
            return (
                this._milliseconds +
                this._days * 864e5 +
                (this._months % 12) * 2592e6 +
                toInt(this._months / 12) * 31536e6
            );
        }

        function makeAs(alias) {
            return function () {
                return this.as(alias);
            };
        }

        var asMilliseconds = makeAs('ms'),
            asSeconds = makeAs('s'),
            asMinutes = makeAs('m'),
            asHours = makeAs('h'),
            asDays = makeAs('d'),
            asWeeks = makeAs('w'),
            asMonths = makeAs('M'),
            asQuarters = makeAs('Q'),
            asYears = makeAs('y');

        function clone$1() {
            return createDuration(this);
        }

        function get$2(units) {
            units = normalizeUnits(units);
            return this.isValid() ? this[units + 's']() : NaN;
        }

        function makeGetter(name) {
            return function () {
                return this.isValid() ? this._data[name] : NaN;
            };
        }

        var milliseconds = makeGetter('milliseconds'),
            seconds = makeGetter('seconds'),
            minutes = makeGetter('minutes'),
            hours = makeGetter('hours'),
            days = makeGetter('days'),
            months = makeGetter('months'),
            years = makeGetter('years');

        function weeks() {
            return absFloor(this.days() / 7);
        }

        var round = Math.round,
            thresholds = {
                ss: 44, // a few seconds to seconds
                s: 45, // seconds to minute
                m: 45, // minutes to hour
                h: 22, // hours to day
                d: 26, // days to month/week
                w: null, // weeks to month
                M: 11, // months to year
            };

        // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
        function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
            return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
        }

        function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
            var duration = createDuration(posNegDuration).abs(),
                seconds = round(duration.as('s')),
                minutes = round(duration.as('m')),
                hours = round(duration.as('h')),
                days = round(duration.as('d')),
                months = round(duration.as('M')),
                weeks = round(duration.as('w')),
                years = round(duration.as('y')),
                a =
                    (seconds <= thresholds.ss && ['s', seconds]) ||
                    (seconds < thresholds.s && ['ss', seconds]) ||
                    (minutes <= 1 && ['m']) ||
                    (minutes < thresholds.m && ['mm', minutes]) ||
                    (hours <= 1 && ['h']) ||
                    (hours < thresholds.h && ['hh', hours]) ||
                    (days <= 1 && ['d']) ||
                    (days < thresholds.d && ['dd', days]);

            if (thresholds.w != null) {
                a =
                    a ||
                    (weeks <= 1 && ['w']) ||
                    (weeks < thresholds.w && ['ww', weeks]);
            }
            a = a ||
                (months <= 1 && ['M']) ||
                (months < thresholds.M && ['MM', months]) ||
                (years <= 1 && ['y']) || ['yy', years];

            a[2] = withoutSuffix;
            a[3] = +posNegDuration > 0;
            a[4] = locale;
            return substituteTimeAgo.apply(null, a);
        }

        // This function allows you to set the rounding function for relative time strings
        function getSetRelativeTimeRounding(roundingFunction) {
            if (roundingFunction === undefined) {
                return round;
            }
            if (typeof roundingFunction === 'function') {
                round = roundingFunction;
                return true;
            }
            return false;
        }

        // This function allows you to set a threshold for relative time strings
        function getSetRelativeTimeThreshold(threshold, limit) {
            if (thresholds[threshold] === undefined) {
                return false;
            }
            if (limit === undefined) {
                return thresholds[threshold];
            }
            thresholds[threshold] = limit;
            if (threshold === 's') {
                thresholds.ss = limit - 1;
            }
            return true;
        }

        function humanize(argWithSuffix, argThresholds) {
            if (!this.isValid()) {
                return this.localeData().invalidDate();
            }

            var withSuffix = false,
                th = thresholds,
                locale,
                output;

            if (typeof argWithSuffix === 'object') {
                argThresholds = argWithSuffix;
                argWithSuffix = false;
            }
            if (typeof argWithSuffix === 'boolean') {
                withSuffix = argWithSuffix;
            }
            if (typeof argThresholds === 'object') {
                th = Object.assign({}, thresholds, argThresholds);
                if (argThresholds.s != null && argThresholds.ss == null) {
                    th.ss = argThresholds.s - 1;
                }
            }

            locale = this.localeData();
            output = relativeTime$1(this, !withSuffix, th, locale);

            if (withSuffix) {
                output = locale.pastFuture(+this, output);
            }

            return locale.postformat(output);
        }

        var abs$1 = Math.abs;

        function sign(x) {
            return (x > 0) - (x < 0) || +x;
        }

        function toISOString$1() {
            // for ISO strings we do not use the normal bubbling rules:
            //  * milliseconds bubble up until they become hours
            //  * days do not bubble at all
            //  * months bubble up until they become years
            // This is because there is no context-free conversion between hours and days
            // (think of clock changes)
            // and also not between days and months (28-31 days per month)
            if (!this.isValid()) {
                return this.localeData().invalidDate();
            }

            var seconds = abs$1(this._milliseconds) / 1000,
                days = abs$1(this._days),
                months = abs$1(this._months),
                minutes,
                hours,
                years,
                s,
                total = this.asSeconds(),
                totalSign,
                ymSign,
                daysSign,
                hmsSign;

            if (!total) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            // 3600 seconds -> 60 minutes -> 1 hour
            minutes = absFloor(seconds / 60);
            hours = absFloor(minutes / 60);
            seconds %= 60;
            minutes %= 60;

            // 12 months -> 1 year
            years = absFloor(months / 12);
            months %= 12;

            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

            totalSign = total < 0 ? '-' : '';
            ymSign = sign(this._months) !== sign(total) ? '-' : '';
            daysSign = sign(this._days) !== sign(total) ? '-' : '';
            hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

            return (
                totalSign +
                'P' +
                (years ? ymSign + years + 'Y' : '') +
                (months ? ymSign + months + 'M' : '') +
                (days ? daysSign + days + 'D' : '') +
                (hours || minutes || seconds ? 'T' : '') +
                (hours ? hmsSign + hours + 'H' : '') +
                (minutes ? hmsSign + minutes + 'M' : '') +
                (seconds ? hmsSign + s + 'S' : '')
            );
        }

        var proto$2 = Duration.prototype;

        proto$2.isValid = isValid$1;
        proto$2.abs = abs;
        proto$2.add = add$1;
        proto$2.subtract = subtract$1;
        proto$2.as = as;
        proto$2.asMilliseconds = asMilliseconds;
        proto$2.asSeconds = asSeconds;
        proto$2.asMinutes = asMinutes;
        proto$2.asHours = asHours;
        proto$2.asDays = asDays;
        proto$2.asWeeks = asWeeks;
        proto$2.asMonths = asMonths;
        proto$2.asQuarters = asQuarters;
        proto$2.asYears = asYears;
        proto$2.valueOf = valueOf$1;
        proto$2._bubble = bubble;
        proto$2.clone = clone$1;
        proto$2.get = get$2;
        proto$2.milliseconds = milliseconds;
        proto$2.seconds = seconds;
        proto$2.minutes = minutes;
        proto$2.hours = hours;
        proto$2.days = days;
        proto$2.weeks = weeks;
        proto$2.months = months;
        proto$2.years = years;
        proto$2.humanize = humanize;
        proto$2.toISOString = toISOString$1;
        proto$2.toString = toISOString$1;
        proto$2.toJSON = toISOString$1;
        proto$2.locale = locale;
        proto$2.localeData = localeData;

        proto$2.toIsoString = deprecate(
            'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
            toISOString$1
        );
        proto$2.lang = lang;

        // FORMATTING

        addFormatToken('X', 0, 0, 'unix');
        addFormatToken('x', 0, 0, 'valueOf');

        // PARSING

        addRegexToken('x', matchSigned);
        addRegexToken('X', matchTimestamp);
        addParseToken('X', function (input, array, config) {
            config._d = new Date(parseFloat(input) * 1000);
        });
        addParseToken('x', function (input, array, config) {
            config._d = new Date(toInt(input));
        });

        //! moment.js

        hooks.version = '2.29.1';

        setHookCallback(createLocal);

        hooks.fn = proto;
        hooks.min = min;
        hooks.max = max;
        hooks.now = now;
        hooks.utc = createUTC;
        hooks.unix = createUnix;
        hooks.months = listMonths;
        hooks.isDate = isDate;
        hooks.locale = getSetGlobalLocale;
        hooks.invalid = createInvalid;
        hooks.duration = createDuration;
        hooks.isMoment = isMoment;
        hooks.weekdays = listWeekdays;
        hooks.parseZone = createInZone;
        hooks.localeData = getLocale;
        hooks.isDuration = isDuration;
        hooks.monthsShort = listMonthsShort;
        hooks.weekdaysMin = listWeekdaysMin;
        hooks.defineLocale = defineLocale;
        hooks.updateLocale = updateLocale;
        hooks.locales = listLocales;
        hooks.weekdaysShort = listWeekdaysShort;
        hooks.normalizeUnits = normalizeUnits;
        hooks.relativeTimeRounding = getSetRelativeTimeRounding;
        hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
        hooks.calendarFormat = getCalendarFormat;
        hooks.prototype = proto;

        // currently HTML5 input type only supports 24-hour formats
        hooks.HTML5_FMT = {
            DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
            DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
            DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
            DATE: 'YYYY-MM-DD', // <input type="date" />
            TIME: 'HH:mm', // <input type="time" />
            TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
            TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
            WEEK: 'GGGG-[W]WW', // <input type="week" />
            MONTH: 'YYYY-MM', // <input type="month" />
        };

        return hooks;

    })));
    });

    // https://github.com/moment/moment/issues/3650
    function interopDefault(m) {
      return m.default || m;
    }

    var runtimeLocale = _extends({}, defaultLocale.Modal);

    function changeConfirmLocale(newLocale) {
      if (newLocale) {
        runtimeLocale = _extends(_extends({}, runtimeLocale), newLocale);
      } else {
        runtimeLocale = _extends({}, defaultLocale.Modal);
      }
    }

    /* eslint-disable no-console */
    var warned = {};
    function warning$2(valid, message) {
      // Support uglify
      if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
        console.error("Warning: ".concat(message));
      }
    }
    function call(method, valid, message) {
      if (!valid && !warned[message]) {
        method(false, message);
        warned[message] = true;
      }
    }
    function warningOnce(valid, message) {
      call(warning$2, valid, message);
    }
    /* eslint-enable */

    var warning$1 = (function (valid, component) {
      var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      warningOnce(valid, "[antdv: ".concat(component, "] ").concat(message));
    });

    var ANT_MARK = 'internalMark';

    function setMomentLocale(locale) {
      if (locale && locale.locale) {
        interopDefault(moment).locale(locale.locale);
      } else {
        interopDefault(moment).locale('en');
      }
    }

    var LocaleProvider = defineComponent({
      name: 'ALocaleProvider',
      props: {
        locale: {
          type: Object
        },
        ANT_MARK__: PropTypes$1.string
      },
      setup: function setup(props, _ref) {
        var slots = _ref.slots;
        warning$1(props.ANT_MARK__ === ANT_MARK, 'LocaleProvider', '`LocaleProvider` is deprecated. Please use `locale` with `ConfigProvider` instead');
        var state = reactive({
          antLocale: _extends(_extends({}, props.locale), {
            exist: true
          }),
          ANT_MARK__: ANT_MARK
        });
        provide('localeData', state);
        watch(function () {
          return props.locale;
        }, function (val) {
          state.antLocale = _extends(_extends({}, val), {
            exist: true
          });
          setMomentLocale(val);
          changeConfirmLocale(val && val.Modal);
        }, {
          immediate: true
        });
        onUnmounted(function () {
          changeConfirmLocale();
        });
        return function () {
          var _a;

          return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
        };
      }
    });
    /* istanbul ignore next */

    LocaleProvider.install = function (app) {
      app.component(LocaleProvider.name, LocaleProvider);
      return app;
    };

    var LocaleProvider$1 = withInstall(LocaleProvider);

    var configProviderProps = {
      getTargetContainer: {
        type: Function
      },
      getPopupContainer: {
        type: Function
      },
      prefixCls: String,
      getPrefixCls: {
        type: Function
      },
      renderEmpty: {
        type: Function
      },
      transformCellText: {
        type: Function
      },
      csp: {
        type: Object
      },
      autoInsertSpaceInButton: PropTypes$1.looseBool,
      locale: {
        type: Object
      },
      pageHeader: {
        type: Object
      },
      componentSize: {
        type: String
      },
      direction: {
        type: String
      },
      space: {
        type: Object
      },
      virtual: PropTypes$1.looseBool,
      dropdownMatchSelectWidth: PropTypes$1.looseBool,
      form: {
        type: Object
      }
    };
    var ConfigProvider = defineComponent({
      name: 'AConfigProvider',
      props: configProviderProps,
      setup: function setup(props, _ref) {
        var slots = _ref.slots;

        var getPrefixCls = function getPrefixCls(suffixCls, customizePrefixCls) {
          var _props$prefixCls = props.prefixCls,
              prefixCls = _props$prefixCls === void 0 ? 'ant' : _props$prefixCls;
          if (customizePrefixCls) return customizePrefixCls;
          return suffixCls ? "".concat(prefixCls, "-").concat(suffixCls) : prefixCls;
        };

        var renderEmptyComponent = function renderEmptyComponent(name) {
          var renderEmpty$1 = props.renderEmpty || slots.renderEmpty || renderEmpty;
          return renderEmpty$1(name);
        };

        var getPrefixClsWrapper = function getPrefixClsWrapper(suffixCls, customizePrefixCls) {
          var prefixCls = props.prefixCls;
          if (customizePrefixCls) return customizePrefixCls;
          var mergedPrefixCls = prefixCls || getPrefixCls('');
          return suffixCls ? "".concat(mergedPrefixCls, "-").concat(suffixCls) : mergedPrefixCls;
        };

        var configProvider = reactive(_extends(_extends({}, props), {
          getPrefixCls: getPrefixClsWrapper,
          renderEmpty: renderEmptyComponent
        }));
        Object.keys(props).forEach(function (key) {
          watch(function () {
            return props[key];
          }, function () {
            configProvider[key] = props[key];
          });
        });
        provide('configProvider', configProvider);

        var renderProvider = function renderProvider(legacyLocale) {
          var _a;

          return createVNode(LocaleProvider$1, {
            "locale": props.locale || legacyLocale,
            "ANT_MARK__": ANT_MARK
          }, {
            default: function _default() {
              return [(_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)];
            }
          });
        };

        return function () {
          return createVNode(LocaleReceiver, {
            "children": function children(_, __, legacyLocale) {
              return renderProvider(legacyLocale);
            }
          }, null);
        };
      }
    });
    var defaultConfigProvider = reactive({
      getPrefixCls: function getPrefixCls(suffixCls, customizePrefixCls) {
        if (customizePrefixCls) return customizePrefixCls;
        return suffixCls ? "ant-".concat(suffixCls) : 'ant';
      },
      renderEmpty: renderEmpty,
      direction: 'ltr'
    });
    withInstall(ConfigProvider);

    // This icon file is generated automatically.
    var CloseCircleFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" } }] }, "name": "close-circle", "theme": "filled" };
    var CloseCircleFilledSvg = CloseCircleFilled$2;

    /**
     * Take input from [0, n] and return it as [0, 1]
     * @hidden
     */
    function bound01(n, max) {
        if (isOnePointZero(n)) {
            n = '100%';
        }
        var isPercent = isPercentage(n);
        n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
        // Automatically convert percentage into number
        if (isPercent) {
            n = parseInt(String(n * max), 10) / 100;
        }
        // Handle floating point rounding errors
        if (Math.abs(n - max) < 0.000001) {
            return 1;
        }
        // Convert into [0, 1] range if it isn't already
        if (max === 360) {
            // If n is a hue given in degrees,
            // wrap around out-of-range values into [0, 360] range
            // then convert into [0, 1].
            n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
        }
        else {
            // If n not a hue given in degrees
            // Convert into [0, 1] range if it isn't already.
            n = (n % max) / parseFloat(String(max));
        }
        return n;
    }
    /**
     * Force a number between 0 and 1
     * @hidden
     */
    function clamp01(val) {
        return Math.min(1, Math.max(0, val));
    }
    /**
     * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
     * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
     * @hidden
     */
    function isOnePointZero(n) {
        return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
    }
    /**
     * Check to see if string passed in is a percentage
     * @hidden
     */
    function isPercentage(n) {
        return typeof n === 'string' && n.indexOf('%') !== -1;
    }
    /**
     * Return a valid alpha value [0,1] with all invalid values being set to 1
     * @hidden
     */
    function boundAlpha(a) {
        a = parseFloat(a);
        if (isNaN(a) || a < 0 || a > 1) {
            a = 1;
        }
        return a;
    }
    /**
     * Replace a decimal with it's percentage value
     * @hidden
     */
    function convertToPercentage(n) {
        if (n <= 1) {
            return Number(n) * 100 + "%";
        }
        return n;
    }
    /**
     * Force a hex value to have 2 characters
     * @hidden
     */
    function pad2(c) {
        return c.length === 1 ? '0' + c : String(c);
    }

    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
    /**
     * Handle bounds / percentage checking to conform to CSS color spec
     * <http://www.w3.org/TR/css3-color/>
     * *Assumes:* r, g, b in [0, 255] or [0, 1]
     * *Returns:* { r, g, b } in [0, 255]
     */
    function rgbToRgb(r, g, b) {
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255,
        };
    }
    /**
     * Converts an RGB color value to HSL.
     * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
     * *Returns:* { h, s, l } in [0,1]
     */
    function rgbToHsl(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var s = 0;
        var l = (max + min) / 2;
        if (max === min) {
            s = 0;
            h = 0; // achromatic
        }
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return { h: h, s: s, l: l };
    }
    function hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * (6 * t);
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    }
    /**
     * Converts an HSL color value to RGB.
     *
     * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
     * *Returns:* { r, g, b } in the set [0, 255]
     */
    function hslToRgb(h, s, l) {
        var r;
        var g;
        var b;
        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);
        if (s === 0) {
            // achromatic
            g = l;
            b = l;
            r = l;
        }
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return { r: r * 255, g: g * 255, b: b * 255 };
    }
    /**
     * Converts an RGB color value to HSV
     *
     * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
     * *Returns:* { h, s, v } in [0,1]
     */
    function rgbToHsv(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);
        var h = 0;
        var v = max;
        var d = max - min;
        var s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0; // achromatic
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return { h: h, s: s, v: v };
    }
    /**
     * Converts an HSV color value to RGB.
     *
     * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
     * *Returns:* { r, g, b } in the set [0, 255]
     */
    function hsvToRgb(h, s, v) {
        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);
        var i = Math.floor(h);
        var f = h - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        var mod = i % 6;
        var r = [v, q, p, p, t, v][mod];
        var g = [t, v, v, q, p, p][mod];
        var b = [p, p, t, v, v, q][mod];
        return { r: r * 255, g: g * 255, b: b * 255 };
    }
    /**
     * Converts an RGB color to hex
     *
     * Assumes r, g, and b are contained in the set [0, 255]
     * Returns a 3 or 6 character hex
     */
    function rgbToHex(r, g, b, allow3Char) {
        var hex = [
            pad2(Math.round(r).toString(16)),
            pad2(Math.round(g).toString(16)),
            pad2(Math.round(b).toString(16)),
        ];
        // Return a 3 character hex if possible
        if (allow3Char &&
            hex[0].startsWith(hex[0].charAt(1)) &&
            hex[1].startsWith(hex[1].charAt(1)) &&
            hex[2].startsWith(hex[2].charAt(1))) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        }
        return hex.join('');
    }
    /**
     * Converts an RGBA color plus alpha transparency to hex
     *
     * Assumes r, g, b are contained in the set [0, 255] and
     * a in [0, 1]. Returns a 4 or 8 character rgba hex
     */
    // eslint-disable-next-line max-params
    function rgbaToHex(r, g, b, a, allow4Char) {
        var hex = [
            pad2(Math.round(r).toString(16)),
            pad2(Math.round(g).toString(16)),
            pad2(Math.round(b).toString(16)),
            pad2(convertDecimalToHex(a)),
        ];
        // Return a 4 character hex if possible
        if (allow4Char &&
            hex[0].startsWith(hex[0].charAt(1)) &&
            hex[1].startsWith(hex[1].charAt(1)) &&
            hex[2].startsWith(hex[2].charAt(1)) &&
            hex[3].startsWith(hex[3].charAt(1))) {
            return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        }
        return hex.join('');
    }
    /** Converts a decimal to a hex value */
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    /** Converts a hex value to a decimal */
    function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
    }
    /** Parse a base-16 hex value into a base-10 integer */
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }
    function numberInputToObject(color) {
        return {
            r: color >> 16,
            g: (color & 0xff00) >> 8,
            b: color & 0xff,
        };
    }

    // https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
    /**
     * @hidden
     */
    var names = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        goldenrod: '#daa520',
        gold: '#ffd700',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        lavenderblush: '#fff0f5',
        lavender: '#e6e6fa',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32',
    };

    /**
     * Given a string or object, convert that input to RGB
     *
     * Possible string inputs:
     * ```
     * "red"
     * "#f00" or "f00"
     * "#ff0000" or "ff0000"
     * "#ff000000" or "ff000000"
     * "rgb 255 0 0" or "rgb (255, 0, 0)"
     * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
     * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
     * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
     * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
     * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
     * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
     * ```
     */
    function inputToRGB(color) {
        var rgb = { r: 0, g: 0, b: 0 };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;
        if (typeof color === 'string') {
            color = stringInputToObject(color);
        }
        if (typeof color === 'object') {
            if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
            }
            else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
                s = convertToPercentage(color.s);
                v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, s, v);
                ok = true;
                format = 'hsv';
            }
            else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
                s = convertToPercentage(color.s);
                l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, s, l);
                ok = true;
                format = 'hsl';
            }
            if (Object.prototype.hasOwnProperty.call(color, 'a')) {
                a = color.a;
            }
        }
        a = boundAlpha(a);
        return {
            ok: ok,
            format: color.format || format,
            r: Math.min(255, Math.max(rgb.r, 0)),
            g: Math.min(255, Math.max(rgb.g, 0)),
            b: Math.min(255, Math.max(rgb.b, 0)),
            a: a,
        };
    }
    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = '[-\\+]?\\d+%?';
    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var matchers = {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
        rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
        hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
        hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
        hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
        hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    };
    /**
     * Permissive string parsing.  Take in a number of formats, and output an object
     * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
     */
    function stringInputToObject(color) {
        color = color.trim().toLowerCase();
        if (color.length === 0) {
            return false;
        }
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        }
        else if (color === 'transparent') {
            return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
        }
        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match = matchers.rgb.exec(color);
        if (match) {
            return { r: match[1], g: match[2], b: match[3] };
        }
        match = matchers.rgba.exec(color);
        if (match) {
            return { r: match[1], g: match[2], b: match[3], a: match[4] };
        }
        match = matchers.hsl.exec(color);
        if (match) {
            return { h: match[1], s: match[2], l: match[3] };
        }
        match = matchers.hsla.exec(color);
        if (match) {
            return { h: match[1], s: match[2], l: match[3], a: match[4] };
        }
        match = matchers.hsv.exec(color);
        if (match) {
            return { h: match[1], s: match[2], v: match[3] };
        }
        match = matchers.hsva.exec(color);
        if (match) {
            return { h: match[1], s: match[2], v: match[3], a: match[4] };
        }
        match = matchers.hex8.exec(color);
        if (match) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                a: convertHexToDecimal(match[4]),
                format: named ? 'name' : 'hex8',
            };
        }
        match = matchers.hex6.exec(color);
        if (match) {
            return {
                r: parseIntFromHex(match[1]),
                g: parseIntFromHex(match[2]),
                b: parseIntFromHex(match[3]),
                format: named ? 'name' : 'hex',
            };
        }
        match = matchers.hex4.exec(color);
        if (match) {
            return {
                r: parseIntFromHex(match[1] + match[1]),
                g: parseIntFromHex(match[2] + match[2]),
                b: parseIntFromHex(match[3] + match[3]),
                a: convertHexToDecimal(match[4] + match[4]),
                format: named ? 'name' : 'hex8',
            };
        }
        match = matchers.hex3.exec(color);
        if (match) {
            return {
                r: parseIntFromHex(match[1] + match[1]),
                g: parseIntFromHex(match[2] + match[2]),
                b: parseIntFromHex(match[3] + match[3]),
                format: named ? 'name' : 'hex',
            };
        }
        return false;
    }
    /**
     * Check to see if it looks like a CSS unit
     * (see `matchers` above for definition).
     */
    function isValidCSSUnit(color) {
        return Boolean(matchers.CSS_UNIT.exec(String(color)));
    }

    var TinyColor = /** @class */ (function () {
        function TinyColor(color, opts) {
            if (color === void 0) { color = ''; }
            if (opts === void 0) { opts = {}; }
            var _a;
            // If input is already a tinycolor, return itself
            if (color instanceof TinyColor) {
                // eslint-disable-next-line no-constructor-return
                return color;
            }
            if (typeof color === 'number') {
                color = numberInputToObject(color);
            }
            this.originalInput = color;
            var rgb = inputToRGB(color);
            this.originalInput = color;
            this.r = rgb.r;
            this.g = rgb.g;
            this.b = rgb.b;
            this.a = rgb.a;
            this.roundA = Math.round(100 * this.a) / 100;
            this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
            this.gradientType = opts.gradientType;
            // Don't let the range of [0,255] come back in [0,1].
            // Potentially lose a little bit of precision here, but will fix issues where
            // .5 gets interpreted as half of the total, instead of half of 1
            // If it was supposed to be 128, this was already taken care of by `inputToRgb`
            if (this.r < 1) {
                this.r = Math.round(this.r);
            }
            if (this.g < 1) {
                this.g = Math.round(this.g);
            }
            if (this.b < 1) {
                this.b = Math.round(this.b);
            }
            this.isValid = rgb.ok;
        }
        TinyColor.prototype.isDark = function () {
            return this.getBrightness() < 128;
        };
        TinyColor.prototype.isLight = function () {
            return !this.isDark();
        };
        /**
         * Returns the perceived brightness of the color, from 0-255.
         */
        TinyColor.prototype.getBrightness = function () {
            // http://www.w3.org/TR/AERT#color-contrast
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        };
        /**
         * Returns the perceived luminance of a color, from 0-1.
         */
        TinyColor.prototype.getLuminance = function () {
            // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
            var rgb = this.toRgb();
            var R;
            var G;
            var B;
            var RsRGB = rgb.r / 255;
            var GsRGB = rgb.g / 255;
            var BsRGB = rgb.b / 255;
            if (RsRGB <= 0.03928) {
                R = RsRGB / 12.92;
            }
            else {
                // eslint-disable-next-line prefer-exponentiation-operator
                R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
            }
            if (GsRGB <= 0.03928) {
                G = GsRGB / 12.92;
            }
            else {
                // eslint-disable-next-line prefer-exponentiation-operator
                G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
            }
            if (BsRGB <= 0.03928) {
                B = BsRGB / 12.92;
            }
            else {
                // eslint-disable-next-line prefer-exponentiation-operator
                B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
            }
            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        };
        /**
         * Returns the alpha value of a color, from 0-1.
         */
        TinyColor.prototype.getAlpha = function () {
            return this.a;
        };
        /**
         * Sets the alpha value on the current color.
         *
         * @param alpha - The new alpha value. The accepted range is 0-1.
         */
        TinyColor.prototype.setAlpha = function (alpha) {
            this.a = boundAlpha(alpha);
            this.roundA = Math.round(100 * this.a) / 100;
            return this;
        };
        /**
         * Returns the object as a HSVA object.
         */
        TinyColor.prototype.toHsv = function () {
            var hsv = rgbToHsv(this.r, this.g, this.b);
            return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
        };
        /**
         * Returns the hsva values interpolated into a string with the following format:
         * "hsva(xxx, xxx, xxx, xx)".
         */
        TinyColor.prototype.toHsvString = function () {
            var hsv = rgbToHsv(this.r, this.g, this.b);
            var h = Math.round(hsv.h * 360);
            var s = Math.round(hsv.s * 100);
            var v = Math.round(hsv.v * 100);
            return this.a === 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this.roundA + ")";
        };
        /**
         * Returns the object as a HSLA object.
         */
        TinyColor.prototype.toHsl = function () {
            var hsl = rgbToHsl(this.r, this.g, this.b);
            return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
        };
        /**
         * Returns the hsla values interpolated into a string with the following format:
         * "hsla(xxx, xxx, xxx, xx)".
         */
        TinyColor.prototype.toHslString = function () {
            var hsl = rgbToHsl(this.r, this.g, this.b);
            var h = Math.round(hsl.h * 360);
            var s = Math.round(hsl.s * 100);
            var l = Math.round(hsl.l * 100);
            return this.a === 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this.roundA + ")";
        };
        /**
         * Returns the hex value of the color.
         * @param allow3Char will shorten hex value to 3 char if possible
         */
        TinyColor.prototype.toHex = function (allow3Char) {
            if (allow3Char === void 0) { allow3Char = false; }
            return rgbToHex(this.r, this.g, this.b, allow3Char);
        };
        /**
         * Returns the hex value of the color -with a # appened.
         * @param allow3Char will shorten hex value to 3 char if possible
         */
        TinyColor.prototype.toHexString = function (allow3Char) {
            if (allow3Char === void 0) { allow3Char = false; }
            return '#' + this.toHex(allow3Char);
        };
        /**
         * Returns the hex 8 value of the color.
         * @param allow4Char will shorten hex value to 4 char if possible
         */
        TinyColor.prototype.toHex8 = function (allow4Char) {
            if (allow4Char === void 0) { allow4Char = false; }
            return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
        };
        /**
         * Returns the hex 8 value of the color -with a # appened.
         * @param allow4Char will shorten hex value to 4 char if possible
         */
        TinyColor.prototype.toHex8String = function (allow4Char) {
            if (allow4Char === void 0) { allow4Char = false; }
            return '#' + this.toHex8(allow4Char);
        };
        /**
         * Returns the object as a RGBA object.
         */
        TinyColor.prototype.toRgb = function () {
            return {
                r: Math.round(this.r),
                g: Math.round(this.g),
                b: Math.round(this.b),
                a: this.a,
            };
        };
        /**
         * Returns the RGBA values interpolated into a string with the following format:
         * "RGBA(xxx, xxx, xxx, xx)".
         */
        TinyColor.prototype.toRgbString = function () {
            var r = Math.round(this.r);
            var g = Math.round(this.g);
            var b = Math.round(this.b);
            return this.a === 1 ? "rgb(" + r + ", " + g + ", " + b + ")" : "rgba(" + r + ", " + g + ", " + b + ", " + this.roundA + ")";
        };
        /**
         * Returns the object as a RGBA object.
         */
        TinyColor.prototype.toPercentageRgb = function () {
            var fmt = function (x) { return Math.round(bound01(x, 255) * 100) + "%"; };
            return {
                r: fmt(this.r),
                g: fmt(this.g),
                b: fmt(this.b),
                a: this.a,
            };
        };
        /**
         * Returns the RGBA relative values interpolated into a string
         */
        TinyColor.prototype.toPercentageRgbString = function () {
            var rnd = function (x) { return Math.round(bound01(x, 255) * 100); };
            return this.a === 1
                ? "rgb(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%)"
                : "rgba(" + rnd(this.r) + "%, " + rnd(this.g) + "%, " + rnd(this.b) + "%, " + this.roundA + ")";
        };
        /**
         * The 'real' name of the color -if there is one.
         */
        TinyColor.prototype.toName = function () {
            if (this.a === 0) {
                return 'transparent';
            }
            if (this.a < 1) {
                return false;
            }
            var hex = '#' + rgbToHex(this.r, this.g, this.b, false);
            for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (hex === value) {
                    return key;
                }
            }
            return false;
        };
        TinyColor.prototype.toString = function (format) {
            var formatSet = Boolean(format);
            format = format !== null && format !== void 0 ? format : this.format;
            var formattedString = false;
            var hasAlpha = this.a < 1 && this.a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === 'name' && this.a === 0) {
                    return this.toName();
                }
                return this.toRgbString();
            }
            if (format === 'rgb') {
                formattedString = this.toRgbString();
            }
            if (format === 'prgb') {
                formattedString = this.toPercentageRgbString();
            }
            if (format === 'hex' || format === 'hex6') {
                formattedString = this.toHexString();
            }
            if (format === 'hex3') {
                formattedString = this.toHexString(true);
            }
            if (format === 'hex4') {
                formattedString = this.toHex8String(true);
            }
            if (format === 'hex8') {
                formattedString = this.toHex8String();
            }
            if (format === 'name') {
                formattedString = this.toName();
            }
            if (format === 'hsl') {
                formattedString = this.toHslString();
            }
            if (format === 'hsv') {
                formattedString = this.toHsvString();
            }
            return formattedString || this.toHexString();
        };
        TinyColor.prototype.toNumber = function () {
            return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
        };
        TinyColor.prototype.clone = function () {
            return new TinyColor(this.toString());
        };
        /**
         * Lighten the color a given amount. Providing 100 will always return white.
         * @param amount - valid between 1-100
         */
        TinyColor.prototype.lighten = function (amount) {
            if (amount === void 0) { amount = 10; }
            var hsl = this.toHsl();
            hsl.l += amount / 100;
            hsl.l = clamp01(hsl.l);
            return new TinyColor(hsl);
        };
        /**
         * Brighten the color a given amount, from 0 to 100.
         * @param amount - valid between 1-100
         */
        TinyColor.prototype.brighten = function (amount) {
            if (amount === void 0) { amount = 10; }
            var rgb = this.toRgb();
            rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
            rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
            rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
            return new TinyColor(rgb);
        };
        /**
         * Darken the color a given amount, from 0 to 100.
         * Providing 100 will always return black.
         * @param amount - valid between 1-100
         */
        TinyColor.prototype.darken = function (amount) {
            if (amount === void 0) { amount = 10; }
            var hsl = this.toHsl();
            hsl.l -= amount / 100;
            hsl.l = clamp01(hsl.l);
            return new TinyColor(hsl);
        };
        /**
         * Mix the color with pure white, from 0 to 100.
         * Providing 0 will do nothing, providing 100 will always return white.
         * @param amount - valid between 1-100
         */
        TinyColor.prototype.tint = function (amount) {
            if (amount === void 0) { amount = 10; }
            return this.mix('white', amount);
        };
        /**
         * Mix the color with pure black, from 0 to 100.
         * Providing 0 will do nothing, providing 100 will always return black.
         * @param amount - valid between 1-100
         */
        TinyColor.prototype.shade = function (amount) {
            if (amount === void 0) { amount = 10; }
            return this.mix('black', amount);
        };
        /**
         * Desaturate the color a given amount, from 0 to 100.
         * Providing 100 will is the same as calling greyscale
         * @param amount - valid between 1-100
         */
        TinyColor.prototype.desaturate = function (amount) {
            if (amount === void 0) { amount = 10; }
            var hsl = this.toHsl();
            hsl.s -= amount / 100;
            hsl.s = clamp01(hsl.s);
            return new TinyColor(hsl);
        };
        /**
         * Saturate the color a given amount, from 0 to 100.
         * @param amount - valid between 1-100
         */
        TinyColor.prototype.saturate = function (amount) {
            if (amount === void 0) { amount = 10; }
            var hsl = this.toHsl();
            hsl.s += amount / 100;
            hsl.s = clamp01(hsl.s);
            return new TinyColor(hsl);
        };
        /**
         * Completely desaturates a color into greyscale.
         * Same as calling `desaturate(100)`
         */
        TinyColor.prototype.greyscale = function () {
            return this.desaturate(100);
        };
        /**
         * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
         * Values outside of this range will be wrapped into this range.
         */
        TinyColor.prototype.spin = function (amount) {
            var hsl = this.toHsl();
            var hue = (hsl.h + amount) % 360;
            hsl.h = hue < 0 ? 360 + hue : hue;
            return new TinyColor(hsl);
        };
        /**
         * Mix the current color a given amount with another color, from 0 to 100.
         * 0 means no mixing (return current color).
         */
        TinyColor.prototype.mix = function (color, amount) {
            if (amount === void 0) { amount = 50; }
            var rgb1 = this.toRgb();
            var rgb2 = new TinyColor(color).toRgb();
            var p = amount / 100;
            var rgba = {
                r: (rgb2.r - rgb1.r) * p + rgb1.r,
                g: (rgb2.g - rgb1.g) * p + rgb1.g,
                b: (rgb2.b - rgb1.b) * p + rgb1.b,
                a: (rgb2.a - rgb1.a) * p + rgb1.a,
            };
            return new TinyColor(rgba);
        };
        TinyColor.prototype.analogous = function (results, slices) {
            if (results === void 0) { results = 6; }
            if (slices === void 0) { slices = 30; }
            var hsl = this.toHsl();
            var part = 360 / slices;
            var ret = [this];
            for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
                hsl.h = (hsl.h + part) % 360;
                ret.push(new TinyColor(hsl));
            }
            return ret;
        };
        /**
         * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
         */
        TinyColor.prototype.complement = function () {
            var hsl = this.toHsl();
            hsl.h = (hsl.h + 180) % 360;
            return new TinyColor(hsl);
        };
        TinyColor.prototype.monochromatic = function (results) {
            if (results === void 0) { results = 6; }
            var hsv = this.toHsv();
            var h = hsv.h;
            var s = hsv.s;
            var v = hsv.v;
            var res = [];
            var modification = 1 / results;
            while (results--) {
                res.push(new TinyColor({ h: h, s: s, v: v }));
                v = (v + modification) % 1;
            }
            return res;
        };
        TinyColor.prototype.splitcomplement = function () {
            var hsl = this.toHsl();
            var h = hsl.h;
            return [
                this,
                new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
                new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
            ];
        };
        /**
         * Compute how the color would appear on a background
         */
        TinyColor.prototype.onBackground = function (background) {
            var fg = this.toRgb();
            var bg = new TinyColor(background).toRgb();
            return new TinyColor({
                r: bg.r + (fg.r - bg.r) * fg.a,
                g: bg.g + (fg.g - bg.g) * fg.a,
                b: bg.b + (fg.b - bg.b) * fg.a,
            });
        };
        /**
         * Alias for `polyad(3)`
         */
        TinyColor.prototype.triad = function () {
            return this.polyad(3);
        };
        /**
         * Alias for `polyad(4)`
         */
        TinyColor.prototype.tetrad = function () {
            return this.polyad(4);
        };
        /**
         * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
         * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
         */
        TinyColor.prototype.polyad = function (n) {
            var hsl = this.toHsl();
            var h = hsl.h;
            var result = [this];
            var increment = 360 / n;
            for (var i = 1; i < n; i++) {
                result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
            }
            return result;
        };
        /**
         * compare color vs current color
         */
        TinyColor.prototype.equals = function (color) {
            return this.toRgbString() === new TinyColor(color).toRgbString();
        };
        return TinyColor;
    }());

    var hueStep = 2; // 色相阶梯

    var saturationStep = 0.16; // 饱和度阶梯，浅色部分

    var saturationStep2 = 0.05; // 饱和度阶梯，深色部分

    var brightnessStep1 = 0.05; // 亮度阶梯，浅色部分

    var brightnessStep2 = 0.15; // 亮度阶梯，深色部分

    var lightColorCount = 5; // 浅色数量，主色上

    var darkColorCount = 4; // 深色数量，主色下
    // 暗色主题颜色映射关系表

    var darkColorMap = [{
      index: 7,
      opacity: 0.15
    }, {
      index: 6,
      opacity: 0.25
    }, {
      index: 5,
      opacity: 0.3
    }, {
      index: 5,
      opacity: 0.45
    }, {
      index: 5,
      opacity: 0.65
    }, {
      index: 5,
      opacity: 0.85
    }, {
      index: 4,
      opacity: 0.9
    }, {
      index: 3,
      opacity: 0.95
    }, {
      index: 2,
      opacity: 0.97
    }, {
      index: 1,
      opacity: 0.98
    }];

    function getHue(hsv, i, light) {
      var hue; // 根据色相不同，色相转向不同

      if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
        hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
      } else {
        hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
      }

      if (hue < 0) {
        hue += 360;
      } else if (hue >= 360) {
        hue -= 360;
      }

      return hue;
    }

    function getSaturation(hsv, i, light) {
      // grey color don't change saturation
      if (hsv.h === 0 && hsv.s === 0) {
        return hsv.s;
      }

      var saturation;

      if (light) {
        saturation = hsv.s - saturationStep * i;
      } else if (i === darkColorCount) {
        saturation = hsv.s + saturationStep;
      } else {
        saturation = hsv.s + saturationStep2 * i;
      } // 边界值修正


      if (saturation > 1) {
        saturation = 1;
      } // 第一格的 s 限制在 0.06-0.1 之间


      if (light && i === lightColorCount && saturation > 0.1) {
        saturation = 0.1;
      }

      if (saturation < 0.06) {
        saturation = 0.06;
      }

      return Number(saturation.toFixed(2));
    }

    function getValue(hsv, i, light) {
      var value;

      if (light) {
        value = hsv.v + brightnessStep1 * i;
      } else {
        value = hsv.v - brightnessStep2 * i;
      }

      if (value > 1) {
        value = 1;
      }

      return Number(value.toFixed(2));
    }

    function generate$1(color) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var patterns = [];
      var pColor = new TinyColor(color);

      for (var i = lightColorCount; i > 0; i -= 1) {
        var hsv = pColor.toHsv();
        var colorString = new TinyColor({
          h: getHue(hsv, i, true),
          s: getSaturation(hsv, i, true),
          v: getValue(hsv, i, true)
        }).toHexString();
        patterns.push(colorString);
      }

      patterns.push(pColor.toHexString());

      for (var _i = 1; _i <= darkColorCount; _i += 1) {
        var _hsv = pColor.toHsv();

        var _colorString = new TinyColor({
          h: getHue(_hsv, _i),
          s: getSaturation(_hsv, _i),
          v: getValue(_hsv, _i)
        }).toHexString();

        patterns.push(_colorString);
      } // dark theme patterns


      if (opts.theme === 'dark') {
        return darkColorMap.map(function (_ref) {
          var index = _ref.index,
              opacity = _ref.opacity;
          var darkColorString = new TinyColor(opts.backgroundColor || '#141414').mix(patterns[index], opacity * 100).toHexString();
          return darkColorString;
        });
      }

      return patterns;
    }

    var presetPrimaryColors = {
      red: '#F5222D',
      volcano: '#FA541C',
      orange: '#FA8C16',
      gold: '#FAAD14',
      yellow: '#FADB14',
      lime: '#A0D911',
      green: '#52C41A',
      cyan: '#13C2C2',
      blue: '#1890FF',
      geekblue: '#2F54EB',
      purple: '#722ED1',
      magenta: '#EB2F96',
      grey: '#666666'
    };
    var presetPalettes = {};
    var presetDarkPalettes = {};
    Object.keys(presetPrimaryColors).forEach(function (key) {
      presetPalettes[key] = generate$1(presetPrimaryColors[key]);
      presetPalettes[key].primary = presetPalettes[key][5]; // dark presetPalettes

      presetDarkPalettes[key] = generate$1(presetPrimaryColors[key], {
        theme: 'dark',
        backgroundColor: '#141414'
      });
      presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
    });
    presetPalettes.red;
    presetPalettes.volcano;
    presetPalettes.gold;
    presetPalettes.orange;
    presetPalettes.yellow;
    presetPalettes.lime;
    presetPalettes.green;
    presetPalettes.cyan;
    presetPalettes.blue;
    presetPalettes.geekblue;
    presetPalettes.purple;
    presetPalettes.magenta;
    presetPalettes.grey;

    // https://github.com/substack/insert-css
    var containers = []; // will store container HTMLElement references

    var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

    var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

    function createStyleElement() {
      var styleElement = document.createElement('style');
      styleElement.setAttribute('type', 'text/css');
      return styleElement;
    } // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types


    function insertCss(css, options) {
      options = options || {};

      if (css === undefined) {
        throw new Error(usage);
      }

      var position = options.prepend === true ? 'prepend' : 'append';
      var container = options.container !== undefined ? options.container : document.querySelector('head');
      var containerId = containers.indexOf(container); // first time we see this container, create the necessary entries

      if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
      } // try to get the correponding container + position styleElement, create it otherwise


      var styleElement;

      if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
      } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
          container.insertBefore(styleElement, container.childNodes[0]);
        } else {
          container.appendChild(styleElement);
        }
      } // strip potential UTF-8 BOM if css was read from a file


      if (css.charCodeAt(0) === 0xfeff) {
        css = css.substr(1, css.length);
      } // actually add the stylesheet


      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css;
      } else {
        styleElement.textContent += css;
      }

      return styleElement;
    }

    function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$7(target, key, source[key]); }); } return target; }

    function _defineProperty$7(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    function warn(valid, message) {
      // Support uglify
      if (process.env.NODE_ENV !== 'production' && !valid && console !== undefined) {
        console.error("Warning: ".concat(message));
      }
    }
    function warning(valid, message) {
      warn(valid, "[@ant-design/icons-vue] ".concat(message));
    } // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

    function isIconDefinition(target) {
      return typeof target === 'object' && typeof target.name === 'string' && typeof target.theme === 'string' && (typeof target.icon === 'object' || typeof target.icon === 'function');
    }
    function generate(node, key, rootProps) {
      if (!rootProps) {
        return h$1(node.tag, _objectSpread$7({
          key: key
        }, node.attrs), (node.children || []).map(function (child, index) {
          return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
        }));
      }

      return h$1(node.tag, _objectSpread$7({
        key: key
      }, rootProps, node.attrs), (node.children || []).map(function (child, index) {
        return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
      }));
    }
    function getSecondaryColor(primaryColor) {
      // choose the second color
      return generate$1(primaryColor)[0];
    }
    function normalizeTwoToneColors(twoToneColor) {
      if (!twoToneColor) {
        return [];
      }

      return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
    } // These props make sure that the SVG behaviours like general text.
    var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
    var cssInjectedFlag = false;
    var useInsertStyles = function useInsertStyles() {
      var styleStr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : iconStyles;
      nextTick(function () {
        if (!cssInjectedFlag) {
          if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
            insertCss(styleStr, {
              prepend: true
            });
          }

          cssInjectedFlag = true;
        }
      });
    };

    function _objectWithoutProperties$1(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose$1(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

    function _objectWithoutPropertiesLoose$1(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

    function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$6(target, key, source[key]); }); } return target; }

    function _defineProperty$6(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
    var twoToneColorPalette = {
      primaryColor: '#333',
      secondaryColor: '#E6E6E6',
      calculated: false
    };

    function setTwoToneColors(_ref) {
      var primaryColor = _ref.primaryColor,
          secondaryColor = _ref.secondaryColor;
      twoToneColorPalette.primaryColor = primaryColor;
      twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
      twoToneColorPalette.calculated = !!secondaryColor;
    }

    function getTwoToneColors() {
      return _objectSpread$6({}, twoToneColorPalette);
    }

    var IconBase = function IconBase(props, context) {
      var _props$context$attrs = _objectSpread$6({}, props, context.attrs),
          icon = _props$context$attrs.icon,
          primaryColor = _props$context$attrs.primaryColor,
          secondaryColor = _props$context$attrs.secondaryColor,
          restProps = _objectWithoutProperties$1(_props$context$attrs, ["icon", "primaryColor", "secondaryColor"]);

      var colors = twoToneColorPalette;

      if (primaryColor) {
        colors = {
          primaryColor: primaryColor,
          secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
        };
      }

      useInsertStyles();
      warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));

      if (!isIconDefinition(icon)) {
        return null;
      }

      var target = icon;

      if (target && typeof target.icon === 'function') {
        target = _objectSpread$6({}, target, {
          icon: target.icon(colors.primaryColor, colors.secondaryColor)
        });
      }

      return generate(target.icon, "svg-".concat(target.name), _objectSpread$6({}, restProps, {
        'data-icon': target.name,
        width: '1em',
        height: '1em',
        fill: 'currentColor',
        'aria-hidden': 'true'
      })); // },
    };

    IconBase.props = {
      icon: Object,
      primaryColor: String,
      secondaryColor: String,
      focusable: String
    };
    IconBase.inheritAttrs = false;
    IconBase.displayName = 'IconBase';
    IconBase.getTwoToneColors = getTwoToneColors;
    IconBase.setTwoToneColors = setTwoToneColors;
    var VueIcon = IconBase;

    function _slicedToArray$1(arr, i) { return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1(); }

    function _nonIterableRest$1() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

    function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

    function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

    function _iterableToArrayLimit$1(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

    function _arrayWithHoles$1(arr) { if (Array.isArray(arr)) return arr; }
    function setTwoToneColor(twoToneColor) {
      var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
          _normalizeTwoToneColo2 = _slicedToArray$1(_normalizeTwoToneColo, 2),
          primaryColor = _normalizeTwoToneColo2[0],
          secondaryColor = _normalizeTwoToneColo2[1];

      return VueIcon.setTwoToneColors({
        primaryColor: primaryColor,
        secondaryColor: secondaryColor
      });
    }
    function getTwoToneColor() {
      var colors = VueIcon.getTwoToneColors();

      if (!colors.calculated) {
        return colors.primaryColor;
      }

      return [colors.primaryColor, colors.secondaryColor];
    }

    function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

    function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

    function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

    function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

    function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

    function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

    function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$5(target, key, source[key]); }); } return target; }

    function _defineProperty$5(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

    function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

    setTwoToneColor('#1890ff');

    var Icon = function Icon(props, context) {
      var _classObj;

      var _props$context$attrs = _objectSpread$5({}, props, context.attrs),
          cls = _props$context$attrs["class"],
          icon = _props$context$attrs.icon,
          spin = _props$context$attrs.spin,
          rotate = _props$context$attrs.rotate,
          tabindex = _props$context$attrs.tabindex,
          twoToneColor = _props$context$attrs.twoToneColor,
          onClick = _props$context$attrs.onClick,
          restProps = _objectWithoutProperties(_props$context$attrs, ["class", "icon", "spin", "rotate", "tabindex", "twoToneColor", "onClick"]);

      var classObj = (_classObj = {
        anticon: true
      }, _defineProperty$5(_classObj, "anticon-".concat(icon.name), Boolean(icon.name)), _defineProperty$5(_classObj, cls, cls), _classObj);
      var svgClassString = spin === '' || !!spin || icon.name === 'loading' ? 'anticon-spin' : '';
      var iconTabIndex = tabindex;

      if (iconTabIndex === undefined && onClick) {
        iconTabIndex = -1;
        restProps.tabindex = iconTabIndex;
      }

      var svgStyle = rotate ? {
        msTransform: "rotate(".concat(rotate, "deg)"),
        transform: "rotate(".concat(rotate, "deg)")
      } : undefined;

      var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor),
          _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2),
          primaryColor = _normalizeTwoToneColo2[0],
          secondaryColor = _normalizeTwoToneColo2[1];

      return createVNode("span", mergeProps(restProps, {
        "role": "img",
        "aria-label": icon.name,
        "onClick": onClick,
        "class": classObj
      }), [createVNode(VueIcon, {
        "class": svgClassString,
        "icon": icon,
        "primaryColor": primaryColor,
        "secondaryColor": secondaryColor,
        "style": svgStyle
      }, null)]);
    };

    Icon.props = {
      spin: Boolean,
      rotate: Number,
      icon: Object,
      twoToneColor: String
    };
    Icon.displayName = 'AntdIcon';
    Icon.inheritAttrs = false;
    Icon.getTwoToneColor = getTwoToneColor;
    Icon.setTwoToneColor = setTwoToneColor;
    var AntdIcon = Icon;

    function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$4(target, key, source[key]); }); } return target; }

    function _defineProperty$4(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var CloseCircleFilled = function CloseCircleFilled(props, context) {
      var p = _objectSpread$4({}, props, context.attrs);

      return createVNode(AntdIcon, mergeProps(p, {
        "icon": CloseCircleFilledSvg
      }), null);
    };

    CloseCircleFilled.displayName = 'CloseCircleFilled';
    CloseCircleFilled.inheritAttrs = false;
    var CloseCircleFilled$1 = CloseCircleFilled;

    function cloneElement(vnode) {
      var nodeProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var mergeRef = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var ele = vnode;

      if (Array.isArray(vnode)) {
        ele = filterEmpty(vnode)[0];
      }

      if (!ele) {
        return null;
      }

      var node = cloneVNode(ele, nodeProps, mergeRef); // cloneVNode内部是合并属性，这里改成覆盖属性

      node.props = override ? _extends(_extends({}, node.props), nodeProps) : node.props;
      warning$1(_typeof(node.props.class) !== 'object', 'class must be string');
      return node;
    }

    function hasPrefixSuffix(instance) {
      return !!(getComponent(instance, 'prefix') || getComponent(instance, 'suffix') || instance.$props.allowClear);
    }
    var ClearableInputType = ['text', 'input'];
    var ClearableLabeledInput = defineComponent({
      name: 'ClearableLabeledInput',
      inheritAttrs: false,
      props: {
        prefixCls: PropTypes$1.string,
        inputType: PropTypes$1.oneOf(tuple('text', 'input')),
        value: PropTypes$1.any,
        defaultValue: PropTypes$1.any,
        allowClear: PropTypes$1.looseBool,
        element: PropTypes$1.VNodeChild,
        handleReset: PropTypes$1.func,
        disabled: PropTypes$1.looseBool,
        size: PropTypes$1.oneOf(tuple('small', 'large', 'default')),
        suffix: PropTypes$1.VNodeChild,
        prefix: PropTypes$1.VNodeChild,
        addonBefore: PropTypes$1.VNodeChild,
        addonAfter: PropTypes$1.VNodeChild,
        readonly: PropTypes$1.looseBool,
        isFocused: PropTypes$1.looseBool
      },
      methods: {
        renderClearIcon: function renderClearIcon(prefixCls) {
          var _this$$props = this.$props,
              allowClear = _this$$props.allowClear,
              value = _this$$props.value,
              disabled = _this$$props.disabled,
              readonly = _this$$props.readonly,
              inputType = _this$$props.inputType,
              handleReset = _this$$props.handleReset;

          if (!allowClear) {
            return null;
          }

          var showClearIcon = !disabled && !readonly && value !== undefined && value !== null && value !== '';
          var className = inputType === ClearableInputType[0] ? "".concat(prefixCls, "-textarea-clear-icon") : "".concat(prefixCls, "-clear-icon");
          return createVNode(CloseCircleFilled$1, {
            "onClick": handleReset,
            "class": classNames(className, _defineProperty$8({}, "".concat(className, "-hidden"), !showClearIcon)),
            "role": "button"
          }, null);
        },
        renderSuffix: function renderSuffix(prefixCls) {
          var _this$$props2 = this.$props,
              suffix = _this$$props2.suffix,
              allowClear = _this$$props2.allowClear;

          if (suffix || allowClear) {
            return createVNode("span", {
              "class": "".concat(prefixCls, "-suffix")
            }, [this.renderClearIcon(prefixCls), suffix]);
          }

          return null;
        },
        renderLabeledIcon: function renderLabeledIcon(prefixCls, element) {
          var _classNames2;

          var _a;

          var props = this.$props;
          var style = this.$attrs.style;
          var suffix = this.renderSuffix(prefixCls);

          if (!hasPrefixSuffix(this)) {
            return cloneElement(element, {
              value: props.value
            });
          }

          var prefix = props.prefix ? createVNode("span", {
            "class": "".concat(prefixCls, "-prefix")
          }, [props.prefix]) : null;
          var affixWrapperCls = classNames((_a = this.$attrs) === null || _a === void 0 ? void 0 : _a.class, "".concat(prefixCls, "-affix-wrapper"), (_classNames2 = {}, _defineProperty$8(_classNames2, "".concat(prefixCls, "-affix-wrapper-focused"), props.isFocused), _defineProperty$8(_classNames2, "".concat(prefixCls, "-affix-wrapper-disabled"), props.disabled), _defineProperty$8(_classNames2, "".concat(prefixCls, "-affix-wrapper-sm"), props.size === 'small'), _defineProperty$8(_classNames2, "".concat(prefixCls, "-affix-wrapper-lg"), props.size === 'large'), _defineProperty$8(_classNames2, "".concat(prefixCls, "-affix-wrapper-input-with-clear-btn"), props.suffix && props.allowClear && this.$props.value), _classNames2));
          return createVNode("span", {
            "class": affixWrapperCls,
            "style": style
          }, [prefix, cloneElement(element, {
            style: null,
            value: props.value,
            class: getInputClassName(prefixCls, props.size, props.disabled)
          }), suffix]);
        },
        renderInputWithLabel: function renderInputWithLabel(prefixCls, labeledElement) {
          var _classNames4;

          var _this$$props3 = this.$props,
              addonBefore = _this$$props3.addonBefore,
              addonAfter = _this$$props3.addonAfter,
              size = _this$$props3.size;
          var _this$$attrs = this.$attrs,
              style = _this$$attrs.style,
              className = _this$$attrs.class; // Not wrap when there is not addons

          if (!addonBefore && !addonAfter) {
            return labeledElement;
          }

          var wrapperClassName = "".concat(prefixCls, "-group");
          var addonClassName = "".concat(wrapperClassName, "-addon");
          var addonBeforeNode = addonBefore ? createVNode("span", {
            "class": addonClassName
          }, [addonBefore]) : null;
          var addonAfterNode = addonAfter ? createVNode("span", {
            "class": addonClassName
          }, [addonAfter]) : null;
          var mergedWrapperClassName = classNames("".concat(prefixCls, "-wrapper"), _defineProperty$8({}, wrapperClassName, addonBefore || addonAfter));
          var mergedGroupClassName = classNames(className, "".concat(prefixCls, "-group-wrapper"), (_classNames4 = {}, _defineProperty$8(_classNames4, "".concat(prefixCls, "-group-wrapper-sm"), size === 'small'), _defineProperty$8(_classNames4, "".concat(prefixCls, "-group-wrapper-lg"), size === 'large'), _classNames4)); // Need another wrapper for changing display:table to display:inline-block
          // and put style prop in wrapper

          return createVNode("span", {
            "class": mergedGroupClassName,
            "style": style
          }, [createVNode("span", {
            "class": mergedWrapperClassName
          }, [addonBeforeNode, cloneElement(labeledElement, {
            style: null
          }), addonAfterNode])]);
        },
        renderTextAreaWithClearIcon: function renderTextAreaWithClearIcon(prefixCls, element) {
          var _this$$props4 = this.$props,
              value = _this$$props4.value,
              allowClear = _this$$props4.allowClear;
          var _this$$attrs2 = this.$attrs,
              style = _this$$attrs2.style,
              className = _this$$attrs2.class;

          if (!allowClear) {
            return cloneElement(element, {
              value: value
            });
          }

          var affixWrapperCls = classNames(className, "".concat(prefixCls, "-affix-wrapper"), "".concat(prefixCls, "-affix-wrapper-textarea-with-clear-btn"));
          return createVNode("span", {
            "class": affixWrapperCls,
            "style": style
          }, [cloneElement(element, {
            style: null,
            value: value
          }), this.renderClearIcon(prefixCls)]);
        },
        renderClearableLabeledInput: function renderClearableLabeledInput() {
          var _this$$props5 = this.$props,
              prefixCls = _this$$props5.prefixCls,
              inputType = _this$$props5.inputType,
              element = _this$$props5.element;

          if (inputType === ClearableInputType[0]) {
            return this.renderTextAreaWithClearIcon(prefixCls, element);
          }

          return this.renderInputWithLabel(prefixCls, this.renderLabeledIcon(prefixCls, element));
        }
      },
      render: function render() {
        return this.renderClearableLabeledInput();
      }
    });
    var ClearableLabeledInput$1 = ClearableLabeledInput;

    function fixControlledValue(value) {
      if (typeof value === 'undefined' || value === null) {
        return '';
      }

      return value;
    }
    function resolveOnChange(target, e, onChange) {
      if (onChange) {
        var event = e;

        if (e.type === 'click') {
          // click clear icon
          //event = Object.create(e);
          Object.defineProperty(event, 'target', {
            writable: true
          });
          Object.defineProperty(event, 'currentTarget', {
            writable: true
          });
          event.target = target;
          event.currentTarget = target;
          var originalInputValue = target.value; // change target ref value cause e.target.value should be '' when clear input

          target.value = '';
          onChange(event); // reset target ref value

          target.value = originalInputValue;
          return;
        }

        onChange(event);
      }
    }
    function getInputClassName(prefixCls, size, disabled) {
      var _classNames;

      return classNames(prefixCls, (_classNames = {}, _defineProperty$8(_classNames, "".concat(prefixCls, "-sm"), size === 'small'), _defineProperty$8(_classNames, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty$8(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
    }
    var Input = defineComponent({
      name: 'AInput',
      inheritAttrs: false,
      props: _extends({}, inputProps),
      setup: function setup() {
        return {
          configProvider: inject('configProvider', defaultConfigProvider),
          removePasswordTimeout: undefined,
          input: null,
          clearableInput: null
        };
      },
      data: function data() {
        var props = this.$props;
        var value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
        return {
          stateValue: typeof value === 'undefined' ? '' : value,
          isFocused: false
        };
      },
      watch: {
        value: function value(val) {
          this.stateValue = val;
        }
      },
      mounted: function mounted() {
        var _this = this;

        nextTick(function () {
          if (process.env.NODE_ENV === 'test') {
            if (_this.autofocus) {
              _this.focus();
            }
          }

          _this.clearPasswordValueAttribute();
        });
      },
      beforeUnmount: function beforeUnmount() {
        if (this.removePasswordTimeout) {
          clearTimeout(this.removePasswordTimeout);
        }
      },
      methods: {
        handleInputFocus: function handleInputFocus(e) {
          this.isFocused = true;
          this.onFocus && this.onFocus(e);
        },
        handleInputBlur: function handleInputBlur(e) {
          this.isFocused = false;
          this.onBlur && this.onBlur(e);
        },
        focus: function focus() {
          this.input.focus();
        },
        blur: function blur() {
          this.input.blur();
        },
        select: function select() {
          this.input.select();
        },
        saveClearableInput: function saveClearableInput(input) {
          this.clearableInput = input;
        },
        saveInput: function saveInput(input) {
          this.input = input;
        },
        setValue: function setValue(value, callback) {
          if (this.stateValue === value) {
            return;
          }

          if (!hasProp(this, 'value')) {
            this.stateValue = value;
          } else {
            this.$forceUpdate();
          }

          nextTick(function () {
            callback && callback();
          });
        },
        triggerChange: function triggerChange(e) {
          this.$emit('update:value', e.target.value);
          this.$emit('change', e);
          this.$emit('input', e);
        },
        handleReset: function handleReset(e) {
          var _this2 = this;

          this.setValue('', function () {
            _this2.focus();
          });
          resolveOnChange(this.input, e, this.triggerChange);
        },
        renderInput: function renderInput(prefixCls, _ref) {
          var addonBefore = _ref.addonBefore,
              addonAfter = _ref.addonAfter;
          var otherProps = omit(this.$props, ['prefixCls', 'onPressEnter', 'addonBefore', 'addonAfter', 'prefix', 'suffix', 'allowClear', 'defaultValue', 'lazy', 'size', 'inputPrefixCls', 'loading']);
          var handleKeyDown = this.handleKeyDown,
              handleChange = this.handleChange,
              handleInputFocus = this.handleInputFocus,
              handleInputBlur = this.handleInputBlur,
              size = this.size,
              disabled = this.disabled,
              $attrs = this.$attrs;

          var inputProps = _extends(_extends(_extends({}, otherProps), $attrs), {
            onKeydown: handleKeyDown,
            class: classNames(getInputClassName(prefixCls, size, disabled), _defineProperty$8({}, $attrs.class, $attrs.class && !addonBefore && !addonAfter)),
            ref: this.saveInput,
            key: 'ant-input',
            onInput: handleChange,
            onChange: handleChange,
            onFocus: handleInputFocus,
            onBlur: handleInputBlur
          });

          if (!inputProps.autofocus) {
            delete inputProps.autofocus;
          }

          var inputNode = createVNode("input", inputProps, null);

          return withDirectives(inputNode);
        },
        clearPasswordValueAttribute: function clearPasswordValueAttribute() {
          var _this3 = this;

          // https://github.com/ant-design/ant-design/issues/20541
          this.removePasswordTimeout = setTimeout(function () {
            if (_this3.input && _this3.input.getAttribute && _this3.input.getAttribute('type') === 'password' && _this3.input.hasAttribute('value')) {
              _this3.input.removeAttribute('value');
            }
          });
        },
        handleChange: function handleChange(e) {
          var _e$target = e.target,
              value = _e$target.value,
              composing = _e$target.composing,
              isComposing = _e$target.isComposing; // https://github.com/vueComponent/ant-design-vue/issues/2203

          if ((isComposing || composing) && this.lazy || this.stateValue === value) return;
          this.setValue(value, this.clearPasswordValueAttribute);
          resolveOnChange(this.input, e, this.triggerChange);
        },
        handleKeyDown: function handleKeyDown(e) {
          if (e.keyCode === 13) {
            this.$emit('pressEnter', e);
          }

          this.$emit('keydown', e);
        }
      },
      render: function render() {
        var customizePrefixCls = this.$props.prefixCls;
        var _this$$data = this.$data,
            stateValue = _this$$data.stateValue,
            isFocused = _this$$data.isFocused;
        var getPrefixCls = this.configProvider.getPrefixCls;
        var prefixCls = getPrefixCls('input', customizePrefixCls);
        var addonAfter = getComponent(this, 'addonAfter');
        var addonBefore = getComponent(this, 'addonBefore');
        var suffix = getComponent(this, 'suffix');
        var prefix = getComponent(this, 'prefix');

        var props = _extends(_extends(_extends({}, this.$attrs), getOptionProps(this)), {
          prefixCls: prefixCls,
          inputType: 'input',
          value: fixControlledValue(stateValue),
          element: this.renderInput(prefixCls, {
            addonAfter: addonAfter,
            addonBefore: addonBefore
          }),
          handleReset: this.handleReset,
          addonAfter: addonAfter,
          addonBefore: addonBefore,
          suffix: suffix,
          prefix: prefix,
          isFocused: isFocused
        });

        return createVNode(ClearableLabeledInput$1, _objectSpread2(_objectSpread2({}, props), {}, {
          "ref": this.saveClearableInput
        }), null);
      }
    });

    var Group = defineComponent({
      name: 'AInputGroup',
      props: {
        prefixCls: PropTypes$1.string,
        size: PropTypes$1.oneOf(tuple('small', 'large', 'default')),
        compact: PropTypes$1.looseBool
      },
      setup: function setup() {
        return {
          configProvider: inject('configProvider', defaultConfigProvider)
        };
      },
      computed: {
        classes: function classes() {
          var _ref;

          var customizePrefixCls = this.prefixCls,
              size = this.size,
              _this$compact = this.compact,
              compact = _this$compact === void 0 ? false : _this$compact,
              configProvider = this.configProvider;
          var getPrefixCls = configProvider.getPrefixCls;
          var prefixCls = getPrefixCls('input-group', customizePrefixCls);
          return _ref = {}, _defineProperty$8(_ref, "".concat(prefixCls), true), _defineProperty$8(_ref, "".concat(prefixCls, "-lg"), size === 'large'), _defineProperty$8(_ref, "".concat(prefixCls, "-sm"), size === 'small'), _defineProperty$8(_ref, "".concat(prefixCls, "-compact"), compact), _ref;
        }
      },
      render: function render() {
        return createVNode("span", {
          "class": this.classes
        }, [getSlot(this)]);
      }
    });

    // MIT License from https://github.com/kaimallea/isMobile
    var applePhone = /iPhone/i;
    var appleIpod = /iPod/i;
    var appleTablet = /iPad/i;
    var androidPhone = /\bAndroid(?:.+)Mobile\b/i; // Match 'Android' AND 'Mobile'

    var androidTablet = /Android/i;
    var amazonPhone = /\bAndroid(?:.+)SD4930UR\b/i;
    var amazonTablet = /\bAndroid(?:.+)(?:KF[A-Z]{2,4})\b/i;
    var windowsPhone = /Windows Phone/i;
    var windowsTablet = /\bWindows(?:.+)ARM\b/i; // Match 'Windows' AND 'ARM'

    var otherBlackberry = /BlackBerry/i;
    var otherBlackberry10 = /BB10/i;
    var otherOpera = /Opera Mini/i;
    var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
    var otherFirefox = /Mobile(?:.+)Firefox\b/i; // Match 'Mobile' AND 'Firefox'

    function match(regex, userAgent) {
      return regex.test(userAgent);
    }

    function isMobile(userAgent) {
      var ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : ''); // Facebook mobile app's integrated browser adds a bunch of strings that
      // match everything. Strip it out if it exists.

      var tmp = ua.split('[FBAN');

      if (typeof tmp[1] !== 'undefined') {
        var _tmp = tmp;

        var _tmp2 = _slicedToArray$2(_tmp, 1);

        ua = _tmp2[0];
      } // Twitter mobile app's integrated browser on iPad adds a "Twitter for
      // iPhone" string. Same probably happens on other tablet platforms.
      // This will confuse detection so strip it out if it exists.


      tmp = ua.split('Twitter');

      if (typeof tmp[1] !== 'undefined') {
        var _tmp3 = tmp;

        var _tmp4 = _slicedToArray$2(_tmp3, 1);

        ua = _tmp4[0];
      }

      var result = {
        apple: {
          phone: match(applePhone, ua) && !match(windowsPhone, ua),
          ipod: match(appleIpod, ua),
          tablet: !match(applePhone, ua) && match(appleTablet, ua) && !match(windowsPhone, ua),
          device: (match(applePhone, ua) || match(appleIpod, ua) || match(appleTablet, ua)) && !match(windowsPhone, ua)
        },
        amazon: {
          phone: match(amazonPhone, ua),
          tablet: !match(amazonPhone, ua) && match(amazonTablet, ua),
          device: match(amazonPhone, ua) || match(amazonTablet, ua)
        },
        android: {
          phone: !match(windowsPhone, ua) && match(amazonPhone, ua) || !match(windowsPhone, ua) && match(androidPhone, ua),
          tablet: !match(windowsPhone, ua) && !match(amazonPhone, ua) && !match(androidPhone, ua) && (match(amazonTablet, ua) || match(androidTablet, ua)),
          device: !match(windowsPhone, ua) && (match(amazonPhone, ua) || match(amazonTablet, ua) || match(androidPhone, ua) || match(androidTablet, ua)) || match(/\bokhttp\b/i, ua)
        },
        windows: {
          phone: match(windowsPhone, ua),
          tablet: match(windowsTablet, ua),
          device: match(windowsPhone, ua) || match(windowsTablet, ua)
        },
        other: {
          blackberry: match(otherBlackberry, ua),
          blackberry10: match(otherBlackberry10, ua),
          opera: match(otherOpera, ua),
          firefox: match(otherFirefox, ua),
          chrome: match(otherChrome, ua),
          device: match(otherBlackberry, ua) || match(otherBlackberry10, ua) || match(otherOpera, ua) || match(otherFirefox, ua) || match(otherChrome, ua)
        },
        // Additional
        any: null,
        phone: null,
        tablet: null
      };
      result.any = result.apple.device || result.android.device || result.windows.device || result.other.device; // excludes 'other' devices and ipods, targeting touchscreen phones

      result.phone = result.apple.phone || result.android.phone || result.windows.phone;
      result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
      return result;
    }

    var defaultResult = _extends(_extends({}, isMobile()), {
      isMobile: isMobile
    });

    var isMobile$1 = defaultResult;

    // This icon file is generated automatically.
    var LoadingOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, "name": "loading", "theme": "outlined" };
    var LoadingOutlinedSvg = LoadingOutlined$2;

    function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$3(target, key, source[key]); }); } return target; }

    function _defineProperty$3(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var LoadingOutlined = function LoadingOutlined(props, context) {
      var p = _objectSpread$3({}, props, context.attrs);

      return createVNode(AntdIcon, mergeProps(p, {
        "icon": LoadingOutlinedSvg
      }), null);
    };

    LoadingOutlined.displayName = 'LoadingOutlined';
    LoadingOutlined.inheritAttrs = false;
    var LoadingOutlined$1 = LoadingOutlined;

    // This icon file is generated automatically.
    var SearchOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" } }] }, "name": "search", "theme": "outlined" };
    var SearchOutlinedSvg = SearchOutlined$2;

    function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$2(target, key, source[key]); }); } return target; }

    function _defineProperty$2(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var SearchOutlined = function SearchOutlined(props, context) {
      var p = _objectSpread$2({}, props, context.attrs);

      return createVNode(AntdIcon, mergeProps(p, {
        "icon": SearchOutlinedSvg
      }), null);
    };

    SearchOutlined.displayName = 'SearchOutlined';
    SearchOutlined.inheritAttrs = false;
    var SearchOutlined$1 = SearchOutlined;

    var START_EVENT_NAME_MAP = {
      transitionstart: {
        transition: 'transitionstart',
        WebkitTransition: 'webkitTransitionStart',
        MozTransition: 'mozTransitionStart',
        OTransition: 'oTransitionStart',
        msTransition: 'MSTransitionStart'
      },
      animationstart: {
        animation: 'animationstart',
        WebkitAnimation: 'webkitAnimationStart',
        MozAnimation: 'mozAnimationStart',
        OAnimation: 'oAnimationStart',
        msAnimation: 'MSAnimationStart'
      }
    };
    var END_EVENT_NAME_MAP = {
      transitionend: {
        transition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'mozTransitionEnd',
        OTransition: 'oTransitionEnd',
        msTransition: 'MSTransitionEnd'
      },
      animationend: {
        animation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        OAnimation: 'oAnimationEnd',
        msAnimation: 'MSAnimationEnd'
      }
    };
    var startEvents = [];
    var endEvents = [];

    function detectEvents() {
      var testEl = document.createElement('div');
      var style = testEl.style;

      if (!('AnimationEvent' in window)) {
        delete START_EVENT_NAME_MAP.animationstart.animation;
        delete END_EVENT_NAME_MAP.animationend.animation;
      }

      if (!('TransitionEvent' in window)) {
        delete START_EVENT_NAME_MAP.transitionstart.transition;
        delete END_EVENT_NAME_MAP.transitionend.transition;
      }

      function process(EVENT_NAME_MAP, events) {
        for (var baseEventName in EVENT_NAME_MAP) {
          if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
            var baseEvents = EVENT_NAME_MAP[baseEventName];

            for (var styleName in baseEvents) {
              if (styleName in style) {
                events.push(baseEvents[styleName]);
                break;
              }
            }
          }
        }
      }

      process(START_EVENT_NAME_MAP, startEvents);
      process(END_EVENT_NAME_MAP, endEvents);
    }

    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      detectEvents();
    }

    function addEventListener(node, eventName, eventListener) {
      node.addEventListener(eventName, eventListener, false);
    }

    function removeEventListener(node, eventName, eventListener) {
      node.removeEventListener(eventName, eventListener, false);
    }

    var TransitionEvents = {
      // Start events
      startEvents: startEvents,
      addStartEventListener: function addStartEventListener(node, eventListener) {
        if (startEvents.length === 0) {
          window.setTimeout(eventListener, 0);
          return;
        }

        startEvents.forEach(function (startEvent) {
          addEventListener(node, startEvent, eventListener);
        });
      },
      removeStartEventListener: function removeStartEventListener(node, eventListener) {
        if (startEvents.length === 0) {
          return;
        }

        startEvents.forEach(function (startEvent) {
          removeEventListener(node, startEvent, eventListener);
        });
      },
      // End events
      endEvents: endEvents,
      addEndEventListener: function addEndEventListener(node, eventListener) {
        if (endEvents.length === 0) {
          window.setTimeout(eventListener, 0);
          return;
        }

        endEvents.forEach(function (endEvent) {
          addEventListener(node, endEvent, eventListener);
        });
      },
      removeEndEventListener: function removeEndEventListener(node, eventListener) {
        if (endEvents.length === 0) {
          return;
        }

        endEvents.forEach(function (endEvent) {
          removeEventListener(node, endEvent, eventListener);
        });
      }
    };
    var TransitionEvents$1 = TransitionEvents;

    var id = 0;
    var ids = {}; // Support call raf with delay specified frame

    function wrapperRaf(callback) {
      var delayFrames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var myId = id++;
      var restFrames = delayFrames;

      function internalCallback() {
        restFrames -= 1;

        if (restFrames <= 0) {
          callback();
          delete ids[myId];
        } else {
          ids[myId] = requestAnimationFrame(internalCallback);
        }
      }

      ids[myId] = requestAnimationFrame(internalCallback);
      return myId;
    }

    wrapperRaf.cancel = function cancel(pid) {
      if (pid === undefined) return;
      cancelAnimationFrame(ids[pid]);
      delete ids[pid];
    };

    wrapperRaf.ids = ids; // export this for test usage

    var styleForPesudo; // Where el is the DOM element you'd like to test for visibility

    function isHidden(element) {
      if (process.env.NODE_ENV === 'test') {
        return false;
      }

      return !element || element.offsetParent === null;
    }

    function isNotGrey(color) {
      // eslint-disable-next-line no-useless-escape
      var match = (color || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\.\d]*)?\)/);

      if (match && match[1] && match[2] && match[3]) {
        return !(match[1] === match[2] && match[2] === match[3]);
      }

      return true;
    }

    var Wave = defineComponent({
      name: 'Wave',
      props: ['insertExtraNode'],
      setup: function setup() {
        var configProvider = inject('configProvider', defaultConfigProvider);
        return {
          configProvider: configProvider
        };
      },
      mounted: function mounted() {
        var _this = this;

        nextTick(function () {
          var node = findDOMNode(_this);

          if (node.nodeType !== 1) {
            return;
          }

          _this.instance = _this.bindAnimationEvent(node);
        });
      },
      beforeUnmount: function beforeUnmount() {
        if (this.instance) {
          this.instance.cancel();
        }

        if (this.clickWaveTimeoutId) {
          clearTimeout(this.clickWaveTimeoutId);
        }
      },
      methods: {
        onClick: function onClick(node, waveColor) {
          if (!node || isHidden(node) || node.className.indexOf('-leave') >= 0) {
            return;
          }

          var insertExtraNode = this.$props.insertExtraNode;
          this.extraNode = document.createElement('div');
          var extraNode = this.extraNode;
          extraNode.className = 'ant-click-animating-node';
          var attributeName = this.getAttributeName();
          node.removeAttribute(attributeName);
          node.setAttribute(attributeName, 'true'); // Not white or transparent or grey

          styleForPesudo = styleForPesudo || document.createElement('style');

          if (waveColor && waveColor !== '#ffffff' && waveColor !== 'rgb(255, 255, 255)' && isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) && // any transparent rgba color
          waveColor !== 'transparent') {
            // Add nonce if CSP exist
            if (this.csp && this.csp.nonce) {
              styleForPesudo.nonce = this.csp.nonce;
            }

            extraNode.style.borderColor = waveColor;
            styleForPesudo.innerHTML = "\n        [ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node {\n          --antd-wave-shadow-color: ".concat(waveColor, ";\n        }");

            if (!document.body.contains(styleForPesudo)) {
              document.body.appendChild(styleForPesudo);
            }
          }

          if (insertExtraNode) {
            node.appendChild(extraNode);
          }

          TransitionEvents$1.addStartEventListener(node, this.onTransitionStart);
          TransitionEvents$1.addEndEventListener(node, this.onTransitionEnd);
        },
        onTransitionStart: function onTransitionStart(e) {
          if (this._.isUnmounted) return;
          var node = findDOMNode(this);

          if (!e || e.target !== node) {
            return;
          }

          if (!this.animationStart) {
            this.resetEffect(node);
          }
        },
        onTransitionEnd: function onTransitionEnd(e) {
          if (!e || e.animationName !== 'fadeEffect') {
            return;
          }

          this.resetEffect(e.target);
        },
        getAttributeName: function getAttributeName() {
          var insertExtraNode = this.$props.insertExtraNode;
          return insertExtraNode ? 'ant-click-animating' : 'ant-click-animating-without-extra-node';
        },
        bindAnimationEvent: function bindAnimationEvent(node) {
          var _this2 = this;

          if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
            return;
          }

          var onClick = function onClick(e) {
            // Fix radio button click twice
            if (e.target.tagName === 'INPUT' || isHidden(e.target)) {
              return;
            }

            _this2.resetEffect(node); // Get wave color from target


            var waveColor = getComputedStyle(node).getPropertyValue('border-top-color') || // Firefox Compatible
            getComputedStyle(node).getPropertyValue('border-color') || getComputedStyle(node).getPropertyValue('background-color');
            _this2.clickWaveTimeoutId = window.setTimeout(function () {
              return _this2.onClick(node, waveColor);
            }, 0);
            wrapperRaf.cancel(_this2.animationStartId);
            _this2.animationStart = true; // Render to trigger transition event cost 3 frames. Let's delay 10 frames to reset this.

            _this2.animationStartId = wrapperRaf(function () {
              _this2.animationStart = false;
            }, 10);
          };

          node.addEventListener('click', onClick, true);
          return {
            cancel: function cancel() {
              node.removeEventListener('click', onClick, true);
            }
          };
        },
        resetEffect: function resetEffect(node) {
          if (!node || node === this.extraNode || !(node instanceof Element)) {
            return;
          }

          var insertExtraNode = this.$props.insertExtraNode;
          var attributeName = this.getAttributeName();
          node.setAttribute(attributeName, 'false'); // edge has bug on `removeAttribute` #14466

          if (styleForPesudo) {
            styleForPesudo.innerHTML = '';
          }

          if (insertExtraNode && this.extraNode && node.contains(this.extraNode)) {
            node.removeChild(this.extraNode);
          }

          TransitionEvents$1.removeStartEventListener(node, this.onTransitionStart);
          TransitionEvents$1.removeEndEventListener(node, this.onTransitionEnd);
        }
      },
      render: function render() {
        var _a, _b;

        var csp = this.configProvider.csp;

        if (csp) {
          this.csp = csp;
        }

        return (_b = (_a = this.$slots).default) === null || _b === void 0 ? void 0 : _b.call(_a)[0];
      }
    });

    var ButtonTypes = tuple('default', 'primary', 'ghost', 'dashed', 'link', 'text');
    var ButtonShapes = tuple('circle', 'round');
    var ButtonHTMLTypes = tuple('submit', 'button', 'reset');

    var buttonProps = function buttonProps() {
      return {
        prefixCls: PropTypes$1.string,
        type: PropTypes$1.oneOf(ButtonTypes),
        htmlType: PropTypes$1.oneOf(ButtonHTMLTypes).def('button'),
        shape: PropTypes$1.oneOf(ButtonShapes),
        size: {
          type: String
        },
        loading: {
          type: [Boolean, Object],
          default: function _default() {
            return false;
          }
        },
        disabled: PropTypes$1.looseBool,
        ghost: PropTypes$1.looseBool,
        block: PropTypes$1.looseBool,
        danger: PropTypes$1.looseBool,
        icon: PropTypes$1.VNodeChild,
        href: PropTypes$1.string,
        target: PropTypes$1.string,
        title: PropTypes$1.string,
        onClick: {
          type: Function
        }
      };
    };

    var buttonTypes = buttonProps;

    var useConfigInject = (function (name, props) {
      var configProvider = inject('configProvider', defaultConfigProvider);
      var prefixCls = computed(function () {
        return configProvider.getPrefixCls(name, props.prefixCls);
      });
      var direction = computed(function () {
        return configProvider.direction;
      });
      var autoInsertSpaceInButton = computed(function () {
        return configProvider.autoInsertSpaceInButton;
      });
      var renderEmpty = computed(function () {
        return configProvider.renderEmpty;
      });
      var space = computed(function () {
        return configProvider.space;
      });
      var pageHeader = computed(function () {
        return configProvider.pageHeader;
      });
      var form = computed(function () {
        return configProvider.form;
      });
      var size = computed(function () {
        return props.size || configProvider.componentSize;
      });
      var getTargetContainer = computed(function () {
        return props.getTargetContainer;
      });
      return {
        configProvider: configProvider,
        prefixCls: prefixCls,
        direction: direction,
        size: size,
        getTargetContainer: getTargetContainer,
        space: space,
        pageHeader: pageHeader,
        form: form,
        autoInsertSpaceInButton: autoInsertSpaceInButton,
        renderEmpty: renderEmpty
      };
    });

    var devWarning = (function (valid, component, message) {
      warningOnce(valid, "[ant-design-vue: ".concat(component, "] ").concat(message));
    });

    var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
    var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
    var props = buttonTypes();

    function isUnborderedButtonType(type) {
      return type === 'text' || type === 'link';
    }

    var Button = defineComponent({
      name: 'AButton',
      inheritAttrs: false,
      __ANT_BUTTON: true,
      props: props,
      slots: ['icon'],
      emits: ['click'],
      setup: function setup(props, _ref) {
        var slots = _ref.slots,
            attrs = _ref.attrs,
            emit = _ref.emit;

        var _useConfigInject = useConfigInject('btn', props),
            prefixCls = _useConfigInject.prefixCls,
            autoInsertSpaceInButton = _useConfigInject.autoInsertSpaceInButton,
            direction = _useConfigInject.direction;

        var buttonNodeRef = ref(null);
        var delayTimeoutRef = ref(undefined);
        var isNeedInserted = false;
        var innerLoading = ref(false);
        var hasTwoCNChar = ref(false);
        var autoInsertSpace = computed(function () {
          return autoInsertSpaceInButton.value !== false;
        }); // =============== Update Loading ===============

        var loadingOrDelay = computed(function () {
          return _typeof(props.loading) === 'object' && props.loading.delay ? props.loading.delay || true : !!props.loading;
        });
        watch(loadingOrDelay, function (val) {
          clearTimeout(delayTimeoutRef.value);

          if (typeof loadingOrDelay.value === 'number') {
            delayTimeoutRef.value = window.setTimeout(function () {
              innerLoading.value = val;
            }, loadingOrDelay.value);
          } else {
            innerLoading.value = val;
          }
        }, {
          immediate: true
        });
        var classes = computed(function () {
          var _ref2;

          var type = props.type,
              shape = props.shape,
              size = props.size,
              ghost = props.ghost,
              block = props.block,
              danger = props.danger;
          var pre = prefixCls.value; // large => lg
          // small => sm

          var sizeCls = '';

          switch (size) {
            case 'large':
              sizeCls = 'lg';
              break;

            case 'small':
              sizeCls = 'sm';
              break;
          }

          return _ref2 = {}, _defineProperty$8(_ref2, "".concat(pre), true), _defineProperty$8(_ref2, "".concat(pre, "-").concat(type), type), _defineProperty$8(_ref2, "".concat(pre, "-").concat(shape), shape), _defineProperty$8(_ref2, "".concat(pre, "-").concat(sizeCls), sizeCls), _defineProperty$8(_ref2, "".concat(pre, "-loading"), innerLoading.value), _defineProperty$8(_ref2, "".concat(pre, "-background-ghost"), ghost && !isUnborderedButtonType(type)), _defineProperty$8(_ref2, "".concat(pre, "-two-chinese-chars"), hasTwoCNChar.value && autoInsertSpace.value), _defineProperty$8(_ref2, "".concat(pre, "-block"), block), _defineProperty$8(_ref2, "".concat(pre, "-dangerous"), !!danger), _defineProperty$8(_ref2, "".concat(pre, "-rtl"), direction.value === 'rtl'), _ref2;
        });

        var fixTwoCNChar = function fixTwoCNChar() {
          // Fix for HOC usage like <FormatMessage />
          var node = buttonNodeRef.value;

          if (!node || autoInsertSpaceInButton.value === false) {
            return;
          }

          var buttonText = node.textContent;

          if (isNeedInserted && isTwoCNChar(buttonText)) {
            if (!hasTwoCNChar.value) {
              hasTwoCNChar.value = true;
            }
          } else if (hasTwoCNChar.value) {
            hasTwoCNChar.value = false;
          }
        };

        var handleClick = function handleClick(event) {
          // https://github.com/ant-design/ant-design/issues/30207
          if (innerLoading.value || props.disabled) {
            event.preventDefault();
            return;
          }

          emit('click', event);
        };

        var insertSpace = function insertSpace(child, needInserted) {
          var SPACE = needInserted ? ' ' : '';

          if (child.type === Text) {
            var text = child.children.trim();

            if (isTwoCNChar(text)) {
              text = text.split('').join(SPACE);
            }

            return createVNode("span", null, [text]);
          }

          return child;
        };

        watchEffect(function () {
          devWarning(!(props.ghost && isUnborderedButtonType(props.type)), 'Button', "`link` or `text` button can't be a `ghost` button.");
        });
        onMounted(fixTwoCNChar);
        onUpdated(fixTwoCNChar);
        onBeforeUnmount(function () {
          delayTimeoutRef.value && clearTimeout(delayTimeoutRef.value);
        });
        return function () {
          var children = flattenChildren(getPropsSlot(slots, props));
          var icon = getPropsSlot(slots, props, 'icon');
          isNeedInserted = children.length === 1 && !icon && !isUnborderedButtonType(props.type);
          var type = props.type,
              htmlType = props.htmlType,
              disabled = props.disabled,
              href = props.href,
              title = props.title,
              target = props.target;
          var iconType = innerLoading.value ? 'loading' : icon;

          var buttonProps = _extends(_extends({}, attrs), {
            title: title,
            disabled: disabled,
            class: [classes.value, attrs.class, _defineProperty$8({}, "".concat(prefixCls.value, "-icon-only"), children.length === 0 && !!iconType)],
            onClick: handleClick
          });

          var iconNode = innerLoading.value ? createVNode(LoadingOutlined$1, null, null) : icon;
          var kids = children.map(function (child) {
            return insertSpace(child, isNeedInserted && autoInsertSpace.value);
          });

          if (href !== undefined) {
            return createVNode("a", _objectSpread2(_objectSpread2({}, buttonProps), {}, {
              "href": href,
              "target": target,
              "ref": buttonNodeRef
            }), [iconNode, kids]);
          }

          var buttonNode = createVNode("button", _objectSpread2(_objectSpread2({}, buttonProps), {}, {
            "ref": buttonNodeRef,
            "type": htmlType
          }), [iconNode, kids]);

          if (isUnborderedButtonType(type)) {
            return buttonNode;
          }

          return createVNode(Wave, {
            "ref": "wave"
          }, {
            default: function _default() {
              return [buttonNode];
            }
          });
        };
      }
    });

    var buttonGroupProps = {
      prefixCls: PropTypes$1.string,
      size: {
        type: String
      }
    };
    var ButtonGroup = defineComponent({
      name: 'AButtonGroup',
      props: buttonGroupProps,
      setup: function setup(props, _ref) {
        var slots = _ref.slots;

        var _useConfigInject = useConfigInject('btn-group', props),
            prefixCls = _useConfigInject.prefixCls,
            direction = _useConfigInject.direction;

        var classes = computed(function () {
          var _ref2;

          var size = props.size; // large => lg
          // small => sm

          var sizeCls = '';

          switch (size) {
            case 'large':
              sizeCls = 'lg';
              break;

            case 'small':
              sizeCls = 'sm';
              break;
          }

          return _ref2 = {}, _defineProperty$8(_ref2, "".concat(prefixCls.value), true), _defineProperty$8(_ref2, "".concat(prefixCls.value, "-").concat(sizeCls), sizeCls), _defineProperty$8(_ref2, "".concat(prefixCls.value, "-rtl"), direction.value === 'rtl'), _ref2;
        });
        return function () {
          var _a;

          return createVNode("div", {
            "class": classes.value
          }, [flattenChildren((_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots))]);
        };
      }
    });

    Button.Group = ButtonGroup;
    /* istanbul ignore next */

    Button.install = function (app) {
      app.component(Button.name, Button);
      app.component(ButtonGroup.name, ButtonGroup);
      return app;
    };

    var __rest$1 = undefined && undefined.__rest || function (s, e) {
      var t = {};

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      }

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    };
    var Search = defineComponent({
      name: 'AInputSearch',
      inheritAttrs: false,
      props: _extends(_extends({}, inputProps), {
        // 不能设置默认值 https://github.com/vueComponent/ant-design-vue/issues/1916
        enterButton: PropTypes$1.VNodeChild,
        onSearch: PropTypes$1.func
      }),
      setup: function setup() {
        return {
          configProvider: inject('configProvider', defaultConfigProvider),
          input: null
        };
      },
      methods: {
        saveInput: function saveInput(node) {
          this.input = node;
        },
        handleChange: function handleChange(e) {
          this.$emit('update:value', e.target.value);

          if (e && e.target && e.type === 'click') {
            this.$emit('search', e.target.value, e);
          }

          this.$emit('change', e);
        },
        handleSearch: function handleSearch(e) {
          if (this.loading || this.disabled) {
            return;
          }

          this.$emit('search', this.input.stateValue, e);

          if (!isMobile$1.tablet) {
            this.input.focus();
          }
        },
        focus: function focus() {
          this.input.focus();
        },
        blur: function blur() {
          this.input.blur();
        },
        renderLoading: function renderLoading(prefixCls) {
          var size = this.$props.size;
          var enterButton = getComponent(this, 'enterButton'); // 兼容 <a-input-search enterButton />， 因enterButton类型为 any，此类写法 enterButton 为空字符串

          enterButton = enterButton || enterButton === '';

          if (enterButton) {
            return createVNode(Button, {
              "class": "".concat(prefixCls, "-button"),
              "type": "primary",
              "size": size,
              "key": "enterButton"
            }, {
              default: function _default() {
                return [createVNode(LoadingOutlined$1, null, null)];
              }
            });
          }

          return createVNode(LoadingOutlined$1, {
            "class": "".concat(prefixCls, "-icon"),
            "key": "loadingIcon"
          }, null);
        },
        renderSuffix: function renderSuffix(prefixCls) {
          var loading = this.loading;
          var suffix = getComponent(this, 'suffix');
          var enterButton = getComponent(this, 'enterButton'); // 兼容 <a-input-search enterButton />， 因enterButton类型为 any，此类写法 enterButton 为空字符串

          enterButton = enterButton || enterButton === '';

          if (loading && !enterButton) {
            return [suffix, this.renderLoading(prefixCls)];
          }

          if (enterButton) return suffix;

          var icon = createVNode(SearchOutlined$1, {
            "class": "".concat(prefixCls, "-icon"),
            "key": "searchIcon",
            "onClick": this.handleSearch
          }, null);

          if (suffix) {
            // let cloneSuffix = suffix;
            // if (isValidElement(cloneSuffix) && !cloneSuffix.key) {
            //   cloneSuffix = cloneElement(cloneSuffix, {
            //     key: 'originSuffix',
            //   });
            // }
            return [suffix, icon];
          }

          return icon;
        },
        renderAddonAfter: function renderAddonAfter(prefixCls) {
          var size = this.size,
              disabled = this.disabled,
              loading = this.loading;
          var btnClassName = "".concat(prefixCls, "-button");
          var enterButton = getComponent(this, 'enterButton');
          enterButton = enterButton || enterButton === '';
          var addonAfter = getComponent(this, 'addonAfter');

          if (loading && enterButton) {
            return [this.renderLoading(prefixCls), addonAfter];
          }

          if (!enterButton) return addonAfter;
          var enterButtonAsElement = Array.isArray(enterButton) ? enterButton[0] : enterButton;
          var button;

          var isAntdButton = enterButtonAsElement.type && isPlainObject(enterButtonAsElement.type) && enterButtonAsElement.type.__ANT_BUTTON;

          if (enterButtonAsElement.tagName === 'button' || isAntdButton) {
            button = cloneElement(enterButtonAsElement, _extends(_extends({
              key: 'enterButton',
              class: isAntdButton ? btnClassName : ''
            }, isAntdButton ? {
              size: size
            } : {}), {
              onClick: this.handleSearch
            }));
          } else {
            button = createVNode(Button, {
              "class": btnClassName,
              "type": "primary",
              "size": size,
              "disabled": disabled,
              "key": "enterButton",
              "onClick": this.handleSearch
            }, {
              default: function _default() {
                return [enterButton === true || enterButton === '' ? createVNode(SearchOutlined$1, null, null) : enterButton];
              }
            });
          }

          if (addonAfter) {
            return [button, addonAfter];
          }

          return button;
        }
      },
      render: function render() {
        var _a = _extends(_extends({}, getOptionProps(this)), this.$attrs),
            customizePrefixCls = _a.prefixCls,
            customizeInputPrefixCls = _a.inputPrefixCls,
            size = _a.size,
            className = _a.class,
            restProps = __rest$1(_a, ["prefixCls", "inputPrefixCls", "size", "class"]);

        delete restProps.onSearch;
        delete restProps.loading;
        delete restProps.enterButton;
        delete restProps.addonBefore;
        delete restProps['onUpdate:value'];
        var getPrefixCls = this.configProvider.getPrefixCls;
        var prefixCls = getPrefixCls('input-search', customizePrefixCls);
        var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
        var enterButton = getComponent(this, 'enterButton');
        var addonBefore = getComponent(this, 'addonBefore');
        enterButton = enterButton || enterButton === '';
        var inputClassName;

        if (enterButton) {
          var _classNames;

          inputClassName = classNames(prefixCls, className, (_classNames = {}, _defineProperty$8(_classNames, "".concat(prefixCls, "-enter-button"), !!enterButton), _defineProperty$8(_classNames, "".concat(prefixCls, "-").concat(size), !!size), _classNames));
        } else {
          inputClassName = classNames(prefixCls, className);
        }

        var inputProps = _extends(_extends({}, restProps), {
          prefixCls: inputPrefixCls,
          size: size,
          suffix: this.renderSuffix(prefixCls),
          prefix: getComponent(this, 'prefix'),
          addonAfter: this.renderAddonAfter(prefixCls),
          addonBefore: addonBefore,
          class: inputClassName,
          onPressEnter: this.handleSearch,
          onChange: this.handleChange
        });

        return createVNode(Input, _objectSpread2(_objectSpread2({}, inputProps), {}, {
          "ref": this.saveInput
        }), null);
      }
    });

    /**
     * A collection of shims that provide minimal functionality of the ES6 collections.
     *
     * These implementations are not meant to be used outside of the ResizeObserver
     * modules as they cover only a limited range of use cases.
     */
    /* eslint-disable require-jsdoc, valid-jsdoc */
    var MapShim = (function () {
        if (typeof Map !== 'undefined') {
            return Map;
        }
        /**
         * Returns index in provided array that matches the specified key.
         *
         * @param {Array<Array>} arr
         * @param {*} key
         * @returns {number}
         */
        function getIndex(arr, key) {
            var result = -1;
            arr.some(function (entry, index) {
                if (entry[0] === key) {
                    result = index;
                    return true;
                }
                return false;
            });
            return result;
        }
        return /** @class */ (function () {
            function class_1() {
                this.__entries__ = [];
            }
            Object.defineProperty(class_1.prototype, "size", {
                /**
                 * @returns {boolean}
                 */
                get: function () {
                    return this.__entries__.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * @param {*} key
             * @returns {*}
             */
            class_1.prototype.get = function (key) {
                var index = getIndex(this.__entries__, key);
                var entry = this.__entries__[index];
                return entry && entry[1];
            };
            /**
             * @param {*} key
             * @param {*} value
             * @returns {void}
             */
            class_1.prototype.set = function (key, value) {
                var index = getIndex(this.__entries__, key);
                if (~index) {
                    this.__entries__[index][1] = value;
                }
                else {
                    this.__entries__.push([key, value]);
                }
            };
            /**
             * @param {*} key
             * @returns {void}
             */
            class_1.prototype.delete = function (key) {
                var entries = this.__entries__;
                var index = getIndex(entries, key);
                if (~index) {
                    entries.splice(index, 1);
                }
            };
            /**
             * @param {*} key
             * @returns {void}
             */
            class_1.prototype.has = function (key) {
                return !!~getIndex(this.__entries__, key);
            };
            /**
             * @returns {void}
             */
            class_1.prototype.clear = function () {
                this.__entries__.splice(0);
            };
            /**
             * @param {Function} callback
             * @param {*} [ctx=null]
             * @returns {void}
             */
            class_1.prototype.forEach = function (callback, ctx) {
                if (ctx === void 0) { ctx = null; }
                for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
                    var entry = _a[_i];
                    callback.call(ctx, entry[1], entry[0]);
                }
            };
            return class_1;
        }());
    })();

    /**
     * Detects whether window and document objects are available in current environment.
     */
    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined' && window.document === document;

    // Returns global object of a current environment.
    var global$1 = (function () {
        if (typeof global !== 'undefined' && global.Math === Math) {
            return global;
        }
        if (typeof self !== 'undefined' && self.Math === Math) {
            return self;
        }
        if (typeof window !== 'undefined' && window.Math === Math) {
            return window;
        }
        // eslint-disable-next-line no-new-func
        return Function('return this')();
    })();

    /**
     * A shim for the requestAnimationFrame which falls back to the setTimeout if
     * first one is not supported.
     *
     * @returns {number} Requests' identifier.
     */
    var requestAnimationFrame$1 = (function () {
        if (typeof requestAnimationFrame === 'function') {
            // It's required to use a bounded function because IE sometimes throws
            // an "Invalid calling object" error if rAF is invoked without the global
            // object on the left hand side.
            return requestAnimationFrame.bind(global$1);
        }
        return function (callback) { return setTimeout(function () { return callback(Date.now()); }, 1000 / 60); };
    })();

    // Defines minimum timeout before adding a trailing call.
    var trailingTimeout = 2;
    /**
     * Creates a wrapper function which ensures that provided callback will be
     * invoked only once during the specified delay period.
     *
     * @param {Function} callback - Function to be invoked after the delay period.
     * @param {number} delay - Delay after which to invoke callback.
     * @returns {Function}
     */
    function throttle (callback, delay) {
        var leadingCall = false, trailingCall = false, lastCallTime = 0;
        /**
         * Invokes the original callback function and schedules new invocation if
         * the "proxy" was called during current request.
         *
         * @returns {void}
         */
        function resolvePending() {
            if (leadingCall) {
                leadingCall = false;
                callback();
            }
            if (trailingCall) {
                proxy();
            }
        }
        /**
         * Callback invoked after the specified delay. It will further postpone
         * invocation of the original function delegating it to the
         * requestAnimationFrame.
         *
         * @returns {void}
         */
        function timeoutCallback() {
            requestAnimationFrame$1(resolvePending);
        }
        /**
         * Schedules invocation of the original function.
         *
         * @returns {void}
         */
        function proxy() {
            var timeStamp = Date.now();
            if (leadingCall) {
                // Reject immediately following calls.
                if (timeStamp - lastCallTime < trailingTimeout) {
                    return;
                }
                // Schedule new call to be in invoked when the pending one is resolved.
                // This is important for "transitions" which never actually start
                // immediately so there is a chance that we might miss one if change
                // happens amids the pending invocation.
                trailingCall = true;
            }
            else {
                leadingCall = true;
                trailingCall = false;
                setTimeout(timeoutCallback, delay);
            }
            lastCallTime = timeStamp;
        }
        return proxy;
    }

    // Minimum delay before invoking the update of observers.
    var REFRESH_DELAY = 20;
    // A list of substrings of CSS properties used to find transition events that
    // might affect dimensions of observed elements.
    var transitionKeys = ['top', 'right', 'bottom', 'left', 'width', 'height', 'size', 'weight'];
    // Check if MutationObserver is available.
    var mutationObserverSupported = typeof MutationObserver !== 'undefined';
    /**
     * Singleton controller class which handles updates of ResizeObserver instances.
     */
    var ResizeObserverController = /** @class */ (function () {
        /**
         * Creates a new instance of ResizeObserverController.
         *
         * @private
         */
        function ResizeObserverController() {
            /**
             * Indicates whether DOM listeners have been added.
             *
             * @private {boolean}
             */
            this.connected_ = false;
            /**
             * Tells that controller has subscribed for Mutation Events.
             *
             * @private {boolean}
             */
            this.mutationEventsAdded_ = false;
            /**
             * Keeps reference to the instance of MutationObserver.
             *
             * @private {MutationObserver}
             */
            this.mutationsObserver_ = null;
            /**
             * A list of connected observers.
             *
             * @private {Array<ResizeObserverSPI>}
             */
            this.observers_ = [];
            this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
            this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
        }
        /**
         * Adds observer to observers list.
         *
         * @param {ResizeObserverSPI} observer - Observer to be added.
         * @returns {void}
         */
        ResizeObserverController.prototype.addObserver = function (observer) {
            if (!~this.observers_.indexOf(observer)) {
                this.observers_.push(observer);
            }
            // Add listeners if they haven't been added yet.
            if (!this.connected_) {
                this.connect_();
            }
        };
        /**
         * Removes observer from observers list.
         *
         * @param {ResizeObserverSPI} observer - Observer to be removed.
         * @returns {void}
         */
        ResizeObserverController.prototype.removeObserver = function (observer) {
            var observers = this.observers_;
            var index = observers.indexOf(observer);
            // Remove observer if it's present in registry.
            if (~index) {
                observers.splice(index, 1);
            }
            // Remove listeners if controller has no connected observers.
            if (!observers.length && this.connected_) {
                this.disconnect_();
            }
        };
        /**
         * Invokes the update of observers. It will continue running updates insofar
         * it detects changes.
         *
         * @returns {void}
         */
        ResizeObserverController.prototype.refresh = function () {
            var changesDetected = this.updateObservers_();
            // Continue running updates if changes have been detected as there might
            // be future ones caused by CSS transitions.
            if (changesDetected) {
                this.refresh();
            }
        };
        /**
         * Updates every observer from observers list and notifies them of queued
         * entries.
         *
         * @private
         * @returns {boolean} Returns "true" if any observer has detected changes in
         *      dimensions of it's elements.
         */
        ResizeObserverController.prototype.updateObservers_ = function () {
            // Collect observers that have active observations.
            var activeObservers = this.observers_.filter(function (observer) {
                return observer.gatherActive(), observer.hasActive();
            });
            // Deliver notifications in a separate cycle in order to avoid any
            // collisions between observers, e.g. when multiple instances of
            // ResizeObserver are tracking the same element and the callback of one
            // of them changes content dimensions of the observed target. Sometimes
            // this may result in notifications being blocked for the rest of observers.
            activeObservers.forEach(function (observer) { return observer.broadcastActive(); });
            return activeObservers.length > 0;
        };
        /**
         * Initializes DOM listeners.
         *
         * @private
         * @returns {void}
         */
        ResizeObserverController.prototype.connect_ = function () {
            // Do nothing if running in a non-browser environment or if listeners
            // have been already added.
            if (!isBrowser || this.connected_) {
                return;
            }
            // Subscription to the "Transitionend" event is used as a workaround for
            // delayed transitions. This way it's possible to capture at least the
            // final state of an element.
            document.addEventListener('transitionend', this.onTransitionEnd_);
            window.addEventListener('resize', this.refresh);
            if (mutationObserverSupported) {
                this.mutationsObserver_ = new MutationObserver(this.refresh);
                this.mutationsObserver_.observe(document, {
                    attributes: true,
                    childList: true,
                    characterData: true,
                    subtree: true
                });
            }
            else {
                document.addEventListener('DOMSubtreeModified', this.refresh);
                this.mutationEventsAdded_ = true;
            }
            this.connected_ = true;
        };
        /**
         * Removes DOM listeners.
         *
         * @private
         * @returns {void}
         */
        ResizeObserverController.prototype.disconnect_ = function () {
            // Do nothing if running in a non-browser environment or if listeners
            // have been already removed.
            if (!isBrowser || !this.connected_) {
                return;
            }
            document.removeEventListener('transitionend', this.onTransitionEnd_);
            window.removeEventListener('resize', this.refresh);
            if (this.mutationsObserver_) {
                this.mutationsObserver_.disconnect();
            }
            if (this.mutationEventsAdded_) {
                document.removeEventListener('DOMSubtreeModified', this.refresh);
            }
            this.mutationsObserver_ = null;
            this.mutationEventsAdded_ = false;
            this.connected_ = false;
        };
        /**
         * "Transitionend" event handler.
         *
         * @private
         * @param {TransitionEvent} event
         * @returns {void}
         */
        ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
            var _b = _a.propertyName, propertyName = _b === void 0 ? '' : _b;
            // Detect whether transition may affect dimensions of an element.
            var isReflowProperty = transitionKeys.some(function (key) {
                return !!~propertyName.indexOf(key);
            });
            if (isReflowProperty) {
                this.refresh();
            }
        };
        /**
         * Returns instance of the ResizeObserverController.
         *
         * @returns {ResizeObserverController}
         */
        ResizeObserverController.getInstance = function () {
            if (!this.instance_) {
                this.instance_ = new ResizeObserverController();
            }
            return this.instance_;
        };
        /**
         * Holds reference to the controller's instance.
         *
         * @private {ResizeObserverController}
         */
        ResizeObserverController.instance_ = null;
        return ResizeObserverController;
    }());

    /**
     * Defines non-writable/enumerable properties of the provided target object.
     *
     * @param {Object} target - Object for which to define properties.
     * @param {Object} props - Properties to be defined.
     * @returns {Object} Target object.
     */
    var defineConfigurable = (function (target, props) {
        for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
            var key = _a[_i];
            Object.defineProperty(target, key, {
                value: props[key],
                enumerable: false,
                writable: false,
                configurable: true
            });
        }
        return target;
    });

    /**
     * Returns the global object associated with provided element.
     *
     * @param {Object} target
     * @returns {Object}
     */
    var getWindowOf = (function (target) {
        // Assume that the element is an instance of Node, which means that it
        // has the "ownerDocument" property from which we can retrieve a
        // corresponding global object.
        var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
        // Return the local global object if it's not possible extract one from
        // provided element.
        return ownerGlobal || global$1;
    });

    // Placeholder of an empty content rectangle.
    var emptyRect = createRectInit(0, 0, 0, 0);
    /**
     * Converts provided string to a number.
     *
     * @param {number|string} value
     * @returns {number}
     */
    function toFloat(value) {
        return parseFloat(value) || 0;
    }
    /**
     * Extracts borders size from provided styles.
     *
     * @param {CSSStyleDeclaration} styles
     * @param {...string} positions - Borders positions (top, right, ...)
     * @returns {number}
     */
    function getBordersSize(styles) {
        var positions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            positions[_i - 1] = arguments[_i];
        }
        return positions.reduce(function (size, position) {
            var value = styles['border-' + position + '-width'];
            return size + toFloat(value);
        }, 0);
    }
    /**
     * Extracts paddings sizes from provided styles.
     *
     * @param {CSSStyleDeclaration} styles
     * @returns {Object} Paddings box.
     */
    function getPaddings(styles) {
        var positions = ['top', 'right', 'bottom', 'left'];
        var paddings = {};
        for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
            var position = positions_1[_i];
            var value = styles['padding-' + position];
            paddings[position] = toFloat(value);
        }
        return paddings;
    }
    /**
     * Calculates content rectangle of provided SVG element.
     *
     * @param {SVGGraphicsElement} target - Element content rectangle of which needs
     *      to be calculated.
     * @returns {DOMRectInit}
     */
    function getSVGContentRect(target) {
        var bbox = target.getBBox();
        return createRectInit(0, 0, bbox.width, bbox.height);
    }
    /**
     * Calculates content rectangle of provided HTMLElement.
     *
     * @param {HTMLElement} target - Element for which to calculate the content rectangle.
     * @returns {DOMRectInit}
     */
    function getHTMLElementContentRect(target) {
        // Client width & height properties can't be
        // used exclusively as they provide rounded values.
        var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
        // By this condition we can catch all non-replaced inline, hidden and
        // detached elements. Though elements with width & height properties less
        // than 0.5 will be discarded as well.
        //
        // Without it we would need to implement separate methods for each of
        // those cases and it's not possible to perform a precise and performance
        // effective test for hidden elements. E.g. even jQuery's ':visible' filter
        // gives wrong results for elements with width & height less than 0.5.
        if (!clientWidth && !clientHeight) {
            return emptyRect;
        }
        var styles = getWindowOf(target).getComputedStyle(target);
        var paddings = getPaddings(styles);
        var horizPad = paddings.left + paddings.right;
        var vertPad = paddings.top + paddings.bottom;
        // Computed styles of width & height are being used because they are the
        // only dimensions available to JS that contain non-rounded values. It could
        // be possible to utilize the getBoundingClientRect if only it's data wasn't
        // affected by CSS transformations let alone paddings, borders and scroll bars.
        var width = toFloat(styles.width), height = toFloat(styles.height);
        // Width & height include paddings and borders when the 'border-box' box
        // model is applied (except for IE).
        if (styles.boxSizing === 'border-box') {
            // Following conditions are required to handle Internet Explorer which
            // doesn't include paddings and borders to computed CSS dimensions.
            //
            // We can say that if CSS dimensions + paddings are equal to the "client"
            // properties then it's either IE, and thus we don't need to subtract
            // anything, or an element merely doesn't have paddings/borders styles.
            if (Math.round(width + horizPad) !== clientWidth) {
                width -= getBordersSize(styles, 'left', 'right') + horizPad;
            }
            if (Math.round(height + vertPad) !== clientHeight) {
                height -= getBordersSize(styles, 'top', 'bottom') + vertPad;
            }
        }
        // Following steps can't be applied to the document's root element as its
        // client[Width/Height] properties represent viewport area of the window.
        // Besides, it's as well not necessary as the <html> itself neither has
        // rendered scroll bars nor it can be clipped.
        if (!isDocumentElement(target)) {
            // In some browsers (only in Firefox, actually) CSS width & height
            // include scroll bars size which can be removed at this step as scroll
            // bars are the only difference between rounded dimensions + paddings
            // and "client" properties, though that is not always true in Chrome.
            var vertScrollbar = Math.round(width + horizPad) - clientWidth;
            var horizScrollbar = Math.round(height + vertPad) - clientHeight;
            // Chrome has a rather weird rounding of "client" properties.
            // E.g. for an element with content width of 314.2px it sometimes gives
            // the client width of 315px and for the width of 314.7px it may give
            // 314px. And it doesn't happen all the time. So just ignore this delta
            // as a non-relevant.
            if (Math.abs(vertScrollbar) !== 1) {
                width -= vertScrollbar;
            }
            if (Math.abs(horizScrollbar) !== 1) {
                height -= horizScrollbar;
            }
        }
        return createRectInit(paddings.left, paddings.top, width, height);
    }
    /**
     * Checks whether provided element is an instance of the SVGGraphicsElement.
     *
     * @param {Element} target - Element to be checked.
     * @returns {boolean}
     */
    var isSVGGraphicsElement = (function () {
        // Some browsers, namely IE and Edge, don't have the SVGGraphicsElement
        // interface.
        if (typeof SVGGraphicsElement !== 'undefined') {
            return function (target) { return target instanceof getWindowOf(target).SVGGraphicsElement; };
        }
        // If it's so, then check that element is at least an instance of the
        // SVGElement and that it has the "getBBox" method.
        // eslint-disable-next-line no-extra-parens
        return function (target) { return (target instanceof getWindowOf(target).SVGElement &&
            typeof target.getBBox === 'function'); };
    })();
    /**
     * Checks whether provided element is a document element (<html>).
     *
     * @param {Element} target - Element to be checked.
     * @returns {boolean}
     */
    function isDocumentElement(target) {
        return target === getWindowOf(target).document.documentElement;
    }
    /**
     * Calculates an appropriate content rectangle for provided html or svg element.
     *
     * @param {Element} target - Element content rectangle of which needs to be calculated.
     * @returns {DOMRectInit}
     */
    function getContentRect(target) {
        if (!isBrowser) {
            return emptyRect;
        }
        if (isSVGGraphicsElement(target)) {
            return getSVGContentRect(target);
        }
        return getHTMLElementContentRect(target);
    }
    /**
     * Creates rectangle with an interface of the DOMRectReadOnly.
     * Spec: https://drafts.fxtf.org/geometry/#domrectreadonly
     *
     * @param {DOMRectInit} rectInit - Object with rectangle's x/y coordinates and dimensions.
     * @returns {DOMRectReadOnly}
     */
    function createReadOnlyRect(_a) {
        var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
        // If DOMRectReadOnly is available use it as a prototype for the rectangle.
        var Constr = typeof DOMRectReadOnly !== 'undefined' ? DOMRectReadOnly : Object;
        var rect = Object.create(Constr.prototype);
        // Rectangle's properties are not writable and non-enumerable.
        defineConfigurable(rect, {
            x: x, y: y, width: width, height: height,
            top: y,
            right: x + width,
            bottom: height + y,
            left: x
        });
        return rect;
    }
    /**
     * Creates DOMRectInit object based on the provided dimensions and the x/y coordinates.
     * Spec: https://drafts.fxtf.org/geometry/#dictdef-domrectinit
     *
     * @param {number} x - X coordinate.
     * @param {number} y - Y coordinate.
     * @param {number} width - Rectangle's width.
     * @param {number} height - Rectangle's height.
     * @returns {DOMRectInit}
     */
    function createRectInit(x, y, width, height) {
        return { x: x, y: y, width: width, height: height };
    }

    /**
     * Class that is responsible for computations of the content rectangle of
     * provided DOM element and for keeping track of it's changes.
     */
    var ResizeObservation = /** @class */ (function () {
        /**
         * Creates an instance of ResizeObservation.
         *
         * @param {Element} target - Element to be observed.
         */
        function ResizeObservation(target) {
            /**
             * Broadcasted width of content rectangle.
             *
             * @type {number}
             */
            this.broadcastWidth = 0;
            /**
             * Broadcasted height of content rectangle.
             *
             * @type {number}
             */
            this.broadcastHeight = 0;
            /**
             * Reference to the last observed content rectangle.
             *
             * @private {DOMRectInit}
             */
            this.contentRect_ = createRectInit(0, 0, 0, 0);
            this.target = target;
        }
        /**
         * Updates content rectangle and tells whether it's width or height properties
         * have changed since the last broadcast.
         *
         * @returns {boolean}
         */
        ResizeObservation.prototype.isActive = function () {
            var rect = getContentRect(this.target);
            this.contentRect_ = rect;
            return (rect.width !== this.broadcastWidth ||
                rect.height !== this.broadcastHeight);
        };
        /**
         * Updates 'broadcastWidth' and 'broadcastHeight' properties with a data
         * from the corresponding properties of the last observed content rectangle.
         *
         * @returns {DOMRectInit} Last observed content rectangle.
         */
        ResizeObservation.prototype.broadcastRect = function () {
            var rect = this.contentRect_;
            this.broadcastWidth = rect.width;
            this.broadcastHeight = rect.height;
            return rect;
        };
        return ResizeObservation;
    }());

    var ResizeObserverEntry = /** @class */ (function () {
        /**
         * Creates an instance of ResizeObserverEntry.
         *
         * @param {Element} target - Element that is being observed.
         * @param {DOMRectInit} rectInit - Data of the element's content rectangle.
         */
        function ResizeObserverEntry(target, rectInit) {
            var contentRect = createReadOnlyRect(rectInit);
            // According to the specification following properties are not writable
            // and are also not enumerable in the native implementation.
            //
            // Property accessors are not being used as they'd require to define a
            // private WeakMap storage which may cause memory leaks in browsers that
            // don't support this type of collections.
            defineConfigurable(this, { target: target, contentRect: contentRect });
        }
        return ResizeObserverEntry;
    }());

    var ResizeObserverSPI = /** @class */ (function () {
        /**
         * Creates a new instance of ResizeObserver.
         *
         * @param {ResizeObserverCallback} callback - Callback function that is invoked
         *      when one of the observed elements changes it's content dimensions.
         * @param {ResizeObserverController} controller - Controller instance which
         *      is responsible for the updates of observer.
         * @param {ResizeObserver} callbackCtx - Reference to the public
         *      ResizeObserver instance which will be passed to callback function.
         */
        function ResizeObserverSPI(callback, controller, callbackCtx) {
            /**
             * Collection of resize observations that have detected changes in dimensions
             * of elements.
             *
             * @private {Array<ResizeObservation>}
             */
            this.activeObservations_ = [];
            /**
             * Registry of the ResizeObservation instances.
             *
             * @private {Map<Element, ResizeObservation>}
             */
            this.observations_ = new MapShim();
            if (typeof callback !== 'function') {
                throw new TypeError('The callback provided as parameter 1 is not a function.');
            }
            this.callback_ = callback;
            this.controller_ = controller;
            this.callbackCtx_ = callbackCtx;
        }
        /**
         * Starts observing provided element.
         *
         * @param {Element} target - Element to be observed.
         * @returns {void}
         */
        ResizeObserverSPI.prototype.observe = function (target) {
            if (!arguments.length) {
                throw new TypeError('1 argument required, but only 0 present.');
            }
            // Do nothing if current environment doesn't have the Element interface.
            if (typeof Element === 'undefined' || !(Element instanceof Object)) {
                return;
            }
            if (!(target instanceof getWindowOf(target).Element)) {
                throw new TypeError('parameter 1 is not of type "Element".');
            }
            var observations = this.observations_;
            // Do nothing if element is already being observed.
            if (observations.has(target)) {
                return;
            }
            observations.set(target, new ResizeObservation(target));
            this.controller_.addObserver(this);
            // Force the update of observations.
            this.controller_.refresh();
        };
        /**
         * Stops observing provided element.
         *
         * @param {Element} target - Element to stop observing.
         * @returns {void}
         */
        ResizeObserverSPI.prototype.unobserve = function (target) {
            if (!arguments.length) {
                throw new TypeError('1 argument required, but only 0 present.');
            }
            // Do nothing if current environment doesn't have the Element interface.
            if (typeof Element === 'undefined' || !(Element instanceof Object)) {
                return;
            }
            if (!(target instanceof getWindowOf(target).Element)) {
                throw new TypeError('parameter 1 is not of type "Element".');
            }
            var observations = this.observations_;
            // Do nothing if element is not being observed.
            if (!observations.has(target)) {
                return;
            }
            observations.delete(target);
            if (!observations.size) {
                this.controller_.removeObserver(this);
            }
        };
        /**
         * Stops observing all elements.
         *
         * @returns {void}
         */
        ResizeObserverSPI.prototype.disconnect = function () {
            this.clearActive();
            this.observations_.clear();
            this.controller_.removeObserver(this);
        };
        /**
         * Collects observation instances the associated element of which has changed
         * it's content rectangle.
         *
         * @returns {void}
         */
        ResizeObserverSPI.prototype.gatherActive = function () {
            var _this = this;
            this.clearActive();
            this.observations_.forEach(function (observation) {
                if (observation.isActive()) {
                    _this.activeObservations_.push(observation);
                }
            });
        };
        /**
         * Invokes initial callback function with a list of ResizeObserverEntry
         * instances collected from active resize observations.
         *
         * @returns {void}
         */
        ResizeObserverSPI.prototype.broadcastActive = function () {
            // Do nothing if observer doesn't have active observations.
            if (!this.hasActive()) {
                return;
            }
            var ctx = this.callbackCtx_;
            // Create ResizeObserverEntry instance for every active observation.
            var entries = this.activeObservations_.map(function (observation) {
                return new ResizeObserverEntry(observation.target, observation.broadcastRect());
            });
            this.callback_.call(ctx, entries, ctx);
            this.clearActive();
        };
        /**
         * Clears the collection of active observations.
         *
         * @returns {void}
         */
        ResizeObserverSPI.prototype.clearActive = function () {
            this.activeObservations_.splice(0);
        };
        /**
         * Tells whether observer has active observations.
         *
         * @returns {boolean}
         */
        ResizeObserverSPI.prototype.hasActive = function () {
            return this.activeObservations_.length > 0;
        };
        return ResizeObserverSPI;
    }());

    // Registry of internal observers. If WeakMap is not available use current shim
    // for the Map collection as it has all required methods and because WeakMap
    // can't be fully polyfilled anyway.
    var observers = typeof WeakMap !== 'undefined' ? new WeakMap() : new MapShim();
    /**
     * ResizeObserver API. Encapsulates the ResizeObserver SPI implementation
     * exposing only those methods and properties that are defined in the spec.
     */
    var ResizeObserver$1 = /** @class */ (function () {
        /**
         * Creates a new instance of ResizeObserver.
         *
         * @param {ResizeObserverCallback} callback - Callback that is invoked when
         *      dimensions of the observed elements change.
         */
        function ResizeObserver(callback) {
            if (!(this instanceof ResizeObserver)) {
                throw new TypeError('Cannot call a class as a function.');
            }
            if (!arguments.length) {
                throw new TypeError('1 argument required, but only 0 present.');
            }
            var controller = ResizeObserverController.getInstance();
            var observer = new ResizeObserverSPI(callback, controller, this);
            observers.set(this, observer);
        }
        return ResizeObserver;
    }());
    // Expose public methods of ResizeObserver.
    [
        'observe',
        'unobserve',
        'disconnect'
    ].forEach(function (method) {
        ResizeObserver$1.prototype[method] = function () {
            var _a;
            return (_a = observers.get(this))[method].apply(_a, arguments);
        };
    });

    var index = (function () {
        // Export existing implementation if available.
        if (typeof global$1.ResizeObserver !== 'undefined') {
            return global$1.ResizeObserver;
        }
        return ResizeObserver$1;
    })();

    var ResizeObserver = defineComponent({
      name: 'ResizeObserver',
      props: {
        disabled: Boolean,
        onResize: Function
      },
      emits: ['resize'],
      setup: function setup(props, _ref) {
        var slots = _ref.slots;
        var state = reactive({
          width: 0,
          height: 0,
          offsetHeight: 0,
          offsetWidth: 0
        });
        var currentElement = null;
        var resizeObserver = null;

        var destroyObserver = function destroyObserver() {
          if (resizeObserver) {
            resizeObserver.disconnect();
            resizeObserver = null;
          }
        };

        var onResize = function onResize(entries) {
          var onResize = props.onResize;
          var target = entries[0].target;

          var _target$getBoundingCl = target.getBoundingClientRect(),
              width = _target$getBoundingCl.width,
              height = _target$getBoundingCl.height;

          var offsetWidth = target.offsetWidth,
              offsetHeight = target.offsetHeight;
          /**
           * Resize observer trigger when content size changed.
           * In most case we just care about element size,
           * let's use `boundary` instead of `contentRect` here to avoid shaking.
           */

          var fixedWidth = Math.floor(width);
          var fixedHeight = Math.floor(height);

          if (state.width !== fixedWidth || state.height !== fixedHeight || state.offsetWidth !== offsetWidth || state.offsetHeight !== offsetHeight) {
            var size = {
              width: fixedWidth,
              height: fixedHeight,
              offsetWidth: offsetWidth,
              offsetHeight: offsetHeight
            };

            _extends(state, size);

            if (onResize) {
              // defer the callback but not defer to next frame
              Promise.resolve().then(function () {
                onResize(_extends(_extends({}, size), {
                  offsetWidth: offsetWidth,
                  offsetHeight: offsetHeight
                }), target);
              });
            }
          }
        };

        var instance = getCurrentInstance();

        var registerObserver = function registerObserver() {
          var disabled = props.disabled; // Unregister if disabled

          if (disabled) {
            destroyObserver();
            return;
          } // Unregister if element changed


          var element = findDOMNode(instance);
          var elementChanged = element !== currentElement;

          if (elementChanged) {
            destroyObserver();
            currentElement = element;
          }

          if (!resizeObserver && element) {
            resizeObserver = new index(onResize);
            resizeObserver.observe(element);
          }
        };

        onMounted(function () {
          registerObserver();
        });
        onUpdated(function () {
          registerObserver();
        });
        onUnmounted(function () {
          destroyObserver();
        });
        watch(function () {
          return props.disabled;
        }, function () {
          registerObserver();
        }, {
          flush: 'post'
        });
        return function () {
          var _a;

          return (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots)[0];
        };
      }
    });

    // Thanks to https://github.com/andreypopp/react-textarea-autosize/

    /**
     * calculateNodeHeight(uiTextNode, useCache = false)
     */
    var HIDDEN_TEXTAREA_STYLE = "\n  min-height:0 !important;\n  max-height:none !important;\n  height:0 !important;\n  visibility:hidden !important;\n  overflow:hidden !important;\n  position:absolute !important;\n  z-index:-1000 !important;\n  top:0 !important;\n  right:0 !important\n";
    var SIZING_STYLE = ['letter-spacing', 'line-height', 'padding-top', 'padding-bottom', 'font-family', 'font-weight', 'font-size', 'font-variant', 'text-rendering', 'text-transform', 'width', 'text-indent', 'padding-left', 'padding-right', 'border-width', 'box-sizing'];
    var computedStyleCache = {};
    var hiddenTextarea;
    function calculateNodeStyling(node) {
      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var nodeRef = node.getAttribute('id') || node.getAttribute('data-reactid') || node.getAttribute('name');

      if (useCache && computedStyleCache[nodeRef]) {
        return computedStyleCache[nodeRef];
      }

      var style = window.getComputedStyle(node);
      var boxSizing = style.getPropertyValue('box-sizing') || style.getPropertyValue('-moz-box-sizing') || style.getPropertyValue('-webkit-box-sizing');
      var paddingSize = parseFloat(style.getPropertyValue('padding-bottom')) + parseFloat(style.getPropertyValue('padding-top'));
      var borderSize = parseFloat(style.getPropertyValue('border-bottom-width')) + parseFloat(style.getPropertyValue('border-top-width'));
      var sizingStyle = SIZING_STYLE.map(function (name) {
        return "".concat(name, ":").concat(style.getPropertyValue(name));
      }).join(';');
      var nodeInfo = {
        sizingStyle: sizingStyle,
        paddingSize: paddingSize,
        borderSize: borderSize,
        boxSizing: boxSizing
      };

      if (useCache && nodeRef) {
        computedStyleCache[nodeRef] = nodeInfo;
      }

      return nodeInfo;
    }
    function calculateNodeHeight(uiTextNode) {
      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var minRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var maxRows = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      if (!hiddenTextarea) {
        hiddenTextarea = document.createElement('textarea');
        document.body.appendChild(hiddenTextarea);
      } // Fix wrap="off" issue
      // https://github.com/ant-design/ant-design/issues/6577


      if (uiTextNode.getAttribute('wrap')) {
        hiddenTextarea.setAttribute('wrap', uiTextNode.getAttribute('wrap'));
      } else {
        hiddenTextarea.removeAttribute('wrap');
      } // Copy all CSS properties that have an impact on the height of the content in
      // the textbox


      var _calculateNodeStyling = calculateNodeStyling(uiTextNode, useCache),
          paddingSize = _calculateNodeStyling.paddingSize,
          borderSize = _calculateNodeStyling.borderSize,
          boxSizing = _calculateNodeStyling.boxSizing,
          sizingStyle = _calculateNodeStyling.sizingStyle; // Need to have the overflow attribute to hide the scrollbar otherwise
      // text-lines will not calculated properly as the shadow will technically be
      // narrower for content


      hiddenTextarea.setAttribute('style', "".concat(sizingStyle, ";").concat(HIDDEN_TEXTAREA_STYLE));
      hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || '';
      var minHeight = Number.MIN_SAFE_INTEGER;
      var maxHeight = Number.MAX_SAFE_INTEGER;
      var height = hiddenTextarea.scrollHeight;
      var overflowY;

      if (boxSizing === 'border-box') {
        // border-box: add border, since height = content + padding + border
        height += borderSize;
      } else if (boxSizing === 'content-box') {
        // remove padding, since height = content
        height -= paddingSize;
      }

      if (minRows !== null || maxRows !== null) {
        // measure height of a textarea with a single row
        hiddenTextarea.value = ' ';
        var singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

        if (minRows !== null) {
          minHeight = singleRowHeight * minRows;

          if (boxSizing === 'border-box') {
            minHeight = minHeight + paddingSize + borderSize;
          }

          height = Math.max(minHeight, height);
        }

        if (maxRows !== null) {
          maxHeight = singleRowHeight * maxRows;

          if (boxSizing === 'border-box') {
            maxHeight = maxHeight + paddingSize + borderSize;
          }

          overflowY = height > maxHeight ? '' : 'hidden';
          height = Math.min(maxHeight, height);
        }
      }

      return {
        height: "".concat(height, "px"),
        minHeight: "".concat(minHeight, "px"),
        maxHeight: "".concat(maxHeight, "px"),
        overflowY: overflowY,
        resize: 'none'
      };
    }

    var BaseMixin = {
      methods: {
        setState: function setState() {
          var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var callback = arguments.length > 1 ? arguments[1] : undefined;
          var newState = typeof state === 'function' ? state(this.$data, this.$props) : state;

          if (this.getDerivedStateFromProps) {
            var s = this.getDerivedStateFromProps(getOptionProps(this), _extends(_extends({}, this.$data), newState));

            if (s === null) {
              return;
            } else {
              newState = _extends(_extends({}, newState), s || {});
            }
          }

          _extends(this.$data, newState);

          if (this._.isMounted) {
            this.$forceUpdate();
          }

          nextTick(function () {
            callback && callback();
          });
        },
        __emit: function __emit() {
          // 直接调用事件，底层组件不需要vueTool记录events
          var args = [].slice.call(arguments, 0);
          var eventName = args[0];
          eventName = "on".concat(eventName[0].toUpperCase()).concat(eventName.substring(1));
          var event = this.$props[eventName] || this.$attrs[eventName];

          if (args.length && event) {
            if (Array.isArray(event)) {
              for (var i = 0, l = event.length; i < l; i++) {
                event[i].apply(event, _toConsumableArray(args.slice(1)));
              }
            } else {
              event.apply(void 0, _toConsumableArray(args.slice(1)));
            }
          }
        }
      }
    };

    var RESIZE_STATUS_NONE = 0;
    var RESIZE_STATUS_RESIZING = 1;
    var RESIZE_STATUS_RESIZED = 2;

    var TextAreaProps$1 = _extends(_extends({}, inputProps), {
      autosize: {
        type: [Boolean, Object],
        default: undefined
      },
      autoSize: {
        type: [Boolean, Object],
        default: undefined
      },
      onResize: PropTypes$1.func
    });

    var ResizableTextArea = defineComponent({
      name: 'ResizableTextArea',
      mixins: [BaseMixin],
      inheritAttrs: false,
      props: TextAreaProps$1,
      setup: function setup() {
        return {
          nextFrameActionId: undefined,
          textArea: null,
          resizeFrameId: undefined
        };
      },
      data: function data() {
        return {
          textareaStyles: {},
          resizeStatus: RESIZE_STATUS_NONE
        };
      },
      watch: {
        value: function value() {
          var _this = this;

          nextTick(function () {
            _this.resizeTextarea();
          });
        }
      },
      mounted: function mounted() {
        this.resizeTextarea();
      },
      beforeUnmount: function beforeUnmount() {
        wrapperRaf.cancel(this.nextFrameActionId);
        wrapperRaf.cancel(this.resizeFrameId);
      },
      methods: {
        saveTextArea: function saveTextArea(textArea) {
          this.textArea = textArea;
        },
        handleResize: function handleResize(size) {
          var resizeStatus = this.$data.resizeStatus;

          if (resizeStatus !== RESIZE_STATUS_NONE) {
            return;
          }

          this.$emit('resize', size);
        },
        resizeOnNextFrame: function resizeOnNextFrame() {
          wrapperRaf.cancel(this.nextFrameActionId);
          this.nextFrameActionId = wrapperRaf(this.resizeTextarea);
        },
        resizeTextarea: function resizeTextarea() {
          var _this2 = this;

          var autoSize = this.$props.autoSize || this.$props.autosize;

          if (!autoSize || !this.textArea) {
            return;
          }

          var minRows = autoSize.minRows,
              maxRows = autoSize.maxRows;
          var textareaStyles = calculateNodeHeight(this.textArea, false, minRows, maxRows);
          this.setState({
            textareaStyles: textareaStyles,
            resizeStatus: RESIZE_STATUS_RESIZING
          }, function () {
            wrapperRaf.cancel(_this2.resizeFrameId);
            _this2.resizeFrameId = wrapperRaf(function () {
              _this2.setState({
                resizeStatus: RESIZE_STATUS_RESIZED
              }, function () {
                _this2.resizeFrameId = wrapperRaf(function () {
                  _this2.setState({
                    resizeStatus: RESIZE_STATUS_NONE
                  });

                  _this2.fixFirefoxAutoScroll();
                });
              });
            });
          });
        },
        // https://github.com/ant-design/ant-design/issues/21870
        fixFirefoxAutoScroll: function fixFirefoxAutoScroll() {
          try {
            if (document.activeElement === this.textArea) {
              var currentStart = this.textArea.selectionStart;
              var currentEnd = this.textArea.selectionEnd;
              this.textArea.setSelectionRange(currentStart, currentEnd);
            }
          } catch (e) {// Fix error in Chrome:
            // Failed to read the 'selectionStart' property from 'HTMLInputElement'
            // http://stackoverflow.com/q/21177489/3040605
          }
        },
        renderTextArea: function renderTextArea() {
          var _this3 = this;

          var props = _extends(_extends({}, getOptionProps(this)), this.$attrs);

          var prefixCls = props.prefixCls,
              autoSize = props.autoSize,
              autosize = props.autosize,
              disabled = props.disabled,
              className = props.class;
          var _this$$data = this.$data,
              textareaStyles = _this$$data.textareaStyles,
              resizeStatus = _this$$data.resizeStatus;
          warning$1(autosize === undefined, 'Input.TextArea', 'autosize is deprecated, please use autoSize instead.');
          var otherProps = omit(props, ['prefixCls', 'onPressEnter', 'autoSize', 'autosize', 'defaultValue', 'allowClear', 'type', 'lazy']);
          var cls = classNames(prefixCls, className, _defineProperty$8({}, "".concat(prefixCls, "-disabled"), disabled)); // Fix https://github.com/ant-design/ant-design/issues/6776
          // Make sure it could be reset when using form.getFieldDecorator

          if ('value' in otherProps) {
            otherProps.value = otherProps.value || '';
          }

          var style = _extends(_extends(_extends({}, props.style), textareaStyles), resizeStatus === RESIZE_STATUS_RESIZING ? {
            overflowX: 'hidden',
            overflowY: 'hidden'
          } : null);

          var textareaProps = _extends(_extends({}, otherProps), {
            style: style,
            class: cls
          });

          if (!textareaProps.autofocus) {
            delete textareaProps.autofocus;
          }

          return createVNode(ResizeObserver, {
            "onResize": this.handleResize,
            "disabled": !(autoSize || autosize)
          }, {
            default: function _default() {
              return [withDirectives(createVNode("textarea", _objectSpread2(_objectSpread2({}, textareaProps), {}, {
                "ref": _this3.saveTextArea
              }), null))];
            }
          });
        }
      },
      render: function render() {
        return this.renderTextArea();
      }
    });
    var ResizableTextArea$1 = ResizableTextArea;

    var TextAreaProps = _extends(_extends({}, inputProps), {
      autosize: withUndefined(PropTypes$1.oneOfType([Object, Boolean])),
      autoSize: withUndefined(PropTypes$1.oneOfType([Object, Boolean])),
      showCount: PropTypes$1.looseBool,
      onCompositionstart: PropTypes$1.func,
      onCompositionend: PropTypes$1.func
    });

    var TextArea$1 = defineComponent({
      name: 'ATextarea',
      inheritAttrs: false,
      props: _extends({}, TextAreaProps),
      setup: function setup() {
        return {
          configProvider: inject('configProvider', defaultConfigProvider),
          resizableTextArea: null,
          clearableInput: null
        };
      },
      data: function data() {
        var value = typeof this.value === 'undefined' ? this.defaultValue : this.value;
        return {
          stateValue: typeof value === 'undefined' ? '' : value
        };
      },
      watch: {
        value: function value(val) {
          this.stateValue = val;
        }
      },
      mounted: function mounted() {
        var _this = this;

        nextTick(function () {
          if (process.env.NODE_ENV === 'test') {
            if (_this.autofocus) {
              _this.focus();
            }
          }
        });
      },
      methods: {
        setValue: function setValue(value, callback) {
          if (!hasProp(this, 'value')) {
            this.stateValue = value;
          } else {
            this.$forceUpdate();
          }

          nextTick(function () {
            callback && callback();
          });
        },
        handleKeyDown: function handleKeyDown(e) {
          if (e.keyCode === 13) {
            this.$emit('pressEnter', e);
          }

          this.$emit('keydown', e);
        },
        triggerChange: function triggerChange(e) {
          this.$emit('update:value', e.target.value);
          this.$emit('change', e);
          this.$emit('input', e);
        },
        handleChange: function handleChange(e) {
          var _this2 = this;

          var _e$target = e.target,
              value = _e$target.value,
              composing = _e$target.composing,
              isComposing = _e$target.isComposing;
          if ((isComposing || composing) && this.lazy || this.stateValue === value) return;
          this.setValue(e.target.value, function () {
            var _a;

            (_a = _this2.resizableTextArea) === null || _a === void 0 ? void 0 : _a.resizeTextarea();
          });
          resolveOnChange(this.resizableTextArea.textArea, e, this.triggerChange);
        },
        focus: function focus() {
          this.resizableTextArea.textArea.focus();
        },
        blur: function blur() {
          this.resizableTextArea.textArea.blur();
        },
        saveTextArea: function saveTextArea(resizableTextArea) {
          this.resizableTextArea = resizableTextArea;
        },
        saveClearableInput: function saveClearableInput(clearableInput) {
          this.clearableInput = clearableInput;
        },
        handleReset: function handleReset(e) {
          var _this3 = this;

          this.setValue('', function () {
            _this3.resizableTextArea.renderTextArea();

            _this3.focus();
          });
          resolveOnChange(this.resizableTextArea.textArea, e, this.triggerChange);
        },
        renderTextArea: function renderTextArea(prefixCls) {
          var props = getOptionProps(this);
          var _this$$attrs = this.$attrs,
              style = _this$$attrs.style,
              customClass = _this$$attrs.class;

          var resizeProps = _extends(_extends(_extends({}, props), this.$attrs), {
            style: !props.showCount && style,
            class: !props.showCount && customClass,
            showCount: null,
            prefixCls: prefixCls,
            onInput: this.handleChange,
            onChange: this.handleChange,
            onKeydown: this.handleKeyDown
          });

          return createVNode(ResizableTextArea$1, _objectSpread2(_objectSpread2({}, resizeProps), {}, {
            "ref": this.saveTextArea
          }), null);
        }
      },
      render: function render() {
        var stateValue = this.stateValue,
            customizePrefixCls = this.prefixCls,
            maxlength = this.maxlength,
            showCount = this.showCount;
        var _this$$attrs2 = this.$attrs,
            style = _this$$attrs2.style,
            customClass = _this$$attrs2.class;
        var getPrefixCls = this.configProvider.getPrefixCls;
        var prefixCls = getPrefixCls('input', customizePrefixCls);
        var value = fixControlledValue(stateValue); // Max length value

        var hasMaxlength = Number(maxlength) > 0;
        value = hasMaxlength ? value.slice(0, maxlength) : value;

        var props = _extends(_extends(_extends({}, getOptionProps(this)), this.$attrs), {
          prefixCls: prefixCls,
          inputType: 'text',
          element: this.renderTextArea(prefixCls),
          handleReset: this.handleReset
        });

        var textareaNode = createVNode(ClearableLabeledInput$1, _objectSpread2(_objectSpread2({}, props), {}, {
          "value": value,
          "ref": this.saveClearableInput
        }), null);

        if (showCount) {
          var valueLength = _toConsumableArray(value).length;

          var dataCount = "".concat(valueLength).concat(hasMaxlength ? " / ".concat(maxlength) : '');

          textareaNode = createVNode("div", {
            "class": classNames("".concat(prefixCls, "-textarea"), "".concat(prefixCls, "-textarea-show-count"), customClass),
            "style": style,
            "data-count": dataCount
          }, [textareaNode]);
        }

        return textareaNode;
      }
    });

    // This icon file is generated automatically.
    var EyeOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" } }] }, "name": "eye", "theme": "outlined" };
    var EyeOutlinedSvg = EyeOutlined$2;

    function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } return target; }

    function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var EyeOutlined = function EyeOutlined(props, context) {
      var p = _objectSpread$1({}, props, context.attrs);

      return createVNode(AntdIcon, mergeProps(p, {
        "icon": EyeOutlinedSvg
      }), null);
    };

    EyeOutlined.displayName = 'EyeOutlined';
    EyeOutlined.inheritAttrs = false;
    var EyeOutlined$1 = EyeOutlined;

    // This icon file is generated automatically.
    var EyeInvisibleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z" } }, { "tag": "path", "attrs": { "d": "M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z" } }] }, "name": "eye-invisible", "theme": "outlined" };
    var EyeInvisibleOutlinedSvg = EyeInvisibleOutlined$2;

    function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

    var EyeInvisibleOutlined = function EyeInvisibleOutlined(props, context) {
      var p = _objectSpread({}, props, context.attrs);

      return createVNode(AntdIcon, mergeProps(p, {
        "icon": EyeInvisibleOutlinedSvg
      }), null);
    };

    EyeInvisibleOutlined.displayName = 'EyeInvisibleOutlined';
    EyeInvisibleOutlined.inheritAttrs = false;
    var EyeInvisibleOutlined$1 = EyeInvisibleOutlined;

    var __rest = undefined && undefined.__rest || function (s, e) {
      var t = {};

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      }

      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    };
    var ActionMap = {
      click: 'onClick',
      hover: 'onMouseover'
    };
    var Password = defineComponent({
      name: 'AInputPassword',
      mixins: [BaseMixin],
      inheritAttrs: false,
      props: _extends(_extends({}, inputProps), {
        prefixCls: PropTypes$1.string,
        inputPrefixCls: PropTypes$1.string,
        action: PropTypes$1.string.def('click'),
        visibilityToggle: PropTypes$1.looseBool.def(true),
        iconRender: PropTypes$1.func.def(function (visible) {
          return visible ? createVNode(EyeOutlined$1, null, null) : createVNode(EyeInvisibleOutlined$1, null, null);
        })
      }),
      setup: function setup() {
        return {
          input: null,
          configProvider: inject('configProvider', defaultConfigProvider)
        };
      },
      data: function data() {
        return {
          visible: false
        };
      },
      methods: {
        saveInput: function saveInput(node) {
          this.input = node;
        },
        focus: function focus() {
          this.input.focus();
        },
        blur: function blur() {
          this.input.blur();
        },
        onVisibleChange: function onVisibleChange() {
          if (this.disabled) {
            return;
          }

          this.setState({
            visible: !this.visible
          });
        },
        getIcon: function getIcon(prefixCls) {
          var _iconProps;

          var action = this.$props.action;
          var iconTrigger = ActionMap[action] || '';
          var iconRender = this.$slots.iconRender || this.$props.iconRender;
          var icon = iconRender(this.visible);
          var iconProps = (_iconProps = {}, _defineProperty$8(_iconProps, iconTrigger, this.onVisibleChange), _defineProperty$8(_iconProps, "onMousedown", function onMousedown(e) {
            // Prevent focused state lost
            // https://github.com/ant-design/ant-design/issues/15173
            e.preventDefault();
          }), _defineProperty$8(_iconProps, "onMouseup", function onMouseup(e) {
            // Prevent focused state lost
            // https://github.com/ant-design/ant-design/pull/23633/files
            e.preventDefault();
          }), _defineProperty$8(_iconProps, "class", "".concat(prefixCls, "-icon")), _defineProperty$8(_iconProps, "key", 'passwordIcon'), _iconProps);
          return cloneElement(icon, iconProps);
        }
      },
      render: function render() {
        var _a = getOptionProps(this),
            customizePrefixCls = _a.prefixCls,
            customizeInputPrefixCls = _a.inputPrefixCls,
            size = _a.size;
            _a.suffix;
            _a.action;
            var visibilityToggle = _a.visibilityToggle;
            _a.iconRender;
            var restProps = __rest(_a, ["prefixCls", "inputPrefixCls", "size", "suffix", "action", "visibilityToggle", "iconRender"]);

        var className = this.$attrs.class;
        var getPrefixCls = this.configProvider.getPrefixCls;
        var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);
        var prefixCls = getPrefixCls('input-password', customizePrefixCls);
        var suffixIcon = visibilityToggle && this.getIcon(prefixCls);
        var inputClassName = classNames(prefixCls, className, _defineProperty$8({}, "".concat(prefixCls, "-").concat(size), !!size));

        var inputProps = _extends(_extends(_extends(_extends({}, restProps), {
          prefixCls: inputPrefixCls,
          size: size,
          suffix: suffixIcon,
          prefix: getComponent(this, 'prefix'),
          addonAfter: getComponent(this, 'addonAfter'),
          addonBefore: getComponent(this, 'addonBefore')
        }), this.$attrs), {
          type: this.visible ? 'text' : 'password',
          class: inputClassName,
          ref: 'input'
        });

        return createVNode(Input, _objectSpread2(_objectSpread2({}, inputProps), {}, {
          "ref": this.saveInput
        }), null);
      }
    });

    Input.Group = Group;
    Input.Search = Search;
    Input.TextArea = TextArea$1;
    Input.Password = Password;
    /* istanbul ignore next */

    Input.install = function (app) {
      app.component(Input.name, Input);
      app.component(Input.Group.name, Input.Group);
      app.component(Input.Search.name, Input.Search);
      app.component(Input.TextArea.name, Input.TextArea);
      app.component(Input.Password.name, Input.Password);
      return app;
    };

    /*
     * @Author: Gavin Chan
     * @Date: 2021-10-11 12:24:23
     * @LastEditors: Gavin
     * @LastEditTime: 2021-10-11 14:19:32
     * @FilePath: \formily-antdv\packages\preview-text\index.ts
     * @Descriptions: todo
     */
    const PreviewText = defineComponent({
        name: "PireviewText",
        props: ["display"],
        setup(props, { attrs, slots }) {
            return () => {
                return h$1("div", {}, { default: () => [props.display] });
            };
        },
    });

    /*
     * @Author: Gavin Chan
     * @Date: 2021-10-11 11:54:06
     * @LastEditors: Gavin
     * @LastEditTime: 2021-10-19 15:28:31
     * @FilePath: \formily-antdv\packages\input\index.ts
     * @Descriptions: todo
     */
    const GInput = connect(Input, mapProps({ readOnly: "readonly" }), mapReadPretty(PreviewText));
    const TextArea = connect(Input.TextArea, mapProps({ readOnly: "readonly" }), mapReadPretty(PreviewText));

    /*
     * @Author: Gavin
     * @Date: 2021-10-08 17:59:46
     * @LastEditors: Gavin
     * @LastEditTime: 2021-10-19 14:58:27
     * @FilePath: \formily-antdv\packages\index.ts
     * @Descriptions: todo
     */
    const version = "1.0.0";

    exports.GInput = GInput;
    exports.PreviewText = PreviewText;
    exports.TextArea = TextArea;
    exports.version = version;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
