(function () {
  'use strict';

  function _taggedTemplateLiteralLoose(strings, raw) {
    if (!raw) {
      raw = strings.slice(0);
    }

    strings.raw = raw;
    return strings;
  }

  var taggedTemplateLiteralLoose = _taggedTemplateLiteralLoose;

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var runtime = createCommonjsModule(function (module) {
  !function (global) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined;
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    var runtime = global.regeneratorRuntime;

    if (runtime) {
      {
        module.exports = runtime;
      }

      return;
    }

    runtime = global.regeneratorRuntime = module.exports;

    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []);
      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    runtime.wrap = wrap;

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    var ContinueSentinel = {};

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {}

    var IteratorPrototype = {};

    IteratorPrototype[iteratorSymbol] = function () {
      return this;
    };

    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
    GeneratorFunctionPrototype.constructor = GeneratorFunction;
    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        prototype[method] = function (arg) {
          return this._invoke(method, arg);
        };
      });
    }

    runtime.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    runtime.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;

        if (!(toStringTagSymbol in genFun)) {
          genFun[toStringTagSymbol] = "GeneratorFunction";
        }
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    };

    runtime.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
            return Promise.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return Promise.resolve(value).then(function (unwrapped) {
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new Promise(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }

      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);

    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
      return this;
    };

    runtime.AsyncIterator = AsyncIterator;

    runtime.async = function (innerFn, outerFn, self, tryLocsList) {
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
      return runtime.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          }

          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted;
            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    }

    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined) {
        context.delegate = null;

        if (context.method === "throw") {
          if (delegate.iterator.return) {
            context.method = "return";
            context.arg = undefined;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        context[delegate.resultName] = info.value;
        context.next = delegate.nextLoc;

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined;
        }
      } else {
        return info;
      }

      context.delegate = null;
      return ContinueSentinel;
    }

    defineIteratorMethods(Gp);
    Gp[toStringTagSymbol] = "Generator";

    Gp[iteratorSymbol] = function () {
      return this;
    };

    Gp.toString = function () {
      return "[object Generator]";
    };

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    runtime.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse();
      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        }

        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      }

      return {
        next: doneResult
      };
    }

    runtime.values = values;

    function doneResult() {
      return {
        value: undefined,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0;
        this.sent = this._sent = undefined;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            context.method = "next";
            context.arg = undefined;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        }

        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          this.arg = undefined;
        }

        return ContinueSentinel;
      }
    };
  }(function () {
    return this || typeof self === "object" && self;
  }() || Function("return this")());
  });

  var g = function () {
    return this || typeof self === "object" && self;
  }() || Function("return this")();

  var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;
  var oldRuntime = hadRuntime && g.regeneratorRuntime;
  g.regeneratorRuntime = undefined;
  var runtimeModule = runtime;

  if (hadRuntime) {
    g.regeneratorRuntime = oldRuntime;
  } else {
    try {
      delete g.regeneratorRuntime;
    } catch (e) {
      g.regeneratorRuntime = undefined;
    }
  }

  var regenerator = runtimeModule;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var asyncToGenerator = _asyncToGenerator;

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  var inheritsLoose = _inheritsLoose;

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var directives = new WeakMap();
  var isDirective = function isDirective(o) {
    return typeof o === 'function' && directives.has(o);
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var isCEPolyfill = window.customElements !== undefined && window.customElements.polyfillWrapFlushCallback !== undefined;
  var reparentNodes = function reparentNodes(container, start, end, before) {
    if (end === void 0) {
      end = null;
    }

    if (before === void 0) {
      before = null;
    }

    var node = start;

    while (node !== end) {
      var n = node.nextSibling;
      container.insertBefore(node, before);
      node = n;
    }
  };
  var removeNodes = function removeNodes(container, startNode, endNode) {
    if (endNode === void 0) {
      endNode = null;
    }

    var node = startNode;

    while (node !== endNode) {
      var n = node.nextSibling;
      container.removeChild(node);
      node = n;
    }
  };

  /**
   * @license
   * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var noChange = {};
  var nothing = {};

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var marker = "{{lit-" + String(Math.random()).slice(2) + "}}";
  var nodeMarker = "<!--" + marker + "-->";
  var markerRegex = new RegExp(marker + "|" + nodeMarker);
  var boundAttributeSuffix = '$lit$';
  var Template = function Template(result, element) {
    var _this = this;

    this.parts = [];
    this.element = element;
    var index = -1;
    var partIndex = 0;
    var nodesToRemove = [];

    var _prepareTemplate = function _prepareTemplate(template) {
      var content = template.content;
      var walker = document.createTreeWalker(content, 133, null, false);
      var lastPartIndex = 0;

      while (walker.nextNode()) {
        index++;
        var node = walker.currentNode;

        if (node.nodeType === 1) {
            if (node.hasAttributes()) {
              var attributes = node.attributes;
              var count = 0;

              for (var i = 0; i < attributes.length; i++) {
                if (attributes[i].value.indexOf(marker) >= 0) {
                  count++;
                }
              }

              while (count-- > 0) {
                var stringForPart = result.strings[partIndex];
                var name = lastAttributeNameRegex.exec(stringForPart)[2];
                var attributeLookupName = name.toLowerCase() + boundAttributeSuffix;
                var attributeValue = node.getAttribute(attributeLookupName);
                var strings = attributeValue.split(markerRegex);

                _this.parts.push({
                  type: 'attribute',
                  index: index,
                  name: name,
                  strings: strings
                });

                node.removeAttribute(attributeLookupName);
                partIndex += strings.length - 1;
              }
            }

            if (node.tagName === 'TEMPLATE') {
              _prepareTemplate(node);
            }
          } else if (node.nodeType === 3) {
            var data = node.data;

            if (data.indexOf(marker) >= 0) {
              var parent = node.parentNode;

              var _strings = data.split(markerRegex);

              var lastIndex = _strings.length - 1;

              for (var _i = 0; _i < lastIndex; _i++) {
                parent.insertBefore(_strings[_i] === '' ? createMarker() : document.createTextNode(_strings[_i]), node);

                _this.parts.push({
                  type: 'node',
                  index: ++index
                });
              }

              if (_strings[lastIndex] === '') {
                parent.insertBefore(createMarker(), node);
                nodesToRemove.push(node);
              } else {
                node.data = _strings[lastIndex];
              }

              partIndex += lastIndex;
            }
          } else if (node.nodeType === 8) {
            if (node.data === marker) {
              var _parent = node.parentNode;

              if (node.previousSibling === null || index === lastPartIndex) {
                index++;

                _parent.insertBefore(createMarker(), node);
              }

              lastPartIndex = index;

              _this.parts.push({
                type: 'node',
                index: index
              });

              if (node.nextSibling === null) {
                node.data = '';
              } else {
                nodesToRemove.push(node);
                index--;
              }

              partIndex++;
            } else {
              var _i2 = -1;

              while ((_i2 = node.data.indexOf(marker, _i2 + 1)) !== -1) {
                _this.parts.push({
                  type: 'node',
                  index: -1
                });
              }
            }
          }
      }
    };

    _prepareTemplate(element);

    for (var _i3 = 0; _i3 < nodesToRemove.length; _i3++) {
      var n = nodesToRemove[_i3];
      n.parentNode.removeChild(n);
    }
  };
  var isTemplatePartActive = function isTemplatePartActive(part) {
    return part.index !== -1;
  };
  var createMarker = function createMarker() {
    return document.createComment('');
  };
  var lastAttributeNameRegex = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var TemplateInstance = function () {
    function TemplateInstance(template, processor, options) {
      this._parts = [];
      this.template = template;
      this.processor = processor;
      this.options = options;
    }

    var _proto = TemplateInstance.prototype;

    _proto.update = function update(values) {
      var i = 0;

      for (var _iterator = this._parts, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var part = _ref;

        if (part !== undefined) {
          part.setValue(values[i]);
        }

        i++;
      }

      for (var _iterator2 = this._parts, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var _part = _ref2;

        if (_part !== undefined) {
          _part.commit();
        }
      }
    };

    _proto._clone = function _clone() {
      var _this = this;

      var fragment = isCEPolyfill ? this.template.element.content.cloneNode(true) : document.importNode(this.template.element.content, true);
      var parts = this.template.parts;
      var partIndex = 0;
      var nodeIndex = 0;

      var _prepareInstance = function _prepareInstance(fragment) {
        var walker = document.createTreeWalker(fragment, 133, null, false);
        var node = walker.nextNode();

        while (partIndex < parts.length && node !== null) {
          var part = parts[partIndex];

          if (!isTemplatePartActive(part)) {
            _this._parts.push(undefined);

            partIndex++;
          } else if (nodeIndex === part.index) {
            if (part.type === 'node') {
              var _part2 = _this.processor.handleTextExpression(_this.options);

              _part2.insertAfterNode(node.previousSibling);

              _this._parts.push(_part2);
            } else {
              var _this$_parts;

              (_this$_parts = _this._parts).push.apply(_this$_parts, _this.processor.handleAttributeExpressions(node, part.name, part.strings, _this.options));
            }

            partIndex++;
          } else {
            nodeIndex++;

            if (node.nodeName === 'TEMPLATE') {
              _prepareInstance(node.content);
            }

            node = walker.nextNode();
          }
        }
      };

      _prepareInstance(fragment);

      if (isCEPolyfill) {
        document.adoptNode(fragment);
        customElements.upgrade(fragment);
      }

      return fragment;
    };

    return TemplateInstance;
  }();

  var TemplateResult = function () {
    function TemplateResult(strings, values, type, processor) {
      this.strings = strings;
      this.values = values;
      this.type = type;
      this.processor = processor;
    }

    var _proto = TemplateResult.prototype;

    _proto.getHTML = function getHTML() {
      var endIndex = this.strings.length - 1;
      var html = '';

      for (var i = 0; i < endIndex; i++) {
        var s = this.strings[i];
        var match = lastAttributeNameRegex.exec(s);

        if (match) {
          html += s.substr(0, match.index) + match[1] + match[2] + boundAttributeSuffix + match[3] + marker;
        } else {
          html += s + nodeMarker;
        }
      }

      return html + this.strings[endIndex];
    };

    _proto.getTemplateElement = function getTemplateElement() {
      var template = document.createElement('template');
      template.innerHTML = this.getHTML();
      return template;
    };

    return TemplateResult;
  }();
  var SVGTemplateResult = function (_TemplateResult) {
    inheritsLoose(SVGTemplateResult, _TemplateResult);

    function SVGTemplateResult() {
      return _TemplateResult.apply(this, arguments) || this;
    }

    var _proto2 = SVGTemplateResult.prototype;

    _proto2.getHTML = function getHTML() {
      return "<svg>" + _TemplateResult.prototype.getHTML.call(this) + "</svg>";
    };

    _proto2.getTemplateElement = function getTemplateElement() {
      var template = _TemplateResult.prototype.getTemplateElement.call(this);

      var content = template.content;
      var svgElement = content.firstChild;
      content.removeChild(svgElement);
      reparentNodes(content, svgElement.firstChild);
      return template;
    };

    return SVGTemplateResult;
  }(TemplateResult);

  var isPrimitive = function isPrimitive(value) {
    return value === null || !(typeof value === 'object' || typeof value === 'function');
  };
  var AttributeCommitter = function () {
    function AttributeCommitter(element, name, strings) {
      this.dirty = true;
      this.element = element;
      this.name = name;
      this.strings = strings;
      this.parts = [];

      for (var i = 0; i < strings.length - 1; i++) {
        this.parts[i] = this._createPart();
      }
    }

    var _proto = AttributeCommitter.prototype;

    _proto._createPart = function _createPart() {
      return new AttributePart(this);
    };

    _proto._getValue = function _getValue() {
      var strings = this.strings;
      var l = strings.length - 1;
      var text = '';

      for (var i = 0; i < l; i++) {
        text += strings[i];
        var part = this.parts[i];

        if (part !== undefined) {
          var v = part.value;

          if (v != null && (Array.isArray(v) || typeof v !== 'string' && v[Symbol.iterator])) {
            for (var _iterator = v, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
              var _ref;

              if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
              } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
              }

              var t = _ref;
              text += typeof t === 'string' ? t : String(t);
            }
          } else {
            text += typeof v === 'string' ? v : String(v);
          }
        }
      }

      text += strings[l];
      return text;
    };

    _proto.commit = function commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element.setAttribute(this.name, this._getValue());
      }
    };

    return AttributeCommitter;
  }();
  var AttributePart = function () {
    function AttributePart(comitter) {
      this.value = undefined;
      this.committer = comitter;
    }

    var _proto2 = AttributePart.prototype;

    _proto2.setValue = function setValue(value) {
      if (value !== noChange && (!isPrimitive(value) || value !== this.value)) {
        this.value = value;

        if (!isDirective(value)) {
          this.committer.dirty = true;
        }
      }
    };

    _proto2.commit = function commit() {
      while (isDirective(this.value)) {
        var directive$$1 = this.value;
        this.value = noChange;
        directive$$1(this);
      }

      if (this.value === noChange) {
        return;
      }

      this.committer.commit();
    };

    return AttributePart;
  }();
  var NodePart = function () {
    function NodePart(options) {
      this.value = undefined;
      this._pendingValue = undefined;
      this.options = options;
    }

    var _proto3 = NodePart.prototype;

    _proto3.appendInto = function appendInto(container) {
      this.startNode = container.appendChild(createMarker());
      this.endNode = container.appendChild(createMarker());
    };

    _proto3.insertAfterNode = function insertAfterNode(ref) {
      this.startNode = ref;
      this.endNode = ref.nextSibling;
    };

    _proto3.appendIntoPart = function appendIntoPart(part) {
      part._insert(this.startNode = createMarker());

      part._insert(this.endNode = createMarker());
    };

    _proto3.insertAfterPart = function insertAfterPart(ref) {
      ref._insert(this.startNode = createMarker());

      this.endNode = ref.endNode;
      ref.endNode = this.startNode;
    };

    _proto3.setValue = function setValue(value) {
      this._pendingValue = value;
    };

    _proto3.commit = function commit() {
      while (isDirective(this._pendingValue)) {
        var directive$$1 = this._pendingValue;
        this._pendingValue = noChange;
        directive$$1(this);
      }

      var value = this._pendingValue;

      if (value === noChange) {
        return;
      }

      if (isPrimitive(value)) {
        if (value !== this.value) {
          this._commitText(value);
        }
      } else if (value instanceof TemplateResult) {
        this._commitTemplateResult(value);
      } else if (value instanceof Node) {
        this._commitNode(value);
      } else if (Array.isArray(value) || value[Symbol.iterator]) {
        this._commitIterable(value);
      } else if (value === nothing) {
        this.value = nothing;
        this.clear();
      } else {
        this._commitText(value);
      }
    };

    _proto3._insert = function _insert(node) {
      this.endNode.parentNode.insertBefore(node, this.endNode);
    };

    _proto3._commitNode = function _commitNode(value) {
      if (this.value === value) {
        return;
      }

      this.clear();

      this._insert(value);

      this.value = value;
    };

    _proto3._commitText = function _commitText(value) {
      var node = this.startNode.nextSibling;
      value = value == null ? '' : value;

      if (node === this.endNode.previousSibling && node.nodeType === 3) {
          node.data = value;
        } else {
        this._commitNode(document.createTextNode(typeof value === 'string' ? value : String(value)));
      }

      this.value = value;
    };

    _proto3._commitTemplateResult = function _commitTemplateResult(value) {
      var template = this.options.templateFactory(value);

      if (this.value instanceof TemplateInstance && this.value.template === template) {
        this.value.update(value.values);
      } else {
        var instance = new TemplateInstance(template, value.processor, this.options);

        var fragment = instance._clone();

        instance.update(value.values);

        this._commitNode(fragment);

        this.value = instance;
      }
    };

    _proto3._commitIterable = function _commitIterable(value) {
      if (!Array.isArray(this.value)) {
        this.value = [];
        this.clear();
      }

      var itemParts = this.value;
      var partIndex = 0;
      var itemPart;

      for (var _iterator2 = value, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref2 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
        }

        var item = _ref2;
        itemPart = itemParts[partIndex];

        if (itemPart === undefined) {
          itemPart = new NodePart(this.options);
          itemParts.push(itemPart);

          if (partIndex === 0) {
            itemPart.appendIntoPart(this);
          } else {
            itemPart.insertAfterPart(itemParts[partIndex - 1]);
          }
        }

        itemPart.setValue(item);
        itemPart.commit();
        partIndex++;
      }

      if (partIndex < itemParts.length) {
        itemParts.length = partIndex;
        this.clear(itemPart && itemPart.endNode);
      }
    };

    _proto3.clear = function clear(startNode) {
      if (startNode === void 0) {
        startNode = this.startNode;
      }

      removeNodes(this.startNode.parentNode, startNode.nextSibling, this.endNode);
    };

    return NodePart;
  }();
  var BooleanAttributePart = function () {
    function BooleanAttributePart(element, name, strings) {
      this.value = undefined;
      this._pendingValue = undefined;

      if (strings.length !== 2 || strings[0] !== '' || strings[1] !== '') {
        throw new Error('Boolean attributes can only contain a single expression');
      }

      this.element = element;
      this.name = name;
      this.strings = strings;
    }

    var _proto4 = BooleanAttributePart.prototype;

    _proto4.setValue = function setValue(value) {
      this._pendingValue = value;
    };

    _proto4.commit = function commit() {
      while (isDirective(this._pendingValue)) {
        var directive$$1 = this._pendingValue;
        this._pendingValue = noChange;
        directive$$1(this);
      }

      if (this._pendingValue === noChange) {
        return;
      }

      var value = !!this._pendingValue;

      if (this.value !== value) {
        if (value) {
          this.element.setAttribute(this.name, '');
        } else {
          this.element.removeAttribute(this.name);
        }
      }

      this.value = value;
      this._pendingValue = noChange;
    };

    return BooleanAttributePart;
  }();
  var PropertyCommitter = function (_AttributeCommitter) {
    inheritsLoose(PropertyCommitter, _AttributeCommitter);

    function PropertyCommitter(element, name, strings) {
      var _this;

      _this = _AttributeCommitter.call(this, element, name, strings) || this;
      _this.single = strings.length === 2 && strings[0] === '' && strings[1] === '';
      return _this;
    }

    var _proto5 = PropertyCommitter.prototype;

    _proto5._createPart = function _createPart() {
      return new PropertyPart(this);
    };

    _proto5._getValue = function _getValue() {
      if (this.single) {
        return this.parts[0].value;
      }

      return _AttributeCommitter.prototype._getValue.call(this);
    };

    _proto5.commit = function commit() {
      if (this.dirty) {
        this.dirty = false;
        this.element[this.name] = this._getValue();
      }
    };

    return PropertyCommitter;
  }(AttributeCommitter);
  var PropertyPart = function (_AttributePart) {
    inheritsLoose(PropertyPart, _AttributePart);

    function PropertyPart() {
      return _AttributePart.apply(this, arguments) || this;
    }

    return PropertyPart;
  }(AttributePart);
  var eventOptionsSupported = false;

  try {
    var options = {
      get capture() {
        eventOptionsSupported = true;
        return false;
      }

    };
    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (_e) {}

  var EventPart = function () {
    function EventPart(element, eventName, eventContext) {
      var _this2 = this;

      this.value = undefined;
      this._pendingValue = undefined;
      this.element = element;
      this.eventName = eventName;
      this.eventContext = eventContext;

      this._boundHandleEvent = function (e) {
        return _this2.handleEvent(e);
      };
    }

    var _proto6 = EventPart.prototype;

    _proto6.setValue = function setValue(value) {
      this._pendingValue = value;
    };

    _proto6.commit = function commit() {
      while (isDirective(this._pendingValue)) {
        var directive$$1 = this._pendingValue;
        this._pendingValue = noChange;
        directive$$1(this);
      }

      if (this._pendingValue === noChange) {
        return;
      }

      var newListener = this._pendingValue;
      var oldListener = this.value;
      var shouldRemoveListener = newListener == null || oldListener != null && (newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive);
      var shouldAddListener = newListener != null && (oldListener == null || shouldRemoveListener);

      if (shouldRemoveListener) {
        this.element.removeEventListener(this.eventName, this._boundHandleEvent, this._options);
      }

      if (shouldAddListener) {
        this._options = getOptions(newListener);
        this.element.addEventListener(this.eventName, this._boundHandleEvent, this._options);
      }

      this.value = newListener;
      this._pendingValue = noChange;
    };

    _proto6.handleEvent = function handleEvent(event) {
      if (typeof this.value === 'function') {
        this.value.call(this.eventContext || this.element, event);
      } else {
        this.value.handleEvent(event);
      }
    };

    return EventPart;
  }();

  var getOptions = function getOptions(o) {
    return o && (eventOptionsSupported ? {
      capture: o.capture,
      passive: o.passive,
      once: o.once
    } : o.capture);
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var DefaultTemplateProcessor = function () {
    function DefaultTemplateProcessor() {}

    var _proto = DefaultTemplateProcessor.prototype;

    _proto.handleAttributeExpressions = function handleAttributeExpressions(element, name, strings, options) {
      var prefix = name[0];

      if (prefix === '.') {
        var _comitter = new PropertyCommitter(element, name.slice(1), strings);

        return _comitter.parts;
      }

      if (prefix === '@') {
        return [new EventPart(element, name.slice(1), options.eventContext)];
      }

      if (prefix === '?') {
        return [new BooleanAttributePart(element, name.slice(1), strings)];
      }

      var comitter = new AttributeCommitter(element, name, strings);
      return comitter.parts;
    };

    _proto.handleTextExpression = function handleTextExpression(options) {
      return new NodePart(options);
    };

    return DefaultTemplateProcessor;
  }();
  var defaultTemplateProcessor = new DefaultTemplateProcessor();

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  function templateFactory(result) {
    var templateCache = templateCaches.get(result.type);

    if (templateCache === undefined) {
      templateCache = {
        stringsArray: new WeakMap(),
        keyString: new Map()
      };
      templateCaches.set(result.type, templateCache);
    }

    var template = templateCache.stringsArray.get(result.strings);

    if (template !== undefined) {
      return template;
    }

    var key = result.strings.join(marker);
    template = templateCache.keyString.get(key);

    if (template === undefined) {
      template = new Template(result, result.getTemplateElement());
      templateCache.keyString.set(key, template);
    }

    templateCache.stringsArray.set(result.strings, template);
    return template;
  }
  var templateCaches = new Map();

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var parts = new WeakMap();
  var render = function render(result, container, options) {
    var part = parts.get(container);

    if (part === undefined) {
      removeNodes(container, container.firstChild);
      parts.set(container, part = new NodePart(Object.assign({
        templateFactory: templateFactory
      }, options)));
      part.appendInto(container);
    }

    part.setValue(result);
    part.commit();
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  (window['litHtmlVersions'] || (window['litHtmlVersions'] = [])).push('1.0.0');
  var html = function html(strings) {
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    return new TemplateResult(strings, values, 'html', defaultTemplateProcessor);
  };

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var walkerNodeFilter = 133;
  function removeNodesFromTemplate(template, nodesToRemove) {
    var content = template.element.content,
        parts = template.parts;
    var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    var partIndex = nextActiveIndexInTemplateParts(parts);
    var part = parts[partIndex];
    var nodeIndex = -1;
    var removeCount = 0;
    var nodesToRemoveInTemplate = [];
    var currentRemovingNode = null;

    while (walker.nextNode()) {
      nodeIndex++;
      var node = walker.currentNode;

      if (node.previousSibling === currentRemovingNode) {
        currentRemovingNode = null;
      }

      if (nodesToRemove.has(node)) {
        nodesToRemoveInTemplate.push(node);

        if (currentRemovingNode === null) {
          currentRemovingNode = node;
        }
      }

      if (currentRemovingNode !== null) {
        removeCount++;
      }

      while (part !== undefined && part.index === nodeIndex) {
        part.index = currentRemovingNode !== null ? -1 : part.index - removeCount;
        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
        part = parts[partIndex];
      }
    }

    nodesToRemoveInTemplate.forEach(function (n) {
      return n.parentNode.removeChild(n);
    });
  }

  var countNodes = function countNodes(node) {
    var count = node.nodeType === 11 ? 0 : 1;
    var walker = document.createTreeWalker(node, walkerNodeFilter, null, false);

    while (walker.nextNode()) {
      count++;
    }

    return count;
  };

  var nextActiveIndexInTemplateParts = function nextActiveIndexInTemplateParts(parts, startIndex) {
    if (startIndex === void 0) {
      startIndex = -1;
    }

    for (var i = startIndex + 1; i < parts.length; i++) {
      var part = parts[i];

      if (isTemplatePartActive(part)) {
        return i;
      }
    }

    return -1;
  };

  function insertNodeIntoTemplate(template, node, refNode) {
    if (refNode === void 0) {
      refNode = null;
    }

    var content = template.element.content,
        parts = template.parts;

    if (refNode === null || refNode === undefined) {
      content.appendChild(node);
      return;
    }

    var walker = document.createTreeWalker(content, walkerNodeFilter, null, false);
    var partIndex = nextActiveIndexInTemplateParts(parts);
    var insertCount = 0;
    var walkerIndex = -1;

    while (walker.nextNode()) {
      walkerIndex++;
      var walkerNode = walker.currentNode;

      if (walkerNode === refNode) {
        insertCount = countNodes(node);
        refNode.parentNode.insertBefore(node, refNode);
      }

      while (partIndex !== -1 && parts[partIndex].index === walkerIndex) {
        if (insertCount > 0) {
          while (partIndex !== -1) {
            parts[partIndex].index += insertCount;
            partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
          }

          return;
        }

        partIndex = nextActiveIndexInTemplateParts(parts, partIndex);
      }
    }
  }

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */

  var getTemplateCacheKey = function getTemplateCacheKey(type, scopeName) {
    return type + "--" + scopeName;
  };

  var compatibleShadyCSSVersion = true;

  if (typeof window.ShadyCSS === 'undefined') {
    compatibleShadyCSSVersion = false;
  } else if (typeof window.ShadyCSS.prepareTemplateDom === 'undefined') {
    console.warn("Incompatible ShadyCSS version detected." + "Please update to at least @webcomponents/webcomponentsjs@2.0.2 and" + "@webcomponents/shadycss@1.3.1.");
    compatibleShadyCSSVersion = false;
  }

  var shadyTemplateFactory = function shadyTemplateFactory(scopeName) {
    return function (result) {
      var cacheKey = getTemplateCacheKey(result.type, scopeName);
      var templateCache = templateCaches.get(cacheKey);

      if (templateCache === undefined) {
        templateCache = {
          stringsArray: new WeakMap(),
          keyString: new Map()
        };
        templateCaches.set(cacheKey, templateCache);
      }

      var template = templateCache.stringsArray.get(result.strings);

      if (template !== undefined) {
        return template;
      }

      var key = result.strings.join(marker);
      template = templateCache.keyString.get(key);

      if (template === undefined) {
        var element = result.getTemplateElement();

        if (compatibleShadyCSSVersion) {
          window.ShadyCSS.prepareTemplateDom(element, scopeName);
        }

        template = new Template(result, element);
        templateCache.keyString.set(key, template);
      }

      templateCache.stringsArray.set(result.strings, template);
      return template;
    };
  };

  var TEMPLATE_TYPES = ['html', 'svg'];

  var removeStylesFromLitTemplates = function removeStylesFromLitTemplates(scopeName) {
    TEMPLATE_TYPES.forEach(function (type) {
      var templates = templateCaches.get(getTemplateCacheKey(type, scopeName));

      if (templates !== undefined) {
        templates.keyString.forEach(function (template) {
          var content = template.element.content;
          var styles = new Set();
          Array.from(content.querySelectorAll('style')).forEach(function (s) {
            styles.add(s);
          });
          removeNodesFromTemplate(template, styles);
        });
      }
    });
  };

  var shadyRenderSet = new Set();

  var prepareTemplateStyles = function prepareTemplateStyles(renderedDOM, template, scopeName) {
    shadyRenderSet.add(scopeName);
    var styles = renderedDOM.querySelectorAll('style');

    if (styles.length === 0) {
      window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);
      return;
    }

    var condensedStyle = document.createElement('style');

    for (var i = 0; i < styles.length; i++) {
      var style = styles[i];
      style.parentNode.removeChild(style);
      condensedStyle.textContent += style.textContent;
    }

    removeStylesFromLitTemplates(scopeName);
    insertNodeIntoTemplate(template, condensedStyle, template.element.content.firstChild);
    window.ShadyCSS.prepareTemplateStyles(template.element, scopeName);

    if (window.ShadyCSS.nativeShadow) {
      var _style = template.element.content.querySelector('style');

      renderedDOM.insertBefore(_style.cloneNode(true), renderedDOM.firstChild);
    } else {
      template.element.content.insertBefore(condensedStyle, template.element.content.firstChild);
      var removes = new Set();
      removes.add(condensedStyle);
      removeNodesFromTemplate(template, removes);
    }
  };

  var render$1 = function render$$1(result, container, options) {
    var scopeName = options.scopeName;
    var hasRendered = parts.has(container);
    var needsScoping = container instanceof ShadowRoot && compatibleShadyCSSVersion && result instanceof TemplateResult;
    var firstScopeRender = needsScoping && !shadyRenderSet.has(scopeName);
    var renderContainer = firstScopeRender ? document.createDocumentFragment() : container;
    render(result, renderContainer, Object.assign({
      templateFactory: shadyTemplateFactory(scopeName)
    }, options));

    if (firstScopeRender) {
      var part = parts.get(renderContainer);
      parts.delete(renderContainer);

      if (part.value instanceof TemplateInstance) {
        prepareTemplateStyles(renderContainer, part.value.template, scopeName);
      }

      removeNodes(container, container.firstChild);
      container.appendChild(renderContainer);
      parts.set(container, part);
    }

    if (!hasRendered && needsScoping) {
      window.ShadyCSS.styleElement(container.host);
    }
  };

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  var getPrototypeOf = createCommonjsModule(function (module) {
  function _getPrototypeOf(o) {
    module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
  function _setPrototypeOf(o, p) {
    module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  module.exports = _setPrototypeOf;
  });

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  var isNativeFunction = _isNativeFunction;

  var construct = createCommonjsModule(function (module) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      module.exports = _construct = Reflect.construct;
    } else {
      module.exports = _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  module.exports = _construct;
  });

  var wrapNativeSuper = createCommonjsModule(function (module) {
  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return construct(Class, arguments, getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  module.exports = _wrapNativeSuper;
  });

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  window.JSCompiler_renameProperty = function (prop, _obj) {
    return prop;
  };

  var defaultConverter = {
    toAttribute: function toAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value ? '' : null;

        case Object:
        case Array:
          return value == null ? value : JSON.stringify(value);
      }

      return value;
    },
    fromAttribute: function fromAttribute(value, type) {
      switch (type) {
        case Boolean:
          return value !== null;

        case Number:
          return value === null ? null : Number(value);

        case Object:
        case Array:
          return JSON.parse(value);
      }

      return value;
    }
  };
  var notEqual = function notEqual(value, old) {
    return old !== value && (old === old || value === value);
  };
  var defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual
  };
  var microtaskPromise = Promise.resolve(true);
  var STATE_HAS_UPDATED = 1;
  var STATE_UPDATE_REQUESTED = 1 << 2;
  var STATE_IS_REFLECTING_TO_ATTRIBUTE = 1 << 3;
  var STATE_IS_REFLECTING_TO_PROPERTY = 1 << 4;
  var STATE_HAS_CONNECTED = 1 << 5;
  var UpdatingElement = function (_HTMLElement) {
    inheritsLoose(UpdatingElement, _HTMLElement);

    function UpdatingElement() {
      var _this;

      _this = _HTMLElement.call(this) || this;
      _this._updateState = 0;
      _this._instanceProperties = undefined;
      _this._updatePromise = microtaskPromise;
      _this._hasConnectedResolver = undefined;
      _this._changedProperties = new Map();
      _this._reflectingProperties = undefined;

      _this.initialize();

      return _this;
    }

    UpdatingElement._ensureClassProperties = function _ensureClassProperties() {
      var _this2 = this;

      if (!this.hasOwnProperty(JSCompiler_renameProperty('_classProperties', this))) {
        this._classProperties = new Map();

        var superProperties = Object.getPrototypeOf(this)._classProperties;

        if (superProperties !== undefined) {
          superProperties.forEach(function (v, k) {
            return _this2._classProperties.set(k, v);
          });
        }
      }
    };

    UpdatingElement.createProperty = function createProperty(name, options) {
      if (options === void 0) {
        options = defaultPropertyDeclaration;
      }

      this._ensureClassProperties();

      this._classProperties.set(name, options);

      if (options.noAccessor || this.prototype.hasOwnProperty(name)) {
        return;
      }

      var key = typeof name === 'symbol' ? Symbol() : "__" + name;
      Object.defineProperty(this.prototype, name, {
        get: function get() {
          return this[key];
        },
        set: function set(value) {
          var oldValue = this[name];
          this[key] = value;
          this.requestUpdate(name, oldValue);
        },
        configurable: true,
        enumerable: true
      });
    };

    UpdatingElement.finalize = function finalize() {
      if (this.hasOwnProperty(JSCompiler_renameProperty('finalized', this)) && this.finalized) {
        return;
      }

      var superCtor = Object.getPrototypeOf(this);

      if (typeof superCtor.finalize === 'function') {
        superCtor.finalize();
      }

      this.finalized = true;

      this._ensureClassProperties();

      this._attributeToPropertyMap = new Map();

      if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
        var props = this.properties;
        var propKeys = [].concat(Object.getOwnPropertyNames(props), typeof Object.getOwnPropertySymbols === 'function' ? Object.getOwnPropertySymbols(props) : []);

        for (var _iterator = propKeys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var p = _ref;
          this.createProperty(p, props[p]);
        }
      }
    };

    UpdatingElement._attributeNameForProperty = function _attributeNameForProperty(name, options) {
      var attribute = options.attribute;
      return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
    };

    UpdatingElement._valueHasChanged = function _valueHasChanged(value, old, hasChanged) {
      if (hasChanged === void 0) {
        hasChanged = notEqual;
      }

      return hasChanged(value, old);
    };

    UpdatingElement._propertyValueFromAttribute = function _propertyValueFromAttribute(value, options) {
      var type = options.type;
      var converter = options.converter || defaultConverter;
      var fromAttribute = typeof converter === 'function' ? converter : converter.fromAttribute;
      return fromAttribute ? fromAttribute(value, type) : value;
    };

    UpdatingElement._propertyValueToAttribute = function _propertyValueToAttribute(value, options) {
      if (options.reflect === undefined) {
        return;
      }

      var type = options.type;
      var converter = options.converter;
      var toAttribute = converter && converter.toAttribute || defaultConverter.toAttribute;
      return toAttribute(value, type);
    };

    var _proto = UpdatingElement.prototype;

    _proto.initialize = function initialize() {
      this._saveInstanceProperties();
    };

    _proto._saveInstanceProperties = function _saveInstanceProperties() {
      var _this3 = this;

      this.constructor._classProperties.forEach(function (_v, p) {
        if (_this3.hasOwnProperty(p)) {
          var value = _this3[p];
          delete _this3[p];

          if (!_this3._instanceProperties) {
            _this3._instanceProperties = new Map();
          }

          _this3._instanceProperties.set(p, value);
        }
      });
    };

    _proto._applyInstanceProperties = function _applyInstanceProperties() {
      var _this4 = this;

      this._instanceProperties.forEach(function (v, p) {
        return _this4[p] = v;
      });

      this._instanceProperties = undefined;
    };

    _proto.connectedCallback = function connectedCallback() {
      this._updateState = this._updateState | STATE_HAS_CONNECTED;

      if (this._hasConnectedResolver) {
        this._hasConnectedResolver();

        this._hasConnectedResolver = undefined;
      } else {
        this.requestUpdate();
      }
    };

    _proto.disconnectedCallback = function disconnectedCallback() {};

    _proto.attributeChangedCallback = function attributeChangedCallback(name, old, value) {
      if (old !== value) {
        this._attributeToProperty(name, value);
      }
    };

    _proto._propertyToAttribute = function _propertyToAttribute(name, value, options) {
      if (options === void 0) {
        options = defaultPropertyDeclaration;
      }

      var ctor = this.constructor;

      var attr = ctor._attributeNameForProperty(name, options);

      if (attr !== undefined) {
        var attrValue = ctor._propertyValueToAttribute(value, options);

        if (attrValue === undefined) {
          return;
        }

        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_ATTRIBUTE;

        if (attrValue == null) {
          this.removeAttribute(attr);
        } else {
          this.setAttribute(attr, attrValue);
        }

        this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_ATTRIBUTE;
      }
    };

    _proto._attributeToProperty = function _attributeToProperty(name, value) {
      if (this._updateState & STATE_IS_REFLECTING_TO_ATTRIBUTE) {
        return;
      }

      var ctor = this.constructor;

      var propName = ctor._attributeToPropertyMap.get(name);

      if (propName !== undefined) {
        var options = ctor._classProperties.get(propName) || defaultPropertyDeclaration;
        this._updateState = this._updateState | STATE_IS_REFLECTING_TO_PROPERTY;
        this[propName] = ctor._propertyValueFromAttribute(value, options);
        this._updateState = this._updateState & ~STATE_IS_REFLECTING_TO_PROPERTY;
      }
    };

    _proto.requestUpdate = function requestUpdate(name, oldValue) {
      var shouldRequestUpdate = true;

      if (name !== undefined && !this._changedProperties.has(name)) {
        var ctor = this.constructor;
        var options = ctor._classProperties.get(name) || defaultPropertyDeclaration;

        if (ctor._valueHasChanged(this[name], oldValue, options.hasChanged)) {
          this._changedProperties.set(name, oldValue);

          if (options.reflect === true && !(this._updateState & STATE_IS_REFLECTING_TO_PROPERTY)) {
            if (this._reflectingProperties === undefined) {
              this._reflectingProperties = new Map();
            }

            this._reflectingProperties.set(name, options);
          }
        } else {
          shouldRequestUpdate = false;
        }
      }

      if (!this._hasRequestedUpdate && shouldRequestUpdate) {
        this._enqueueUpdate();
      }

      return this.updateComplete;
    };

    _proto._enqueueUpdate = function () {
      var _enqueueUpdate2 = asyncToGenerator(regenerator.mark(function _callee() {
        var _this5 = this;

        var resolve, previousUpdatePromise, result;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._updateState = this._updateState | STATE_UPDATE_REQUESTED;
                previousUpdatePromise = this._updatePromise;
                this._updatePromise = new Promise(function (res) {
                  return resolve = res;
                });
                _context.next = 5;
                return previousUpdatePromise;

              case 5:
                if (this._hasConnected) {
                  _context.next = 8;
                  break;
                }

                _context.next = 8;
                return new Promise(function (res) {
                  return _this5._hasConnectedResolver = res;
                });

              case 8:
                result = this.performUpdate();

                if (!(result != null && typeof result.then === 'function')) {
                  _context.next = 12;
                  break;
                }

                _context.next = 12;
                return result;

              case 12:
                resolve(!this._hasRequestedUpdate);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _enqueueUpdate() {
        return _enqueueUpdate2.apply(this, arguments);
      }

      return _enqueueUpdate;
    }();

    _proto.performUpdate = function performUpdate() {
      if (this._instanceProperties) {
        this._applyInstanceProperties();
      }

      if (this.shouldUpdate(this._changedProperties)) {
        var changedProperties = this._changedProperties;
        this.update(changedProperties);

        this._markUpdated();

        if (!(this._updateState & STATE_HAS_UPDATED)) {
          this._updateState = this._updateState | STATE_HAS_UPDATED;
          this.firstUpdated(changedProperties);
        }

        this.updated(changedProperties);
      } else {
        this._markUpdated();
      }
    };

    _proto._markUpdated = function _markUpdated() {
      this._changedProperties = new Map();
      this._updateState = this._updateState & ~STATE_UPDATE_REQUESTED;
    };

    _proto.shouldUpdate = function shouldUpdate(_changedProperties) {
      return true;
    };

    _proto.update = function update(_changedProperties) {
      var _this6 = this;

      if (this._reflectingProperties !== undefined && this._reflectingProperties.size > 0) {
        this._reflectingProperties.forEach(function (v, k) {
          return _this6._propertyToAttribute(k, _this6[k], v);
        });

        this._reflectingProperties = undefined;
      }
    };

    _proto.updated = function updated(_changedProperties) {};

    _proto.firstUpdated = function firstUpdated(_changedProperties) {};

    createClass(UpdatingElement, [{
      key: "_hasConnected",
      get: function get() {
        return this._updateState & STATE_HAS_CONNECTED;
      }
    }, {
      key: "_hasRequestedUpdate",
      get: function get() {
        return this._updateState & STATE_UPDATE_REQUESTED;
      }
    }, {
      key: "hasUpdated",
      get: function get() {
        return this._updateState & STATE_HAS_UPDATED;
      }
    }, {
      key: "updateComplete",
      get: function get() {
        return this._updatePromise;
      }
    }], [{
      key: "observedAttributes",
      get: function get() {
        var _this7 = this;

        this.finalize();
        var attributes = [];

        this._classProperties.forEach(function (v, p) {
          var attr = _this7._attributeNameForProperty(p, v);

          if (attr !== undefined) {
            _this7._attributeToPropertyMap.set(attr, p);

            attributes.push(attr);
          }
        });

        return attributes;
      }
    }]);

    return UpdatingElement;
  }(wrapNativeSuper(HTMLElement));
  UpdatingElement.finalized = true;

  /**
   * @license
   * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
   * This code may only be used under the BSD style license found at
   * http://polymer.github.io/LICENSE.txt
   * The complete set of authors may be found at
   * http://polymer.github.io/AUTHORS.txt
   * The complete set of contributors may be found at
   * http://polymer.github.io/CONTRIBUTORS.txt
   * Code distributed by Google as part of the polymer project is also
   * subject to an additional IP rights grant found at
   * http://polymer.github.io/PATENTS.txt
   */
  var legacyCustomElement = function legacyCustomElement(tagName, clazz) {
    window.customElements.define(tagName, clazz);
    return clazz;
  };

  var standardCustomElement = function standardCustomElement(tagName, descriptor) {
    var kind = descriptor.kind,
        elements = descriptor.elements;
    return {
      kind: kind,
      elements: elements,
      finisher: function finisher(clazz) {
        window.customElements.define(tagName, clazz);
      }
    };
  };

  var customElement = function customElement(tagName) {
    return function (classOrDescriptor) {
      return typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
    };
  };

  var standardProperty = function standardProperty(options, element) {
    if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
      return Object.assign({}, element, {
        finisher: function finisher(clazz) {
          clazz.createProperty(element.key, options);
        }
      });
    } else {
      return {
        kind: 'field',
        key: Symbol(),
        placement: 'own',
        descriptor: {},
        initializer: function initializer() {
          if (typeof element.initializer === 'function') {
            this[element.key] = element.initializer.call(this);
          }
        },
        finisher: function finisher(clazz) {
          clazz.createProperty(element.key, options);
        }
      };
    }
  };

  var legacyProperty = function legacyProperty(options, proto, name) {
    proto.constructor.createProperty(name, options);
  };

  function property(options) {
    return function (protoOrDescriptor, name) {
      return name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
    };
  }

  /**
  @license
  Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
  This code may only be used under the BSD style license found at
  http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
  http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
  found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
  part of the polymer project is also subject to an additional IP rights grant
  found at http://polymer.github.io/PATENTS.txt
  */
  var supportsAdoptingStyleSheets = 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
  var constructionToken = Symbol();
  var CSSResult = function () {
    function CSSResult(cssText, safeToken) {
      if (safeToken !== constructionToken) {
        throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
      }

      this.cssText = cssText;
    }

    var _proto = CSSResult.prototype;

    _proto.toString = function toString() {
      return this.cssText;
    };

    createClass(CSSResult, [{
      key: "styleSheet",
      get: function get() {
        if (this._styleSheet === undefined) {
          if (supportsAdoptingStyleSheets) {
            this._styleSheet = new CSSStyleSheet();

            this._styleSheet.replaceSync(this.cssText);
          } else {
            this._styleSheet = null;
          }
        }

        return this._styleSheet;
      }
    }]);

    return CSSResult;
  }();

  (window['litElementVersions'] || (window['litElementVersions'] = [])).push('2.0.1');

  function arrayFlat(styles, result) {
    if (result === void 0) {
      result = [];
    }

    for (var i = 0, length = styles.length; i < length; i++) {
      var value = styles[i];

      if (Array.isArray(value)) {
        arrayFlat(value, result);
      } else {
        result.push(value);
      }
    }

    return result;
  }

  var flattenStyles = function flattenStyles(styles) {
    return styles.flat ? styles.flat(Infinity) : arrayFlat(styles);
  };

  var LitElement = function (_UpdatingElement) {
    inheritsLoose(LitElement, _UpdatingElement);

    function LitElement() {
      return _UpdatingElement.apply(this, arguments) || this;
    }

    LitElement.finalize = function finalize() {
      _UpdatingElement.finalize.call(this);

      this._styles = this.hasOwnProperty(JSCompiler_renameProperty('styles', this)) ? this._getUniqueStyles() : this._styles || [];
    };

    LitElement._getUniqueStyles = function _getUniqueStyles() {
      var userStyles = this.styles;
      var styles = [];

      if (Array.isArray(userStyles)) {
        var flatStyles = flattenStyles(userStyles);
        var styleSet = flatStyles.reduceRight(function (set, s) {
          set.add(s);
          return set;
        }, new Set());
        styleSet.forEach(function (v) {
          return styles.unshift(v);
        });
      } else if (userStyles) {
        styles.push(userStyles);
      }

      return styles;
    };

    var _proto = LitElement.prototype;

    _proto.initialize = function initialize() {
      _UpdatingElement.prototype.initialize.call(this);

      this.renderRoot = this.createRenderRoot();

      if (window.ShadowRoot && this.renderRoot instanceof window.ShadowRoot) {
        this.adoptStyles();
      }
    };

    _proto.createRenderRoot = function createRenderRoot() {
      return this.attachShadow({
        mode: 'open'
      });
    };

    _proto.adoptStyles = function adoptStyles() {
      var styles = this.constructor._styles;

      if (styles.length === 0) {
        return;
      }

      if (window.ShadyCSS !== undefined && !window.ShadyCSS.nativeShadow) {
        window.ShadyCSS.ScopingShim.prepareAdoptedCssText(styles.map(function (s) {
          return s.cssText;
        }), this.localName);
      } else if (supportsAdoptingStyleSheets) {
        this.renderRoot.adoptedStyleSheets = styles.map(function (s) {
          return s.styleSheet;
        });
      } else {
        this._needsShimAdoptedStyleSheets = true;
      }
    };

    _proto.connectedCallback = function connectedCallback() {
      _UpdatingElement.prototype.connectedCallback.call(this);

      if (this.hasUpdated && window.ShadyCSS !== undefined) {
        window.ShadyCSS.styleElement(this);
      }
    };

    _proto.update = function update(changedProperties) {
      var _this = this;

      _UpdatingElement.prototype.update.call(this, changedProperties);

      var templateResult = this.render();

      if (templateResult instanceof TemplateResult) {
        this.constructor.render(templateResult, this.renderRoot, {
          scopeName: this.localName,
          eventContext: this
        });
      }

      if (this._needsShimAdoptedStyleSheets) {
        this._needsShimAdoptedStyleSheets = false;

        this.constructor._styles.forEach(function (s) {
          var style = document.createElement('style');
          style.textContent = s.cssText;

          _this.renderRoot.appendChild(style);
        });
      }
    };

    _proto.render = function render$$1() {};

    return LitElement;
  }(UpdatingElement);
  LitElement.finalized = true;
  LitElement.render = render$1;

  var PublicSettingsClient = function () {
    function PublicSettingsClient() {}

    var _proto = PublicSettingsClient.prototype;

    _proto.get = function get() {
      return fetch(this.apiUrl).then(function (r) {
        return r.json();
      });
    };

    _proto.update = function update(data) {
      return fetch(this.apiUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
          'X-WP-Nonce': wpApiSettings.nonce
        })
      });
    };

    createClass(PublicSettingsClient, [{
      key: "apiUrl",
      get: function get() {
        return wpApiSettings.restUrl + "base-api/v1/public-settings";
      }
    }]);

    return PublicSettingsClient;
  }();

  var showPageHeadingsMap = {
    always: "Always",
    excludeGutenbergPages: "All except Gutenberg pages"
  };

  var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  var MonacoEditorElement = function (_LitElement) {
    inheritsLoose(MonacoEditorElement, _LitElement);

    function MonacoEditorElement() {
      var _this;

      _this = _LitElement.apply(this, arguments) || this;
      _this.uniqueId = "id-" + Math.floor(Math.random() * 1000000);
      return _this;
    }

    var _proto = MonacoEditorElement.prototype;

    _proto.createRenderRoot = function createRenderRoot() {
      return this;
    };

    _proto.firstUpdated = function firstUpdated() {
      var _this2 = this;

      Object.assign(this.style, {
        display: "block",
        height: "280px",
        width: "100%",
        background: "#333"
      });

      require.config({
        paths: {
          'vs': _wpSiteInfo.themeUrl + '/base-theme/js/monaco-editor/vs'
        }
      });

      require(['vs/editor/editor.main'], function () {
        _this2.editor = monaco.editor.create(_this2, {
          value: _this2.value,
          language: 'html',
          theme: "vs-dark",
          minimap: {
            enabled: false
          },
          fontSize: 15,
          automaticLayout: true
        });
        _this2.model = _this2.editor.getModel();

        _this2.model.onDidChangeContent(function (e) {
          console.log('changed');
          _this2.value = _this2.model.getValue();

          _this2.dispatchEvent(new Event("change"));
        });
      });
    };

    return MonacoEditorElement;
  }(LitElement);

  __decorate([property({
    type: String,
    reflect: true
  })], MonacoEditorElement.prototype, "value", void 0);

  MonacoEditorElement = __decorate([customElement("monaco-editor")], MonacoEditorElement);

  function _templateObject5() {
    var data = taggedTemplateLiteralLoose(["<span class=\"spinner-border spinner-border-sm\"></span> Saving..."]);

    _templateObject5 = function _templateObject5() {
      return data;
    };

    return data;
  }

  function _templateObject4() {
    var data = taggedTemplateLiteralLoose(["\n                                    <option\n                                        value=", "\n                                        ?selected=", ">\n                                        ", "\n                                    </option>\n                                "]);

    _templateObject4 = function _templateObject4() {
      return data;
    };

    return data;
  }

  function _templateObject3() {
    var data = taggedTemplateLiteralLoose(["\n                        <h2>Page Headers</h2>\n\n                        <div class=\"form-group\">\n                            <label>Show Page Headers</label>\n                            <select\n                                class=\"form-control ts-input-small\"\n                                .value=", "\n                                @change=", ">\n                                ", "\n                            </select>\n                            <p class=\"form-text text-muted ts-input-small\">When and where to add H1 headings to pages and posts</p>\n                        </div>\n                        \n                        <hr>\n\n                        <h2>Footer</h2>\n\n                        <div class=\"form-group\">\n                            <label>Footer Page ID</label>\n                            <input\n                                class=\"form-control ts-input-small\"\n                                .value=", "\n                                @input=", ">\n                            <p class=\"form-text text-muted ts-input-small\">Set this to the ID of a (private) post or page to be included as footer. This enables you to use the entire page builder (Gutenberg or otherwise) to compose site footer, rather than being confined to only classic-style widgets.</p>\n                        </div>\n\n                        <hr>\n                        \n                        <h2>Advanced</h2>\n\n                        <p>Custom &lt;head&gt; HTML</p>\n                        <monaco-editor\n                            value=", "\n                            @change=", ">\n                        </monaco-editor>\n                        \n                        <hr>\n\n                        <button\n                            class=\"btn btn-success\"\n                            ?disabled=", "\n                            @click=", ">\n                            ", "\n                        </button>\n                    "]);

    _templateObject3 = function _templateObject3() {
      return data;
    };

    return data;
  }

  function _templateObject2() {
    var data = taggedTemplateLiteralLoose(["\n                        <div class=\"d-flex align-items-center\" role=\"status\">\n                            <strong>Loading...</strong>\n                            <div class=\"spinner-border ml-auto\"></div>\n                        </div>\n                    "]);

    _templateObject2 = function _templateObject2() {
      return data;
    };

    return data;
  }

  function _templateObject() {
    var data = taggedTemplateLiteralLoose(["\n            <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css\" integrity=\"sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T\" crossorigin=\"anonymous\">\n\n            <div class=\"container\">\n                <br><br>\n                <h1>Base Theme Settings <span class=\"badge badge-info\">Beta</span></h1>\n                <hr>\n                ", "\n            </div>\n            <style>\n                /* WordPress Admin reset */\n                p {\n                    font-size: initial;\n                }\n\n                .wp-admin select {\n                    height: 32px;\n                }\n                .ts-input-small {\n                    max-width: 400px;\n                }\n            </style>\n        "]);

    _templateObject = function _templateObject() {
      return data;
    };

    return data;
  }

  var __decorate$1 = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
      if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };

  var ThemeSettingsElement = function (_LitElement) {
    inheritsLoose(ThemeSettingsElement, _LitElement);

    function ThemeSettingsElement() {
      var _this;

      _this = _LitElement.call(this) || this;
      _this.loading = true;
      _this.saving = false;
      _this.publicSettingsClient = new PublicSettingsClient();

      _this.getSettings();

      return _this;
    }

    var _proto = ThemeSettingsElement.prototype;

    _proto.createRenderRoot = function createRenderRoot() {
      return this;
    };

    _proto.setPublicSetting = function setPublicSetting(data) {
      this.publicSettings = Object.assign(Object.assign({}, this.publicSettings), data);
    };

    _proto.getSettings = function () {
      var _getSettings = asyncToGenerator(regenerator.mark(function _callee() {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loading = true;
                _context.next = 3;
                return this.publicSettingsClient.get();

              case 3:
                this.publicSettings = _context.sent;
                this.loading = false;

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSettings() {
        return _getSettings.apply(this, arguments);
      }

      return getSettings;
    }();

    _proto.saveSettings = function () {
      var _saveSettings = asyncToGenerator(regenerator.mark(function _callee2() {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.saving = true;
                _context2.next = 3;
                return this.publicSettingsClient.update(this.publicSettings);

              case 3:
                _context2.next = 5;
                return this.publicSettingsClient.get();

              case 5:
                this.publicSettings = _context2.sent;
                this.saving = false;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveSettings() {
        return _saveSettings.apply(this, arguments);
      }

      return saveSettings;
    }();

    _proto.render = function render() {
      var _this2 = this;

      return html(_templateObject(), this.loading ? html(_templateObject2()) : html(_templateObject3(), this.publicSettings.showPageHeadings, function (e) {
        return _this2.setPublicSetting({
          showPageHeadings: e.target.value
        });
      }, Object.keys(showPageHeadingsMap).map(function (key) {
        return html(_templateObject4(), key, _this2.publicSettings.showPageHeadings == key, showPageHeadingsMap[key]);
      }), this.publicSettings.footerPageId || "", function (e) {
        return _this2.setPublicSetting({
          footerPageId: e.target.value
        });
      }, this.publicSettings.customHeadHtml || "", function (e) {
        return _this2.setPublicSetting({
          customHeadHtml: e.target.value
        });
      }, this.saving, function () {
        return _this2.saveSettings();
      }, this.saving ? html(_templateObject5()) : "Save"));
    };

    return ThemeSettingsElement;
  }(LitElement);

  __decorate$1([property()], ThemeSettingsElement.prototype, "loading", void 0);

  __decorate$1([property()], ThemeSettingsElement.prototype, "saving", void 0);

  __decorate$1([property({
    type: Object,
    reflect: true
  })], ThemeSettingsElement.prototype, "publicSettings", void 0);

  ThemeSettingsElement = __decorate$1([customElement('base-theme-settings')], ThemeSettingsElement);

}());
